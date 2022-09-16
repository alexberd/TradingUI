let mouseBeforePressedX=0;
let columnsStartBeforePressed=0;
function mousePressed() {
    mouseBeforePressedX = mouseX;
    columnsStartBeforePressed=columnsStart;
    print("columnsStartBeforePressed: "+columnsStartBeforePressed);
}

function mouseDragged()
{
    print("def:"+(mouseBeforePressedX-mouseX)+"/"+columnWidth);
    difference = ((mouseBeforePressedX-mouseX)/columnWidth);
    print("difference "+difference);
    newColumnStart=columnsStartBeforePressed+int(difference);
    //print(difference*1.0/moveStep());
    if (newColumnStart>0 && newColumnStart<table.getRowCount())
       columnsStart=newColumnStart;
    print(columnsStart);
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
  
  