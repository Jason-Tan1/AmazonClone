import React, { useEffect } from "react";
import './App.css';
import Header from './Header';
import Home from './Home';  
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment"; 
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Footer from "./Footer";
import { loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js"

//Loads stripe, PUBLIC KEY
const promise = loadStripe('pk_test_51SIAJvCDAJ5GCVwxGbanPGWNJhLU36QEaqaqAHlpGxu9vWcKWfuNiFsY1QywVbkvogTou4JQUQh4kDrpauyRX9bp00jUYIUTzd');

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS >>> ', authUser);

      if (authUser) {
        dispatch({
          type: 'SET_USER',
          user: authUser
        });
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page and Header */}
          <Route path="/" element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          } />

          {/* Checkout Page */}
          <Route path="/checkout" element={
            <>
              <Header />
              <Checkout />
            </>
          } />

          {/* Payment Page */}
          <Route path="/payment" element={
            <>
              <Header />
              <Elements stripe = {promise}>
                <Payment />
              </Elements>
            </>
          } />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
