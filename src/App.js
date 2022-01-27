import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Swiper, { Navigation } from 'swiper';

import Header from './components/header.js';
import Footer from './components/footer.js';
import CartModal from './components/cart/cartModal.js';

import Home from './pages/home.js';
import Goods from './pages/goods.js';
import Register from './pages/register.js';
import Login from './pages/login.js';

import About from './pages/info/about.js';
import Blog from './pages/info/blog.js';
import Careers from './pages/info/careers.js';
import Faq from './pages/info/faq.js';
import Contacts from './pages/info/contacts.js';

const API = "http://api.willberries";
const HOST = "http://localhost:3000/";

const goodsAPI = `${API}/goods`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goods: [],
      value: '',
      category: '',
      itemName: '',
      cart: [],
    }
  }

  componentDidMount() {
    this.getData(this.state.value, this.state.category);
    this.initSearchHandler();
    this.initEventListeners();
    this.initSwiper();
    this.initAuthFormValidation();
  }

  getData = (value, category) => {
    window.scrollTo(0,0);
    fetch(goodsAPI).then((res) => res.json()).then((data) => {
      const categoryGoods = category ? data.filter((item) => item[category] === value) : data;
      this.setState({goods: categoryGoods, value: value, category: category});
    });
  }

  searchData(itemName = '') {
    window.scrollTo(0,0);
    fetch(goodsAPI).then((res) => res.json()).then((data) => {
        const searchedGoods = itemName !== '' ? data.filter(good => good.name.toLowerCase().includes(itemName.toLowerCase())) : data;
        this.setState({goods: searchedGoods});
      }
    );
  }

  initSearchHandler() {
    /* Поиск по категориям */
    const links = document.querySelectorAll('.navigation-link');

    links.forEach(link => {
      link.onclick = () => {
        const linkValue = link.textContent;
        const category = link.dataset.field;
        this.setState({
          value: linkValue,
          category: category,
        }, () => this.getData(this.state.value, this.state.category));
      }
    });

    /* Поиск через поле ввода */
    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > a');

    searchBtn.addEventListener('click', () => {
      this.setState({
        itemName: input.value,
      }, () => this.searchData(input.value))
    });
  }

  addToCart = (evt, id) => {
    const goods = this.state.goods;
    const cart = this.state.cart;

    const clickedGood = goods.find(good => good.id === id); //метод find работает так же как и filter и forEach.

    if(cart.some(good => good.id === clickedGood.id)) {
      cart.map(good => {
        if(good.id === clickedGood.id) {
            good.count++;
        }
        return good;
      })
    }
    else {
      clickedGood.count = 1;
      cart.push(clickedGood);
    }

    const cartModal =  document.querySelector('#modal-cart');
    const addToCartBtn = evt.target.closest('button');

    addToCartBtn.style.backgroundColor = '#7a55e7';
    addToCartBtn.style.height = '40px';
    addToCartBtn.querySelector('img').classList.add('visible-icon');
    addToCartBtn.querySelector('span').classList.add('d-none');

    const buttonText = addToCartBtn.querySelector('.button-text')

    if(buttonText) {
      buttonText.classList.add('d-none');
      addToCartBtn.style.width = '144px';
      addToCartBtn.style.height = '40px';
      addToCartBtn.querySelector('img').style.paddingLeft = '0';
    }

    addToCartBtn.addEventListener('click', () => {
      cartModal.classList.add('show');
      cart.map(good => {
        if(good.id === clickedGood.id && good.count !== 0) {
            good.count--;
        }
        return good;
      })
    })

    this.setState({cart: cart});
  }

  initEventListeners() {
    /* Плавная прокрутка наверх при нажатии на кнопку */
    const link = document.querySelector('.scroll-link');
    link.addEventListener('click', () => {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
    });

    /* Корзина */
    const cartBtn = document.querySelector('.button-cart');
    const cartModal = document.querySelector('#modal-cart');
    const closeBtn = cartModal.querySelector('.modal-close');

    cartBtn.addEventListener('click', () => {
      cartModal.classList.add('show');
    });
    closeBtn.addEventListener('click', () => {
      cartModal.classList.remove('show');
    });

    /* Поиск */
    window.addEventListener('keydown', (evt) => {
      if(evt.key === 'Escape' && cartModal.classList.contains('show')) {
        cartModal.classList.remove('show');
      }

      if(evt.key === 'Enter') {
        document.querySelector('#button-addon2').click();
      }
    })
  }

  initSwiper() {
    Swiper.use([Navigation]);
    new Swiper('.swiper-container', {
      loop: true,
      speed: 500,
      
      navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev',
      },
    });
  }

  initAuthFormValidation() {
    if(window.location.pathname === '/register' || window.location.pathname === '/login') {
      const form = document.querySelector('.form[method="post"]');

      const emailInput = form.querySelector('input[name="email"]');
      const passwordInput = form.querySelector('#password');
      const passwordConfirm = form.querySelector('#confirm_password');
      const submitButton = form.querySelector('input[type="submit"]');

      const passwordTemplate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      const emailTemplate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      let isFormValid = false;

      const validateInput = (isValid, input, message) => {
        const alertFeedback = input.nextElementSibling;

        if(!isValid) {
          alertFeedback.classList.add('alert-visible');
          submitButton.disabled = true;
          isFormValid = false;
          alertFeedback.textContent = message;
        }

        else {
          alertFeedback.classList.remove('alert-visible');
          submitButton.disabled = false;
          isFormValid = true;
        }  
      }

      emailInput.oninput = function() {
        const alertFeedback = emailInput.nextElementSibling;
        if(emailInput.value === '') {
          if(alertFeedback.classList.contains('alert-visible')) {
            alertFeedback.classList.remove('alert-visible');
          }
        }
        else if(emailInput.value.match(emailTemplate)) {
          validateInput(true, emailInput);
          isFormValid = true;
        }
        else {
          validateInput(false, emailInput, "Incorrect email address!");
          isFormValid = false;
        }
      }

      passwordInput.oninput = function () {
        const alertFeedback = passwordInput.nextElementSibling;
        if(passwordInput.value === '') {
          if(alertFeedback.classList.contains('alert-visible')) {
            alertFeedback.classList.remove('alert-visible');
          }
        }
        else if (passwordInput.value.match(passwordTemplate)) {
          validateInput(true, passwordInput);
          isFormValid = true;
        }
        else {
          validateInput(false, passwordInput, "The password must be from 6 to 20 characters, contain at least one digit, one uppercase and one lowercase letter");
          isFormValid = false;
        }
      }
      
      if(passwordConfirm) {
        passwordConfirm.oninput = function () {
          const alertFeedback = passwordConfirm.nextElementSibling;
          if(passwordConfirm.value === '') {
            if(alertFeedback.classList.contains('alert-visible')) {
              alertFeedback.classList.remove('alert-visible');
            }
          }
          else if(passwordConfirm.value !== passwordInput.value) {
            validateInput(false, passwordConfirm, "Passwords don't match!");
            isFormValid = false;
          }
          else {
            validateInput(true, passwordConfirm);
            isFormValid = true;
          }
        }
      }

      form.onsubmit = function () {
        if(isFormValid === false) {
          return false;
        }
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Header HOST={HOST} cart={this.state.cart}/>
            <Routes>
              <Route exact path='/' element={
                <Home 
                  getData={this.getData}
                  API={API} 
                  category = {this.state.category} 
                  goods = {this.state.goods}
                  addToCart={this.addToCart} 
                />}
              />
              <Route path='/goods' element={
                <Goods 
                  API={API} 
                  category = {this.state.value} 
                  goods = {this.state.goods}
                  addToCart={this.addToCart} 
                />}
              />
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/about' element={<About/>}/>
              <Route path='/careers' element={<Careers/>}/>
              <Route path='/faq' element={<Faq/>}/>
              <Route path='/blog' element={<Blog/>}/>
              <Route path='/contacts' element={<Contacts/>}/>
            </Routes>
          <Footer/>
          <CartModal 
            API={API}
            cart={this.state.cart}
          />
        </Router>
      </React.Fragment>
    );
  } 
}

export default App;
