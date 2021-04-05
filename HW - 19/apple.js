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

class Box {
    amount;
  
    constructor(forms,amount = 0) {
      this.amount = amount;
      this.getQuantityString = nNoun(...forms);
    }
    
    changeAmount(transaction) { 
        this.amount += transaction;
        transaction.push(randomInt(-10,30));   
        console.log(transaction);     
    }
  }
  
  let goal = 100;
  let box = new Box(['яблоко','яблока','яблок']);
  let newArray = [];


  window.addEventListener("load",() => {

    const analitics = {
      getPositives: numbers => numbers.filter(n => n > 0),
      getNegatives: numbers => numbers.filter(n => n < 0),
      
      getSum: numbers => 
        numbers.reduce((sum, number) => sum + number, 0),
    
      getAverage: numbers => analitics.getSum(numbers) / numbers.length,
    
      areAllPositive: numbers => numbers.every(n => n > 0),
    
      getAllDivisible: (divisor, numbers) => numbers.filter(n => n % divisor === 0) 
    };

    const logger = {
      statistics: transactions => {
        let gains = analitics.getPositives(transactions);
        let loses = analitics.getNegatives(transactions);
      
        res.append($("div",{},"Суммарный доход: ",analitics.getSum(gains)));
        res.append($("div",{},"Суммарный расход: ",analitics.getSum(loses)));
        
        res.append($("div",{},"Средний доход: ",analitics.getAverage(gains)));
        res.append($("div",{},"Средний расход: ",analitics.getAverage(loses)));               
      },

      transaction: amount => {
      
        console.log("----------");
        if (amount >= 0) {
          console.log("Получили " + nApples(newArray));
        } else {
          console.log("Потеряли " + nApples(Math.abs(newArray)));
        }
      },
    }

    
    const block = $("div", {});
    const res = $("div", {className: "result"})
    const button = $("div",{
      className:"but",
      onclick: () => {      
        box = new Box(['яблоко','яблока','яблок']);
        let result = box.changeAmount(newArray);
        block.classList.toggle(result);

        block.append($("div",{},"Элементы: ", newArray));
        block.append($("div",{},"Сумма: ", analitics.getSum(newArray)))
        
        if(analitics.getSum(newArray) >= 100) {
          button.remove();
          block.remove();
          document.body.append(res);
          res.append($("div",{},logger.statistics(newArray)));
        }
      }
    });

    document.body.append(button,block);
  });       