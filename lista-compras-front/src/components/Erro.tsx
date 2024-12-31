import { Alert } from "react-bootstrap";

export function Erro(props: {
  mensagemErro: string;
}): JSX.Element {
  return (
    <>
      <div className="p-3">
        <Alert variant="danger" className="bi bi-info-circle">
          &nbsp;
          { props.mensagemErro }
        </Alert>
      </div>
    </>
  );
}