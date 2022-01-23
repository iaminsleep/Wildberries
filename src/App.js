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
  }

  getData = (value, category) => {
    window.scrollTo(0,0);
    fetch(goodsAPI).then((res) => res.json()).then((data) => {
      const categoryGoods = category ? data.filter((item) => item[category] === value) : data;
      this.setState({goods: categoryGoods, value: value, category: category});
    });
  }

  searchData(itemName = '') {
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

  addToCart = id => {
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
    this.setState({cart: cart});
  }

  plusCartItem = id => {
    const cart = this.state.cart;
    const newCart = cart.map(good => {
    if(good.id === id && good.count > 0) {
        good.count++;
    }
      return good;
    })
    this.setState({cart: newCart});
  }

  minusCartItem = id => {
    const cart = this.state.cart;
    const newCart = cart.map(good => {
    if(good.id === id && good.count > 0) {
        good.count--;
    }
      return good;
    })
    this.setState({cart: newCart});
  }

  deleteCartItem = id => {
    const cart = this.state.cart;
    const newCart = cart.filter(good => {
      return good.id !== id;
    })
    this.setState({cart: newCart});
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

  render() {
    return (
      <React.Fragment>
        <Router>
          <Header HOST={HOST}/>
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
            minusCartItem={this.minusCartItem}  
            plusCartItem={this.plusCartItem} 
            deleteCartItem={this.deleteCartItem}
          />
        </Router>
      </React.Fragment>
    );
  } 
}

export default App;
