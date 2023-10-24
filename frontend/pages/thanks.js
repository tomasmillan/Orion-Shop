import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Image from "next/image";
import Link from "next/link";

const ThankYouWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ImgThanks = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  Image {
    width: 80%;
    margin: 1.2rem;
  }
`;
const RedirectHome = styled.div`
  padding: 1rem;
  a {
    padding: 0.6rem;
    text-decoration: none;
    border-radius: 8px;
    background-color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border: 0.5px solid black;

    &:hover {
      padding: 0.7rem;
      background-color: black;
    }
  }
`;

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <Center>
        <ThankYouWrapper>
          <h1>¡Gracias por tu compra!</h1>
          <ImgThanks>
            <Image
              src="https://img.freepik.com/vector-premium/gente-celebrando-hombres-mujeres-jovenes-bailan-fiesta-celebracion-globos-alegres-e-ilustracion-confeti_102902-1816.jpg"
              alt="error"
              width={400} height={400}
            />
          </ImgThanks>
          <p>Te hemos enviado un correo con los detalles de tu pedido.</p>
          <RedirectHome>
            <Link href="/">Regresar al inicio</Link>
          </RedirectHome>
        </ThankYouWrapper>
      </Center>
    </>
  );
}
