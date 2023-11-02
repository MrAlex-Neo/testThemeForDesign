const userDataReg = {};
const userDataAuth = {};


const inputElements = document.querySelectorAll('input');
inputElements.forEach(input => {
    input.setAttribute('autocomplete', 'off');
});

document.querySelector('.regBoxOne .getLastWindowPlease').onclick = () => {
    document.querySelector('.registrationRoles').classList.remove('none')
    document.querySelector('.registrationMain').classList.add('none')
}
document.querySelector('.regBoxTwo .getLastWindowPlease').onclick = () => {
    document.querySelector('.regBoxTwo').classList.add('none')
    document.querySelector('.regBoxOne').classList.remove('none')

}
document.querySelector('.regBoxTwoForProvider .getLastWindowPlease').onclick = () => {
    document.querySelector('.regBoxTwoForProvider').classList.add('none')
    document.querySelector('.regBoxOne').classList.remove('none')

}
document.querySelector('.regBoxThreeForProvider .getLastWindowPlease').onclick = () => {
    document.querySelector('.regBoxThreeForProvider').classList.add('none')
    document.querySelector('.regBoxTwoForProvider').classList.remove('none')

}
document.querySelector('.regBoxThree .getLastWindowPlease').onclick = () => {
    document.querySelector('.regBoxThree').classList.add('none')
    document.querySelector('.regBoxTwo').classList.remove('none')
}
document.querySelector('.regBoxFour .getLastWindowPlease').onclick = () => {
    document.querySelector('.regBoxFour').classList.add('none')
    document.querySelector('.regBoxThree').classList.remove('none')
}




//Логика стартового окна регистрации с выбором роли в приложении
const designerBox = document.getElementById('designerBox');
const providerBox = document.getElementById('providerBox');
const submitButton = document.querySelector('.Btn');
const createAccountBtn = document.getElementById('createAccountBtn');

function handleCategoryClick(selectedBox, deselectedBox) {
    selectedBox.querySelector('.circle').classList.add('clicked');
    deselectedBox.querySelector('.circle').classList.remove('clicked');
    selectedBox.querySelector('.joinSmallBox').classList.add('activeBorder');
    deselectedBox.querySelector('.joinSmallBox').classList.remove('activeBorder');
    submitButton.classList.add('activeBtn');
    createAccountBtn.removeAttribute('disabled');
}

designerBox.addEventListener('click', () => {
    handleCategoryClick(designerBox, providerBox);
});

providerBox.addEventListener('click', () => {
    handleCategoryClick(providerBox, designerBox);
});

function registrationRolesBox() {
    userDataReg.designer = designerBox.querySelector('.circle').classList.contains('clicked');
    userDataReg.provider = providerBox.querySelector('.circle').classList.contains('clicked');
    document.querySelector('.registrationRoles').classList.add('none')
    document.querySelector('.registrationMain').classList.remove('none')
    LogData()
}

createAccountBtn.onclick = registrationRolesBox;



//Логика стартового окна регистрации с выбором роли в приложении

//////////////////////////////////////////////////////////////////////////////////////////////////////

//Логика первой части регистрации с вводом телефонного номера
const phoneInput = document.getElementById('phone');
const label = document.querySelector('.input-container.registration label');

phoneInput.addEventListener('focus', () => {
    if (phoneInput.value.length == 0) {
        phoneInput.value = '+7';
    }
    label.style.top = '-25px';
    label.style.left = '-2px';
    label.style.fontSize = '14px';
});
phoneInput.addEventListener('blur', () => {
    if (!phoneInput.value) {
        if (phoneInput.value.length == 0) {
            phoneInput.value = '+7';
        }
        label.style.top = '20%';
        label.style.left = '2%';
        label.style.fontSize = '16px';
    }
});
// document.addEventListener('click', (event) => {
//     if (event.target !== phoneInput) {
//         if (phoneInput.value.length == 0 ) {
//             phoneInput.value = '+7';
//         }
//         label.style.top = '20%';
//         label.style.left = '2%';
//         label.style.fontSize = '16px';
//     }
// });

const phonePattern = /^\+7\d{10}$/
phoneInput.addEventListener('input', (event) => {
    const value = event.target.value;
    if (phonePattern.test(value)) {
        document.getElementById('createPhoneBtn').removeAttribute('disabled');
    } else {
        document.getElementById('createPhoneBtn').setAttribute('disabled', 'disabled');
    }
});

document.getElementById('createPhoneBtn').onclick = () => {
    userDataReg.phone = phoneInput.value
    if (userDataReg.designer) {
        document.getElementById('regBoxOne').classList.add('none')
        document.getElementById('regBoxTwo').classList.remove('none')
    } else {
        document.getElementById('regBoxOne').classList.add('none')
        document.getElementById('regBoxTwoForProvider').classList.remove('none')
    }
    LogData()
}


//Логика первой части регистрации с вводом телефонного номера

//////////////////////////////////////////////////////////////////////////////////////////////////////

//Логика второй части регистрации с вводом данных о пользователе
document.querySelector('.private').onclick = () => {
    document.querySelector('.private').classList.add('chooseInputActive')
    document.querySelector('.company').classList.remove('chooseInputActive')
    userDataReg.format = 'private'
    document.querySelector('.organizForm').classList.remove('none')
    document.querySelector('.privateBranch').classList.remove('none')
    LogData()
};

document.querySelector('.company').onclick = () => {
    document.querySelector('.private').classList.remove('chooseInputActive')
    document.querySelector('.company').classList.add('chooseInputActive')
    userDataReg.format = 'company'
    document.querySelector('.organizForm').classList.remove('none')
    document.querySelector('.privateBranch').classList.add('none')
    LogData()
};
document.querySelector('.self').onclick = () => {
    document.querySelector('.self').classList.add('chooseInputActive')
    document.querySelector('.ip').classList.remove('chooseInputActive')
    document.querySelector('.ooo').classList.remove('chooseInputActive')
    userDataReg.privateform = 'self'
    LogData()
};
document.querySelector('.ip').onclick = () => {
    document.querySelector('.self').classList.remove('chooseInputActive')
    document.querySelector('.ip').classList.add('chooseInputActive')
    document.querySelector('.ooo').classList.remove('chooseInputActive')
    userDataReg.privateform = 'ip'
    LogData()
};
document.querySelector('.ooo').onclick = () => {
    document.querySelector('.self').classList.remove('chooseInputActive')
    document.querySelector('.ooo').classList.add('chooseInputActive')
    document.querySelector('.ip').classList.remove('chooseInputActive')
    userDataReg.privateform = 'ooo'
    LogData()
};

document.getElementById('userNameCompany').addEventListener('input', (event) => {
    const value = event.target.value;
    if (value != '') {
        document.getElementById('finishTwoPartPrivateRegistr').removeAttribute('disabled');
    } else {
        document.getElementById('finishTwoPartPrivateRegistr').setAttribute('disabled', 'disabled');
    }
});
document.getElementById('finishTwoPartPrivateRegistr').onclick = () => {
    userDataReg.privateCompanyName = document.getElementById('userNameCompany').value
    document.getElementById('regBoxTwo').classList.add('none')
    document.getElementById('regBoxThree').classList.remove('none')
    LogData()
    render()
}

// добавление организации в userdata при регистрации
var token = "604ceb4b3fb376968d5303185e3a88cc503e5f08";
function join(arr /*, separator */) {
    var separator = arguments.length > 1 ? arguments[1] : ", ";
    return arr.filter(function (n) { return n }).join(separator);
}
function showSuggestion(suggestion) {
    userDataReg.suggestion = suggestion
    document.querySelector('.checkBoxListForProviderTwoPartReg').classList.remove('none')
    LogData()
}
$("#userNameCompany").suggestions({
    token: token,
    type: "PARTY",
    count: 10,
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: showSuggestion
});
$("#userNameCompanyProvider").suggestions({
    token: token,
    type: "PARTY",
    count: 10,
    /* Вызывается, когда пользователь выбирает одну из подсказок */
    onSelect: showSuggestion

});
// добавление организации в userdata при регистрации

//Логика второй части регистрации с вводом данных о пользователе

//////////////////////////////////////////////////////////////////////////////////////////////////////

//Логика третьей части регистрации с вводом данных о пользователе
const typeProjectsArray = ['Простой', 'Кратко-срочный', 'Безде-фектный', 'Монопроект', 'Ресурсно сложный', 'Долгосрочный', 'Стандартный', 'Мультипроект',]
function render() {
    const typeArray = document.getElementById('typeProjects')
    typeArray.innerHTML = ''
    for (let i = 0; i < typeProjectsArray.length; i++) {
        typeArray.insertAdjacentHTML("beforeend", TheyAreTypeProgectsFormToList(typeProjectsArray[i], i))
        console.log(typeProjectsArray[i])
    }
}

function TheyAreTypeProgectsFormToList(text, index) {
    return `
    <option selected data-index="${index}">${text}</option>`
}
document.getElementById('userName').addEventListener('input', (event) => {
    const value = event.target.value;
    if (value != '') {
        document.getElementById('finishThreePartPrivateRegistr').removeAttribute('disabled');
    } else {
        document.getElementById('finishThreePartPrivateRegistr').setAttribute('disabled', 'disabled');
    }
});

document.getElementById('finishThreePartPrivateRegistr').onclick = () => {
    userDataReg.userName = document.getElementById('userName').value
    userDataReg.userCity = document.getElementById('userCity').value
    userDataReg.typeProjects = document.getElementById('typeProjects').value
    document.getElementById('regBoxThree').classList.add('none')
    document.getElementById('regBoxFour').classList.remove('none')
    LogData()
}

//Логика третьей части регистрации с вводом данных о пользователе

//////////////////////////////////////////////////////////////////////////////////////////////////////

//Логика четвертой части регистрации с вводом данных о пользователе
const linkBox = document.getElementById('linkBoxArray');
let linkBoxArray = document.querySelectorAll('.link');

document.getElementById('createLinkRegBoxFour').onclick = () => {
    const newLinkElement = document.createElement('div');
    newLinkElement.className = 'input-container link';

    newLinkElement.innerHTML = `
        <div class="linkHeader">
            <h5>Ссылка:</h5>
            <div class="imgDeleteLink"><img src="./img/icons8-delete.svg"></div>
        </div>
        <input type="text" data-index="${linkBoxArray.length}"  required>
    `;

    linkBox.appendChild(newLinkElement);
    linkBoxArray = document.querySelectorAll('.link'); // Обновляем массив linkBoxArray
    console.log(linkBoxArray);

    // Добавляем обработчик клика на .imgDeleteLink в новом элементе
    const deleteLinkButton = newLinkElement.querySelector('.imgDeleteLink');
    deleteLinkButton.addEventListener('click', () => {
        linkBox.removeChild(newLinkElement); // Удаляем родительский элемент при клике
        linkBoxArray = document.querySelectorAll('.link'); // Обновляем массив linkBoxArray
        console.log(linkBoxArray);
    });
};

document.querySelectorAll('input[type="radio"][name="education"]').forEach(input => {
    input.addEventListener('change', event => {
        input.value === '1' ? document.querySelector('.educationRadioAssent').classList.remove('none') :
            document.querySelector('.educationRadioAssent').classList.add('none')
    });
});
document.querySelectorAll('input[type="radio"][name="partfolio"]').forEach(input => {
    input.addEventListener('change', event => {
        input.value === '1' ? document.querySelector('.projectsRadioAssent').classList.remove('none') :
            document.querySelector('.projectsRadioAssent').classList.add('none')
    });
});
document.querySelectorAll('input[type="radio"][name="showrooms"]').forEach(input => {
    input.addEventListener('change', event => {
        input.value === '1' ? document.querySelector('.thingsRadioAssent').classList.remove('none') :
            document.querySelector('.thingsRadioAssent').classList.add('none')
    });
});
document.querySelectorAll('input[type="radio"][name="things"]').forEach(input => {
    input.addEventListener('change', event => {
        input.value === '1' ? document.querySelector('.linksRadioAssent').classList.remove('none') :
            document.querySelector('.linksRadioAssent').classList.add('none')
    });
});


// Функция для обработки загрузки файлов и создания элементов
function handleFileUpload(userEducationInput, educationFilesContainer) {
    userEducationInput.addEventListener('change', function (event) {
        const files = event.target.files;
        const maxFiles = 8; // Максимальное количество файлов
        const existingImages = educationFilesContainer.querySelectorAll('.userDoc');

        if (existingImages.length + files.length > maxFiles) {
            alert('Вы превысили максимальное количество файлов.');
            return;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            const newImgContainer = document.createElement('div');
            const newImg = document.createElement('img');
            const deleteIcon = document.createElement('span');

            newImgContainer.className = 'userDocContainer';
            newImg.className = 'userDoc';
            deleteIcon.className = 'deleteIcon';
            deleteIcon.textContent = '✖'; // Иконка крестика (белый)

            reader.onload = function (e) {
                newImg.src = e.target.result;
            };
            reader.readAsDataURL(file);

            newImgContainer.appendChild(newImg);
            newImgContainer.appendChild(deleteIcon); // Добавляем крестик
            educationFilesContainer.appendChild(newImgContainer);

            // Добавляем обработчик события для удаления элемента при клике на крестик
            deleteIcon.addEventListener('click', function () {
                newImgContainer.remove(); // Удаляем родительский контейнер с изображением
            });
        }

        // Очищаем значение <input> для возможности выбора других файлов
        userEducationInput.value = '';
    });
}

// Получите ссылки на input и контейнеры для обоих частей
const userEducationInput1 = document.getElementById('userEducation');
const educationFilesContainer1 = document.querySelector('.educationFiles');

const userEducationInput2 = document.getElementById('userProject'); // Уникальный ID для второй части
const educationFilesContainer2 = document.querySelector('.projectFiles'); // Уникальный класс для второй части

// Вызовите функцию для каждой части, передав соответствующие элементы
handleFileUpload(userEducationInput1, educationFilesContainer1);
handleFileUpload(userEducationInput2, educationFilesContainer2);


// Добавьте делегирование событий для аккордеона
$(document).ready(function () {
    $(".accordion-content").hide(); // Скрываем все кроме первого
    $(document).on("click", ".accordion-title", function () {
        $(this).next(".accordion-content").slideToggle();
    });
});

//добавление элементов в аккордеон
const createProgectRegBoxFourButton = document.getElementById("createProgectRegBoxFour");
const projectsBoxArray = document.getElementById("projectsBoxArray");
let sum = 1

createProgectRegBoxFourButton.addEventListener("click", function () {
    sum = sum + 1
    const newAccordElem = createAccordElemForRegPgoject(sum);
    const accordion = document.querySelector(".accordion");
    const newElem = document.createElement("div");
    newElem.classList.add("accordion-item");
    newElem.innerHTML = newAccordElem;

    accordion.appendChild(newElem);
});


function createAccordElemForRegPgoject(sum) {
    return `
    <div class="accordion-item">
        <div class="accordion-title">Проект №${sum}</div>
        <div class="accordion-content">
            <p class="regBoxFourLinksWords">Загрузите фотографии проекта</p>
            <div class="projectFiles avaDefault">
                <label for="userProject" class="projectsImgLabel">
                    <img class="userDoc downloadProjectImg" src="./img/downloadFile.svg" alt="">
                </label>
                <input type="file" id="userProject" accept="image/*" style="display: none" multiple>
            </div>
            <div class="inputBox aboutUserProject">
                <div class="input-container aboutUserProjectChild">
                    <h5>Тип объекта</h5>
                    <input type="text">
                </div>
                <div class="input-container aboutUserProjectChild">
                    <h5>Стиль</h5>
                    <input type="text">
                </div>
                <div class="input-container aboutUserProjectChild">
                    <h5>Площадь объекта, кв.м.</h5>
                    <input type="text">
                </div>
                <div class="input-container aboutUserProjectChild">
                    <h5>Стоимость дизайн-проекта, ₽</h5>
                    <input type="text">
                </div>
            </div>
            <div class="input-container aboutUserProjectChild">
                <h5>Описание проекта</h5>
                <textarea type="text"></textarea> 
            </div>
        </div>
    `
}

document.getElementById('finishFourPartPrivateRegistr').onclick = () => {
    // userDataReg.userName = document.getElementById('userName').value
    // userDataReg.userCity = document.getElementById('userCity').value
    // userDataReg.typeProjects = document.getElementById('typeProjects').value
    document.getElementById('regBoxFour').classList.add('none')
    document.getElementById('regBoxFIve').classList.remove('none')
    LogData()
}
//Логика четвертой части регистрации с вводом данных о пользователе

//////////////////////////////////////////////////////////////////////////////////////////////////////

//Логика второго окна дополнительной ветки регистрации для постовщика
document.addEventListener('DOMContentLoaded', function () {
    const providerRolesList = document.getElementById('providerRolesList');
    const lastBoxForTwoPartRegistrationProvider = document.querySelector('.lastBoxForTwoPartRegistrationProvider');
    const chooseInputs = providerRolesList.querySelectorAll('.chooseInput');
    const finishTwoPartProviderRegistr = document.getElementById('finishTwoPartProviderRegistr');


    chooseInputs.forEach(chooseInput => {
        chooseInput.addEventListener('click', () => {
            chooseInputs.forEach(input => input.classList.remove('chooseInputActive'));
            chooseInput.classList.add('chooseInputActive');
            lastBoxForTwoPartRegistrationProvider.classList.remove('none');
            checkInputs();
        });
    });

    const userNameCompanyProvider = document.getElementById('userNameCompanyProvider');
    const cityDepartments = document.getElementById('cityDepartments');
    const userPosition = document.getElementById('userPosition');
    const userFullName = document.getElementById('userFullName');

    const checkInputs = () => {
        const isAnyChooseInputActive = Array.from(chooseInputs).some(chooseInput => chooseInput.classList.contains('chooseInputActive'));

        const isAllInputsFilled = userNameCompanyProvider.value.trim() !== '' &&
            cityDepartments.value.trim() !== '' &&
            userPosition.value.trim() !== '' &&
            userFullName.value.trim() !== '';

        finishTwoPartProviderRegistr.disabled = !(isAllInputsFilled && isAnyChooseInputActive);
    };

    userNameCompanyProvider.addEventListener('input', checkInputs);
    cityDepartments.addEventListener('input', checkInputs);
    userPosition.addEventListener('input', checkInputs);
    userFullName.addEventListener('input', checkInputs);
});


document.getElementById('finishTwoPartProviderRegistr').onclick = () => {
    // userDataReg.userName = document.getElementById('userName').value
    // userDataReg.userCity = document.getElementById('userCity').value
    // userDataReg.typeProjects = document.getElementById('typeProjects').value
    document.getElementById('regBoxTwoForProvider').classList.add('none')
    document.getElementById('regBoxThreeForProvider').classList.remove('none')
    LogData()
}
//Логика второго окна дополнительной ветки регистрации для постовщика

//////////////////////////////////////////////////////////////////////////////////////////////////////


//Логика третьего окна дополнительной ветки регистрации для постовщика
//ИНПУТ С КАТЕГОРИЯМИ
let searchArray = []
document.querySelectorAll('.inputCheck p').forEach((elem) => {
  elem.addEventListener('click', (event) => {
    console.log(event)
    const dataIndex = elem.getAttribute('data-index');
    const suboptions = document.querySelector(`.suboptions[data-index="${dataIndex}"]`);

    if (suboptions) {
      suboptions.classList.toggle('none');
    }
  });
});
document.querySelectorAll('.liContent').forEach((elem) => {
  elem.addEventListener('click', (event) => {
    const text = elem.querySelector('h6').textContent;
    const img = elem.querySelector('img');
    if (searchArray.includes(text)) {
      searchArray = searchArray.filter(item => item !== text);
      img.classList.add('none');
    } else if (searchArray.length < 3) {
      img.classList.remove('none');
      searchArray.push(text);
    }
    const inputField = document.getElementById('multiselect-input');

    if (searchArray.length > 0) {
      const displayText = searchArray.slice(0, 3).join(', ');
      inputField.value = searchArray.length < 4 ? displayText + ` (${searchArray.length}/3)` : displayText;
    } else {
      inputField.value = '';
    }
    console.log(searchArray);
  });
});
document.addEventListener('click', function (event) {
  const multiselect = document.getElementById('multiselect');
  const multiselectOptions = document.querySelector('.multiselect-options');

  if (event.target !== multiselect && !multiselect.contains(event.target)) {
    multiselectOptions.classList.add('none');
  }
});

document.getElementById('multiselect-input').addEventListener('click', function (event) {
  document.querySelector('.multiselect-options').classList.remove('none');
  document.querySelectorAll('.suboptions').forEach(elem => {
    elem.classList.add('none');
  });
  event.stopPropagation();
});
//ИНПУТ С КАТЕГОРИЯМИ

const linkShowrooms = document.getElementById('linkShowrooms');
let linkShow = document.querySelectorAll('.linkShow');

document.getElementById('createLinkShowroomsBox').onclick = () => {
    const newLinkElement = document.createElement('div');
    newLinkElement.className = 'input-container linkShow';

    newLinkElement.innerHTML = `
        <div class="linkHeader">
            <h5>Ссылка:</h5>
            <div class="imgDeleteLink"><img src="./img/icons8-delete.svg"></div>
        </div>
        <input type="text" data-index="${linkShow.length}"  required>
    `;

    linkShowrooms.appendChild(newLinkElement);
    linkShow = document.querySelectorAll('.linkShow'); // Обновляем массив linkBoxArray
    console.log(linkShow);

    // Добавляем обработчик клика на .imgDeleteLink в новом элементе
    const deleteLinkButton = newLinkElement.querySelector('.imgDeleteLink');
    deleteLinkButton.addEventListener('click', () => {
        linkShowrooms.removeChild(newLinkElement); // Удаляем родительский элемент при клике
        linkShow = document.querySelectorAll('.linkShow'); // Обновляем массив linkBoxArray
        console.log(linkShow);
    });
};

document.getElementById('finishRegBoxThreeForProvider').onclick = () => {
    // userDataReg.userName = document.getElementById('userName').value
    // userDataReg.userCity = document.getElementById('userCity').value
    // userDataReg.typeProjects = document.getElementById('typeProjects').value
    document.getElementById('regBoxThreeForProvider').classList.add('none')
    document.getElementById('regBoxFIve').classList.remove('none')
    LogData()
}

//Логика третьего окна дополнительной ветки регистрации для постовщика

//////////////////////////////////////////////////////////////////////////////////////////////////////

//Логика окна авторизации с вводом телефонного номера
const phoneInputAuth = document.getElementById('phoneAuth');
const labelAuth = document.getElementById('labelAuthTel');
const checkTelAuth = document.getElementById('checkTelAuth');
const labelCheckAuthTel = document.getElementById('labelCheckAuthTel');

phoneInputAuth.addEventListener('focus', () => {
    if (phoneInputAuth.value.length == 0) {
        phoneInputAuth.value = '+7';
    }
    labelAuth.style.top = '-25px';
    labelAuth.style.left = '-2px';
    labelAuth.style.fontSize = '14px';
});
phoneInputAuth.addEventListener('blur', () => {
    if (!phoneInputAuth.value) {
        if (phoneInputAuth.value.length == 0) {
            phoneInputAuth.value = '+7';
        }
        labelAuth.style.top = '20%';
        labelAuth.style.left = '2%';
        labelAuth.style.fontSize = '16px';
    }
});
checkTelAuth.addEventListener('focus', () => {
    labelCheckAuthTel.style.top = '-25px';
    labelCheckAuthTel.style.left = '-2px';
    labelCheckAuthTel.style.fontSize = '14px';
});

phoneInputAuth.addEventListener('input', (event) => {
    const value = event.target.value;
    if (phonePattern.test(value)) {
        document.getElementById('createPhoneBtnAuth').removeAttribute('disabled');
    } else {
        document.getElementById('createPhoneBtnAuth').setAttribute('disabled', 'disabled');
    }
});

document.getElementById('createPhoneBtnAuth').onclick = () => {
    if (document.getElementById('createPhoneBtnAuth').textContent === 'Войти') {
        // const user = {name: 'Alex', age: 29}
        // localStorage.setItem('user', JSON.stringify(user))
        location = './main.html'
    }
    userDataAuth.phone = phoneInputAuth.value
    // document.getElementById('regBoxOne').classList.add('none')
    phoneInputAuth.setAttribute('disabled', true);
    document.querySelector('.checkCodeTel').classList.remove('none')
    document.getElementById('createPhoneBtnAuth').textContent = 'Войти'
    // LogData()
}

document.getElementById('getRegProcess').onclick = () => {
    document.querySelector('.authorizationBox').classList.add('none')
    document.querySelector('.registrationRoles').classList.remove('none')

}
document.querySelectorAll('.getAuthProcess').forEach(input => {
    input.addEventListener('click', event => {
        document.querySelector('.registrationRoles').classList.add('none')
        document.querySelector('.registrationMain').classList.add('none')
        document.querySelector('.authorizationBox').classList.remove('none')
    });
});

// Логика окна авторизации с вводом телефонного номера

// API
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        // Отправка файла на сервер
        const formData = new FormData();
        formData.append('userAva', file);



        const userAva = document.getElementById('userAva');
        readURL(fileInput, userAva);

        // Здесь вы можете использовать метод fetch или другие методы для отправки файла на сервер и получения ссылки на него
        // Затем обновите ваш объект данных userDataReg с полученной ссылкой

        // Пример с fetch:
        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Обновление объекта данных
                    userDataReg.userAva = data.imageUrl;
                }
            })
            .catch(error => {
                console.error('Ошибка при загрузке изображения:', error);
            });
    }
});



//Other finctions
// Функция для загрузки облика input в соответствии с згружаемым img ... input = input загрузки файла, boxId = img(на котором будет идти отображение файла)
function readURL(input, boxId) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            boxId.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}
//Проверка собираемого объекта при регистрации
function LogData() {
    console.log(userDataReg)
}


//Логика для получения списка городов
fetch('https://raw.githubusercontent.com/russ666/all-countries-and-cities-json/master/countries.json')
    .then(res => res.json())
    .then(json => {
        let jsObj = json;
        let cities = jsObj['Russia']; // Города России

        let citySelect = document.getElementById('cityDepartments');

        cities.forEach(city => {
            let cityOption = document.createElement('option');
            cityOption.value = city; // Устанавливаем значение для каждой опции
            cityOption.text = city; // Устанавливаем отображаемый текст для опции
            citySelect.appendChild(cityOption);
        });
    });


