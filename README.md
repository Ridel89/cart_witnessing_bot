 - Створюємо телеграм бота

Заходимо в кореневий батьківський бот:
 https://t.me/BotFather

викликаємо або вводимо команду
 /newbot

 Вводимо ім'я бота, яке буде відображатися в пошуку
 Вводимо ім'я користувача для вашого бота англійською мовою яке має закінчуватися на "bot", наприклад TetrisBot or tetris_bot.  

 BotFather надішле вам токен бота, для взаємодії з ним, який ми зберігаємо і впишемо в програмний код (telegramBotToken).

створюємо меню бота
/setcommands

Вводимо:
start - Розпочати роботу з ботом
assign - Записатися на стенд
cancel - Скасувати запис на стенд
schedule - Переглянути графік
change_name - Змінити ім'я
help - Отримати допомогу

Задаємо фото профілю бота:
/setuserpic 

Якщо потрібно то виконуємо наступні команди
/setname - змінити назву бота
/setdescription - змінити опис бота
/setabouttext - змінити інформацію про бота


 - створюємо excel документ
з посилання на excel документ з браузера копіюємо id
наприклад:
https://docs.google.com/spreadsheets/d/1rkGqlYlJsPwJ1GukQ731B9CACwYvhrPEYW-IBa7jk5s/edit#gid=0

зберігаємо і впишемо в програмний код
ssId = 1rkGqlYlJsPwJ1GukQ731B9CACwYvhrPEYW-IBa7jk5s

Створюємо скрипт в excel документі - розширення -> app script
Налаштування проекту
копіюємо Ідентифікатор сценарію - 8Zuh1gup3Gg63SUiutvx2S7udN0qki0C-p_26nCJMfoL1Hzu9cHThudEY



