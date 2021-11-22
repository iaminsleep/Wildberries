const initCartHandler = () => {
    //Такой подход называется инкапсуляцией кода - мы создаем код, и "заворачиваем" его внутрь функции.
    const cartBtn = document.querySelector('.button-cart');
    const cartModal = document.querySelector('#modal-cart');
    const closeBtn = cartModal.querySelector('.modal-close');

    const goodsContainer = document.querySelector('.long-goods-list');

    const modalForm = document.querySelector('.modal-form');
    const cartTable = document.querySelector('.cart-table__goods');
    const totalPriceEl = document.querySelector('.card-table__total');

    //удобная функция, куда достаточно передать id и действие с элементом чтобы управлять товаром в корзине.
    const manageCartItem = (id, action) => {
        const cart = JSON.parse(localStorage.getItem('cart'));

        if(action === 'delete') {
            const newCart = cart.filter(good => {
                return good.id !== id;
            })
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
        else
        {
            const newCart = cart.map(good => {
            if(good.id === id && good.count > 0) {
                if(action === 'minus') good.count--;
                else if (action === 'plus') good.count++;
            }
            return good;
            })
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
        renderCartGoods(JSON.parse(localStorage.getItem('cart')));
    }

    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem('goods'));
        const clickedGood = goods.find(good => good.id === id); //метод find работает так же как и filter и forEach.
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        if(cart.some(good => good.id === clickedGood.id)) {
            console.log('Увеличен count на 1');
            //метод map нужен для создания нового массива, перебирая предыдущий
            cart.map(good => {
                if(good.id === clickedGood.id) {
                    good.count++;
                }
                return good;
            })
        }
        else {
            console.log('Добавить в корзину');
            clickedGood.count = 1;
            cart.push(clickedGood);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const renderCartGoods = (goods) => {
        //Данные переменные позволяют вычислить полную цену товаров
        let totalPrice = 0;

        cartTable.innerHTML = '';

        goods.forEach(good => {
            const totalItemPrice = +good.price * +good.count;
            totalPrice += totalItemPrice;

            const element = document.createElement('tr');
            element.innerHTML = `
                <td>${good.name}</td>
                <td>$${good.price}</td>
                <td><button class="cart-btn-minus">-</button></td>
                <td>${good.count}</td>
                <td><button class="cart-btn-plus">+</button></td>
                <td>$${totalItemPrice}</td>
                <td><button class="cart-btn-delete">x</button></td>
            `
            cartTable.appendChild(element);

            element.addEventListener('click', (evt) => {
                if(evt.target.classList.contains('cart-btn-minus')) {
                    manageCartItem(good.id, 'minus');
                }
                else if(evt.target.classList.contains('cart-btn-plus')) {
                    manageCartItem(good.id, 'plus');
                }
                else if(evt.target.classList.contains('cart-btn-delete')) {
                    manageCartItem(good.id, 'delete');
                }
            });
            totalPriceEl.textContent = `$${totalPrice}`;
        });
    };

    const sendForm = () => {
        const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];
        //Методы получения объектов по name
        const nameField = document.querySelector('.modal-input[name="nameCustomer"]');
        const phoneField = document.querySelector('.modal-input[name="phoneCustomer"]');

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                cart: cart,
                name: nameField.value,
                phone: phoneField.value,
            }),
        }).then(() => {
            cartModal.classList.remove('show');
            nameField.value = '';
            phoneField.value = '';
            totalPriceEl.textContent = '0$';
            localStorage.removeItem('cart');
        })
    }

    modalForm.addEventListener('submit', (evt) => {
        evt.preventDefault();
        sendForm();
    })

    //Обработчик onclick принимает только один параметр, следующее объявление onclick перезапишет параметр прошлого.
    //Обработчик addEventListener может принимать бесконечное количество параметр для одного объекта
    cartBtn.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        renderCartGoods(cartArray);

        cartModal.classList.add('show');
    });


    closeBtn.addEventListener('click', () => {
        cartModal.classList.remove('show');
    });
    //Закрытие окна корзины при нажатии на поле вокруг окна
    cartModal.addEventListener('click', (evt) => {
        if(!evt.target.closest('.modal')) {
            cartModal.classList.remove('show');
        }
    })
    //Обработчик для кнопок
    window.addEventListener('keydown', (evt) => {
        if(evt.keyCode === 27 && cartModal.classList.contains('show')) {
            cartModal.classList.remove('show');
        }
        else if(evt.keyCode === 13 && cartModal.classList.contains('show')) {
            modalForm.submit();
        }
    })

    if(goodsContainer) {
        goodsContainer.addEventListener('click', (evt) => {
            if(evt.target.closest('.add-to-cart')) {
                const buttonToCart = evt.target.closest('.add-to-cart');
                const goodId = buttonToCart.dataset.id;
                addToCart(goodId);
            }
        })
    }
}

initCartHandler();