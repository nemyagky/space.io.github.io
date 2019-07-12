// При загрузке создаем изображения
window.addEventListener("load", gameLoop())


function gameLoop() {

	ctx.clearRect(0 , 0, canvas.width, canvas.height)

	// Получаем активные клавиши и информацию о курсоре
	setKeyboardSettings()
	setCursorSettings()

	// По большей частности используется для оптимизации. ТК вовсе незачем все действия выполнять 60 раз в секунду - вводит различные счетчики и прочие приемы оптимизации
	framesPassedFunctions()

	//Рисуем звезды на фоне
	drawSpace()

	// Рисует остальной canvas относительно игрока
	ctx.save();
	ctx.translate(-mainShip.x + canvas.width/2, -mainShip.y + canvas.height/2);

  	drawBorder()
	drawBlackholes()
	drawShoots()
	drawShips()
	

	ctx.restore();

	
	// Рисует все статические элементы поверх всего остального
	drawMiniMap()
	fps()
	iterations = 0

	// Следующий кадр
	nextGameStep(gameLoop)
}
