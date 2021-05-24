// + фокус


// + Пробел влево

// + Двойной щелчок
//    - регистрируем отложенный обработчик 200ms
//    - повторное нажатие - если есть отложенный - убиваем, иначе регистрируем

// По цифрам

// ~ Аватоплей

window.addEventListener("load", () => {
  const slider = Slider.fromData([1,2,3], createSlide);
  
  // const slider2 = Slider.fromData([9, 8, 7, 6, 5 , 4, 3, 2, 1], createSlide);


  const sliderContainer = document.body.querySelector(".slider");
  slider.appendTo(sliderContainer);
  // slider2.appendTo(document.body.querySelector(".slider"));

  document.querySelector(".button_left").addEventListener("click", () => {
    slider.prevSlide();
    // slider2.prevSlide();
  });
  // document.querySelector(".button_left").addEventListener("mouseenter", () => {
  //   slider.play(-2);
  //   // slider2.nextSlide();
  // });

  // document.querySelector(".button_left").addEventListener("mouseleave", () => {
  //   slider.stop();
  //   // slider2.nextSlide();
  // });

  document.querySelector(".button_right").addEventListener("click", () => {
    slider.nextSlide();
    // slider2.nextSlide();
  });
  // document.querySelector(".button_right").addEventListener("mouseenter", () => {
  //   slider.play();
  //   // slider2.nextSlide();
  // });

  // document.querySelector(".button_right").addEventListener("mouseleave", () => {
  //   slider.stop();
  //   // slider2.nextSlide();
  // });


  let isSpacePressed = false;
  let delayedLeftPress = null;
  let delayedRightPress = null;

  let isIndexStarted = false;
  let indexBuffer = "";

  // let delayedClick = null;


  // Клавиша отпущенаp
  sliderContainer.addEventListener("keyup", (event) => {
    // console.log("keyup", event);

    switch (event.code) {
      case "ArrowLeft": {

        if (event.ctrlKey || isSpacePressed) {
          slider.firstSlide()
        } else if (delayedLeftPress === null) {
          delayedLeftPress = setTimeout(() => {
            slider.prevSlide();
            delayedLeftPress = null;
          }, 200);
        } else {
          clearTimeout(delayedLeftPress);
          delayedLeftPress = null;
          slider.firstSlide();
        }

      } break;

      case "ArrowRight": {
        
        if (event.ctrlKey || isSpacePressed) {
          slider.lastSlide()
        } else if (delayedRightPress === null) {
          delayedRightPress = setTimeout(() => {
            slider.nextSlide();
            delayedRightPress = null;
          }, 200);
        } else {
          clearTimeout(delayedRightPress);
          delayedRightPress = null;
          slider.lastSlide();
        }

        event.preventDefault();
      } break;
      
      case "Space": {
        isSpacePressed = false;
        event.preventDefault();
      } break;


      case "AltRight":
      case "AltLeft": {
        isIndexStarted = false;

        if (indexBuffer) {
          slider.goToSlide(Number(indexBuffer) - 1);
        }

        indexBuffer = "";
        // event.preventDefault();
      } break;
    }

    // console.log(event.code);
    if (event.key >= 0 && event.key <= 9) {
      console.log(event.key);
      indexBuffer += event.key;
    }


  });


  sliderContainer.addEventListener("keydown", (event) => {
    // console.log("keyup", event);

    switch (event.code) {
      case "Space": {
        isSpacePressed = true;
        event.preventDefault();
      } break;

      case "AltRight":
      case "AltLeft": {
        isIndexStarted = true;
        // event.preventDefault();
      } break;
    }

  });

  // window.addEventListener("keypress", (event) => {
  //   console.log("keypress", event);
  // });
  
  // const logEvent = console.lo
  // mouseover
  // mouseenter
  // mousemove x N
  // mouseleave


  // sliderContainer.addEventListener("mouseover", console.log);
  // sliderContainer.addEventListener("mouseenter", (event) => {
  //   console.log(event);

  //   slider.play();
  // });

  // sliderContainer.addEventListener("mouseleave", (event) => {
  //   console.log(event);
  //   slider.stop();
  // });

  
  // sliderContainer.addEventListener("mousemove", (event) => {
  //   // console.log(sliderContainer.offsetTop,sliderContainer.offsetLeft );
  //   const left = sliderContainer.offsetLeft;
  
  //   const halfWidth = sliderContainer.offsetWidth / 2;

  //   const center = left + halfWidth;

  //   const dx = event.pageX - center; 

  //   // console.log(center, halfWidth, dx);

  //   // slider.play(Math.trunc(5 * dx / halfWidth), 1000);

  //   // 0    - +half
  //   // half    0 
  //   // 1       0  
  //   // 2000 - 200 

  //   slider.play(
  //     Math.sign(dx), 
  //     ((halfWidth - Math.abs(dx)) / halfWidth) * 2000 + 200
  //     // Math.abs(halfWidth / Math.min(100, dx))
  //   );



  //   // console.log(event);
  //   // slider.stop();
  // });

  // sliderContainer.addEventListener("mousemove", console.log);


  slider.goToSlide(2);
});


const images = [
  "/home/artem/Рабочий стол/STEP/artOsv-JS/HW-24/images/kisspng-king-of-clubs-playing-card-king-of-spades-clip-art-king-of-spades-5b0ccc1c687f55.188174121527565340428.jpg"
];

const createSlide = (value) => {
  return $("div", { 
      className: "slide__content", 
      style: {
        width: 300 + "px",
        height: 300 + "px",
      }
    }, 
    $("img", {src:images[value],
    style:{
      width:"300px",
      height: "300px"
    }})
  );
}