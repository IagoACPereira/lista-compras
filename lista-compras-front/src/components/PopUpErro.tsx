import Swal from "sweetalert2";

export function PopUpErro(mensagem: string): void {
  Swal.fire({
    title: "Erro!",
    text: mensagem,
    icon: "error"
  });
}