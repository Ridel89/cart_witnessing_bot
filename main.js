function doGet(e) {
  return HtmlService.createHtmlOutput("Hi there");
}

var mainMenuData = [[{
            text: `🔺 Головне меню`,
            callback_data: 'start'
          }]]
var mainMenuKeyboard = getCustomInlineKayboard(mainMenuData)

let frontSpace = '     '
let startKeyboardData = [
          [{
            text: `${frontSpace}${assignIcon} Записатись                        `,
            callback_data: assignCommand //assign_cart_witnessing
          }],
            [{
              text: `${frontSpace}${unassignIcon} Скасувати запис              `,
              callback_data: cancelCommand //cancel_cart_witnessing
            }
          ],
          [{
            text: `${frontSpace}${viewScheduleIcon} Переглянути графік         `,
            url: urlSs,
          }],[{
              text: `${frontSpace}${yourNameIcon} Змінити ім'я                       `,
              callback_data: changeNameCommand
            }
          ],[{
              text: `${frontSpace}${infoIcon} Інформація для вісників`,
              callback_data: infoCommand
            }
          ],
          [{
            text: `${frontSpace}${helpIcon} Допомога                           `,
            callback_data: helpCommand
          }]
        ]
let startKeyboard = getCustomInlineKayboard(startKeyboardData)

function removeSomeUserData(id){
  removeValueFromStore(id, 'coords')
  removeValueFromStore(id, 'numHour')
}


function handleText(id, text, messageId){
  let stage = getValueFromStore(id, 'stage')

  if (text === '/'+startCommand ){
    setValueToStore(id, 'stage', startCommand)
    removeSomeUserData(id)
    //editMessage(id, messageId, aboutMessage, startKeyboard);
    sendMessage(id, aboutMessage, startKeyboard);
  }

  if (text === '/'+helpCommand ){
    setValueToStore(id, 'stage', 'main_menu')
    removeSomeUserData(id)
    //deleteMessage(id, messageId)
    //editMessage(chat_id, message_id, text, keyboard)
    //editMessage(id, messageId, instruction, mainMenuKeyboard)
    sendMessage(id, instruction, mainMenuKeyboard);
  }

  if (text === '/'+infoCommand){
    setValueToStore(id, 'stage', 'main_menu')
    removeSomeUserData(id)
    //editMessage(id, messageId, infoMessage, mainMenuKeyboard);
    sendMessage(id, infoMessage, mainMenuKeyboard);
  }

  if (text === '/'+scheduleCommand){
    setValueToStore(id, 'stage', 'main_menu')
    removeSomeUserData(id)
     let scheduleReply = `${viewScheduleIcon} Для перегляду графіку перейдіть за посиланням: `//\n ' + urlSs;
     sendMessage(id, scheduleReply);
     sendMessage(id, urlSs);
    // sendMessage(id, 'Для продовження роботи, оберіть потрібну вам функцію:', startKeyboard);
  }

  if (text === '/'+assignCommand){
    setValueToStore(id, 'stage', 'main_menu')
    removeSomeUserData(id)
    setValueToStore(id, 'action', 'assign')
    //editMessage(id, messageId, chooseHourForAssign, daysKeyBoard)
    sendMessage(id, chooseHourForAssign, daysKeyBoard)
  }

  if (text === '/'+cancelCommand){
    setValueToStore(id, 'stage', 'main_menu')
    removeSomeUserData(id)
    setValueToStore(id, 'action', 'cancel_assign')
    let unassignDaysKeyboard = getDaysForUnassignKeyboard(id)
    if (unassignDaysKeyboard && unassignDaysKeyboard.inline_keyboard && unassignDaysKeyboard.inline_keyboard.length > 1){
      //editMessage(id, messageId, chooseHourForUnassign, unassignDaysKeyboard)
      sendMessage(id, chooseHourForUnassign, unassignDaysKeyboard)
    }else{
      //editMessage(id, messageId, `${alertIcon} Ви ще не записалися на жодний день!`)
      sendMessage(id, `${alertIcon} Ви ще не записалися на жодний день!`)
    }
  }

  if (text === '/'+changeNameCommand){
    setValueToStore(id, 'stage', 'main_menu')
    let userName = getValueFromStore(id, 'name')
    let confirmKeyboard = getConfirmInlineKayboard(`yes_change_name, ${messageId}`, 'start')
    //confirmKeyboard.inline_keyboard.push(mainMenuData[0])
    //editMessage(id, messageId, changeNameMessage(userName), confirmKeyboard)
    sendMessage(id, changeNameMessage(userName), confirmKeyboard)
  }

  if (stage === 'yes_change_name'){ 
    setValueToStore(id, 'stage', '')
    let clearedName = text.replace(/\s+/g, ' ').trim()
    setValueToStore(id, 'name', clearedName)
    deleteMessage(id, messageId)
    let messageId2 = getValueFromStore(id, 'messageId')
    deleteMessage(id, messageId2)
    //editMessage(id, messageId, nameChanged(text), mainMenuKeyboard)
     var mainMenuData1 = [[{
            text: `🔺 Головне меню`,
            callback_data: '/start'
          }]]
    var mainMenuKeyboard1 = getCustomInlineKayboard(mainMenuData1)
    sendMessage(id, nameChanged(clearedName), mainMenuKeyboard1)
    //sendMessage(id, 'Перейти в головне меню:', mainMenuKeyboard1)
  }
}

function handleCallbackData(id, data, messageId){
  let dataArr = data.split(',')
  let callbackDataCommand = dataArr[0]
  let action = getValueFromStore(id, 'action')
  let textIcon = action === 'assign' ? assignIcon : unassignIcon
  let stage = getValueFromStore(id, 'stage')

  if ( callbackDataCommand === 'day'){  //handle day of week =======================
    if (stage === 'day')
      return
    setValueToStore(id, 'stage', 'day')
    let dayStr = dataArr[1].trim()
    let dateStr = dataArr[2].trim()
    setValueToStore(id, 'day', dayStr)
    setValueToStore(id, 'date', dateStr)
    const [i, j] = findCellCoords(dateStr)
    setValueToStore(id, 'coords', JSON.stringify({i, j}))
    let hoursKeyboard = action === 'assign' ? getFreeHoursKeyboard(i, j, 'hour', id) : getFreeHoursKeyboard(i, j, 'hour_cancel', id, false)
    
    let chooseAnotherDayData = [
          [
            {
            text: "Вибрати інший день",
            callback_data: 'choose_another_day'
          }
          ]
        ]
    let chooseAnotherDayKeyboard = getCustomInlineKayboard(chooseAnotherDayData)
    if (hoursKeyboard && hoursKeyboard.inline_keyboard && hoursKeyboard.inline_keyboard.length > 2){
      //debugSheet.getRange(35, 1).setValue('ok choose hours');
      let actMsg = action === 'assign' ? 'Запис на стенд!' : 'Скасування запису!'
      let msg = `${textIcon} ${actMsg}\nВи вибрали - <b>${dayStr}, ${dateStr}</b>\nВиберіть годину:`
      //sendMessage(id, msg)
      editMessage(id, messageId, msg, hoursKeyboard)
      //sendMessage(id, `Або виберіть інший день`, chooseAnotherDayKeyboard)
    }else{
      editMessage(id, messageId, `${alertIcon} Нажаль на цей день - <b>${dayStr}, ${dateStr}</b> вільних годин немає! Виберіть інший день.`, chooseAnotherDayKeyboard)
    }
  }

  if (callbackDataCommand === startCommand){
    if (stage === startCommand)
      return
    setValueToStore(id, 'stage', startCommand)
    removeSomeUserData(id)
    editMessage(id, messageId, aboutMessage, startKeyboard);
    setValueToStore(id, 'stage', startCommand)
  }

  if (callbackDataCommand === assignCommand){
    if (stage === 'main_menu')
      return
    setValueToStore(id, 'stage', 'main_menu')
    removeSomeUserData(id)
    setValueToStore(id, 'action', 'assign')
    editMessage(id, messageId, chooseHourForAssign, daysKeyBoard)
  }

  if (callbackDataCommand === cancelCommand){
    if (stage === 'main_menu')
      return
    setValueToStore(id, 'stage', 'main_menu')
    removeSomeUserData(id)
    setValueToStore(id, 'action', 'cancel_assign')
    let unassignDaysKeyboard = getDaysForUnassignKeyboard(id)
    if (unassignDaysKeyboard && unassignDaysKeyboard.inline_keyboard && unassignDaysKeyboard.inline_keyboard.length > 1){
      editMessage(id, messageId, chooseHourForUnassign, unassignDaysKeyboard)
    }else{
      editMessage(id, messageId, `${alertIcon} Ви ще не записалися на жодний день!`, mainMenuKeyboard)
    }
  }

  if (callbackDataCommand === changeNameCommand){
   if (stage === 'main_menu')
      return
    setValueToStore(id, 'stage', 'main_menu')
    let userName = getValueFromStore(id, 'name')
    let confirmKeyboard = getConfirmInlineKayboard(`yes_change_name, ${messageId}`, 'start')
    //confirmKeyboard.inline_keyboard.push(mainMenuData[0])
    editMessage(id, messageId, changeNameMessage(userName), confirmKeyboard)
  }

   if (callbackDataCommand === helpCommand){
    if (stage === 'main_menu')
      return
    setValueToStore(id, 'stage', 'main_menu')
    removeSomeUserData(id)
    editMessage(id, messageId, instruction, mainMenuKeyboard)
  }

  if (callbackDataCommand === infoCommand){
    if (stage === 'main_menu')
      return
    setValueToStore(id, 'stage', 'main_menu')
    removeSomeUserData(id)
    editMessage(id, messageId, infoMessage, mainMenuKeyboard);
  }

  if (callbackDataCommand === 'hour' ){ // handle selected hour =============================== && 
    if (stage === 'hour')
      return
    setValueToStore(id, 'stage', 'hour')
    let formattedHour = dataArr[1].trim()
    let numHour = dataArr[2].trim()
    setValueToStore(id, 'formattedHour', formattedHour)
    setValueToStore(id, 'numHour', numHour)

     let keyboardData = [
          [{
            text: `${yesIcon} Так`,
            callback_data: 'yes_assign'
          }, {
            text: `${noIcon} Інша година`,
            callback_data: 'yes_continue_assign'
          }],
        ]
    keyboardData.push(mainMenuData[0])
    let confirmKeyboard = getCustomInlineKayboard(keyboardData)
    //let confirmKeyboard = getConfirmInlineKayboard(`yes_assign`, 'yes_continue_assign')
    let day = getValueFromStore(id, 'day')
    let date = getValueFromStore(id, 'date')
    let confirmMessage = `${textIcon} Ви впевненні, що хочете записатися в служіння в <b>${day} ${date} з ${formattedHour}</b>?`
    editMessage(id, messageId, confirmMessage, confirmKeyboard)
  }

  if (callbackDataCommand === 'hour_cancel'){ // && action === 'cancel_assign'
    if (stage === 'hour_cancel')
      return
    setValueToStore(id, 'stage', 'hour_cancel')
    let coords = getValueFromStore(id, 'coords')
    coords = JSON.parse(coords)
    //let {i, j} = coords
    let day = getValueFromStore(id, 'day')
    let date = getValueFromStore(id, 'date')
    let formattedHour = dataArr[1].trim()
    setValueToStore(id, 'formattedHour', formattedHour)
    //let numHour = dataArr[2].trim()
    // let ni = Number(i) + 2 + Number(numHour) - startHour
    // let range = sheet.getRange(ni, j+1, 1, countProclaimers);
    // let userVals = range.getValues();
    // proclaimersKeyboard = getProclaimersKeyboard(userVals[0], ni, j+1)
    let i = dataArr[3].trim()
    let j = dataArr[4].trim()
    let keyboardData = [
          [{
            text: `${yesIcon} Так`,
            callback_data: `yes_unassign, ${i}, ${j}`
          }, {
            text: `${noIcon} Інша година`,
            callback_data: 'yes_continue_unassign'
          }],
        ]
    keyboardData.push(mainMenuData[0])    
    let confirmKeyboard = getCustomInlineKayboard(keyboardData)
    editMessage(id, messageId, `${textIcon} Ви впевненні, що хочете скасувати служіння в <b>${day} ${date} з ${formattedHour}</b>?`, confirmKeyboard)
  }

  if (callbackDataCommand === 'cancel_assignment'){
    if (stage === 'cancel_assignment')
      return
    setValueToStore(id, 'stage', 'cancel_assignment')
    let i = dataArr[1].trim()
    let j = dataArr[2].trim()
    let confirmKeyboard = getConfirmInlineKayboard(`yes_unassign, ${i}, ${j}`, 'start')
    let day = getValueFromStore(id, 'day')
    let date = getValueFromStore(id, 'date')
    let formattedHour = getValueFromStore(id, 'formattedHour')
    let confirmMessage = `${textIcon} Ви впевненні, що хочете відмінити служіння в <b>${day} ${date} о ${formattedHour}</b> ?`
    editMessage(id, messageId, confirmMessage, confirmKeyboard)
  }

  if (callbackDataCommand === 'yes_assign'){
    if (stage === 'yes_assign')
      return
    setValueToStore(id, 'stage', 'yes_assign')
    assignUserToSchedule(id, messageId)
  }

  if (callbackDataCommand === 'yes_unassign'){
    if (stage === 'yes_unassign')
      return
    setValueToStore(id, 'stage', 'yes_unassign')
    let i = dataArr[1].trim()
    let j = dataArr[2].trim()
    scriptProperties.deleteProperty(`${i},${j}`)
    sheet.getRange(i, j).setValue('');
    let keyboardData = [
          [{
            text: `${yesIcon} Так`,
            callback_data: 'yes_continue_unassign'
          }, {
            text: `${noIcon} Інший день`,
            callback_data: 'choose_another_day'
          }],
          //  [{
          //   text: `${viewScheduleIcon} Переглянути графік`,
          //   url: urlSs,
          // }]
        ]
      keyboardData.push(mainMenuData[0])
      let continueUnassignKeyboard = getCustomInlineKayboard(keyboardData)
      let day = getValueFromStore(id, 'day')
      let date = getValueFromStore(id, 'date')
      let formattedHour = getValueFromStore(id, 'formattedHour')

      let keyboardData2 = [
          [{
            text: `${viewScheduleIcon} Переглянути графік`,
            url: urlSs,
          }]
        ]
    let viewSchedule = getCustomInlineKayboard(keyboardData2)

//`${textIcon} Скасовано запис на <b>${day}, ${date}</b> на годину: <b>${formattedHour}</b>!`
    let cancellMessage = `${textIcon} Ваш запис було скасовано!\n\
${calendarIcon} День і дата: <b>${day}, ${date}</b>\n\
${timeIcon} Час: <b>${formattedHour}</b>.\n`

    editMessage(id, messageId, cancellMessage, viewSchedule)
    sendMessage(id, `${exclamationIcon} Будь-ласка перегляньте графік і переконайтеся чи справді запис скасований!\n${textIcon} Бажаєте продовжити скасовування записів за цей день?`, continueUnassignKeyboard)
    notifyAllUnassignedDayTime(day, date, formattedHour, id)
  }

  if (callbackDataCommand === 'yes_continue_unassign'){
    let day = getValueFromStore(id, 'day')
    let date = getValueFromStore(id, 'date')
    if (stage === 'yes_continue_unassign')
      return
    setValueToStore(id, 'stage', 'yes_continue_unassign')
    let coords = getValueFromStore(id, 'coords')
    coords = JSON.parse(coords)
    let {i, j} = coords
    let hoursKeyboard = getFreeHoursKeyboard(i, j, 'hour_cancel', id, false )
    if (hoursKeyboard && hoursKeyboard.inline_keyboard && hoursKeyboard.inline_keyboard.length > 2){
      let msg = `${textIcon} Скасування запису!\nВи вибрали - <b>${day}, ${date}</b>\nВиберіть годину:`
      editMessage(id, messageId, msg, hoursKeyboard)
    }else{
      let keyboardData = [
          [{
            text: `Вибрати інший день`,
            callback_data: 'choose_another_day'
          }],
           [{
            text: `${viewScheduleIcon} Переглянути графік`,
            url: urlSs,
          }]
        ]
      keyboardData.push(mainMenuData[0])
      let continueUnassignKeyboard = getCustomInlineKayboard(keyboardData)
      editMessage(id, messageId, `${alertIcon} За цей день - <b>${day}, ${date}</b> більше немає записаних годин!`, continueUnassignKeyboard)
    }
  }

  if (callbackDataCommand === 'yes_continue_assign'){
    if (stage === 'yes_continue_assign')
      return
    setValueToStore(id, 'stage', 'yes_continue_assign')
    let coords = getValueFromStore(id, 'coords')
    coords = JSON.parse(coords)
    let {i, j} = coords
    let hoursKeyboard = getFreeHoursKeyboard(i, j, 'hour', id)
    if (hoursKeyboard && hoursKeyboard.inline_keyboard && hoursKeyboard.inline_keyboard.length > 2){
      let day = getValueFromStore(id, 'day')
      let date = getValueFromStore(id, 'date')
      let msg = `${textIcon} Запис на стенд!\nВи вибрали - <b>${day}, ${date}</b>\nВиберіть годину:`
      editMessage(id, messageId, msg, hoursKeyboard)
    }else{
       let keyboardData = [
          [{
            text: `Вибрати інший день`,
            callback_data: 'choose_another_day'
          }],
           [{
            text: `${viewScheduleIcon} Переглянути графік`,
            url: urlSs,
          }]
        ]
      keyboardData.push(mainMenuData[0])
      let continueAssignKeyboard = getCustomInlineKayboard(keyboardData)
      editMessage(id, messageId, `${alertIcon} За цей день більше немає вільних годин!`, continueAssignKeyboard)
    }
  }

  if (callbackDataCommand === 'continue_cancel'){
    if (stage === 'continue_cancel')
      return
    setValueToStore(id, 'stage', 'continue_cancel')
    removeSomeUserData(id)
    editMessage(id, messageId, instruction);
  }

  if (callbackDataCommand === 'choose_another_day'){
    if (stage === 'choose_another_day')
      return
    setValueToStore(id, 'stage', 'choose_another_day')
    let msg = action === 'assign' ? chooseHourForAssign : chooseHourForUnassign
    let daysKeyboard = action === 'assign' ? daysKeyBoard : getDaysForUnassignKeyboard(id)
    if (daysKeyboard && daysKeyboard.inline_keyboard && daysKeyboard.inline_keyboard.length > 1){
      editMessage(id, messageId, msg, daysKeyboard)
    }else{
      let msg = alertIcon
      if (action === 'assign'){
        msg += `Вільних годин немає`
      }else{
        msg += `Ви ще не записалися на жодний день!`
      }
      editMessage(id, messageId, msg, mainMenuKeyboard)
    }
  }
  if (callbackDataCommand === 'yes_change_name'){
    if (stage === 'yes_change_name')
      return
    setValueToStore(id, 'stage', 'yes_change_name')
    setValueToStore(id, 'messageId', messageId)
    editMessage(id, messageId, enterNewName)
  }

  if (callbackDataCommand === 'remove_message'){
    deleteMessage(id, messageId)
  }
  
}

function handleUser(id, text){
  let userProps = getValueFromStore(id)
  let hasName = userProps ? userProps.hasOwnProperty("name") : false
  let hasValid = userProps ? userProps.hasOwnProperty("valid") : false 

  if (text !== password && hasValid === false ){
    let msg = `${alertIcon} Для того, щоб отримати доступ введіть пароль.`
    sendMessage(id, msg)
    return false
  }else if (text === password && hasName === false){
    setValueToStore(id, 'valid', 'true')  
    sendMessage(id, `${exclamationIcon} Введіть будь-ласка своє прізвище та ім'я. Будьте уважні: в подальшому під цим прізвищем та ім'ям ви буде записуватися на стенд!`)
    return false
  }else if (text !== password && hasValid && hasName === false){
    let clearedName = text.replace(/\s+/g, ' ').trim()
    setValueToStore(id, 'name', clearedName)  
    sendMessage(id, aboutMessage, startKeyboard);
    return true
  }else if (hasValid && hasName){
    return true
  }
  
}

function doPost(e) {
  //debugSheet.getRange(2, 1).setValue(e.postData.contents);
  var contents = JSON.parse(e.postData.contents);
  //debugSheet.getRange(10, 1).setValue(JSON.stringify(contents));
  var id, text, data, messageId

  if (contents.message) {
    text = contents.message.text;
    id = contents.message.chat.id;
    messageId = contents.message.message_id
    let valid = handleUser(id, text)
    //sendMessage(id, "a ", {'remove_keyboard': true})
    if (valid){
      handleText(id, text, messageId)
    }
  }
  if (contents.callback_query) {
    id = contents.callback_query.from.id;
    data = contents.callback_query.data;
    text = contents.callback_query.message.text;
    messageId = contents.callback_query.message.message_id
    let valid = handleUser(id, text)
    if (valid){
      //sendMessage(id, "b ", {'remove_keyboard': true})
      let firstLetter = Array.from(data)[0]
      if (firstLetter === '/'){
        handleText(id, data, messageId)
      }else{
        handleCallbackData(id, data, messageId)
      }
    }
  }
}

