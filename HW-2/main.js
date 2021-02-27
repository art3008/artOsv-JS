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
amount = 100;

balance += amount;

loggerApple(balance);
loggerTrans(amount);

amount = -50;
balance += amount;

loggerApple(balance);
loggerTrans(amount);


amount = 1000;
balance += amount;

loggerApple(balance);
loggerTrans(amount);

amount = -1050
balance += amount;

loggerApple(balance);
loggerTrans(amount);

