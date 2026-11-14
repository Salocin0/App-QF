import {
  parseChatLink,
  puedeAbrirEnApp,
  resolverRutasCompra,
  abrirLinkEnApp,
  unirUrl,
} from "../Views/Chatbot/chatLinkNavigation";

const BASE = "https://quickfood.example.com";

describe("parseChatLink", () => {
  it("reconoce el link de un evento", () => {
    expect(parseChatLink(`${BASE}/listado-puestos/12`)).toEqual({ tipo: "evento", eventoId: "12" });
  });

  it("reconoce el link de un puesto", () => {
    expect(parseChatLink(`${BASE}/productos-puesto/3?evento=12`)).toEqual({
      tipo: "puesto",
      eventoId: "12",
      puestoId: "3",
    });
  });

  it("reconoce el link de un producto (también relativo)", () => {
    expect(parseChatLink("/productos-puesto/3?evento=12&producto=7")).toEqual({
      tipo: "producto",
      eventoId: "12",
      puestoId: "3",
      productoId: "7",
    });
  });

  it("ignora links externos o incompletos", () => {
    expect(parseChatLink("https://tickets.real.com.ar/qf")).toBeNull();
    expect(parseChatLink(`${BASE}/productos-puesto/3`)).toBeNull();
    expect(parseChatLink(`${BASE}/productos-puesto/3?evento=abc`)).toBeNull();
    expect(parseChatLink("")).toBeNull();
    expect(parseChatLink(undefined)).toBeNull();
  });
});

describe("puedeAbrirEnApp", () => {
  it("solo para usuarios logueados cuyo menú tiene el flujo de compra", () => {
    expect(puedeAbrirEnApp({ idToken: "t", tipoUsuario: "consumidor" })).toBe(true);
    expect(puedeAbrirEnApp({ idToken: "t", tipoUsuario: "repartidor" })).toBe(false);
    expect(puedeAbrirEnApp({ tipoUsuario: "consumidor" })).toBe(false);
  });
});

describe("resolverRutasCompra", () => {
  const eventoEnCurso = { id: 12, estado: "EnCurso", tienePreventa: false };
  const puesto = { id: 3, nombreCarro: "Parrilla" };
  const productos = [{ id: 7, nombre: "Choripán" }, { id: 8, nombre: "Vacío" }];
  const fake = (evento) => async (path) => {
    if (path.startsWith("/evento/")) return evento;
    if (path.startsWith("/puesto/consultar/")) return puesto;
    if (path === "/producto") return productos;
    throw new Error(path);
  };

  it("un evento abre la elección de tipo de compra", async () => {
    const rutas = await resolverRutasCompra({ tipo: "evento", eventoId: "12" }, fake(eventoEnCurso));
    expect(rutas).toEqual([{ screen: "TipoCompra", params: { evento: eventoEnCurso } }]);
  });

  it("un producto de un evento en curso abre Puestos > Productos > Detalle", async () => {
    const rutas = await resolverRutasCompra(
      { tipo: "producto", eventoId: "12", puestoId: "3", productoId: "8" },
      fake(eventoEnCurso)
    );
    expect(rutas.map((r) => r.screen)).toEqual(["Puestos", "Productos", "Detalle"]);
    expect(rutas[1].params.puesto).toBe(puesto);
    expect(rutas[2].params.producto).toEqual({ id: 8, nombre: "Vacío" });
  });

  it("un puesto de un evento que no empezó pasa primero por la fecha de precompra", async () => {
    const confirmado = { ...eventoEnCurso, estado: "Confirmado" };
    const rutas = await resolverRutasCompra(
      { tipo: "puesto", eventoId: "12", puestoId: "3" },
      fake(confirmado)
    );
    expect(rutas).toEqual([{ screen: "TipoCompra", params: { evento: confirmado } }]);
  });
});

describe("abrirLinkEnApp", () => {
  it("une la URL del backend sin doble barra aunque termine en /", () => {
    expect(unirUrl("https://api.qf.test/", "/evento/12")).toBe("https://api.qf.test/evento/12");
    expect(unirUrl("https://api.qf.test", "/producto")).toBe("https://api.qf.test/producto");
  });

  it("navega dentro de la app con los datos del backend", async () => {
    global.fetch = jest.fn(async (url) => {
      expect(url).not.toMatch(/[^:]\/\//);
      return { ok: true, json: async () => ({ status: "success", data: { id: 12, estado: "EnCurso" } }) };
    });
    const navigation = { navigate: jest.fn() };
    const handled = await abrirLinkEnApp({
      href: `${BASE}/listado-puestos/12`,
      user: { idToken: "t", tipoUsuario: "consumidor" },
      navigation,
    });
    expect(handled).toBe(true);
    expect(navigation.navigate).toHaveBeenCalledWith("CompraStack", expect.objectContaining({ screen: "TipoCompra" }));
  });
  it("no maneja links cuando el rol no tiene flujo de compra", async () => {
    const navigation = { navigate: jest.fn() };
    const handled = await abrirLinkEnApp({
      href: `${BASE}/listado-puestos/12`,
      user: { idToken: "t", tipoUsuario: "repartidor" },
      navigation,
    });
    expect(handled).toBe(false);
    expect(navigation.navigate).not.toHaveBeenCalled();
  });
});
