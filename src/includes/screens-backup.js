//Array of screens with coordinates x,y to call them
var locale = new Array(2); //local[y(row)][x(column)]
for(var lX = 0; lX < 2; lX++){
	locale[lX] = new Array(2);
}

locale[0][0] = outsideTopHouse;
locale[1][0] = aboveHouse;
locale[1][1] = startScreen;
locale[0][1] = outsideHouse;

function startScreen(){
	//Things register and manifest themselves
	//They just need to be called - doing it anonymously is fine
	new Person('Bob','Bob','male',26,3);
	new Person('Gemma','Gemma','female',11,12,'right');
	new Person('Bert','Bert','male',28,15,'up');
	new Person('Brill','Brill','female',7,2,'down');
	
	//Walls take a start x, end x, start y, end y
	//Screen walls
	new Wall('wall1',0,4,0,7); 
	new Wall('wall2',0,4,10,17);
	new Wall('wall3',5,31,0,0);
	new Wall('wall4',5,31,17,17);
	new Wall('wall5',31,31,0,17);
	//Interior walls
	new Wall('wall7',27,30,10,10);
	new Wall('wall8',9,25,10,10);
	new Wall('wall9',24,24,10,17);
	new Wall('wall10',9,9,12,17);
	new Wall('wall10',13,13,11,13);
	new Wall('wall11',15,23,13,13);
	
	//Bert's furniture
	new Interior('bert-table',25,26,14,16);
	new Interior('gemma-table',11,13,15,16);
	//Living room or something
	new Interior('table',28,29,2,4);
	
	return true;
}

function outsideHouse(){	
	new Person('Paddy','Paddy','male',19,5);
	
	new Wall('wall1',30,31,0,7); 
	new Wall('wall2',30,31,10,17);
	new Wall('wall3',28,29,0,3);
	new Wall('wall4',28,29,14,17);
	new Wall('wall5',23,27,2,3);
	new Wall('wall6',23,27,14,15);
	new Wall('wall7',23,23,4,7);
	new Wall('wall8',23,23,10,13);
	
	new Terrain('terrain2',0,27,17,17);
	new Terrain('terrain3',0,0,0,17);
	
	new Terrain('bush1',21,21,3,3);
	new Terrain('bush2',21,21,5,5);
	new Terrain('bush3',21,21,7,7);
	new Terrain('bush4',21,21,10,10);
	new Terrain('bush5',21,21,12,12);
	new Terrain('bush6',21,21,14,14);
	
	return true;
}
function outsideTopHouse(){	
	new Wall('wall2',28,31,15,17);
	
	new Terrain('terrain1',0,31,0,0);
	new Terrain('terrain3',0,0,0,17);
	
	return true;
}
function aboveHouse(){
	new Person('Ketty','Ketty','female',19,5);
	
	new Wall('wall2',0,31,15,17);
	
	new Terrain('terrain1',31,31,0,14);
	new Terrain('terrain3',0,31,0,0);
	
	return true;
}