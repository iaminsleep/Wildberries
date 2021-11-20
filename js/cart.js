const initCartHandler = () => {
    //Такой подход называется инкапсуляцией кода - мы создаем код, и "заворачиваем" его внутрь функции.
    const cartBtn = document.querySelector('.button-cart');

    const cartModal = document.querySelector('#modal-cart');
    const closeBtn = cartModal.querySelector('.modal-close');

    //Обработчик onclick принимает только один параметр, следующее объявление onclick перезапишет параметр прошлого.
    //Обработчик addEventListener может принимать бесконечное количество параметр для одного объекта
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        cartModal.classList.remove('show');
    });
}

initCartHandler();