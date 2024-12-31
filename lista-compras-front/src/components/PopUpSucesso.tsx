import Swal from "sweetalert2";

export function PopUpSucesso(mensagem: string): void {
  Swal.fire({
    title: "Sucesso!",
    text: mensagem,
    icon: "success"
  });
}