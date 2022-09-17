
let arrayString;
let table;
let tableDatetime = []



class Rectangle {
  constructor(name, height, width) {
    this.name = name;
    this.height = height;
    this.width = width;
  }
}

radius=10
increment=1

let direction="increasing";
let rowsStart = 1;
//let columnsEnd = 20;
let columnWidth = 10;

function draw()
{
  // console.log("Draw start");
  background(220);
  
  // console.log("Display start");
  candlestickDisplay();
  // console.log("Display end");
  
  
  
  //console.log(arrayString.length);
//   try {
  
// }
//   catch (error) {
//   }
  
  
  //console.log(radius)
  if (radius>20 & direction=="increasing")
  {
    direction="descreasing";
    increment=-1;
  }
  
  if (radius<5 & direction=="descreasing")
  {
    direction="increasing";
    increment=1;
  }
  
  radius+=increment
  
  
  //ellipse(mouseX,mouseY,radius/2,radius/2);
  ellipse(width-60,60,radius/2,radius/2);
  
  if (keyIsPressed === true) {
    keyPressedLeftRight();
  }

  canvasDisplay();
  // console.log("Draw end");
}

function canvasDisplay()
{
  text("framerate: "+int(getFrameRate()/10)*10,width-100,40);
}

let pos = 25;
function mouseWheel(event)
{ 
  if(event.delta>0)
  {
    backwards()
  }
  else
  {
    forward()    
  }  
}

function backwards()
{
  //let size = 3*10/columnWidth;
  if (rowsStart>moveStep())
    rowsStart+=-moveStep();
}

function forward()
{
  //let size = 3*10/columnWidth;
  if (rowsStart<table.getRowCount()-moveStep())
      rowsStart+=moveStep();
}



