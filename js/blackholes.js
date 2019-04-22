var blackholeScale = 1

var blackHoleW = 655 * blackholeScale
var blackholeCenterW = blackHoleW * 0.31 // Ширина черной части дыры составляет 22% от всего изображения

var distBetweenBlackholeX_AndItsCenterX = 235 * blackholeScale// Расстояние от края черной дыры до края ее центра
var distBetweenBlackholeY_AndItsCenterY = 235 * blackholeScale



var blackholes = [];
(function createBlackholes() {

	function Blackhole(image, x, y, team, hp, color) {
		return {
			image: image,
			x: x, y: y,
			get centerX() {
				return this.x + distBetweenBlackholeX_AndItsCenterX
			},
			get centerY() {
				return this.y + distBetweenBlackholeY_AndItsCenterY
			},
			team: team,
			hp: hp,
			rotate: 0,
			color: color
		}
	}

	blackholes.push( new Blackhole( images.holes.blue, 1000, map.h/2, "blue", 1000, "#1A57C0" ))
	blackholes.push( new Blackhole( images.holes.red, map.w - blackHoleW - 1000, map.h/2, "red", 1000, "#C01A1A" ))
	blackholes.push( new Blackhole( images.holes.green, map.w/2 - blackHoleW/2, map.h/2, "green", 1000, "#00FFA9" ))

})();



var blackholesSpeedRotate = 0.07

function drawBlackholes() {

	for (var i = 0; i < blackholes.length; i++) {

		rotate(blackholes[i].centerX + blackholeCenterW/2, blackholes[i].centerY + blackholeCenterW/2, blackholes[i].rotate)
		ctx.drawImage(blackholes[i].image, blackholes[i].x, blackholes[i].y, blackHoleW, blackHoleW);
		ctx.restore()

		blackholes[i].rotate += blackholesSpeedRotate

	}

}
