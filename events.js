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
    }
    else if (key === '=') {
      columnWidth*=2;
    }
  }
  
  