import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { PopUpErro } from "../components/PopUpErro";
import { PopUpSucesso } from "../components/PopUpSucesso";
import { env } from "../config/env";

export function NovoItem(): JSX.Element {
  const [nome, setNome] = useState<string>('');
  const [quantidade, setQuantidade] = useState<number>(0);

  async function gravaItem(): Promise<void> {
    try {
      const resposta = await axios.post(`${ env.urlApi }/item`, {
        nome,
        quantidade,
        comprado: false,
      });
      
      PopUpSucesso(`${ resposta.data.nome } adicionado com sucesso`);
    } catch (error) {
      const erro = error as Error;
      PopUpErro(erro.message);
    }
  }

  return (
    <>
      <Form className="p-3" method="dialog" onSubmit={() => gravaItem()}>
        <h3 className="mb-3">Novo Item</h3>
        
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" placeholder="Insira o nome do item" onChange={ event => setNome(event.target.value) } />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Quantidade</Form.Label>
          <Form.Control type="number" placeholder="Insira a quantidade do item" onChange={ event => setQuantidade(Number(event.target.value)) } />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
      </Form>
    </>
  )
}