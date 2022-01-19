import React from 'react';

import arrowPrev from '../img/arrow-prev.svg';
import arrowNext from'../img/arrow-next.svg';
import viewAllArrow from'../img/arrow.svg';

import GoodItem from '../components/goodItem';

function Home({goods}) {
  const newGoods = goods.filter((good) => good.label === "New");
  const bestsellersGoods = goods.filter((good) => good.label === "Bestseller");
  newGoods.length = 4;
  bestsellersGoods.length = 4;
  return (
    <React.Fragment>
      <section className="slider swiper-container">
        <div className="swiper-wrapper">
          <section className="slide slide-1 swiper-slide">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-10 offset-lg-1">
                  <span className="label">Bestseller</span>
                  <h2 className="slide-title">Women's Alpargata Loafer</h2>
                  <p className="slide-description">At Alpa believe in a better tomorrow, one where humanity thrives.</p>
                  <button className="button add-to-cart" data-id="003">
                    <span className="button-price">$219</span>
                    <span className="button-text">Shop now</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="slide slide-1 swiper-slide">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-10 offset-lg-1">
                  <span className="label">New</span>
                  <h2 className="slide-title">Text T-Shirt</h2>
                  <p className="slide-description">Women's pearl basic knit sweater with a round neck. Available
                    in several colours. Free shipping to stores.</p>
                  <button className="button add-to-cart" data-id="004">
                    <span className="button-price">$119</span>
                    <span className="button-text">Shop now</span>
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section className="slide slide-1 swiper-slide">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 col-10 offset-lg-1">
                  <span className="label">Bestseller</span>
                  <h2 className="slide-title">Sweater Choker Neck</h2>
                  <p className="slide-description">Women's pearl basic knit sweater with a round neck. Available
                    in several colours. Free shipping to stores.</p>
                  <button className="button add-to-cart" data-id="005">
                    <span className="button-price">$319</span>
                    <span className="button-text">Shop now</span>
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
                  <img src={arrowNext} alt="icon: arrow-prev"/>
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
              <button className="button">
                <span className="button-text">View all</span>
                <img src={viewAllArrow} alt="icon: arrow" className="button-icon"/>
              </button>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card card-2 mb-4">
              <h3 className="card-title text-light">Catch the Sun: Spring Break Styles From $5.99</h3>
              <p className="card-text text-light">Sweaters & Hoodies & Puffer Jackets & Coats and Jackets & Knit</p>
              <button className="button">
                <span className="button-text">View all</span>
                <img src={viewAllArrow} alt="icon: arrow" className="button-icon"/>
              </button>
            </div>
          </div>
          <div className="col-xl-9 col-lg-6 mb-4">
            <div className="card card-3">
              <span className="label">Bestseller</span>
              <h3 className="card-title large">Poplin Top {'\n'}With Sleeve Bow</h3>
              <p className="card-text large">Poplin top with roll neckline, long sleeves</p>
              <button className="button add-to-cart" data-id="002">
                <span className="button-price">$129</span>
                <span className="button-text">Shop now</span>
              </button>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6">
            <div className="card card-4">
              <h3 className="card-title text-light mw-160">Printed Shirt with a Bow</h3>
              <p className="card-text text-light">Pink/Sky Blue/Yellow</p>
              <button className="button add-to-cart button-four" data-id="009">
                <span className="button-price">$119</span>
                <span className="button-text">Shop now</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row align-items-center mb-4">
          <div className="col-9">
            <h2 className="section-title">New Arrival</h2>
          </div>
          <div className="col-3 d-flex justify-content-end">
            <button className="more">View All</button>
          </div>
        </div>
        <div className="short-goods row">
          {newGoods.map(good => 
            <GoodItem 
              key={good.id} id={good.id}
              name={good.name} description={good.description}
              price={good.price} img={good.img} label={good.label}
            />)}
        </div>
        <div className="row align-items-center mb-4">
          <div className="col-9">
            <h2 className="section-title">Bestsellers</h2>
          </div>
          <div className="col-3 d-flex justify-content-end">
            <button className="more">View All</button>
          </div>
        </div>
        <div className="short-goods row">
          {bestsellersGoods.map(good => 
            <GoodItem 
              key={good.id} id={good.id}
              name={good.name} description={good.description}
              price={good.price} img={good.img} label={good.label}
            />)}
        </div>
      </section>
    </React.Fragment> 
  );
}

export default Home;