
let arrayString;
let table;


function setup() {  
  createCanvas(1500, 700);
  let url = "https://raw.githubusercontent.com/alexberd/CSV-Collection/main/ExampleTradingData.csv";
  //table = loadTable(url, 'headers');
  // console.log(table);
  // console.log(table.getRowCount());
  // console.log(table.getColumnCount());
  
  //arrayString=loadStrings(url, myCallbackArrayString);
  //arrayStrings.append("sf");
  //console.log("0");
  //console.log(arrayString.length);
  
  loadTable(url, myCallbackTable);
  
  // console.log(url);  
  // console.log(arrayStrings);
  // console.log(arrayStrings.length);  
  
}

function myCallbackArrayString(data) {

// console.log(data[0])
console.log("1");
console.log(data);
console.log("2");
console.log(data.length); 

}

function myCallbackTable(data) {
  //console.log("3");
  //console.log(data);
  //console.log("4");
  //console.log(data.rows.length);

  table=data;
}

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
let columnsStart = 0;
//let columnsEnd = 20;
let columnWidth = 10;
function draw()
{
  background(220);
  
  if(table)
  {
    columnsEnd=columnsStart+(width-40)/columnWidth;
    //set max min
    let valueMax=-Infinity;
    let valueMin=Infinity;
    for (i=columnsStart;i<columnsEnd+1;i++)
    {
      let valueHigh = table.get(i, 3);
      let valueLow = table.get(i, 4);
      if (valueHigh>valueMax)
        valueMax=valueHigh;
      if (valueLow<valueMin)
        valueMin=valueLow;
    }
    
    for (i=columnsStart;i<columnsEnd+1;i++)
    {
      let valueClose = table.get(i, 2);
      let valueHigh = table.get(i, 3);
      let valueLow = table.get(i, 4);
      let valueOpen = table.get(i, 5);
      let x=columnWidth*(i-columnsStart)+20;
      
      let yLow=map(valueLow,valueMin,valueMax,0,-height+40);
      let yHigh=map(valueHigh,valueMin,valueMax,0,-height+40);
      
      let yClose=map(valueClose,valueMin,valueMax,0,-height+40);
      let yOpen=map(valueOpen,valueMin,valueMax,0,-height+40);
      
      line(x+columnWidth/4, height-20+yLow, x+columnWidth/4, height-20+yHigh);
      if (valueClose>valueOpen)
        fill(0,255,0);
      else
        fill(255,0,0);
      rect(x, height-20+yOpen, columnWidth/2, yClose-yOpen);
      
      fill(255);
      text("framerate: "+int(getFrameRate()/10)*10,width-100,40);
    }
  }
  
  
  
  
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
    keyPressedAlex();
  }
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

function keyPressedAlex() {
  if (keyCode === RIGHT_ARROW) {
    forward();
  } else if (keyCode === LEFT_ARROW) {
    backwards();
  }
}

function keyTyped() {
  if (key === "-") {
    columnWidth/=2;
  }
  else if (key === '=') {
    columnWidth*=2;
  }
}

function backwards()
{
  //let size = 3*10/columnWidth;
  if (columnsStart>moveStep())
    columnsStart+=-moveStep();
}

function forward()
{
  //let size = 3*10/columnWidth;
  if (columnsStart<table.getRowCount()-moveStep())
      columnsStart+=moveStep();
}