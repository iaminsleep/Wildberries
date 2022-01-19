import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from './components/header.js';
import Footer from './components/footer.js';
import CartModal from './components/cartModal.js';

import Home from './pages/home.js';
import Goods from './pages/goods.js';

const API = "http://api.willberries/goods";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      goods: [],
    }
  }

  componentDidMount() {
    fetch(API).then(response => response.json()).then(data => {});
  }

  getData(value, category) {
    fetch(API)
      .then((res) => res.json()).then((data) => {
        const array = category ? data.filter((item) => item[category] === value) : data;
        this.setState({goods: array});

        if (window.location.pathname !== 'goods.html') {
            window.location.href = 'goods.html';
        }
        else {
          renderGoods();
        }
      }
    )
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <Header/>
            <Routes>
              {/* <Route path='/Willberries' element={<Home/>}/> */}
              <Route path='Willberries/goods' element={<Goods goods={this.state.goods}/>}/>
            </Routes>
          <Footer/>
          <CartModal/>
        </Router>
      </React.Fragment>
    );
  } 
}

export default App;
