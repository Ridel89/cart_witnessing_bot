
var telegramBotToken = "..."; // FILL IN YOUR OWN TOKEN
var telegramUrl = "https://api.telegram.org/bot" + telegramBotToken;
var webAppUrl = "https://script.google.com/macros/s/.../exec"; // FILL IN YOUR GOOGLE WEB APP ADDRESS
var ssId = "..."; // FILL IN THE ID OF YOUR SPREADSHEET
var urlSs = `https://docs.google.com/spreadsheets/d/${ssId}/edit?usp=sharing`
var sheet = SpreadsheetApp.openById(ssId).getSheets()[0]
//var debugSheet = SpreadsheetApp.openById(ssId).getSheets()[1]
//var testSheet = SpreadsheetApp.openById(ssId).getSheets()[3]
var password = 'password'

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
За допомогою можете звернутися до брата <b>Павла, +380 88 888 88 88</b>.`
var infoMessage = `${infoIcon} Стенд знаходиться за адресою <b>вул. назва вул 23</b>, 5 підїзд код <b>38</b> ...`
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
