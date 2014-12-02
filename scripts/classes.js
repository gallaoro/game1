//--------------------------------------------------Element
//The prototype of something that goes on the screen
function Element(img) {
    this.x = 0;
    this.y = 0;
    this.img = img;
    this.width = 64;
    this.height = 32;
}
Element.prototype.draw = function (gcx) {
    gcx.grawImage(this.img, this.x, this.y);
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
    this.width = 16;
    this.height = 8;
}
Projectile.prototype.move = function (direction) {
    switch (direction) {
        case 0:
            this.x += this.speed;
            break;
        case 1:
            this.y += this.speed;
            break;
        case 2:
            this.x -= this.speed;
            break;
        case 3:
            this.y -= this.speed;
            break;
        default:
            this.x += this.speed;
    }
};

Projectile.prototype = new Element;
