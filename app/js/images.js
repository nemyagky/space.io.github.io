const diredtory = "/app/imgs/";


let createImage = (src) => {
	let image = new Image();
	image.src = diredtory + src;
	return image;
}


export const images = {
	ships: {
		standart_blue: createImage("standart_blue.svg"),
		standart_red: createImage("standart_red.svg")
	}
};
