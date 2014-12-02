/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var heroReady, heroImage;
var Enemy0Ready, Enemy0Image;
var Projectile0Ready, Projectile0Image;
var canvas, ctx;
var heroesl = [], enemyesl = [], projectiles0l = [];
var points;
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

    //Move enemys
    for (var i = 0; i < enemyesl.length; i++) {
        enemyesl[i].x -= 5;
    }

    //Controls if something is touching

    //control if any projectile are touching a enemy
    lunglistaproiettili=projectiles0l.length;
    lunglistanemici=enemyesl.length;
    for (var i = 0; i < lunglistaproiettili; i++) {
        for (var j = 0; j < lunglistanemici; j++) {
            if (projectiles0l.length > 0 && enemyesl.length > 0) {
                if (
                        projectiles0l[i].x <= (enemyesl[j].x + projectiles0l[i].width)
                        && enemyesl[j].x <= (projectiles0l[i].x + projectiles0l[i].width)
                        && projectiles0l[i].y <= (enemyesl[j].y + enemyesl[j].height)
                        && enemyesl[j].y <= (projectiles0l[i].y + enemyesl[j].height)
                        ) {
                    createenemy(Enemy0Image);
                    enemyesl.splice(j, 1);
                    createenemy(Enemy0Image);
                    projectiles0l.splice(i, 1);
                }
            }
        }
    }
    //Control if some enemy is touching the hero
    lunglistanemici=enemyesl.length;
    lunglistahero=heroesl.length;
    for (var i = 0; i < lunglistahero; i++) {
        for (var j = 0; j < lunglistanemici; j++) {
            if (heroesl.length > 0 && enemyesl.length > 0) {
                if (
                        heroesl[i].x <= (enemyesl[j].x + heroesl[i].width)
                        && enemyesl[j].x <= (heroesl[i].x + heroesl[i].width)
                        && heroesl[i].y <= (enemyesl[j].y + enemyesl[j].height)
                        && enemyesl[j].y <= (heroesl[i].y + enemyesl[j].height)
                        ) {
                    heroesl.splice(i, 1);
                    enemyesl.splice(j, 1);
                    createenemy(Enemy0Image);
                }
            }
        }
    }
};

var render = function () {

    //Draw blacak canvas
    var fill = ctx.fillStyle;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fill;

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

    //Draw enemyes
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