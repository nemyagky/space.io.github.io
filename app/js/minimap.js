import {ctx, canvas} from './init';
import {setColor} from './functions';
import {Map} from './Map';
import {MainShip} from './ships/MainShip';


const miniMapSettings = {
	maxW: 400,
	minW: 250,
	heightCoef: 1.8
};

export const MiniMap = new class MiniMap {
	
	constructor() {
		this.maxW = miniMapSettings.maxW;
		this.minW = miniMapSettings.minW;
		this.heightCoef = miniMapSettings.heightCoef;
		this.color = "#FFFFFF";

		this.setSize( window.innerWidth );

		window.addEventListener('resize', () => {
			this.setSize( window.innerWidth );
		})
	};

	draw() {
		this.drawBorder();
		this.drawObject( MainShip.x, MainShip.y, 4, 4, "#FFFFFF");
	};

	// During resizing the screen
	setSize(width) {

		width = width/3.85;

		if (width > this.maxW)
			this.width = this.maxW;
		else if (width < this.minW) 
			this.width = this.minW;
		else 
			this.width = width;

		this.height = this.width/this.heightCoef;
			
	};

	// Draw minimap border
	drawBorder() {
		ctx.beginPath();
		ctx.strokeStyle = "#fff";
		ctx.rect(1, (canvas.height - this.height - 2), this.width + 5, this.height);
		ctx.stroke();
		ctx.closePath();
	};

	// Translate real coordinates to coordinates on the minimap
	drawObject( objX, objY, objW, objH, obgColor ) {
		setColor( obgColor );

		ctx.fillRect(
			// X position - (getting % coordinates on the real map) *  miniMap.w, to translate in minimap cords
			( (objX / Map.w) * this.width ),
			// Y position - (top minimap border) + ((getting % coordinates on the real map) *  miniMap.h)
			// 3.5 because drawing object has height
			((canvas.height - this.height) + (objY / Map.h) * this.height) - 3.5,
			objW, objH	
		);
	};

};
