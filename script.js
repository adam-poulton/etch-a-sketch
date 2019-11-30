const init = () => {
  const container = document.getElementById('container');
  const grid = document.getElementById('grid');
  
  let brushColor = '#ff0000';

  const rgbToHex = (string) => {
    let hex = "#"
    string.slice(4, -1).split(', ').forEach(element => {
      let item = Number(element).toString(16);
      item = item.length < 2 ? "0" + item : item;
      hex += item;
    }); 
    return hex;
  }


  const setColor = (color) => {
    brushColor = color;
    document.getElementById('color').value = brushColor;
  }

  const getColor = () => brushColor;

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
    if (e.shiftKey) {
      // pipette the selected cell to the color picker
      const pipetteColor = e.target.style.backgroundColor
      if (pipetteColor != "" && e.type == "mousedown") {
        setColor(rgbToHex(pipetteColor));
      }
    } else if (e.buttons == 1) {
      // paint the cell
      e.target.style.backgroundColor = getColor();
    } else if (e.buttons == 2) {
      // erase the cell
      e.target.style.backgroundColor = "";
    }
    e.preventDefault();
    return false;
  }

  const updateColor = (e) => {
    setColor(e.target.value);
    e.target.blur();
  }

  document.getElementById('color').addEventListener('change', updateColor)
  createDivGrid(64, 64);
  window.onload = setContainerArea;
  window.onresize = setContainerArea;
}

init();