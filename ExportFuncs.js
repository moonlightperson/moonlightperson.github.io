(function () {
    'use strict';

    const system = {
        user: {
            color: "#db1616",
            name: "Тёма Шилкин"
        },
        
        prefixes: {
            remove: 0,
            wajno: 1,
            rules: 9,
            narasspec: 12,
            narasga: 18,
            naras: 3,
            ras: 7,
            info: 2,
            obrab: 15,
            otcaz: 10,
            arena: 4,
            otchet: 13,
            superinfo: 14,
            obsujdenie: 19
        },

        separators: {
            "type-one": "panelSeparator-typeone",
            "type-two": "panelSeparator-typetwo",
            "type-three": "panelSeparator-typethree",
        }
    }

    const buttons = [
        {
            title: 'Ответ 1',
            content: 'Содержимое ответа 1',
            color: "red",
        },
        {
            title: 'Ответ 2',
            content: 'Содержимое ответа 2',
            color: "green",
        },
        {
            title: 'Ответ 3',
            content: 'Содержимое ответа 3',
            color: "blue",
        },
        {
            title: 'Разделитель 1',
            color: "#ffff00",
            separator: "type-one",
        },
        {
            title: 'Ответ 4',
            content: 'Содержимое ответа 4',
            color: "royalblue",
        },
        {
            title: 'Ответ 5',
            content: 'Содержимое ответа 5',
            color: "black",
        },
        {
            title: 'Ответ 6',
            content: 'Содержимое ответа 6',
            color: "white",
        },
        {
            title: 'Разделитель 2',
            color: "#00ffff",
            separator: "type-two",
        },
        {
            title: 'Ответ 7',
            content: 'Содержимое ответа 7',
            color: "purple",
        },
        {
            title: 'Ответ 8',
            content: 'Содержимое ответа 8',
            color: "orange",
        },
        {
            title: 'Ответ 9',
            content: 'Содержимое ответа 9',
            color: "yellow",
        },
        {
            title: '',
            color: "#ff00ff",
            separator: "type-three",
        },
        {
            title: 'Ответ 10',
            content: 'Содержимое ответа 10',
            color: "purple",
        },
        {
            title: 'Ответ 11',
            content: 'Содержимое ответа 11',
            color: "orange",
        },
        {
            title: 'Ответ 12',
            content: 'Содержимое ответа 12',
            color: "yellow",
        },
    ];
    
    // title - Название кнопки
    // id - Уникальный айди кнопки
    // prefix_id - Айди префикса из system.prefixes
    // openedThread - Открыта / Закрыта ли тема (0 - закрыта / 1 - открыта)
    // sticky - Закрыпрена ли тема (0 - открепить / 1 - закрепить)
    const MenuButtons = [
        {
            title: "Важно",
            id: "wajno",
            prefix_id: system.prefixes.wajno,
            openedThread: "0",
            sticky: "1"
        },
        {
            title: "Информация",
            id: "info",
            prefix_id: system.prefixes.info,
            openedThread: "0",
            sticky: "1"
        },
        {
            title: "Правила",
            id: "rules",
            prefix_id: system.prefixes.rules,
            openedThread: "0",
            sticky: "1"
        },
        {
            title: "Обрабатывается",
            id: "obrab",
            prefix_id: system.prefixes.obrab
        },
        {
            title: "На рассмотрении",
            id: "naras",
            prefix_id: system.prefixes.naras
        },
        {
            title: "Рассмотрено",
            id: "ras",
            prefix_id: system.prefixes.ras,
            openedThread: "0"
        },
        {
            title: "Рассмотрение Кр. Адм",
            id: "narasspec",
            prefix_id: system.prefixes.narasspec
        },
        {
            title: "Рассмотрение ГА",
            id: "narasga",
            prefix_id: system.prefixes.narasga
        },
        {
            title: "Отказано",
            id: "otcaz",
            prefix_id: system.prefixes.otcaz
        },
        {
            title: "Arena",
            id: "arena",
            prefix_id: system.prefixes.arena
        },
        {
            title: "Отказано",
            id: "otcaz",
            prefix_id: system.prefixes.otcaz
        },
        {
            title: "Отчет",
            id: "otchet",
            prefix_id: system.prefixes.otchet
        },
        {
            title: "Важная информация",
            id: "superinfo",
            prefix_id: system.prefixes.superinfo
        },
        {
            title: "Обсуждение",
            id: "obsujdenie",
            prefix_id: system.prefixes.obsujdenie
        },
        {
            title: "Снять префикс",
            id: "remove",
            prefix_id: system.prefixes.remove
        },
    ];
    
    $(document).ready(() => {
        $('head').append('<link rel="stylesheet" href="https://moonlightperson.github.io/fa-6-pro/css/all.css">');
        $('head').append('<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet');
        $('body').append('<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>');
        $('.fr-toolbar.fr-ltr.fr-desktop.fr-top.fr-basic').prepend('<button id="xf-preview-shilkin" type="button" class="button rippleButton" data-xf-click="preview-click"><span class="button-text"></span></button>');
        $('.message-editorWrapper').append('<div id="select_prefix" class="xf-select-prefix"></div');
        
        addButton('Выбрать ответ', 'selectAnswer');
        MenuButtons.forEach((btn) => {
            addMenuButton(btn.title, btn.id);
            $('button#'+btn.id).click(() => editThreadData(btn.prefix_id, btn.openedThread ?? "1", btn.sticky ?? "0"));
        });
    
        const threadData = getThreadData();
        
        $(`button#selectAnswer`).click(() => {
            XF.alert(
                buttonsMarkup(buttons), 
                null, 
                `Мой господин, царь и бог <font color="${system.user.color}"><b>${system.user.name}</b></font>, выберите ответ:`
            );
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
    
    function addMenuButton(name, id) {
        $('#select_prefix').append(
            `<button type="button" class="button--link js-attachmentUpload button button--icon button--icon--attach menuButton" id="${id}" style="margin: 3px;">${name}</button>`,
        );
    }
  
    function buttonsMarkup(buttons) {
        return `<div class="select_answer">${buttons
        .map(
            (btn, i) =>
                `<button type="button" id="answers-${i}" class="button--primary button ` +
                `rippleButton ${system.separators[btn.separator] || 'panelButton'}" style="border-color:${btn.color}"><span class="button-text">${btn.title}</span></button>`,
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

    function editThreadData(prefix, opened = "1", pinned = "0") {
        // Получаем заголовок темы, так как он необходим при запросе
        const threadTitle = $('.p-title-value')[0].lastChild.textContent;
    
        fetch(`${document.URL}edit`, {
            method: 'POST',
            body: getFormData({
                prefix_id: prefix,
                title: threadTitle,
                discussion_open: opened,
                sticky: pinned,
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
