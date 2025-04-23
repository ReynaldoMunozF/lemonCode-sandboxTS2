
import {
    LineaTicket,
    TicketFinal,
    ResultadoLineaTicket,
    TotalPorTipoIva,
    TipoIva,
  } from "./modelos";
  import { porcentajeIva } from "./constantes";
  
  export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
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
  