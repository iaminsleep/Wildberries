const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link');

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

    }

    const getData = (value, category) => {
        //Метод then принимает функцию в качестве аргумента. Response - это ответ от сервера
        fetch('http://api.willberries/goods')
            .then((res) => res.json()) //параметр response возвращает объект, а json получает из него данные в читаемом виде
            //в параметр data попадёт ответ сервера, то есть массив
            .then((data) => {
                //data.filter похож на функцию forEach, он перебирает массив с данными
                //тернарный оператор, который заменяет конструкцию if-else. ? - if, : - else.
                const array = category ? data.filter((item) => item[value] === value) : data; //filter вернёт тот массив данных, callback которых равен true

                localStorage.setItem('goods', JSON.stringify(array)); //JSON.stringify превращает объект в читаемую строку

                //если мы уже находимся на странице goods.html, нас не будет перекидывать туда ещё раз, в ином случае сработает переход
                if (window.location.pathname !== 'goods.html') {
                    window.location.href = 'goods.html';
                }
                else {
                    renderGoods();
                }
            })
    }

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const linkValue = link.textContent;
            const category = link.dataset.field;
            getData(linkValue, category);
        })
    })

    const goods = localStorage.getItem('goods'); //JSON.parse превращает JSON строку в массив
    if(goods && window.location.pathname.includes('goods.html')) {
        renderGoods(JSON.parse(goods));
    }

    //Проверка на наличие кнопки viewAll, если она есть, то ищутся все товары
    if(document.querySelector('.more')) {
        const viewAllButton = document.querySelector('.more');
        viewAllButton.onclick = () => {
            getData('all');
        }
    }
}

getGoods();