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
    }

});

const constructorCircle = (radius) => ({
    radius,
    log: function() {
        logCircle(this)
    }
});

const constructorTriangle = (a,b,c) => ({
    a,
    b,
    c,
    log: function() {
        logTriangle(this)
    }
});


const rectangle1 = constructorRectangle(100,150);
const circle1 = constructorCircle(100);
const triangle1 = constructorTriangle(100,150,300);


const shapes = [rectangle1,circle1,triangle1];

shapes.forEach(shape => shape.log(shape))

