

window.addEventListener("load", () => {
  const slider = Slider.fromData([1,2,3,4,5,6,7,8,9,10], createSlide);
  


  const sliderContainer = document.body.querySelector(".slider");
  slider.appendTo(sliderContainer);

  document.querySelector(".button_left").addEventListener("click", () => {
    slider.prevSlide();
    
  });
  
  document.querySelector(".button_right").addEventListener("click", () => {
    slider.nextSlide();
  });
  
  let isSpacePressed = false;
  let delayedLeftPress = null;
  let delayedRightPress = null;

  let isIndexStarted = false;
  let indexBuffer = "";



  // Клавиша отпущенаp
  sliderContainer.addEventListener("keyup", (event) => {
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
      } break;
    }

    if (event.key >= 0 && event.key <= 9) {
      console.log(event.key);
      indexBuffer += event.key;
    }


  });


  sliderContainer.addEventListener("keydown", (event) => {

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

  
  slider.goToSlide(0);
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
      width:"50px",
      height: "50px"
    }})
  );
}
console.log(images);