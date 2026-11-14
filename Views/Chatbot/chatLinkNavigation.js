// Foody's links point at the web (FRONTEND_URL). Inside the app we recognise them and
// open the matching screen of the purchase flow (CompraStack) instead of the browser:
//   /listado-puestos/:eventoId                               -> event (TipoCompra)
//   /productos-puesto/:puestoId?evento=:eventoId             -> puesto products
//   /productos-puesto/:puestoId?evento=:eventoId&producto=:id -> product detail

// The .env value ends with "/"; joining must never produce "//evento/…" (Express answers 404).
export const unirUrl = (base, path) => `${String(base).replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;

const API_URL = process.env.EXPO_PUBLIC_API_URL || "https://backendnode-qf.onrender.com";

// Roles whose tab navigator includes CompraStack (see MainNavigator).
const ROLES_CON_COMPRA = ["consumidor", "encargado", "productor"];

const toId = (value) => (value != null && /^\d+$/.test(String(value)) ? String(value) : null);

// React Native's URL does not implement pathname/searchParams without a polyfill,
// so the link is split by hand.
const separarUrl = (href) => {
  const sinHash = href.trim().split("#")[0];
  const [antesQuery, query = ""] = sinHash.split("?");
  const path = antesQuery.replace(/^[a-z][a-z0-9+.-]*:\/\/[^/]*/i, "").replace(/\/+$/, "");
  const params = {};
  query.split("&").forEach((par) => {
    if (!par) return;
    const [k, v = ""] = par.split("=");
    try {
      params[decodeURIComponent(k)] = decodeURIComponent(v);
    } catch {
      params[k] = v;
    }
  });
  return { path, params };
};

export const parseChatLink = (href) => {
  if (typeof href !== "string" || !href.trim()) return null;
  const { path, params } = separarUrl(href);

  const evento = path.match(/^\/listado-puestos\/(\d+)$/i);
  if (evento) return { tipo: "evento", eventoId: evento[1] };

  const puesto = path.match(/^\/productos-puesto\/(\d+)$/i);
  const eventoId = toId(params.evento);
  if (puesto && eventoId) {
    const productoId = toId(params.producto);
    return productoId
      ? { tipo: "producto", eventoId, puestoId: puesto[1], productoId }
      : { tipo: "puesto", eventoId, puestoId: puesto[1] };
  }
  return null;
};

export const puedeAbrirEnApp = (user) =>
  Boolean(user?.idToken) && ROLES_CON_COMPRA.includes(user?.tipoUsuario);

const getData = async (path, headers = {}) => {
  const response = await fetch(unirUrl(API_URL, path), {
    headers: { "Content-Type": "application/json", ...headers },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok || body?.status !== "success") throw new Error("No se pudo abrir el enlace");
  return body.data;
};

// Builds the CompraStack screens to visit, in order, for a parsed link.
export const resolverRutasCompra = async (link, fetchData = getData) => {
  const evento = await fetchData(`/evento/${link.eventoId}`);
  // Events that have not started need the pre-order date picked in TipoCompra first.
  if (link.tipo === "evento" || evento?.estado !== "EnCurso") {
    return [{ screen: "TipoCompra", params: { evento } }];
  }

  const puesto = await fetchData(`/puesto/consultar/${link.puestoId}`);
  // Same params the app passes when the user walks the flow by hand (TipoCompra -> CardPuesto).
  const precompra = evento.tienePreventa;
  const rutas = [
    { screen: "Puestos", params: { evento, precompra: false } },
    { screen: "Productos", params: { evento, puesto, precompra, fecha: undefined } },
  ];

  if (link.tipo === "producto") {
    const productos = await fetchData("/producto", { puestoid: link.puestoId });
    const producto = Array.isArray(productos)
      ? productos.find((p) => String(p.id) === String(link.productoId))
      : null;
    if (producto) {
      rutas.push({ screen: "Detalle", params: { producto, puesto, evento, precompra, fecha: undefined } });
    }
  }
  return rutas;
};

// Returns true when the link was handled inside the app; false means "open it in the browser".
export const abrirLinkEnApp = async ({ href, user, navigation }) => {
  const link = parseChatLink(href);
  if (!link || !puedeAbrirEnApp(user)) return false;
  const rutas = await resolverRutasCompra(link);
  // Each nested navigate pushes onto CompraStack, so "back" walks the flow in reverse.
  rutas.forEach(({ screen, params }) => {
    navigation.navigate("CompraStack", { screen, params, initial: false });
  });
  return true;
};
