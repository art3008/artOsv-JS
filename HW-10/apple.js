const randomInt = (min, max) => 
  min + Math.floor(Math.random() * (max - min));

const createArray = (mapFunction = index => index) => length => 
  Array.from({ length }, (_, index) => mapFunction(index));

const createRandomArray = (min, max) => 
  createArray(() => randomInt(min, max));


const analitics = {
  getPositives: numbers => numbers.filter(n => n > 0),
  getNegatives: numbers => numbers.filter(n => n < 0),
  
  getSum: numbers => 
    numbers.reduce((sum, number) => sum + number, 0),

  getAverage: numbers => analitics.getSum(numbers) / numbers.length,

  areAllPositive: numbers => numbers.every(n => n > 0),

  getAllDivisible: (divisor, numbers) => numbers.filter(n => n % divisor === 0) 
};


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

const log = {
  boxState: box => {
    console.log("В ящике " + box.getQuantityString(box.amount));
  
    if (box.amount > 0) {
      console.log("Полная коробка");
    } else if (box.amount === 0) {
      console.log("Пустая коробка");
    } else { // box < 0
      console.log("Кредитная коробка");
    }
  },

  transaction: (box, amount) => {
  
    console.log("----------");
    if (amount >= 0) {
      console.log("Получили " + box.getQuantityString(amount));
    } else {
      console.log("Потеряли " + box.getQuantityString(Math.abs(amount)));
    }
  },

  result: (box, goal) => {
    
    console.log("----------");
    if (box.amount >= goal) {
      console.log("Ура мы накопили " + box.getQuantityString(box.amount) + "!");
    } else {
      console.log("Не повезло, не фартануло. Мы накопили только " + box.getQuantityString(box.amount) + " =(");
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

class Box {
  amount;

  constructor(forms, amount = 0) {
    this.amount = amount;
    this.getQuantityString = nNoun(...forms);
  }
  
  changeAmount(transaction) {
    this.amount += transaction;
  }

} 

// ---- 
let amounts = createRandomArray(-10, 20) (30);

let goal = 100;

let box = new Box(["яблоко", "яблока", "яблок"]);
// let box = new Box(["груша", "груши", "груш"]);


console.log(box);
log.boxState(box);

let transactions = [];

while (box.amount < goal && amounts.length > 0) {
  let amount = amounts.shift();
  box.changeAmount(amount);

  transactions.push(amount);

  log.transaction(box, amount);
  log.boxState(box);
}

log.result(box, goal);
log.statistics(transactions);