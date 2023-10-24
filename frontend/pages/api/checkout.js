import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});
export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cuit,
      invoiceType,
      cartProducts,
    } = req.body;
    const URL = "https://68e5-200-114-251-51.ngrok-free.app";
    try {
      await mongooseConnect();
      const productsIds = cartProducts;
      const uniqueIds = [...new Set(productsIds)];
      const items = [];
      for (const productId of uniqueIds) {
        // Buscar información del producto correspondiente
        const productInfo = await Product.findOne({ _id: productId });

        if (!productInfo) {
          console.error("Product not found: " + productId);
        } else {
          // Contar la cantidad de veces que aparece el producto en el carrito
          const quantity =
            productsIds.filter((id) => id === productId)?.length || 0;
          // Si la cantidad es mayor que cero y se encontró información del producto
          if (quantity > 0) {
            // Agregar el producto a la lista de elementos para preferences.items
            items.push({
              title: productInfo.title,
              unit_price: productInfo.price,
              quantity,
              image: productInfo.images[0], // Asegúrate de obtener la imagen del producto
            });
          }
        }
      }

      // Crear la preferencia de pago en MercadoPago
      const preferences = {
        items,
        auto_return: "approved",
        back_urls: {
          success: `${URL}/thanks`,
          pending: `${URL}/thanks`,
          failure: `${URL}/error`,
        },

        notification_url: `${URL}/api/notify`,
      };
      const response = await mercadopago.preferences.create(preferences);
      // Crear la orden en la base de datos
      const orderData = {
        line_items: items.map((item) => ({
          title: item.title,
          unit_price: item.unit_price,
          quantity: item.quantity,
          image: item.image,
        })),
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cuit,
        invoiceType,
        paid: false,
      };
      const orderDoc = await Order.create(orderData);
      
      res.status(200).send({ url: response.body.init_point });
    } catch (error) {
      console.error(
        "Error al crear la preferencia de pago en MercadoPago:",
        error
      );
      res.status(500).json({ message: "Error al procesar la solicitud" });
    }
  } else {
    res.status(400).json({ message: "Método inválido" });
  }
}
