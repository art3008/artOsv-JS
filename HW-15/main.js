const reverseStringRecursive = string => {
    if (string.length === 1) { 
      return string;
    } 
    else {
      return reverseStringRecursive(string.slice(1)) + string[0];
    }
  }
  
console.log(reverseStringRecursive("Привет".toLowerCase()));