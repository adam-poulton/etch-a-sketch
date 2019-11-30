const init = () => {
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
      //cell.addEventListener('mouseenter', setCellColor);
      cell.addEventListener('mousedown', setCellColor);
      cell.addEventListener('mouseover', setCellColor);
      cell.addEventListener('contextmenu', (e) => {e.preventDefault();return false})
      grid.appendChild(cell).classList.add('grid-item')
    }
  }

  const setCellColor = (e) => {
    if (e.buttons == 1) {
      e.target.style.backgroundColor="red";
    } else if (e.buttons == 2) {
      e.target.style.backgroundColor="";
    }
    e.preventDefault();
    return false;
  }


  createDivGrid(64, 64);
  window.onload = setContainerArea;
  window.onresize = setContainerArea;
}

init();