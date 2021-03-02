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


const createSumArray = (array) =>{
    let sum = 0;

    for (let i = 0; i < array.length; i++) {
        sum += array[i];
        
    }

    return sum;
}

const createSumIncome = (array) =>{

    let income = 0;

    for (let i = 0; i < array.length; i++) {
        income += array[i];
    }
    
    return income;
}

// const createAverageArray = (array) =>{

// }


// let sss = createRandmArray(-5,10,20);

// let positive = createOnlyPositive(sss);

// let summa = createSumArray(positive);

// console.log(sss);
// console.log(positive);
// console.log(summa);

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
let sumIncome = createSumIncome(positive);


console.log(amounts);
console.log(positive);
console.log("Доход равен " + sumIncome);

while(balance <= 100){
    
    let amount = amounts.shift();
    balance += amount;
    loggerTrans(amount);
    loggerApple(balance);  
}


