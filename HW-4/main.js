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

const randomInt = (min,max) =>
    min + Math.floor(Math.random() * (max - min));

let balance = 0;
let amount = 0;

while(balance <= 50){
    
    amount += randomInt(-5,10);
    balance += amount;
    loggerTrans(amount);
    loggerApple(balance);

}


