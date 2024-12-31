import { useNavigate } from "react-router-dom";

export function Cabecalho(): JSX.Element {
  const navega = useNavigate();
  return (
    <>
      <header className="p-3 bg-primary text-light" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1>Lista de Compras</h1>

        <span className="bi bi-house text-light" onClick={() => navega('/')}></span>
      </header>
    </>
  );
}