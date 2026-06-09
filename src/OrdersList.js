
import React,
 { 
    useEffect,
     useState 
    } 
    from "react";
import axios from "axios";
const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const fetchOrders = async() => {
        try {
                
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/sync-orders`
            );
            console.log("API Response:", response.data);
            setOrders(response.data || []);
        } catch(error) {
            console.log(error);  
         setOrders([]);
        }
    };
    useEffect(() => {
        fetchOrders();
    }, []);
    return (
        <div>
            <h2>Shopify Orders</h2>
            <table border="1" cellPadding="10">
                <thead>
                     <tr>
                        <th>Customer</th>
                        <th>Product Name</th>
                        <th>Total Price</th>
     <th>Quantity</th>
                        <th>Status</th>
                    </tr></thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td> {
                                order.customerName 
                                }
                          </td>
                    <td>
                   {order.product_name}
              </td>
             <td>
    ₹ {order.price || 0}
</td>
 <td>{order.quantity || 1}</td>
<td>
    <span style={{
        padding:"5px 10px",
        borderRadius:"5px",
        background: order.financialStatus === "paid"
        ? "green"
        : "orange",
        color:"white",
    }}
    >
    {
        order.status
    }
    </span>
</td>
                            </tr>
                       ))}
                    </tbody>
            </table>
        </div>
    );
};
export default OrdersList;
