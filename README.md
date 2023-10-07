# Cart witnessing bot
Це телеграм бот який робить бронювання на служіння зі стендом, на вибраний день та годину, в google таблиці.

![alt text](https://github.com/Ridel89/cart_witnessing_bot/blob/72da333175e3bf38d1cc0ba2ef5925fcb902e906/images/screen%201.jpg)
![alt text](https://github.com/Ridel89/cart_witnessing_bot/blob/72da333175e3bf38d1cc0ba2ef5925fcb902e906/images/screen%202.jpg)
![alt text](https://github.com/Ridel89/cart_witnessing_bot/blob/33861c91196ea5233d8da8817f606234a639cf2a/images/screen%203.jpg)
![alt text](https://github.com/Ridel89/cart_witnessing_bot/blob/67f6ae23d47327dea1ccad11a6bc70cc095476e8/images/screen%204.jpg)

## Функції
 - записатися
 - скасувати запис
 - переглянути графік
 - змінити ім'я
 - показати інформаційне повідомлення
 - доступ до бота по паролю
 - автоматичне видалення завершеного дня служіння і додавання нового

## Передумови
Потрібно мати google аккаунт.  
Потрібно встановити наступні інструменти:
 - git https://git-scm.com/downloads
 - node.js https://nodejs.org/uk
 - npm https://www.npmjs.com/
 - visual studio code https://code.visualstudio.com/

## Створюємо телеграм бота
В telegram, заходимо в кореневий, батьківський бот:
 https://t.me/BotFather

Викликаємо або вводимо команду
 `/newbot`

 Вводимо ім'я бота, яке буде відображатися в пошуку.  
 Вводимо ім'я користувача для вашого бота англійською мовою яке має закінчуватися на "bot", наприклад TetrisBot or tetris_bot.  

 BotFather надішле вам токен бота, для взаємодії з ним, який ми зберігаємо і впишемо в програмний код в змінну `telegramBotToken`.

створюємо меню бота
`/setcommands`

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

## Створюємо документ google таблиці
Документ можна створити в google таблицях або на google диску.  
Відкриваємо документ, в адресному рядку браузера з посилання документа копіюємо id документа.  
**Наприклад** посилання може виглядати так:  
https://docs.google.com/spreadsheets/d/{ssId}/edit#gid=0  
Де {ssId} і є id документа, зберігаємо і пізніше впишемо в програмний код.  
**Приклад**:
`ssId` = {ssId}

Створюємо скрипт (Apps Script) в google таблиці документі - `розширення` -> `Apps Script`  
В редакторі скрипта, зліва на панелі клікаємо: `Налаштування проекту (іконка шестерні)` ->
копіюємо `Ідентифікатор сценарію` (`scriptId`).

Таким чином ми зібрали 3 ідентифікатори - telegramBotToken, ssId, scriptId.

## Клонуємо код з репозиторію GitHub на комп'ютер
В командному рядку або терміналі у вибраній папці, пишемо: `git clone https://github.com/Ridel89/cart_witnessing_bot.git` або завантажуємо код з сайта GitHub `<> code` -> `download ZIP` і розпаковуємо з архіву: 

Відкриваємо cклоновану папочку cart_witnessing_bot в терміналі або visual studio code   
`view` -> `terminal` і пишемо в терміналі:

`npm install @google/clasp -g`  

:warning: `clasp` - це інструмент який дозволяє синхронізовувати код з вашого компютера з Apps Script редактором.
Наприклад якщо ви змінили код на вашому компютері, то для його вивантаження в Apps Script редактор, викликаєте команду команду `clasp push`.
Якщо ви змінили код в Apps Script редакторі то для того, щоб ці зміни завантажилися на ваш компютер ви викликаєте команду `clasp pull`.
Більше про clasp: https://developers.google.com/apps-script/guides/clasp

`clasp login` - залогінитися через google аккаунт і надайте `clasp`, дозвіл до вашого google аккаунта  
`clasp clone <scriptId>` - з'єднати вибраний каталог з Apps Script, де `<scriptId>` Ідентифікатор сценарію	
Перед тим як вивантажити зміни в Apps Script потрібно увімкнути `API скрипту додатків Google Apps` перейдіть по посиланню: https://script.google.com/home/usersettings `API скрипту додатків Google Apps` -> `Увімкнути`
`clasp push` - вивантажити всі файли з поточного каталогу в Apps Script  

Оновлюємо в браузері сторінку з app script і файли які були в папочці на компютері повинні підтягнутися в Apps Script. :warning: Якщо ви не увімкнули `API скрипту додатків Google Apps`, то в консолі виведеться про це повідомлення і посилання де знаходиться ця опція.

Заходимо в visual studio code і находимо файлик `globalVariables.js`. В ньому вписуємо раніше збережені id:  
`telegramBotToken` - токен телеграм бота  
`ssId` - id документа  
Задаємо пароль для доступу до бота, змінна `password`. Оновлюємо код: `clasp push` і перевіряємо чи змінився код в Apps Script, оновивши браузер. 

## Деплоїмо app script
В редакторі Apps Script, справа зверху клікаємо:  
 `Ввести в дію` -> `керування введенням в дію` -> `створити версію для введення в дію`  
Зліва, вибрати тип (іконка шестерні)  
`тип` -> `веб додаток` -> `хто має доступ` -> `всі` -> кнопка `ввести в дію`  
кнопка `надати доступ` -> вибираємо аккаунт -> `advanced` -> клікаємо на `go to назва проекта (unsafe)` -> `allow (дозволити)`. У вікні копіюємо URL-адресу веб додатку

У visual studio терміналі, виконайте `clasp pull` - для завантаження прихованого файлу проекту. 
У visual studio знаходимо файл `globalVariable.js` і прописуємо URL-адресу веб додатку в змінну `webAppUrl`. Вивантажуємо зміни в Apps Script `clasp push`. :warning: Якщо з'явиться повідомлення `Manifest file has been updated. Do you want to push and overwrite? (y/N)`, то введіть `y` і нажміть `enter`.

Оновлюємо редактор Apps Script, перевіряємо чи зміни надійшли і знову деплоїмо з новими змінами:
`Ввести в дію` -> `керування введенням в дію` -> `іконка олівчика (редагувати)` -> `версія: нова версія` -> `ввести в дію` -> `готово`

## Вказуємо боту посилання на Apps Script
В редакторі Apps Script:
Заходимо в файл `telegramAPI.gs`, зверху на панелі, у випадаючому списку, вибираємо функцію `setWebhook` і натискаємо `запустити`.

## Генеруємо графік в гугл таблиці
В редакторі Apps Script, заходимо в файл `utils.gs`, у випадаючому списку, вибираємо функцію `createEmptySchedule`, можемте задати кількість днів, початкову годину і кінцеву годину, а далі натисніть `запустити`.
Перевіряємо чи створився графік в google таблиці документі.

Після всіх цих маніпуляцій бот повинен відповідати і просити введення паролю для доступу до нього.

## Тригери
Це функції які виконуються при певних умовах - коли відбувається якась подія або регулярно у визначений час.  

В редакторі Apps Script, зліва клікаємо на значок будильника `Тригери` -> `Додати тригер` -> `Вибрати необхідну для запуску функцію`: `dataShifter` -> `Виберіть джерело події`: `Визначається часом` -> `Виберіть тип активатора на основі часу`: `Денний таймер` -> `Виберіть час доби`: 02:00-03:00 -> `Зберегти`. Даний тригер буде викликатися раз в день в період з 02:00 до 03:00 ночі, його завдання зсунути весь графік вверх, видаливши попередній день який вже став неактуальним і додати новий день в кінці графіка.  

Додаємо ще один триггер - `Вибрати необхідну для запуску функцію`: `myOnEdit` -> `Виберіть джерело події`: `З Електронний аркуш` -> `Виберіть тип події`: `У разі редагування` -> `Зберегти`. Даний тригер необхідний для коректного функціонування запису в графік. :warning: Якщо ви не задасте цей тригер то запис може працювати невірно.


## Кастомізація
Ви можете змінити назви, повідомлення та іконки які використовує бот. Основні з них зберігаються в файлі `globalVariable.js`. Іконки `emoji` можете знайти наприклад за посиланням:
https://www.freecodecamp.org/news/all-emojis-emoji-list-for-copy-and-paste/





