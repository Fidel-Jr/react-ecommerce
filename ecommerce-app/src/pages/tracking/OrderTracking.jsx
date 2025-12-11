import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
function OrderTracking() {
    const { orderId, productId } = useParams();
    const [ order, setOrder ] = useState(null);
    let isPreparing = "";
    let isShipped = "";
    let isDelivered = "";

    useEffect(() => {
        const fetchTrackingData = async () => {
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
            console.log(response.data);
        }
        fetchTrackingData();    
    }, [orderId])

    if(!order){
        return null;
    }

    const orderProduct = order.products.find((orderProduct) => orderProduct.productId === productId);

    const totalTimeRequired = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassed = dayjs().valueOf() - order.orderTimeMs;
    let progressPercentage = timePassed / totalTimeRequired * 100;
    if(progressPercentage > 100){
        progressPercentage = 100;
    }

    if(progressPercentage < 33){
        isPreparing = "Preparing";
    }
    else if(progressPercentage >= 33 && progressPercentage < 100){
        isShipped = "Shipped";
    }
    else if(progressPercentage >= 100){
        isDelivered = "Delivered";
    }

    return (
        <div className="order-tracking">
            <Link className="back-to-orders-link link-primary" to="/orders">
                View all orders
            </Link>

            <div className="delivery-date">
                {progressPercentage >= 100 ? `Delivered on ${dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}` : 
                `Arriving on: ${dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')}`}
            </div>
            <div className="product-info">
                { orderProduct.product.name }
            </div>

            <div className="product-info">
                Quantity: {orderProduct.quantity} 
            </div>

            <img className="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

            <div className="progress-labels-container">
                
                <div className={`progress-label ${isPreparing && 'current-status'}`}>
                    Preparing
                </div>
                <div className={`progress-label ${isShipped && 'current-status'}`}>
                    Shipped
                </div>
                <div className={`progress-label ${isDelivered && 'current-status'}`}>
                    Delivered
                </div>
            </div>

            <div className="progress-bar-container">
                <div className="progress-bar" style={{width: `${progressPercentage}%`}}></div>
            </div>
        </div>
    )
}

export default OrderTracking