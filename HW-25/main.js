
let container = null;
let block = null;

let x = 0;
let y = 0;


const moveBlock = (block, dx, dy, speed ) => {
  
  const maxX = container.clientWidth - block.offsetWidth;
  const maxY = container.clientHeight - block.offsetHeight;


  x += dx * speed;
  y += dy * speed;
  x = Math.max(0, Math.min(maxX, x));
  y = Math.max(0, Math.min(maxY, y));

  block.style.transform = "translate(" + x + "px," + y + "px)";
  //console.log(container.clientHeight)
}

window.addEventListener("load", () => {

  block = $("div", {
    className: "block"
  });

  container = $("div", {
    className: "container"
  }, block);


  document.body.append(container);

  window.addEventListener("keydown", (event) => {

    let speed = event.shiftKey ? 30 : 10;
    let i = 0;
    switch(event.code) {
      case "ControlLeft": {
        moveBlock(block, 0, -1, speed);
        ++i;
        console.log(i);
        event.preventDefault();
        
         
      } break;
      
      case "KeyS": {
        moveBlock(block, 0, 1, speed);
        event.preventDefault();
      } break;
      
      case "KeyA": {
        moveBlock(block, -1, 0, speed);
        event.preventDefault();
      } break;
      
      case "KeyD": {
        moveBlock(block, 1, 0, speed);
        event.preventDefault();
      } break;
      
    }
  });

});




