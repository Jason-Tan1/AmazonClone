import React from 'react'
import "./Home.css"
import Product from "./Product";  

function Home() {
  return (
    <div className = "home">
      <div className = "home_container">
        <img className = "home_image" src = "https://m.media-amazon.com/images/I/51GW5JFG8oL._SR1500,300_.jpg" alt = "" />
        
        <div className = "home_row">
          <Product title = 'The Lean Startup' 
          price = {29.99} 
          image = 'https://m.media-amazon.com/images/I/71sxTeZIi6L._UF1000,1000_QL80_.jpg'
          rating = {5} />
          <Product title="Kenwood kMix Stand Mixer"
          price={239.0}
          image="https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg"
          rating={4}/>
        </div>

        <div className = "home_row">
        <Product 
        title="Samsung Curved LED Gaming Monitor"
        price={199.99}
        image="https://images-na.ssl-images-amazon.com/images/I/81Zt42ioCgL._AC_SX450_.jpg"
        rating={3}/>
        <Product 
        title="Amazon Echo (3rd Gen)"
        price={98.99}
        image="https://images-na.ssl-images-amazon.com/images/I/6182S7MYC2L._AC_SX425_.jpg"
        rating={5}/>
        <Product 
        title="New Apple iPad Pro"
        price={598.99}
        image="https://images-na.ssl-images-amazon.com/images/I/81aAz0v7-GL._AC_SX425_.jpg"
        rating={4}/>
        </div>

        <div className = "home_row">
          <Product
          title="Samsung 49-Inch Gaming Monitor - Super UltraWide Dual WQHD"
          price={1094.98}
          image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"
          rating={4}
          />
        </div>
      </div>
    </div>
  ) 
}

export default Home