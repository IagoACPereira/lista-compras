import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Cabecalho } from "./components/Cabecalho"
import { NovoItem } from "./pages/NovoItem"
import { AtualizaItem } from "./pages/AtualizaItem"
import { Inicio } from "./pages/Inicio"
import './App.css';

function App(): JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Cabecalho />
        <Routes>
          <Route path="/" element={ <Inicio /> } />
          <Route path="/novo-item" element={ <NovoItem /> } />
          <Route path="/atualiza-item" element={ <AtualizaItem /> } />
        </Routes>
      </BrowserRouter>
    </>
  ) 
}

export default App
