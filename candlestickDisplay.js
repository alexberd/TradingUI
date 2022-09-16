function candlestickDisplay() {
  if (table) {
    columnsEnd = columnsStart + (width - 40) / columnWidth;

    //set max min
    let valueMax = -Infinity;
    let valueMin = Infinity;
    for (i = columnsStart; i < columnsEnd + 1; i++) {
      let valueHigh = table.get(i, 3);
      let valueLow = table.get(i, 4);
      if (valueHigh > valueMax)
        valueMax = valueHigh;
      if (valueLow < valueMin)
        valueMin = valueLow;
    }

    for (i = columnsStart; i < columnsEnd + 1; i++) {
      let valueClose = table.get(i, 2);
      let valueHigh = table.get(i, 3);
      let valueLow = table.get(i, 4);
      let valueOpen = table.get(i, 5);
      let x = columnWidth * (i - columnsStart) + 20;

      let yLow = map(valueLow, valueMin, valueMax, 0, -height + 40);
      let yHigh = map(valueHigh, valueMin, valueMax, 0, -height + 40);

      let yClose = map(valueClose, valueMin, valueMax, 0, -height + 40);
      let yOpen = map(valueOpen, valueMin, valueMax, 0, -height + 40);

      line(x + columnWidth / 4, height - 20 + yLow, x + columnWidth / 4, height - 20 + yHigh);
      if (valueClose > valueOpen)
        fill(0, 255, 0);
      else
        fill(255, 0, 0);
      rect(x, height - 20 + yOpen, columnWidth / 2, yClose - yOpen);

      fill(255);

    }

    selected=floor((mouseX-20)/columnWidth+columnsStart);

    console.log(selected);

    // console.log(tableDatetime[columnsStart]);
    // console.log(dateToString(tableDatetime[columnsStart]));
    fill(0);
    text(dateToString(tableDatetime[columnsStart]), 20, height - 20);
    text(dateToString(tableDatetime[columnsEnd]), width-100, height - 20);
    
    
    fill(255);
    rect(mouseX-50,mouseY+45,100,20)
    fill(0);
    if (selected > 0 & selected<table.getRowCount()) text(dateToString(tableDatetime[selected]), mouseX-50,mouseY+50,100,50);
  }
}

function dateToString(date)
{
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  result=year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;

  return result;
}
