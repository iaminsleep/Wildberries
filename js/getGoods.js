const getGoods = () => {
    const links = document.querySelectorAll('.navigation-link');

    const getData = () => {
        //Метод then принимает функцию в качестве аргумента. Response - это ответ от сервера
        fetch('https://willberries-e7829-default-rtdb.europe-west1.firebasedatabase.app/db.json')
            .then((res) => res.json()) //параметр response возвращает объект, а json получает из него данные в читаемом виде
            .then((data) => {
                //в параметр data попадёт ответ сервера, то есть массив
                localStorage.setItem('goods', JSON.stringify(data)); //JSON.stringify превращает объект в читаемую строку
                console.log(data);
                const goods = JSON.parse(localStorage.getItem('goods')); //JSON.parse превращает JSON строку в массив
                console.log(goods);
            })
    }

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            getData();
        });
    });
}

getGoods();