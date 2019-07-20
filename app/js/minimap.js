import {ctx, canvas} from './init'
import {map} from './map'
import {mainShip} from './ships-proto'


const miniMapSettings = {
	maxW: 400,
	minW: 250,
	heightCoef: 1.8
};

class MiniMap {
	
	constructor( {maxW, minW, heightCoef} ) {
		this.maxW = maxW;
		this.minW = minW;
		this.heightCoef = heightCoef;
		this.color = "#FFFFFF";

		this.setSize( window.innerWidth );


		window.addEventListener('resize', () => {
			this.setSize( window.innerWidth );
		})
	};

	draw = () => {
		this.drawBorder();
		this.drawObject( mainShip.x, mainShip.y, 4, 4, "#FFFFFF");
	};

	setSize = (width) => {

		width = width/3.85;

		if (width > this.maxW)
			this.width = this.maxW;
		else if (width < this.minW) 
			this.width = this.minW;
		else 
			this.width = width;

		this.height = this.width/this.heightCoef;
			
	};

	drawBorder = () => {
		ctx.beginPath();
		ctx.strokeStyle = "#fff";
		ctx.rect(1, (canvas.height - this.height - 2), this.width + 5, this.height);
		ctx.stroke();
		ctx.closePath();
	};

	// Переводит настоящие координаты в координаты на миникарте
	drawObject = ( objX, objY, objW, objH, obgColor ) => {
		this.setColor( obgColor );

		ctx.fillRect(
			// Позиция по x - (получаем % координаты на всей карте) *  miniMap.w, чтобы перевести в размеры миникарты
			( (objX / map.w) * this.width ),
			// Позиция по Y - (canvas.height - miniMap.h - 2) - верхняя точка minimap + (получаем % координаты на всей карте) *  miniMap.h
			((canvas.height - this.height) + (objY / map.h) * this.height) - 3.5,
			objW, objH	
		)
	};

	setColor = (newColor) => {

		if (this.color != newColor) {
			ctx.fillColor = newColor;
			this.color = newColor;
		}

	};

};

export const miniMap = new MiniMap(miniMapSettings);



/* 	init = () => {
		this.visualSetting();	
		this.drawMainStarship();
	} */

/* 	drawOnMinimap = ( obj ) => {

		ctx.fillStyle = color

		// Позиция по x - (получаем % координаты на всей карте) *  miniMap.w, чтобы перевести в размеры миникарты
		// Позиция по Y - (canvas.height - miniMap.h - 2) - верхняя точка minimap + (получаем % координаты на всей карте) *  miniMap.h
		ctx.fillRect(
			((obj.x / map.w) * this.width),
			((canvas.height - this.height) + (this.y / map.h) * miniMap.h) - 3.5,
			obj.w, obj.h
		)
	} */




/* 	drawMainStarship = () => {
		this.ctx.fillStyle = "#fff"
		this.drawMiniMap();
	} */

// export function drawMiniMap() {
// 	// Используется для перевода реальных координат в координаты на миникарте
// 	function drawOnMiniMap(x, y, w, h, color) {
// 		ctx.fillStyle = color
// 		// Позиция по x - (получаем % координаты на всей карте) *  miniMap.w, чтобы перевести в размеры миникарты
// 		// Позиция по Y - (canvas.height - miniMap.h - 2) - верхняя точка minimap + (получаем % координаты на всей карте) *  miniMap.h
// 		ctx.fillRect(
// 			((x / map.w) * miniMap.w),
// 			((canvas.height - miniMap.h) + (y / map.h) * miniMap.h) - 3.5,
// 			w, h
// 		)
// 	};
// 	// Рисуем рамку у карты
// 	ctx.beginPath()
// 	ctx.strokeStyle = "#fff"
// 	// Отступ слева - 1, чтобы была видна рамка
// 	// Высота экрана - высота миникарты - 1 (чтобы была видна рамка)
// 	// Ширина, высота
// 	ctx.rect(1, (canvas.height - miniMap.h - 2), miniMap.w + 5, miniMap.h)
// 	ctx.stroke()
// 	ctx.closePath();
// 	// Рисуем главный корабль
// 	ctx.fillStyle = "#fff"
// 	drawOnMiniMap(mainShip.x, mainShip.y, 4, 4)

// }
