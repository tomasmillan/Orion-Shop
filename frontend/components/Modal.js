import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "./Button";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
`;

const Modal = ({ onClose, message }) => {
    const router = useRouter(); 

    const handleClose = () => {
      
      onClose();
      router.push("/thanks");
    };
  return (
    <ModalWrapper>
      <ModalContent>
        <p>{message}</p>
        <Button onClick={handleClose}>Cerrar</Button>
      </ModalContent>
    </ModalWrapper>
  );
};

export default Modal;
