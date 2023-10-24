// Importa el modelo de la orden y la base de datos (ajusta según tu configuración)
import {Order} from "@/models/Order";
import {mongooseConnect} from "@/lib/mongoose";

const updatePaymentStatus = async (orderId, isPaid) => {
  try {
    // Conecta a la base de datos (ajusta según tu configuración)
    await mongooseConnect();

    // Encuentra la orden en la base de datos por su ID
    const order = await Order.findById(orderId);

    if (!order) {
      // Si la orden no se encuentra, puedes manejar el error de acuerdo a tus necesidades
      return {
        success: false,
        message: "La orden no se encuentra en la base de datos.",
      };
    }

    // Actualiza el estado de pago en la orden
    order.paid = isPaid;
    await order.save();
    await Order.updateOne({ _id: order._id }, { paid: true });

    // Si todo ha ido bien, envía una respuesta exitosa
    return {
      success: true,
      message: "El estado de pago ha sido actualizado correctamente.",
    };
  } catch (error) {
    // Si ocurre un error, puedes manejarlo de acuerdo a tus necesidades
    return {
      success: false,
      message: "Ha ocurrido un error al actualizar el estado de pago.",
    };
  }
};

export default updatePaymentStatus;
async function obtenerOrderIdDesdePaymentId(paymentId) {
  try {
    // Realiza una consulta a tu base de datos u obtén la información necesaria
    const order = await Order.findOne({ paymentId }); // Esto es un ejemplo, ajusta según tu modelo y lógica de aplicación

    if (order) {
      return order._id; // Retorna el orderId si se encuentra la orden
    } else {
      return null; // Retorna null si no se encuentra la orden
    }
  } catch (error) {
    console.error("Error al obtener orderId desde paymentId:", error);
    throw error;
  }
}

export { updatePaymentStatus, obtenerOrderIdDesdePaymentId };
