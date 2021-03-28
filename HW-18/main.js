const randomInt = (min, max) => 
  min + Math.floor(Math.random() * (max - min));

const createArray = (mapFunction = index => index) => length => 
  Array.from({ length }, (_, index) => mapFunction(index));

const createRandomArray = (min, max) => 
  createArray(() => randomInt(min, max));

// ---
const nNoun = (form1, form2, form3) => {
  return (n) => {

    let absN = Math.abs(n);

    // 123456
    let lastDigt = absN % 10;  // 6
    let secondToLastDigits = Math.trunc(absN / 10) % 10; // 12345 % 10 = 5 

    let word;
    if (secondToLastDigits === 1) {
      word = form3;
    } else {
      if (lastDigt === 1) {
        word = form1;
      } else if (2 <= lastDigt && lastDigt <= 4) {
        word = form2;
      } else {
        word = form3;
      }
    }

    return n + " " + word;
  }
}

const analitics = {
  getPositives: numbers => numbers.filter(n => n > 0),
  getNegatives: numbers => numbers.filter(n => n < 0),
  
  getSum: numbers => 
    numbers.reduce((sum, number) => sum + number, 0),

  getAverage: numbers => analitics.getSum(numbers) / numbers.length,

  areAllPositive: numbers => numbers.every(n => n > 0),

  getAllDivisible: (divisor, numbers) => numbers.filter(n => n % divisor === 0) 
};


const log = {
  boxState: box => {
    console.log("В ящике " + nApples(box));
  
    if (box > 0) {
      console.log("Полная коробка");
    } else if (box === 0) {
      console.log("Пустая коробка");
    } else { // box < 0
      console.log("Кредитная коробка");
    }
  },

  transaction: amount => {
  
    console.log("----------");
    if (amount >= 0) {
      console.log("Получили " + nApples(amount));
    } else {
      console.log("Потеряли " + nApples(Math.abs(amount)));
    }
  },

  result: (box, goal) => {
    
    console.log("----------");
    if (box >= goal) {
      console.log("Ура мы накопили " + nApples(box) + "!");
    } else {
      console.log("Не повезло, не фартануло. Мы накопили только " + nApples(box) + " =(");
    }
  },

  statistics: transactions => {
    let gains = analitics.getPositives(transactions);
    let loses = analitics.getNegatives(transactions);
  
    console.log("Суммарный доход: " + analitics.getSum(gains));
    console.log("Суммарный расход: " + analitics.getSum(loses));
  
    console.log("Средний доход: " + analitics.getAverage(gains));
    console.log("Средний расход: " + analitics.getAverage(loses));
  
    if (analitics.areAllPositive(transactions)) {
      console.log("Все транзакции были положительными!");
    }
  
    console.log(transactions.map(transaction => transaction >= 0 ? "Доход" : "Расход"));
  
    console.log("Круглые транзакции", analitics.getAllDivisible(5, transactions));
  },
}

const nApples = nNoun("яблоко", "яблока", "яблок");

class Box {
  amount;

  listeners = {
    "amountChanged": [], // (amount, transaction, box) => void;
    "boxChanged": [],

  };

  constructor(amount = 0) {
    this.amount = amount;
  }
  
  addEventListener(eventName, handler) {
    this.listeners[eventName].push(handler);
  }

  addBoxListener(eventName, handler) {
    this.listeners[eventName].push(handler);
  }

  changeAmount(transaction) {
    this.amount += transaction;
    
    // Оповещаем подписчиков, сообщаем транзакцию и новое состояник коробки, и коробку
    this.listeners["amountChanged"]
      .forEach(handler => handler(this.amount, transaction, this));
  }

  boxConsist(box) {
    this.amount = box;

    this.listeners["boxChanged"]
      .forEach(handler => handler(this.amount,box,this))
  }
} 

// ---- 
let amounts = createRandomArray(-10, 20) (30);
let goal = 100;
let box = new Box();

box.addEventListener("amountChanged", (_, transaction) => {
  console.log("* " + "Новая транзакция: ", transaction + " *");
});

box.addEventListener("amountChanged", (_,transaction) => {
  if(transaction >= 0) {
    console.log("Получили ", nApples(transaction));
  } else {
    console.log("Потеряли ", nApples(transaction));
  }
});

box.addEventListener("amountChanged", (amount) => {
  console.log("Cостояние коробки: ", amount);
});

box.addEventListener("amountChanged", (amount) => {
  console.log("В ящике " + nApples(amount));
  
    if (amount > 0) {
      console.log("Полная коробка");
    } else if (amount === 0) {
      console.log("Пустая коробка");
    } else { // box < 0
      console.log("Кредитная коробка");
    }
    console.log("-----------------------")
});

box.addBoxListener("boxChanged", (amount) => {
  let transactions = [];
  amounts.push(transactions);
  //console.log(amount);
  // console.log(analitics.getNegatives(amounts));
});

box.addEventListener("amountChanged", (_, transaction) => {
  transactions.push(transaction);
  //console.log();
});

// let box = new Box(["груша", "груши", "груш"]);
// console.log(box);
// log.boxState(box);

let transactions = [];
//console.log(amounts);
// while (box.amount < goal && amounts.length > 0) {
  
//   let amount = amounts.shift();
//   box.changeAmount(amount);
//   //transactions.push(amount)
// }
// //console.log(amounts);
// //console.log(transactions);
// //box.boxConsist(amounts);
// //log.result(box, goal);
// log.statistics(transactions);


const e = (tag, attributes = {}, ...children) => {
    const element = document.createElement(tag);
  
    Object.entries(attributes)
      .forEach(([key, value]) => {
        if (key === "style") {
          Object.entries(value).forEach(([cssKey, cssValue]) => {
            element.style[cssKey] = cssValue;
          });
        } else {
          element[key] = value;
        }
  
      });
  
    element.append(...children);
  
    return element;
  }



  

  window.addEventListener("DOMContentLoaded", (event) => {
    console.log([document.body]);

    const div = e("div", {
      style: {
        border: "1px solid red"
      }
    });
  
    document.body.append(div);
  
    // let index = 0;
    // a.addEventListener("click", (event) => {
    //   event.preventDefault();
    //   console.log(event);
  
    //   a.classList.toggle("link_red");
    //   a.classList.toggle("link_green");
  
    //   ul.append(e("li", {}, "Пункт " + ++index));
    // });
    while (box.amount < goal && amounts.length > 0) {
  
        let amount = amounts.shift();
        //box.changeAmount(amount);
        div.append(e("div", {}, "Пункт ", amount));
        //transactions.push(amount)
      }
      //console.log(amounts);
      //console.log(transactions);
      //box.boxConsist(amounts);
      //log.result(box, goal);
      log.statistics(transactions);

    
});
    
    // Скорость страдает
    // Неудобно
    // Невозсожно нормально добавить обработчики событий
    // document.body.innerHTML = "<a href='sdf'>asdfsadf</a>";
  
