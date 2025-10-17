import React, { useState, useEffect } from 'react'
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate} from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';

function Payment() {
 const [{basket, user}, dispatch] = useStateValue();
 const [error, setError] = useState(null);
 const [disabled, setDisabled] = useState(true);
 const [processing, setProcessing] = useState("");
 const [succeeded, setSucceeded] = useState(false);
 const [clientSecret, setClientSecret] = useState(false); //How Stripe knows what you have to pay

 const navigate = useNavigate();
 const stripe = useStripe();
 const elements = useElements();


 useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios( {
        method: 'post',
        //Stripe expects the total in a currencies sub units
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`
      })
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret();
 }, [basket])
 
console.log("Total:", getBasketTotal(basket) * 100);

 const handleSubmit = async(e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent}) => {
      // Payment Intent = Payment Confirmation

      setSucceeded(true);
      setError(null);
      setProcessing(false);

      navigate('/orders', { replace: true });
    })
 }

  const handleChange = e => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message: "");
 }

  return (
    <div className = 'payment'> 
      <div className = 'payment_container'> 
        <h1>
          Checkout(<Link to = "/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Delivery */}
       <div className ='payment_section'> 
          <div className = 'payment_title'> 
            <h3> Delivery Address </h3>
          </div>
          <div className = 'payment_address'> 
            <p>{user?.email}</p>
            <p>123 Street Name Road</p>
            <p>Toronto, Canada</p>
          </div>
        </div>

        {/* Review Items */}
        <div className ='payment_section'> 
          <div className = 'payment_title'> 
              <h3> Review Items and Delivery </h3>
          </div>
          <div className='payment_items'>
            {basket.map(item => ( 
              <CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className ='payment_section'> 
          <div className = 'payment_title'> 
            <h3> Payment Method </h3>
          </div>
          <div className = "payment_details"> 
            {/* Stripe will go here*/}

            <form onSubmit = {handleSubmit}> 
              <CardElement onChange = {handleChange} />

              <div className = 'payment_priceContainer'>
                <CurrencyFormat
                  renderText={(value) => (
                    <h3>Order Total: {value}</h3>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}> 
                  <span> {processing ? <p> Processing </p> : "Buy Now" } </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment