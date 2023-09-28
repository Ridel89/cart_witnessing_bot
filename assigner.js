function getSuccessMessage(id){
  let day = getValueFromStore(id, 'day')
  let date = getValueFromStore(id, 'date')
  let formattedHour = getValueFromStore(id, 'formattedHour')
  //let successMessage = `${assignIcon} Ви успішно записалися на <b>${day}, ${date}</b> на годину: <b>${formattedHour}</b>.`
  let successMessage = `${assignIcon} Вас записано!\n\
${calendarIcon} День і дата: <b>${day}, ${date}</b>\n\
${timeIcon} Час: <b>${formattedHour}</b>.\n`
  return successMessage
}

function setFormattingText(range, text, alignment='center', weight='normal'){
  range.setFontFamily("Arial");
  range.setFontSize(14);
  range.setFontWeight(weight);
  range.setHorizontalAlignment(alignment);
  return range.setValue(text)
}

function assignUserToSchedule(id, messageId) {

  let coords = getValueFromStore(id, 'coords')
  let numHour = getValueFromStore(id, 'numHour')
  let userName = getValueFromStore(id, 'name')
  if (coords && numHour){ //handle name and surename
    //debugSheet.getRange(36, 1).setValue('yes');
    coords = JSON.parse(coords)
    let {i, j} = coords
    let ni = Number(i) + 2 + Number(numHour) - startHour
    let range = sheet.getRange(ni, j+1, 1, countProclaimers);
    let vals = range.getValues();
    let arrNames = vals[0]
    let successMessage = getSuccessMessage(id)
    let keyboardData = [
          [{
            text: `${yesIcon} Так`,
            callback_data: 'yes_continue_assign'
          }, {
            text: `${noIcon} Інший день`,
            callback_data: 'choose_another_day'
          }],
          // [{
          //   text: `${viewScheduleIcon} Переглянути графік`,
          //   url: urlSs,
          // }]
        ]
    keyboardData.push(mainMenuButton)
    let confirmKeyboard = getCustomInlineKayboard(keyboardData)

    let keyboardData2 = [
          [{
            text: `${viewScheduleIcon} Переглянути графік`,
            url: urlSs,
          }]
        ]
    let viewSchedule = getCustomInlineKayboard(keyboardData2)

    let againMessage = ` ${exclamationIcon} Будь-ласка перегляньте графік і переконайтеся чи справді ви записані!\n${assignIcon} Бажаєте записатися ще раз, на цей день?` //${successMessage}\n
    let alreadyBusyMessage = `${alertIcon} Нажаль вже хтось записався на вибрану годину. Бажаєте вибрати іншу годину?`
    let alreadyAssigned = `${alertIcon} Ви вже записані на цю годину! Виберіть іншу годину.`
    const rndTime = randomIntFromInterval(0, 5000) 
    Utilities.sleep(rndTime) // to solve the problem of simultaneously setting a value for one and the same cell
    let leftCell = sheet.getRange(ni, j+1) //arrNames[0]
    let rightCell = sheet.getRange(ni, j+2) //arrNames[1]
    let res
    if (leftCell.isBlank() && scriptProperties.getProperty(`${ni},${j+1}`) === null){  //leftCell.getValue() === ''
      if (rightCell.getValue() === userName){
        sendMessage(id, alreadyAssigned)
        return
      }
      res = setFormattingText(leftCell, userName)
      scriptProperties.setProperty(`${ni},${j+1}`,'') //to solve the problem of simultaneously setting a value for one and the same cell
      if (res && res.getValue() === userName && sheet.getRange(ni, j+1).getValue() === userName){
        removeValueFromStore(id, 'numHour')
        editMessage(id, messageId, successMessage, viewSchedule) //viewSchedule
        //editMessage(id, messageId, againMessage, confirmKeyboard)
        sendMessage(id, againMessage, confirmKeyboard)
      }else{
        editMessage(id, messageId, alreadyBusyMessage, confirmKeyboard)    
      }
    }else if (rightCell.isBlank() && scriptProperties.getProperty(`${ni},${j+2}`) === null){ 
      if (leftCell.getValue() === userName){
        sendMessage(id, alreadyAssigned)
        return
      }
      res = setFormattingText(rightCell, userName)
      scriptProperties.setProperty(`${ni},${j+2}`,'') //to solve the problem of simultaneously setting a value for one and the same cell
      if (res && res.getValue() === userName && sheet.getRange(ni, j+2).getValue() === userName){
        removeValueFromStore(id, 'numHour')
        editMessage(id, messageId, successMessage, viewSchedule) //viewSchedule
        //editMessage(id, messageId, againMessage, confirmKeyboard)
        sendMessage(id, againMessage, confirmKeyboard)
      }else{
        editMessage(id, messageId, alreadyBusyMessage, confirmKeyboard)    
      }
    }else{
      editMessage(id, messageId, alreadyBusyMessage, confirmKeyboard)  
    }
  } 
}
