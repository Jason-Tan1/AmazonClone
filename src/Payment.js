import React, { useState, useEffect } from 'react'
import './Payment.css';
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate} from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from './axios';
import { doc, collection, setDoc } from "firebase/firestore";
import { db } from "./firebase"; 

function Payment() {
 const [{basket, user}, dispatch] = useStateValue();
 const [error, setError] = useState(null);
 const [disabled, setDisabled] = useState(true);
 const [processing, setProcessing] = useState(false);
 const [succeeded, setSucceeded] = useState(false);
 const [clientSecret, setClientSecret] = useState(""); //How Stripe knows what you have to pay

 const navigate = useNavigate();
 const stripe = useStripe();
 const elements = useElements();


useEffect(() => {
const getClientSecret = async () => {
  const total = Math.round(getBasketTotal(basket) * 100);
  console.log("Sending total to backend:", total); // debug

  const response = await axios.post(`/payments/create?total=${total}`);
  setClientSecret(response.data.clientSecret);
};

if (basket.length > 0) {
  getClientSecret();
}
}, [basket]);
 
console.log("Total:", getBasketTotal(basket) * 100);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setProcessing(true);

  if (!stripe || !elements) {
    return;
  }
  setProcessing(true);
  const payload = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement)
    }
  });

  if (payload.error) {
    setError(`Payment failed: ${payload.error.message}`);
    setProcessing(false);
    return;
  } else {
    const paymentIntent = payload.paymentIntent;

    if (!user?.uid) {
    setError("User is not logged in");
    setProcessing(false);
    return;
    }
    const orderRef = doc(collection(db, "users", user?.uid, "orders"), paymentIntent.id);

    //Debugging Code Ignore
    console.log("basket:", basket);
    console.log("amount:", paymentIntent.amount);
    console.log("created:", paymentIntent.created);

    await setDoc(orderRef, {
      basket: basket,
      amount: paymentIntent.amount,
      created: paymentIntent.created,
    });

    setSucceeded(true);
    setError(null);
    setProcessing(false);

    dispatch({ type: "EMPTY_BASKET" });
    navigate("/orders", { replace: true });
  }
};

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
                <button type = "submit" disabled={processing || disabled || succeeded}> 
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