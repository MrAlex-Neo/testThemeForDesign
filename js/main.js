// const savedUser = JSON.parse(localStorage.getItem('user'));
// console.log(savedUser)
//БУРГЕР
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.menu');
menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
})
const listItems = document.querySelectorAll('.activeLi');
listItems.forEach((item) => {
    item.addEventListener('click', () => {
        listItems.forEach((el) => {
            el.classList.remove('activeLiMenuBurger');
        });
        item.classList.add('activeLiMenuBurger');
    });
});
//БУРГЕР

//////////////////////////////////////////////////////////////////////////////////////////////////////

//ИНПУТ С КАТЕГОРИЯМИ(всплывающий список)
const categories = [
    {
        name: "Ремонт и строительство",
        subcategories: [
            "Стройматериалы",
            "Инструменты",
            "Сантехника, водоснабжение и сауна",
            "Двери",
            "Садовая техника",
            "Окна и балконы",
            "Камины и обогреватели",
            "Готовые строения и срубы",
            "Потолки"
        ]
    },
    {
        name: "Мебель и интерьер",
        subcategories: [
            "Кровати, диваны и кресла",
            "Шкафы, комоды и стеллажи",
            "Столы и стулья",
            "Текстиль и ковры",
            "Кухонные гарнитуры",
            "Предметы интерьера, искусство",
            "Освещение",
            "Компьютерные столы и кресла",
            "Подставки и тумбы",
            "Другое"
        ]
    },
    {
        name: "Бытовая техника",
        subcategories: [
            "Для кухни",
            "Для дома",
            "Климатическое оборудование",
            "Для индивидуального ухода",
            "Другое"
        ]
    },
    {
        name: "Растения",
        subcategories: [
            "Живые растения",
            "Вертикальные сады",
            "Искусственные растения"
        ]
    },
    {
        name: "Посуда и товары для кухни",
        subcategories: [
            "Сервировка стола",
            "Приготовление пищи",
            "Хранение продуктов",
            "Приготовление напитков",
            "Хозяйственные товары",
            "Кухонные аксессуары",
            "Другое из категории «Посуда и товары для кухни»"
        ]
    }
];
let searchArray = [];

// Генерация категорий и подкатегорий
const multiselectOptions = document.getElementById("multiselect-options");
categories.forEach((category, index) => {
    const liCategory = document.createElement("li");
    liCategory.classList.add("inputCheck");
    liCategory.setAttribute("data-index", index);

    const pCategory = document.createElement("p");
    pCategory.setAttribute("data-index", index);
    pCategory.textContent = category.name;

    const ulSuboptions = document.createElement("ul");
    ulSuboptions.classList.add("suboptions", "none");
    ulSuboptions.setAttribute("data-index", index);

    category.subcategories.forEach((subCategory, subIndex) => {
        const liSubCategory = document.createElement("li");
        const divLiContent = document.createElement("div");
        divLiContent.classList.add("liContent");

        const h6SubCategory = document.createElement("h6");
        h6SubCategory.textContent = subCategory;

        const imgSubCategory = document.createElement("img");
        imgSubCategory.classList.add("none");
        imgSubCategory.setAttribute("src", "./img/Ok.svg");
        imgSubCategory.setAttribute("alt", "");

        divLiContent.appendChild(h6SubCategory);
        divLiContent.appendChild(imgSubCategory);
        liSubCategory.appendChild(divLiContent);
        ulSuboptions.appendChild(liSubCategory);
    });

    liCategory.appendChild(pCategory);
    liCategory.appendChild(ulSuboptions);
    multiselectOptions.appendChild(liCategory);
});

// Добавление событий для элементов
document.querySelectorAll("#multiselectDaddy .inputCheck p").forEach(elem => {
    elem.addEventListener("click", event => {
        const dataIndex = elem.getAttribute("data-index");
        const suboptions = document.querySelector(`.suboptions[data-index="${dataIndex}"]`);
        if (suboptions) {
            suboptions.classList.toggle("none");
        }
    });
});
document.querySelectorAll("#multiselectDaddy .liContent").forEach(elem => {
    elem.addEventListener("click", event => {
        const text = elem.querySelector("h6").textContent;
        const img = elem.querySelector("img");
        if (searchArray.includes(text)) {
            searchArray = searchArray.filter(item => item !== text);
            img.classList.add("none");
        } else if (searchArray.length < 3) {
            img.classList.remove("none");
            searchArray.push(text);
        }
        const inputField = document.getElementById("multiselect-input");

        if (searchArray.length > 0) {
            const displayText = searchArray.slice(0, 3).join(", ");
            inputField.value = searchArray.length < 4 ? displayText + ` (${searchArray.length}/3)` : displayText;
        } else {
            inputField.value = "";
        }
        console.log(searchArray);
    });
});
document.addEventListener("click", event => {
    const multiselectDaddy = document.getElementById("multiselectDaddy");
    const multiselectOptions = document.querySelector("#multiselectDaddy .multiselect-options");
    if (event.target !== multiselectDaddy && !multiselectDaddy.contains(event.target)) {
        multiselectOptions.classList.add("none");
    }
});
document.getElementById("multiselect-input").addEventListener("click", event => {
    document.querySelector("#multiselectDaddy .multiselect-options").classList.toggle("none");
    document.querySelectorAll("#multiselectDaddy .suboptions").forEach(elem => {
        elem.classList.add("none");
    });
});
document.querySelector('.cleanAll').onclick = () => {
    document.getElementById('filterBoxChooseTown-input').value = '';
    document.getElementById('filterBoxChooseState-input').value = '';
    document.querySelectorAll('.checkShowRoom').forEach(elem => {
        elem.querySelector('input[type="checkbox"]').checked = false; // Снятие галочки с чекбокса
    });
};
//ИНПУТ С КАТЕГОРИЯМИ(всплывающий список)

//////////////////////////////////////////////////////////////////////////////////////////////////////

//ФИЛЬТР(всплывающий список)
let searchTownArray = [];

document.querySelector('.filterBtn').addEventListener('click', () => {
    document.querySelector('.filterBoxBody').classList.toggle('none');
});
document.getElementById('filterBoxChooseTown-input').addEventListener('click', () => {
    fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.json')
        .then(res => res.json())
        .then(json => {
            render(json.Russia, document.getElementById('filterBoxChooseTown'));
            document.querySelector('.filterBoxChooseTown').classList.toggle('none');
            attachEventListenersToTowns();
        });
});
function render(cities, listElement) {
    listElement.innerHTML = cities.map((city, index) => createTownElemForTownList(city, index)).join('');
}

function createTownElemForTownList(city, index) {
    return `
        <li class="inputCheck liTown liStyle" data-index="${index}">
            <p data-index="${index}">${city}</p><img class="${searchTownArray.includes(city) ? '' : 'none'}" src="./img/Ok.svg" alt="">
        </li>
    `;
}
function attachEventListenersToTowns() {
    document.querySelectorAll('.liTown').forEach((elem) => {
        elem.addEventListener('click', (event) => {
            const text = elem.querySelector('p').textContent;
            const img = elem.querySelector('img');
            searchTownArray.includes(text) ? searchTownArray = searchTownArray.filter(item => item !== text) : searchTownArray.push(text);
            img.classList.toggle('none', !searchTownArray.includes(text));
            document.getElementById('filterBoxChooseTown-input').value = searchTownArray.join(', '); // Вывод выбранных городов через запятую
            console.log(searchTownArray);
        });
    });
}
document.addEventListener('click', function (event) {
    const filterBox = document.querySelector('.filterBox');
    const filterBoxBody = document.querySelector('.filterBoxBody');
    const filterBoxChooseTown = document.querySelector('.filterBoxChooseTown');
    const filterBoxChooseState = document.querySelector('.filterBoxChooseState');
    if (event.target !== filterBox && !filterBox.contains(event.target)) {
        filterBoxBody.classList.add('none');
        filterBoxChooseTown.classList.add('none');
        filterBoxChooseState.classList.add('none');
    }
});
document.getElementById('filterBoxChooseState-input').addEventListener('click', () => {
    document.querySelector('.filterBoxChooseState').classList.toggle('none')
})
document.querySelectorAll('.liState').forEach(elem => {
    elem.addEventListener('click', function (event) {
        const inputField = document.getElementById('filterBoxChooseState-input');
        document.querySelectorAll('.liState img').forEach(img => {
            img.classList.add('none');
        });
        this.querySelector('img').classList.remove('none');
        inputField.value = this.querySelector('p').textContent;
    });
});
//ФИЛЬТР(всплывающий список)

//////////////////////////////////////////////////////////////////////////////////////////////////////

// ПЕРЕКЛЮЧАЛКА В МЕНЮ
document.getElementById('providerCategory').onclick = () => {
    document.querySelector('.providerPlace').classList.remove('none')
    document.querySelector('.marketPlace').classList.add('none')
    document.querySelector('.headerBoxH2andSpan h2').textContent = 'Поставщики'
}
document.getElementById('marketCategory').onclick = () => {
    document.querySelector('.providerPlace').classList.add('none')
    document.querySelector('.marketPlace').classList.remove('none')
    document.querySelector('.headerBoxH2andSpan h2').textContent = 'Барахолка'
}
// ПЕРЕКЛЮЧАЛКА В МЕНЮ

//////////////////////////////////////////////////////////////////////////////////////////////////////

// ПРОВАЙДЕР - основной бокс
// Пример данных из бэкенда
const backendData = [
    {
        name: "ООО “СЕВЕР ТОРГПРО”",
        category: "Краски / мебель / отделочные материалы",
        discount: "5 - 15%",
        discountConditions: "При покупке продукции на сумму от 5000 рублей и выше, дизайнеры могут воспользоваться следующими скидками: заказы на сумму от 5000 до 9999 рублей. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        showrooms: "Москва, Санкт-Петербург, Омск, Псков"
    },
    {
        name: "ООО “СЕВЕР ТОРГПРО”",
        category: "Краски / мебель / отделочные материалы",
        discount: "5 - 15%",
        discountConditions: "При покупке продукции на сумму от 5000 рублей и выше, дизайнеры могут воспользоваться следующими скидками: заказы на сумму от 5000 до 9999 рублей. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        showrooms: "Москва, Санкт-Петербург, Омск, Псков"
    },
    {
        name: "ООО “СЕВЕР ТОРГПРО”",
        category: "Краски / мебель / отделочные материалы",
        discount: "5 - 15%",
        discountConditions: "При покупке продукции на сумму от 5000 рублей и выше, дизайнеры могут воспользоваться следующими скидками: заказы на сумму от 5000 до 9999 рублей. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        showrooms: "Москва, Санкт-Петербург, Омск, Псков"
    }
    // ... другие объекты
];

const container = document.querySelector('.infoBodyForProviderCategory');

backendData.forEach(data => {
    const providerCategoryBox = document.createElement('div');
    providerCategoryBox.classList.add('providerCategoryBox');

    providerCategoryBox.innerHTML = `
        <div class="providerCategoryBoxHeader">
            <div class="providerCategoryBoxHeaderLeft">
                <h3>${data.name}</h3>
                <p>${data.category}</p>
            </div>
            <div class="providerCategoryBoxHeaderRight">
                <h3>${data.discount}</h3>
                <p>Комиссия</p>
            </div>
        </div>
        <div class="providerCategoryBoxBody">
            <div class="providerCategoryBoxBodyUp">
                <div class="smallHeader">
                    <img src="./img/mainPage/sale.svg" alt="">
                    <h4>Условия скидок</h4>
                </div>
                <p class="infoAboutProviderProduct">${data.discountConditions}</p>
                <div class="accordeonchikForText readMore">
                    <p>Подробнее</p>
                    <img src="./img/mainPage/down.svg" class="readMore" alt="">
                    <img src="./img/mainPage/up.svg" class="readLess none" alt="">
                </div>
            </div>
            <div class="providerCategoryBoxBodyDown">
                <div class="smallHeader">
                    <img src="./img/mainPage/geo.svg" alt="">
                    <h4>Шоурумы</h4>
                </div>
                <p>${data.showrooms}</p>
            </div>
        </div>
        <div class="providerCategoryBoxFooter">
            <div class="btnCallForProviderBoxFooter prANDsub">
                <p>Связаться</p>
            </div>
            <div class="btnCatalogForProviderBoxFooter prANDsub">
                <p>Каталог товаров</p>
                <img src="./img/mainPage/another site.svg" alt="">
            </div>
            <div class="btnLikeForProviderBoxFooter">
                <img src="./img/mainPage/heart (active).svg" class="passiveLike" alt="">
                <img src="./img/mainPage/heart.svg" class="activeLike none" alt="">
            </div>
        </div>
    `;

    // Добавляем элемент в контейнер
    container.appendChild(providerCategoryBox);
});
const infoContainers = document.querySelectorAll('.providerCategoryBox');

infoContainers.forEach(container => {
    const textElement = container.querySelector('.infoAboutProviderProduct');
    const buttonText = container.querySelector('.accordeonchikForText');

    const maxLength = 145;
    const ellipsis = '...';
    let originalText = textElement.textContent;
    let truncatedText = originalText.substring(0, maxLength) + ellipsis;
    let isExpanded = false;

    textElement.textContent = truncatedText;

    buttonText.addEventListener('click', function () {
        isExpanded = !isExpanded;

        if (isExpanded) {
            textElement.textContent = originalText;
            buttonText.querySelector('p').textContent = 'Свернуть';
            buttonText.querySelector('.readMore').classList.add('none');
            buttonText.querySelector('.readLess').classList.remove('none');
        } else {
            textElement.textContent = truncatedText;
            buttonText.querySelector('p').textContent = 'Подробнее';
            buttonText.querySelector('.readMore').classList.remove('none');
            buttonText.querySelector('.readLess').classList.add('none');
        }
    });

    const likeButton = container.querySelector('.btnLikeForProviderBoxFooter');
    likeButton.addEventListener('click', () => {
        container.querySelector('.passiveLike').classList.toggle('none');
        container.querySelector('.activeLike').classList.toggle('none');
    });
});
// ПРОВАЙДЕР - основной бокс

//////////////////////////////////////////////////////////////////////////////////////////////////////

// Барахолка - основной бокс





document.addEventListener('DOMContentLoaded', function() {
    const marketData = [
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Москва",
        },
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Санкт-Петербург",
        },
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Псков",
        },
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Москва",
        },
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Санкт-Петербург",
        },
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Псков",
        },
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Москва",
        },
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Санкт-Петербург",
        },
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Псков",
        },
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Москва",
        },
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Санкт-Петербург",
        },
        {
            name: "Бензопила huter bs-40",
            img: "./img/mainPage/marketThing.png",
            cost: "Краски / мебель / отделочные материалы",
            city: "г. Псков",
        },
    ];

    const market = document.querySelector('.infoBodyForMarketCategory');

    marketData.forEach(data => {
        const marketCategoryBox = document.createElement('div');
        marketCategoryBox.classList.add('marketCategoryBox');

        marketCategoryBox.innerHTML = `
            <div class="marketCategoryBox">
                <div>
                    <img src="${data.img}" alt="">
                </div>
                <div class="marketThingName">
                    <p>${data.name}</p>
                    <div class="btnLikeForMarket">
                        <img src="./img/mainPage/heart (market-gray).svg" class="marketImgGray">
                        <img src="./img/mainPage/heart (market-red).svg" class="marketimgRed none">
                    </div>
                </div>
                <div class="marketThingCost">
                    <p>${data.cost}</p>
                </div>
                <div class="marketThingCity">
                    <p>${data.city}</p>
                </div>
            </div> 
        `;

        market.appendChild(marketCategoryBox);
    });

    market.addEventListener('click', function(event) {
        const likeButton = event.target.closest('.btnLikeForMarket');
        if (likeButton) {
            const parent = likeButton.closest('.marketCategoryBox');
            if (parent) {
                parent.querySelector('.marketImgGray').classList.toggle('none');
                parent.querySelector('.marketimgRed').classList.toggle('none');
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
  
    toggleSwitch.addEventListener('change', function(e) {
      if (e.target.checked) {
        document.documentElement.classList.add('dark-theme');
      } else {
        document.documentElement.classList.remove('dark-theme');
      }
    });
  });
  


// Барахолка - основной бокс




