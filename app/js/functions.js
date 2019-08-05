import {MainShip} from './ships/MainShip'
import {ctx, iterations} from './init';
import {shoots} from './shoots';


// ФПС в левом верхнем углу
export function fps() {
  ctx.fillStyle = "#fff";
  ctx.font = "20pt Arial";
  ctx.fillText("Итераций: " + iterations, 10, 130);
  ctx.fillText("Выстрелов: " + shoots.length, 10, 30);
  ctx.fillText("FPS: " + countFPS(), 10, 80);
};

let countFPS = function () {
  var lastLoop = (new Date()).getMilliseconds();
  var count = 1;
  var fps = 0;

  return function () {
    var currentLoop = (new Date()).getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    return fps;
  };
}();



// Следующий кадр
export let nextGameStep = (function () {
  return requestAnimationFrame ||
    mozRequestAnimationFrame ||
    webkitRequestAnimationFrame ||
    oRequestAnimationFrame ||
    msRequestAnimationFrame ||
    function (callback) {
      setTimeout(callback, 1000 / 60);
    }
})();



// Рандомайзер
export function rand(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};



// Перевод градусов в радианы
export function toRad(a) {
  return a * Math.PI / 180;
};



// Поворачивает объект во время отрисвоки на canvas. Принимает в себя центр объекта и угол поворота
export function rotate(dx, dy, a) {
  ctx.save();
  ctx.translate(dx, dy);
  ctx.rotate((Math.PI / 180) * a);
  ctx.translate(-dx, -dy);
};



// Пересекаются ли два объекта
function isIntersect(centerX, centerY, blockXTop, blockYLeft, dist) {
  // Если (условно) курсор > верх блока, но меньше, чем его низ - условие верно. Низ это верх блока + dist 
  return centerX > blockXTop &&
    centerX < blockXTop + dist &&
    centerY > blockYLeft &&
    centerY < blockYLeft + dist
};



// Принимает два массива вида [x, y]
export function getDistBetween2dots(dot1, dot2) {
  let a = dot1[0] - dot2[0];
  let b = dot1[1] - dot2[1];

  return Math.sqrt(a * a + b * b);
};



// Объект keyboard содержит активные кнопки клавиатуры
export let keyboardPressed = {};
export function setKeyboardSettings() {
  window.onkeydown = function (e) {
    if (e.keyCode == 87) keyboardPressed.w = true;
    if (e.keyCode == 65) keyboardPressed.a = true;
    if (e.keyCode == 68) keyboardPressed.s = true;
    if (e.keyCode == 83) keyboardPressed.d = true;
  };
  window.onkeyup = function (e) {
    if (e.keyCode == 87) keyboardPressed.w = false;
    if (e.keyCode == 65) keyboardPressed.a = false;
    if (e.keyCode == 68) keyboardPressed.s = false;
    if (e.keyCode == 83) keyboardPressed.d = false;
  };
};



// Положение курсора, нажат ли он
export let cursor = {
  x: 0,
  y: 0,
  isPressed: false,
  isClicked: false,
  e: ''
};



// Можно ли делать выстрелы главному игроку
export let fpsAfterShoot = 0;
export function setCursorSettings() {

  window.onmousemove = function (e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
    cursor.e = e.target;
  };
  window.onmousedown = function () {
    cursor.isPressed = true;
  };
  window.onmouseup = function () {
    cursor.isPressed = false;

    fpsAfterShoot = MainShip.fireSpeed;
  };
  window.onclick = function () {
    cursor.isClicked = true;
  };
  window.oncontextmenu = function () {
    return false;
  };

};


let lastTimeSpent = Date.now()

// Используется в gameloop.js
export function setTimeSpent() {
  lastTimeSpent = Date.now()
}

export function setSpeed(speed) {
  let deltaTime = (Date.now() - lastTimeSpent)/1000;
  return speed * deltaTime;
}
