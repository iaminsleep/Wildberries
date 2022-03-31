import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import setGoods from './.store/actions/setGoods';
import setLoggedInStatus from './.store/actions/setLoggedInStatus';
import setModalVisibility from './.store/actions/setModalVisibility';

import Header from './components/header.js'; 
import Footer from './components/footer.js';
import CartModal from './components/cart/cartModal.js';

import Home from './pages/home.js'; import Goods from './pages/goods.js';
import Register from './pages/register.js'; import Login from './pages/login.js';
import About from './pages/info/about.js'; import Blog from './pages/info/blog.js';
import Careers from './pages/info/careers.js'; import Faq from './pages/info/faq.js';
import Contacts from './pages/info/contacts.js';

function App() {
  /* Links */

  // Production API link
  // const API = "https://willberries-api.herokuapp.com";
  // Development API link
  const API = "http://willberries-api";

  /* React Hooks */
  const [defaultGoods, setDefaultGoods] = useState([]);
  const [category, setCategory] = useState('');

  /* Redux Store */
  const goods = useSelector(state => state.goods);
  const isModalVisible = useSelector(state => state.isModalVisible);
  const dispatch = useDispatch();

  /* React Cookies */
  const cookies = new Cookies();

  useEffect(() => {
    getData();
    checkAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async (id, type, categoryName) => {
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

    if(type) {
      if(type === 'gender') {
        filteredGoods = data.filter((item) => item['gender_id'] === id);
      } else if(type === 'category') {
        filteredGoods = data.filter((item) => item.category_id === id);
      } else if(type === 'New') {
        filteredGoods = data.filter((item) => item['label'] === 'New');
        categoryName = type;
      } else if(type === 'Bestseller') {
        filteredGoods = data.filter((item) => item['label'] === 'Bestseller');
        categoryName = type;
      }
      setCategory(categoryName);
    } 
    else {
      filteredGoods = data;
      setCategory('');
    }
    
    dispatch(setGoods(filteredGoods));
  };

  const searchData = (itemName) => {
    const data = defaultGoods;
    const searchedGoods = itemName !== '' 
      ? data.filter(good => good.name.toLowerCase().includes(itemName.toLowerCase())) 
      : data;
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
    }, options)); /* Object.assign merges two objects: 
    default object and the optional one. */
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

  function createFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  }

  const handleKeyEvents = (evt) => {
    if(evt.key === 'Escape' && isModalVisible) {
      dispatch(setModalVisibility(false));
    }
  }

  window.onkeydown = (evt) => handleKeyEvents(evt);

  return (
    <React.Fragment>
      <Router>
        <Header API={API} getCookie={getCookie} getData={getData} 
          removeCookie={removeCookie} searchData={searchData} checkAuth={checkAuth}/>
          <Routes>
            <Route exact path='/' element={<Home getData={getData} 
              API={API} defaultGoods={defaultGoods}/>}/>
            <Route path='/goods' element={<Goods API={API} category={category}/>}/>
            <Route path='/register' element={<Register API={API} 
              createFormData={createFormData}/>}/>
            <Route path='/login' element={<Login API={API} setCookie={setCookie} 
              createFormData={createFormData} checkAuth={checkAuth}/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/careers' element={<Careers/>}/>
            <Route path='/faq' element={<Faq/>}/>
            <Route path='/blog' element={<Blog/>}/>
            <Route path='/contacts' element={<Contacts/>}/>
          </Routes>
        <Footer/>
        { isModalVisible ? <CartModal API={API}/> : '' }
      </Router>
    </React.Fragment>
  );
}

export default App;
