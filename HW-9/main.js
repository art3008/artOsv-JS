const randomInt = (min,max) =>
  min + Math.floor(Math.random() * (max - min));

const createRandmArray = (min,max,length) =>{
  let arr = [];

  for (let i = 0; i < length; i++) {
      arr.push(randomInt(min,max));      
  }
  return arr;
}

const getSum = numbers => 
  Math.abs(numbers.reduce((sum, number) => sum + number, 0));

const filterPositive = (array) =>{
    return array.filter(arr => arr > 0);
    
}

const filterNegative = (array) =>{
     return array.filter(arr => arr < 0 );
}

const getAverageValue = (array) =>{
    return getSum(array)/array.length;
}

const nNoun = (form1,form2,form3) =>{
  return (n) =>{

      let absN = Math.abs(n);

      let lastDigit = absN % 10;
      let word;
      let secondLastDigit = Math.trunc(absN / 10) % 10;
      if(secondLastDigit === 1){
          word = form3;
      }else{
          if(lastDigit === 1){
              word = form1;
          } else if (2 <= lastDigit && lastDigit <= 4){
              word = form2;
          } else {
              word = form3;
          }

      }
      return n + " " + word;
  }
  
}

const apples = nNoun("яблоко","яблока","яблок");

const loggerTrans = amount =>{
  if(amount >= 0 ){
      console.log("Вы получили " + apples(amount));
  }else{
      console.log("Вы потеряли " + apples(amount));
  }
}

const objectPrinter = {
    balancePrint: n => console.log("Массив", n),
    sumArray: n => console.log("Сумма значений в массиве", n),
    positiveArray: n => console.log("Доход ", n),
    negativeArray: n => console.log("Расход ", n),
    sumPositive: n => console.log("Сумма дохода ", n),
    sumNegative: n => console.log("Сумма расхода ", n),
    averagePositive: n => console.log("Средний доход ", n),
    averageNegative: n => console.log("Средний расход", n)
}


const analitics = {

  loggerApple: (balance) => {
    console.log("------------")
    console.log("В ящике " + balance + " яблок");
    if(balance > 0){
      console.log("Ящик не пустой");
    }else if(balance === 0){
      console.log("Ящик пустой");
    }else{
      console.log("Вы должны клиенту яблок");
    }
  },
  loggerTrans: (amount) =>{
    if(amount >= 0 ){
      console.log("Вы получили " + apples(amount));
    }else{
      console.log("Вы потеряли " + apples(amount));
    }
  }

}

const funcEvery = (currentValue) => currentValue > 0;


let balance = 0;
let amounts = createRandmArray(-10,20,25);

let arraySumApple = getSum(amounts);

let arrayPositiveTransact = filterPositive(amounts);
let arrayNegativeTransact = filterNegative(amounts);

let arraySumPositiveTransact = getSum(arrayPositiveTransact);
let arraySumNegativeTransact = getSum(arrayNegativeTransact);

let averagePositiveTransact = getAverageValue(arrayPositiveTransact);
let averageNegativeTransact = getAverageValue(arrayNegativeTransact);

let example = amounts.every(funcEvery);

let roots = amounts.map(function(num){
    if(num > 0){
      return "Доход" + " " + num;
    }
    else{
      return "Расход" + " " + num;
    }

});

objectPrinter.balancePrint(amounts);
objectPrinter.sumArray(arraySumApple);
objectPrinter.positiveArray(arraySumPositiveTransact);
objectPrinter.negativeArray(arrayNegativeTransact);
objectPrinter.sumPositive(arraySumPositiveTransact);
objectPrinter.sumNegative(arraySumNegativeTransact);
objectPrinter.averagePositive(averagePositiveTransact);
objectPrinter.averageNegative(averageNegativeTransact);

amounts.reverse();

console.log("Перевернутый массив ", amounts);
console.log("Массив с использованием map: ", roots)
console.log("Все транзакции были положительными ?", example);

console.log("*************")
console.log("LOGGER");
console.log("*************")

while(balance <= 100){
    
    let amount = amounts.shift();
    balance += amount;
    analitics.loggerTrans(amount);
    analitics.loggerApple(balance);  
}