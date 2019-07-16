let images = {};

(function createImages() {
	function createImage(src) {
		// Относительный путь почему-то не понимает, записал так. Не хочу разбираться в проблема, так как нет времени
		let diredtory = "/app/imgs/";

		let newImage = new Image();
		newImage.src = diredtory + src;
		return newImage

	}

	images.ships = {}
	images.ships.standart_blue = createImage("standart_blue.svg")
	images.ships.standart_red = createImage("standart_red.svg")

})()


export {images}
