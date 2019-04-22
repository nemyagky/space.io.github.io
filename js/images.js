var images = {};

(function createImages() {
	alert('Сайт доделан только на 50%')
	function createImage(src) {
	  // Относительный путь почему-то не понимает, записал так. Не хочу разбираться в проблема, так как нет времени
	  var diredtory = "https://magmiv.github.io/space.io.github.io/imgs/";

	  newImage = new Image();
	  newImage.src = diredtory + src;
	  return newImage
	
	}
	images.holes = {}
	images.holes.blue = createImage("blackhole-blue.png")
  images.holes.red = createImage("blackhole-red.png")
  images.holes.green = createImage("blackhole-purple.png")

  images.ships = {}
  images.ships.standart_blue = createImage("standart_blue.svg")
  images.ships.standart_red = createImage("standart_red.svg")

})()
