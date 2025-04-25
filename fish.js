const dompet = document.querySelector('.dompet')
const total = document.querySelector('.total')
const canvas = document.getElementById('fishCanvas');
const ctx = canvas.getContext('2d');
const bibit = document.getElementById('pembibitan')
const besaran = document.getElementById('pembesaran')
var h = document.getElementById("myAudio");

// Resize canvas to fit window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();


let saldo = parseInt(localStorage.getItem('saldo') || 15000);
dompet.innerHTML = ' Rp ' + saldo
if (saldo < 1000) {
  duitRegen = setInterval(() => {
    curSaldo = saldo += 1000
    dompet.innerHTML = ' Rp ' + curSaldo
    localStorage.setItem('saldo', curSaldo);
  }, 3000)
  clearInterval(duitRegen)
}



// Load fish image
const fishImage = new Image();
fishImage.src = 'lele.png'; // Replace with your fish image URL or path (e.g., 'fish.png')
const leafImage = new Image();
leafImage.src = 'talas.png'
const peletImage = new Image();
peletImage.src = 'pelet.png'
const baitImage = new Image();
baitImage.src = 'bait.png'
// Food class
class Food {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.createdAt = Date.now();
    this.duration = 7000; // Food lasts 5 seconds
    const rect = canvas.getBoundingClientRect();
    // Scale mouse coordinates to canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    this.size = (((180 * scaleX) + (180 * scaleY)) / 2.5) + Math.random() * 3;
    //this.size = 150 + Math.random() * 3;

  }

  isExpired() {
    return Date.now() - this.createdAt > this.duration;
  }

  draw() {
    // ctx.beginPath();
    //  ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
    //ctx.fillStyle = 'red';
    // ctx.fill();

    ctx.save();
    ctx.translate(this.x - 5, this.y - 15);
    ctx.rotate(this.direction + Math.sin(this.wigglePhase) * 0.15);
    //ctx.rotate(Math.PI / 2); // Fix upside-down image
    ctx.drawImage(leafImage,
      -this.size / 10,
      -this.size / 10,
      this.size / 4,
      this.size / 2);
    ctx.restore();
  }
}

class FoodGrow {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.createdAt = Date.now();
    this.duration = 7000; // Food lasts 5 seconds
    const rect = canvas.getBoundingClientRect();
    // Scale mouse coordinates to canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    this.size = (((180 * scaleX) + (180 * scaleY)) / 5) + Math.random() * 3;
    //this.size = 125 + Math.random() * 3
  }

  isExpired() {
    return Date.now() - this.createdAt > this.duration;
  }

  draw() {

    ctx.save();
    ctx.translate(this.x + 5, this.y + 15);
    ctx.rotate(this.direction + Math.sin(this.wigglePhase) * 0.15);
    ctx.rotate(Math.PI); // Fix upside-down image
    ctx.drawImage(peletImage,
      -this.size / 10,
      -this.size / 10,
      this.size / 4,
      this.size / 2);
    ctx.restore();
  }
}
class Bait {
  constructor(x, y) {
    this.x = x + 5; //3
    this.y = y; //6
    this.createdAt = Date.now();
    //this.duration = 0; // Food lasts 5 seconds
    const rect = canvas.getBoundingClientRect();
    // Scale mouse coordinates to canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    this.size = (((180 * scaleX) + (180 * scaleY)) / 7.5) + Math.random() * 3;
    //this.size = 75 + Math.random() * 3

  }

  isExpired() {
    return Date.now() - this.createdAt > this.duration;
  }

  draw() {
    ctx.beginPath();
    //-4,0
    ctx.arc(this.x - 1, this.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.save();
    ctx.translate(this.x - 3, this.y);
    ctx.rotate(Math.PI); // Fix upside-down image

    ctx.drawImage(baitImage,
      -this.size / 10,
      -this.size / 10,
      this.size / 4,
      this.size / 2);
    ctx.restore();
  }
}

// Fish class
class Fish {
  constructor(x, y) {
    if (x == null && y == null) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    } else {
      this.x = x;
      this.y = y;
    }

    //this.speed = 1.1 + Math.random() * 2;
    const rect = canvas.getBoundingClientRect();
    // Scale mouse coordinates to canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    this.size = (((180 * scaleX) + (180 * scaleY)) / 2.5) + Math.random() * 3;
    this.speed = ((1.3 * scaleX) + (1.3 * scaleY)) / 1.62
    this.direction = Math.random() * Math.PI * 2;
    this.wigglePhase = Math.random() * Math.PI * 2;
  }

  update(food, otherFish, foodBait) {
    
    if (foodBait) {

      const rect = canvas.getBoundingClientRect();
      // Scale mouse coordinates to canvas resolution
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      this.speed = ((1.3 * scaleX) + (1.3 * scaleY)) / 2
      // Calculate distance to food
      const dx = foodBait.x - this.x;
      const dy = foodBait.y - this.y;
      const distanceToFood = Math.sqrt(dx * dx + dy * dy);
      //console.log(distanceToFood)
      // If fish is very close to food, stop moving toward it
      if (distanceToFood < 60) {
        if (distanceToFood > 20) {

          h.pause();
          h.currentTime = 0.7;
          //castButton.innerHTML ='<img srcset="strike.png" src="strike.png" alt="strike.png">'
          castButton.textContent = "Tarik"


        }

        if (navigator.vibrate) {
          navigator.vibrate(500);
        }
        if (distanceToFood > 7) { // Threshold of 5 pixels
          this.direction = Math.atan2(dy, dx);
          this.x += Math.cos(this.direction) * this.speed;
          this.y += Math.sin(this.direction) * this.speed;
          const rect = canvas.getBoundingClientRect();
          // Scale mouse coordinates to canvas resolution
          const scaleX = canvas.width / rect.width;
          const scaleY = canvas.height / rect.height;

          this.speed = ((1.3 * scaleX) + (1.3 * scaleY)) / 4
          //this.speed = 1.3 //1.2
          if (distanceToFood <= 15) {
            if (h.paused) {
              h.play();
              h.currentTime = 0.7;
              //castButton.innerHTML ='<img srcset="strike.png" src="strike.png" alt="strike.png">'
              castButton.textContent = "STRIKE"
            }
          }


        }
      }


      // Repulsion from other fish
      const repulsionDistance = 10;
      const repulsionStrength = 1;
      otherFish.forEach(other => {
        if (other !== this) {
          const distX = this.x - other.x;
          const distY = this.y - other.y;
          const distance = Math.sqrt(distX * distX + distY * distY);
          if (distance < repulsionDistance && distance > 0) {
            const pushX = (distX / distance) * repulsionStrength;
            const pushY = (distY / distance) * repulsionStrength;
            this.x += pushX;
            this.y += pushY;
          }
        }
      });
    } 
    
    if (food && !food.isExpired()) {
      // Calculate distance to food
       
        const dx = food.x - this.x;
        const dy = food.y - this.y;
        const distanceToFood = Math.sqrt(dx * dx + dy * dy);

        // If fish is very close to food, stop moving toward it
        if (distanceToFood > 30) { // Threshold of 5 pixels
          this.direction = Math.atan2(dy, dx);
          this.x += Math.cos(this.direction) * this.speed;
          this.y += Math.sin(this.direction) * this.speed;
        }

        // Repulsion from other fish
        const repulsionDistance = 15;
        const repulsionStrength = 4;
        otherFish.forEach(other => {
          if (other !== this) {
            const distX = this.x - other.x;
            const distY = this.y - other.y;
            const distance = Math.sqrt(distX * distX + distY * distY);
            if (distance < repulsionDistance && distance > 0) {
              const pushX = (distX / distance) * repulsionStrength;
              const pushY = (distY / distance) * repulsionStrength;
              this.x += pushX;
              this.y += pushY;
            }
          }
        });
      
    }
    else {
      // Random movement
      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;

      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) {
        this.direction = Math.PI - this.direction;
      }
      if (this.y < 0 || this.y > canvas.height) {
        this.direction = -this.direction;
      }

      // Randomly change direction slightly
      this.direction += (Math.random() - 0.5) * 0;
    }
    

    
    
    

    this.wigglePhase += 0.1;

  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction + Math.sin(this.wigglePhase) * 0.15);
    ctx.rotate(Math.PI / 2); // Fix upside-down image
    ctx.drawImage(fishImage,
      -this.size / 10,
      -this.size / 10,
      this.size / 4,
      this.size / 2);
    ctx.restore();
  }
}

class FishKid {
  constructor(x, y) {
    if (x == null && y == null) {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    } else {

      this.x = x;
      this.y = y;
    }
    const rect = canvas.getBoundingClientRect();
    // Scale mouse coordinates to canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    this.size = (((180 * scaleX) + (180 * scaleY)) / 4.5) + Math.random() * 3;
    this.speed = ((1.3 * scaleX) + (1.3 * scaleY)) / 1.25


    // this.size = 70 + Math.random() * 3;
    //this.speed = 2 + Math.random() * 2;
    this.direction = Math.random() * Math.PI * 2;
    this.wigglePhase = Math.random() * Math.PI * 2;

  }

  update(food2, otherFish) {
    if (food2 && !food2.isExpired()) {
      // Calculate distance to food
      const dx = food2.x - this.x;
      const dy = food2.y - this.y;
      const distanceToFood = Math.sqrt(dx * dx + dy * dy);

      // If fish is very close to food, stop moving toward it
      if (distanceToFood > 15) { // Threshold of 5 pixels
        this.direction = Math.atan2(dy, dx);
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;
      }

      // Repulsion from other fish
      const repulsionDistance = 15;
      const repulsionStrength = 4;
      otherFish.forEach(other => {
        if (other !== this) {
          const distX = this.x - other.x;
          const distY = this.y - other.y;
          const distance = Math.sqrt(distX * distX + distY * distY);
          if (distance < repulsionDistance && distance > 0) {
            const pushX = (distX / distance) * repulsionStrength;
            const pushY = (distY / distance) * repulsionStrength;
            this.x += pushX;
            this.y += pushY;
          }
        }
      });
    } else {
      // Random movement
      this.x += Math.cos(this.direction) * this.speed;
      this.y += Math.sin(this.direction) * this.speed;

      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) {
        this.direction = Math.PI - this.direction;
      }
      if (this.y < 0 || this.y > canvas.height) {
        this.direction = -this.direction;
      }

      // Randomly change direction slightly
      this.direction += (Math.random() - 0.5) * 0;
    }
    this.wigglePhase += 0.1;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction + Math.sin(this.wigglePhase) * 0.15);
    ctx.rotate(Math.PI / 2); // Fix upside-down image
    ctx.drawImage(fishImage,
      -this.size / 10,
      -this.size / 10,
      this.size / 4,
      this.size / 2);
    ctx.restore();
  }
}


// Create multiple fish
let fishCount = parseInt(localStorage.getItem('fishCount') || 2);
let fishKidCount = parseInt(localStorage.getItem('fishKidCount'));
const fishArray = [];
const fishKidArray = [];
let fishHealth = 0
let fishLevel = 0
for (let i = 0; i < fishCount; i++) {
  fishArray.push(new Fish());
}
localStorage.setItem('fishCount', fishArray.length);
for (let j = 0; j < fishKidCount; j++) {
  fishKidArray.push(new FishKid());
}

function ulang() {
  reset = confirm('Ulang dari awal?')
  if (reset) {
    localStorage.clear();
    location.reload()
  }

}

function jualIkan() {
  if (fishArray.length > 2) {
    fishArray.pop()
    curSaldo = saldo += (Math.floor(Math.random() * 3 + 1) * 500 + 10000)
    dompet.innerHTML = ' Rp ' + curSaldo
    total.innerHTML = 'Ikan Besar : ' + fishArray.length + '<br />' + 'Ikan Kecil : ' +
      fishKidArray.length
    localStorage.setItem('saldo', curSaldo);
    fishCount--
    localStorage.setItem('fishCount', fishCount);

  } else {
    alert('Sisa Ikan untuk indukan!!')
  }
}

function beliIkan() {
  if (saldo < 14000) {
    alert('Uangmu kurang')
  } else {
    curSaldo = saldo -= 14000
    dompet.innerHTML = ' Rp ' + curSaldo
    localStorage.setItem('saldo', curSaldo);
    rndSpawnX = Math.floor(Math.random() * 200) + 100
    rndSpawnY = Math.floor(Math.random() * 315) + 200
    fishKidArray.push(new FishKid(rndSpawnX, rndSpawnY))
    fishKidCount = fishKidArray.length;
    localStorage.setItem('fishKidCount', fishKidCount);
    fishLevel = 0
    total.innerHTML = 'Ikan Besar : ' + fishArray.length + '<br />' + 'Ikan Kecil : ' +
      fishKidArray.length

  }
}



// Food and cooldown variables

let food = null;
let food2 = null;
let foodBait = null
let lastFeedTime = 0;
const feedCooldown = 6000; // 2-second cooldown between feeds (in milliseconds)
canvas.addEventListener('click', (event) => {
  const currentTime = Date.now();
  if (currentTime - lastFeedTime >= feedCooldown) {
    const rect = canvas.getBoundingClientRect();
    // Scale mouse coordinates to canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    if (bibit.checked == true) {

      if (saldo < 2000) {
        alert('Uangmu kurang')
      } else {
        food = new Food(x, y);
        lastFeedTime = currentTime;
        curSaldo = saldo -= 2000
        dompet.innerHTML = ' Rp ' + curSaldo
        localStorage.setItem('saldo', curSaldo);
        setTimeout(() => {
          fishHealth++
          if (fishHealth > 2) {
            fishKidArray.push(new FishKid(x, y))
            fishKidCount = fishKidArray.length;
            localStorage.setItem('fishKidCount', fishKidCount);
            fishHealth = 0;
            fishLevel = 0
            total.innerHTML = 'Ikan Besar : ' + fishArray.length + '<br />' + 'Ikan Kecil : ' +
              fishKidArray.length
          }

        }, 7000)
      }
    }
    if (besaran.checked == true) {
      if (saldo < 1000) {
        alert('Uangmu kurang')
      } else {

        food2 = new FoodGrow(x, y);
        lastFeedTime = currentTime;
        curSaldo = saldo -= 1000
        dompet.innerHTML = ' Rp ' + curSaldo
        localStorage.setItem('saldo', curSaldo);

        setTimeout(() => {
          fishLevel++
          if (fishKidArray.length > 0) {
            if (fishLevel > 2) {

              for (i = 0; i < fishKidCount; i++) {
                fishKidArray.pop()
                fishArray.push(new Fish(x, y))

              }
              fishKidCount = fishKidArray.length
              fishCount = fishArray.length;

              localStorage.setItem('fishCount', fishCount);
              localStorage.setItem('fishKidCount', fishKidCount);
              fishLevel = 0;
              total.innerHTML = 'Ikan Besar : ' + fishArray.length + '<br />' + 'Ikan Kecil : ' +
                fishKidArray.length
            }
          }
        }, 7000)
      }
    }
  }
});


// Animation loop
const shared = {}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw and update food if it exists
  if (food) {
    if (!food.isExpired()) {
      food.draw();
    } else {
      food = null; // Remove expired food
    }
  }
  if (food2) {
    if (!food2.isExpired()) {
      food2.draw();
    } else {
      food2 = null; // Remove expired food
    }
  }
  if (foodBait) {
    if (!foodBait.isExpired()) {
      foodBait.draw();
    } else {
      foodBait = null; // Remove expired food
    }
  }

  // Update and draw fish

  fishArray.forEach((fish, index) => {
    //setTimeout(() => {
    if (index === shared.rd) {
      fish.update(food, fishArray, foodBait)
    }
    //}, 3000)

    fish.update(food, fishArray);
    fish.draw();
  });



  fishKidArray.forEach(fish => {
    fish.update(food2, fishKidArray);
    fish.draw();
  });

  requestAnimationFrame(animate);
}

// Start animation once image is loaded
fishImage.onload = () => {
  animate();
};


// If image fails to load, log error
fishImage.onerror = () => {
  console.error('Failed to load fish image. Please check the image URL or path.');
};
total.innerHTML = 'Ikan Besar : ' + fishArray.length + '<br />' + 'Ikan Kecil : ' + fishKidArray.length

function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName(checkbox.name)
  checkboxes.forEach((item) => {
    if (item !== checkbox) item.checked = false
  })
}