# Описание
Статус: в разработке.

React.JS одностраничное приложение для вывода прогноза погоды.

# Требования

Приложение должно уметь:

* Данные с сайта openweathermap.org 
* Добавлять/удалять города
* Сохранять локально данные
* Автоматически запрашивать погода по координатам пользователя - это город/место по умолчанию.
* Результат разработки должен быть сохранён на сервисе github с локальными коммитами разработчика.

Оригинал тестового задания: https://gist.github.com/beshkenadze/3e3cfc70a9411d54ecd4

# Решение

* Функции
  * Погода
    * вывод краткой текущей погоды в заданном городе
    * вывод краткого прогноза погоды на 5 дней в заданом городе
    * вывод подробной информации по текущей погоде в заданном городе
    * переключение между городами пользователя
  * Управление городами
    * Добавление города по названию, ZIP коду, Координатам
    * Запрос погоды по координатам пользователя
    * Удаление города
  * Настройки
    * Метрики температуры
    * Язык информации
    * Управление хранилищем данных

* Ограничения
  * Иконки грузим с openweathermap.org
  * Поиск городов по названию без автодополнения
  * Поиск городов без фильтра по странам
  * Без графиков