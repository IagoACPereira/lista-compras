import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { TItem } from "../types/Item.type";
import { Carregamento } from "../components/Carregamento";
import { Erro } from "../components/Erro";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { PopUpSucesso } from "../components/PopUpSucesso";
import { PopUpErro } from "../components/PopUpErro";
import { env } from "../config/env";

export function AtualizaItem(): JSX.Element {
  const [item, setItem] = useState<TItem>({
    id: 0,
    nome: '',
    quantidade: 0,
    comprado: false,
  });
  const [carregando, setCarregando] = useState<boolean>(true);
  const [erro, setErro] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string>('Erro!'); 
  const [searchParams] = useSearchParams();
  const idItem = searchParams.get('idItem');
  const [nome, setNome] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(0);
  const [comprado, setComprado] = useState<boolean>(false);

  async function pegaDados() {
    try {
      const resposta = await axios.get(`${ env.urlApi }/item/${ idItem }`);
      setItem(resposta.data)
      setNome(resposta.data.nome)
      setQuantidade(resposta.data.quantidade);
      setComprado(resposta.data.comprado);
      setErro(false);
      setCarregando(false);
    } catch (error) {
      const erro = error as Error;
      setMensagemErro(erro.message);
      setCarregando(false);
      setErro(true)
    }
  }

  async function atualizaItem(): Promise<void> {
    try {
      const resposta = await axios.put(`${ env.urlApi }/item/${ idItem }`, {
        nome,
        quantidade,
        comprado,
      });
      PopUpSucesso(`${ resposta.data.nome } adicionado com sucesso`);
    } catch (error) {
      const erro = error as Error;
      PopUpErro(erro.message)
    }
  }

  useEffect(() => {
    pegaDados();
  }, [])

  if (carregando) return <Carregamento />
    
  if (erro) return <Erro mensagemErro={ mensagemErro } />

  return (
    <>
      <Form className="p-3" method="dialog" onSubmit={() => atualizaItem() }>
        <h3 className="mb-3" style={{ textTransform: 'capitalize' }}>{ item.nome }</h3>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Insira o nome do item" defaultValue={ item.nome } onChange={ event => setNome(event.target.value) } />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control type="number" placeholder="Insira a quantidade do item" defaultValue={ item.quantidade } onChange={ event => setQuantidade(Number(event.target.value)) } />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </>
  )
}