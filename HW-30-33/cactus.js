class Cactus {
  shape;
  position; 

  sprite;
  spriteIsReady = false;
  spriteW;
  spriteH;


  constructor({ w, h, x }) {
    this.position = vector(x, 0);
    this.shape = rect(this.position, vector(w, h));
  
    this.sprite = new Image();
    this.sprite.src = "./palma.png";
    this.sprite.onload = (event) => {
      console.log(event);
      this.spriteIsReady = true;
      this.spriteW = this.sprite.width;
      this.spriteH = this.sprite.height;

      const h = this.shape.size[0] * this.spriteH / this.spriteW;

    }
  
  
  }
}

const spawnCactus = ({ wMin, wMax, hMin, hMax, dMin, dMax }) => (cactuses) => {
  const prevX = cactuses.length > 0 ? cactuses[cactuses.length - 1].position[0] : 0;

  return new Cactus({
    w: randomInt(wMin, wMax),
    h: randomInt(hMin, hMax),
    x: prevX + randomInt(dMin, dMax),
  });
}

/**
 * @param {CanvasRenderingContext2D} context
 */


const renderCactus = (context) => (cactus) => {
  context.beginPath();
  

  if (cactus.spriteIsReady) {
    context.drawImage(
      cactus.sprite, 
      110, 100,
      cactus.spriteW - 110 - 120,
      cactus.spriteH - 100 - 100,
      -cactus.shape.size[0] / 2, 
      -cactus.shape.size[1], 
      cactus.shape.size[0], 
      cactus.shape.size[1]
  );
  }

  context.stroke();
}