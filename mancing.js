const castButton = document.getElementById('castButton');
const castButtonPlaceholder = document.getElementById('castButtonPlaceholder');
const line = document.getElementById('line');
const human = document.getElementById('human')
let isCast = false;
let lineLength = 0;
let reelInterval = null;
let energy = null
let fishStr = 100
const fishenergy = document.querySelector('.fishstr')


let unlocked = false

function castLine() {


  if (saldo >= 1000) {
    curSaldo = saldo -= 1000
    dompet.innerHTML = ' Rp ' + curSaldo
    localStorage.setItem('saldo', curSaldo);

  } else {
    alert('Uangmu kurang')
    return
  }
  if (!unlocked) {
    h.play().then(() => {
      h.pause();
      h.currentTime = 0;
      unlocked = true;
    });
  }
  castButton.style.display = 'none'
  castButtonPlaceholder.style.display = 'block'
  castButtonPlaceholder.style.opacity = '1'
  fishStr = 50
  //fishenergy.innerHTML = fishStr
  energyGauge = 50

  if (lineLength > 0) {
    clearInterval(energy)
    clearInterval(reelInterval)
    //castButton.innerHTML = ' <img srcset="pancing.png" src="pancing.png" alt="pancing.png">'
    castButton.textContent = 'Tarik';
    isCast = true

    const rect = canvas.getBoundingClientRect();
    // Scale mouse coordinates to canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;


    const recta = line.getBoundingClientRect()

    x = (Math.floor(recta.left) - rect.left) * scaleX
    y = (
        (Math.floor(recta.top)) -
        ((recta.top * (-0.01)))
      ) *
      scaleY

    foodBait = new Bait(x, y);

  } else {
    rotate = 120 + (Math.floor(Math.random() * 50))
    //rotate  = 120

    clearInterval(energy)
    // rotate = 135
    line.style.rotate = rotate + 'deg'
    human.style.transform = `rotate(${-180+rotate}deg)`

    castButton.textContent = '..';
    //castButton.innerHTML  = ' <img srcset="pancing.png" src="pancing.png" alt="pancing.png">'
    isCast = false
    rand = 285 + (Math.floor(Math.random() * 90))
    //rand = 211
    //line.style.borderBottom = "solid 5px red"
    //line.style.height = `${lineLength}px`;
    reelInterval = setInterval(() => {
      line.style.height = `${lineLength}px`;
      if (lineLength > rand) {
        //console.log(lineLength)
        clearInterval(reelInterval);
        castButton.style.display = 'block'
        castButtonPlaceholder.style.display = 'none'


        const rect = canvas.getBoundingClientRect();
        // Scale mouse coordinates to canvas resolution
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;


        const recta = line.getBoundingClientRect()
        //castButton.innerHTML =  '<img srcset="pancing.png" src="pancing.png" alt="pancing.png">'
        castButton.textContent = 'Tarik';
        isCast = true;

        x = (Math.floor(recta.left) - rect.left) * scaleX
        y = (
            (Math.floor(recta.top)) -
            ((recta.top * (-0.01)))
          ) *
          scaleY
        //  x = Math.floor(recta.left)
        // y = Math.floor(recta.top) + (Math.floor(recta.top) * 0.85)

        foodBait = new Bait(x, y);
        //foodBait.duration = 0
        shared.rd = (Math.floor(Math.random() * fishArray.length)) //+3;



        //////
        test = setInterval(() => {
          const targetFish = fishArray?.[shared.rd];
          const dx = (foodBait?.x ?? 400) - (targetFish?.x);
          const dy = (foodBait?.y ?? 800) - (targetFish?.y);
          const distanceToFood = Math.sqrt(dx * dx + dy * dy);

          if (fishStr <= 100 && distanceToFood <= 15) {

            energyGauge += 0.25
            updateBar();
            fishStr += 0.25
            //fishenergy.innerHTML = fishStr

          }
          if (distanceToFood <= 15 && fishStr >= 99.75) {


            fishStr = 50
            energyGauge = 50
            updateBar()
            //fishenergy.innerHTML = fishStr
            // lineLength -= 5;
            h.pause()
            h.currentTime = 0.7

            lineLength = 0
            line.style.height = 0
            foodBait.duration = 0
            //castButton.innerHTML = ' <img srcset="pancing.png" src="pancing.png" alt="pancing.png">'
            castButton.textContent = 'Lempar';
            clearInterval(energy)
            clearInterval(test)
            isCast = false



          }


        }, 40)


      }
      lineLength += 5




    }, 20);

  }
}


function startReeling() {
  //clearInterval(test)
  clearInterval(energy)
  if (!isCast) return;

  reelInterval = setInterval(() => {
    // fishenergy.innerHTML = fishStr
    line.style.height = `${lineLength}px`;
    lineLength -= 5;
    const rect = canvas.getBoundingClientRect();
    // Scale mouse coordinates to canvas resolution
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;


    const recta = line.getBoundingClientRect()

    x = (Math.floor(recta.left) - rect.left) * scaleX
    y = (
        (Math.floor(recta.top)) -
        ((recta.top * (-0.01)))
      ) *
      scaleY

    const targetFish = fishArray?.[shared.rd];
    const dx = (foodBait?.x ?? 400) - (targetFish?.x);
    const dy = (foodBait?.y ?? 800) - (targetFish?.y);
    const distanceToFood = Math.sqrt(dx * dx + dy * dy);
    
    
    
    if (distanceToFood <= 15) {
      
      //foodBait.duration = 0
      
      
      if (energyGauge > 0) {
        energyGauge -= 1.2
        updateBar();
      }

      // castButton.innerHTML = '<img srcset="strike.png" src="strike.png" alt="strike.png">'
      castButton.textContent = 'STRIKE'
      //castButton.appendChild(img);

      clearInterval(energy)
      isCast = true
      fishStr -= 1.2
      //fishenergy.innerHTML = fishStr

      if (fishStr <= 0) {
        //  foodBait = new Bait(x, y)
        h.pause()
        h.currentTime = 0.7
        // fishStr = 100

        lineLength = 0;
        energyGauge = 50
        updateBar()
        //fishenergy.innerHTML = fishStr
        foodBait.duration = 0
        clearInterval(reelInterval);
        clearInterval(test)
        // castButton.innerHTML = ' <img srcset="pancing.png" src="pancing.png" alt="pancing.png">'
        castButton.textContent = 'Lempar';

        isCast = false;


      }



      
    
    
      
    }

    foodBait = new Bait(x, y)
    if (lineLength <= 0) {
      h.pause()
      h.currentTime = 0.7
      //fishStr = 100
      lineLength = 0;
      energyGauge = 50
      updateBar()
      // fishenergy.innerHTML = fishStr
      foodBait.duration = 0
      clearInterval(reelInterval);
      clearInterval(test)
      // castButton.innerHTML = ' <img srcset="pancing.png" src="pancing.png" alt="pancing.png">'
      castButton.textContent = 'Lempar';
      isCast = false;

      if (typeof fishArray[shared.rd] !== 'undefined' &&
        fishArray[shared.rd].x > ((310 * scaleX) + (310 * scaleY)) / 3 &&
        fishArray[shared.rd].y > ((700 * scaleX) + (700 * scaleY)) / 3
        //fishArray[shared.rd].x > 310 &&
        //fishArray[shared.rd].y > 705
      ) {
        fishArray.splice(shared.rd, 1);
        curSaldo = saldo += (Math.floor(Math.random() * 3 + 1) * 500 + 10000)
        dompet.innerHTML = ' Rp ' + curSaldo
        total.innerHTML = 'Ikan Besar : ' + fishArray.length + '<br />' + 'Ikan Kecil : ' +
          fishKidArray.length
        localStorage.setItem('saldo', curSaldo);
        fishCount--
        localStorage.setItem('fishCount', fishCount);
        alert('Dapat ikan, mancing mania? Mantap!!!!')

      }

    }


    line.style.height = `${lineLength}px`;

  }, 40);

}

function stopReeling() {

  if (reelInterval) {

    clearInterval(reelInterval);
    clearInterval(test)
    reelInterval = null;
    energy = setInterval(() => {

      const rect = canvas.getBoundingClientRect();
      // Scale mouse coordinates to canvas resolution
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;


      const recta = line.getBoundingClientRect()

      x = (Math.floor(recta.left) - rect.left) * scaleX
      y = (
          (Math.floor(recta.top)) -
          ((recta.top * (-0.01)))
        ) *
        scaleY

      const targetFish = fishArray?.[shared.rd];
      const dx = (foodBait?.x ?? 400) - (targetFish?.x);
      const dy = (foodBait?.y ?? 800) - (targetFish?.y);
      const distanceToFood = Math.sqrt(dx * dx + dy * dy);

      if (fishStr <= 100 && distanceToFood <= 15) {

        energyGauge += 0.25
        updateBar();
        fishStr += 0.25

        lineLength += 1
        line.style.height = `${lineLength}px`;
        
        //fishenergy.innerHTML = fishStr
        if (lineLength > 400) {
          h.pause()
          h.currentTime = 0.7
          foodBait.duration = 0
          lineLength = 0
          line.style.height = `${lineLength}px`;
          fishStr = 50
          energyGauge = 50
          updateBar()
          castButton.textContent = 'Lempar';
          clearInterval(energy)
          isCast = false
        } else {

          foodBait = new Bait(x, y)
        }



      }



      if (distanceToFood <= 15 && fishStr >= 99.75) {


        fishStr = 50
        energyGauge = 50
        updateBar()
        //fishenergy.innerHTML = fishStr
        // lineLength -= 5;
        h.pause()
        h.currentTime = 0.7

        lineLength = 0
        line.style.height = 0
        foodBait.duration = 0
        //castButton.innerHTML = ' <img srcset="pancing.png" src="pancing.png" alt="pancing.png">'
        castButton.textContent = 'Lempar';
        clearInterval(energy)
        isCast = false



      }


      if (fishStr > 99.75) {
        clearInterval(energy)
      } else {

        // foodBait.duration = 0
      }



    }, 40)
  }

}

castButton.addEventListener('click', () => {
  if (!isCast) {
    castLine();
  }
});

castButton.addEventListener('mousedown', startReeling);
castButton.addEventListener('mouseup', stopReeling);
// For touch devices
castButton.addEventListener('touchstart', startReeling);
castButton.addEventListener('touchend', stopReeling);