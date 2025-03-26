
const burgerButton = document.querySelector('.burger'),
        headerPopupCloseBtn = document.querySelector('.header__popup-close'),
        headerPopup = document.querySelector('.header__popup');
burgerButton.addEventListener('click', () => {
  burgerButton.classList.toggle('active');
  headerPopup.classList.toggle('active');
  document.body.classList.toggle('lock');
});
headerPopupCloseBtn.addEventListener('click', () => {
  burgerButton.classList.remove('active');
  headerPopup.classList.remove('active');
  document.body.classList.remove('lock');
});
headerPopup.addEventListener('click', (event) => {
  if (event.target === headerPopup) {
    burgerButton.classList.remove('active');
      headerPopup.classList.remove('active');
      document.body.classList.remove('lock');
  }
});


const swiper = new Swiper('.promo-block-slider', {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 30,
  pagination: {el: '.promo-block-slider-pagination', clickable: true},
  navigation: {
    nextEl: '.promo-block__slider-next',
    prevEl: '.promo-block__slider-prev',
  },
});

const galleryswiper = new Swiper('.gallery-slider', {
  slidesPerView: 1,
  loop: true,
  spaceBetween: 30,
  pagination: {
    el: '.custom-fraction',
    type: 'fraction',
    formatFractionCurrent: function(number) {
      return number;
    },
    formatFractionTotal: function(number) {
      return 'из ' + number;
    },
    renderFraction: function(currentClass, totalClass) {
      return '<span class="' + currentClass + '"></span> ' +
             '<span class="' + totalClass + '"></span>';
    }
  },
  navigation: {
    nextEl: '.gallery-slider-next',
    prevEl: '.gallery-slider-prev',
  },
});

function updateGalleryNavPosition() {
  document.querySelectorAll('.gallery-box').forEach(galleryBox => {
    const galleryNavBoxes = galleryBox.closest('.container_big').querySelectorAll('.gallery-nav-box');

    if (galleryNavBoxes.length) {
      const galleryBoxHeight = galleryBox.offsetHeight;

      galleryNavBoxes.forEach(navBox => {
        navBox.style.top = (galleryBoxHeight + 48) + 'px';
      });
    }
  });
}

// Вызываем функцию после загрузки DOM
document.addEventListener('DOMContentLoaded', updateGalleryNavPosition);



const tabs = document.querySelectorAll('.tabs-btn');
const tabBlocks = document.querySelectorAll('.tab-block');

// Добавляем класс active первой кнопке и первому блоку, если их нет
if (tabs.length > 0 && tabBlocks.length > 0) {
  tabs[0].classList.add('active');
  tabBlocks[0].classList.add('active');
}

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Удаляем active у всех вкладок и блоков
    tabs.forEach(t => t.classList.remove('active'));
    tabBlocks.forEach(block => block.classList.remove('active'));

    // Добавляем active к нажатой кнопке и соответствующему блоку
    tab.classList.add('active');
    const target = document.querySelector(tab.getAttribute('data-tab'));
    if (target) {
      target.classList.add('active');
    }
  });
});



function maskPhone(selector, masked = '+7 (___) ___-__-__') {
    const elems = document.querySelectorAll(selector);
  
    function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");
      console.log(template);
      let i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}";
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type === "blur" && this.value.length < 5) {
        this.value = "";
      }
  
    }
  
    for (const elem of elems) {
      elem.addEventListener("input", mask);
      elem.addEventListener("focus", mask);
      elem.addEventListener("blur", mask);
    }
  
  }
  maskPhone('.input-phone', '+7 (___) ___-__-__');

  const modalOverlay = document.querySelector('.popup-form');
  const openModalBtn = document.querySelectorAll('.open-modal');
  const closeModalBtn = document.querySelector('.popup-close');
  
  // Открытие модалки
  openModalBtn.forEach(element => {
    element.addEventListener('click', () => {
      modalOverlay.classList.add('active');
      document.body.classList.add('lock');
  });
  });
  
  
  
  // Закрытие модалки по кнопке
  closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.classList.remove('lock');
  });
  
  // Закрытие модалки при клике на оверлей
  modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
          document.body.classList.remove('lock');
      }
  });
  
  // Закрытие модалки по клавише Esc
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
          modalOverlay.classList.remove('active');
          document.body.classList.remove('lock');
      }
  });