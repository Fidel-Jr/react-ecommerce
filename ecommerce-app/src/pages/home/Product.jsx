import { useState } from 'react';
import axios from 'axios';
import { formatMoney } from '../../utils/money';    


function Product({ product, loadCart }){
    const [quantity, setQuantity] = useState(1);
    const [showCheckmark, setShowCheckmark] = useState(false);
    const [addToCartMessage, setAddToCartMessage] = useState("");

        
    const addToCart = async () => {
        await axios.post('/api/cart-items',{
            productId: product.id,
            quantity
        });
        setAddToCartMessage("Added!");
        setShowCheckmark(true);
        setTimeout(() => {
            setShowCheckmark(false);
            setAddToCartMessage("");
        }, 1500);
        await loadCart();
    }
    const selectQuantity = (event)=> {
                        const quantitySelected = Number(event.target.value)
                        setQuantity(quantitySelected)
                        
                    }
    return(
         <div className="product-container">
            <div className="product-image-container">
                <img className="product-image"
                    src={product.image} />
            </div>

            <div className="product-name limit-text-to-2-lines">
                {product.name}
            </div>

            <div className="product-rating-container">
                <img className="product-rating-stars"
                    src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                <div className="product-rating-count link-primary">
                    {product.rating.count}
                </div>
            </div>

            <div className="product-price">
                {formatMoney(product.priceCents)}
            </div>
            <div className="product-quantity-container">
                <select value={quantity} onChange={selectQuantity}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            <div className="product-spacer"></div>
            {/* <p style={{color: 'green'}}>{addToCartMessage && addToCartMessage}</p> */}
            {showCheckmark && (
                <div className="added-to-cart text-dark">
                    <img src="/images/icons/checkmark.png" alt="Added to cart" />
                    {addToCartMessage && addToCartMessage}
                </div>
            )}

            <button className="add-to-cart-button button-primary"
                onClick={addToCart}
            >
                Add to Cart
            </button>
        </div>
    )   
}

export default Product