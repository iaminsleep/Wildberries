import React, { useEffect, useState } from 'react';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setError, setSuccess, setWarning } from './.store/actions/setMessages';

import setGoods from './.store/actions/setGoods';
import setLoggedInStatus from './.store/actions/setLoggedInStatus';
import setModalVisibility from './.store/actions/setModalVisibility';
import setUserInfo from './.store/actions/setUserInfo';
import setCartItems from './.store/actions/setCartItems';

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
  // const API = "https://willberries-api.herokuapp.com";
  const API = "http://willberries-api";

  /* React Hooks */
  const [defaultGoods, setDefaultGoods] = useState([]);
  const [category, setCategory] = useState('');
  const [isLoaded, setLoaded] = useState(false);

  /* Redux Store */
  const goods = useSelector(state => state.goods);
  const cartItems = useSelector(state => state.cart);
  const isModalVisible = useSelector(state => state.isModalVisible);
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const dispatch = useDispatch();

  /* React Cookies */
  const cookies = new Cookies();

  useEffect(() => {
    if(!isLoaded) {
      getData();
      if(isLoggedIn) {
        getCartData();
      }
      setLoaded(true);
    }
    checkAuth();
  }, [isLoaded, isLoggedIn]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const getCartData = async() => {
    const accessToken = getCookie('accessToken');
    await axios.get(`${API}/cart_items`, { 
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }).then((response) => {
      let status = response.status;
      if(status === 200) {
        dispatch(setCartItems(response.data));
      }
      else {
        removeCookie('accessToken');
        checkAuth();
      }    
    });
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

  const addToCart = (id) => {
    const clickedGood = goods.find(good => good.id === id);
    const clickedGoodId = clickedGood.id;
    if(cartItems.some(good => good.product_id === clickedGoodId)) {
      return dispatch(setWarning('This item was already added to cart.'));
    } 
    else {
      clickedGood.quantity = 1;
      clickedGood.product_id = clickedGoodId;
      cartItems.push(clickedGood);
      if(isLoggedIn) {
        const accessToken = getCookie('accessToken');
        const formObject = {
          name: clickedGood.name, quantity: clickedGood.quantity,
          price: clickedGood.price, img: clickedGood.img,
          product_id: clickedGoodId,
        };
        const formData = createFormData(formObject);
        try {
          axios.post(`${API}/cart_items`, formData, {
            headers: { 'Authorization': 'Bearer ' + accessToken }
          }, { validateStatus: function() { return true; } })
          .then((res) => {
            let status = res.status;
            if(status === 201) {
              return dispatch(setSuccess('The item was added to cart.'));
            } else return dispatch(setError(res.data.message));
          }).catch((err) => { 
            return dispatch(setError('Internal Server ' + err)); 
          });
        } 
        catch {
          return dispatch(setWarning("Something went wrong. Try again!"));
        }
      }
      else {
        return dispatch(setSuccess('The item was added to cart.'));
      }
    }
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
            <Route path='/goods' element={<Goods API={API} category={category}
              addToCart={addToCart}/>}/>
            <Route path='/register' element={isLoggedIn 
              ? <Navigate to='/'/>
              : <Register API={API} createFormData={createFormData}/>}/>
            <Route path='/login' element={isLoggedIn 
              ? <Navigate to='/'/>
              : <Login API={API} setCookie={setCookie} createFormData={createFormData} 
                  checkAuth={checkAuth}/>}/>
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
