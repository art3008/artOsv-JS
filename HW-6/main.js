const randomInt = (min,max) =>
    min + Math.floor(Math.random() * (max - min));

const createRandmArray = (min,max,length) =>{
    let arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(randomInt(min,max));      
    }
    return arr;
}


const filterPositive = (array) =>{
    let newArray;
    newArray = array.filter(arr => arr > 0);
    return newArray;
}

const filterNegative = (array) =>{
    let newArray;
    newArray = array.filter(arr => arr < 0);
    return newArray;
}

const sumArray = (array) =>{
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];   
    }
    return sum;
}

const averageValue = (array) =>{
    let avgValue;
    for (let i = 0; i < array.length; i++) {
        avgValue = Math.ceil((sumArray(array)/array.length));
        
    }
    return avgValue;
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

let balance = 0;
let amounts = createRandmArray(-10,20,30);

let positive = filterPositive(amounts);
let negative = filterNegative(amounts);

let sumPositive = sumArray(positive);
let sumNegative = sumArray(negative);

let avgPositive = averageValue(positive);
let avgNegative = averageValue(negative);

console.log("Массив " + amounts);

console.log("Массив положительных " + positive);
console.log("Массив отрицательных " + negative);

console.log("Доход " + sumPositive);
console.log("Расход " + sumNegative);

console.log("Среднее значение дохода " + avgPositive);
console.log("Среднее значение расхода " + avgNegative);

console.log("*************")
console.log("LOGGER");
console.log("*************")
while(balance <= 100){
    
    let amount = amounts.shift();
    balance += amount;
    loggerTrans(amount);
    loggerApple(balance);  
}