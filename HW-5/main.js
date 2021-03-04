const randomInt = (min,max) =>
    min + Math.floor(Math.random() * (max - min));

const createRandmArray = (min,max,length) =>{
    let arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(randomInt(min,max));      
    }
    return arr;
}


const createOnlyPositive = (array) =>{

    let positiveArray = [];

    for (let i = 0; i < array.length; i++) {
        if(array[i] > 0){
            positiveArray.push(array[i])
        }
       
    }

    return positiveArray;
}

const createOnlyNegative = (array) =>{
    let negativeArray = [];

    for (let i = 0; i < array.length; i++) {
        
        if(array[i] < 0){
            negativeArray.push(array[i]);
        }
        
    }

    return negativeArray
}

const createSumArray = (array) =>{
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        sum += array[i];
        
    }

    return sum;
}

const averageValue = (array) =>{

    let result = 0;
    for (let i = 0; i < array.length; i++) {
        result =  Math.floor((createSumArray(array))/array.length);

    }
    
    return result;
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
let positive = createOnlyPositive(amounts);
let negative = createOnlyNegative(amounts);

let sumIncome = createSumArray(positive);
let sumExpend = createSumArray(negative);

let avgInc = averageValue(positive);
let avgExp = averageValue(negative);




console.log("Массив " +  " " + amounts);
console.log("Доход " + positive);
console.log("Расход " + negative);

console.log("Доход равен " + sumIncome);

console.log("Расход равен " + sumExpend);
console.log("Среднее значение дохода " + avgInc);
console.log("Среднее значение расхода " + avgExp);

console.log("*************")
while(balance <= 100){
    
    let amount = amounts.shift();
    balance += amount;
    loggerTrans(amount);
    loggerApple(balance);  
}


