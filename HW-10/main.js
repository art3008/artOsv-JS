const logRectangle = rectangle => 
  console.log("Прямоугольник: " + rectangle.width + ", " + rectangle.height);

const logTriangle = triangle =>
    console.log("Треугольник: " + triangle.sideA + ", " + triangle.sideB + ", " + triangle.sideC)

const logCircle = circle =>
    console.log("Круг " + circle.radius);


function Circle (radius) {
    this.radius = radius;
}

Circle.prototype.$type = "circle";

Circle.prototype.square = function(){
    return Math.PI * this.radius * 2;
}

Circle.prototype.log = function() {
    logCircle(this);
}



function Triangle (sideA,sideB,sideC) {

    this.sideA = sideA;
    this.sideB = sideB;
    this.sideC = sideC;
}

Triangle.prototype.$type = "triangle";

Triangle.prototype.square = function() {
    let polup = (this.sideA + this.sideB + this.sideC)/2;
    
    return "Площадь " +  (Math.sqrt(polup * (polup - this.sideA) * (polup - this.sideB) * (polup - this.sideC)));
}

Triangle.prototype.log = function(){
    logTriangle(this);
}


function Rectangle (width,height) {

    this.width = width;
    this.height = height;
}

Rectangle.prototype.$type = "rectangle";

Rectangle.prototype.square = function() {
    return (this.width * this.height);
}

Rectangle.prototype.log = function() {
    logRectangle(this);
}

const shapes = [
    new Rectangle(100,50),
    new Triangle(2,3,4),
    new Circle(2)
];

console.log(shapes);
shapes.forEach(shape => shape.log());
console.log(shapes.map(shape => shape.square()));