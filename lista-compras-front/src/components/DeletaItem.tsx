import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PopUpErro } from './PopUpErro';
import axios from 'axios';
import { PopUpSucesso } from './PopUpSucesso';
import { useNavigate } from 'react-router-dom';
import { env } from '../config/env';

export function DeletaItem(props: { id: string | number }): JSX.Element {
  const [show, setShow] = useState(false);
  const navega = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function deletaItem(): Promise<void> {
    try {
      console.log(props.id);
      const resposta = await axios.delete(`${ env.urlApi }/item/${ props.id }`);
      PopUpSucesso(resposta.data);
      setTimeout(() => {
        navega(0);
      }, 2000);
    } catch (error) {
      const erro = error as Error;
      PopUpErro(erro.message);
    }
  } 



  return (
    <>
      <span className="bi bi-trash text-danger" onClick={ handleShow }></span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tem certeza disso?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir esse registro? Essa ação é irreversível!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Agora não
          </Button>
          <Button variant="primary" onClick={() => {
            deletaItem();
            handleClose()
          }}>
            Tenho certeza
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}