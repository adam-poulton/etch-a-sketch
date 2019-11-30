const container = document.getElementById('container');
const grid = document.getElementById('grid');

const setContainerArea = (e) => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const dimension = Math.min(height, width);
  if (width > dimension){
    const margin = (width - dimension) / 2
    container.style.setProperty('margin', `0px ${margin}px 0px ${margin}px`)
  } else if (height > dimension) {
    container.style.setProperty('margin', `0px 0px 0px 0px`)
  }
  container.style.setProperty('height', `${dimension}px`);
  container.style.setProperty('width', `${dimension}px`);
  console.log(`w: ${width} h: ${height} d: ${dimension}`) 
}

const createDivGrid = (rows, cols) => {
  grid.style.setProperty('--grid-rows', rows);
  grid.style.setProperty('--grid-cols', cols);
  for (let i = 0; i < (rows * cols); i++) {
    let cell = document.createElement('div')
    grid.appendChild(cell).classList.add('grid-item')
  }
}

createDivGrid(16, 16);
window.onload = setContainerArea;
window.onresize = setContainerArea;