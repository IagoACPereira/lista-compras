import { Spinner } from "react-bootstrap";

export function Carregamento(): JSX.Element {
  return (
    <>
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center' 
      }} className="pt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    </>
  );
}