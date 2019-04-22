function fps() {
	ctx.fillStyle = "#fff";
  ctx.font = "20pt Arial";
  ctx.fillText("Итераций: " + iterations, 10, 130)
  ctx.fillText("Выстрелов: " + shoots.length, 10, 30);
  ctx.fillText("FPS: " + countFPS(), 10, 80);
}
countFPS = function () {
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
}()





var nextGameStep = (function () {
	return requestAnimationFrame || 
	mozRequestAnimationFrame 		 || 
	webkitRequestAnimationFrame  ||
	oRequestAnimationFrame 			 || 
	msRequestAnimationFrame			 ||
	function(callback) {
		setTimeout(callback, 1000/60)
	}
})();








function rand(min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}

function toRad(a) {
	return a * Math.PI/180
}



// Поворачивает объект. Принимает в себя центр объекта и угол поворота
function rotate(dx, dy, a) {
	ctx.save()
	ctx.translate(dx, dy)
	ctx.rotate( (Math.PI / 180) *  a)
	ctx.translate(-dx, -dy)
}



function isIntersect(centerX, centerY, blockXTop, blockYLeft, dist ) {
  // Если (условно) курсор > верх блока, но меньше, чем его низ - условие верно. Низ это верх блока + dist 
  return centerX > blockXTop &&
         centerX < blockXTop + dist &&
         centerY > blockYLeft &&
         centerY < blockYLeft + dist
}

function drawRect(x, y, w, h, color) {
  ctx.beginPath()
  ctx.strokeStyle = color
  // Отступ слева - 1, чтобы была видна рамка
  // Высота экрана - высота миникарты - 1 (чтобы была видна рамка)
  // Ширина, высота
  ctx.rect(x, y, w, h)
  ctx.stroke()
  ctx.closePath()
}



// Объект keyboard содержит активные кнопки клавиатуры
var keyboardPressed = {}

function setKeyboardSettings() {
  window.onkeydown = function(e) {
    if (e.keyCode == 87) keyboardPressed.w = true
    if (e.keyCode == 65) keyboardPressed.a = true
    if (e.keyCode == 68) keyboardPressed.s = true
    if (e.keyCode == 83) keyboardPressed.d = true
  }
  window.onkeyup = function(e) {
    if (e.keyCode == 87) keyboardPressed.w = false
    if (e.keyCode == 65) keyboardPressed.a = false
    if (e.keyCode == 68) keyboardPressed.s = false
    if (e.keyCode == 83) keyboardPressed.d = false
  }
}






// Положение курсора, нажат ли он
var cursor = {
  x: 0, y: 0,
  isPressed: false,
  isClicked: false,
  e: ''
}

function setCursorSettings() {

  window.onmousemove = function(e) {
    cursor.x = e.clientX
    cursor.y = e.clientY
    cursor.e = e.target
  }
  window.onmousedown = function() {
    cursor.isPressed = true
  }
  window.onmouseup = function() {
    cursor.isPressed = false
    fpsAfterShoot = mainShip.fireSpeed
  }
  window.onclick = function() {
    cursor.isClicked = true
  }
  window.oncontextmenu = function() {
    return false
  }

}