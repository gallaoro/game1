/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var heroReady, heroImage;
var Enemy0Ready, Enemy0Image;
var canvas, ctx;
var heroesl, enemyesl, projectilesl;
var points;
var keysDown = {};
var start;

window.onload = function () {

};

// Handle keyboard controls
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
    start=true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

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
    monsterImage.src = "images/monster.png";

    //Canvas
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //Create the Hero and set to the start point
    var hero = new Entity(heroImage);
    hero.x = canvas.width / 10;
    hero.y = canvas.height / 2;
    heroesl.push(hero);
};

var reset = function () {
    //Reset all heroes
    for (var i in heroesl) {
        i.x = canvas.width / 10;
        i.y = canvas.height / 2;
    }

    //Delete all enemyes
    for (var i in enemyesl) {
        enemyesl.pop();
    }

    //Delete all projectiles
    for (var i in projectilesl) {
        projectilesl.pop();
    }

    //Reset points
    points = 0;
};

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