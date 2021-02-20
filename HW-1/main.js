let countApple = 0;

console.log("Количество яблок = " + countApple);

if(countApple > 0){
    console.log("Вау! У тебя есть хоть что - то");
}
else if(countApple === 0){
    console.log("Друг у тебя нету яблок. Иди купи яблок");
}
else{
    console.log("ERROR!");
}

countApple += 100;

console.log("Количество яблок = " + countApple);

if(countApple > 0){
    console.log("Вау! У тебя есть хоть что - то");
}
else if(countApple === 0){
    console.log("Друг у тебя нету яблок. Иди купи яблок");
}
else{
    console.log("Ты в пролёте");
}


countApple -=1000

console.log("Количество яблок = " + countApple);

if(countApple > 0){
    console.log("Вау! У тебя есть хоть что - то");
}
else if(countApple === 0){
    console.log("Друг у тебя нету яблок. Иди купи яблок");
}
else{
    console.log("Ты в пролёте");
}
