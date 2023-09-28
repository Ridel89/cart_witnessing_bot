var userProperties = PropertiesService.getUserProperties();
var scriptProperties = PropertiesService.getScriptProperties();//to solve the problem of simultaneously setting a value for one and the same cell

function setValueToStore(userId, prop, val){
  let userProps = userProperties.getProperty(userId)
  console.log('userProps ', userProps)
  if (userProps){
    userProps = JSON.parse(userProps)
  }else{
    userProps = {}
  }
  userProps[prop] = val
  console.log('userProps ', userProps)
  userProperties.setProperty(userId, JSON.stringify(userProps))
}

function removeValueFromStore(userId, prop, ){
  let userProps = userProperties.getProperty(userId)
  if (userProps){
    userProps = JSON.parse(userProps)
    delete userProps[prop]
    userProperties.setProperty(userId, JSON.stringify(userProps))
  }
}

function getValueFromStore(userId, prop){
  let userProps = userProperties.getProperty(userId)
  if (userProps){
    userProps = JSON.parse(userProps)
    if (prop){
      return userProps[prop]
    }else{
      return userProps
    }
  }else
    return null
}

function clearUserStore(id){
  userProperties.deleteProperty(id)
}

function showStore() {
  let props = userProperties.getProperties()
  console.log(props)
}

function showScripStore() {
  let props = scriptProperties.getProperties()
  console.log(props)
}

function clearStore(){
  userProperties.deleteAllProperties()
}

function clearScriptStore(){
  scriptProperties.deleteAllProperties()
}

