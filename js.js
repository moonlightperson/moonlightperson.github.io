// ==UserScript==
// @name         Auto-responses
// @namespace    https://forum.arizona-supreme.site
// @version      1.1
// @description  try to take over the world!
// @author       Artyom Shilkin
// @match        https://forum.arizona-supreme.site/threads/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const buttons = [
    {
      title: 'Выдано верно',
      content:
        '[CENTER][FONT=trebuchet ms][SIZE=4]{{ greeting }}, {{ user.mention }}![/SIZE][/FONT]<br>[SIZE=4][COLOR=rgb(255, 64, 134)][FONT=trebuchet ms]Наказание выдано верно[/FONT][/COLOR][/SIZE]<br>[FONT=trebuchet ms][SIZE=4]Закрыто.[/SIZE][/FONT][/CENTER]',
    },
    {
      title: 'Передал',
      content:
        '[CENTER][SIZE=4][FONT=trebuchet ms]{{ greeting }}, {{ user.mention }}<br>Передал жалобу администратору, ожидайте его ответа в течении [COLOR=rgb(255, 64, 134)]24-х[/COLOR] часов<br>[COLOR=rgb(255, 64, 134)]В случае истекающего времени наказание будет аннулировано. [/COLOR][/FONT][/SIZE][/CENTER]',
    },
    {
      title: 'Админ снят',
      content:
        '[CENTER][FONT=trebuchet ms][SIZE=4]{{ greeting }}, {{ user.mention }}!<br>Администратор [COLOR=rgb(255, 64, 134)]снят[/COLOR], наказание [COLOR=rgb(255, 64, 134)]аннулирую[/COLOR].[/SIZE][/FONT]<br>[SIZE=4][FONT=trebuchet ms]Закрыто.',
    },
    {
      title: 'ЖБ отозвана',
      content:
        '[CENTER][FONT=trebuchet ms][SIZE=4]{{ greeting }}, {{ user.mention }}![/FONT][/SIZE]<br>[FONT=trebuchet ms][SIZE=4]Жалоба отозвана по [COLOR=rgb(255, 64, 134)]вашей инициативе[/COLOR].[/SIZE][/FONT]<br>[SIZE=4][FONT=trebuchet ms]Закрыто.',
    },
    {
      title: 'Будет наказан',
      content:
        '[CENTER][FONT=trebuchet ms][SIZE=4]{{ greeting }}, {{ user.mention }}!<br>[COLOR=rgb(255, 64, 134)]Администратор будет наказан.[/COLOR]<br>[SIZE=4][FONT=trebuchet ms]Закрыто.',
    },
    {
      title: 'Форма опры',
      content:
        '[CENTER][FONT=trebuchet ms][SIZE=4]{{ greeting }}, {{ user.mention }}!<br>Выдал вам наказание за [COLOR=rgb(255, 64, 134)]*причина наказания*[/COLOR].<br>Доказательства вашего нарушения:<br>*ссылка на видео/скрин*.<br>[SIZE=4][FONT=trebuchet ms]Ожидайте ответа от [COLOR=rgb(255, 64, 134)]старшей администрации[/COLOR].',
    },
    {
      title: 'Ответ выше',
      content:
        '[CENTER][FONT=trebuchet ms][SIZE=4]{{ greeting }}, {{ user.mention }}!<br>Ответ от [COLOR=rgb(255, 64, 134)]администратора выше[/COLOR], надеюсь подобных случаев в будущем [COLOR=rgb(255, 64, 134)]не повторится[/COLOR].<br>[SIZE=4][FONT=trebuchet ms]Закрыто.',
    },
    {
      title: 'Проведу беседу',
      content:
        '[CENTER][FONT=trebuchet ms][SIZE=4]{{ greeting }}, {{ user.mention }}![/FONT][/SIZE]<br>[FONT=trebuchet ms][SIZE=4][COLOR=rgb(255, 64, 134)]Проведу беседу с администратором[/COLOR], при повторных подобных нарушениях он [COLOR=rgb(255, 64, 134)]будет наказан[/COLOR].[/SIZE][/FONT]<br>[SIZE=4][FONT=trebuchet ms]Закрыто.',
    },
    {
      title: 'Нет нарушений',
      content:
        '[CENTER][FONT=trebuchet ms][SIZE=4]{{ greeting }}, {{ user.mention }}![/FONT][/SIZE]<br>[FONT=trebuchet ms][SIZE=4][COLOR=rgb(255, 64, 134)]Никаких нарушений от администратора не заметил.[/COLOR]<br>[SIZE=4][FONT=trebuchet ms]Закрыто.',
    },
  ];
  
  $(document).ready(() => {
    // Загрузка скрипта для обработки шаблонов
    $('body').append('<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>');

    addButton('Жалобы', 'selectAnswerJb');

    const threadData = getThreadData();


    $(`button#selectAnswerJb`).click(() => {
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
    return `<div class="select_answer">${buttons
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

  function editThreadData(prefix, pin = false, close = false) {
    // Получаем заголовок темы, так как он необходим при запросе
    const threadTitle = $('.p-title-value')[0].lastChild.textContent;

    fetch(`${document.URL}edit`, {
      method: 'POST',
      body: getFormData({
        prefix_id: prefix,
        title: threadTitle,
        discussion_open: !close,
        sticky: pin,
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