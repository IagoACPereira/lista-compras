import { useEffect, useState } from "react"
import { Carregamento } from "../components/Carregamento";
import { Erro } from "../components/Erro";
import axios from "axios";
import { Button, Form, ListGroup } from "react-bootstrap";
import { DeletaItem } from "../components/DeletaItem";
import { useNavigate } from "react-router-dom";
import { TItem } from "../types/Item.type";
import { env } from "../config/env";

export function Inicio(): JSX.Element {
  const [dados, setDados] = useState<TItem[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string>('Erro!'); 
  const navega = useNavigate();

  async function pegaItens(): Promise<void> {
    try {
      const resposta = await axios.get(`${ env.urlApi }/item`);
      setDados(resposta.data)
      setErro(false);
      setCarregando(false);
    } catch (error) {
      const erro = error as Error;
      setMensagemErro(erro.message);
      setCarregando(false);
      setErro(true)
    }
  };

  async function marcaItem(id: string | number): Promise<void> {
    try {
      const resposta = await axios.get(`${ env.urlApi }/item/${ id }`);
      const resposta2 = await axios.put(`${ env.urlApi }/item/${ id }`, {
        nome: resposta.data.nome,
        quantidade: resposta.data.quantidade,
        comprado: !resposta.data.comprado,
      });
      console.log(resposta2.data);
      navega(0);
    } catch (error) {
      const erro = error as Error;
      console.log(erro.message);
    }
  }

  useEffect(() => {
    pegaItens();
  }, []);

  if (carregando) return <Carregamento />
  
  if (erro) return <Erro mensagemErro={ mensagemErro } />

  return (
    <>
      <div className="p-3">
        <h1 className="mb-3">Inicio</h1>

        <Button variant="primary" className="mb-3 bi bi-plus-circle" onClick={() => navega('/novo-item')}>&nbsp; Adicionar Item</Button>

        <ListGroup>
          { dados.map((item, index) => (
            <ListGroup.Item key={ item.id } style={{
              display: 'grid',
              gridTemplateColumns: '9% 10% 30% 30% 19%',
              justifyContent: 'space-between'
            }}>
              <strong>{ index + 1 }.</strong>

              <Form.Check
                type='checkbox'
                id={`default-checkbox`}
                defaultChecked={ item.comprado }
                onClick={() => marcaItem(item.id)}
              />

              <span className={ item.comprado ? 'text-secondary text-decoration-line-through' : '' } style={{ textTransform: 'capitalize' }}>{ item.nome }</span>

              <span><strong>Qtd:</strong> { item.quantidade }</span>
              
              <div>
                <span className="bi bi-pencil-square text-primary pe-3" onClick={() => navega(`/atualiza-item?idItem=${ item.id }`)}></span>
                <DeletaItem id={ item.id } />
              </div>
            </ListGroup.Item>
          )) }
        </ListGroup>
      </div>
    </>
  )
}