let state_H1=false;
let state_H4=false;
let state_H1_new=true;
let state_H4_new=true;

let selectedRowFromStart=0;
let selectedRow=0;
var datetimeStringDic = {};
let table;
let tableDatetime = []
let tableNew = new p5.Table(0);
let tableNewDic = {};
let rowsStart = 1;
let rowsStartDateString;
//let columnsEnd = 20;
let columnWidth = 10;
let currentDate_;
let currentDateStart;
let currentDateEnd;

function setup() {


  //GET REQUESTS
  rowsStartGet=getQueryVariable("rowsStart");
  if (rowsStartGet!=-1){

    // rowsStart=rowsStartGet
  }
  console.log("rowsStart:"+rowsStart);
  console.log("rowsStartGet:"+rowsStartGet);

  // location.search = queryString.stringify(rowsStart+1);
  console.log("location.search");
  console.log(location.search);
  var locationSearch = parseQuery(location.search);
  console.log(locationSearch);
  // document.location.hash = 'lookAtMeNow';


  // const nextURL = 'www.google.com';
  // const nextTitle = 'My new page title';
  // const nextState = { additionalInformation: 'Updated the URL with JS' };
  // // This will create a new entry in the browser's history, without reloading
  // window.history.pushState(nextState, nextTitle, nextURL);
  // // This will replace the current entry in the browser's history, without reloading
  // window.history.replaceState(nextState, nextTitle, nextURL);

  // window.history.pushState("object or string", "Title", "/new-url");
  // location.search="?rowsStart=101";

  //READ DATA
  // textAlign(CENTER,CENTER);
  let canvas = createCanvas(1500, 700);
  canvas.parent('sketch-container');

  let url = "https://raw.githubusercontent.com/alexberd/CSV-Collection/main/ExampleTradingData.csv";
  // let url = "https://raw.githubusercontent.com/alexberd/CSV-Collection/main/ExampleTradingData_min.csv";
  // let url = "https://raw.githubusercontent.com/alexberd/CSV-Collection/main/ExampleTradingData_min2.csv";
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
  table.addColumn("M5"); //1
  table.addColumn("M15"); //2
  table.addColumn("M30"); //3

  table.addColumn("H1"); //4


  table.addColumn("H4"); //5
  table.addColumn("H4_Open");
  table.addColumn("H4_Close");
  table.addColumn("H4_High");
  table.addColumn("H4_Low");

  table.addColumn("D"); //6
  table.addColumn("W"); //7
  table.addColumn("M"); //8

  table.addColumn("datetime");


  createOldTable(table);
  createNewTable(table);
  
  canvasDisplay()
}

function createOldTable(table)
{
// const d = new Date(2018, 11, 24, 10, 33, 30);
  // console.log(d);
  // const a = new Date('01 Jan 1970 00:00:00 GMT');
  // console.log(a);
  // const unixTimeZero = Date.parse('01 Jan 1970 00:00:00 GMT');
  //console.log(unixTimeZero.toUTCString());

  let H4_Previous_i=-1;
  let H4_Open=-1;
  let H4_Close=-1;
  let H4_Low=Infinity;
  let H4_High=-Infinity;


  // console.log(table.columns);
  // console.log(table.getRowCount());
  for(i=0;i<table.getRowCount();i++)
  {
    //read and create tableDatetime
    let date = table.get(i, 0).replace("."," ");
    date = date.replace("."," ");
    let time = table.get(i, 1);
    let datetimeString = date + " " + time;
  //   console.log(datetimeString);


  //   Find duplicated datetimes and remove from table
    if (datetimeString in datetimeStringDic)
    {
      table.removeRow(i);
      i=i-1;
      continue;
    }
    datetimeStringDic[datetimeString]="";

  //   table.set(i, "datetime", datetimeString);

    const datetime = new Date(datetimeString);
    // console.log(datetime);

    tableDatetime.push(datetime);

    time=table.get(i, 1).split(":");

    //H4
    if(time[1]=="00" && parseInt(time[0])%4==0)
    {
      table.set(i, 'H4', true);
      // console.log(time);

      H4_Open=parseFloat(table.get(i, 'Open'));
      table.set(i, 'H4_Open', H4_Open);
      if(H4_Previous_i!=-1)
      {
        // console.log("H4_Previous_i"+H4_Previous_i);
        table.set(H4_Previous_i, 'H4_Close', H4_Close);

        table.set(H4_Previous_i, 'H4_Low', H4_Low);
        table.set(H4_Previous_i, 'H4_High', H4_High);

        // console.log("H4_Open"+H4_Open);
        // console.log("H4_Close"+H4_Close);
        // console.log("H4_Low"+H4_Low);
        // console.log("H4_High"+H4_High);
      }
      H4_Low=Infinity;
      H4_High=-Infinity;
      H4_Previous_i=i;
    }
    else
    {
      table.set(i, 'H4', false);
    }
    if (table.get(i, 'High')>H4_High) H4_High=parseFloat(table.get(i, 'High'));
    if (table.get(i, 'Low')<H4_Low) H4_Low=parseFloat(table.get(i, 'Low'));
    H4_Close=parseFloat(table.get(i, 'Close'));

    //
  }
}

function createNewTable(table)
{
  tableNew.addColumn("Datetime");
  tableNew.addColumn("Open");
  tableNew.addColumn("Close");
  tableNew.addColumn("Low");
  tableNew.addColumn("High");

  dateMin=new Date("2100 00 00 00:00");
  dateMax=new Date("1900 00 00 00:00");
  for(i=0;i<table.getRowCount();i++)
  {
    //read and create tableDatetime
    let date = table.get(i, 0).replace("."," ");
    date = date.replace("."," ");
    let time = table.get(i, 1);
    let datetimeString = date + " " + time;
    const datetime = new Date(datetimeString);
    if (datetime>dateMax) dateMax=datetime;
    if (datetime<dateMin) dateMin=datetime;
  }
  rowsStartDateString=dateToString(dateMin);
  currentDate_=new Date(rowsStartDateString);

  currentDateStart=new Date(dateMin);
  currentDateEnd=new Date(dateMax);

  // const dates = [];
  let date=dateMin;
  while (date <= dateMax) {
    let newRow = tableNew.addRow();
    // date_=new Date(dateToString(date));
    newRow.setString('Datetime', dateToString(date));
    tableNewDic[dateToString(date)]={};

    // dates.push(new Date(date));
    // date.setDate(date.getDate() + 1);
    date.setHours(date.getHours() + 1);
  }
  // console.log(tableNew);
  // console.log(tableNewDic);

  //H1
  for(i=0;i<table.getRowCount();i++)
  {
    //read and create tableDatetime
    let date = table.get(i, 0).replace(".","-");
    date = date.replace(".","-");
    let time = table.get(i, 1);
    let datetimeString = date + " " + time;
    // tableNewDic[datetimeString+":00"]={};
    try
    {
      tableNewDic[datetimeString+":00"]["Open"]=parseFloat(table.get(i,"Open"));
      tableNewDic[datetimeString+":00"]["Close"]=parseFloat(table.get(i,"Close"));
      tableNewDic[datetimeString+":00"]["Low"]=parseFloat(table.get(i,"Low"));
      tableNewDic[datetimeString+":00"]["High"]=parseFloat(table.get(i,"High"));
    }
    catch(err) {
      console.log(err.message);
    }
    // let newRow = tableNew.matchRow(new RegExp(datetimeString+":*"),"Datetime");

  //   let newRow = tableNew.addRow();
  //   newRow.setString('Datetime', datetimeString);
    // newRow.setString('Open', table.get(i,"Open"));
    // newRow.setString('Close', table.get(i,"Close"));
    // newRow.setString('Low', table.get(i,"Low"));
    // newRow.setString('High', table.get(i,"High"));

  }

  //H4
  for (const [key, value] of Object.entries(tableNewDic)) {
    date = new Date(key);
    if(date.getHours()%4==0)
    {
      H4_Open = parseFloat(value['Open']);
      H4_Low=parseFloat(value["Low"]);
      H4_High=parseFloat(value["High"]);

      for(let i=0;i<3;i++)
      {
        date.setHours(date.getHours() + 1);
        dateToString_=dateToString(date);
        if (tableNewDic[dateToString_] !== undefined)//avoid end
        {
          if (tableNewDic[dateToString_]["Low"]<H4_Low) H4_Low=parseFloat(tableNewDic[dateToString_]["Low"]);
          if (tableNewDic[dateToString_]["High"]>H4_High) H4_High=parseFloat(tableNewDic[dateToString_]["High"]);
        }
      }
      if (tableNewDic[dateToString_] !== undefined)//avoid end
      {
        value['H4_Open']= H4_Open;
        value['H4_Low'] = H4_Low;
        value['H4_High'] = H4_High;
        value['H4_Close'] = parseFloat(tableNewDic[dateToString_]['Close']);
      }
    }
  }


  // console.log(tableNew);
  // console.log(tableNewDic);
}