// 蹂��� �좎뼵遺�
var wrapper = document.querySelector('.wrapper'),
	page = document.querySelectorAll('.page'),
	indicator = document.getElementById('indicator'),
	indicator_li = indicator.querySelectorAll('li');

var yDeg = 0,
	indicator_num = 1,
	indicator_length = page.length,
	w = page[0].offsetWidth,
	page_angle = 0,
	page_vector = 0;

var hammer = new Hammer(wrapper);

// �섏씠吏� 珥덇린��
function init_page(){
	w = page[0].offsetWidth;

	// 3D page 4硫댁껜 �꾩튂 �뺤쓽
	for(var i = 0; i < page.length; i++){
		page[i].style.transform = 'rotateY(' + page_angle + 'deg) translateZ(' + (w/2) + 'px)';
		page_angle += 90;
	}

	// page wrapper �뺣㈃�쇰줈 珥덇린��
	wrapper.style.transform = 'translateZ(' + (-w/2) + 'px) rotateY(' + yDeg + 'deg)';
}			

// �몃뵒耳��댄꽣 珥덇린��
function init_indicator(){
	// �몃뵒耳��댄꽣 �쒖떆
	for(var i = 0; i < indicator_length; i++){
		indicator.innerHTML += '<li>' + (i+1) + '</li>';
	}		

	indicator_li = indicator.querySelectorAll('li'); // 紐⑸줉
	change_page(indicator_num);		
}

// �섏씠吏� �꾪솚
function change_page(inum){
	// �꾩옱 �몃뵒耳��댄꽣 �섏씠�쇱씠�� �쒖떆
	indicator_li[inum-1].setAttribute('class', 'active');
	yDeg = -90 * (inum - 1);
	wrapper.style.transform = 'translateZ(' + (-w/2) + 'px) rotateY(' + yDeg + 'deg)';

	// �몃뵒耳��댄꽣 �쒖떆
	for(var i = 0; i < indicator_li.length; i++){
		indicator_li[i].removeAttribute('class');
	}
	indicator_li[inum - 1].setAttribute('class', 'active');			
}

/* ---------------------------------------------------------------- */
init_page();
init_indicator();


/* ------------------- �대깽�� 由ъ뒪�� ------------------------------ */
for(var i = 0; i < indicator_li.length; i++){
	indicator_li[i].addEventListener('click', function(){
		indicator_num = parseInt(this.innerText);
		change_page(indicator_num);
	});
}

// �곗튂 swipe left
hammer.on('swipeleft', function(e){
	// �몃뵒耳��댄꽣(�섏씠吏�) �대룞 踰붿쐞 �댁씠硫�
	if(indicator_num < indicator_length){
		page_vector = 1;
	} else page_vector = 0;

	indicator_num += page_vector;				
	change_page(indicator_num);			
});

// �곗튂 swipe right
hammer.on('swiperight', function(e){
	if(indicator_num > 1){
		page_vector = -1;
	} else page_vector = 0;

	indicator_num += page_vector;				
	change_page(indicator_num);			
});

// 李쏀겕湲� 蹂�寃쎌떆 �섏씠吏� 珥덇린��
window.onresize = function(){
	init_page();	
}
