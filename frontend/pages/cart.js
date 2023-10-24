import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import ThankYouPage from "./thanks";
import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "@/components/Modal";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 10px;
  Image {
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    Image {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const InvoiceInput = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-sizing: border-box;
`;

const Select = styled.select`
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 5px;
`;

const RequiredLegend = styled.p`
  color: red;
  margin-top: 10px;
  font-size: 14px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");
  const [cuit, setCuit] = useState("");
  const [invoiceType, setInvoiceType] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFormReady, setIsFormReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    console.log("useEffect triggered");
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("approved")) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  function closeModal() {
    setIsModalOpen(false);
  }

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  function checkFormReady() {
    // Verifica si todos los campos requeridos tienen un valor no vacío
    const isReady =
      name.trim() !== "" &&
      email.trim() !== "" &&
      city.trim() !== "" &&
      postalCode.trim() !== "" &&
      streetAddress.trim() !== "" &&
      country.trim() !== "" &&
      cuit.trim() !== "" &&
      invoiceType.trim() !== "";
    setIsFormReady(isReady);
  }

  async function goToPayment() {
    setIsModalOpen(true);
  }

  let total = 0; //agregar descuento por cantidad

  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  if (isSuccess) {
    return <ThankYouPage />;
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Carrito</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            width={100}
                            height={100}
                          />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <Input
                type="text"
                placeholder="Nombre *"
                value={name}
                name="name"
                onChange={(ev) => {
                  setName(ev.target.value);
                  checkFormReady(); // Llama a checkFormReady cuando hay cambios
                }}
                required
              />
              <Input
                type="text"
                placeholder="Email *"
                value={email}
                name="email"
                onChange={(ev) => setEmail(ev.target.value)}
                required
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="Ciudad *"
                  value={city}
                  name="city"
                  onChange={(ev) => setCity(ev.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Codigo Postal *"
                  value={postalCode}
                  name="postalCode"
                  onChange={(ev) => setPostalCode(ev.target.value)}
                  required
                />
              </CityHolder>
              <CityHolder>
                <Input
                  type="number"
                  placeholder="CUIT/CUIL *"
                  value={cuit}
                  name="cuit"
                  onChange={(ev) => setCuit(ev.target.value)}
                  required
                />
                <InvoiceInput>
                  Factura:
                  <Select
                    value={invoiceType}
                    onChange={(ev) => setInvoiceType(ev.target.value)}
                    required
                  >
                    <option value="">Seleccione</option>
                    <option value="facturaA">Factura A</option>
                    <option value="facturaB">Factura B</option>
                    <option value="consumidorFinal">Consumidor Final</option>
                  </Select>
                </InvoiceInput>
              </CityHolder>
              <Input
                type="text"
                placeholder="Dirrección *"
                value={streetAddress}
                name="streetAddress"
                onChange={(ev) => setStreetAddress(ev.target.value)}
                required
              />
              <Input
                type="text"
                S
                placeholder="Pais *"
                value={country}
                name="country"
                onChange={(ev) => setCountry(ev.target.value)}
                required
              />
              <Button onClick={goToPayment} payment>
                Confirmar Pedido
              </Button>
              {isModalOpen && (
                <Modal
                  onClose={closeModal}
                  message="La orden está siendo confirmada. Te llegará un correo con la información de pago y detalle del envío."
                />
              )}
              <RequiredLegend>* Campos requeridos</RequiredLegend>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
