//DEVELOPMENT
//r1d2_tst_bot
var telegramBotToken = "1233518178:AAHsHrFpaWTkSKNbxefyhWWbfBvIZ0T2ay4"; // FILL IN YOUR OWN TOKEN
var telegramUrl = "https://api.telegram.org/bot" + telegramBotToken;
var webAppUrl = "https://script.google.com/macros/s/AKfycbwYMoe0361EiiS4fGLwaYspD6ncQ7Lu9oDHrQeVy8j66NVtdNf26cF89-O-OKDuTgOM/exec"; // FILL IN YOUR GOOGLE WEB APP ADDRESS
var ssId = "1rkGqlYlJsPwJ1GukQ731B9CACwYvhrPEYW-IBa6jk5s"; // FILL IN THE ID OF YOUR SPREADSHEET
var urlSs = `https://docs.google.com/spreadsheets/d/${ssId}/edit?usp=sharing`
var sheet = SpreadsheetApp.openById(ssId).getSheets()[0]
var debugSheet = SpreadsheetApp.openById(ssId).getSheets()[1]
var testSheet = SpreadsheetApp.openById(ssId).getSheets()[3]
var password = '5783'

var numberOfDays = 14
var startHour = 9
var endHour = 18
var countProclaimers = 2

//Icons
var alertIcon = '⚠️ '
var assignIcon = '📝 ' //alts ✍ 
var unassignIcon = '❌ '
var viewScheduleIcon = '👀 '
var helpIcon = '🆘 '
var exclamationIcon = '❗ '
var yesIcon = '✔️ '
var noIcon = '⭕ ' // ⭕ 🔙
var infoIcon = 'ℹ️ ' //ℹ
var yourNameIcon = '👨‍💼 ' //  👨‍💼🧑💬👨
var successIcon = '🎉 '
var calendarIcon = '🗓️ ' //📅 📆
var timeIcon = '🕒 ' 
var bellIcon = '☝️ ' //☝️ 🛎️

//Messages
var payAttention = `${alertIcon} Зверніть свою увагу!\nДля того, щоб ви бачили постійно оновлені дані в таблиці, у вас має бути встановлено додаток 📊 "Google Таблиці", а також має бути стабільний 🌐 інтернет  зв'язок.`
var aboutMessage = `Цей бот допоможе вам самостійно записуватись в служіння зі стендом для збору <b>Чернівці-Український-Західний</b>.\n${payAttention}`
var instruction = `${helpIcon} ${aboutMessage}\n\n\
В ньому є наступні функції:\n\
1. Запис на служіння зі стендом \n  натисніть <b>/assign</b>\n\n\
2. Скасування запису на служіння зі стендом \n натисніть <b>/cancel</b>\n\n\
3. Перегляд графіка служіння зі стендом \n  натисніть <b>/schedule</b>\n\n\
4. Інформація про допомогу \n натисніть <b>/help</b>\n\n\
5. Зміна імені \n натисніть <b>/change_name</b>\n\n\
Ці команди завжди доступні по натисненню на кнопку - Menu.\n\n\
За допомогою можете звернутися до брата <b>Ігнатченка Іллі, +380 68 174 10 90</b>.`
var infoMessage = `${infoIcon} Стенд знаходиться за адресою <b>вул. Головна 126а</b>, 1 підїзд код <b>38</b> в кладовці на першому поверсі. Ключ від кладовки в поштовій <b>скринці №6</b>.\n        Дорогі брати та сестри під час повітряної тривоги служіння зі стендом припиняється. Під час тривоги, стенд можна заносити на його постійне місце перебування або перечекати тривогу в <b>ЗОШ №30</b> на <b>вул. Щербанюка 4</b>.`
var changeNameMessage = (name) => `${yourNameIcon} Вказане вами ім'я - <b>${name}</b>. Бажаєте змінити його?`
var enterNewName = `${yourNameIcon} Введіть своє нове ім'я. Будьте уважні: в подальшому під цим ім'ям ви будете записуватися на стенд!`
var nameChanged = (name) => `${yourNameIcon} Ваше нове ім'я - <b>${name}</b>.`
var chooseHourForAssign = `${assignIcon} Запис на стенд!\nВиберіть день:`
var chooseHourForUnassign = `${unassignIcon} Скасовування запису!\nВиберіть день:`

//Commands
var assignCommand = 'assign'
var startCommand = 'start'
var helpCommand = 'help'
var infoCommand = 'info'
var scheduleCommand = 'schedule'
var cancelCommand = 'cancel'
var changeNameCommand = 'change_name'
