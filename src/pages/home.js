import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swiper, { Navigation } from 'swiper';

import arrowPrev from '../img/arrow-prev.svg';
import arrowNext from'../img/arrow-next.svg';
import viewAllArrow from'../img/arrow.svg';
import cart from '../img/cart.svg';

import ScrollToTop from '../components/ScrollToTop';
import GoodItem from '../components/goods/goodItem';

function Home({API, getData, defaultGoods, addToCart}) {
  Swiper.use([Navigation]);
  
  useEffect(() => {
    const initSwiper = () => {
      new Swiper('.swiper-container', {
        loop: true,
        speed: 500,
        
        navigation: {
          nextEl: '.slider-button-next',
          prevEl: '.slider-button-prev',
        },
      });
    }
    initSwiper();
  }, [])

  /* Crutches */
  const [isAdded1, setAdded1] = useState(false);
  const [isAdded2, setAdded2] = useState(false);
  const [isAdded3, setAdded3] = useState(false);
  const [isAdded4, setAdded4] = useState(false);
  const [isAdded5, setAdded5] = useState(false);

  const newGoods = defaultGoods.filter((good) => good.label === "New");
  const bestsellersGoods = defaultGoods.filter((good) => good.label === "Bestseller");

  newGoods.length = 4;
  bestsellersGoods.length = 4;

  return (
    <React.Fragment>
      <ScrollToTop/>
      <section className="slider swiper-container">
        <div className="swiper-wrapper">
          <section className="slide slide-1 swiper-slide">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-10 offset-lg-1">
                  <span className="label">Bestseller</span>
                  <h2 className="slide-title">Women's Alpargata Loafer</h2>
                  <p className="slide-description">At Alpa believe in a better tomorrow, one where humanity thrives.</p>
                  <button className={"button add-to-cart" + (isAdded1 ? " purple-button w-144" : "")}
                    onClick={() => { addToCart(3); setAdded1(true) }}>
                    <span className={"button-price" + (isAdded1 ? " d-none" : "")}>$219</span>
                    <img src={cart} className={"cart-icon" + (isAdded1 ? " visible-icon pl-0" : "")} alt="cart"/>
                    <span className={"button-text" + (isAdded1 ? " d-none" : "")}>Shop now</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="slide slide-2 swiper-slide">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-10 offset-lg-1">
                  <span className="label">New</span>
                  <h2 className="slide-title">Text T-Shirt</h2>
                  <p className="slide-description">Upgrade your style. Browse through different shirt styles and colors. Search for your new favorite one today!</p>
                  <button className={"button add-to-cart" + (isAdded2 ? " purple-button w-144" : "")}
                    onClick={() => { addToCart(4); setAdded2(true) }}>
                    <span className={"button-price" + (isAdded2 ? " d-none" : "")}>$119</span>
                    <img src={cart} className={"cart-icon" + (isAdded2 ? " visible-icon pl-0" : "")} alt="cart"/>
                    <span className={"button-text" + (isAdded2 ? " d-none" : "")}>Shop now</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="slide slide-3 swiper-slide">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-10 offset-lg-1">
                  <span className="label">Bestseller</span>
                  <h2 className="slide-title">Sweater Choker Neck</h2>
                  <p className="slide-description">Women's pearl basic knit sweater with a round neck. Available
                    in several colours. Free shipping to stores.</p>
                  <button className={"button add-to-cart" + (isAdded3 ? " purple-button w-144" : "")}
                    onClick={() => { addToCart(5); setAdded3(true) }}>
                    <span className={"button-price" + (isAdded3 ? " d-none" : "")}>$319</span>
                    <img src={cart} className={"cart-icon" + (isAdded3 ? " visible-icon pl-0" : "")} alt="cart"/>
                    <span className={"button-text" + (isAdded3 ? " d-none" : "")}>Shop now</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="slider-nav">
          <div className="container">
            <div className="row justify-content-between">
              <div className="col-1">
                <button className="slider-button slider-button-prev">
                  <img src={arrowPrev} alt="icon: arrow-prev"/>
                </button>
              </div>
              <div className="col-1">
                <button className="slider-button slider-button-next">
                  <img src={arrowNext} alt="icon: arrow-next"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="special-offers container pt-5 pb-4">
        <div className="row mb-4">
          <div className="col-xl-6">
            <div className="card card-1 mb-4">
              <h3 className="card-title">Fashion Month Ready in Capital Shop</h3>
              <p className="card-text">Bags & Acsessories & Lingerie & Sportswear & Beauty & Swimwear</p>
              <NavLink to="/goods" className="button" onClick={() => getData(2, 'category', 'Accessories')}>
                <span className="button-text">View all</span>
                <img src={viewAllArrow} alt="icon: arrow" className="button-icon"/>
              </NavLink>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card card-2 mb-4">
              <h3 className="card-title text-light">Catch the Sun: Spring Break Styles From $5.99</h3>
              <p className="card-text text-light">Sweaters & Hoodies & Puffer Jackets & Coats and Jackets & Knit</p>
              <NavLink to="/goods" className="button" onClick={() => getData(1, 'category', 'Clothing')}>
                <span className="button-text">View all</span>
                <img src={viewAllArrow} alt="icon: arrow" className="button-icon"/>
              </NavLink>
            </div>
          </div>
          <div className="col-xl-9 col-lg-6 mb-4">
            <div className="card card-3">
              <span className="label">Bestseller</span>
              <h3 className="card-title large">Poplin Top {'\n'}With Sleeve Bow</h3>
              <p className="card-text large">Poplin top with roll neckline, long sleeves</p>
              <button className={"button add-to-cart" + (isAdded4 ? " purple-button w-144" : "")}
                onClick={() => { addToCart(2); setAdded4(true) }}>
                <span className={"button-price" + (isAdded4 ? " d-none" : "")}>$129</span>
                <img src={cart} className={"cart-icon" + (isAdded4 ? " visible-icon pl-0" : "")} alt="cart"/>
                <span className={"button-text" + (isAdded4 ? " d-none" : "")}>Shop now</span>
              </button>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6">
            <div className="card card-4">
              <h3 className="card-title text-light mw-160">Printed Shirt with a Bow</h3>
              <p className="card-text text-light">Pink/Sky Blue/Yellow</p>
              <button className={"button add-to-cart" + (isAdded5 ? " purple-button w-144" : "")}
                onClick={() => { addToCart(9); setAdded5(true) }}>
                <span className={"button-price" + (isAdded5 ? " d-none" : "")}>$119</span>
                <img src={cart} className={"cart-icon" + (isAdded5 ? " visible-icon pl-0" : "")} alt="cart"/>
                <span className={"button-text" + (isAdded5 ? " d-none" : "")}>Shop now</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row align-items-center mb-4">
          <div className="col-9">
            <h2 className="section-title">New Arrival</h2>
          </div>
          <div className="col-3 d-flex justify-content-end">
            <NavLink to="/goods" className="more" onClick={() => getData(0, 'New')}>View All</NavLink>
          </div>
        </div>
        <div className="short-goods row">
          {newGoods.length > 0 ? 
            newGoods.map(good => 
              <GoodItem 
                key={good.id} id={good.id} name={good.name} 
                description={good.description} price={good.price} 
                img={good.img} label={good.label} API={API} addToCart={addToCart}
              />)
            : <div className="empty-goods-wrapper green">
                <div className="goods-empty small">Looks like these items have been sold for now. Expect a new delivery!</div>
              </div>
          }
        </div>
        <div className="row align-items-center mb-4">
          <div className="col-9">
            <h2 className="section-title">Bestsellers</h2>
          </div>
          <div className="col-3 d-flex justify-content-end">
            <NavLink to="/goods" className="more" onClick={() => getData(0, 'Bestseller')}>View All</NavLink>
          </div>
        </div>
        <div className="short-goods row">
          {bestsellersGoods.length > 0 ? 
            bestsellersGoods.map(good => 
              <GoodItem 
                key={good.id} id={good.id} name={good.name} 
                description={good.description} price={good.price} 
                img={good.img} label={good.label} API={API} addToCart={addToCart}
              />)
            : <div className="empty-goods-wrapper green">
                <div className="goods-empty small">Looks like these items have been sold for now. Expect a new delivery!</div>
              </div>
          }
        </div>
      </section>
    </React.Fragment> 
  );
}

export default Home;