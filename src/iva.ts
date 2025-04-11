//  Tipos e interfaces 

type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

interface Producto {
  nombre: string;
  precio: number; 
  tipoIva: TipoIva;
}

interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precionSinIva: number;
  tipoIva: TipoIva;
  precioConIva: number;
}

interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalIva: number;
}

interface TotalPorTipoIva {
  tipoIva: TipoIva;
  cuantia: number;
}

interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
}

//  porcentajes de IVA 

const porcentajeIva: Record<TipoIva, number> = {
  general: 21,
  reducido: 10,
  superreducidoA: 5,
  superreducidoB: 4,
  superreducidoC: 0,
  sinIva: 0,
};

// Función  calcula el ticket 

const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {

  let totalSinIva = 0;
  let totalConIva = 0;

 
  const desgloseIvaMap: Record<TipoIva, number> = {
    general: 0,
    reducido: 0,
    superreducidoA: 0,
    superreducidoB: 0,
    superreducidoC: 0,
    sinIva: 0,
  };


  const lineas: ResultadoLineaTicket[] = lineasTicket.map(({ producto, cantidad }) => {
    const precioSinIva = producto.precio * cantidad;
    const iva = (precioSinIva * porcentajeIva[producto.tipoIva]) / 100;
    const precioConIva = precioSinIva + iva;

   
    totalSinIva += precioSinIva;
    totalConIva += precioConIva;
    desgloseIvaMap[producto.tipoIva] += iva;

    return {
      nombre: producto.nombre,
      cantidad,
      precionSinIva: parseFloat(precioSinIva.toFixed(2)),
      tipoIva: producto.tipoIva,
      precioConIva: parseFloat(precioConIva.toFixed(2)),
    };
  });

 
  const desgloseIva: TotalPorTipoIva[] = Object.entries(desgloseIvaMap).map(
    ([tipoIva, cuantia]) => ({
      tipoIva: tipoIva as TipoIva,
      cuantia: parseFloat(cuantia.toFixed(2)),
    })
  );

  return {
    lineas,
    total: {
      totalSinIva: parseFloat(totalSinIva.toFixed(2)),
      totalIva: parseFloat((totalConIva - totalSinIva).toFixed(2)),
      totalConIva: parseFloat(totalConIva.toFixed(2)),
    },
    desgloseIva,
  };
};

// Ejemplos 

const productos: LineaTicket[] = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Lasaña",
      precio: 5,
      tipoIva: "superreducidoA",
    },
    cantidad: 1,
  },
];

// Mostramos  por consola
console.log(calculaTicket(productos));
