window.addEventListener("load", () => {

    const re = /^(\d+)([-+*/^])(\d+)$/;
    
    const input = $("input",{type:"text"})
    const div = $("div",{},"");
    
    document.body.append(input,div);
    
    
    
    window.addEventListener("input", () => {
    
        const regexResult = input.value.match(re); 
        
        let valueA = parseInt(regexResult[1]);
        let valueExpression = regexResult[2];
        let valueB = parseInt(regexResult[3]);
    
        console.log(valueExpression)
        switch(valueExpression){
          case "+":
            div.innerHTML = valueA + valueB;   
          break;
          case "*":
            div.innerHTML = valueA * valueB;
          break;
          case "-":
            div.innerHTML = valueA - valueB;      
          break;
          case "/":
            div.innerHTML = valueA / valueB;      
          break;
          case "^":
              div.innerHTML = Math.pow(valueA,valueB);
          break;
          case "sqrt":
              div.innerHTML = Math.sqrt(valueB);
          break;  
          default:
            div.innerHTML = "ОШИБКА!";
          break;
          }
         
      });
    
    });