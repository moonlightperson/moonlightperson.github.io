// ==UserScript==
// @name         Auto-responses
// @namespace    https://forum.arizona-supreme.site
// @version      1.2
// @description  try to take over the world!
// @author       Artyom Shilkin
// @match        https://forum.arizona-supreme.site/threads/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const buttons = [
    {
      title: 'Опра принята',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(97, 189, 109)]Принято.[/COLOR][/SIZE]<br>[SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Опра - (нет keyboard)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: отсутствует скрипт "KeyBoard".[/SIZE]<br>[SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Опра - (нет SF Integration',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR]<br>Причина: отсутствует скрипт "SF Integration".<br>Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]]',
    },
    {
      title: 'Опра - (АХК/кейспуфф)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: использовали софт для ловли (АХК/keyspoof).[/SIZE][/B][/FONT]<br>[QUOTE][/QUOTE]<br>[QUOTE]<br>1. Использовать различные программы/скриптов и т.п. для облегчения ловли дома/бизнеса/машины | BAN 30-2000 дней<br>[/QUOTE]<br>[FONT=times new roman][B][SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Опра - (хелпер ловли)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: отсутствует скрипт "KeyBoard".[/SIZE]<br>[SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Опра - (перебинд)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: использовали перебинд клавиши.[/SIZE][/B][/FONT]<br>[QUOTE][/QUOTE]<br>[QUOTE]<br>4. Перебинд на слете (/buybiz на любую клавишу, N на capslock и т.п.) | BAN 15 дней<br>[/QUOTE]<br>[FONT=times new roman][B][SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Опра - (нет консоли)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: не показали консоль SAMPFUNCS | не пробили команды chatcmds threads.[/SIZE][/B][/FONT]<br>[FONT=times new roman][B][SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Опра - (/dels по инфе)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: использовали удаление игроков на слете по информации (блокировка на 5 дней).[/SIZE][/B][/FONT]<br>[FONT=times new roman][B][SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Опра - (ловля с твинков)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: ловля с других аккаунтов.[/SIZE][/B][/FONT]<br>[FONT=times new roman][B][SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Опра - (менее 20 лвл)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: ловля дорогого имущества с 20-го уровня.[/SIZE][/B][/FONT]<br>[QUOTE]<br>Дома, которые запрещено ловить, имея уровень, ниже 20го:<br>[QUOTE]Абсолютно все дома в GreenTown, Palomino Hills, VineWood, уникальные метки (те, которые покупались за реальную валюту), одиночки с ID: 855, 852, 1166, 1098, 249, 435, 438, 609, 590, 541, 616, 441.[/QUOTE]<br>[/QUOTE]<br>[QUOTE][/QUOTE]<br>[QUOTE]<br>[B]Бизнесы, которые запрещено ловить, имея уровень, ниже 20го:[/B]<br>[QUOTE][B]Абсолютно все Аммуниции, Бары, Мастерские одежды, Аренды транспорта, Автосалоны, Контейнеры, Казино, Центральный рынок, Шахту, Фермы, Автосервисы, Конные ставки[/B][/QUOTE]<br>[/QUOTE]<br>[FONT=times new roman][B][SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Опра - (fake sf integration)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: использовали Fake SF Integration.[/SIZE][/B][/FONT]<br>[FONT=times new roman][B][SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Опра - (fake keyboard)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: использовали Fake KeyBoard.[/SIZE][/B][/FONT]<br>[FONT=times new roman][B][SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Запросить арзкапчу',
      content:
        '[CENTER][SIZE=5][FONT=times new roman][B]Статус опровержения: [COLOR=rgb(247, 218, 100)]На рассмотрении.[/COLOR]<br>Предоставьте видеозапись с сайта arzkapcha.ru в течении 24-х часов.<br>Отчет идет после моего ответа.[/B][/FONT][/SIZE][/CENTER]',
    },
    {
      title: 'Опра - (нет TAB)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: нет TAB.[/SIZE][/B][/FONT]<br>[FONT=times new roman][B][SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Опра - (нет /id)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: нет /id.[/SIZE][/B][/FONT]<br>[FONT=times new roman][B][SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
    {
      title: 'Поставить на рассмотрение',
      content:
        '[CENTER][SIZE=5][FONT=times new roman][B]Статус опровержения: [COLOR=rgb(247, 218, 100)]На рассмотрении.[/COLOR][/B][/FONT][/SIZE][/CENTER]',
    },
    {
      title: 'Опра - (не за 10 сек до пд)',
      content:
        '[CENTER][FONT=times new roman][B][SIZE=5]Статус опровержения: [COLOR=rgb(184, 49, 47)]Отказано.[/COLOR][/SIZE]<br>[SIZE=5]Причина: начали запись видео не за 10 секунд до PayDay.[/SIZE][/B][/FONT]<br>[FONT=times new roman][B][SIZE=5]Всего доброго, закрыто.[/SIZE][/B][/FONT][/CENTER]',
    },
  ];
  
  $(document).ready(() => {
  // Подключение иконок Material Design">
    $('head').append('<link href="https://cdn.materialdesignicons.com/2.0.46/css/materialdesignicons.min.css" rel="stylesheet">');
    $('head').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet');
  // Загрузка скрипта для обработки шаблонов
    $('body').append('<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>');
    

    addButton('Опры', 'selectAnswer');

    const threadData = getThreadData();    

    $(`button#selectAnswer`).click(() => {
      XF.alert(buttonsMarkup(buttons), null, 'Выберите ответ:');
      buttons.forEach((btn, id) => {
        $(`button#answers-${id}`).click(() => pasteContent(id, threadData));
      });
    });
  });

  function addButton(name, id) {
    $('.button--icon--reply').after(
      `<button type="button" class="button rippleButton" id="${id}" style="margin: 3px;">${name}</button>`,
    );
  }

  function buttonsMarkup(buttons) {
    return `<div class="xf-select-form">${buttons
    .map(
        (btn, i) =>
          `<button id="answers-${i}" class="button--primary button ` +
          `rippleButton" style="margin:5px"><span class="button-text">${btn.title}</span></button>`,
      )
      .join('')}</div>`;
  }

  function pasteContent(id, data = {}) {
    const template = Handlebars.compile(buttons[id].content);
    if ($('.fr-element.fr-view p').text() === '') $('.fr-element.fr-view p').empty();

    $('span.fr-placeholder').empty();
    $('div.fr-element.fr-view p').append(template(data));
    $('a.overlay-titleCloser').trigger('click');
  }

  function getThreadData() {
    const authorID = $('a.username')[0].attributes['data-user-id'].nodeValue;
    const authorName = $('a.username').html();
    const hours = new Date().getHours();
    return {
      user: {
        id: authorID,
        name: authorName,
        mention: `[USER=${authorID}]${authorName}[/USER]`,
      },
      greeting: () =>
        4 < hours && hours <= 11
          ? 'Доброе утро'
          : 11 < hours && hours <= 15
          ? 'Добрый день'
          : 15 < hours && hours <= 21
          ? 'Добрый вечер'
          : 'Доброй ночи',
    };
  }

  function editThreadData(prefix, close = false) {
    // Получаем заголовок темы, так как он необходим при запросе
    const threadTitle = $('.p-title-value')[0].lastChild.textContent;

    fetch(`${document.URL}edit`, {
      method: 'POST',
      body: getFormData({
        prefix_id: prefix,
        title: threadTitle,
        discussion_open: !close,
        _xfToken: XF.config.csrf,
        _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
        _xfWithData: 1,
        _xfResponseType: 'json',
      }),
    }).then(() => location.reload());
  }

  function getFormData(data) {
    const formData = new FormData();
    Object.entries(data).forEach(i => formData.append(i[0], i[1]));
    return formData;
  }
})();