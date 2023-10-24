import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Image from "next/image";
import Link from "next/link";

const ThankYouWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  max-width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ImgError = styled.div`
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
          <h1>¡Ha habido un error!</h1>
          <ImgError>
            <Image
              src="https://img.freepik.com/vector-gratis/pequenas-personas-que-examinan-advertencia-error-sistema-operativo-pagina-web-aislaron-ilustracion-plana_74855-11104.jpg?size=626&ext=jpg&ga=GA1.1.1879863893.1698086799&semt=sph"
              alt="error"
              width={400} height={400}
            />
          </ImgError>
          <p>Hubo un problema por favor, intentelo de nuevo.</p>
          <RedirectHome>
            <Link href="/">Regresar al inicio</Link>
          </RedirectHome>
        </ThankYouWrapper>
      </Center>
    </>
  );
}
