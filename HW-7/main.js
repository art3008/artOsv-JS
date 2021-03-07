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
    return Math.ceil(getSum(array)/array.length);
}


const loggerApple = (balance) =>{

  console.log("------------")
  console.log("В ящике " + balance + " яблок");
  if(balance > 0){
      console.log("Ящик не пустой");
  }else if(balance === 0){
      console.log("Ящик пустой");
  }else{
      console.log("Вы должны клиенту яблок");
  }

}

const loggerTrans = amount =>{
  if(amount >= 0 ){
      console.log("Вы получили " + amount + " яблок");
  }else{
      console.log("Вы потеряли " + amount + " яблок");
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



console.log("Сумма ", arraySumApple, amounts);

amounts.reverse();

console.log("Перевернутый массив ", amounts);

console.log("Массив с использованием map: ", roots)

console.log("Доход ", arrayPositiveTransact);
console.log("Расход ", arrayNegativeTransact);

console.log("Сумма дохода", arraySumPositiveTransact);
console.log("Сумма расходов", arraySumNegativeTransact);

console.log("Средние значение дохода", averagePositiveTransact);
console.log("Среднее значение расхода", averageNegativeTransact);

console.log("Все транзакции были положительными ?", example);

console.log("*************")
console.log("LOGGER");
console.log("*************")

while(balance <= 100){
    
    let amount = amounts.shift();
    balance += amount;
    loggerTrans(amount);
    loggerApple(balance);  
}




// Используя наработки предыдущих ДЗ:

// Использовать пройденный функции массивов: map, reduce, filter, some, every, sort, reverse

// Избавляемся от циклов, там где можем.
// + Разделить на положительные и отрицательные (filter)
// +Вывести сумму дохода (т.е. всех положительных транзакций) (reduce)
// +Вывести сумму расходов (т.е. всех отрицательных транзакций) (reduce)
// +Посчитать средний доход (т.е. среднее значение всех положительных транзакций)
// +Посчитать средний расход (т.е. среднее значение всех отрицательных транзакций)
// +Вывести специальное сообщение, если все транзакции были положительные (every)
// +Сгенерировать массив строк "Доход" или "Расход", соответсвенно каждой транзакции (map transaction => "Доход" или "Расход")
// Творческое задание: использовать одну из оставшихся функций