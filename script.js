class cellColor {
  default = {red:255,blue:0,green:0,opacity:1};
  constructor(data=this.default) {
    this.red = Math.round(Math.max(0, Math.min(data.red, 255)));
    this.green = Math.round(Math.max(0, Math.min(data.green, 255)));
    this.blue = Math.round(Math.max(0, Math.min(data.blue, 255)));
    this.opacity = Math.max(0, Math.min(data.opacity, 1));
  }
  
  combine(added){
    const newOpacity = 1 - (1 - added.opacity) * (1 - this.opacity);
    const newRed = Math.round((added.red * added.opacity / newOpacity) + (this.red * this.opacity * (1 - added.opacity) / newOpacity));
    const newGreen = Math.round((added.green * added.opacity / newOpacity) + (this.green * this.opacity * (1 - added.opacity) / newOpacity));
    const newBlue = Math.round((added.blue * added.opacity / newOpacity) + (this.blue * this.opacity * (1 - added.opacity) / newOpacity));
    return new cellColor({red: newRed, green: newGreen, blue: newBlue, opacity: newOpacity,})
  }

  toHex(){
    let hex = "#"
    let colors = [this.red.toString(16), this.green.toString(16), this.blue.toString(16)];
    colors.forEach(element => {
      let item = element.length < 2 ? "0" + element : element;
      hex += item;
    })
    return hex
  }

  toRGBA(){
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`
  }

}

const fromRGBA = (str) => {
  colors = str.slice(str.indexOf('(')+1, str.indexOf(')')).split(',')
  return {
    red: Number(colors[0].trim()),
    green: Number(colors[1].trim()),
    blue: Number(colors[2].trim()),
    opacity: colors.length < 4 ? 1 : Number(colors[3].trim()),
    }
}

const fromHex = (str) => {
  return {
    red: parseInt('0x' + str.slice(1,3)),
    green: parseInt('0x' + str.slice(3,5)),
    blue: parseInt('0x' + str.slice(5,7)),
    opacity: 1,
  }
}

const init = () => {
  const container = document.getElementById('container');
  const grid = document.getElementById('grid');
  
  let brushColor = new cellColor();
  let borders = true;

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
    brushColor = new cellColor(color);
    document.getElementById('color').value = brushColor.toHex();
  }

  const getColorRGBA = () => brushColor.toRGBA();

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
      grid.appendChild(cell).classList.add('grid-item', 'grid-border')
    }
  }

  const setCellColor = (e) => {
    if (e.shiftKey) {
      // pipette the selected cell to the color picker
      const pipetteColor = e.target.style.backgroundColor
      if (pipetteColor != "" && e.type == "mousedown") {
        setColor(fromRGBA(pipetteColor));
      }
    } else if (e.buttons == 1) {
      // paint the cell
      e.target.style.backgroundColor = getColorRGBA();
    } else if (e.buttons == 2) {
      // erase the cell
      e.target.style.backgroundColor = "";
    }
    e.preventDefault();
    return false;
  }

  const updateColor = (e) => {
    setColor(fromHex(e.target.value));
    e.target.blur();
  }

  const toggleBorders = (e) => {
    cells = document.querySelectorAll('.grid-item')
    cells.forEach(cell=>cell.classList.toggle('grid-border'))
  }

  const resetPage = (e) => {
    cells = document.querySelectorAll('.grid-item')
    cells.forEach(cell=>cell.style.backgroundColor = "")
  }

  const newGrid = (e) => {
    let newSize = parseInt(prompt('Enter grid size: ', '64'));
    if (newSize === NaN) return
    const parent = grid;
    while(parent.firstChild) {
      parent.firstChild.remove()
    }
    createDivGrid(Math.min(256, Math.max(0, newSize)), Math.min(256, Math.max(0, newSize)));
  }

  document.getElementById('color').addEventListener('change', updateColor)
  document.getElementById('borders').addEventListener('click', toggleBorders)
  document.getElementById('reset').addEventListener('click', resetPage)
  document.getElementById('resize').addEventListener('click', newGrid)
  createDivGrid(64, 64);
  window.onload = setContainerArea;
  window.onresize = setContainerArea;
}

init();