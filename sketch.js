
let arrayString;
let table;
let tableDatetime = []

function setup() {
  // textAlign(CENTER,CENTER);
  createCanvas(1500, 700);
  // let url = "https://raw.githubusercontent.com/alexberd/CSV-Collection/main/ExampleTradingData.csv";
  let url = "https://raw.githubusercontent.com/alexberd/CSV-Collection/main/ExampleTradingData_min.csv";
  //table = loadTable(url, 'headers');
  // console.log(table);
  // console.log(table.getRowCount());
  // console.log(table.getColumnCount());
  
  //arrayString=loadStrings(url, myCallbackArrayString);
  //arrayStrings.append("sf");
  //console.log("0");
  //console.log(arrayString.length);
  
  loadTable(url, "header", myCallbackTable);
  
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
  table.addColumn("M5");
  table.addColumn("M15");
  table.addColumn("M30");
  
  table.addColumn("H1");
  table.addColumn("H1_Open");
  table.addColumn("H1_Close");
  table.addColumn("H1_High");
  table.addColumn("H1_Low");
  
  table.addColumn("H4");
  table.addColumn("H6");
  table.addColumn("D");
  table.addColumn("W");
  table.addColumn("M");

  // const d = new Date(2018, 11, 24, 10, 33, 30);
  // console.log(d);
  // const a = new Date('01 Jan 1970 00:00:00 GMT');
  // console.log(a);
  // const unixTimeZero = Date.parse('01 Jan 1970 00:00:00 GMT');
  //console.log(unixTimeZero.toUTCString());

  let H1_Previous_i=-1;
  let H1_Open=-1;
  let H1_Close=-1;
  let H1_Low=Infinity;
  let H1_High=-Infinity;
  
  
  // console.log(table.columns);

  for(i=0;i<table.getRowCount();i++)
  {
    //create tableDatetime
    let date = table.get(i, 0).replace("."," ");
    date = date.replace("."," ");
    let time = table.get(i, 1);
    let datetimeString = date + " " + time;
    // console.log(datetimeString);
    const datetime = new Date(datetimeString);
    // console.log(datetime);
    tableDatetime.push(datetime);

    time=table.get(i, 1).split(":");

    //H1
    if(time[1]=="00" && parseInt(time[0])%4==0)
    {
      table.set(i, 'H1', true);
      // console.log(time);
      
      H1_Open=parseFloat(table.get(i, 'Open'));
      table.set(i, 'H1_Open', H1_Open);
      if(H1_Previous_i!=-1)
      {
        // console.log("H1_Previous_i"+H1_Previous_i);
        table.set(H1_Previous_i, 'H1_Close', H1_Close);
      
        table.set(H1_Previous_i, 'H1_Low', H1_Low);
        table.set(H1_Previous_i, 'H1_High', H1_High);
        
        // console.log("H1_Open"+H1_Open);
        // console.log("H1_Close"+H1_Close);
        // console.log("H1_Low"+H1_Low);
        // console.log("H1_High"+H1_High);
      }

      H1_Low=Infinity;
      H1_High=-Infinity;
      H1_Previous_i=i;

    }
    else
    {
      table.set(i, 'H1', false);
    }
    if (table.get(i, 'High')>H1_High) H1_High=parseFloat(table.get(i, 'High'));
    if (table.get(i, 'Low')<H1_Low) H1_Low=parseFloat(table.get(i, 'Low'));
    H1_Close=parseFloat(table.get(i, 'Close'));
    
    //if (table.get(i, 1).split(":")[0])
    // {

    // }
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
let rowsStart = 1;
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
  if (rowsStart>moveStep())
    rowsStart+=-moveStep();
}

function forward()
{
  //let size = 3*10/columnWidth;
  if (rowsStart<table.getRowCount()-moveStep())
      rowsStart+=moveStep();
}



