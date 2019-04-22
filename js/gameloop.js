// При загрузке создаем изображения
window.addEventListener("load", gameLoop())


function gameLoop() {

	ctx.clearRect(0 , 0, canvas.width, canvas.height)

	// Получаем активные клавиши и информацию о курсоре
	setKeyboardSettings()
	setCursorSettings()



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

	// Переменная, отвечающая за клик по определенному месту в канвасе. Должна обнуляться именно здесь (не факт)
	cursor.isClicked = false
}
