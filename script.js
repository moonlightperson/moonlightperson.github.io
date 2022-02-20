  $(document).ready(() => {
  
	  if (document.URL != "https://logs.supreme-games.ru/pages/subscription") {
	   $('.middel').replaceWith('<td class="middel"><div class="box">' +
        '<div class="boxtitle">Добрый день</div>' +
		'Вы попали на сайт мониторинга происходящего на сервере <a href = "https://vk.com/arizonarp_new">Arozona Supreme</a> где учавствует <a href = "https://vk.com/coder_supreme">Илья Мельников</a>.<br><br>' +
		'<font color = "#e3e3e3">[<font color="#d90202"><b>DARKSTYLE</b></font>] Style by <a href = "https://vk.com/moon.light7777">Tyoma Shilkin</font></a>'  +
				'<br><br>Logs size 3468344 in BD supremenew    ');
	} else {
	   return false;
	}
  
})();
