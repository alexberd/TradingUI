
let arrayString;

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

let candlestickDisplayRun=true;

function draw()
{
  // if (candlestickDisplayRun)
  //   background(220);
  //   candlestickDisplay();
  //   candlestickDisplayRun=false;

  // console.log("Draw start");
  
  
  // console.log("Display start");
  // candlestickDisplay();
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

  // canvasDisplay();
  // console.log("Draw end");
}



function canvasDisplay()
{
  background(220);
  candlestickDisplay();
  text("framerate: "+int(getFrameRate()/10)*10,width-100,40);
}

// let pos = 25;




