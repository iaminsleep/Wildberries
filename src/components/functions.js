export const validateInput = (input, isFormValid) => {
  const form = document.querySelector('.form[method="post"]');
  const emailInput = form.querySelector('#email');
  const passwordInput = form.querySelector('#password');
  const confirmPasswordInput = form.querySelector('#confirm_password');
  const submitButton = form.querySelector('input[type="submit"]');
  const alertFeedback = input.nextElementSibling;

  let message;

  if(input === emailInput) {
    const emailTemplate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(input.value.match(emailTemplate)) {
      isFormValid = true;
    } else {
      isFormValid = false;
      message = "Incorrect email address!";
    }
  }

  else if(input === passwordInput) {
    const passwordTemplate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (input.value.match(passwordTemplate)) {
      isFormValid = true;
    } else {
      isFormValid = false;
      message = "The password must be from 6 to 20 characters, contain at least one digit, one uppercase and one lowercase letter";
    }
  }

  else if(input === confirmPasswordInput) {
    if(input.value !== passwordInput.value) {
      isFormValid = false;
      message = "Passwords don't match!";
    } else {
      isFormValid = true;
    }
  }

  if(!isFormValid) {
    alertFeedback.classList.add('alert-visible');
    submitButton.disabled = true;
    alertFeedback.textContent = message;
  } else {
    alertFeedback.classList.remove('alert-visible');
    submitButton.disabled = false;
  }
}

export const validateForm = (e, isFormValid, App) => {  
  e.preventDefault();   
  if(isFormValid === false) {
    return false;
  }
  App.setState({error: '', warning: '', success: ''});
}

export const showModal = () => {
  document.querySelector('#modal-cart').classList.add('show');
}

export const closeModal = () => {
  document.querySelector('#modal-cart').classList.remove('show');
}

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

  addToCartBtn.addEventListener('click', showModal)

  App.setState({cart: cart});
}