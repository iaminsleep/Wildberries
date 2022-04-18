import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { setError, setSuccess, setWarning } from '../.store/actions/setMessages';
import setModalVisibility from '../.store/actions/setModalVisibility';
import setCartItems from '../.store/actions/setCartItems';

import Alert from '../components/alert';
import companyLogo from '../img/logo.svg';
import searchIcon from '../img/search.png';
import cartIcon from '../img/cart.svg';
import signInIcon from '../img/sign-in.png';
import logoutIcon from '../img/sign-out.png';

const Header = ({ API, getData, searchData, getCookie, removeCookie, checkAuth }) => {
	const cart = useSelector(state => state.cart);
	const isAuth = useSelector(state => state.isLoggedIn);
	const userInfo = useSelector(state => state.userInfo);

	let error = useSelector(state => state.errorMessage);
	let warning = useSelector(state => state.warningMessage);
	let success = useSelector(state => state.successMessage);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [categories, setCategories] = useState([]);
	const [genders, setGender] = useState([]);
	const [areFiltersLoaded, setFiltersLoaded] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const cartLength = cart.length;

	useEffect(() => {
		const getCategories = async () => {
			await axios.get(`${API}/categories`).then((response) => {
				setCategories(response.data);
			});
		};
		const getGenders = async () => {
			await axios.get(`${API}/genders`).then((response) => {
				setGender(response.data);
			});
		};
		if (!areFiltersLoaded) {
			getCategories();
			getGenders();
			setFiltersLoaded(true);
		}
	}, [API, areFiltersLoaded]);

	const logout = async () => {
		const accessToken = getCookie('accessToken');
		let status;
		try {
			await axios.post(`${API}/users`, {
				withCredentials: true,
				validateStatus: function () { return true },
			}, {
				headers: {
					'Authorization': 'Bearer ' + accessToken
				}
			}).then((res) => {
				status = res.status;
				if (status === 200) {
					removeCookie('accessToken');
					navigate('/'); checkAuth();
					dispatch(setSuccess(res.data.message));
					return dispatch(setCartItems([]));
				}
				return dispatch(setError(res.data.message));
			}).catch((err) => {
				return dispatch(setError('Internal Server ' + err));
			});
		}
		catch {
			return dispatch(setWarning("Something went wrong. Try again!"));
		}
	}

	return (
		<React.Fragment>
			<header className="container header px-4 px-md-0">
				<div className="row justify-content-between align-items-center">
					<div className="col-lg-2 col-6">
						<NavLink to='/' className="logo-link">
							<img width="128" src={companyLogo} alt="logo: Willberries" className="logo-image" />
						</NavLink>
					</div>
					<div className="col-lg-6 d-none d-lg-block">
						<nav>
							<ul className="navigation d-flex justify-content-around">
								{genders.map((gender, index) =>
									<li key={index} className="navigation-item">
										<NavLink to='/goods' className="navigation-link" onClick={() => getData(gender.id, 'gender', gender.name)}>{gender.name}</NavLink>
									</li>
								)}
								{categories.map((category, index) =>
									<li key={index} className="navigation-item">
										<NavLink to='/goods' className="navigation-link" onClick={() => getData(category.id, 'category', category.name)}>{category.name}</NavLink>
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
								aria-describedby="button-addon2" onInput={(e) => setInputValue(e.target.value)} />
							<NavLink to="/goods" className="button btn btn-outline-secondary" type="button"
								id="button-addon2" onClick={() => searchData(inputValue)}>
								<img src={searchIcon} alt="search" />
							</NavLink>
						</div>
					</div>
					<div className="col-lg-2 col-6 d-flex align-center">
						<div className="acc-management-btns" style={{ marginLeft: isAuth === false ? '20px' : '' }}>
							{<NavLink to={isAuth === false ? "/login" : "/account"}>
								<img src={signInIcon} width="20" height="20" alt="icon: sign-in" />
							</NavLink>}
							{isAuth === true ? <button onClick={logout} className="btn-logout">
								<img src={logoutIcon} width="22" height="22" alt="icon: logout" />
							</button> : ''}
						</div>
						<button className={"button button-cart ml-auto" + (cartLength > 0 ? ' pseudo' : '')}
							data-count={cartLength} onClick={() => dispatch(setModalVisibility(true))}>
							<img className="button-icon" src={cartIcon} alt="icon: cart" />
							<span className="button-text">Cart</span>
							<span className="button-text cart-count"></span>
						</button>
					</div>
				</div>
			</header>
			{error !== '' ? <Alert message={error} type={'error'} /> : ''}
			{warning !== '' ? <Alert message={warning} type={'warning'} /> : ''}
			{success !== '' ? <Alert message={success} type={'success'} /> : ''}
			{ userInfo.role === 1 && window.location.pathname !== '/orders' &&
				<button className="button" id="manager-btn" onClick={() => navigate('/orders')}>Manage Orders</button>
			}
		</React.Fragment>
	);
}

export default Header;