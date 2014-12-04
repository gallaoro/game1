/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var heroReady, heroImage;
var Enemy0Ready, Enemy0Image;
var Projectile0Ready, Projectile0Image;
var Star0Ready, Star0Image;
var canvas, ctx;
var heroesl = [], enemyesl = [], projectiles0l = [], starsl = [];
var points = 0;
var keysDown = {};
var start;
var then;
var unabletoshoot = false;

window.onload = function () {
// Handle keyboard controls
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
        start = true;
    }, false);

    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    then = Date.now();

    initialSet();
    main();
};

//Initial set
var initialSet = function () {
    // Hero image
    heroReady = false;
    heroImage = new Image();
    heroImage.onload = function () {
        heroReady = true;
    };
    heroImage.src = "images/hero.png";

    // Enemy0 image
    Enemy0Ready = false;
    Enemy0Image = new Image();
    Enemy0Image.onload = function () {
        Enemy0Ready = true;
    };
    Enemy0Image.src = "images/enemy0.png";

    //Projectile image
    Projectile0Ready = false;
    Projectile0Image = new Image();
    Projectile0Image.onload = function () {
        Projectile0Ready = true;
    };
    Projectile0Image.src = "images/projectile0.png";

    //Star image
    Star0Ready = false;
    Star0Image = new Image();
    Star0Image.onload = function () {
        Star0Ready = true;
    };
    Star0Image.src = "images/star.png";

    //Canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = 500;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //Create the Hero and set to the start point
    var hero = new Entity(heroImage);
    hero.x = canvas.width / 10;
    hero.y = canvas.height / 2;
    hero.speed = 256;
    heroesl.push(hero);

    //Create an enemy
    createenemy(Enemy0Image);
};

var createenemy = function (img) {
    var enemy = new Entity(img);
    enemy.x = canvas.width;
    enemy.y = Math.floor((Math.random() * canvas.height - 64) + 64);
    ;
    enemy.speed = 5;
    enemyesl.push(enemy);
};

var createstars = function (img) {
    for (var i = 0; i < 2; i++) {
        var star = new Entity(img);
        star.x = canvas.width + Math.floor((Math.random() * 10));
        star.y = Math.floor((Math.random() * canvas.height - 64) + 64);
        star.speed = 5;
        starsl.push(star);
    }
};

//Not used
var initialVideo = function () {
    var myVar = setInterval(function () {
        var initialready = false;
        var initialimg = new Image();
        initialimg.onload = function () {
            initialready = true;
        };
        initialimg.src = "images/initial.png";

        if (initialready) {
            ctx.fillStyle = "#FFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(initialimg, canvas.width / 2 - 75, canvas.height / 2 - 100);
        }
    }, 3000);

};

var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        heroesl[0].y -= heroesl[0].speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        heroesl[0].y += heroesl[0].speed * modifier;
    }
    if (32 in keysDown) {
        if (!unabletoshoot) {
            var projectil = new Projectile(Projectile0Image);
            projectil.x = heroesl[0].x + heroesl[0].width;
            projectil.y = heroesl[0].y + heroesl[0].height / 2 - projectil.height / 2;
            projectiles0l.push(projectil);
            unabletoshoot = true;
            setTimeout(function () {
                unabletoshoot = false;
            }, 100);
        }

    }

    //Create stars
    createstars(Star0Image);

    //Delete projectile outside the canvas
    for (var i = 0; i < projectiles0l.length; i++) {
        if (projectiles0l[i].x >= canvas.width + projectiles0l[i].width) {
            projectiles0l.splice(i, 1);
        }
    }

    //Move projectiles
    for (var i = 0; i < projectiles0l.length; i++) {
        if (projectiles0l[i] !== null) {
            projectiles0l[i].x += 5;
        }
    }
    //Delete enemys outside the canvas
    for (var i = 0; i < enemyesl.length; i++) {
        if (enemyesl[i].x <= 0 - enemyesl[i].width) {
            enemyesl.splice(i, 1);
            createenemy(Enemy0Image);
        }
    }
    //Delete stars outside thecanvas
    for (var i = 0; i < starsl.length; i++) {
        if (starsl[i].x <= 0 - 8) {
            starsl.splice(i, 1);
        }
    }

    //Move enemys
    for (var i = 0; i < enemyesl.length; i++) {
        enemyesl[i].x -= 5;
    }
    //Move stars
    for (var i = 0; i < starsl.length; i++) {
        starsl[i].x -= 8;
    }
    collisioncontrol();
};

var render = function () {

    //Draw blacak canvas
    var fill = ctx.fillStyle;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fill;

    //Draw stars
    if (Star0Ready) {
        for (var i = 0; i < starsl.length; i++) {
            ctx.drawImage(starsl[i].img, starsl[i].x, starsl[i].y);
        }

    }
    //Draw heroes
    if (heroReady) {
        for (var i = 0; i < heroesl.length; i++) {
            ctx.drawImage(heroesl[i].img, heroesl[i].x, heroesl[i].y);
        }
    }

    //Draw enemyes
    if (Enemy0Ready) {
        for (var i = 0; i < enemyesl.length; i++) {
            ctx.drawImage(enemyesl[i].img, enemyesl[i].x, enemyesl[i].y);
        }

    }

    //Draw projectiles
    if (Projectile0Ready) {
        for (var i = 0; i < projectiles0l.length; i++) {
            ctx.drawImage(projectiles0l[i].img, projectiles0l[i].x, projectiles0l[i].y);
        }

    }
};

// The main game loop
var main = function () {
    // Cross-browser support for requestAnimationFrame
    var w = window;
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

var collisioncontrol = function () {
    var enemytodelete = [];
    var projectiletodelete = [];
    for (var i = 0; i < enemyesl.length; ++i) {
        for (var j = 0; j < projectiles0l.length; ++j) {
            if (
                    projectiles0l[j].x <= (enemyesl[i].x + projectiles0l[j].width)
                    && enemyesl[i].x <= (projectiles0l[j].x + projectiles0l[j].width)
                    && projectiles0l[j].y <= (enemyesl[i].y + enemyesl[i].height)
                    && enemyesl[i].y <= (projectiles0l[j].y + enemyesl[i].height)
                    ) {
                enemytodelete.push(i);
                projectiletodelete.push(j);
                points++;
            }
        }
    }
    enemytodelete = removedoublefromarray(enemytodelete);
    projectiletodelete = removedoublefromarray(projectiletodelete);

    for (var k = 0; k < enemytodelete.length; k++) {
        enemyesl.splice(enemytodelete[k], 1);
    }
    for (var l = 0; l < projectiletodelete.length; l++) {
        projectiles0l.splice(projectiletodelete[l], 1);
    }

    if (enemyesl.length < 2) {
        createenemy(Enemy0Image);
        createenemy(Enemy0Image);
    }

    document.getElementById("points").innerHTML = "Pints: " + points;
};

var removedoublefromarray = function (list) {
    list.sort();
    var last = list[0];
    var nuova = [];
    if (list.length < 2) {
        return list;
    }
    for (var i = 1; i < list.length; ++i) {
        if (last !== list[i]) {
            nuova.push(last);
            last = list[i];
        }
    }
    if (nuova.lenght === 0) {
        nuova.push(last);
    }
    return nuova;
};