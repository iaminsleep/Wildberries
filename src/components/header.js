import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

import {showModal} from '../components/functions';

import companyLogo from '../img/logo.svg';
import searchIcon from '../img/search.png';
import cartIcon from '../img/cart.svg';
import signIn from '../img/sign-in.png';

const Header = ({HOST, API, getData, searchData, getCookie, removeCookie}) => {
	const cart = useSelector(state => state.cart);
	const isAuth = useSelector(state => state.isLoggedIn);

	const [categories, setCategories] = useState([]);
	const [genders, setGender] = useState([]);
	const [isCategoriesLoaded, setCategoriesLoaded] = useState(false);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		const getCategories = async() => {
			await axios.get(`${API}/categories`).then((response) => {
				setCategories(response.data);
				setCategoriesLoaded(true);
			});
		};
		const getGenders = async() => {
			await axios.get(`${API}/genders`).then((response) => {
				setGender(response.data);
			});
		};
		if(!isCategoriesLoaded) {
			getCategories();
			getGenders();
		}
	})

	// let error = App.state.error;
  // let warning = App.state.warning;

	if(cart.length > 0) {
		document.querySelector('.button-cart').classList.add('pseudo');
	}

	const keyEvents = (evt) => {
		const cartModal = document.querySelector('#modal-cart');
		if(evt.key === 'Escape' && cartModal.classList.contains('show')) {
			cartModal.classList.remove('show');
		}

		if(evt.key === 'Enter') {
			document.querySelector('#button-addon2').click();
		}
	}

	const logout = async function() {
		const accessToken = getCookie('accessToken');
    let status;
    try {
      await axios.post(`${API}/users`, {
				withCredentials: true, 
				validateStatus: function() {return true},
			},{
				headers: {
					'Authorization': 'Bearer ' + accessToken
				}
			}).then((res) => {
				// status = res.status; 
				// error = res.data.message;
				if(status === 200) {
					removeCookie('accessToken');
					// App.setState({isAuth: false});
				}
				// return App.setState({error: error});
			}).catch((err) => {
			});
    } 
		catch {
      // warning = "Something went wrong. Try again!";
      // return App.setState({warning: warning});
    }
  }

  window.addEventListener('keydown', (evt) => keyEvents(evt));

  return(	
		<header className="container header px-4 px-md-0">
			<div className="row justify-content-between align-items-center">
				<div className="col-lg-2 col-6">
					<a href={`${HOST}`} className="logo-link">
						<img width="128" src={companyLogo} alt="logo: Willberries" className="logo-image"/>
					</a>
				</div>
				<div className="col-lg-6 d-none d-lg-block">
					<nav>
						<ul className="navigation d-flex justify-content-around">
							{genders.map((gender, index) => 
								<li key={index} className="navigation-item">
									<NavLink to='/goods' className="navigation-link" onClick={() => getData(0, gender.id)}>{gender.name}</NavLink>
								</li>
							)}
							{categories.map((category, index) => 
								<li key={index} className="navigation-item">
									<NavLink to='/goods' className="navigation-link" onClick={() => getData(category.id)}>{category.name}</NavLink>
								</li>
							)}
							<li className="navigation-item">
								<NavLink to='/goods' className="navigation-link" onClick={() => getData()}>All</NavLink>
							</li>
						</ul>
					</nav>
				</div>
				<div className="col-lg-2 d-none d-lg-block">
					<div className="form-control search-block">
						<input type="text" value={inputValue} className="form-control" placeholder="Search" aria-label="Recipient's username"
							aria-describedby="button-addon2" onInput={(e) => setInputValue(e.target.value)}/>
						<NavLink to="/goods" className="button btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => searchData(inputValue)}>
							<img src={searchIcon} alt="search"/>
						</NavLink>
					</div>
				</div>
				<div className="col-lg-2 col-6 d-flex justify-content-end" style={{alignItems: 'center', gap: '20px'}}>
					<a href="/register">
						<img src={signIn} width="20" height="20" alt="icon: sign-in" style={{display: 'flex'}}/>
					</a>
					{isAuth === true && 
						<button onClick={logout} style={{background: 'purple'}}>Logout</button>
					}
					<button className="button button-cart" data-count={cart.length} onClick={showModal}>
						<img className="button-icon" src={cartIcon} alt="icon: cart"/>
						<span className="button-text">Cart</span>
						<span className="button-text cart-count"></span>
					</button>
				</div>
			</div>
		</header>
  );
}

export default Header;