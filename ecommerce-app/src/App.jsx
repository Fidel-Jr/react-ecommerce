import axios from 'axios'
import { Routes, Route } from 'react-router'
import { useEffect, useState } from 'react'
import HomePage from './pages/home/HomePage'
import OrdersPage from './pages/orders/OrdersPage'
import CheckoutPage from './pages/checkout/CheckoutPage'
import TrackingPage from './pages/tracking/TrackingPage'
import NotFoundPage from './pages/NotFoundPage'
function App() {
    const [cart, setCart] = useState([])
    useEffect(() => {
        const fetchAppData = async () => {
            const response = await axios.get('/api/cart-items?expand=product')
            setCart(response.data)
        }

        fetchAppData();

    }, [])
    
    return (
        <Routes>
            <Route index element={<HomePage cart={cart } />} />
            <Route path="/checkout" element={<CheckoutPage cart={cart} />} />
            <Route path="/orders" element={<OrdersPage cart={cart } />} />
            <Route path="/tracking" element={<TrackingPage cart={cart} />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>

    )
}

export default App