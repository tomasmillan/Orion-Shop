import { updatePaymentStatus, obtenerOrderIdDesdePaymentId } from "@/pages/api/UpdatePaymentStatus";
import mercadopago from "mercadopago";
import { buffer } from "micro";

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

const handler = async (req, res) => {
  try {
    const { query } = req;
    const topic = query.topic || query.type;

    if (!topic) {
      return res.status(400).json({ error: "Missing 'topic' parameter." });
    }

    if (topic === "payment") {
      const paymentId = query.id || query["data.id"];

      if (!paymentId) {
        return res.status(400).json({ error: "Missing 'id' parameter." });
      }

      const orderId = await obtenerOrderIdDesdePaymentId(paymentId);

      if (!orderId) {
        return res.status(400).json({ error: "No se pudo determinar el ID de la orden." });
      }

      const payment = await mercadopago.payment.findById(Number(paymentId));
      const paymentStatus = payment.body.status;

      if (paymentStatus === "approved") {
        // Pago aprobado: Actualiza el estado de pago en la base de datos a "pagado"
        const updateResult = await updatePaymentStatus(orderId, true);
        return handleUpdateResponse(res, paymentStatus, updateResult);
      } else if (paymentStatus === "rejected") {
        // Pago rechazado: Actualiza el estado de pago en la base de datos a "no pagado"
        const updateResult = await updatePaymentStatus(orderId, false);
        return handleUpdateResponse(res, paymentStatus, updateResult);
      } else {
        // Manejar otros estados de pago según tus necesidades
        // Por ejemplo, puedes agregar una lógica específica para "pending", "in_process", etc.
        return res.status(200).json({ status: paymentStatus, message: "Estado de pago manejado." });
      }
      
    } else {
      return res.status(400).json({ error: "Invalid 'topic' parameter." });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const handleUpdateResponse = (res, paymentStatus, updateResult) => {
  if (updateResult.success) {
    return res
      .status(200)
      .json({ status: paymentStatus, message: updateResult.message });
  } else {
    return res.status(500).json({ error: updateResult.message });
  }
};

export default handler;
