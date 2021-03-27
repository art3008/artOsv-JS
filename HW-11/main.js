class Rectangle {
    constructor(width = 0,height = 0) {
        this.width = width;
        this.height = height;
    }

    print() {
        console.log("Прямоугольник " + this.width + "," + this.height);
    }

    get perimetr() {
        return (this.width + this.height) * 2;
    };
}

class Square extends Rectangle {
    constructor(width = 0) {
        super(width,width);
    }
    print() {
        console.log("Квадрат " + this.width)
    }
}

class Triangle {
    constructor(a = 0,b = 0,c = 0) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    print(){
        console.log("Треугольник " + this.a + this.b + this.c);
    }

    get perimetr(){
        return this.a + this.b + this.c;
    };

    get area() {
        const p = this.perimetr / 2;
        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    };

    static areEqual(t1,t2){
        if(t1 instanceof Triangle && t2 instanceof Triangle){
            const sides1 = [t1.a,t1.b,t1.c];
            const sides2 = [t2.a,t2.b,t2.c];

            return sides1[0] === sides2[0] && sides1[1] === sides2[1] && sides1[2] === sides2[2];
        } else {
            return false;
        }
    }
}


class EquilateralTriangle extends Triangle {
    constructor(a = 0){
        super(a,a,a);
    }

    print(){
        console.log("Равносторонний треугольник " + this.a);
    }
}


const shapes = [
    new Rectangle(500),
    new Square(200),
    new Triangle(3,4,5),
    new EquilateralTriangle(12),
];

console.log(shapes);

shapes.forEach(shape => shape.print());

console.log("Периметры: ",shapes.map(shape => shape.perimetr));
console.log("Площади ", shapes.map(shape => shape.area))

const t1 = new Triangle(100,200,300);
const t2 = new Triangle(10,200);
const t3 = new Triangle(100,2,300);
const t4 = new EquilateralTriangle(100);
const t5 = new Triangle(4,3,4);
const t6 = new Triangle(100,100,100);


console.log(Triangle.areEqual(t1,t2));
console.log(Triangle.areEqual(t1,t3));
console.log(Triangle.areEqual(t1,t4));
console.log(Triangle.areEqual(t1,t5));
console.log(Triangle.areEqual(t4,t6));

