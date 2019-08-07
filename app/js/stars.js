import {ctx, canvas} from './init';
import {rand} from './functions';


export let Stars = new class Stars {

   constructor () {
      this.createStars();

      // We need to change stars array for new window width
      window.addEventListener('resize', () => {
         this.createStars();
      })
   };


   // Creating stars depending on window width
   createStars() {
      this.updateStarsCount();

      this.stars = [];

      for (let i = 0; i < this.starsCount; i++) {
         this.stars.push({
            // Random diameter
            d: rand(1, 9),
            // We neen to divide speed to 100, because stars should be moving really slow 
            speedX: rand(-3, 3) / 100,
            speedY: rand(-3, 3) / 100,
            x: rand(1, canvas.width),
            y: rand(1, canvas.height)
         })
      }
   };


   updateStarsCount() {
      if ( canvas.width > 1000 ) 
         this.starsCount = canvas.width / 2;
      else 
         this.starsCount = canvas.width;
   };


   // Drawing and moving the stars
   draw() {

      // For readability
      let stars = this.stars;

      ctx.fillStyle = "#ffffff";

      for (let i = 0; i < this.starsCount; i++) {
         // Changing stars position
         stars[i].x += stars[i].speedX;
         stars[i].y += stars[i].speedY;
   
         // If the star leaved out of the canvas, move it to the opposite edge of the window
         // 5 - a small value to disappear star not at the edge of the canvas, but 5 pixels beyond it
         if (stars[i].x < 0 - 5) stars[i].x = canvas.width + 5;
         if (stars[i].x > canvas.width + 5) stars[i].x = 0 - 5;
         if (stars[i].y < 0 - 5) stars[i].y = canvas.height + 5;
         if (stars[i].y > canvas.height + 5) stars[i].y = 0 - 5;
   
         // Drawing stars by small squares
         ctx.fillRect(stars[i].x, stars[i].y, stars[i].d / 7, stars[i].d / 7); 
      };

   };

};
