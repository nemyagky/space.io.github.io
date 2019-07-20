import {ctx, canvas, iterations} from './init'
import {rand} from './functions'


class Stars {

   constructor () {
      this.createStars()

      window.addEventListener('resize', () => {
         this.createStars();
      })
   };


   updateStarsCount = () => {
      if ( canvas.width > 1000 ) 
         this.starsCount = canvas.width / 2;
      else 
         this.starsCount = canvas.width;
   };


   createStars = () => {

      this.updateStarsCount();

      this.stars = [];

      for (let i = 0; i < this.starsCount; i++) {
         this.stars.push({
            // Диаметр
            d: rand(1, 9),
            // Скорость (делим на 100, так как они должны двигаться медленно)
            speedX: rand(-3, 3) / 100,
            speedY: rand(-3, 3) / 100,
            x: rand(1, canvas.width),
            y: rand(1, canvas.height)
         })
      }
   };


   draw = () => {

      ctx.fillStyle = "#ffffff";

      let stars = this.stars;

      for (let i = 0; i < this.starsCount; i++) {
         stars[i].x += stars[i].speedX;
         stars[i].y += stars[i].speedY;
   
         // Если звезда вылезла за пределы canvas`a - перенести в другой край
         // 5 - небольшая погрешность, чтобы звезды исчезали не на краю канваса, а на 5 пикселей за его пределами 
         if (stars[i].x < 0 - 5) stars[i].x = canvas.width + 5;
         if (stars[i].x > canvas.width + 5) stars[i].x = 0 - 5;
         if (stars[i].y < 0 - 5) stars[i].y = canvas.height + 5;
         if (stars[i].y > canvas.height + 5) stars[i].y = 0 - 5;
   
         // Отрисовывем звезды маленькими квадратиками
         ctx.fillRect(stars[i].x, stars[i].y, stars[i].d / 7, stars[i].d / 7);
   
      };

   };

};

export let stars = new Stars();
