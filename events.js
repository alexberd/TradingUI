let mouseBeforePressedX=0;
let rowsStartBeforePressed=0;

function mousePressed() {
    mouseBeforePressedX = mouseX;
    rowsStartBeforePressed=rowsStart;
    print("rowsStartBeforePressed: "+rowsStartBeforePressed);
}

function mouseDragged()
{
    print("def:"+(mouseBeforePressedX-mouseX)+"/"+columnWidth);
    difference = ((mouseBeforePressedX-mouseX)/columnWidth);
    print("difference "+difference);
    newrowsStart=rowsStartBeforePressed+int(difference);
    //print(difference*1.0/moveStep());
    if (newrowsStart>0 && newrowsStart<table.getRowCount())
       rowsStart=newrowsStart;
    print(rowsStart);
}

function moveStep()
{
    return int(3.0*10.0/columnWidth);
}

function moveStepFloat()
{
    //print("collumn width "+columnWidth);
    return 10.0/columnWidth;    
}
 
function keyTyped() {
  if (key === "-") {
    columnWidth/=2;
    console.log("columnWidth:"+columnWidth);
    //move first row to center to mouse
    difference=selectedRow-rowsStart
    rowsStart=int(rowsStart-difference);
    if (rowsStart<0) rowsStart=0;
  }
  else if (key === '=') {
    columnWidth*=2;
    console.log("columnWidth:"+columnWidth);
    //move first row to center to mouse
    difference=selectedRow-rowsStart
    rowsStart=int(rowsStart+difference/2);
  }

  if (key === "4") {
    if (state_H1==true){
      state_H1=false;
    }
    else{
      state_H1=true;
    }
  }
  
  if (key === "r") {
    if (state_H1_new==true){
      state_H1_new=false;
    }
    else{
      state_H1_new=true;
    }
  }

  if (key === "5") {
    if (state_H4==true){
      state_H4=false;
    }
    else{
      state_H4=true;
    }
  }

  if (key === "t") {
    if (state_H4_new==true){
      state_H4_new=false;
    }
    else{
      state_H4_new=true;
    }
  }
}
  
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

function keyPressedLeftRight() {
  if (keyCode === RIGHT_ARROW) {
    forward();
  } else if (keyCode === LEFT_ARROW) {
    backwards();
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