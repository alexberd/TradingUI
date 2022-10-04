let mouseBeforePressedX=0;
let rowsStartBeforePressed=0;
let currentDateBeforePressed=0;

function mousePressed() {
    mouseBeforePressedX = mouseX;
    rowsStartBeforePressed=rowsStart;
    print("rowsStartBeforePressed: "+rowsStartBeforePressed);

    currentDateBeforePressed=currentDate_;
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
  
  print("difference:"+difference);
  if (difference>0)
  {
    currentDate_Temp=new Date(currentDateBeforePressed);
    for(let i=0;i<int(difference);i++)
    {
      currentDate_Temp.setHours(currentDate_Temp.getHours() + 1);
      avoidWeekendsForwards(currentDate_Temp);
    }
    if(currentDateEnd>currentDate_Temp)
      currentDate_=currentDate_Temp
  }
  else
  {
    currentDate_Temp=new Date(currentDateBeforePressed);
    for(let i=0;i<int(-difference);i++)
    {
      currentDate_Temp.setHours(currentDate_Temp.getHours() - 1);
      avoidWeekendsBackwards(currentDate_Temp);
    }
    if(currentDateStart<currentDate_Temp)
      currentDate_=currentDate_Temp
  }
  
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
    difference=selectedRowFromStart-rowsStart
    rowsStart=int(rowsStart-difference);
    if (rowsStart<0) rowsStart=0;

    currentDate_Temp=new Date(currentDate_);
    for(let i=0;i<selectedRow;i++)
    {
      currentDate_Temp.setHours(currentDate_Temp.getHours() - 1);
      avoidWeekendsBackwards(currentDate_Temp);
    }
    currentDate_=currentDate_Temp;

  }
  else if (key === '=' || key === '+') {
    columnWidth*=2;
    console.log("columnWidth:"+columnWidth);
    //move first row to center to mouse
    difference=selectedRowFromStart-rowsStart
    rowsStart=int(rowsStart+difference/2);
    
    currentDate_Temp=new Date(currentDate_);
    for(let i=0;i<int(selectedRow/2);i++)
    {
      currentDate_Temp.setHours(currentDate_Temp.getHours() + 1);
      avoidWeekendsForwards(currentDate_Temp);
    }
    currentDate_=currentDate_Temp;
    
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

backwardsOrForwardIsPressed=false

function backwards()
{
  // if (!backwardsOrForwardIsPressed)
  // {
  //   backwardsOrForwardIsPressed=true;
    
    //let size = 3*10/columnWidth;
    if (rowsStart>moveStep())
      rowsStart+=-moveStep();
    
    //new
    currentDate_Temp=new Date(currentDate_);
    currentDate_Temp.setHours(currentDate_Temp.getHours() - moveStep());
    avoidWeekendsBackwards(currentDate_Temp);
    // while (currentDate_Temp.getDay()==6 || currentDate_Temp.getDay()==0) //avoid weekends
    //   currentDate_Temp.setHours(currentDate_Temp.getHours() - 1);
    
    if(currentDateStart<currentDate_Temp)
      currentDate_=currentDate_Temp

  //   backwardsOrForwardIsPressed=false;
  // }
}

function forward()
{
  // if (!backwardsOrForwardIsPressed)
  // {
  //   backwardsOrForwardIsPressed=true;
    //let size = 3*10/columnWidth;
    if (rowsStart<table.getRowCount()-moveStep())
        rowsStart+=moveStep();

    //new
    currentDate_Temp=new Date(currentDate_);
    currentDate_Temp.setHours(currentDate_Temp.getHours() + moveStep());
    avoidWeekendsForwards(currentDate_Temp);
    // while (currentDate_Temp.getDay()==6 || currentDate_Temp.getDay()==0) //avoid weekends
    //   currentDate_Temp.setHours(currentDate_Temp.getHours() + 1);
    
    if(currentDateEnd>currentDate_Temp)
    currentDate_=currentDate_Temp

  //   backwardsOrForwardIsPressed=false;
  // }
}

function avoidWeekendsForwards(date)
{
  while (date.getDay()==6 || date.getDay()==0)
  date.setHours(date.getHours() + 1);
}
function avoidWeekendsBackwards(date)
{
  while (date.getDay()==6 || date.getDay()==0)
    date.setHours(date.getHours() - 1);
}