export const canvas = document.querySelector(".canvas");
export const ctx = canvas.getContext('2d');

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;


window.onresize = function () {
	// canvas на всю ширину
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}



export let iterations = 0;
