//--------------------------------------------------Element
//The prototype of something that goes on the screen
function Element(img) {
    this.x = 0;
    this.y = 0;
    this.img = img;
    this.width = 50;
    this.height = 50;
}
Element.prototype.draw = function (gcx) {
    gcx.grawImage(this.img, this.x, this.y);
};

Element.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
};

//--------------------------------------------------Entity
//An entry is an Element that can shoot
function Entity(img) {
    Element.call(this, img);
    this.speed = 100;
}

Element.prototype.shoot = function (list, projectile) {
    list.push(projectile);
};

Entity.prototype = new Element;

//--------------------------------------------------Projectile
//A Projectile is an Element that moves in a direction
function Projectile(img) {
    Element.call(this, img);
    this.speed = 100;
    this.direction = 0;
}
Projectile.prototype.move = function (direction) {
    switch (direction) {
        case 0:
            this.x += speed;
            break;
        case 1:
            this.y += speed;
            break;
        case 2:
            this.x -= speed;
            break;
        case 3:
            this.y -= speed;
            break;
        case "right":
            this.x += speed;
            break;
        case "down":
            this.y += speed;
            break;
        case "left":
            this.x -= speed;
            break;
        case "up":
            this.y -= speed;
            break;
        default:
            this.x += this.direction;
    }
};

Projectile.prototype = new Element;
