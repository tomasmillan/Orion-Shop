import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  const calculateTotal = (lineItems) => {
    return lineItems.reduce((total, item) => {
      return total + item.unit_price * item.quantity;
    }, 0);
  };
  for (let i = 0; i < orders.length; i++) {
    console.log('Order ' + i + ': ', orders[i]);
    console.log(orders[i].paid);
  }
  return (
    <Layout>
      <h1>Ordenes</h1> 
      <table className="basic">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Pagos</th>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "SI" : "NO"}
                </td>
                <td>
                  <div className="border-b border-gray-300 pb-1 mb-1">
                    {order.name}
                  </div>
                  <div className="border-b border-gray-300 pb-1 mb-1">
                    {order.email}
                  </div>
                  <div className="border-b border-gray-300 pb-1 mb-1">
                    {order.city} ,{order.postalCode}
                  </div>
                  <div className="border-b border-gray-300 pb-1 mb-1">
                    {order.country}
                  </div>
                  <div className="border-b border-gray-300 pb-1 mb-1">
                    {order.streetAddress}
                  </div>
                </td>
                <td>
                  {order.line_items.map((l, index) => (
                    <div className="border-b border-gray-300 pb-1 mb-1" key={index}>
                      {l.title} - {l.unit_price} x{l.quantity} ={" "}
                      {l.unit_price * l.quantity}
                      <br />
                    </div>
                  ))}
                </td>
                <td className="font-bold">
                  ${calculateTotal(order.line_items).toFixed(2)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
