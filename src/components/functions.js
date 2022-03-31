

export const addToCart = (evt, id, App) => {
  const goods = App.state.goods;
  const cart = App.state.cart;

  const clickedGood = goods.find(good => good.id === id);

  if(cart.some(good => good.id === clickedGood.id)) {
    cart.map(good => {
      if(good.id === clickedGood.id) {
          good.count = 1;
      }
      return good;
    })
  } else {
    clickedGood.count = 1;
    cart.push(clickedGood);
  }

  const addToCartBtn = evt.target.closest('button');
  const icon = addToCartBtn.querySelector('img');
  const buttonText = addToCartBtn.querySelector('.button-text');

  addToCartBtn.classList.add('purple-button');
  icon.classList.add('visible-icon');
  addToCartBtn.querySelector('span').classList.add('d-none');

  if(buttonText) {
    buttonText.classList.add('d-none');
    addToCartBtn.classList.add('w-144');
    icon.classList.add('pl-0');
  }

  // addToCartBtn.addEventListener('click', showModal)

  App.setState({cart: cart});
}