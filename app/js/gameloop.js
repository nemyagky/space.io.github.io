import './../sass/main.sass';
import {ctx, canvas} from './init';
import {Map} from './Map';
import {fps, nextGameStep, setTimeSpent } from './functions';
import {MainShip} from './ships/MainShip';
import {Ships} from './ships/Ships';
import {Shoots} from './Shoots';
import {MiniMap} from './Minimap';
import {Stars} from './Stars';


// Creating images just per page loading
window.addEventListener("load", gameLoop())



// Main project function. 60 times per second drawing and changing everything
// Objects are drawing depending on calling in this function. If we need to draw some object on the top layer - we need to call it earlier
function gameLoop() {
	
	ctx.clearRect(0 , 0, canvas.width, canvas.height);

	// Updates the ships near the player (not all ships are drawn, but only near to the player)
	Ships.setShipsNearPlayer();

	// Drawing stars on the background
	Stars.draw();


	// Drawing canvas relative to the player
	ctx.save();

		ctx.translate(-MainShip.x + canvas.width/2, -MainShip.y + canvas.height/2);

		Map.drawBorder();
		Shoots.draw();
		Ships.draw();

	ctx.restore();



	// Drawing canvas relative to the creen
	MiniMap.draw();
	fps();


	// Converts the speed of objects to speed per second. For optimization
	setTimeSpent();


	// Next frame
	nextGameStep(gameLoop);
	
};
