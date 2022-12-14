function candlestickDisplay() {

  if (table) {

    let rowsScreenEndFromStart = rowsStart + (width - 40) / columnWidth;
    let rowsScreen = (width - 40) / columnWidth;
    
    // console.log(0);

    //identify chart low high
    let valueMax = -Infinity;
    let valueMin = Infinity;    
    for (i = rowsStart; i < rowsScreenEndFromStart + 1 && i < table.getRowCount() ; i++) {
      // console.log("i: "+i);
      let H1_High = table.get(i, 3);
      let H1_Low = table.get(i, 4);
      if (H1_High > valueMax)
        valueMax = H1_High;
      if (H1_Low < valueMin)
        valueMin = H1_Low;
    }
    
    // console.log(1);
    
    //Draw candlesticks
    for (i = rowsStart; i < rowsScreenEndFromStart + 1 && i < table.getRowCount() ; i++) {
      let x = columnWidth * (i - rowsStart) + 20;

      //Candlesticks - H4
      if (state_H4 && table.get(i, "H4") & columnWidth>=1.2 & columnWidth<20)
      {
        let H4_Open = table.get(i, "H4_Open");
        let H4_Close = table.get(i, "H4_Close");
        let H4_High = table.get(i, "H4_High");
        let H4_Low = table.get(i, "H4_Low");
        let H4_Open_y = map(H4_Open, valueMin, valueMax, 0, -height + 40);
        let H4_Close_y = map(H4_Close, valueMin, valueMax, 0, -height + 40);
        let H4_High_y = map(H4_High, valueMin, valueMax, 0, -height + 40);
        let H4_Low_y = map(H4_Low, valueMin, valueMax, 0, -height + 40);
        
        strokeWeight(3);
        line(x + columnWidth / 4*7, height - 20 + H4_Low_y, x + columnWidth / 4*7, height - 20 + H4_High_y);
        strokeWeight(1);
        if (H4_Close > H4_Open)
          fill(0, 255, 0,50);
        else
          fill(255, 0, 0,50);

        rect(x, height - 20 + H4_Open_y, columnWidth / 2 *7, H4_Close_y - H4_Open_y);
      }

      //Candlesticks - H1
      if (state_H1 & columnWidth>=5)
      {
        let H1_Open = table.get(i, 5);
        let H1_Close = table.get(i, 2);
        let H1_High = table.get(i, 3);
        let H1_Low = table.get(i, 4);
        let H1_Open_y = map(H1_Open, valueMin, valueMax, 0, -height + 40);
        let H1_Close_y = map(H1_Close, valueMin, valueMax, 0, -height + 40);
        let H1_Low_y = map(H1_Low, valueMin, valueMax, 0, -height + 40);
        let H1_High_y = map(H1_High, valueMin, valueMax, 0, -height + 40);
        

        line(x + columnWidth / 4, height - 20 + H1_Low_y, x + columnWidth / 4, height - 20 + H1_High_y);
        if (H1_Close > H1_Open)
          fill(0, 255, 0);
        else
          fill(255, 0, 0);
        rect(x, height - 20 + H1_Open_y, columnWidth / 2, H1_Close_y - H1_Open_y);
      }
    }

    //NEW - find low and high
    let currentDate=new Date(dateToString(currentDate_));
    let maxIterations = 5000;
    let iteration = 0;
    let valueMaxByDate = -Infinity;
    let valueMinByDate = Infinity;
    let candleStickCurrent=0;
    // for (i = 0; i < rowsScreen + 1 ; i++) {
    while (candleStickCurrent <= rowsScreen && iteration<maxIterations)
    {
      dateToString_=dateToString(currentDate);
      if(tableNewDic[dateToString_] !== undefined && iteration<maxIterations)
      {
        if (currentDate.getDay()!=6 && currentDate.getDay()!=0) //avoid weekends
        {
          let H1_High = tableNewDic[dateToString_]["High"];
          let H1_Low = tableNewDic[dateToString_]["Low"];
          if (H1_High > valueMaxByDate)
            valueMaxByDate = H1_High;
          if (H1_Low < valueMinByDate)
            valueMinByDate = H1_Low;

          candleStickCurrent+=1;
        }
      }
      iteration=iteration+1;
      currentDate.setHours(currentDate.getHours() + 1);      
    }

    //new Candlesticks - H4 - Managed by Date
    if (state_H4_new)
    {
      factor=4;
      candleStickEnd = (width - 40) / columnWidth / factor;
      let rowsEndDate=new Date(rowsStartDateString);
      // let currentDate=new Date(rowsStartDateString);
      let currentDate=new Date(dateToString(currentDate_));
      let candleStickCurrent=0;
      rowsEndDate.setHours(currentDate.getHours() + rowsScreenEndFromStart-rowsStart);    
      let x = 20;
      let maxIterations = 1000;
      let iteration = 0;
      while (candleStickCurrent <= rowsScreen/factor && iteration<maxIterations)
      {
        let start = 4-currentDate.getHours()%4;
        if (start!=4)
        {
          x = x + start*columnWidth;
          currentDate.setHours(currentDate.getHours() + start);
        }

        dateToString_=dateToString(currentDate);

        if(tableNewDic[dateToString_] !== undefined)
        {
          if (currentDate.getDay()!=6 && currentDate.getDay()!=0) //avoid weekends
          {
            let H4_Open = tableNewDic[dateToString_]["H4_Open"];
            let H4_Close = tableNewDic[dateToString_]["H4_Close"];
            let H4_High = tableNewDic[dateToString_]["H4_High"];
            let H4_Low =  tableNewDic[dateToString_]["H4_Low"];
            let H4_Open_y = map(H4_Open, valueMinByDate, valueMaxByDate, 0, -height + 40);
            let H4_Close_y = map(H4_Close, valueMinByDate, valueMaxByDate, 0, -height + 40);
            let H4_High_y = map(H4_High, valueMinByDate, valueMaxByDate, 0, -height + 40);
            let H4_Low_y = map(H4_Low, valueMinByDate, valueMaxByDate, 0, -height + 40);
            
            strokeWeight(3);
            line(x + columnWidth / 4*7, height - 20 + H4_Low_y, x + columnWidth / 4*7, height - 20 + H4_High_y);
            strokeWeight(1);
            if (H4_Close > H4_Open)
              fill(0, 255, 0,50);
            else
              fill(255, 0, 0,50);

            rect(x, height - 20 + H4_Open_y, columnWidth / 2 *7, H4_Close_y - H4_Open_y);
            
            //next candlistick x position 
            x = x + columnWidth*4;
            candleStickCurrent+=1;
          }
        }
        
        //next candlistick date
        currentDate.setHours(currentDate.getHours() + 4);
        iteration=iteration+1;
      }
    }

    //new Candlesticks - H1 - Managed by Date
    if (state_H1_new)
    {      
      candleStickEnd = (width - 40) / columnWidth;
      let rowsEndDate=new Date(rowsStartDateString);
      // let currentDate=new Date(rowsStartDateString);
      let currentDate=new Date(dateToString(currentDate_));
      let candleStickCurrent=0;
      rowsEndDate.setHours(currentDate.getHours() + rowsScreenEndFromStart-rowsStart);    
      let x = 20;
      let maxIterations = 5000;
      let iteration = 0;
      while (candleStickCurrent <= rowsScreen && iteration<maxIterations)
      {
        dateToString_=dateToString(currentDate);
        if (tableNewDic[dateToString_] !== undefined)
        {
          if (currentDate.getDay()!=6 && currentDate.getDay()!=0) //avoid weekends
          {
            let H1_Open = tableNewDic[dateToString_]["Open"];
            let H1_Close = tableNewDic[dateToString_]["Close"];
            let H1_High = tableNewDic[dateToString_]["High"];
            let H1_Low =  tableNewDic[dateToString_]["Low"];
            let H1_Open_y = map(H1_Open, valueMinByDate, valueMaxByDate, 0, -height + 40);
            let H1_Close_y = map(H1_Close, valueMinByDate, valueMaxByDate, 0, -height + 40);
            let H1_Low_y = map(H1_Low, valueMinByDate, valueMaxByDate, 0, -height + 40);
            let H1_High_y = map(H1_High, valueMinByDate, valueMaxByDate, 0, -height + 40);      

            line(x + columnWidth / 4, height - 20 + H1_Low_y, x + columnWidth / 4, height - 20 + H1_High_y);
            if (H1_Close > H1_Open)
              fill(0, 255, 0);
            else
              fill(255, 0, 0);
            rect(x, height - 20 + H1_Open_y, columnWidth / 2, H1_Close_y - H1_Open_y);
            
            //next candlistick x position 
            x = x + columnWidth;
            candleStickCurrent+=1;
          }
        }
        
        //next candlistick date
        currentDate.setHours(currentDate.getHours() + 1);
        iteration=iteration+1;
      }
    }
    
    
    // console.log(2);

    //Identify Mouse position in chart
    selectedRowFromStart=floor((mouseX-20)/columnWidth+rowsStart);
    selectedRow=floor((mouseX-20)/columnWidth);

    console.log("selectedRow: "+selectedRowFromStart);

    // console.log(tableDatetime[columnsStart]);
    // console.log(dateToString(tableDatetime[columnsStart]));
    fill(0);
    
    // console.log(tableDatetime[rowsStart]);
    // console.log(3)
    // console.log(tableDatetime[rowsStart]);
    // console.log(dateToString(tableDatetime[rowsStart]));
    
    //OLD
    // if (rowsStart>=0)
    //   text(dateToString(tableDatetime[rowsStart]), 20, height - 20);
    //NEW
    text(dateToString(currentDate_), 20, height - 30);

    // console.log(dateToString(tableDatetime[rowsEnd]));
    if (rowsScreenEndFromStart<table.getRows())
      text(dateToString(tableDatetime[rowsScreenEndFromStart]), width-100, height - 20);    
    // console.log(4);
    fill(255);
    rect(mouseX-50,mouseY+45,150,20)
    fill(0);
    if (selectedRowFromStart > 0 & selectedRowFromStart<table.getRowCount()) text(dateToString(tableDatetime[selectedRowFromStart]), mouseX-50,mouseY+50,150,50);
    text(dateToString(currentDate_), 20, height - 30);
    // console.log(5);
  }
}

function dateToString(date)
{
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  // const month = date.getMonth()+1;
  // console.log("month:"+month);
  const day = ("0" + date.getDate()).slice(-2); 
  // const day = date.getDate();
  const hours = ("0" + date.getHours()).slice(-2); 
  // const hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2); 
  // const minutes = date.getMinutes();
  const seconds = ("0" + date.getSeconds()).slice(-2); 
  // const seconds = date.getSeconds();
  
  result=year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
  // console.log(date);
  // console.log(result);
  return result;
}
