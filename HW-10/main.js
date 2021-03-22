const logRectangle = rectangle =>
    console.log("Прямоугольник: " + rectangle.width + "," + rectangle.height);

const logCircle = circle =>
    console.log("Круг: " + circle.radius);

const logTriangle = triangle =>
    console.log("Треугольник: " + triangle.a + "," + triangle.b + "," + triangle.c);

const constructorRectangle = (width,height) => ({
    width,
    height,
    log: function() {
        logRectangle(this)
    },
    square: function() {
        return (this.width + this.height) * 2;
    }

});

const constructorCircle = (radius) => ({
    radius,
    log: function() {
        logCircle(this)
    },
    square: function() {
        return Math.PI * Math.pow(this.radius,2);
    }
});

const constructorTriangle = (a,b,c) => ({
    a,
    b,
    c,
    log: function() {
        logTriangle(this)
    },
    square: function() {
        halfPerim = (this.a + this.b + this.c)/2;
        
        return Math.sqrt(halfPerim * (halfPerim - this.a) * (halfPerim - this.b) * (halfPerim - this.c));
    }
});


const rectangle1 = constructorRectangle(100,150);
const circle1 = constructorCircle(3);
const triangle1 = constructorTriangle(3,4,5);


const shapes = [rectangle1,circle1,triangle1];

shapes.forEach(shape => shape.log(shape))
console.log(shapes.map(shape => shape.square()));