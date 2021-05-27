class Pterodactyl {
  shape;
  position;
  v;


  sprite;
  spriteIsReady = false;
  spriteW;
  spriteH;
  
  
  constructor({ w, h, x, y, vx}) {
    this.position = vector(x, y);
    this.shape = rect(this.position, vector(w, h));
    this.v = vector(-vx, 0);
    console.log(vx);


    this.sprite = new Image();
    this.sprite.src = "./dinozavr.png";
    this.sprite.onload = (event) => {
      console.log(event);
      this.spriteIsReady = true;
      this.spriteW = this.sprite.width;
      this.spriteH = this.sprite.height;

      const h = this.shape.size[0] * this.spriteH / this.spriteW;

      this.shape = rect(this.shape.position, vector(this.shape.size[0], h));
    }




  }

  step(dt) {
    this.position = add(this.position, scale(this.v, dt));
    this.shape = rect(this.position, this.shape.size);
  }
}

const spawnPterodactyl = ({ wMin, wMax, hMin, hMax, dMin, dMax, vMin, vMax, yMin, yMax }) => (peterodactyls) => {
  const prevX = peterodactyls.length > 0 ? peterodactyls[peterodactyls.length - 1].position[0] : 0;


  return new Pterodactyl({
    w: randomInt(wMin, wMax),
    h: randomInt(hMin, hMax),
    x: prevX + randomInt(dMin, dMax),
    y: randomInt(yMin, yMax),
    vx: randomInt(vMin, vMax),
  });
}


/**
 * @param {CanvasRenderingContext2D} context
 */

const renderPterodactyl= (context) => (peterodactyl) => {
  context.beginPath();

  if (peterodactyl.spriteIsReady) {
    context.drawImage(
      peterodactyl.sprite, 
      110, 100,
      peterodactyl.spriteW - 110 - 120,
      peterodactyl.spriteH - 100 - 100,
      -peterodactyl.shape.size[0] / 2, 
      -peterodactyl.shape.size[1], 
      peterodactyl.shape.size[0], 
      peterodactyl.shape.size[1]
  );
  }
  context.stroke();
}