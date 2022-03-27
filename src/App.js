import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import setGoods from './.store/actions/setGoods';
import setLoggedInStatus from './.store/actions/setLoggedInStatus';

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

function App() {
  // Production
  // const API = "https://willberries-api.herokuapp.com";
  // const HOST = "https://willberries.herokuapp.com";

  // Development
  const API = "http://willberries-api.com";
  const HOST = "http://localhost:3000";

  const cookies = new Cookies();
  const dispatch = useDispatch();

  const [defaultGoods, setDefaultGoods] = useState();
  const goods = useSelector(state => state.goods);

  useEffect(() => {
    getData();
    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async (categoryId, genderId) => {
    let data;
    let filteredGoods;

    if(goods.length === 0) {
      await axios.get(`${API}/goods`).then((response) => {
        data = response.data;
        setDefaultGoods(data);
      });
    } else {
      data = defaultGoods;
    }

    if(genderId) {
      filteredGoods = data.filter((item) => item['gender_id'] === genderId);
    } else if(categoryId) {
      filteredGoods = data.filter((item) => item.category_id === categoryId);
    } else {
      filteredGoods = data;
    }

    dispatch(setGoods(filteredGoods));
  };

  const searchData = (itemName) => {
    const data = defaultGoods;
    const searchedGoods = itemName !== '' ? data.filter(good => good.name.toLowerCase().includes(itemName.toLowerCase())) : data;
    dispatch(setGoods(searchedGoods));
  }

  const getCookie = (name) => {
    return cookies.get(name);
  }

  const setCookie = (name, value, options = {}) => {
    cookies.set(name, value, Object.assign({
      path: '/',
      maxAge: 864000,
      // secure: true,
    }, options)); //Object.assign merges two objects: default object and the optional one.
  }

  const removeCookie = (name) => {
    cookies.remove(name, { path: '/' });
  }

  const checkAuth = () => {
    let loggedStatus;
    const cookieValue = getCookie('accessToken');
    if(cookieValue && cookieValue !== '') loggedStatus = true;
    else loggedStatus = false;
    dispatch(setLoggedInStatus(loggedStatus));
  }

  return (
    <React.Fragment>
      <Router>
        <Header HOST={HOST} API={API} getCookie={getCookie} 
          removeCookie={removeCookie} getData={getData}
          searchData={searchData}
        />
          <Routes>
            <Route exact path='/' element={<Home getData={getData} API={API}/>}/>
            <Route path='/goods' element={<Goods API={API}/>}/>
            <Route path='/register' element={<Register API={API}/>}/>
            <Route path='/login' element={<Login API={API} setCookie={setCookie}/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/careers' element={<Careers/>}/>
            <Route path='/faq' element={<Faq/>}/>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/contacts' element={<Contacts/>}/>
          </Routes>
        <Footer/>
        <CartModal API={API}/>
      </Router>
    </React.Fragment>
  );
}

export default App;
