import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/header.js';
import Footer from './components/footer.js';
import CartModal from './components/cartModal.js';

import Home from './pages/home.js';
import Goods from './pages/goods.js';

const API = "http://api.willberries/goods";
const HOST = "https://iaminsleep.github.io/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goods: [],
      value: '',
      category: '',
      itemName: '',
    }
  }

  componentDidMount() {
    this.getData(this.state.value, this.state.category);
    this.initSearchByCategory();
    this.initSearchHandler();
    this.initEventListeners();
  }

  getData(value, category) {
    fetch(API).then((res) => res.json()).then((data) => {
      const categoryGoods = category ? data.filter((item) => item[category] === value) : data;
      this.setState({goods: categoryGoods});
    });
  }

  searchData(itemName = '') {
    fetch(API).then((res) => res.json()).then((data) => {
        const searchedGoods = itemName !== '' ? data.filter(good => good.name.toLowerCase().includes(itemName.toLowerCase())) : data;
        this.setState({goods: searchedGoods});
      }
    );
  }

  initSearchByCategory() {
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
  }

  initSearchHandler() {
    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');

    searchBtn.addEventListener('click', () => {
      this.setState({
        itemName: input.value,
      }, () => this.searchData(input.value))
    });
  }

  initEventListeners() {
    const link = document.querySelector('.scroll-link');
    link.addEventListener('click', (e) => {
      e.preventDefault();

      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
    })
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Header HOST={HOST}/>
            <Routes>
              <Route exact path='/' element={<Home category = {this.state.category} goods={this.state.goods} />}/>
              <Route path='/goods' element={<Goods category = {this.state.value} goods={this.state.goods}/>}/>
            </Routes>
          <Footer/>
          <CartModal/>
        </Router>
      </React.Fragment>
    );
  } 
}

export default App;
