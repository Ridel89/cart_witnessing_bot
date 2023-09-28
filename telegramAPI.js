function getMe() {
  var url = telegramUrl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function getWebhookinfo() {
  var url = telegramUrl + "/getWebhookInfo";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
}

function sendText(id,text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());
} 

function sendMessage(chat_id, text, keyboard) {
  let data = {
    method: "post",
    payload: {
      method: "sendMessage",
      chat_id: String(chat_id),
      text: text,
      parse_mode: "HTML",
      reply_markup: JSON.stringify(keyboard)
    }
  };
  UrlFetchApp.fetch(telegramUrl + '/', data);
}

function deleteMessage(chat_id, message_id) {
  let data = {
    method: "post",
    payload: {
      method: "deleteMessage",
      chat_id: String(chat_id),
      message_id: message_id,
    }
  };
  UrlFetchApp.fetch(telegramUrl + '/', data);
}

function editMessage(chat_id, message_id, text, keyboard) {
  let data = {
    method: "post",
    payload: {
      method: "editMessageText",
      chat_id: String(chat_id),
      message_id: message_id,
      parse_mode: "HTML",
      text: text,
      reply_markup: JSON.stringify(keyboard)
    }
  };
  UrlFetchApp.fetch(telegramUrl + '/', data);
}
