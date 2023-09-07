import rt from "__STATIC_CONTENT_MANIFEST";
var Tt = class {
}, Et = (r) => {
  const e = r.split("/");
  return e[0] === "" && e.shift(), e;
}, Rt = (r) => {
  const e = [];
  for (let s = 0; ; ) {
    let n = !1;
    if (r = r.replace(/\{[^}]+\}/g, (a) => {
      const i = `@\\${s}`;
      return e[s] = [i, a], s++, n = !0, i;
    }), !n)
      break;
  }
  const t = r.split("/");
  t[0] === "" && t.shift();
  for (let s = e.length - 1; s >= 0; s--) {
    const [n] = e[s];
    for (let a = t.length - 1; a >= 0; a--)
      if (t[a].indexOf(n) !== -1) {
        t[a] = t[a].replace(n, e[s][1]);
        break;
      }
  }
  return t;
}, xe = {}, St = (r) => {
  if (r === "*")
    return "*";
  const e = r.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  return e ? (xe[r] || (e[2] ? xe[r] = [r, e[1], new RegExp("^" + e[2] + "$")] : xe[r] = [r, e[1], !0]), xe[r]) : null;
}, st = (r) => {
  const e = r.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return e ? e[1] : "";
}, Ot = (r) => {
  const e = r.indexOf("?", 8);
  return e === -1 ? "" : "?" + r.slice(e + 1);
}, Ct = (r) => {
  const e = st(r);
  return e.length > 1 && e[e.length - 1] === "/" ? e.slice(0, -1) : e;
}, te = (...r) => {
  let e = "", t = !1;
  for (let s of r)
    e[e.length - 1] === "/" && (e = e.slice(0, -1), t = !0), s[0] !== "/" && (s = `/${s}`), s === "/" && t ? e = `${e}/` : s !== "/" && (e = `${e}${s}`), s === "/" && e === "" && (e = "/");
  return e;
}, nt = (r) => {
  const e = r.match(/^(.+|)(\/\:[^\/]+)\?$/);
  if (!e)
    return null;
  const t = e[1], s = t + e[2];
  return [t === "" ? "/" : t.replace(/\/$/, ""), s];
}, Me = (r) => /[%+]/.test(r) ? (r.indexOf("+") !== -1 && (r = r.replace(/\+/g, " ")), /%/.test(r) ? ne(r) : r) : r, at = (r, e, t) => {
  let s;
  if (!t && e && !/[%+]/.test(e)) {
    let i = r.indexOf(`?${e}`, 8);
    for (i === -1 && (i = r.indexOf(`&${e}`, 8)); i !== -1; ) {
      const o = r.charCodeAt(i + e.length + 1);
      if (o === 61) {
        const d = i + e.length + 2, c = r.indexOf("&", d);
        return Me(r.slice(d, c === -1 ? void 0 : c));
      } else if (o == 38 || isNaN(o))
        return "";
      i = r.indexOf(`&${e}`, i + 1);
    }
    if (s = /[%+]/.test(r), !s)
      return;
  }
  const n = {};
  s ?? (s = /[%+]/.test(r));
  let a = r.indexOf("?", 8);
  for (; a !== -1; ) {
    const i = r.indexOf("&", a + 1);
    let o = r.indexOf("=", a);
    o > i && i !== -1 && (o = -1);
    let d = r.slice(
      a + 1,
      o === -1 ? i === -1 ? void 0 : i : o
    );
    if (s && (d = Me(d)), a = i, d === "")
      continue;
    let c;
    o === -1 ? c = "" : (c = r.slice(o + 1, i === -1 ? void 0 : i), s && (c = Me(c))), t ? (n[d] ?? (n[d] = [])).push(c) : n[d] ?? (n[d] = c);
  }
  return e ? n[e] : n;
}, Nt = at, jt = (r, e) => at(r, e, !0), ne = decodeURIComponent, Zt = (r, e) => {
  const s = r.split(/;\s*/g).map((n) => n.split(/\s*=\s*([^\s]+)/));
  return e ? s.filter((n) => n[0] === e) : s;
}, ze = (r, e) => {
  const t = {}, s = Zt(r, e).filter((n) => {
    const a = n[1].split("."), i = a[1] ? ne(a[1]) : void 0;
    return !(a.length === 2 && i && i.length === 44 && i.endsWith("="));
  });
  for (let [n, a] of s)
    a = ne(a), t[n] = a;
  return t;
}, It = (r, e, t = {}) => {
  let s = `${r}=${e}`;
  return t && typeof t.maxAge == "number" && t.maxAge >= 0 && (s += `; Max-Age=${Math.floor(t.maxAge)}`), t.domain && (s += "; Domain=" + t.domain), t.path && (s += "; Path=" + t.path), t.expires && (s += "; Expires=" + t.expires.toUTCString()), t.httpOnly && (s += "; HttpOnly"), t.secure && (s += "; Secure"), t.sameSite && (s += `; SameSite=${t.sameSite}`), s;
}, At = (r, e, t = {}) => (e = encodeURIComponent(e), It(r, e, t)), we = class {
  constructor(r, e) {
    this.env = {}, this.finalized = !1, this.error = void 0, this._status = 200, this._h = void 0, this._pH = void 0, this._init = !0, this.notFoundHandler = () => new Response(), this.header = (t, s, n) => {
      if (s === void 0) {
        this._h ? this._h.delete(t) : this._pH && delete this._pH[t.toLocaleLowerCase()], this.finalized && this.res.headers.delete(t);
        return;
      }
      n != null && n.append ? (this._h || (this._init = !1, this._h = new Headers(this._pH), this._pH = {}), this._h.append(t, s)) : this._h ? this._h.set(t, s) : (this._pH ?? (this._pH = {}), this._pH[t.toLowerCase()] = s), this.finalized && (n != null && n.append ? this.res.headers.append(t, s) : this.res.headers.set(t, s));
    }, this.status = (t) => {
      this._status = t;
    }, this.set = (t, s) => {
      this._map || (this._map = {}), this._map[t] = s;
    }, this.get = (t) => this._map ? this._map[t] : void 0, this.newResponse = (t, s, n) => {
      var i;
      if (this._init && !n && !s && this._status === 200)
        return new Response(t, {
          headers: this._pH
        });
      if (s && typeof s != "number") {
        const o = new Response(t, s), d = (i = this._pH) == null ? void 0 : i["content-type"];
        return d && o.headers.set("content-type", d), o;
      }
      const a = s ?? this._status;
      this._pH ?? (this._pH = {}), this._h ?? (this._h = new Headers());
      for (const [o, d] of Object.entries(this._pH))
        this._h.set(o, d);
      if (this._res) {
        this._res.headers.forEach((o, d) => {
          var c;
          (c = this._h) == null || c.set(d, o);
        });
        for (const [o, d] of Object.entries(this._pH))
          this._h.set(o, d);
      }
      n ?? (n = {});
      for (const [o, d] of Object.entries(n))
        if (typeof d == "string")
          this._h.set(o, d);
        else {
          this._h.delete(o);
          for (const c of d)
            this._h.append(o, c);
        }
      return new Response(t, {
        status: a,
        headers: this._h
      });
    }, this.body = (t, s, n) => typeof s == "number" ? this.newResponse(t, s, n) : this.newResponse(t, s), this.text = (t, s, n) => {
      if (!this._pH) {
        if (this._init && !n && !s)
          return new Response(t);
        this._pH = {};
      }
      return this._pH["content-type"] && (this._pH["content-type"] = "text/plain; charset=UTF-8"), typeof s == "number" ? this.newResponse(t, s, n) : this.newResponse(t, s);
    }, this.json = (t, s, n) => {
      const a = JSON.stringify(t);
      return this._pH ?? (this._pH = {}), this._pH["content-type"] = "application/json; charset=UTF-8", typeof s == "number" ? this.newResponse(a, s, n) : this.newResponse(a, s);
    }, this.jsonT = (t, s, n) => ({
      response: typeof s == "number" ? this.json(t, s, n) : this.json(t, s),
      data: t,
      format: "json"
    }), this.html = (t, s, n) => (this._pH ?? (this._pH = {}), this._pH["content-type"] = "text/html; charset=UTF-8", typeof s == "number" ? this.newResponse(t, s, n) : this.newResponse(t, s)), this.redirect = (t, s = 302) => (this._h ?? (this._h = new Headers()), this._h.set("Location", t), this.newResponse(null, s)), this.cookie = (t, s, n) => {
      const a = At(t, s, n);
      this.header("set-cookie", a, { append: !0 });
    }, this.notFound = () => this.notFoundHandler(this), this.req = r, e && (this._exCtx = e.executionCtx, this.env = e.env, e.notFoundHandler && (this.notFoundHandler = e.notFoundHandler));
  }
  get event() {
    if (this._exCtx instanceof Tt)
      return this._exCtx;
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (this._exCtx)
      return this._exCtx;
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return this._init = !1, this._res || (this._res = new Response("404 Not Found", { status: 404 }));
  }
  set res(r) {
    this._init = !1, this._res && r && (this._res.headers.delete("content-type"), this._res.headers.forEach((e, t) => {
      r.headers.set(t, e);
    })), this._res = r, this.finalized = !0;
  }
  get runtime() {
    var e, t;
    const r = globalThis;
    return (r == null ? void 0 : r.Deno) !== void 0 ? "deno" : (r == null ? void 0 : r.Bun) !== void 0 ? "bun" : typeof (r == null ? void 0 : r.WebSocketPair) == "function" ? "workerd" : typeof (r == null ? void 0 : r.EdgeRuntime) == "string" ? "edge-light" : (r == null ? void 0 : r.fastly) !== void 0 ? "fastly" : (r == null ? void 0 : r.__lagon__) !== void 0 ? "lagon" : ((t = (e = r == null ? void 0 : r.process) == null ? void 0 : e.release) == null ? void 0 : t.name) === "node" ? "node" : "other";
  }
}, Ke = (r, e, t) => {
  const s = r.length;
  return (n, a) => {
    let i = -1;
    return o(0);
    function o(d) {
      if (d <= i)
        throw new Error("next() called multiple times");
      let c = r[d];
      i = d, d === s && a && (c = a);
      let u, p = !1;
      if (!c)
        n instanceof we && n.finalized === !1 && t && (u = t(n));
      else
        try {
          u = c(n, () => {
            const m = o(d + 1);
            return m instanceof Promise ? m : Promise.resolve(m);
          });
        } catch (m) {
          if (m instanceof Error && n instanceof we && e)
            n.error = m, u = e(m, n), p = !0;
          else
            throw m;
        }
      return u instanceof Promise ? u.then((m) => (m !== void 0 && "response" in m && (m = m.response), m && n.finalized === !1 && (n.res = m), n)).catch(async (m) => {
        if (m instanceof Error && n instanceof we && e)
          return n.error = m, n.res = await e(m, n), n;
        throw m;
      }) : (u !== void 0 && "response" in u && (u = u.response), u && (n.finalized === !1 || p) && (n.res = u), n);
    }
  };
}, Pt = class extends Error {
  constructor(r = 500, e) {
    super(e == null ? void 0 : e.message), this.res = e == null ? void 0 : e.res, this.status = r;
  }
  getResponse() {
    return this.res ? this.res : new Response(this.message, {
      status: this.status
    });
  }
}, $t = async (r) => {
  let e = {};
  const t = r.headers.get("Content-Type");
  if (t && (t.startsWith("multipart/form-data") || t.startsWith("application/x-www-form-urlencoded"))) {
    const s = {};
    (await r.formData()).forEach((n, a) => {
      s[a] = n;
    }), e = s;
  }
  return e;
}, Mt = class {
  constructor(r, e = "/", t) {
    this.bodyCache = {}, this.cachedBody = (s) => {
      const { bodyCache: n, raw: a } = this, i = n[s];
      return i || (n[s] = a[s]());
    }, this.raw = r, this.path = e, this.paramData = t, this.vData = {};
  }
  param(r) {
    if (this.paramData)
      if (r) {
        const e = this.paramData[r];
        return e ? /\%/.test(e) ? ne(e) : e : void 0;
      } else {
        const e = {};
        for (const [t, s] of Object.entries(this.paramData))
          s && typeof s == "string" && (e[t] = /\%/.test(s) ? ne(s) : s);
        return e;
      }
    return null;
  }
  query(r) {
    return Nt(this.url, r);
  }
  queries(r) {
    return jt(this.url, r);
  }
  header(r) {
    if (r)
      return this.raw.headers.get(r.toLowerCase()) ?? void 0;
    const e = {};
    return this.raw.headers.forEach((t, s) => {
      e[s] = t;
    }), e;
  }
  cookie(r) {
    const e = this.raw.headers.get("Cookie");
    if (!e)
      return;
    const t = ze(e);
    return r ? t[r] : t;
  }
  async parseBody() {
    return await $t(this);
  }
  json() {
    return this.cachedBody("json");
  }
  text() {
    return this.cachedBody("text");
  }
  arrayBuffer() {
    return this.cachedBody("arrayBuffer");
  }
  blob() {
    return this.cachedBody("blob");
  }
  formData() {
    return this.cachedBody("formData");
  }
  addValidatedData(r, e) {
    this.vData[r] = e;
  }
  valid(r) {
    return this.vData[r];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get headers() {
    return this.raw.headers;
  }
  get body() {
    return this.raw.body;
  }
  get bodyUsed() {
    return this.raw.bodyUsed;
  }
  get integrity() {
    return this.raw.integrity;
  }
  get keepalive() {
    return this.raw.keepalive;
  }
  get referrer() {
    return this.raw.referrer;
  }
  get signal() {
    return this.raw.signal;
  }
}, T = "ALL", Lt = "all", it = ["get", "post", "put", "delete", "options", "patch"], ot = class extends Error {
};
function Dt() {
  return class {
  };
}
var zt = (r) => r.text("404 Not Found", 404), Ye = (r, e) => {
  if (r instanceof Pt)
    return r.getResponse();
  console.trace(r);
  const t = "Internal Server Error";
  return e.text(t, 500);
}, ct = class extends Dt() {
  constructor(e = {}) {
    super(), this._basePath = "/", this.path = "/", this.routes = [], this.notFoundHandler = zt, this.errorHandler = Ye, this.head = () => (console.warn("`app.head()` is no longer used. `app.get()` implicitly handles the HEAD method."), this), this.handleEvent = (n) => this.dispatch(n.request, n, void 0, n.request.method), this.fetch = (n, a, i) => this.dispatch(n, i, a, n.method), this.request = (n, a) => {
      if (n instanceof Request)
        return a !== void 0 && (n = new Request(n, a)), this.fetch(n);
      n = n.toString();
      const i = /^https?:\/\//.test(n) ? n : `http://localhost${te("/", n)}`, o = new Request(i, a);
      return this.fetch(o);
    }, this.fire = () => {
      addEventListener("fetch", (n) => {
        n.respondWith(this.dispatch(n.request, n, void 0, n.request.method));
      });
    }, [...it, Lt].map((n) => {
      this[n] = (a, ...i) => (typeof a == "string" ? this.path = a : this.addRoute(n, this.path, a), i.map((o) => {
        typeof o != "string" && this.addRoute(n, this.path, o);
      }), this);
    }), this.on = (n, a, ...i) => {
      if (!n)
        return this;
      this.path = a;
      for (const o of [n].flat())
        i.map((d) => {
          this.addRoute(o.toUpperCase(), this.path, d);
        });
      return this;
    }, this.use = (n, ...a) => (typeof n == "string" ? this.path = n : a.unshift(n), a.map((i) => {
      this.addRoute(T, this.path, i);
    }), this);
    const s = e.strict ?? !0;
    delete e.strict, Object.assign(this, e), this.getPath = s ? e.getPath ?? st : Ct;
  }
  clone() {
    const e = new ct({
      router: this.router,
      getPath: this.getPath
    });
    return e.routes = this.routes, e;
  }
  route(e, t) {
    const s = this.basePath(e);
    return t ? (t.routes.map((n) => {
      const a = t.errorHandler === Ye ? n.handler : async (i, o) => (await Ke([n.handler], t.errorHandler)(i, o)).res;
      s.addRoute(n.method, n.path, a);
    }), this) : s;
  }
  basePath(e) {
    const t = this.clone();
    return t._basePath = te(this._basePath, e), t;
  }
  onError(e) {
    return this.errorHandler = e, this;
  }
  notFound(e) {
    return this.notFoundHandler = e, this;
  }
  showRoutes() {
    this.routes.map((t) => {
      console.log(
        `\x1B[32m${t.method}\x1B[0m ${" ".repeat(8 - t.method.length)} ${t.path}`
      );
    });
  }
  mount(e, t, s) {
    const n = te(this._basePath, e), a = n === "/" ? 0 : n.length, i = async (o, d) => {
      let c;
      try {
        c = o.executionCtx;
      } catch {
      }
      const u = s ? s(o) : [o.env, c], p = Array.isArray(u) ? u : [u], m = Ot(o.req.url), b = await t(
        new Request(
          new URL((o.req.path.slice(a) || "/") + m, o.req.url),
          o.req.raw
        ),
        ...p
      );
      if (b)
        return b;
      await d();
    };
    return this.addRoute(T, te(e, "*"), i), this;
  }
  get routerName() {
    return this.matchRoute("GET", "/"), this.router.name;
  }
  addRoute(e, t, s) {
    e = e.toUpperCase(), this._basePath && (t = te(this._basePath, t)), this.router.add(e, t, s);
    const n = { path: t, method: e, handler: s };
    this.routes.push(n);
  }
  matchRoute(e, t) {
    return this.router.match(e, t) || { handlers: [], params: {} };
  }
  handleError(e, t) {
    if (e instanceof Error)
      return this.errorHandler(e, t);
    throw e;
  }
  dispatch(e, t, s, n) {
    const a = this.getPath(e, { env: s });
    if (n === "HEAD")
      return (async () => new Response(null, await this.dispatch(e, t, s, "GET")))();
    const { handlers: i, params: o } = this.matchRoute(n, a), d = new we(new Mt(e, a, o), {
      env: s,
      executionCtx: t,
      notFoundHandler: this.notFoundHandler
    });
    if (i.length === 1) {
      let u;
      try {
        if (u = i[0](d, async () => {
        }), !u)
          return this.notFoundHandler(d);
      } catch (p) {
        return this.handleError(p, d);
      }
      return u.constructor.name === "Response" || ("response" in u && (u = u.response), u.constructor.name === "Response") ? u : (async () => {
        let p;
        try {
          if (p = await u, p !== void 0 && "response" in p && (p = p.response), !p)
            return this.notFoundHandler(d);
        } catch (m) {
          return this.handleError(m, d);
        }
        return p;
      })();
    }
    const c = Ke(i, this.errorHandler, this.notFoundHandler);
    return (async () => {
      try {
        const u = c(d), p = u.constructor.name === "Promise" ? await u : u;
        if (!p.finalized)
          throw new Error(
            "Context is not finalized. You may forget returning Response object or `await next()`"
          );
        return p.res;
      } catch (u) {
        return this.handleError(u, d);
      }
    })();
  }
}, Te = "[^/]+", re = ".*", se = "(?:|/.*)", be = Symbol();
function Ht(r, e) {
  return r.length === 1 ? e.length === 1 ? r < e ? -1 : 1 : -1 : e.length === 1 || r === re || r === se ? 1 : e === re || e === se ? -1 : r === Te ? 1 : e === Te ? -1 : r.length === e.length ? r < e ? -1 : 1 : e.length - r.length;
}
var He = class {
  constructor() {
    this.children = {};
  }
  insert(e, t, s, n, a) {
    if (e.length === 0) {
      if (this.index !== void 0)
        throw be;
      if (a)
        return;
      this.index = t;
      return;
    }
    const [i, ...o] = e, d = i === "*" ? o.length === 0 ? ["", "", re] : ["", "", Te] : i === "/*" ? ["", "", se] : i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let c;
    if (d) {
      const u = d[1], p = d[2] || Te;
      if (c = this.children[p], !c) {
        if (Object.keys(this.children).some(
          (m) => m !== re && m !== se
        ))
          throw be;
        if (a)
          return;
        c = this.children[p] = new He(), u !== "" && (c.varIndex = n.varIndex++);
      }
      if (!a && u !== "") {
        if (s.some((m) => m[0] === u))
          throw new Error("Duplicate param name");
        s.push([u, c.varIndex]);
      }
    } else if (c = this.children[i], !c) {
      if (Object.keys(this.children).some(
        (u) => u.length > 1 && u !== re && u !== se
      ))
        throw be;
      if (a)
        return;
      c = this.children[i] = new He();
    }
    c.insert(o, t, s, n, a);
  }
  buildRegExpStr() {
    const t = Object.keys(this.children).sort(Ht).map((s) => {
      const n = this.children[s];
      return (typeof n.varIndex == "number" ? `(${s})@${n.varIndex}` : s) + n.buildRegExpStr();
    });
    return typeof this.index == "number" && t.unshift(`#${this.index}`), t.length === 0 ? "" : t.length === 1 ? t[0] : "(?:" + t.join("|") + ")";
  }
}, Vt = class {
  constructor() {
    this.context = { varIndex: 0 }, this.root = new He();
  }
  insert(r, e, t) {
    const s = [], n = [];
    for (let i = 0; ; ) {
      let o = !1;
      if (r = r.replace(/\{[^}]+\}/g, (d) => {
        const c = `@\\${i}`;
        return n[i] = [c, d], i++, o = !0, c;
      }), !o)
        break;
    }
    const a = r.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = n.length - 1; i >= 0; i--) {
      const [o] = n[i];
      for (let d = a.length - 1; d >= 0; d--)
        if (a[d].indexOf(o) !== -1) {
          a[d] = a[d].replace(o, n[i][1]);
          break;
        }
    }
    return this.root.insert(a, e, s, this.context, t), s;
  }
  buildRegExp() {
    let r = this.root.buildRegExpStr();
    if (r === "")
      return [/^$/, [], []];
    let e = 0;
    const t = [], s = [];
    return r = r.replace(/#(\d+)|@(\d+)|\.\*\$/g, (n, a, i) => typeof a < "u" ? (t[++e] = Number(a), "$()") : (typeof i < "u" && (s[Number(i)] = ++e), "")), [new RegExp(`^${r}`), t, s];
  }
}, Le = [T, ...it].map((r) => r.toUpperCase()), Qe = {}, Ut = [/^$/, [], {}], Ve = {};
function dt(r) {
  return Ve[r] ?? (Ve[r] = new RegExp(
    r === "*" ? "" : `^${r.replace(/\/\*/, "(?:|/.*)")}$`
  ));
}
function qt() {
  Ve = {};
}
function Bt(r) {
  const e = new Vt(), t = [];
  if (r.length === 0)
    return Ut;
  const s = r.map((c) => [!/\*|\/:/.test(c[0]), ...c]).sort(
    ([c, u], [p, m]) => c ? 1 : p ? -1 : u.length - m.length
  ), n = {};
  for (let c = 0, u = -1, p = s.length; c < p; c++) {
    const [m, b, P] = s[c];
    m ? n[b] = { handlers: P, params: Qe } : u++;
    let z;
    try {
      z = e.insert(b, u, m);
    } catch (ve) {
      throw ve === be ? new ot(b) : ve;
    }
    m || (t[u] = z.length === 0 ? [{ handlers: P, params: Qe }, null] : [P, z]);
  }
  const [a, i, o] = e.buildRegExp();
  for (let c = 0, u = t.length; c < u; c++) {
    const p = t[c][1];
    if (p)
      for (let m = 0, b = p.length; m < b; m++)
        p[m][1] = o[p[m][1]];
  }
  const d = [];
  for (const c in i)
    d[c] = t[i[c]];
  return [a, d, n];
}
function W(r, e) {
  if (r) {
    for (const t of Object.keys(r).sort((s, n) => n.length - s.length))
      if (dt(t).test(e))
        return [...r[t]];
  }
}
var Wt = class {
  constructor() {
    this.name = "RegExpRouter", this.middleware = { [T]: {} }, this.routes = { [T]: {} };
  }
  add(r, e, t) {
    var s;
    const { middleware: n, routes: a } = this;
    if (!n || !a)
      throw new Error("Can not add a route since the matcher is already built.");
    if (Le.indexOf(r) === -1 && Le.push(r), n[r] || [n, a].forEach((o) => {
      o[r] = {}, Object.keys(o[T]).forEach((d) => {
        o[r][d] = [...o[T][d]];
      });
    }), e === "/*" && (e = "*"), /\*$/.test(e)) {
      const o = dt(e);
      r === T ? Object.keys(n).forEach((d) => {
        var c;
        (c = n[d])[e] || (c[e] = W(n[d], e) || W(n[T], e) || []);
      }) : (s = n[r])[e] || (s[e] = W(n[r], e) || W(n[T], e) || []), Object.keys(n).forEach((d) => {
        (r === T || r === d) && Object.keys(n[d]).forEach((c) => {
          o.test(c) && n[d][c].push(t);
        });
      }), Object.keys(a).forEach((d) => {
        (r === T || r === d) && Object.keys(a[d]).forEach((c) => o.test(c) && a[d][c].push(t));
      });
      return;
    }
    const i = nt(e) || [e];
    for (let o = 0, d = i.length; o < d; o++) {
      const c = i[o];
      Object.keys(a).forEach((u) => {
        var p;
        (r === T || r === u) && ((p = a[u])[c] || (p[c] = [
          ...W(n[u], c) || W(n[T], c) || []
        ]), a[u][c].push(t));
      });
    }
  }
  match(r, e) {
    qt();
    const t = this.buildAllMatchers();
    return this.match = (s, n) => {
      const a = t[s], i = a[2][n];
      if (i)
        return i;
      const o = n.match(a[0]);
      if (!o)
        return null;
      const d = o.indexOf("", 1), [c, u] = a[1][d];
      if (!u)
        return c;
      const p = {};
      for (let m = 0, b = u.length; m < b; m++)
        p[u[m][0]] = o[u[m][1]];
      return { handlers: c, params: p };
    }, this.match(r, e);
  }
  buildAllMatchers() {
    const r = {};
    return Le.forEach((e) => {
      r[e] = this.buildMatcher(e) || r[T];
    }), this.middleware = this.routes = void 0, r;
  }
  buildMatcher(r) {
    const e = [];
    let t = r === T;
    return [this.middleware, this.routes].forEach((s) => {
      const n = s[r] ? Object.keys(s[r]).map((a) => [a, s[r][a]]) : [];
      n.length !== 0 ? (t || (t = !0), e.push(...n)) : r !== T && e.push(
        ...Object.keys(s[T]).map((a) => [a, s[T][a]])
      );
    }), t ? Bt(e) : null;
  }
}, Ft = class {
  constructor(r) {
    this.name = "SmartRouter", this.routers = [], this.routes = [], Object.assign(this, r);
  }
  add(r, e, t) {
    if (!this.routes)
      throw new Error("Can not add a route since the matcher is already built.");
    this.routes.push([r, e, t]);
  }
  match(r, e) {
    if (!this.routes)
      throw new Error("Fatal error");
    const { routers: t, routes: s } = this, n = t.length;
    let a = 0, i;
    for (; a < n; a++) {
      const o = t[a];
      try {
        s.forEach((d) => {
          o.add(...d);
        }), i = o.match(r, e);
      } catch (d) {
        if (d instanceof ot)
          continue;
        throw d;
      }
      this.match = o.match.bind(o), this.routers = [o], this.routes = void 0;
      break;
    }
    if (a === n)
      throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, i || null;
  }
  get activeRouter() {
    if (this.routes || this.routers.length !== 1)
      throw new Error("No active router has been determined yet.");
    return this.routers[0];
  }
};
function ut(r, e) {
  for (let s = 0, n = r.patterns.length; s < n; s++)
    if (typeof r.patterns[s] == "object" && r.patterns[s][1] === e)
      return !0;
  const t = Object.values(r.children);
  for (let s = 0, n = t.length; s < n; s++)
    if (ut(t[s], e))
      return !0;
  return !1;
}
var lt = class {
  constructor(r, e, t) {
    if (this.order = 0, this.children = t || {}, this.methods = [], this.name = "", r && e) {
      const s = {};
      s[r] = { handler: e, score: 0, name: this.name }, this.methods = [s];
    }
    this.patterns = [], this.handlerSetCache = {};
  }
  insert(r, e, t) {
    this.name = `${r} ${e}`, this.order = ++this.order;
    let s = this;
    const n = Rt(e), a = [], i = (c) => `Duplicate param name, use another name instead of '${c}' - ${r} ${e} <--- '${c}'`;
    for (let c = 0, u = n.length; c < u; c++) {
      const p = n[c];
      if (Object.keys(s.children).includes(p)) {
        a.push(...s.patterns), s = s.children[p];
        continue;
      }
      s.children[p] = new lt();
      const m = St(p);
      if (m) {
        if (typeof m == "object") {
          for (let b = 0, P = a.length; b < P; b++)
            if (typeof a[b] == "object" && a[b][1] === m[1])
              throw new Error(i(m[1]));
          if (Object.values(s.children).some((b) => ut(b, m[1])))
            throw new Error(i(m[1]));
        }
        s.patterns.push(m), a.push(...s.patterns);
      }
      a.push(...s.patterns), s = s.children[p];
    }
    s.methods.length || (s.methods = []);
    const o = {}, d = { handler: t, name: this.name, score: this.order };
    return o[r] = d, s.methods.push(o), s;
  }
  gHSets(r, e, t) {
    var s, n;
    return (s = r.handlerSetCache)[n = `${e}:${t ? "1" : "0"}`] || (s[n] = (() => {
      const a = [];
      for (let i = 0, o = r.methods.length; i < o; i++) {
        const d = r.methods[i], c = d[e] || d[T];
        c !== void 0 && a.push(c);
      }
      return a;
    })());
  }
  search(r, e) {
    const t = [], s = {};
    let a = [this];
    const i = Et(e);
    for (let c = 0, u = i.length; c < u; c++) {
      const p = i[c], m = c === u - 1, b = [];
      let P = !1;
      for (let z = 0, ve = a.length; z < ve; z++) {
        const B = a[z], Q = B.children[p];
        Q && (m === !0 ? (Q.children["*"] && t.push(...this.gHSets(Q.children["*"], r, !0)), t.push(...this.gHSets(Q, r)), P = !0) : b.push(Q));
        for (let Pe = 0, kt = B.patterns.length; Pe < kt; Pe++) {
          const Fe = B.patterns[Pe];
          if (Fe === "*") {
            const $e = B.children["*"];
            $e && (t.push(...this.gHSets($e, r)), b.push($e));
            continue;
          }
          if (p === "")
            continue;
          const [Je, _e, X] = Fe, ee = B.children[Je], Ge = i.slice(c).join("/");
          if (X instanceof RegExp && X.test(Ge)) {
            t.push(...this.gHSets(ee, r)), s[_e] = Ge;
            continue;
          }
          (X === !0 || X instanceof RegExp && X.test(p)) && (typeof Je == "string" && (m === !0 ? (t.push(...this.gHSets(ee, r)), ee.children["*"] && t.push(...this.gHSets(ee.children["*"], r))) : b.push(ee)), (typeof _e == "string" && !P || B.children[p]) && (s[_e] = p));
        }
      }
      a = b;
    }
    const o = t.length;
    return o === 0 ? null : o === 1 ? { handlers: [t[0].handler], params: s } : { handlers: t.sort((c, u) => c.score - u.score).map((c) => c.handler), params: s };
  }
}, Jt = class {
  constructor() {
    this.name = "TrieRouter", this.node = new lt();
  }
  add(r, e, t) {
    const s = nt(e);
    if (s) {
      for (const n of s)
        this.node.insert(r, n, t);
      return;
    }
    this.node.insert(r, e, t);
  }
  match(r, e) {
    return this.node.search(r, e);
  }
}, Gt = class extends ct {
  constructor(r = {}) {
    super(r), this.router = r.router ?? new Ft({
      routers: [new Wt(), new Jt()]
    });
  }
};
const Y = new Gt();
Y.onError((r, e) => (console.error(r.stack), e.text(r.stack ?? "Application error", 500, {
  "Content-Type": "text/plain"
})));
Y.all("/__/*", ({ req: r, env: e }) => {
  const t = new URL(r.url), s = `https://${e.GOOGLE_CLOUD_PROJECT}.web.app`;
  return fetch(`${s}${t.pathname}${t.search}`, r);
});
var Kt = (r, e) => {
  const t = r.req.raw.headers.get("Cookie");
  return typeof e == "string" ? t ? ze(t)[e] : void 0 : t ? ze(t) : {};
}, Yt = (r, e) => async (t, s) => {
  let n = {};
  switch (r) {
    case "json":
      try {
        n = await t.req.json();
      } catch {
        return console.error("Error: Malformed JSON in request body"), t.json(
          {
            success: !1,
            message: "Malformed JSON in request body"
          },
          400
        );
      }
      break;
    case "form":
      n = await t.req.parseBody();
      break;
    case "query":
      n = Object.fromEntries(
        Object.entries(t.req.queries()).map(([i, o]) => o.length === 1 ? [i, o[0]] : [i, o])
      );
      break;
    case "queries":
      n = t.req.queries(), console.log("Warnings: Validate type `queries` is deprecated. Use `query` instead.");
      break;
    case "param":
      n = t.req.param();
      break;
    case "header":
      n = t.req.header();
      break;
    case "cookie":
      n = Kt(t);
      break;
  }
  const a = await e(n, t);
  if (a instanceof Response)
    return a;
  t.req.addValidatedData(r, a), await s();
};
const Qt = (r, e, t) => Yt(r, (s, n) => {
  const a = e.safeParse(s);
  if (t) {
    const o = t({ data: s, ...a }, n);
    if (o) {
      if (o instanceof Response || o instanceof Promise)
        return o;
      if ("response" in o)
        return o.response;
    }
  }
  return a.success ? a.data : n.json(a, 400);
});
var w;
(function(r) {
  r.assertEqual = (n) => n;
  function e(n) {
  }
  r.assertIs = e;
  function t(n) {
    throw new Error();
  }
  r.assertNever = t, r.arrayToEnum = (n) => {
    const a = {};
    for (const i of n)
      a[i] = i;
    return a;
  }, r.getValidEnumValues = (n) => {
    const a = r.objectKeys(n).filter((o) => typeof n[n[o]] != "number"), i = {};
    for (const o of a)
      i[o] = n[o];
    return r.objectValues(i);
  }, r.objectValues = (n) => r.objectKeys(n).map(function(a) {
    return n[a];
  }), r.objectKeys = typeof Object.keys == "function" ? (n) => Object.keys(n) : (n) => {
    const a = [];
    for (const i in n)
      Object.prototype.hasOwnProperty.call(n, i) && a.push(i);
    return a;
  }, r.find = (n, a) => {
    for (const i of n)
      if (a(i))
        return i;
  }, r.isInteger = typeof Number.isInteger == "function" ? (n) => Number.isInteger(n) : (n) => typeof n == "number" && isFinite(n) && Math.floor(n) === n;
  function s(n, a = " | ") {
    return n.map((i) => typeof i == "string" ? `'${i}'` : i).join(a);
  }
  r.joinValues = s, r.jsonStringifyReplacer = (n, a) => typeof a == "bigint" ? a.toString() : a;
})(w || (w = {}));
var Ue;
(function(r) {
  r.mergeShapes = (e, t) => ({
    ...e,
    ...t
    // second overwrites first
  });
})(Ue || (Ue = {}));
const h = w.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), $ = (r) => {
  switch (typeof r) {
    case "undefined":
      return h.undefined;
    case "string":
      return h.string;
    case "number":
      return isNaN(r) ? h.nan : h.number;
    case "boolean":
      return h.boolean;
    case "function":
      return h.function;
    case "bigint":
      return h.bigint;
    case "symbol":
      return h.symbol;
    case "object":
      return Array.isArray(r) ? h.array : r === null ? h.null : r.then && typeof r.then == "function" && r.catch && typeof r.catch == "function" ? h.promise : typeof Map < "u" && r instanceof Map ? h.map : typeof Set < "u" && r instanceof Set ? h.set : typeof Date < "u" && r instanceof Date ? h.date : h.object;
    default:
      return h.unknown;
  }
}, l = w.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), Xt = (r) => JSON.stringify(r, null, 2).replace(/"([^"]+)":/g, "$1:");
class O extends Error {
  constructor(e) {
    super(), this.issues = [], this.addIssue = (s) => {
      this.issues = [...this.issues, s];
    }, this.addIssues = (s = []) => {
      this.issues = [...this.issues, ...s];
    };
    const t = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, t) : this.__proto__ = t, this.name = "ZodError", this.issues = e;
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const t = e || function(a) {
      return a.message;
    }, s = { _errors: [] }, n = (a) => {
      for (const i of a.issues)
        if (i.code === "invalid_union")
          i.unionErrors.map(n);
        else if (i.code === "invalid_return_type")
          n(i.returnTypeError);
        else if (i.code === "invalid_arguments")
          n(i.argumentsError);
        else if (i.path.length === 0)
          s._errors.push(t(i));
        else {
          let o = s, d = 0;
          for (; d < i.path.length; ) {
            const c = i.path[d];
            d === i.path.length - 1 ? (o[c] = o[c] || { _errors: [] }, o[c]._errors.push(t(i))) : o[c] = o[c] || { _errors: [] }, o = o[c], d++;
          }
        }
    };
    return n(this), s;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, w.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (t) => t.message) {
    const t = {}, s = [];
    for (const n of this.issues)
      n.path.length > 0 ? (t[n.path[0]] = t[n.path[0]] || [], t[n.path[0]].push(e(n))) : s.push(e(n));
    return { formErrors: s, fieldErrors: t };
  }
  get formErrors() {
    return this.flatten();
  }
}
O.create = (r) => new O(r);
const ae = (r, e) => {
  let t;
  switch (r.code) {
    case l.invalid_type:
      r.received === h.undefined ? t = "Required" : t = `Expected ${r.expected}, received ${r.received}`;
      break;
    case l.invalid_literal:
      t = `Invalid literal value, expected ${JSON.stringify(r.expected, w.jsonStringifyReplacer)}`;
      break;
    case l.unrecognized_keys:
      t = `Unrecognized key(s) in object: ${w.joinValues(r.keys, ", ")}`;
      break;
    case l.invalid_union:
      t = "Invalid input";
      break;
    case l.invalid_union_discriminator:
      t = `Invalid discriminator value. Expected ${w.joinValues(r.options)}`;
      break;
    case l.invalid_enum_value:
      t = `Invalid enum value. Expected ${w.joinValues(r.options)}, received '${r.received}'`;
      break;
    case l.invalid_arguments:
      t = "Invalid function arguments";
      break;
    case l.invalid_return_type:
      t = "Invalid function return type";
      break;
    case l.invalid_date:
      t = "Invalid date";
      break;
    case l.invalid_string:
      typeof r.validation == "object" ? "includes" in r.validation ? (t = `Invalid input: must include "${r.validation.includes}"`, typeof r.validation.position == "number" && (t = `${t} at one or more positions greater than or equal to ${r.validation.position}`)) : "startsWith" in r.validation ? t = `Invalid input: must start with "${r.validation.startsWith}"` : "endsWith" in r.validation ? t = `Invalid input: must end with "${r.validation.endsWith}"` : w.assertNever(r.validation) : r.validation !== "regex" ? t = `Invalid ${r.validation}` : t = "Invalid";
      break;
    case l.too_small:
      r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "more than"} ${r.minimum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at least" : "over"} ${r.minimum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${r.minimum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly equal to " : r.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(r.minimum))}` : t = "Invalid input";
      break;
    case l.too_big:
      r.type === "array" ? t = `Array must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "less than"} ${r.maximum} element(s)` : r.type === "string" ? t = `String must contain ${r.exact ? "exactly" : r.inclusive ? "at most" : "under"} ${r.maximum} character(s)` : r.type === "number" ? t = `Number must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "bigint" ? t = `BigInt must be ${r.exact ? "exactly" : r.inclusive ? "less than or equal to" : "less than"} ${r.maximum}` : r.type === "date" ? t = `Date must be ${r.exact ? "exactly" : r.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(r.maximum))}` : t = "Invalid input";
      break;
    case l.custom:
      t = "Invalid input";
      break;
    case l.invalid_intersection_types:
      t = "Intersection results could not be merged";
      break;
    case l.not_multiple_of:
      t = `Number must be a multiple of ${r.multipleOf}`;
      break;
    case l.not_finite:
      t = "Number must be finite";
      break;
    default:
      t = e.defaultError, w.assertNever(r);
  }
  return { message: t };
};
let ht = ae;
function er(r) {
  ht = r;
}
function Ee() {
  return ht;
}
const Re = (r) => {
  const { data: e, path: t, errorMaps: s, issueData: n } = r, a = [...t, ...n.path || []], i = {
    ...n,
    path: a
  };
  let o = "";
  const d = s.filter((c) => !!c).slice().reverse();
  for (const c of d)
    o = c(i, { data: e, defaultError: o }).message;
  return {
    ...n,
    path: a,
    message: n.message || o
  };
}, tr = [];
function f(r, e) {
  const t = Re({
    issueData: e,
    data: r.data,
    path: r.path,
    errorMaps: [
      r.common.contextualErrorMap,
      r.schemaErrorMap,
      Ee(),
      ae
      // then global default map
    ].filter((s) => !!s)
  });
  r.common.issues.push(t);
}
class E {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, t) {
    const s = [];
    for (const n of t) {
      if (n.status === "aborted")
        return v;
      n.status === "dirty" && e.dirty(), s.push(n.value);
    }
    return { status: e.value, value: s };
  }
  static async mergeObjectAsync(e, t) {
    const s = [];
    for (const n of t)
      s.push({
        key: await n.key,
        value: await n.value
      });
    return E.mergeObjectSync(e, s);
  }
  static mergeObjectSync(e, t) {
    const s = {};
    for (const n of t) {
      const { key: a, value: i } = n;
      if (a.status === "aborted" || i.status === "aborted")
        return v;
      a.status === "dirty" && e.dirty(), i.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof i.value < "u" || n.alwaysSet) && (s[a.value] = i.value);
    }
    return { status: e.value, value: s };
  }
}
const v = Object.freeze({
  status: "aborted"
}), ft = (r) => ({ status: "dirty", value: r }), R = (r) => ({ status: "valid", value: r }), qe = (r) => r.status === "aborted", Be = (r) => r.status === "dirty", ie = (r) => r.status === "valid", Se = (r) => typeof Promise < "u" && r instanceof Promise;
var y;
(function(r) {
  r.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, r.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(y || (y = {}));
class j {
  constructor(e, t, s, n) {
    this._cachedPath = [], this.parent = e, this.data = t, this._path = s, this._key = n;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const Xe = (r, e) => {
  if (ie(e))
    return { success: !0, data: e.value };
  if (!r.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const t = new O(r.common.issues);
      return this._error = t, this._error;
    }
  };
};
function _(r) {
  if (!r)
    return {};
  const { errorMap: e, invalid_type_error: t, required_error: s, description: n } = r;
  if (e && (t || s))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: n } : { errorMap: (i, o) => i.code !== "invalid_type" ? { message: o.defaultError } : typeof o.data > "u" ? { message: s ?? o.defaultError } : { message: t ?? o.defaultError }, description: n };
}
class x {
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return $(e.data);
  }
  _getOrReturnCtx(e, t) {
    return t || {
      common: e.parent.common,
      data: e.data,
      parsedType: $(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new E(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: $(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const t = this._parse(e);
    if (Se(t))
      throw new Error("Synchronous parse encountered promise.");
    return t;
  }
  _parseAsync(e) {
    const t = this._parse(e);
    return Promise.resolve(t);
  }
  parse(e, t) {
    const s = this.safeParse(e, t);
    if (s.success)
      return s.data;
    throw s.error;
  }
  safeParse(e, t) {
    var s;
    const n = {
      common: {
        issues: [],
        async: (s = t == null ? void 0 : t.async) !== null && s !== void 0 ? s : !1,
        contextualErrorMap: t == null ? void 0 : t.errorMap
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: $(e)
    }, a = this._parseSync({ data: e, path: n.path, parent: n });
    return Xe(n, a);
  }
  async parseAsync(e, t) {
    const s = await this.safeParseAsync(e, t);
    if (s.success)
      return s.data;
    throw s.error;
  }
  async safeParseAsync(e, t) {
    const s = {
      common: {
        issues: [],
        contextualErrorMap: t == null ? void 0 : t.errorMap,
        async: !0
      },
      path: (t == null ? void 0 : t.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: $(e)
    }, n = this._parse({ data: e, path: s.path, parent: s }), a = await (Se(n) ? n : Promise.resolve(n));
    return Xe(s, a);
  }
  refine(e, t) {
    const s = (n) => typeof t == "string" || typeof t > "u" ? { message: t } : typeof t == "function" ? t(n) : t;
    return this._refinement((n, a) => {
      const i = e(n), o = () => a.addIssue({
        code: l.custom,
        ...s(n)
      });
      return typeof Promise < "u" && i instanceof Promise ? i.then((d) => d ? !0 : (o(), !1)) : i ? !0 : (o(), !1);
    });
  }
  refinement(e, t) {
    return this._refinement((s, n) => e(s) ? !0 : (n.addIssue(typeof t == "function" ? t(s, n) : t), !1));
  }
  _refinement(e) {
    return new N({
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return I.create(this, this._def);
  }
  nullable() {
    return q.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return C.create(this, this._def);
  }
  promise() {
    return K.create(this, this._def);
  }
  or(e) {
    return ue.create([this, e], this._def);
  }
  and(e) {
    return le.create(this, e, this._def);
  }
  transform(e) {
    return new N({
      ..._(this._def),
      schema: this,
      typeName: g.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const t = typeof e == "function" ? e : () => e;
    return new ye({
      ..._(this._def),
      innerType: this,
      defaultValue: t,
      typeName: g.ZodDefault
    });
  }
  brand() {
    return new mt({
      typeName: g.ZodBranded,
      type: this,
      ..._(this._def)
    });
  }
  catch(e) {
    const t = typeof e == "function" ? e : () => e;
    return new je({
      ..._(this._def),
      innerType: this,
      catchValue: t,
      typeName: g.ZodCatch
    });
  }
  describe(e) {
    const t = this.constructor;
    return new t({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return ge.create(this, e);
  }
  readonly() {
    return Ie.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const rr = /^c[^\s-]{8,}$/i, sr = /^[a-z][a-z0-9]*$/, nr = /[0-9A-HJKMNP-TV-Z]{26}/, ar = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, ir = /^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, or = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u, cr = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, dr = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, ur = (r) => r.precision ? r.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${r.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${r.precision}}Z$`) : r.precision === 0 ? r.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : r.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function lr(r, e) {
  return !!((e === "v4" || !e) && cr.test(r) || (e === "v6" || !e) && dr.test(r));
}
class S extends x {
  constructor() {
    super(...arguments), this._regex = (e, t, s) => this.refinement((n) => e.test(n), {
      validation: t,
      code: l.invalid_string,
      ...y.errToObj(s)
    }), this.nonempty = (e) => this.min(1, y.errToObj(e)), this.trim = () => new S({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    }), this.toLowerCase = () => new S({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    }), this.toUpperCase = () => new S({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== h.string) {
      const a = this._getOrReturnCtx(e);
      return f(
        a,
        {
          code: l.invalid_type,
          expected: h.string,
          received: a.parsedType
        }
        //
      ), v;
    }
    const s = new E();
    let n;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), s.dirty());
      else if (a.kind === "length") {
        const i = e.data.length > a.value, o = e.data.length < a.value;
        (i || o) && (n = this._getOrReturnCtx(e, n), i ? f(n, {
          code: l.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : o && f(n, {
          code: l.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), s.dirty());
      } else if (a.kind === "email")
        ir.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "email",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "emoji")
        or.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "emoji",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "uuid")
        ar.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "uuid",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid")
        rr.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "cuid",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "cuid2")
        sr.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "cuid2",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "ulid")
        nr.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "ulid",
          code: l.invalid_string,
          message: a.message
        }), s.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          n = this._getOrReturnCtx(e, n), f(n, {
            validation: "url",
            code: l.invalid_string,
            message: a.message
          }), s.dirty();
        }
      else
        a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "regex",
          code: l.invalid_string,
          message: a.message
        }), s.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.invalid_string,
          validation: { includes: a.value, position: a.position },
          message: a.message
        }), s.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.invalid_string,
          validation: { startsWith: a.value },
          message: a.message
        }), s.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.invalid_string,
          validation: { endsWith: a.value },
          message: a.message
        }), s.dirty()) : a.kind === "datetime" ? ur(a).test(e.data) || (n = this._getOrReturnCtx(e, n), f(n, {
          code: l.invalid_string,
          validation: "datetime",
          message: a.message
        }), s.dirty()) : a.kind === "ip" ? lr(e.data, a.version) || (n = this._getOrReturnCtx(e, n), f(n, {
          validation: "ip",
          code: l.invalid_string,
          message: a.message
        }), s.dirty()) : w.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _addCheck(e) {
    return new S({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...y.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...y.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...y.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...y.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...y.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...y.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...y.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...y.errToObj(e) });
  }
  datetime(e) {
    var t;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (t = e == null ? void 0 : e.offset) !== null && t !== void 0 ? t : !1,
      ...y.errToObj(e == null ? void 0 : e.message)
    });
  }
  regex(e, t) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...y.errToObj(t)
    });
  }
  includes(e, t) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: t == null ? void 0 : t.position,
      ...y.errToObj(t == null ? void 0 : t.message)
    });
  }
  startsWith(e, t) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...y.errToObj(t)
    });
  }
  endsWith(e, t) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...y.errToObj(t)
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...y.errToObj(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...y.errToObj(t)
    });
  }
  length(e, t) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...y.errToObj(t)
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get minLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
S.create = (r) => {
  var e;
  return new S({
    checks: [],
    typeName: g.ZodString,
    coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
    ..._(r)
  });
};
function hr(r, e) {
  const t = (r.toString().split(".")[1] || "").length, s = (e.toString().split(".")[1] || "").length, n = t > s ? t : s, a = parseInt(r.toFixed(n).replace(".", "")), i = parseInt(e.toFixed(n).replace(".", ""));
  return a % i / Math.pow(10, n);
}
class M extends x {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== h.number) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_type,
        expected: h.number,
        received: a.parsedType
      }), v;
    }
    let s;
    const n = new E();
    for (const a of this._def.checks)
      a.kind === "int" ? w.isInteger(e.data) || (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), n.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), n.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), n.dirty()) : a.kind === "multipleOf" ? hr(e.data, a.value) !== 0 && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), n.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.not_finite,
        message: a.message
      }), n.dirty()) : w.assertNever(a);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, y.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, y.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, y.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, y.toString(t));
  }
  setLimit(e, t, s, n) {
    return new M({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: s,
          message: y.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new M({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: y.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: y.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: y.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: y.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: y.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: y.toString(t)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: y.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: y.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: y.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && w.isInteger(e.value));
  }
  get isFinite() {
    let e = null, t = null;
    for (const s of this._def.checks) {
      if (s.kind === "finite" || s.kind === "int" || s.kind === "multipleOf")
        return !0;
      s.kind === "min" ? (t === null || s.value > t) && (t = s.value) : s.kind === "max" && (e === null || s.value < e) && (e = s.value);
    }
    return Number.isFinite(t) && Number.isFinite(e);
  }
}
M.create = (r) => new M({
  checks: [],
  typeName: g.ZodNumber,
  coerce: (r == null ? void 0 : r.coerce) || !1,
  ..._(r)
});
class L extends x {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = BigInt(e.data)), this._getType(e) !== h.bigint) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_type,
        expected: h.bigint,
        received: a.parsedType
      }), v;
    }
    let s;
    const n = new E();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), n.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), n.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (s = this._getOrReturnCtx(e, s), f(s, {
        code: l.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), n.dirty()) : w.assertNever(a);
    return { status: n.value, value: e.data };
  }
  gte(e, t) {
    return this.setLimit("min", e, !0, y.toString(t));
  }
  gt(e, t) {
    return this.setLimit("min", e, !1, y.toString(t));
  }
  lte(e, t) {
    return this.setLimit("max", e, !0, y.toString(t));
  }
  lt(e, t) {
    return this.setLimit("max", e, !1, y.toString(t));
  }
  setLimit(e, t, s, n) {
    return new L({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: t,
          inclusive: s,
          message: y.toString(n)
        }
      ]
    });
  }
  _addCheck(e) {
    return new L({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: y.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: y.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: y.toString(e)
    });
  }
  multipleOf(e, t) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: y.toString(t)
    });
  }
  get minValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e;
  }
}
L.create = (r) => {
  var e;
  return new L({
    checks: [],
    typeName: g.ZodBigInt,
    coerce: (e = r == null ? void 0 : r.coerce) !== null && e !== void 0 ? e : !1,
    ..._(r)
  });
};
class oe extends x {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== h.boolean) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.boolean,
        received: s.parsedType
      }), v;
    }
    return R(e.data);
  }
}
oe.create = (r) => new oe({
  typeName: g.ZodBoolean,
  coerce: (r == null ? void 0 : r.coerce) || !1,
  ..._(r)
});
class V extends x {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== h.date) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_type,
        expected: h.date,
        received: a.parsedType
      }), v;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return f(a, {
        code: l.invalid_date
      }), v;
    }
    const s = new E();
    let n;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (n = this._getOrReturnCtx(e, n), f(n, {
        code: l.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), s.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (n = this._getOrReturnCtx(e, n), f(n, {
        code: l.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), s.dirty()) : w.assertNever(a);
    return {
      status: s.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new V({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, t) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: y.toString(t)
    });
  }
  max(e, t) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: y.toString(t)
    });
  }
  get minDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "min" && (e === null || t.value > e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const t of this._def.checks)
      t.kind === "max" && (e === null || t.value < e) && (e = t.value);
    return e != null ? new Date(e) : null;
  }
}
V.create = (r) => new V({
  checks: [],
  coerce: (r == null ? void 0 : r.coerce) || !1,
  typeName: g.ZodDate,
  ..._(r)
});
class Oe extends x {
  _parse(e) {
    if (this._getType(e) !== h.symbol) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.symbol,
        received: s.parsedType
      }), v;
    }
    return R(e.data);
  }
}
Oe.create = (r) => new Oe({
  typeName: g.ZodSymbol,
  ..._(r)
});
class ce extends x {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.undefined,
        received: s.parsedType
      }), v;
    }
    return R(e.data);
  }
}
ce.create = (r) => new ce({
  typeName: g.ZodUndefined,
  ..._(r)
});
class de extends x {
  _parse(e) {
    if (this._getType(e) !== h.null) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.null,
        received: s.parsedType
      }), v;
    }
    return R(e.data);
  }
}
de.create = (r) => new de({
  typeName: g.ZodNull,
  ..._(r)
});
class G extends x {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return R(e.data);
  }
}
G.create = (r) => new G({
  typeName: g.ZodAny,
  ..._(r)
});
class H extends x {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return R(e.data);
  }
}
H.create = (r) => new H({
  typeName: g.ZodUnknown,
  ..._(r)
});
class A extends x {
  _parse(e) {
    const t = this._getOrReturnCtx(e);
    return f(t, {
      code: l.invalid_type,
      expected: h.never,
      received: t.parsedType
    }), v;
  }
}
A.create = (r) => new A({
  typeName: g.ZodNever,
  ..._(r)
});
class Ce extends x {
  _parse(e) {
    if (this._getType(e) !== h.undefined) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.void,
        received: s.parsedType
      }), v;
    }
    return R(e.data);
  }
}
Ce.create = (r) => new Ce({
  typeName: g.ZodVoid,
  ..._(r)
});
class C extends x {
  _parse(e) {
    const { ctx: t, status: s } = this._processInputParams(e), n = this._def;
    if (t.parsedType !== h.array)
      return f(t, {
        code: l.invalid_type,
        expected: h.array,
        received: t.parsedType
      }), v;
    if (n.exactLength !== null) {
      const i = t.data.length > n.exactLength.value, o = t.data.length < n.exactLength.value;
      (i || o) && (f(t, {
        code: i ? l.too_big : l.too_small,
        minimum: o ? n.exactLength.value : void 0,
        maximum: i ? n.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: n.exactLength.message
      }), s.dirty());
    }
    if (n.minLength !== null && t.data.length < n.minLength.value && (f(t, {
      code: l.too_small,
      minimum: n.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.minLength.message
    }), s.dirty()), n.maxLength !== null && t.data.length > n.maxLength.value && (f(t, {
      code: l.too_big,
      maximum: n.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: n.maxLength.message
    }), s.dirty()), t.common.async)
      return Promise.all([...t.data].map((i, o) => n.type._parseAsync(new j(t, i, t.path, o)))).then((i) => E.mergeArray(s, i));
    const a = [...t.data].map((i, o) => n.type._parseSync(new j(t, i, t.path, o)));
    return E.mergeArray(s, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, t) {
    return new C({
      ...this._def,
      minLength: { value: e, message: y.toString(t) }
    });
  }
  max(e, t) {
    return new C({
      ...this._def,
      maxLength: { value: e, message: y.toString(t) }
    });
  }
  length(e, t) {
    return new C({
      ...this._def,
      exactLength: { value: e, message: y.toString(t) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
C.create = (r, e) => new C({
  type: r,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: g.ZodArray,
  ..._(e)
});
function F(r) {
  if (r instanceof k) {
    const e = {};
    for (const t in r.shape) {
      const s = r.shape[t];
      e[t] = I.create(F(s));
    }
    return new k({
      ...r._def,
      shape: () => e
    });
  } else
    return r instanceof C ? new C({
      ...r._def,
      type: F(r.element)
    }) : r instanceof I ? I.create(F(r.unwrap())) : r instanceof q ? q.create(F(r.unwrap())) : r instanceof Z ? Z.create(r.items.map((e) => F(e))) : r;
}
class k extends x {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), t = w.objectKeys(e);
    return this._cached = { shape: e, keys: t };
  }
  _parse(e) {
    if (this._getType(e) !== h.object) {
      const c = this._getOrReturnCtx(e);
      return f(c, {
        code: l.invalid_type,
        expected: h.object,
        received: c.parsedType
      }), v;
    }
    const { status: s, ctx: n } = this._processInputParams(e), { shape: a, keys: i } = this._getCached(), o = [];
    if (!(this._def.catchall instanceof A && this._def.unknownKeys === "strip"))
      for (const c in n.data)
        i.includes(c) || o.push(c);
    const d = [];
    for (const c of i) {
      const u = a[c], p = n.data[c];
      d.push({
        key: { status: "valid", value: c },
        value: u._parse(new j(n, p, n.path, c)),
        alwaysSet: c in n.data
      });
    }
    if (this._def.catchall instanceof A) {
      const c = this._def.unknownKeys;
      if (c === "passthrough")
        for (const u of o)
          d.push({
            key: { status: "valid", value: u },
            value: { status: "valid", value: n.data[u] }
          });
      else if (c === "strict")
        o.length > 0 && (f(n, {
          code: l.unrecognized_keys,
          keys: o
        }), s.dirty());
      else if (c !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const c = this._def.catchall;
      for (const u of o) {
        const p = n.data[u];
        d.push({
          key: { status: "valid", value: u },
          value: c._parse(
            new j(n, p, n.path, u)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: u in n.data
        });
      }
    }
    return n.common.async ? Promise.resolve().then(async () => {
      const c = [];
      for (const u of d) {
        const p = await u.key;
        c.push({
          key: p,
          value: await u.value,
          alwaysSet: u.alwaysSet
        });
      }
      return c;
    }).then((c) => E.mergeObjectSync(s, c)) : E.mergeObjectSync(s, d);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return y.errToObj, new k({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (t, s) => {
          var n, a, i, o;
          const d = (i = (a = (n = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(n, t, s).message) !== null && i !== void 0 ? i : s.defaultError;
          return t.code === "unrecognized_keys" ? {
            message: (o = y.errToObj(e).message) !== null && o !== void 0 ? o : d
          } : {
            message: d
          };
        }
      } : {}
    });
  }
  strip() {
    return new k({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new k({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new k({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new k({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: g.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, t) {
    return this.augment({ [e]: t });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new k({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const t = {};
    return w.objectKeys(e).forEach((s) => {
      e[s] && this.shape[s] && (t[s] = this.shape[s]);
    }), new k({
      ...this._def,
      shape: () => t
    });
  }
  omit(e) {
    const t = {};
    return w.objectKeys(this.shape).forEach((s) => {
      e[s] || (t[s] = this.shape[s]);
    }), new k({
      ...this._def,
      shape: () => t
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return F(this);
  }
  partial(e) {
    const t = {};
    return w.objectKeys(this.shape).forEach((s) => {
      const n = this.shape[s];
      e && !e[s] ? t[s] = n : t[s] = n.optional();
    }), new k({
      ...this._def,
      shape: () => t
    });
  }
  required(e) {
    const t = {};
    return w.objectKeys(this.shape).forEach((s) => {
      if (e && !e[s])
        t[s] = this.shape[s];
      else {
        let a = this.shape[s];
        for (; a instanceof I; )
          a = a._def.innerType;
        t[s] = a;
      }
    }), new k({
      ...this._def,
      shape: () => t
    });
  }
  keyof() {
    return pt(w.objectKeys(this.shape));
  }
}
k.create = (r, e) => new k({
  shape: () => r,
  unknownKeys: "strip",
  catchall: A.create(),
  typeName: g.ZodObject,
  ..._(e)
});
k.strictCreate = (r, e) => new k({
  shape: () => r,
  unknownKeys: "strict",
  catchall: A.create(),
  typeName: g.ZodObject,
  ..._(e)
});
k.lazycreate = (r, e) => new k({
  shape: r,
  unknownKeys: "strip",
  catchall: A.create(),
  typeName: g.ZodObject,
  ..._(e)
});
class ue extends x {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = this._def.options;
    function n(a) {
      for (const o of a)
        if (o.result.status === "valid")
          return o.result;
      for (const o of a)
        if (o.result.status === "dirty")
          return t.common.issues.push(...o.ctx.common.issues), o.result;
      const i = a.map((o) => new O(o.ctx.common.issues));
      return f(t, {
        code: l.invalid_union,
        unionErrors: i
      }), v;
    }
    if (t.common.async)
      return Promise.all(s.map(async (a) => {
        const i = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: t.data,
            path: t.path,
            parent: i
          }),
          ctx: i
        };
      })).then(n);
    {
      let a;
      const i = [];
      for (const d of s) {
        const c = {
          ...t,
          common: {
            ...t.common,
            issues: []
          },
          parent: null
        }, u = d._parseSync({
          data: t.data,
          path: t.path,
          parent: c
        });
        if (u.status === "valid")
          return u;
        u.status === "dirty" && !a && (a = { result: u, ctx: c }), c.common.issues.length && i.push(c.common.issues);
      }
      if (a)
        return t.common.issues.push(...a.ctx.common.issues), a.result;
      const o = i.map((d) => new O(d));
      return f(t, {
        code: l.invalid_union,
        unionErrors: o
      }), v;
    }
  }
  get options() {
    return this._def.options;
  }
}
ue.create = (r, e) => new ue({
  options: r,
  typeName: g.ZodUnion,
  ..._(e)
});
const ke = (r) => r instanceof fe ? ke(r.schema) : r instanceof N ? ke(r.innerType()) : r instanceof pe ? [r.value] : r instanceof D ? r.options : r instanceof me ? Object.keys(r.enum) : r instanceof ye ? ke(r._def.innerType) : r instanceof ce ? [void 0] : r instanceof de ? [null] : null;
class Ae extends x {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.object)
      return f(t, {
        code: l.invalid_type,
        expected: h.object,
        received: t.parsedType
      }), v;
    const s = this.discriminator, n = t.data[s], a = this.optionsMap.get(n);
    return a ? t.common.async ? a._parseAsync({
      data: t.data,
      path: t.path,
      parent: t
    }) : a._parseSync({
      data: t.data,
      path: t.path,
      parent: t
    }) : (f(t, {
      code: l.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [s]
    }), v);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, t, s) {
    const n = /* @__PURE__ */ new Map();
    for (const a of t) {
      const i = ke(a.shape[e]);
      if (!i)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const o of i) {
        if (n.has(o))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(o)}`);
        n.set(o, a);
      }
    }
    return new Ae({
      typeName: g.ZodDiscriminatedUnion,
      discriminator: e,
      options: t,
      optionsMap: n,
      ..._(s)
    });
  }
}
function We(r, e) {
  const t = $(r), s = $(e);
  if (r === e)
    return { valid: !0, data: r };
  if (t === h.object && s === h.object) {
    const n = w.objectKeys(e), a = w.objectKeys(r).filter((o) => n.indexOf(o) !== -1), i = { ...r, ...e };
    for (const o of a) {
      const d = We(r[o], e[o]);
      if (!d.valid)
        return { valid: !1 };
      i[o] = d.data;
    }
    return { valid: !0, data: i };
  } else if (t === h.array && s === h.array) {
    if (r.length !== e.length)
      return { valid: !1 };
    const n = [];
    for (let a = 0; a < r.length; a++) {
      const i = r[a], o = e[a], d = We(i, o);
      if (!d.valid)
        return { valid: !1 };
      n.push(d.data);
    }
    return { valid: !0, data: n };
  } else
    return t === h.date && s === h.date && +r == +e ? { valid: !0, data: r } : { valid: !1 };
}
class le extends x {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), n = (a, i) => {
      if (qe(a) || qe(i))
        return v;
      const o = We(a.value, i.value);
      return o.valid ? ((Be(a) || Be(i)) && t.dirty(), { status: t.value, value: o.data }) : (f(s, {
        code: l.invalid_intersection_types
      }), v);
    };
    return s.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      }),
      this._def.right._parseAsync({
        data: s.data,
        path: s.path,
        parent: s
      })
    ]).then(([a, i]) => n(a, i)) : n(this._def.left._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }), this._def.right._parseSync({
      data: s.data,
      path: s.path,
      parent: s
    }));
  }
}
le.create = (r, e, t) => new le({
  left: r,
  right: e,
  typeName: g.ZodIntersection,
  ..._(t)
});
class Z extends x {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.array)
      return f(s, {
        code: l.invalid_type,
        expected: h.array,
        received: s.parsedType
      }), v;
    if (s.data.length < this._def.items.length)
      return f(s, {
        code: l.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), v;
    !this._def.rest && s.data.length > this._def.items.length && (f(s, {
      code: l.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), t.dirty());
    const a = [...s.data].map((i, o) => {
      const d = this._def.items[o] || this._def.rest;
      return d ? d._parse(new j(s, i, s.path, o)) : null;
    }).filter((i) => !!i);
    return s.common.async ? Promise.all(a).then((i) => E.mergeArray(t, i)) : E.mergeArray(t, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Z({
      ...this._def,
      rest: e
    });
  }
}
Z.create = (r, e) => {
  if (!Array.isArray(r))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Z({
    items: r,
    typeName: g.ZodTuple,
    rest: null,
    ..._(e)
  });
};
class he extends x {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.object)
      return f(s, {
        code: l.invalid_type,
        expected: h.object,
        received: s.parsedType
      }), v;
    const n = [], a = this._def.keyType, i = this._def.valueType;
    for (const o in s.data)
      n.push({
        key: a._parse(new j(s, o, s.path, o)),
        value: i._parse(new j(s, s.data[o], s.path, o))
      });
    return s.common.async ? E.mergeObjectAsync(t, n) : E.mergeObjectSync(t, n);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, t, s) {
    return t instanceof x ? new he({
      keyType: e,
      valueType: t,
      typeName: g.ZodRecord,
      ..._(s)
    }) : new he({
      keyType: S.create(),
      valueType: e,
      typeName: g.ZodRecord,
      ..._(t)
    });
  }
}
class Ne extends x {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.map)
      return f(s, {
        code: l.invalid_type,
        expected: h.map,
        received: s.parsedType
      }), v;
    const n = this._def.keyType, a = this._def.valueType, i = [...s.data.entries()].map(([o, d], c) => ({
      key: n._parse(new j(s, o, s.path, [c, "key"])),
      value: a._parse(new j(s, d, s.path, [c, "value"]))
    }));
    if (s.common.async) {
      const o = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const d of i) {
          const c = await d.key, u = await d.value;
          if (c.status === "aborted" || u.status === "aborted")
            return v;
          (c.status === "dirty" || u.status === "dirty") && t.dirty(), o.set(c.value, u.value);
        }
        return { status: t.value, value: o };
      });
    } else {
      const o = /* @__PURE__ */ new Map();
      for (const d of i) {
        const c = d.key, u = d.value;
        if (c.status === "aborted" || u.status === "aborted")
          return v;
        (c.status === "dirty" || u.status === "dirty") && t.dirty(), o.set(c.value, u.value);
      }
      return { status: t.value, value: o };
    }
  }
}
Ne.create = (r, e, t) => new Ne({
  valueType: e,
  keyType: r,
  typeName: g.ZodMap,
  ..._(t)
});
class U extends x {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.parsedType !== h.set)
      return f(s, {
        code: l.invalid_type,
        expected: h.set,
        received: s.parsedType
      }), v;
    const n = this._def;
    n.minSize !== null && s.data.size < n.minSize.value && (f(s, {
      code: l.too_small,
      minimum: n.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.minSize.message
    }), t.dirty()), n.maxSize !== null && s.data.size > n.maxSize.value && (f(s, {
      code: l.too_big,
      maximum: n.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: n.maxSize.message
    }), t.dirty());
    const a = this._def.valueType;
    function i(d) {
      const c = /* @__PURE__ */ new Set();
      for (const u of d) {
        if (u.status === "aborted")
          return v;
        u.status === "dirty" && t.dirty(), c.add(u.value);
      }
      return { status: t.value, value: c };
    }
    const o = [...s.data.values()].map((d, c) => a._parse(new j(s, d, s.path, c)));
    return s.common.async ? Promise.all(o).then((d) => i(d)) : i(o);
  }
  min(e, t) {
    return new U({
      ...this._def,
      minSize: { value: e, message: y.toString(t) }
    });
  }
  max(e, t) {
    return new U({
      ...this._def,
      maxSize: { value: e, message: y.toString(t) }
    });
  }
  size(e, t) {
    return this.min(e, t).max(e, t);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
U.create = (r, e) => new U({
  valueType: r,
  minSize: null,
  maxSize: null,
  typeName: g.ZodSet,
  ..._(e)
});
class J extends x {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.function)
      return f(t, {
        code: l.invalid_type,
        expected: h.function,
        received: t.parsedType
      }), v;
    function s(o, d) {
      return Re({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Ee(),
          ae
        ].filter((c) => !!c),
        issueData: {
          code: l.invalid_arguments,
          argumentsError: d
        }
      });
    }
    function n(o, d) {
      return Re({
        data: o,
        path: t.path,
        errorMaps: [
          t.common.contextualErrorMap,
          t.schemaErrorMap,
          Ee(),
          ae
        ].filter((c) => !!c),
        issueData: {
          code: l.invalid_return_type,
          returnTypeError: d
        }
      });
    }
    const a = { errorMap: t.common.contextualErrorMap }, i = t.data;
    if (this._def.returns instanceof K) {
      const o = this;
      return R(async function(...d) {
        const c = new O([]), u = await o._def.args.parseAsync(d, a).catch((b) => {
          throw c.addIssue(s(d, b)), c;
        }), p = await Reflect.apply(i, this, u);
        return await o._def.returns._def.type.parseAsync(p, a).catch((b) => {
          throw c.addIssue(n(p, b)), c;
        });
      });
    } else {
      const o = this;
      return R(function(...d) {
        const c = o._def.args.safeParse(d, a);
        if (!c.success)
          throw new O([s(d, c.error)]);
        const u = Reflect.apply(i, this, c.data), p = o._def.returns.safeParse(u, a);
        if (!p.success)
          throw new O([n(u, p.error)]);
        return p.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new J({
      ...this._def,
      args: Z.create(e).rest(H.create())
    });
  }
  returns(e) {
    return new J({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, t, s) {
    return new J({
      args: e || Z.create([]).rest(H.create()),
      returns: t || H.create(),
      typeName: g.ZodFunction,
      ..._(s)
    });
  }
}
class fe extends x {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    return this._def.getter()._parse({ data: t.data, path: t.path, parent: t });
  }
}
fe.create = (r, e) => new fe({
  getter: r,
  typeName: g.ZodLazy,
  ..._(e)
});
class pe extends x {
  _parse(e) {
    if (e.data !== this._def.value) {
      const t = this._getOrReturnCtx(e);
      return f(t, {
        received: t.data,
        code: l.invalid_literal,
        expected: this._def.value
      }), v;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
pe.create = (r, e) => new pe({
  value: r,
  typeName: g.ZodLiteral,
  ..._(e)
});
function pt(r, e) {
  return new D({
    values: r,
    typeName: g.ZodEnum,
    ..._(e)
  });
}
class D extends x {
  _parse(e) {
    if (typeof e.data != "string") {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return f(t, {
        expected: w.joinValues(s),
        received: t.parsedType,
        code: l.invalid_type
      }), v;
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const t = this._getOrReturnCtx(e), s = this._def.values;
      return f(t, {
        received: t.data,
        code: l.invalid_enum_value,
        options: s
      }), v;
    }
    return R(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Values() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  get Enum() {
    const e = {};
    for (const t of this._def.values)
      e[t] = t;
    return e;
  }
  extract(e) {
    return D.create(e);
  }
  exclude(e) {
    return D.create(this.options.filter((t) => !e.includes(t)));
  }
}
D.create = pt;
class me extends x {
  _parse(e) {
    const t = w.getValidEnumValues(this._def.values), s = this._getOrReturnCtx(e);
    if (s.parsedType !== h.string && s.parsedType !== h.number) {
      const n = w.objectValues(t);
      return f(s, {
        expected: w.joinValues(n),
        received: s.parsedType,
        code: l.invalid_type
      }), v;
    }
    if (t.indexOf(e.data) === -1) {
      const n = w.objectValues(t);
      return f(s, {
        received: s.data,
        code: l.invalid_enum_value,
        options: n
      }), v;
    }
    return R(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
me.create = (r, e) => new me({
  values: r,
  typeName: g.ZodNativeEnum,
  ..._(e)
});
class K extends x {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    if (t.parsedType !== h.promise && t.common.async === !1)
      return f(t, {
        code: l.invalid_type,
        expected: h.promise,
        received: t.parsedType
      }), v;
    const s = t.parsedType === h.promise ? t.data : Promise.resolve(t.data);
    return R(s.then((n) => this._def.type.parseAsync(n, {
      path: t.path,
      errorMap: t.common.contextualErrorMap
    })));
  }
}
K.create = (r, e) => new K({
  type: r,
  typeName: g.ZodPromise,
  ..._(e)
});
class N extends x {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === g.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e), n = this._def.effect || null, a = {
      addIssue: (i) => {
        f(s, i), i.fatal ? t.abort() : t.dirty();
      },
      get path() {
        return s.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), n.type === "preprocess") {
      const i = n.transform(s.data, a);
      return s.common.issues.length ? {
        status: "dirty",
        value: s.data
      } : s.common.async ? Promise.resolve(i).then((o) => this._def.schema._parseAsync({
        data: o,
        path: s.path,
        parent: s
      })) : this._def.schema._parseSync({
        data: i,
        path: s.path,
        parent: s
      });
    }
    if (n.type === "refinement") {
      const i = (o) => {
        const d = n.refinement(o, a);
        if (s.common.async)
          return Promise.resolve(d);
        if (d instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return o;
      };
      if (s.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return o.status === "aborted" ? v : (o.status === "dirty" && t.dirty(), i(o.value), { status: t.value, value: o.value });
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((o) => o.status === "aborted" ? v : (o.status === "dirty" && t.dirty(), i(o.value).then(() => ({ status: t.value, value: o.value }))));
    }
    if (n.type === "transform")
      if (s.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: s.data,
          path: s.path,
          parent: s
        });
        if (!ie(i))
          return i;
        const o = n.transform(i.value, a);
        if (o instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: t.value, value: o };
      } else
        return this._def.schema._parseAsync({ data: s.data, path: s.path, parent: s }).then((i) => ie(i) ? Promise.resolve(n.transform(i.value, a)).then((o) => ({ status: t.value, value: o })) : i);
    w.assertNever(n);
  }
}
N.create = (r, e, t) => new N({
  schema: r,
  typeName: g.ZodEffects,
  effect: e,
  ..._(t)
});
N.createWithPreprocess = (r, e, t) => new N({
  schema: e,
  effect: { type: "preprocess", transform: r },
  typeName: g.ZodEffects,
  ..._(t)
});
class I extends x {
  _parse(e) {
    return this._getType(e) === h.undefined ? R(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
I.create = (r, e) => new I({
  innerType: r,
  typeName: g.ZodOptional,
  ..._(e)
});
class q extends x {
  _parse(e) {
    return this._getType(e) === h.null ? R(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
q.create = (r, e) => new q({
  innerType: r,
  typeName: g.ZodNullable,
  ..._(e)
});
class ye extends x {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e);
    let s = t.data;
    return t.parsedType === h.undefined && (s = this._def.defaultValue()), this._def.innerType._parse({
      data: s,
      path: t.path,
      parent: t
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ye.create = (r, e) => new ye({
  innerType: r,
  typeName: g.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ..._(e)
});
class je extends x {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = {
      ...t,
      common: {
        ...t.common,
        issues: []
      }
    }, n = this._def.innerType._parse({
      data: s.data,
      path: s.path,
      parent: {
        ...s
      }
    });
    return Se(n) ? n.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new O(s.common.issues);
        },
        input: s.data
      })
    })) : {
      status: "valid",
      value: n.status === "valid" ? n.value : this._def.catchValue({
        get error() {
          return new O(s.common.issues);
        },
        input: s.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
je.create = (r, e) => new je({
  innerType: r,
  typeName: g.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ..._(e)
});
class Ze extends x {
  _parse(e) {
    if (this._getType(e) !== h.nan) {
      const s = this._getOrReturnCtx(e);
      return f(s, {
        code: l.invalid_type,
        expected: h.nan,
        received: s.parsedType
      }), v;
    }
    return { status: "valid", value: e.data };
  }
}
Ze.create = (r) => new Ze({
  typeName: g.ZodNaN,
  ..._(r)
});
const fr = Symbol("zod_brand");
class mt extends x {
  _parse(e) {
    const { ctx: t } = this._processInputParams(e), s = t.data;
    return this._def.type._parse({
      data: s,
      path: t.path,
      parent: t
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ge extends x {
  _parse(e) {
    const { status: t, ctx: s } = this._processInputParams(e);
    if (s.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: s.data,
          path: s.path,
          parent: s
        });
        return a.status === "aborted" ? v : a.status === "dirty" ? (t.dirty(), ft(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: s.path,
          parent: s
        });
      })();
    {
      const n = this._def.in._parseSync({
        data: s.data,
        path: s.path,
        parent: s
      });
      return n.status === "aborted" ? v : n.status === "dirty" ? (t.dirty(), {
        status: "dirty",
        value: n.value
      }) : this._def.out._parseSync({
        data: n.value,
        path: s.path,
        parent: s
      });
    }
  }
  static create(e, t) {
    return new ge({
      in: e,
      out: t,
      typeName: g.ZodPipeline
    });
  }
}
class Ie extends x {
  _parse(e) {
    const t = this._def.innerType._parse(e);
    return ie(t) && (t.value = Object.freeze(t.value)), t;
  }
}
Ie.create = (r, e) => new Ie({
  innerType: r,
  typeName: g.ZodReadonly,
  ..._(e)
});
const yt = (r, e = {}, t) => r ? G.create().superRefine((s, n) => {
  var a, i;
  if (!r(s)) {
    const o = typeof e == "function" ? e(s) : typeof e == "string" ? { message: e } : e, d = (i = (a = o.fatal) !== null && a !== void 0 ? a : t) !== null && i !== void 0 ? i : !0, c = typeof o == "string" ? { message: o } : o;
    n.addIssue({ code: "custom", ...c, fatal: d });
  }
}) : G.create(), pr = {
  object: k.lazycreate
};
var g;
(function(r) {
  r.ZodString = "ZodString", r.ZodNumber = "ZodNumber", r.ZodNaN = "ZodNaN", r.ZodBigInt = "ZodBigInt", r.ZodBoolean = "ZodBoolean", r.ZodDate = "ZodDate", r.ZodSymbol = "ZodSymbol", r.ZodUndefined = "ZodUndefined", r.ZodNull = "ZodNull", r.ZodAny = "ZodAny", r.ZodUnknown = "ZodUnknown", r.ZodNever = "ZodNever", r.ZodVoid = "ZodVoid", r.ZodArray = "ZodArray", r.ZodObject = "ZodObject", r.ZodUnion = "ZodUnion", r.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", r.ZodIntersection = "ZodIntersection", r.ZodTuple = "ZodTuple", r.ZodRecord = "ZodRecord", r.ZodMap = "ZodMap", r.ZodSet = "ZodSet", r.ZodFunction = "ZodFunction", r.ZodLazy = "ZodLazy", r.ZodLiteral = "ZodLiteral", r.ZodEnum = "ZodEnum", r.ZodEffects = "ZodEffects", r.ZodNativeEnum = "ZodNativeEnum", r.ZodOptional = "ZodOptional", r.ZodNullable = "ZodNullable", r.ZodDefault = "ZodDefault", r.ZodCatch = "ZodCatch", r.ZodPromise = "ZodPromise", r.ZodBranded = "ZodBranded", r.ZodPipeline = "ZodPipeline", r.ZodReadonly = "ZodReadonly";
})(g || (g = {}));
const mr = (r, e = {
  message: `Input not instance of ${r.name}`
}) => yt((t) => t instanceof r, e), gt = S.create, vt = M.create, yr = Ze.create, gr = L.create, _t = oe.create, vr = V.create, _r = Oe.create, xr = ce.create, wr = de.create, br = G.create, kr = H.create, Tr = A.create, Er = Ce.create, Rr = C.create, Sr = k.create, Or = k.strictCreate, Cr = ue.create, Nr = Ae.create, jr = le.create, Zr = Z.create, Ir = he.create, Ar = Ne.create, Pr = U.create, $r = J.create, Mr = fe.create, Lr = pe.create, Dr = D.create, zr = me.create, Hr = K.create, et = N.create, Vr = I.create, Ur = q.create, qr = N.createWithPreprocess, Br = ge.create, Wr = () => gt().optional(), Fr = () => vt().optional(), Jr = () => _t().optional(), Gr = {
  string: (r) => S.create({ ...r, coerce: !0 }),
  number: (r) => M.create({ ...r, coerce: !0 }),
  boolean: (r) => oe.create({
    ...r,
    coerce: !0
  }),
  bigint: (r) => L.create({ ...r, coerce: !0 }),
  date: (r) => V.create({ ...r, coerce: !0 })
}, Kr = v;
var De = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: ae,
  setErrorMap: er,
  getErrorMap: Ee,
  makeIssue: Re,
  EMPTY_PATH: tr,
  addIssueToContext: f,
  ParseStatus: E,
  INVALID: v,
  DIRTY: ft,
  OK: R,
  isAborted: qe,
  isDirty: Be,
  isValid: ie,
  isAsync: Se,
  get util() {
    return w;
  },
  get objectUtil() {
    return Ue;
  },
  ZodParsedType: h,
  getParsedType: $,
  ZodType: x,
  ZodString: S,
  ZodNumber: M,
  ZodBigInt: L,
  ZodBoolean: oe,
  ZodDate: V,
  ZodSymbol: Oe,
  ZodUndefined: ce,
  ZodNull: de,
  ZodAny: G,
  ZodUnknown: H,
  ZodNever: A,
  ZodVoid: Ce,
  ZodArray: C,
  ZodObject: k,
  ZodUnion: ue,
  ZodDiscriminatedUnion: Ae,
  ZodIntersection: le,
  ZodTuple: Z,
  ZodRecord: he,
  ZodMap: Ne,
  ZodSet: U,
  ZodFunction: J,
  ZodLazy: fe,
  ZodLiteral: pe,
  ZodEnum: D,
  ZodNativeEnum: me,
  ZodPromise: K,
  ZodEffects: N,
  ZodTransformer: N,
  ZodOptional: I,
  ZodNullable: q,
  ZodDefault: ye,
  ZodCatch: je,
  ZodNaN: Ze,
  BRAND: fr,
  ZodBranded: mt,
  ZodPipeline: ge,
  ZodReadonly: Ie,
  custom: yt,
  Schema: x,
  ZodSchema: x,
  late: pr,
  get ZodFirstPartyTypeKind() {
    return g;
  },
  coerce: Gr,
  any: br,
  array: Rr,
  bigint: gr,
  boolean: _t,
  date: vr,
  discriminatedUnion: Nr,
  effect: et,
  enum: Dr,
  function: $r,
  instanceof: mr,
  intersection: jr,
  lazy: Mr,
  literal: Lr,
  map: Ar,
  nan: yr,
  nativeEnum: zr,
  never: Tr,
  null: wr,
  nullable: Ur,
  number: vt,
  object: Sr,
  oboolean: Jr,
  onumber: Fr,
  optional: Vr,
  ostring: Wr,
  pipeline: Br,
  preprocess: qr,
  promise: Hr,
  record: Ir,
  set: Pr,
  strictObject: Or,
  string: gt,
  symbol: _r,
  transformer: et,
  tuple: Zr,
  undefined: xr,
  union: Cr,
  unknown: kr,
  void: Er,
  NEVER: Kr,
  ZodIssueCode: l,
  quotelessJson: Xt,
  ZodError: O
});
Y.post(
  "/api/login",
  // Validate the request body using Zod
  Qt(
    "json",
    De.object({
      email: De.string({
        required_error: "Email is required"
      }),
      code: De.string().optional()
    })
  ),
  // Handle the request
  ({ req: r, jsonT: e }) => {
    const t = r.valid("json");
    return e({ email: t.email });
  }
);
Y.use("/api/*", ({ req: r }) => {
  const { pathname: e, search: t } = new URL(r.url);
  return fetch(
    `https://swapi.dev${e}${t}`,
    r.raw
  );
});
Y.get("/echo", ({ json: r, req: e }) => r({
  headers: Object.fromEntries(e.headers.entries()),
  cf: e.raw.cf
}));
var Yr = async (r, e) => {
  let t = {};
  e && e.manifest ? typeof e.manifest == "string" ? t = JSON.parse(e.manifest) : t = e.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? t = JSON.parse(__STATIC_CONTENT_MANIFEST) : t = __STATIC_CONTENT_MANIFEST;
  let s;
  e && e.namespace ? s = e.namespace : s = __STATIC_CONTENT;
  const n = t[r] || r;
  if (!n)
    return null;
  const a = await s.get(n, { type: "arrayBuffer" });
  return a || null;
}, Qr = (r) => {
  let e = r.filename;
  if (/(?:^|\/)\.\.(?:$|\/)/.test(e))
    return;
  let t = r.root || "";
  const s = r.defaultDocument || "index.html";
  e.endsWith("/") ? e = e.concat(s) : e.match(/\.[a-zA-Z0-9]+$/) || (e = e.concat("/" + s)), e = e.replace(/^\.?\//, ""), t = t.replace(/\/$/, "");
  let n = t ? t + "/" + e : e;
  return n = n.replace(/^\.?\//, ""), n;
}, xt = (r) => {
  const e = /\.([a-zA-Z0-9]+?)$/, t = r.match(e);
  if (!t)
    return;
  let s = Xr[t[1]];
  return (s && s.startsWith("text") || s === "application/json") && (s += "; charset=utf-8"), s;
}, Xr = {
  aac: "audio/aac",
  abw: "application/x-abiword",
  arc: "application/x-freearc",
  avi: "video/x-msvideo",
  avif: "image/avif",
  av1: "video/av1",
  azw: "application/vnd.amazon.ebook",
  bin: "application/octet-stream",
  bmp: "image/bmp",
  bz: "application/x-bzip",
  bz2: "application/x-bzip2",
  csh: "application/x-csh",
  css: "text/css",
  csv: "text/csv",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  eot: "application/vnd.ms-fontobject",
  epub: "application/epub+zip",
  gif: "image/gif",
  gz: "application/gzip",
  htm: "text/html",
  html: "text/html",
  ico: "image/x-icon",
  ics: "text/calendar",
  jar: "application/java-archive",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  jsonld: "application/ld+json",
  map: "application/json",
  mid: "audio/x-midi",
  midi: "audio/x-midi",
  mjs: "text/javascript",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  mpeg: "video/mpeg",
  mpkg: "application/vnd.apple.installer+xml",
  odp: "application/vnd.oasis.opendocument.presentation",
  ods: "application/vnd.oasis.opendocument.spreadsheet",
  odt: "application/vnd.oasis.opendocument.text",
  oga: "audio/ogg",
  ogv: "video/ogg",
  ogx: "application/ogg",
  opus: "audio/opus",
  otf: "font/otf",
  pdf: "application/pdf",
  php: "application/php",
  png: "image/png",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  rtf: "application/rtf",
  sh: "application/x-sh",
  svg: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  tar: "application/x-tar",
  tif: "image/tiff",
  tiff: "image/tiff",
  ts: "video/mp2t",
  ttf: "font/ttf",
  txt: "text/plain",
  vsd: "application/vnd.visio",
  wasm: "application/wasm",
  webm: "video/webm",
  weba: "audio/webm",
  webp: "image/webp",
  woff: "font/woff",
  woff2: "font/woff2",
  xhtml: "application/xhtml+xml",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xml: "application/xml",
  xul: "application/vnd.mozilla.xul+xml",
  zip: "application/zip",
  "3gp": "video/3gpp",
  "3g2": "video/3gpp2",
  "7z": "application/x-7z-compressed",
  gltf: "model/gltf+json",
  glb: "model/gltf-binary"
}, es = "index.html", ts = (r = { root: "" }) => async (e, t) => {
  if (e.finalized) {
    await t();
    return;
  }
  const s = new URL(e.req.url), n = r.path ?? decodeURI(s.pathname), a = Qr({
    filename: r.rewriteRequestPath ? r.rewriteRequestPath(n) : n,
    root: r.root,
    defaultDocument: es
  });
  if (!a)
    return await t();
  const i = await Yr(a, {
    manifest: r.manifest,
    namespace: r.namespace ? r.namespace : e.env ? e.env.__STATIC_CONTENT : void 0
  });
  if (i) {
    const o = xt(a);
    return o && e.header("Content-Type", o), e.body(i);
  } else
    console.warn(`Static file: ${a} is not found`), await t();
}, wt = (r = { root: "" }) => ts({
  root: r.root,
  path: r.path,
  manifest: r.manifest ? r.manifest : rt,
  rewriteRequestPath: r.rewriteRequestPath
});
const bt = JSON.parse(rt), rs = wt({ manifest: bt }), tt = wt({ path: "/index.html", manifest: bt });
Y.use("*", async (r, e) => {
  const t = new URL(r.req.url);
  if ([
    "",
    "/",
    "/dashboard",
    "/settings",
    "/settings/account",
    "/login",
    "/signup",
    "/privacy",
    "/terms"
  ].includes(t.pathname))
    return await tt(r, e);
  const n = await rs(r, e);
  if (!n && !xt(t.pathname)) {
    const a = await tt(r, e);
    if (a)
      return new Response(a.body, { ...a, status: 404 });
  }
  return n;
});
export {
  Y as default
};
