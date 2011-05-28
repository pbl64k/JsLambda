
function m(str) {
  return { head: str.substr(0, 1), tail: str.substr(1) };
}

function elimWs(str) {
  var s = m(str);
  return /^\s$/.test(s.head) ? elimWs(s.tail) : str;
}

function joinExpr(left, right) {
  return left == null ? right : new Expr(left, right);
}

function parse(str) {
  return parseExpr(null, str);
}

function parseExpr(expr, str) {
  var s = m(elimWs(str));
  if (s.head == ')' || s.head == '') {
    if (expr == null) {
      throw 'null expression';
    }
    return { expr: expr, str: s.tail };
  } else if (s.head == '(') {
    var interm = parse(s.tail);
    return parseExpr(joinExpr(expr, interm.expr), interm.str);
  } else if (expr == null && /^\\$/.test(s.head)) {
    return parseLambda(s.tail);
  } else if (/^[A-Za-z]$/.test(s.head)) {
    return parseExpr(joinExpr(expr, new Atom(s.head)), s.tail);
  } else {
    throw 'unrecognized symbol';
  }
}

function parseLambda(str) {
  var s = m(elimWs(str));
  if (! /^[a-z]$/.test(s.head)) {
    throw 'bad lambda';
  }
  return parseLambda2(new Atom(s.head), s.tail);
}

function parseLambda2(variable, str) {
  var s = m(elimWs(str));
  if (! /^\.$/.test(s.head)) {
    throw 'malformed lambda';
  }
  var interm = parse(s.tail);
  return { expr: new Lambda(variable, interm.expr), str: interm.str };
}

function Atom(symbol) {
  this.symbol = symbol;

  this.dump = function() { return this.symbol; };
  this.T = function() { return this; };
  this.free = function(atom) { return this.symbol == atom.symbol; };
  this.is = function(atom) { return this.free(atom); };
}

function Expr(left, right) {
  this.left = left;
  this.right = right;

  this.dump = function() { return left.dump() + '(' + right.dump() + ')'; };
  this.T = function() { return new Expr(left.T(), right.T()); };
  this.free = function(atom) {
    return this.left.free(atom) || this.right.free(atom);
  };
  this.is = function(atom) { return false; };
}

function Lambda(variable, expr) {
  this.variable = variable;
  this.expr = expr;

  this.dump = function() {
    return '(\\' + variable.dump() + '. ' + expr.dump() + ')';
  };
  this.T = function() {
    var Texpr = this.expr.T();
    if (! Texpr.free(this.variable)) {
      return new Expr(new Atom('K'), Texpr);
    } else if (Texpr.is(this.variable)) {
      return new Atom('I');
    } else if ((! Texpr.left.free(this.variable)) &&
        Texpr.right.is(this.variable)) {
      return Texpr.left;
    } else if (Texpr.left.free(this.variable) &&
        (! Texpr.right.free(this.variable))) {
      return new Expr(new Expr(new Atom('C'),
          new Lambda(this.variable, Texpr.left).T()), Texpr.right);
    } else if ((! Texpr.left.free(this.variable)) &&
        Texpr.right.free(this.variable)) {
      return new Expr(new Expr(new Atom('B'), Texpr.left),
          new Lambda(this.variable, Texpr.right).T());
    } else {
      return new Expr(new Expr(new Atom('S'),
          new Lambda(this.variable, Texpr.left).T()),
          new Lambda(this.variable, Texpr.right).T());
    }
  };
  this.free = function(atom) {
    return (! this.variable.is(atom)) && this.expr.free(atom);
  };
  this.is = function(atom) { return false; };
}

