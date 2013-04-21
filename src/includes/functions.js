//!Functions
/*
function parseKey(e){
	if(page == 'menu' || page == 'start-menu' || page == 'title-screen') parseKeyMenu(e);
	else if(page == 'screen') parseKeyScreen(e);
}
*/
function parseKeyScreen(e){ //On keydown
	key = e.keyCode ? e.keyCode : e.charCode;
	switch(key){
		case 38 : //up arrow
		case 87 : moveUp(); break; //w
		
		case 39 : //right arrow
		case 68 : moveRight(); break; //d
		
		case 40 : //down arrow
		case 83 : moveDown(); break; //s
		
		case 37 : //left arrow
		case 65 : moveLeft(); break; //a
		
		case 32 : interact(); break; //space
	}
	updateCoordinates();
}
function parseKeyMenu(e){ //On keyup
	key = e.keyCode ? e.keyCode : e.charCode;
	switch(key){
		case 38 : 	//up arrow
		case 87 :	if(page == 'menu' || page == 'start-menu'){ prevInMenu(); }
					else if(page == 'inventory') { moveUpInventory(); }
					break; //w
		
		case 39 : 	//right arrow
		case 68 : 	if(page == 'inventory') { moveRightInventory(); }
					break; //d
		
		case 40 : 	//down arrow
		case 83 : 	if(page == 'menu' || page == 'start-menu') { nextInMenu(); }
					else if(page == 'inventory') { moveDownInventory(); }
					break; //s
		
		case 37 : 	//left arrow
		case 65 :	if(page == 'inventory') { moveLeftInventory(); }
					break; //a
		
		case 32 :	if(page == 'menu' || page == 'start-menu') { selectInMenu(); }
					else if(page == 'inventory') { closeInventory(); }
					break; //space
					
		case 27 : 	if(page == 'inventory') { closeInventory(); }
					break; //esc
	}
	updateCoordinates();
}
function openMenu(){
	$('.active').removeClass('active');
	$('#menu').css('display','block');
	$('#menu li .cursor').first().addClass('active');
	page = 'menu';
}
function closeMenu(){
	$('#menu').css('display','none');
	$('#menu li .cursor').removeClass('active');
	page = 'screen';
}
function nextInMenu(){
	if($('.cursor.active').parent().next().find('.cursor').length > 0)
		$('.cursor.active').removeClass('active').parent().next().find('.cursor').addClass('active');
}
function prevInMenu(){
	if($('.cursor.active').parent().prev().find('.cursor').length > 0)
		$('.cursor.active').removeClass('active').parent().prev().find('.cursor').addClass('active'); 
}
function selectInMenu(){
	var value = $('.cursor.active').parents('li').attr('value');
	//Start Menu Options
	if(page == 'start-menu'){
		if(value == 'start') startGame();
		else if(value == 'quit') quitGame();
	}
	if(page == 'menu'){
		if(value == 'inventory') openInventory();
		else if(value == 'quit') quitGame();
	}
}
function moveUpInventory(){
	var current = $('#inventory td.active');
	var activeX = $(current).attr('x') * 1;
	var activeY = $(current).attr('y') * 1;
	var inventoryUp = '#inventory td[x='+activeX+'][y='+(activeY-1)+']';
		
	if($(document).find(inventoryUp).length > 0){
		$(current).removeClass('active');
		$(inventoryUp).addClass('active');
	}
}
function moveRightInventory(){
	var current = $('#inventory td.active');
	var activeX = $(current).attr('x') * 1;
	var activeY = $(current).attr('y') * 1;
	var inventoryRight = '#inventory td[x='+(activeX+1)+'][y='+activeY+']';
	if($(document).find(inventoryRight).length > 0){
		$(current).removeClass('active');
		$(inventoryRight).addClass('active');
	}
}
function moveDownInventory(){
	var current = $('#inventory td.active');
	var activeX = $(current).attr('x') * 1;
	var activeY = $(current).attr('y') * 1;
	var inventoryDown = '#inventory td[x='+activeX+'][y='+(activeY+1)+']';
		
	if($(document).find(inventoryDown).length > 0){
		$(current).removeClass('active');
		$(inventoryDown).addClass('active');
	}
}
function moveLeftInventory(){
	var current = $('#inventory td.active');
	var activeX = $(current).attr('x') * 1;
	var activeY = $(current).attr('y') * 1;
	var inventoryLeft = '#inventory td[x='+(activeX-1)+'][y='+activeY+']';
		
	if($(document).find(inventoryLeft).length > 0){
		$(current).removeClass('active');
		$(inventoryLeft).addClass('active');
	}
}




function openInventory(){
	$('.active').removeClass('active');
	$('#inventory').css('display','block');
	$('#menu').css('display','none');
	menu = false;
	$('#inventory td').first().addClass('active');
	page = 'inventory';
	inventory = true;
}
function closeInventory(){
	$('.active').removeClass('active');
	$('#inventory').css('display','none');
	page = 'screen';
	inventory = false;
}

























function startMenu(){
	$('.active').removeClass('active');
	$('#start-menu li .cursor').first().addClass('active');
	jankFade($('#title-screen'),1);
	page = 'start-menu';	
}
function startGame(){
	$('#start-menu').css('display','none');
	page = 'screen';
	//Call whichever screen you want to have as the starting screen
	callScreen(0,0);
	//Put out some intro text
	text = "Some more placeholder text. Isn't this exciting?";
	cout(text,0);
	changeFacing($('#sprite'),'left');
	updateCoordinates();
}
function quitGame(){
	//This doesn't actually *quit* - reset game or something later.
	$('#title-screen,#start-menu').css({'opacity':1,'display':'block'});
	$('#menu').css('display','none');
	page = 'title-screen';
}
function callScreen(x,y){
	if(!locale[x][y]) return false;
	//Unnecessary for movement-triggered screen changes but
	//for arbitary ones we need this following line
	screen = {'x':x,'y':y};
	
	//Keeps from triggering before the entities have loaded from a previous call
	loaded = false;
	
	//Clear out the map of entities without destroying its structure
	$('#screen td').html('');
	for(var mX = 0; mX < 32; mX++){
		for(var mY = 0; mY < 32; mY++){
			map[mX][mY] = null;
		}
	}
	//If the populating function has completed and returned
	if(locale[x][y]() == true) {
		if(direction == 'up') pcY = 17;
		else if(direction == 'right') pcX = 0;
		else if(direction == 'down') pcY = 0;
		else if(direction == 'left') pcX = 31;
		placeSprite();
	
		loaded = true;
	}
}
function placeSprite(){
	var sprite = '<div id="sprite"></div>';
	$('#screen td[x='+pcX+'][y='+pcY+']').html(sprite);
	changeFacing($('#sprite'),direction);
}
function clearSprite(){
	$('#screen td[x='+pcX+'][y='+pcY+']').html('');
}
function changeFacing(elem,dir){
	if(dir == 'up') $(elem).css('box-shadow','inset 0 4px 0 0 rgba(255,255,255,0.5)');
	else if(dir == 'right') $(elem).css('box-shadow','inset -4px 0 0 0 rgba(255,255,255,0.5)');
	else if(dir == 'down') $(elem).css('box-shadow','inset 0 -4px 0 0 rgba(255,255,255,0.5)');
	else if(dir == 'left') $(elem).css('box-shadow','inset 4px 0 0 0 rgba(255,255,255,0.5)');
}
function updateCoordinates(){
	$('#coordinates').text(pcX+','+pcY)
	up = '#screen td[x='+pcX+'][y='+(pcY-1)+']';
	right = '#screen td[x='+(pcX+1)+'][y='+pcY+']';
	down = '#screen td[x='+pcX+'][y='+(pcY+1)+']';
	left = '#screen td[x='+(pcX-1)+'][y='+pcY+']';
}
function moveUp(){
	direction = 'up';
	if($(document).find(up).length > 0 && $(document).find(up).html() == ''){
		clearSprite();
		pcY--;
		placeSprite();
		changeFacing($('#sprite'),'up');
	}
	else if($(document).find(up).length > 0){
		changeFacing($('#sprite'),'up');
	}
	else if($(document).find(up).length < 1 && locale[screen['x']][screen['y']-1] && loaded == true) {
		callScreen(screen['x'],screen['y']-1);
	}
}
function moveRight(){
	direction = 'right';
	if($(document).find(right).length > 0 && $(document).find(right).html() == ''){
		clearSprite();
		pcX++;
		placeSprite();
		changeFacing($('#sprite'),'right');
	}
	else if($(document).find(right).length > 0){
		changeFacing($('#sprite'),'right');
	}
	else if($(document).find(right).length < 1 && locale[screen['x']+1][screen['y']] && loaded == true) {
		callScreen(screen['x']+1,screen['y']);
	}
}
function moveDown(){
	direction = 'down';
	if($(document).find(down).length > 0 && $(document).find(down).html() == ''){
		clearSprite();
		pcY++;
		placeSprite();
	}
	else if($(document).find(down).length > 0){
		changeFacing($('#sprite'),'down');
	}
	else if($(document).find(down).length < 1 && locale[screen['x']][screen['y']+1] && loaded == true) {
		callScreen(screen['x'],screen['y']+1);
	}
}
function moveLeft(){
	direction = 'left';
	if($(document).find(left).length > 0  && $(document).find(left).html() == ''){
		clearSprite();
		pcX--;
		placeSprite();
	}
	else if($(document).find(left).length > 0){
		changeFacing($('#sprite'),'left');
	}
	else if($(document).find(left).length < 1 && locale[screen['x']-1][screen['y']] && loaded == true) {
		callScreen(screen['x']-1,screen['y']);
	}
}
function interact(){
	if(direction == 'up' && $(up).find('.thing').length > 0){ map[pcY-1][pcX].interact(); }
	else if(direction == 'right' && $(right).find('.thing').length > 0){ map[pcY][pcX+1].interact(); }
	else if(direction == 'down' && $(down).find('.thing').length > 0){ map[pcY+1][pcX].interact(); }
	else if(direction == 'left' && $(left).find('.thing').length > 0){ map[pcY][pcX-1].interact(); }
}



function applyTexture(x,y,texture){
	$('#screen td[x='+x+'][y='+y+']').addClass('texture_'+texture);
}
function applyBaseTexture(texture){
	$('#screen td').removeClass().addClass('texture_'+texture);
}









/* EFFECTS/COSMETIC */
function jankFade(elem,opacity){
	if(opacity <= 0) {
		$(elem).css('display','none');
		return true;
	}
	$(elem).css('opacity',(opacity -= .4));
	setTimeout(function(){
		jankFade(elem,opacity);
	},400);
}

function cout(text){
	if(!semaphore) { //If there is no text being appended, append text
		$('#console #text').text('');
		appendText(text);
		return true;
	}
	else { //If text is being appended, complete it with the stored text in buffer
		queue = true;
		return false;
	}
}

function appendText(text,index,elem){
	semaphore = true;

	if(!index) index = 0;
	if(!elem) elem = $('#console #text');
	
	if(index < text.length && queue == false){
		$(elem).append(text[index++]);
		setTimeout(function(){appendText(text,index,elem)},50);
	}
	else if(queue == true){
		$(elem).text(text);
		semaphore = false;
		queue = false;
		return false;
	}
	else if(index >= text.length){
		semaphore = false;
		return true;
	}
}







