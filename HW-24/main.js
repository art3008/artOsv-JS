

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
  "images/6df0d8cf67090d8832123ddd6ab9f613.jpg",
  "images/23cfc3939104338c0a77447753a47343--rose-bulls-nba-players.jpg",
  "images/1575022925_4.jpg",
  "images/derrick-rose-pic-getty-images-835672364-1424851209-2338352.jpg",
  "images/basketball-computer-wallpaper-preview.jpg",
  "images/6df0d8cf67090d8832123ddd6ab9f613.jpg",
  "images/6df0d8cf67090d8832123ddd6ab9f613.jpg",
  "images/6df0d8cf67090d8832123ddd6ab9f613.jpg",
  "images/6df0d8cf67090d8832123ddd6ab9f613.jpg",
  "images/6df0d8cf67090d8832123ddd6ab9f613.jpg",
  "images/6df0d8cf67090d8832123ddd6ab9f613.jpg",
  
];

const createSlide = (value) => {
  console.log(value);
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
console.log(images);