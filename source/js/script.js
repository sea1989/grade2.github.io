'use strict';

var messageLink = document.querySelector('.call');
var messageForm = document.querySelector('.modalForm');
var closeButtonLink = document.querySelector('.modal__button-close');
var phoneInputList = document.querySelectorAll('.phone');
var overlay = document.querySelector('.overlay');
var anchorList = document.querySelectorAll('.anchor-link');
var accList = document.querySelectorAll('.acc');
var phoneInput;
var anchor;
var acc;
var closeLink;
var userName;
var userPhone;
var messageContent;
var isStorageSupport = true;

// проверка работы хранилища
try {
  localStorage.getItem('userName');
  localStorage.getItem('userPhone');
  localStorage.getItem('messageContent');
} catch (err) {
  isStorageSupport = false;
}

// форма отправки сообщения
if (messageLink) {
  userName = messageForm.querySelector('[id=name-modal]');
  userPhone = messageForm.querySelector('[id=phone-modal]');
  messageContent = messageForm.querySelector('[id=content-modal]');

  // открытие формы отправки сообщения по кнопке
  messageLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    overlay.classList.add('modal-show');
    document.body.classList.add('stop-scrolling');
    messageForm.classList.add('modal-show');
    userName.focus();
  });

  // проверка полей формы отправки сообщения
  messageForm.addEventListener('submit', function (evt) {
    if (!userName.value || !userPhone.value || messageContent.value === '') {
      evt.preventDefault();
      messageForm.classList.remove('modal-error');
      messageForm.offsetWidth = messageForm.offsetWidth;
      messageForm.classList.add('modal-error');
      if (!userName.value) {
        userName.focus();
      } else {
        if (!userPhone.value) {
          userPhone.focus();
        } else {
          if (messageContent.value === '') {
            messageContent.focus();
          }
        }
      }
    } else {
      if (isStorageSupport) {
        localStorage.setItem('userName', userName.value);
        localStorage.setItem('userPhone', userPhone.value);
      }
    }
  });
}

// закрытие модального окна по кнопке закрытия
if(closeButtonLink){
  closeButtonLink.addEventListener('click', function (evt) {
    closeLink = evt.target;
    if (closeLink.parentNode.classList.contains('modal-show')) {
      closeLink.parentNode.classList.remove('modal-show');
      overlay.classList.remove('modal-show');
      document.body.classList.remove('stop-scrolling');
    }
    if (closeLink.parentNode.classList.contains('modal-error')) {
      closeLink.parentNode.classList.remove('modal-error');
    }
  });
}

// закрытие модального окна по esc
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (messageForm) {
      if (messageForm.classList.contains('modal-show')) {
        messageForm.classList.remove('modal-show');
        messageForm.classList.remove('modal-error');
        overlay.classList.remove('modal-show');
        document.body.classList.remove('stop-scrolling');
      }
    }
  }
});

// закрытие модального окна по клику на overlay
if(overlay){
  overlay.addEventListener('click', function () {
    if (messageForm.classList.contains('modal-show')) {
      messageForm.classList.remove('modal-show');
      messageForm.classList.remove('modal-error');
      overlay.classList.remove('modal-show');
      document.body.classList.remove('stop-scrolling');
    }
  });
}

// валидация формы номера телефона
for (var i = 0; i < phoneInputList.length; i++) {
  phoneInput = phoneInputList[i];
  phoneInput.addEventListener('click', addPhone);
  phoneInput.addEventListener('keydown', checkPhone);
}

function addPhone(evt) {
  var inp = evt.target;
  if (!inp.value.length) {
    inp.value = '+7(';
  }
}

function checkPhone(evt) {
  var inp = evt.target;
  var curLen = inp.value.length;
  if (!/\d/.test(evt.key)) {
    if (evt.keyCode === 8 || evt.keyCode === 9) {
      return;
    } else {
      evt.preventDefault();
    }
  }
  if (curLen === 0) {
    inp.value = inp.value + '+7(';
  }
  if (curLen === 2) {
    inp.value = inp.value + '(';
  }
  if (curLen === 6) {
    inp.value = inp.value + ') ';
  }
  if (curLen === 10) {
    inp.value = inp.value + '-';
  }
  if (curLen === 13) {
    inp.value = inp.value + '-';
  }
  if (curLen > 16) {
    inp.value = inp.value.substring(0, inp.value.length - 1);
  }
}

// аккордеон
for (i = 0; i < accList.length; i++) {
  acc = accList[i];
  acc.addEventListener('click', function (e) {
    if (e.target.checked) {
      for (var j = 0; j < accList.length; j++) {
        accList[j].checked = accList[j] === e.target ? true : false;
      }
    }
  });
}

// плавный скроллинг
for (i = 0; i < anchorList.length; i++) {
  anchor = anchorList[i];
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    var link = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
    var blockID = link.getAttribute('href').substr(1);
    window.scrollTo({
      top: document.getElementById(blockID).offsetTop,
      left: 0,
      behavior: 'smooth'
    });
  });
}
