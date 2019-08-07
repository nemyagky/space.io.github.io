import {Ship, defaultShip} from './Ship';
import {setSpeed, keyboardPressed, cursor} from '../functions';
import {shoots} from '../Shoots';
import {canvas} from '../init';


export let MainShip = new class MainShip extends Ship {

	constructor() {
		super(defaultShip, 'blue');
	};


	// This function must contain all actions for ship. Calling in Ships.draw()
	behavior() {
		let that = this;

		that.moving();

		// Accelerate a ship if a key is pressed
		(function changeSpeed() {
			if (keyboardPressed.w) that.speedY -= setSpeed(that.speedUp);
			if (keyboardPressed.a) that.speedX -= setSpeed(that.speedUp);
			if (keyboardPressed.s) that.speedX += setSpeed(that.speedUp);
			if (keyboardPressed.d) that.speedY += setSpeed(that.speedUp);
		})();
	
		// Turns the ship in the direction of the cursor
		(function rotate() {
			// Find the angle between the center of the ship and the coordinate of the mouse
			// canvas.height / 2 - mainShip cords relative to window
			that.rotate = 180 / Math.PI * Math.atan2(cursor.y - (canvas.height / 2),
				cursor.x - (canvas.width / 2)
			);
		})();

		
		(function makeShoot() {
			// fpsAfterShoot - shot frequency regulator. Each frame is incrementing and when it is enough, it allows you to make a new shot
			that.fpsAfterShoot++;

			if (cursor.isPressed) {
				// If enough time has passed since the last shot
				if (that.fpsAfterShoot > that.fireSpeed) {

					shoots.push({
						w: 7,
						h: 20,
						x: that.x + 43,
						y: that.y,
						team: "blue",
						rotate: that.rotate - 90,
						speed: 20,
						color: "#00FFA9",
						timeAlive: 0
					});
					that.fpsAfterShoot = 0;

				};
			};
		})();
	};

}
