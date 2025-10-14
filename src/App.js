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
              <Payment />
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
