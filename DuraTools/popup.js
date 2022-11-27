let reportSaveButton = document.getElementById("report-save-button");

reportSaveButton.addEventListener("click", async (event) => {
    let first_name = document.getElementById("shilkin-first-name");
    let last_name = document.getElementById("shilkin-lest-name");
    let admin_prefix = document.getElementById("shilkin-prefix-name");
    let thread_color = document.getElementById("shilkin-report-thread-color");

    await chrome.storage.sync.set({
        'shilkin-first-name': first_name.value,
        'shilkin-lest-name': last_name.value,
        'shilkin-prefix-name': admin_prefix.value,
        'shilkin-report-thread-color': thread_color.value
    })

    await insertIntoLogs(`Информация для об администраторе успешно изменена`)

    window.close();
});

chrome.storage.sync.get(['shilkin-first-name', 'shilkin-lest-name', 'shilkin-prefix-name', 'shilkin-report-thread-color'], function(result) {
    document.getElementById("shilkin-first-name").value = result['shilkin-first-name']
    document.getElementById("shilkin-lest-name").value = result['shilkin-lest-name']
    document.getElementById("shilkin-prefix-name").value = result['shilkin-prefix-name']
    document.getElementById("shilkin-report-thread-color").value = result['shilkin-report-thread-color']
});

let contentTabs = ['tab-href-1', "tab-href-2", "tab-href-3", "tab-href-4"]
document.getElementById("tab-href-1").addEventListener("click", changeTab);
document.getElementById("tab-href-2").addEventListener("click", changeTab);
document.getElementById("tab-href-3").addEventListener("click", changeTab);
document.getElementById("tab-href-4").addEventListener("click", changeTab);

function changeTab(element) {
    contentTabs.forEach(item => {
        if (element.target.id !== item) {
            document.getElementById(item).classList.remove("text-white");
            document.getElementById(item).classList.add('text-secondary')
            document.getElementById(item + "-content").hidden = true
        }
        else {
            document.getElementById(item).classList.add("text-white");
            document.getElementById(item).classList.remove('text-secondary')
            document.getElementById(item + "-content").hidden = false
        }
    })
}

document.getElementById("tab-href-2").click()

let selectorBuffer = []

chrome.storage.sync.get({'shilkin-fast-answer-selector': [
        {title: 'Кнопка 1', content: null},
        {title: 'Кнопка 2', content: null},
        {title: 'Кнопка 3', content: null},
        {title: 'Кнопка 4', content: null},
        {title: 'Кнопка 5', content: null},
        {title: 'Кнопка 6', content: null},
        {title: 'Кнопка 7', content: null},
        {title: 'Кнопка 8', content: null},
        {title: 'Кнопка 9', content: null},
        {title: 'Кнопка 10', content: null},
        {title: 'Кнопка 11', content: null},
        {title: 'Кнопка 12', content: null},
        {title: 'Кнопка 13', content: null},
        {title: 'Кнопка 14', content: null},
        {title: 'Кнопка 15', content: null},
        {title: 'Кнопка 16', content: null},
        {title: 'Кнопка 17', content: null},
        {title: 'Кнопка 18', content: null},
        {title: 'Кнопка 19', content: null},
        {title: 'Кнопка 20', content: null},
    ]},
    result => {
        selectorBuffer = result['shilkin-fast-answer-selector']

        let shilkin_fast_answer_selector = document.getElementById('shilkin-fast-answer-selector')

        result['shilkin-fast-answer-selector'].forEach((item, key) => {
            shilkin_fast_answer_selector.insertAdjacentHTML('beforeend', `<option id="fastanswer-select-button-${ key + 1 }" value="${ key + 1 }">${ item.title }</option>`)
        })
    });

let selectButton = document.querySelector('#shilkin-fast-answer-selector');
let selectValue;

selectButton.addEventListener("change", async (event) => {
    selectValue = event.target.value - 1

    let data = selectorBuffer[selectValue]

    document.getElementById("fastanswer-button-title-input").value = data.title
    document.getElementById("fastanswer-button-body-input").value = data.content
});

let fastAnswerSaveButton = document.getElementById("shilkin-fast-answer-save-button");

fastAnswerSaveButton.addEventListener("click", async (event) => {
    let title = document.getElementById("fastanswer-button-title-input").value;
    let content = document.getElementById("fastanswer-button-body-input").value;

    selectorBuffer[selectValue] = {
        title: title,
        content: content
    }

    await chrome.storage.sync.set({'shilkin-fast-answer-selector' : selectorBuffer})

    await insertIntoLogs(`Кнопка "${ title }" успешно изменена`)

    window.close();
});

let fastAnswerClearButton = document.getElementById("shilkin-fast-answer-clear-button");

fastAnswerClearButton.addEventListener("click", async (event) => {
    document.getElementById("fastanswer-button-title-input").value = `Кнопка ${ selectValue }`
    document.getElementById("fastanswer-button-body-input").value = null

    selectorBuffer[selectValue] = {
        title: `Кнопка ${ selectValue }`,
        content: null
    }

    await chrome.storage.sync.set({'shilkin-fast-answer-selector' : selectorBuffer})

    await insertIntoLogs(`Кнопка "${ title }" успешно очищена`)
});


document.getElementById("tab-href-3").click()

let selectorPrefixBuffer = []
chrome.storage.sync.get({'shilkin-fast-prefix-selector': [
        {title: 'Префикс 0', id: null},
        {title: 'Префикс 1', id: null},
        {title: 'Префикс 2', id: null},
        {title: 'Префикс 3', id: null},
        {title: 'Префикс 4', id: null},
        {title: 'Префикс 5', id: null},
        {title: 'Префикс 6', id: null},
        {title: 'Префикс 7', id: null},
        {title: 'Префикс 8', id: null},
        {title: 'Префикс 9', id: null},
        {title: 'Префикс 10', id: null},
        {title: 'Префикс 11', id: null},
    ]},
    result => {
        selectorPrefixBuffer = result['shilkin-fast-prefix-selector']

        let shilkin_fast_prefix_selector = document.getElementById('shilkin-fast-prefix-selector')

        result['shilkin-fast-prefix-selector'].forEach((item, key) => {
            shilkin_fast_prefix_selector.insertAdjacentHTML('beforeend', `<option id="fastprefix-select-button-${ key + 1 }" value="${ key + 1 }">${!item.id ? item.title : `${item.title} (${item.id})`}</option>`)
        })
    });

let selectPrefix = document.querySelector('#shilkin-fast-prefix-selector');
let selectID;

selectPrefix.addEventListener("change", async (event) => {
    selectID = event.target.value - 1

    let data = selectorPrefixBuffer[selectID]

    document.getElementById("fastprefix-button-title-input").value = data.title
    document.getElementById("fastprefix-button-id-input").value = data.id

});

let fastPrefixSaveButton = document.getElementById("shilkin-fast-prefix-save-button");

fastPrefixSaveButton.addEventListener("click", async (event) => {
    let title = document.getElementById("fastprefix-button-title-input").value;
    let id = document.getElementById("fastprefix-button-id-input").value;

    selectorPrefixBuffer[selectID] = {
        title: title,
        id: id
    }

    await chrome.storage.sync.set({'shilkin-fast-prefix-selector' : selectorPrefixBuffer})

    await insertIntoLogs(`Префикс "${ title } (${ id })" успешно изменён`)

    window.close();
});

let fastPrefixClearButton = document.getElementById("shilkin-fast-prefix-clear-button");

fastPrefixClearButton.addEventListener("click", async (event) => {
    document.getElementById("fastprefix-button-title-input").value = `Префикс ${ selectID }`
    document.getElementById("fastprefix-button-id-input").value = null

    selectorPrefixBuffer[selectID] = {
        title: `Префикс ${ selectID }`,
        id: null
    }

    await chrome.storage.sync.set({'shilkin-fast-prefix-selector' : selectorPrefixBuffer})

    await insertIntoLogs(`Префикс ${selectID} успешно очищен`)
});


let logsListBuffer = [];
chrome.storage.sync.get({
    'shilkin-logs-selector': logsListBuffer
},
result => {
    logsListBuffer = result['shilkin-logs-selector']
    let shilkin_logs_selector = document.getElementById('shilkin-logs-selector')

    result['shilkin-logs-selector'].forEach((item, key) => {
        shilkin_logs_selector.insertAdjacentHTML('beforeend', `<tr><td class="action">${ item.action }</td><td class="date">${ item.date }</td></tr>`)
    })
});

async function insertIntoLogs(action) {
    logsListBuffer.unshift({action: action, date: getDate()})
    await chrome.storage.sync.set({"shilkin-logs-selector" : logsListBuffer})
}

function getDate() {
    date = new Date();
    return `${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()} ${date.getUTCDay()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`
}
