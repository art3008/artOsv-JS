const funcJoin = (value,...array) =>{

    let str = "";

    array = array.flat();

    for (let i = 0; i < array.length; i++) {
               
        if( i >= 0 && i < array.length - 1){
            str += array[i] + value;
        } 
        else{
            str += array[i];
        }
        
        
    }

    return str;
}

console.log(funcJoin("=",["a","2"],["3","4"],[5,6]))
console.log(funcJoin("=",1,2,3,4,5,6))
