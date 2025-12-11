import OrderTracking from './OrderTracking';
import './TrackingPage.css'
import Header from '../../components/Header';


function TrackingPage({ cart }) {
    return (
        <>
            <title>Order Tracking</title>
            <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />
            <Header cart={cart} />
            <div className="tracking-page">
                <OrderTracking />
            </div>  
        </>
    )
}

export default TrackingPage