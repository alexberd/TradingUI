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

function keyPressedLeftRight() {
    if (keyCode === RIGHT_ARROW) {
      forward();
    } else if (keyCode === LEFT_ARROW) {
      backwards();
    }
  }
  
  function keyTyped() {
    if (key === "-") {
      columnWidth/=2;
      difference=selectedRow-rowsStart
      rowsStart=int(rowsStart-difference);
      if (rowsStart<0) rowsStart=0;
    }
    else if (key === '=') {
      columnWidth*=2;
      //move first row to center to mouse
      difference=selectedRow-rowsStart
      rowsStart=int(rowsStart+difference/2);
      // console.log("difference:"+difference);
      // console.log("selectedRow:"+selectedRow);
      // console.log("rowsStart:"+rowsStart);
      // console.log("rowsStart_:"+rowsStart_);
      // rowsStart=rowsStart_;
    }

    if (key === "4") {
      if (state_H1==true){
        state_H1=false;
      }
      else{
        state_H1=true;
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
    
  }
  
  