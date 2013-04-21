<?php include('includes/parser.php'); ?>
<head>
	<link type="text/css" rel="stylesheet" href="includes/style.css" />
	<link href='http://fonts.googleapis.com/css?family=VT323|Press+Start+2P' rel='stylesheet' type='text/css'>
	
	<script type="text/javascript" src="includes/functions.js"></script>
	<script type="text/javascript" src="includes/classes.js"></script>
	<script type="text/javascript" src="includes/screens.js"></script>

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js"></script>

	<script>
		var dev = false;
		
		
		
		//!Global variables
		var page = 'title-screen';
		var screen = {'x':0,'y':0};
		var pcX = 18, pcY = 8;
		var up = 'td[x='+pcX+'][y='+(pcY-1)+']';
		var right = 'td[x='+(pcX+1)+'][y='+pcY+']';
		var down = 'td[x='+pcX+'][y='+(pcY+1)+']';
		var left = 'td[x='+(pcX-1)+'][y='+pcY+']';
		var direction = '';
		
		var semaphore = false;
		var queue = false;
		var loaded = true;
		
		var menu = false;
		var inventory = false;

		
		$(document).ready(function(){
			//Dev functions for grid
			if(dev == true){
				$('#overlay').css('display','none');
				$('#screen td').hover(function(){
					$('#dev-grid').text($(this).attr('x')+','+$(this).attr('y'));
				})
				$('#screen td').click(function(){
					$(this).toggleClass('dev-select');
				})
			}
			//Move this elsewhere in a cleaner function
			$(document).keyup(function(e){
				key = e.keyCode ? e.keyCode : e.charCode;
				if(page == 'screen'){
					if(key == 69 && menu == true) { closeMenu(); menu = false; }
					else if(key == 69 && menu == false) { openMenu(); menu = true; }
				}
				else if(page == 'menu' || page == 'start-menu' || page == 'inventory') parseKeyMenu(event);
				else if(page == 'title-screen' && key == 32) {
					startMenu();
				}
				else if(page == 'inventory' && (key == 32 || key == 27)){
					closeInventory();
				}
			});
		});
		/*
		TODO:
		Starting Menu options
		Normal Menu (inventory, exit, etc)
		Items with lines (signs etc)
		Fix bezel (have it actually over so items don't cancel out the inner shadow)
		Update parser to have maps in separate text files, changelog per file?
		Terrain types / default block / classes for texture
		*/
	</script>

</head>
<body onkeydown="if(page == 'screen') parseKeyScreen(event);">
	<div id="viewport">
		<div id="sandbox">
			<table id="screen">
			<?php
				for($y = 0; $y < 18; $y++){ //rows
					echo '<tr>';
					for($x = 0; $x < 32; $x++){
						echo '<td y='.$y.' x='.$x.'></td>';
					}
					echo '</tr>';
				}
			?>
			</table>
		</div>
		
		<div id="console">
			<div id="text"></div>
			<div id="stats">
				<table>
				<tr>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<td id="dev-grid"></td>
					<td id="coordinates">x,y</td>
				</tr>
				</table>
			</div>
		</div>
		<div id="start-menu">
			<ul>
				<li value="start"><span class="cursor">&#9654;</span>Start game</li>
				<li value="quit"><span class="cursor">&#9654;</span>Quit game</li>
			</ul>
		</div>
		
		<div id="title-screen">
			<div id="title">
			<h1>BLOCKWORLD</h1><div style="position:absolute;right:155px;top:55px;">TM</div>
			<h2>A Game In Which There Are Blocks,<br />
			A Whole Lot Of Them</h2>
			</div>
			<div id="logo"></div>
			<div id="copyright"><span style="font-weight:bold;">&copy;</span>'13. SOMETHING OR OTHER inc.</div>
			<div class="menu-confirm"><span>&#9654;</span>Press space to start</div>
		</div>
	</div>
		
	<div id="menu">
		<ul>
			<li value="inventory"><span class="cursor">&#9654;</span>Inventory</li>
			<li value="map"><span class="cursor">&#9654;</span>Map</li>
			<li value="quit"><span class="cursor">&#9654;</span>Quit game</li>
		</ul>
	</div>
	<div id="inventory">
		<table>
			<?php
				for($y = 0; $y < 4; $y++){ //rows
					echo '<tr>';
					for($x = 0; $x < 6; $x++){
						echo '<td y='.$y.' x='.$x.'></td>';
					}
					echo '</tr>';
				}
			?>
		</table>
		
		<ul id="inventory-misc">
			<li><span id="gold">g</span>37</li>
			<li><span id="something">?</span>342</li>
		</ul>
	</div>
	
	<div id="overlay">
		<div class="reflection"></div>
		<div class="reflection"></div>
		<div class="reflection"></div>
	</div>
</body>
</html>