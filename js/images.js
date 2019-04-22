var images = {};

(function createImages() {

	function createImage(src) {
		var diredtory = "https://magmiv.github.io/space.io.github.io/imgs/";

		newImage = new Image();
	  newImage.src = diredtory + src;
		console.log(newImage)
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
