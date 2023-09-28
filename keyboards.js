var mainMenuButton = [{
            text: `🔺 Головне меню`,
            callback_data: 'start'
          }]

let days = getDays(numberOfDays)

let inlineKeyboardForDays = days.map((day) => {
  return {
    text: day,
    callback_data: 'day, ' + day
  }
})
inlineKeyboardForDays = sliceIntoChunks(inlineKeyboardForDays, 2)
inlineKeyboardForDays.push(mainMenuButton)
var daysKeyBoard = { 
            inline_keyboard: inlineKeyboardForDays,
            one_time_keyboard: true,
            resize_keyboard: true
            };

function isTodayDate(dateStr){ // exm '27.03.23'
  let spDateStr = dateStr.split('.') //exm ['27', '03', '23']
  let selectedDay = Number(spDateStr[0])
  let selectedMonth = Number(spDateStr[1])
  let selectedYear = Number(spDateStr[2])
  let today = new Date()
  let currDay = today.getDate()
  let currMonth = today.getMonth() + 1
  let currYear = today.getYear() % 100
  return selectedDay === currDay && selectedMonth === currMonth && selectedYear === currYear
}

function getFreeHours(i, j, id, isEmpty=true) {
  let userName = getValueFromStore(id, 'name')
  let dateStr = getValueFromStore(id, 'date')
  let isToday = isTodayDate(dateStr)
  let currentHour = new Date().getHours()
  
  console.log('userName ', userName)
  let range = sheet.getRange(i, j, endHour - startHour, countProclaimers); //get day cells
  let vals = range.getValues();
  let hours = []
  console.log(vals)
  for (let k = 0; k < vals.length; k++) {
    let hour = startHour + k
    if (isEmpty && isToday && hour < currentHour) 
      continue
    let names = vals[k]
    let left = names[0] 
    let right = names[1]
    console.log('left ', left)
    console.log('right ', right)
    if (isEmpty ? ((left === '' || right === '') && left !== userName && right !== userName) 
      : (left === userName ||  right === userName)){
      let hourObj = {
        formattedHour: `${hour}:00-${hour + 1}:00`,
        numHour: hour,
        i: Number(i) + Number(k),
        j: left === userName ? 2 : 3
      }
      hours.push(hourObj)
    }
  }
  console.log(hours)
  return hours
}

function getFreeHoursKeyboard(i, j, command, id, isEmpty){
  let freeHours = getFreeHours(i+2, j+1, id, isEmpty )
    let inlineKeyboardForHours = freeHours.map((hourObj) => {
      return {
        text: hourObj.formattedHour,
        callback_data: `${command}, ${hourObj.formattedHour}, ${hourObj.numHour}, ${hourObj.i}, ${hourObj.j}`
      }
    })
    
    inlineKeyboardForHours = sliceIntoChunks(inlineKeyboardForHours, 2)
    inlineKeyboardForHours.push([
            {
              text: "🔙 Вибрати інший день",
              callback_data: 'choose_another_day'
            }
          ])
    inlineKeyboardForHours.push(mainMenuButton)
    let hoursKeyboard = { 
            inline_keyboard: inlineKeyboardForHours,
            one_time_keyboard: true,
            //resize_keyboard: true
            };
    return hoursKeyboard
}

function getConfirmInlineKayboard(yesCallback, noCallback){
  var confirmKeyboard = {
        inline_keyboard: [
          [{
            text: `${yesIcon} Так`,
            callback_data: yesCallback
          }, {
            text: `${noIcon} Ні`,
            callback_data: noCallback
          }],
        ],
        one_time_keyboard: true,
        resize_keyboard: true
      }
  return confirmKeyboard
}

function getCustomInlineKayboard(inlineKeyboardData){
  var confirmKeyboard = {
        inline_keyboard: inlineKeyboardData,
        one_time_keyboard: true,
        resize_keyboard: true
      }
  return confirmKeyboard
}

function getProclaimersKeyboard(userVals, i, j){
  let proclaimers = [], k = 0
  for (let userName of userVals) {
    if (userName !== ''){
      proclaimers.push({
        text: userName,
        callback_data: `cancel_assignment, ${userName}, ${i}, ${j + k}`
      })
    }
    k++
  }
  proclaimers = sliceIntoChunks(proclaimers, 1)  
  let proclaimersKeyboard = { 
          inline_keyboard: proclaimers,
          one_time_keyboard: true,
          };
  return proclaimersKeyboard
}
