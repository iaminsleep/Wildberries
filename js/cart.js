const initCartHandler = () => {
    //Такой подход называется инкапсуляцией кода - мы создаем код, и "заворачиваем" его внутрь функции.
    const cartBtn = document.querySelector('.button-cart');

    const cartModal = document.querySelector('#modal-cart');
    const closeBtn = cartModal.querySelector('.modal-close');

    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        cartModal.classList.remove('show');
    });
}

initCartHandler();