
var curry2 = function(f) { return function(x) { return function(y) {
  return f(x, y); }; }; };
var curry3 = function(f) { return function(x) { return function(y) {
  return function(z) { return f(x, y, z); }; }; }; };
var curry4 = function(f) { return function(x) { return function(y) {
  return function(z) { return function(t) { return f(x, y, z, t); }; }; }; };
  };
var uncurry2 = function(f) { return function(x, y) { return f(x)(y); }; };
var uncurry3 = function(f) { return function(x, y, z) { return f(x)(y)(z); };
  };
var uncurry4 = function(f) { return function(x, y, z, t) {
  return f(x)(y)(z)(t); }; };

var K = function(x) { return function(y) { return x; }; };
var S = function(x) { return function(y) { return function(z) {
  return x(z)(y(z)); }; }; };

var HalfThetaV = function(x) { return function(y) { return y( function(z) {
  return x(x)(y)(z); } ); }; };
var Y = HalfThetaV(HalfThetaV);

var I = S(K)(K);
var B = S(K(S))(K);
var C = S(B(B)(S))(K(K));
var T = C(I);
var V = B(C)(T);
var A1 = T(K);
var A2 = T(K(I));
var M = S(I)(I);
var U = M;

var Xfld = S(S(K(S))(S(K(S(K(S))))(S(K(S(K(K))))(S(K(S(K(S))))(S(K(S(K(K))))(
  S(K(S(K(S))))(S(K(S(K(K))))(S(K(S(K(S))))(S(K(S(K(K))))(S(K(S(K(S))))(S(K(S
  (S)))(S(K(K))(K)))))))))))))(S(S(K(S))(S(K(S(K(S))))(S(K(S(K(K))))(S(K(S(K(
  S))))(S(K(S(K(S(K(S))))))(S(K(S(K(S(K(K))))))(S(K(S(K(S(K(S))))))(S(K(S(K(S
  (K(K))))))(S(K(S(K(S(K(S))))))(S(K(S(S(K(S))(S(K(S(K(S))))(B)))))(S(K(K))(S
  (K(K))(K)))))))))))))(K(K(S(S(K(S))(S(K(K))(S(K(S))(S(K(S(K(S))))(S(K(S(K(S
  (K(S))))))(S(K(S(S(K(S))(S(K(S(K(S))))(S(K(K)))))))(S(K(K))(K))))))))(K(S(K
  (K))(K)))))));
var Xmap = S(S(K(S))(S(K(S(K(S))))(S(K(S(K(K))))(S(K(S(K(B))))(C)))))(K(K(S(K
  (B))(I))));
var Xconcat = B(C);
var Xshift = S(S(K(S))(S(K(S(K(S))))(S(K(S(K(S(K(S))))))(S(K(S(K(S(K(S(K(S)))
  )))))(S(K(S(K(S(K(S(K(S(K(S))))))))))(S(K(S(S(K(S))(S(K(K))(S(K(S))(S(K(K))
  (S(K(S))(S(K(K))(S)))))))))(S(K(K))(S(K(S(S(K(S))(S(K(K))(S(K(S))(S(K(S(K(S
  ))))(S(K(K)))))))))(S(K(S(K(S(K(K))))))(S(K(S(S(K(S))(S(K(S(K(S))))(S(K(K))
  )))))(S(K(K))(S(K(K))(K)))))))))))))(K(K(K)));

var Fnil = K(I);
var Fisnil = S(S(I)(K(K(K(K(I))))))(K(K));
var Fcons = S(S(K(S))(S(K(K))(S(K(S))(S(K(S(K(S))))(S(K(S(K(K))))(S(K(S(I)))(
  K)))))))(K(S(S(K(S))(S(K(S(K(S))))(S(K(S(K(K))))(S(B)(K(I))))))(K(K(I)))));
var Fcar = S(S(I)(K(K)))(K(K(I)));
var Fcdr = S(K(A1))(S(S(I)(K(S(K(S(S(K(V))(A2))))(S(S(K(S))(S(K(K))(Fcons)))(
  K(A2))))))(K(V(Fnil)(Fnil))));

var Ffld = Xfld(Fnil)(Fisnil)(Fcar)(Fcdr);
var Ffsl = S(K(S(K(S(B)))))(S(K(S(K(K))))(S(S(K(S))(S(K(K))(S)))(K(K))));
var Ffoldr0 = V;
var Ffoldl0 = S(S(K(S))(S(K(K))(S(K(S))(S(S(K(S))(S(K(K))(S(S(K(Ffoldr0))(
  Ffsl))(K(I)))))(K(I))))))(K(K));
var Ffoldr = Ffld(Ffoldr0);
var Ffoldl = Ffld(Ffoldl0);
var Fmap = Xmap(Ffoldr0)(Fnil)(Fcons);
var Fconcat = Xconcat(Ffoldr0)(Fcons);

var Fshift = Xshift(Fnil)(Fisnil)(Fcons);
var Fput = S(S(K(S))(S(K(S(I)))(S(K(K))(Fshift))))(K(K(Fnil)));

var Cnil = V(K)(K);
var Cisnil = A1;
var Ccons = S(K(S(K(V(K(I))))))(S(S(K(S))(S(K(K))(V)))(K(I)));
var Ccar = S(K(A1))(A2);
var Ccdr = S(K(A2))(A2);

var Cfld = Xfld(Cnil)(Cisnil)(Ccar)(Ccdr);
var Cfoldr0 = U( curry4( function(f, g, i, l) { return Cisnil(l)( function()
  { return i; } )( function() { return g(Ccar(l))(f(f)(g)(i)(Ccdr(l))); } )
  (); } ));
var Cfoldl0 = U( curry4( function(f, g, i, l) { return Cisnil(l)( function()
  { return i; } )( function() { return f(f)(g)(g(i)(Ccar(l)))(Ccdr(l)); } )
  (); } ));
var Cfoldr = Cfld(Cfoldr0);
var Cfoldl = Cfld(Cfoldl0);
var Cmap = Xmap(Cfoldr0)(Cnil)(Ccons);
var Cconcat = Xconcat(Cfoldr0)(Ccons);

var Cshift = Xshift(Cnil)(Cisnil)(Ccons);
var Cput = S(S(K(Cfoldr0))(Cshift))(K(Cnil));

var MProto = {
  mjoin: function(M) { return function() { return M.mbind(I); }; },
  mfmap: function(M) { return function(f) { return M.mbind( function(x) {
    return M.mreturn(f(x)); } ); }; },
  mbind: function(M) { return function(f) { return M.mfmap(f).mjoin(); }; },
  mguard: function(M) { return function(f) { return M.mbind( function(x) {
    return f(x) ? M.mreturn(x) : M.mzero(); } ); }; },
};

var MFlist = function(lst) {
  this.lst = lst;
  this.toArr = function() { return Ffoldr0(curry2( function(x, a) {
    a.unshift(x); return a; } ))([])(this.lst); }
  this.mzero = function() { return new MFlist(Fnil); }
  this.mplus = function(m) { return new MFlist(Fconcat(this.lst)(m.lst)); }
  this.mreturn = function(x) { return new MFlist(Fcons(x)(Fnil)); }
  this.mbind = function(f) { return Ffoldl(curry2( function(l, r) {
    return l.mplus(r); } ))(Fmap(f)(this.lst)); }
  this.mjoin = MProto.mjoin(this);
  this.mfmap = MProto.mfmap(this);
  this.mguard = MProto.mguard(this);
};

var MClist = function(lst) {
  this.lst = lst;
  this.toArr = function() { return Cfoldr0(curry2( function(x, a) {
    a.unshift(x); return a; } ))([])(this.lst); }
  this.mzero = function() { return new MClist(Cnil); }
  this.mplus = function(m) { return new MClist(Cconcat(this.lst)(m.lst)); }
  this.mreturn = function(x) { return new MClist(Ccons(x)(Cnil)); }
  this.mjoin = function() { return Cfoldl(curry2( function(l, r) {
    return l.mplus(r); } ))(this.lst); }
  this.mfmap = function(f) { return new MClist(Cmap(f)(this.lst)); }
  this.mbind = MProto.mbind(this);
  this.mguard = MProto.mguard(this);
};

var b2C = function(x) { return x ? K : K(I); };
var C2b = function(x) { return x(true)(false); };

/*
// manual abstraction elimination
var Cand = S(S)(K);
var Cor = S(S(K(S))(S(K(K))(S(I)(I))))(K(I));
var Cnot = C;
var Cxor = S(S(K(S))(S(K(S(K(S))))(S(K(S(K(S(K(S))))))(S(S(K(S))(S(K(K))(S(K(
  S))(S(K(K))(B)))))(K(S(S(K(S))(S(K(K))(S)))(K(K))))))))(K(S(S(K(S))(S(K(S(K
  (S))))(S(K(S(K(K))))(I))))(K(K(I)))));
*/

// automatic abstraction elimination
var Cand = S(C)(I);
var Cor = S(I)(I);
var Cnot = C;
var Cxor = C(B(S)(B(B(S))(B(B(B(S)))(C(B(B)(B(B)(B)))(C)))))(I);

var i2C = U( function(f) { return function(x) {
  return x == 0 ? K(I) : S(B)(S(S(K(S))(S(K(K))(S(K(f(f)(x - 1)))(I))))(K(I))
  ); }; } );
var C2i = function(x) { return x( function(n) { return ++n; } )(0); };

/*
// manual abstraction elimination
var Cplus = S(K(S))(S(K(S(K(S))))(S(K(K))));
var Csucc = S(B);
var Cmult = S(K(S(B)))(K);
var Cexp = T;
var Cpred = S(S(K(S))(S(K(S(K(S))))(S(S(K(S))(S(K(S(K(S))))(S(K(S(K(K))))(S(S
  (K(S))(K))(K(S(K(S(K(S(I)))))(S(K(S(K(K))))(S(K(S(I)))(K)))))))))(K(K(K))))
  ))(K(K(K(I))));
var Csub = S(K(S(S(I)(K(Cpred)))))(K);
var Ciszero = S(S(I)(K(K(K(I)))))(K(K));
*/

// automatic abstraction elimination
var Cplus = B(S)(B(B));
var Csucc = S(B);
var Cmult = C(B);
var Cexp = C(I);
var Cpred = C(B(C)(B(B(C))(C(B(C)(B(B(B))(C(B)(B(B(C(I)))(C(I))))))(K))))(I);
var Csub = C(C(I)(Cpred));
var Ciszero = C(C(I)(K(K(I))))(K);

var Cfactorial = U( function(f) { return function(x) { return Ciszero(x)(
  function() { return Csucc(K(I)); } )( function() { return Cmult(x)(f(f)(
  Cpred(x))); } )(); }; } );

var tst = function(m) {
  print(m.
    mfmap(i2C).
    mfmap(Cmult(i2C(3))).
    mguard( function(x) { return C2b(Cnot(Ciszero(i2C(C2i(x) % 2)))); } ).
    mbind( function(x) { return m.mreturn(x).mplus(m.mreturn(x)); } ).
    mfmap(B(Cpred)(C(Cexp)(i2C(2)))).
    mfmap(C2i).
    toArr());
};

var flst = Fcons(1)(Fcons(2)(Fcons(3)(Fcons(4)(Fcons(5)(Fnil)))));
var clst = Ccons(1)(Ccons(2)(Ccons(3)(Ccons(4)(Ccons(5)(Cnil)))));
var mc = new MClist(clst);
var mf = new MFlist(flst);
tst(mc);
tst(mf);

