export function addButton(name, id) {
    $('.button--icon--reply').after(
        `<button type="button" class="button rippleButton" id="${id}" style="margin: 3px;">${name}</button>`,
    );
}

 export function addMenuButton(name, id) {
    $('#select_prefix').append(
        `<button type="button" class="button--link js-attachmentUpload button button--icon button--icon--attach menuButton" id="${id}" style="margin: 3px;">${name}</button>`,
    );
}

 export function buttonsMarkup(buttons) {
    return `<div class="select_answer">${buttons
    .map(
        (btn, i) =>
            `<button type="button" id="answers-${i}" class="button--primary button ` +
            `rippleButton ${system.separators[btn.separator] || 'panelButton'}" style="border-color:${btn.color}"><span class="button-text">${btn.title}</span></button>`,
    )
    .join('')}</div>`;
}

 export function pasteContent(id, data = {}) {
    const template = Handlebars.compile(buttons[id].content);
    if ($('.fr-element.fr-view p').text() === '') $('.fr-element.fr-view p').empty();

    $('span.fr-placeholder').empty();
    $('div.fr-element.fr-view p').append(template(data));
    $('a.overlay-titleCloser').trigger('click');
}

 export function getThreadData() {
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

 export function editThreadData(prefix, opened = "1", pinned = "0") {
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

export function getFormData(data) {
    const formData = new FormData();
    Object.entries(data).forEach(i => formData.append(i[0], i[1]));
    return formData;
}
