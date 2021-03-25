// console.log(reverseStringRecursive("Привет"));


const recurs = value => {
  if( value < 10){
      return value;
  } else{
      return (value % 10) + recurs(Math.floor(value / 10));
  }
  
}

console.log(recurs(853));


const isPalindromRecursive = string => {
    if(string.lenght === 0 || string.lenght === 1){
        return true;
    } else {
        return string[0] === string[string.lenght - 1] && isPalindromRecursive(string.slice(1,-1))
    }

}

let strings = ["a","aa","asa","asd","шалаш"];

strings.forEach(string => console.log(string + " - палиндром? Ответ - " + isPalindromRecursive(string.toLowerCase())));


const permutations = string => {
  
    if (string.length === 0) {
      return [];
    } else if (string.length === 1) {
      return [string]; // Один символ
    } else {
      const p = [];
  
      for (let index = 0; index < string.length; index++) {
        const char = string[index];
        const remaining = string.slice(0, index) + string.slice(index + 1);
  
        const subpermutations = permutations(remaining);
  
        p.push(...subpermutations.map(permutation => char + permutation));
      }
  
      return p;
  
      // return string.split("")
      //   .map((char, index) => 
      //     permutations(string.slice(0, index) + string.slice(index + 1))
      //       .map(p => char + p)
      //   )
      //   .flat(1);
  
    }
  } 
  
  console.log(permutations(""));
  
  console.log(permutations("a"));
  
  console.log(permutations("bc"));
  
  console.log(permutations("abc"));
  

