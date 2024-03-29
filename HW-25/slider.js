// 1. от html 
// 2. от js 

/**
 * 1. Управление клавиатурой
 * 2. Пролистывание мышкой
 * 3* Луп
 */

class Slider {

  _container;
  _film;
  _slides;
  _options;

  _paddingLeft = 0;
  _paddingRight = 0;
  _currentIndex = 0;

  _playState = false;
  _playTimer = null;
  _playDirection = 0;
  _playSpeed = 0;
  
  constructor(container, film, slides, options) {
    this._container = container;
    this._film = film;
    this._slides = slides;
    this._options = options;


    // TODO: очищать event listener при уничтожении слайдера
    window.addEventListener("resize", () => {
      this._upadatePostion();
    });

    this._upadatePostion();

  }

  _upadatePostion() {

    const min = this._container.clientWidth - this._film.offsetWidth - this._paddingLeft;
    const max = this._paddingRight;

    let x = -this._slides[this._currentIndex].offsetLeft + this._paddingLeft;

    x = Math.max(min, Math.min(max, x));

    // console.log(x, this._paddingLeft);
    
    this._film.style.transform = "translateX(" + x + "px)";
  }

  static fromData(data, createSlide, options = {}) {
      
    const slides = Array.from(data, (data) => 
      $("div", {
          className: "slider__slide"
        }, 
        createSlide(data)
      )
    ); 

    const film = $("div", {
      className: "slider__film",
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'row',
        
      }
    }, ...slides);

    const container = $("div", {
      className: "slider__container"
    }, film);



    return new Slider(container, film, slides, options);
  }


  appendTo(element) {
    element.append(this._container);
    
    // TODO: пересчитывать каждый раз, когда необходимо
    this._container.style.height = this._film.offsetHeight + "px";

    const style = window.getComputedStyle(this._container);
    this._paddingLeft = parseInt(style.paddingLeft);
    this._paddingRight = parseInt(style.paddingRight);

    this._upadatePostion();
  }


  moveSlide(direction) {
    this._slides[this._currentIndex].classList.remove("slide_active");

    let index = (this._currentIndex + direction) % this._slides.length;
    if (index < 0) {
      index = this._slides.length + index;
    }

    // Math.min(this._currentIndex + direction, this._slides.length - 1)
    this._currentIndex = Math.max(0, index);
    this._slides[this._currentIndex].classList.add("slide_active");

    this._upadatePostion();
  }
  

  nextSlide() {
    this.moveSlide(1);
  }

  prevSlide() {
    this.moveSlide(-1);
  }

  firstSlide() {
    this.goToSlide(0);
  }


  lastSlide() {
    this.goToSlide(this._slides.length - 1);
  }


  goToSlide(index) {
    this.moveSlide(index - this._currentIndex)
  }

  currentSlide() {
    return this._slides[this._currentIndex];
  }





  play(direction = 1, dt = 1000) {
    this._playDirection = direction;
    this._playSpeed = dt;

    if (this._playTimer === null) {
      const doStep = () => {
        console.log(this._playDirection, this._playSpeed);
        this.moveSlide(this._playDirection);

        this._playTimer = setTimeout(doStep, this._playSpeed);
      }


      doStep();
    }
  }

  stop() {
    if (this._playTimer !== null) {
      clearInterval(this._playTimer);
    }

    
    this._playDirection = 0;
    this._playTimer = null;
  }

}
