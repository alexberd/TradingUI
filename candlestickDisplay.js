function candlestickDisplay() {
  if (table) {
    rowsEnd = rowsStart + (width - 40) / columnWidth;

    //set max min
    let valueMax = -Infinity;
    let valueMin = Infinity;
    for (i = rowsStart; i < rowsEnd + 1; i++) {
      let valueHigh = table.get(i, 3);
      let valueLow = table.get(i, 4);
      if (valueHigh > valueMax)
        valueMax = valueHigh;
      if (valueLow < valueMin)
        valueMin = valueLow;
    }

    for (i = rowsStart; i < rowsEnd + 1; i++) {
      let x = columnWidth * (i - rowsStart) + 20;

      //H1
      if (table.get(i, "H1"))
      {
        let H1_Close = table.get(i, "H1_Close");
        let H1_Open = table.get(i, "H1_Open");
        let H1_High = table.get(i, "H1_High");
        let H1_Low = table.get(i, "H1_Low");
        let H1_Low_y = map(H1_Low, valueMin, valueMax, 0, -height + 40);
        let H1_High_y = map(H1_High, valueMin, valueMax, 0, -height + 40);
        let H1_Close_y = map(H1_Close, valueMin, valueMax, 0, -height + 40);
        let H1_Open_y = map(H1_Open, valueMin, valueMax, 0, -height + 40);
        
        strokeWeight(3);
        line(x + columnWidth / 4*7, height - 20 + H1_Low_y, x + columnWidth / 4*7, height - 20 + H1_High_y);
        strokeWeight(1);
        if (H1_Close > H1_Open)
          fill(0, 255, 0,50);
        else
          fill(255, 0, 0,50);

        rect(x, height - 20 + H1_Open_y, columnWidth / 2 *7, H1_Close_y - H1_Open_y);
      }

      //Candlesticks
      {
        let valueClose = table.get(i, 2);
        let valueHigh = table.get(i, 3);
        let valueLow = table.get(i, 4);
        let valueOpen = table.get(i, 5);
        

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
      }

      //fill(255);
      
      

    }

    //Dates
    selected=floor((mouseX-20)/columnWidth+rowsStart);

    console.log(selected);

    // console.log(tableDatetime[columnsStart]);
    // console.log(dateToString(tableDatetime[columnsStart]));
    fill(0);
    // console.log(tableDatetime[rowsStart]);
    text(dateToString(tableDatetime[rowsStart]), 20, height - 20);
    text(dateToString(tableDatetime[rowsEnd]), width-100, height - 20);
    
    
    fill(255);
    rect(mouseX-50,mouseY+45,100,20)
    fill(0);
    if (selected > 0 & selected<table.getRowCount()) text(dateToString(tableDatetime[selected]), mouseX-50,mouseY+50,100,50);
  }
}

function dateToString(date)
{
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  // console.log("month:"+month);
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  result=year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
  // console.log(date);
  // console.log(result);
  return result;
}
