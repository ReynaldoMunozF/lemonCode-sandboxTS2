
import { calculaTicket } from "./calculos";
import { productos } from "./datos";

const ticket = calculaTicket(productos);

console.log("Ticket detallado:");
console.log(ticket);

console.log("\nDesglose de IVA por tipo:");
ticket.desgloseIva.forEach(item => {
  console.log(`IVA ${item.tipoIva}: ${item.cuantia} €`);
});
