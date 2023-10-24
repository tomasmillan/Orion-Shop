import React, { useContext } from "react";
import Center from "./Center";
import styled from "styled-components";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { CartContext } from "./CartContext";
import Image from "next/image";

const Bg = styled.div`
  background-color: #5C5D66;
  color:#fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 1rem;
  font-weight:normal;
  font-size:1.5rem;
  @media screen and (min-width: 768px) {
    font-size:3rem;
  }
`;
const Desc = styled.p`
  color:#CFC6CF;
  font-size:1rem;
  margin-left: 1rem;
`;
const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  padding-left: 1rem;
  Image{
    max-width: 100%;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    Image{
      max-width: 100%;
    }
  }
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap:10px;
  margin-top:25px;
  margin-left: 1rem;
  text-transform: uppercase;
`;
const Featured = ({ product }) => {
  
const {addProduct} = useContext(CartContext);
const addFeaturedToCart = () => {
  addProduct(product._id)
};

  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                <ButtonLink
                  href={"/product/" + product._id}
                  outline={1}
                  white={1}
                >
                  Más info
                </ButtonLink>
                <Button white onClick={addFeaturedToCart}>
                  <CartIcon />
                  Anadir al Carrito
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <Image
              src={product.images?.[0]}
              alt=""
              width={400} height={350}
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
};

export default Featured;
