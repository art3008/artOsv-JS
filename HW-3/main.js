const randomInt = (min,max) =>
    min + Math.floor(Math.random() * (max - min));

const createRandmArray = (min,max,length) =>{
    let arr = [];

    for (let i = 0; i < length; i++) {
        arr.push(randomInt(min,max));      
    }
    return arr;
}

const nNoun = (form1,form2,form3) =>{
    return (n) =>{

        let absN = Math.abs(n);

        let lastDigit = absN % 10;
        let word;
        if(lastDigit === 1){
            word = form1;
        }
        
        else if(2 >= lastDigit && lastDigit <= 4) {
            word = form2;
        }
        
        else{
            word = form3;
        }

        return n + " " + word;
    }
    
}

const apples = nNoun("яблоко","яблока","яблок");

const loggerTrans = amount =>{
    if(amount >= 0 ){
        console.log("Вы получили " + apples(amount));
    }else{
        console.log("Вы потеряли " + Math.abs(apples(amount)));
    }
}

const loggerApple = (balance) =>{

    console.log("------------")
    console.log("В ящике " + apples(balance));
    if(balance > 0){
        console.log("Ящик не пустой");
    }else if(balance === 0){
        console.log("Ящик пустой");
    }else{
        console.log("Вы должны клиенту яблок");
    }

}

let balance = 0;
let amounts = createRandmArray(-10,20,30);


console.log("*************")
console.log("LOGGER");
console.log("*************")
while(balance <= 100){
    
    let amount = amounts.shift();
    balance += amount;
    loggerTrans(amount);
    loggerApple(balance);  
}
