 

 - Створюємо телеграм бота

Заходимо в кореневий батьківський бот:
 https://t.me/BotFather

викликаємо або вводимо команду
 /newbot

 Вводимо ім'я бота, яке буде відображатися в пошуку.
 Вводимо ім'я користувача для вашого бота англійською мовою яке має закінчуватися на "bot", наприклад TetrisBot or tetris_bot.  

 BotFather надішле вам токен бота, для взаємодії з ним, який ми зберігаємо і впишемо в програмний код (telegramBotToken).

створюємо меню бота
/setcommands

Вводимо:
```
start - Розпочати роботу з ботом
assign - Записатися на стенд
cancel - Скасувати запис на стенд
schedule - Переглянути графік
change_name - Змінити ім'я
help - Отримати допомогу
```
Задаємо фото профілю бота:
`/setuserpic`

Якщо потрібно то виконуємо наступні команди
```
/setname - змінити назву бота
/setdescription - змінити опис бота
/setabouttext - змінити інформацію про бота
```

 - створюємо excel документ
з посилання на excel документ з браузера копіюємо id
наприклад:
https://docs.google.com/spreadsheets/d/1rkGqlYlJsPwJ1GukQ731B9CACwYvhrPEYW-IBa7jk5s/edit#gid=0

зберігаємо і пізніше впишемо в програмний код id excel документа, наприклад:
ssId = 1rkGqlYlJsPwJ1GukQ731B9CACwYvhrPEYW-IBa7jk5s

Створюємо скрипт в excel документі - `розширення` -> `app script`
Налаштування проекту
копіюємо `Ідентифікатор сценарію` - 8Zuh1gup3Gg63SUiutvx2S7udN0qki0C-p_26nCJMfoL1Hzu9cHThudEY

Клонуємо код з репозиторію gitHub, в командному рядку пишемо: git clone https://github.com/Ridel89/cart_witnessing_bot.git або завантажуємо: `<> code` -> `download ZIP`

Відкриваємо зклоновану папочку cart_witnessing_bot через visual studio code
view -> terminal і пишемо в терміналі:
npm install @google/clasp -g
`clasp login`
`clasp clone <scriptId>`
де `<scriptId>` Ідентифікатор сценарію	
`clasp push`

Оновлюємо в браузері сторінку з app script і файли які були в папочці на компютері повинні підтягнутися в app script

Заходимо в visual studio code і находимо файлік globalVariables.js і задаємо раніше збережені id:
`telegramBotToken`
`ssId`
Задаємо пароль для доступу до бота - password
`clasp push` і перевіряємо чи змінився код в app script 

https://developers.google.com/apps-script/guides/clasp


