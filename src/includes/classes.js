var map = new Array(18); //map[y(row)][x(column)]
for(var mX = 0; mX < 32; mX++){
	map[mX] = new Array(32);
}

//!Classes
//Constructor
function Thing(id,type,x,y,lines,customClass){
	this.id		= id;
	this.x 		= x;
	this.y 		= y;
	this.count 	= 0;
	
	if(!customClass) this.customClass = '';
	else this.customClass = customClass;
	if(!type) this.type = 'thing';
	else this.type = type;
	
	this.html = '<div id="'+this.id+'" class="thing '+this.type+' '+this.customClass+'"></div>';
	
	if(!lines && lines != '')
		this.lines = [
			'This is a thing. Its ID is '+id+'.',
			'Press "e" to interact with this thing.',
			'Congratulations, you have interacted with this thing at least three times.'
		];
	else
		this.lines = lines;
	
	model = Thing.prototype;
	if(!model.getType){
		//Accessors
		model.getType = function(){ return this.type; } 
		model.getLines = function(){ return this.lines; }
		model.getCount = function(){ return this.count; }
		//Mutators
		model.setType = function(newType){ this.type = newType; return true; }
		model.setLines = function(newLines){ this.lines = newLines; return true; }
		//Others
		model.interact = function(){
			if(this.lines.length < 1) return;
			if(this.type == 'person'){
				var oppDirection;
				if(direction == 'up') dir = 'down';
				else if(direction == 'right') dir = 'left';
				else if(direction == 'down') dir = 'up';
				else if(direction == 'left') dir = 'right';
				changeFacing($('#'+this.id),dir);
				
				/* At some point
				setTimeout(function(){
					changeFacing($('#'+this.id),this.facing)
				},1000)
				*/
			}
			if(this.count < this.lines.length) {
				if(cout(this.lines[this.count])) this.count++; //Cout and only count on successful cout
			}
			else {
				if(cout(this.lines[this.lines.length - 1])) this.count++;
			}
		}
		model.register = function(){
			map[this.y][this.x] = this;
			return this;
		}
		model.manifest = function(){
			$('#screen td[x='+this.x+'][y='+this.y+']').html(this.html);
			return this;
		}
		model.destroy = function(){
			$('#'+this.id).remove();
		}
	}
	this.register().manifest();
}
function Wall(id,x1,x2,y1,y2,customClass){
	//A wall is a group of wall objects
	//A wall is an abstract concept. What actually exists is a number of blocks,
	//which we create here.
	if(!customClass) customClass = '';
	var count = 0;
	for(var x = x1; x <= x2; x++) {
		for(var y = y1; y <= y2; y++){
			new WallBlock(id+'-'+count,x,y,customClass); 
		}
	}
}
function WallBlock(id,x,y,customClass){
	this.id 	= id;
	this.type	= 'wall';
	this.x 		= x;
	this.y 		= y;
	this.lines	= '';
	if(!customClass) customClass = '';
	else this.customClass = customClass;
		
	WallBlock.prototype = new Thing(this.id,this.type,this.x,this.y,this.lines,this.customClass);
}
function Interior(id,x1,x2,y1,y2,customClass){
	//A interior structure is also a group of objects
	if(!customClass) customClass = '';
	var count = 0;
	for(var x = x1; x <= x2; x++) {
		for(var y = y1; y <= y2; y++){
			new InteriorBlock(id+'-'+count,x,y,customClass); 
		}
	}
}
function InteriorBlock(id,x,y,customClass){
	this.id 	= id;
	this.type	= 'interior';
	this.x 		= x;
	this.y 		= y;
	this.lines	= '';
	if(!customClass) this.customClass = '';
	else this.customClass = customClass;
		
	InteriorBlock.prototype = new Thing(this.id,this.type,this.x,this.y,this.lines,this.customClass);
}
function Terrain(id,x1,x2,y1,y2,customClass){
	//This is impassable terrain
	if(!customClass) customClass = '';
	var count = 0;
	for(var x = x1; x <= x2; x++) {
		for(var y = y1; y <= y2; y++){
			new TerrainBlock(id+'-'+count,x,y,customClass); 
		}
	}
}
function TerrainBlock(id,x,y,customClass){
	this.id 	= id;
	this.type	= 'terrain';
	this.x 		= x;
	this.y 		= y;
	this.lines	= '';
	if(!customClass) this.customClass = '';
	else this.customClass = customClass;
		
	TerrainBlock.prototype = new Thing(this.id,this.type,this.x,this.y,this.lines,this.customClass);
}
function Tree(id,x,y,customClass){
	this.id 	= id;
	this.type	= 'tree';
	this.x 		= x;
	this.y 		= y;
	this.lines	= '';
	if(!customClass) customClass = '';
	else this.customClass = customClass;
		
	WallBlock.prototype = new Thing(this.id,this.type,this.x,this.y,this.lines,this.customClass);
}



function Person(id,name,gender,x,y,facing,lines,customClass){
	this.id 	= id;
	this.type	= 'person';
	this.name 	= name;
	this.gender = gender;
	this.x 		= x;
	this.y 		= y;
	
	if(!facing) this.facing = 'right';
	else this.facing = facing;
	if(!customClass) this.customClass = 'facing-'+this.facing;
	else this.customClass = 'facing-'+facing+' '+customClass;
	
	if(!lines)
		this.lines = [
			'"Hi. My name is '+name+'," says '+name+'.',
			'"You\'ve apparently figured out how to interact with me," '+(gender=='male'?'he':'she')+' continues.',
			'"That\'s nice."'
		];
	else
		this.lines = lines;
	
	//Assign Person as a subset of Thing
	Person.prototype = new Thing(this.id,this.type,this.x,this.y,this.lines,this.customClass);
}