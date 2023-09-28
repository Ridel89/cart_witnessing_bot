
function capitalizeFirstLetter (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getDays(n=7) {
  let currDate = new Date();
  let options = { weekday: 'long', year: '2-digit', month: '2-digit', day: 'numeric' };
  let result = []
  for (var i = 0; i < n; i++) {
    let localeDayAndDate = currDate.toLocaleDateString('uk-UA', options)
    localeDayAndDate = capitalizeFirstLetter(localeDayAndDate)
    result.push( localeDayAndDate )
    currDate.setDate(currDate.getDate() + 1)
  }
  console.log(result)
  return result
}

function sliceIntoChunks(arr, chunkSize) {
    const res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}

function isAnysymbols(str) {
  return /(.*)\w+/g.test(str);
}

function setAllCellCoordsWithText() {
  clearScriptStore()
  let dataRange = sheet.getDataRange();
  let values = dataRange.getValues();

  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      let val = String(values[i][j]).trim()
      if ( val && val !== '' ) {
        let k = i+1
        let l = j+1
        console.log(`${k},${l}`)
        console.log(val)
        scriptProperties.setProperty(`${k},${l}`,'')
      }
    }    
  }  
}

function shiftStrDate(strDate, dayShift){
	let sp = strDate.split(' ')
  let parts = sp[1].split(".");
  let prevDate = new Date(parseInt(parts[2], 10) + 2000,
                  parseInt(parts[1], 10) - 1,
                  parseInt(parts[0], 10));
	prevDate.setDate(prevDate.getDate() + dayShift )
	let options = { weekday: 'long', year: '2-digit', month: '2-digit', day: 'numeric' };
	let localeDayAndDate = prevDate.toLocaleDateString('uk-UA', options)
	return localeDayAndDate
}


function findCellCoords(text) {
  let dataRange = sheet.getDataRange();
  let values = dataRange.getDisplayValues();
  //console.log(values)
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      let val = String(values[i][j]).toLowerCase()      
      //console.log(typeof val)
      //console.log(val)
      if ( val.includes(text.toLowerCase()) ) {
        console.log(i, j)
        return [i, j]
      }
    }    
  }
  return [-1, -1]  
}

function dataShifter(){
  let days = getDays(numberOfDays)
  let prevDate = shiftStrDate(days[0], -1)
  days.unshift(prevDate)
  console.log(days)
  let dayCoords = []
  for (let i = 1; i < days.length; i++){
    let prevDayAndDateStr = days[i-1].toLowerCase()
    
    console.log(prevDayAndDateStr)
    const [sr, sc] = findCellCoords(prevDayAndDateStr)
    dayCoords.push([sr, sc])
    let sourceRange = sheet.getRange(sr+2, sc+1);
    let nextDayAndDateStr = days[i].toLowerCase()
    console.log(nextDayAndDateStr)
    const [dr, dc] = findCellCoords(nextDayAndDateStr)
    if (dr === -1)
      continue
    let destinationRange = sheet.getRange(dr+2, dc+1, endHour - startHour, countProclaimers);

    destinationRange.moveTo(sourceRange); //what move to where
  }
  console.log(dayCoords)
  dayCoords.forEach( (coords, i) => {
    let day = days[i + 1]
    let r = coords[0] + 1
    let c = coords[1] + 1
    console.log(day, r, c)
    sheet.getRange(r, c).setValue( day )
  })
  setAllCellCoordsWithText()
}

function createEmptySchedule(countDays=14, startHour=9, endHour=18){
  let step = 2
  let row = 2
  let backColor = '#fce5cd'
  let days = getDays(countDays)
  for (let i = 0; i < countDays; i++){
    sheet.getRange(row, 1).setBackground(backColor)
    sheet.getRange(row, 2, 1, 2).merge().setBackground(backColor)
    setFormattingText(sheet.getRange(row, 2), days[i], 'center', 'bold')
    for (let j = startHour, k = 1; j < endHour; j++, k++){
      let rng = sheet.getRange(row + k, 1)
      rng.setBackground(backColor)
      setFormattingText(rng, `${j}:00-${j+1}:00`, 'left')
    }
    row += step + endHour - startHour
  }
}

function changeFont() {
  // var FontStyle = {};
  // FontStyle[DocumentApp.Attribute.FONT_FAMILY] = 'Arial';
  // FontStyle[DocumentApp.Attribute.FONT_SIZE] = 14;

  // body.setAttributes(FontStyle);
  // var ss = SpreadsheetApp.getActiveSpreadsheet()
  // var thisfont = ss.getSpreadsheetTheme().getFontFamily()
  // var newfont = 'Caveat'
  // ss.getSpreadsheetTheme().setFontFamily(newfont)
  // var currentfont = ss.getSpreadsheetTheme().getFontFamily()
}

//test funcs=====================================================

function test1() {
  let days = getDays(numberOfDays)
  console.log(days)
}






