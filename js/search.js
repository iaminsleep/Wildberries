const initSearchHandler = () => {

    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');

    const renderGoods = (goods) => {
        const goodsContainer = document.querySelector('.long-goods-list');
        goodsContainer.innerHTML = "";

        goods.forEach(good => {
            const goodBlock = document.createElement('div');
            goodBlock.classList.add('col-lg-3');
            goodBlock.classList.add('col-sm-6');

            //${} позволяет использовать js переменную внутри обратных кавычек
            goodBlock.innerHTML = `
            <div class="goods-card">
                <a class="goods-link" href="#">
                    <span class="label ${good.label ? null : 'd-none'}">${good.label}</span>
                    <img src="http://api.willberries/img/goods/${good.img}" alt="${good.name}" class="goods-image">
                    <h3 class="goods-title">${good.name}</h3>
                    <p class="goods-description">${good.description}</p>
                </a>
                <button class="button goods-card-btn add-to-cart" data-id="${good.id}">
                    <span class="button-price">$${good.price}</span>
                </button>
            </div>
            `
            goodsContainer.append(goodBlock);
        })

        if(goodsContainer.innerHTML === '') {
            goodsContainer.append(`<h3>Товаров пока нет. Ожидайте поставку!</h3>`);
        }
    }

    const getData = (value) => {
        fetch('http://api.willberries/goods')
            .then((res) => res.json())
            .then((data) => {
                const array = data.filter(good => {
                    //чтобы сравнивание слов было точным, мы делаем так чтобы все слова начинались с маленькой буквы,
                    // и сравниваем со значением из поиска которое тоже состоит из маленьких букв
                    return good.name.toLowerCase().includes(value.toLowerCase());
                });

                localStorage.setItem('goods', JSON.stringify(array));

                if (window.location.pathname !== 'goods.html') {
                    window.location.href = 'goods.html'
                }
                else {
                    renderGoods();
                }
            })
    }

    try {
        searchBtn.addEventListener('click', () => {
            getData(input.value);
        });
    }
    catch(e) {
        console.error(e.message);
    }
};

initSearchHandler();