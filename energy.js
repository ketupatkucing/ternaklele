let energyGauge = 50;
const bar = document.getElementById('energy-bar');
const container = document.getElementById('energy-container');

function updateBar() {
  bar.style.width = energyGauge + '%';

  if (energyGauge > 40) {
    bar.style.background = energyGauge > 30 ?
      'linear-gradient(to right, #76e1ff, #0f8dbd)' :
      'linear-gradient(to right, #ff5656, #ff0000)';
    container.classList.remove('shake');
  } else if (energyGauge > 20) {
    bar.style.background = 'linear-gradient(to right, #ffcc00, #ff8800)';
    container.classList.add('shake');
  } else {
    bar.style.background = 'linear-gradient(to right, #ff4444, #cc0000)';
    container.classList.add('shake');
  }

  if (energyGauge > 40) {
    container.classList.remove('shake');
  }
}



updateBar();
// requestAnimationFrame(depleteOverTime);