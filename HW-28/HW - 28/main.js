async function sleep(delay) {

    let promise = new Promise((resolve, reject) => {
      console.log("Привет");
      console.log("Ждём - " + delay);
      setTimeout(() => resolve("Дождались!"), delay)
    });
  
    let result = await promise; 
  
    console.log(result); 
  }
  
  sleep(3000);