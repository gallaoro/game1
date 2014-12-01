//--------------------------------------------------Element
function Element(img) {
    this.x = 0;
    this.y = 0;
    this.img = img;
    this.width = 50;
    this.height = 50;
}
Element.prototype.draw = function(gcx) {
    gcx.grawImage(this.img, this.x, this.y);
};

Element.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
};

//--------------------------------------------------Entity
function Entity(img) {
}

Element.prototype.shoot = function(listofprojectiles) {
    listofprojectiles.push(new Projectile());
};

Element.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
};

//--------------------------------------------------Projectile
function Projectile() {
    this.speed = 100;
    this.direction = 0;
}
Projectile.prototype.move = function(direction) {
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
