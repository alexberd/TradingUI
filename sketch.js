
let arrayString;
let table;
let tableDatetime = []

function setup() {  
  createCanvas(1500, 700);
  let url = "https://raw.githubusercontent.com/alexberd/CSV-Collection/main/ExampleTradingData.csv";
  // let url = "https://raw.githubusercontent.com/alexberd/CSV-Collection/main/ExampleTradingData_min2.csv";
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

function myCallbackTable(data)
{
  //console.log("3");
  //console.log(data);
  //console.log("4");
  //console.log(data.rows.length);

  table=data;

  //prepare column
  table.addColumn("5M")
  table.addColumn("15M")
  table.addColumn("30M")
  table.addColumn("1H")
  table.addColumn("4H")
  table.addColumn("6H")
  table.addColumn("1D")
  table.addColumn("W")
  table.addColumn("M")

  // const d = new Date(2018, 11, 24, 10, 33, 30);
  // console.log(d);
  // const a = new Date('01 Jan 1970 00:00:00 GMT');
  // console.log(a);
  // const unixTimeZero = Date.parse('01 Jan 1970 00:00:00 GMT');
  //console.log(unixTimeZero.toUTCString());

  for(i=0;i<table.getRowCount();i++)
  {
    let date = table.get(i, 0).replace("."," ");
    date = date.replace("."," ");
    let time = table.get(i, 1);
    let datetimeString = date + " " + time
    // console.log(datetimeString);
    const datetime = new Date(datetimeString);
    tableDatetime.push(datetime);
    // console.log(datetime);
  }
  console.log(tableDatetime);
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
let columnsStart = 1;
//let columnsEnd = 20;
let columnWidth = 10;

function draw()
{
  background(220);
  

  candlestickDisplay();
  
  
  
  
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
  if (columnsStart>moveStep())
    columnsStart+=-moveStep();
}

function forward()
{
  //let size = 3*10/columnWidth;
  if (columnsStart<table.getRowCount()-moveStep())
      columnsStart+=moveStep();
}



