
import { validarClave } from "./validador";

const btnValidar = document.getElementById("validar")!;
const resultado = document.getElementById("resultado")!;
const inputUsuario = document.getElementById("usuario") as HTMLInputElement;
const inputClave = document.getElementById("clave") as HTMLInputElement;

btnValidar.addEventListener("click", () => {
  const usuario = inputUsuario.value;
  const clave = inputClave.value;
  const validacion = validarClave(usuario, clave);

  if (validacion.esValida) {
    resultado.textContent = "✅ Clave válida";
    resultado.className = "resultado valida";
  } else {
    resultado.textContent = `❌ ${validacion.error}`;
    resultado.className = "resultado invalida";
  }
});
