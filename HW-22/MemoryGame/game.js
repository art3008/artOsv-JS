// Генерируем массив Длиной N * N, в котором по две копии всех чисел от 0 до N * N / 2
// 0, 1, 2, 3, 4, 5, 6, 7
// 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5 
// 0, 0, 1, 1, 2, 2, 3, 3 ..

// Отсортировать его случайно.

const generateValues = (n, m) =>
  createArray(index => [Math.floor(index / 2), Math.random()]) (n * m)
  .sort((a, b) => a[1] - b[1])
  .map(a => a[0]);

const generateState = (n, m) => createArray(() => false) (n * m);

const generateTimersList = (n, m) => createArray(() => null) (n * m);


const width = 150;
const height = 200;

const createGame = (gameDiv, timerDiv, gameOverCallback) => {
  
  const valueN = document.getElementById("value_N").value;
  const valueM = document.getElementById("value_M").value;
  const colorValue = document.getElementById("select-color").value;

  const buttonPause = document.getElementById("button-pause");
  const values = generateValues(valueN, valueM);
  const state =  generateState(valueN, valueM);;
  const timers = generateTimersList(valueN, valueM);
  
  const images = [
    "G:/ШАГ - JavaScript/HW-JS/artOsv-JS/artOsv-JS/HW-22/images/1013682517.jpg",
    "G:/ШАГ - JavaScript/HW-JS/artOsv-JS/artOsv-JS/HW-22/images/deck-000181-herz7.jpg",
    "G:/ШАГ - JavaScript/HW-JS/artOsv-JS/artOsv-JS/HW-22/images/1013682517.jpg",

  ];

  let gameTimer = null;
  let startTime = 0;
  let pauseTime = 0;
  let endTime = 0;
  let valueRes = 0;
  let isRunning = false;

  const createCard = (index, value) => {
    const div = $("div", { 
      className: "card card_closed",
      dataset: {
        index: index,
      },
      onclick:  handleClick, // addEventListener("click", () => ...)
    }, 
      $("div", { className: "card__face card__front"}, 
      $("img", { src: images[value],
      style:{
        width:"150px",
        height: "200px"
      }})
      ),
      $("div", { className: "card__face card__back"}),
    );

    return div;
  }
 
  let pair = []; // 0-2 элементов
 
  const openCard = (cardDiv) => {
    cardDiv.classList.add("card_open");
    cardDiv.classList.remove("card_closed");
    pair.push(cardDiv);
    
    
  }

  const closeCard = (cardDiv) => {
    cardDiv.classList.add("card_closed");
    cardDiv.classList.remove("card_open");
    // pair.splice(pair.indexOf(cardDiv), 1);
  }
  
  const extractCardIndex = (cardDiv) => parseInt(cardDiv.dataset.index);

  const handleClick = (event) => {

    if (!isRunning) {
      return;
    }

    console.log("before", pair);

    const cardDiv = event.currentTarget;
    const cardIndex = extractCardIndex(cardDiv);

    if (timers[cardIndex] !== null) {
      clearTimeout(timers[cardIndex]);
      timers[cardIndex] = null;
    }

    if (state[cardIndex]) {
      return;
    }

    const isOpen = pair.includes(cardDiv); // cardDiv.classList.contains("card_open"); 
    
    if (!isOpen) {
      openCard(cardDiv)
      
    }

    if (pair.length === 2) {
      const indexes = pair.map(extractCardIndex);
      const [value1, value2] = indexes.map(index => values[index]);
      valueRes++;
      console.log(value1, value2, value1 === value2);
      // console.log(valueRes);
      if(colorValue === "Красный"){
        buttonPause.classList.add("theme_pink");
      } else {
        //buttonPause.classList.remove("col");
      }
      if (value1 === value2) {
        indexes.forEach(index => state[index] = true);
        
        if (state.every(flag => flag)) {
          endTime = Date.now();
          clearInterval(gameTimer);

          var d = new Date();

          console.log("Конец игры. Дата - ", d.getDate() + " " + d.getMonth() + " " + d.getFullYear() + " Время - " + d.getHours() + ":" + d.getMinutes());

          gameTimer = null;
          gridDiv.remove(); // Удаляем элемент со страницы
          // gridDiv.parentElement.removeChild(gridDiv); // removeChild - удалем у родителя переданный элемент
          isRunning = false;
          gameOverCallback(endTime - startTime);
          console.log("Результат игры - ",valueRes);         
        }
        pair = [];

      } else {

        pair.forEach(cardDiv => {
          const index =  extractCardIndex(cardDiv);
          timers[index] = setTimeout(() => {
            closeCard(cardDiv);
            timers[index] = null;
          }, 700);
        });

        pair = [];
        
      }

    }

    console.log("after", pair, timers);
    
  }

  const gridDiv = $("div", { 
      className: "grid",
      style: {
        gridTemplateRows: "repeat(" + valueM + ", " + height + "px)", // repeat(4, 200px)
        gridTemplateColumns: "repeat(" + valueN + ", " + width + "px)",
      } 
    }, 
    ...createArray(index => createCard(index, String(values[index])))(valueN * valueM)
  );
  gameDiv.append(gridDiv);
  
  
  
  const togglePause = () => {
    if (isRunning) {
      pauseTime = Date.now();
      isRunning = false;
      // показать home-screen
    } else {
      startTime += Date.now() - pauseTime;
      pauseTime = 0;
      isRunning = true;
    }
  };

  timerDiv.innerText = "00:00";
  const updateGameTimer = () => {
    if (!isRunning) {
      return;
    }

    const time = Date.now() - startTime;

    const s = Math.round(time / 1000) % 60;
    const m = Math.floor(time / (60 * 1000));

    timerDiv.innerText = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }


  return {
    start: () => new Promise(() => {
        isRunning = true;
        startTime = Date.now(); // количество миллисекунд прошедших с 1 января 1970  Эпоха Unix
        gameTimer = setInterval(updateGameTimer, 1000);
    })
    ,

    togglePause: () => {
      togglePause();
      
       
      return isRunning;
    }
  };
};

// () => {
//   isRunning = true;
//   startTime = Date.now(); // количество миллисекунд прошедших с 1 января 1970  Эпоха Unix
//   gameTimer = setInterval(updateGameTimer, 1000);
// }