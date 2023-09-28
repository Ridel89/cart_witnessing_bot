function getAssignedDays(id) {
  
  let userName = getValueFromStore(id, 'name').trim().toLowerCase()
  //console.log(userName)
  let dataRange = sheet.getDataRange();
  let values = dataRange.getDisplayValues();
  let re = /(.*),\s\d\d.\d\d.\d\d/
  const days = []
  //console.log(values)
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      let val = String(values[i][j]).trim().toLowerCase()
      if ( val === userName ) {
        //console.log(i, j)
        let k = i - 1
        while( !re.test(values[k][1]) ){
          k--
          //console.log(k)
        }
        let dayVal = capitalizeFirstLetter(values[k][1])
        //console.log(dayVal)
        if (!days.includes(dayVal) && dayVal !== '') {
          // ✅ only runs if value not in array
          days.push(dayVal)
        }
        
      }
    }    
  } 
  return days
  console.log(days)
}

function getDaysForUnassignKeyboard(id){
  let userDays = getAssignedDays(id)
  console.log('userDays ', userDays) 
  let timestamp = Math.floor(Date.now() / 1000)
  let inlineKeyboardForDays = userDays.map((day) => {
    return {
      text: day,
      callback_data: `day, ${day}, ${timestamp}`
    }
  })
  
  inlineKeyboardForDays = sliceIntoChunks(inlineKeyboardForDays, 2)
  inlineKeyboardForDays.push(mainMenuButton)
  let daysKeyBoard = { 
            inline_keyboard: inlineKeyboardForDays,
            one_time_keyboard: true,
            resize_keyboard: true
            };
  return daysKeyBoard
}

function notifyAllUnassignedDayTime(day, date, formattedHour, id){
  let msg = `${bellIcon} Звільнився час - <b>${day}, ${date} ${formattedHour}!</b>`
  let keyboardData2 = [
          [{
            text: `Ok`,
            callback_data: `remove_message`
          }]
        ]
  let okRemove = getCustomInlineKayboard(keyboardData2)
  let users = userProperties.getProperties()
  for (let userId in users) {
    if (userId != id){
      console.log(userId)
      sendMessage(userId, msg, okRemove)
      Utilities.sleep(40) 
    }
    
  }
}

