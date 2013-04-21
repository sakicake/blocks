<?php
$log = 'logs/changelog.txt';
$log = escapeshellarg($log);
$last = `tail -n 1 $log`;
$file = 'includes/screens.txt';

if($last < filemtime($file)){
	$lines = file($file, FILE_IGNORE_NEW_LINES);
	$row = $column = 0;
	$numLine = 0;
	//String of JS
	$js = '//Array of screens with coordinates x,y to call them
	var locale = new Array(2); //local[y(row)][x(column)]
	for(var lX = 0; lX < 2; lX++){
		locale[lX] = new Array(2);
	}
	';
	
	$functionName = '';
	$localeX = $localeY = 0;
	$functionQueued = false;
	$baseTexture = '';
	
	$textClasses = array('W','T');
	$classes = array('WallBlock','Tree');
	
	$textTextures = array('g','w','f','d');
	$textures = array('grass','water','field','dot');
	
	$textFunction = '//Function: '; //Text function header
	$textCoordinates = '//Coordinates: '; //Text coordinates
	$textTexture = '//Base texture: '; //Text base texture
	
	
	foreach($lines as $line){
		$numLine++;
		if(strpos($line,$textFunction) !== false) { //If row contains a function header
			$functionName = str_replace($textFunction,'',$line);
			$js .= "\nfunction ".$functionName."(){\n";
			$row = $column = 0; //Reset row and column count
			$baseTexture = '';
			$functionQueued = true;
		}
		elseif(strpos($line,$textCoordinates) !== false) { //If row contains coordinates
			$coordinates = str_replace($textCoordinates,'',$line);
			$coordinates = explode(',',$coordinates);
			$localeX = $coordinates[0];
			$localeY = $coordinates[1];
		}
		elseif(strpos($line,$textTexture) !== false){
			$textureToken = str_replace($textTexture,'',$line);
			$baseTexture = $textures[array_search($textureToken,$textTextures)];
			$js .= "\tapplyBaseTexture('".$baseTexture."');\n";
		}
		elseif($functionQueued == true && ($line == '' || $numLine == count($lines))){ //If row is blank
			$js .= "\treturn true;\n}\n";
			$js .= 'locale['.$localeX.']['.$localeY.'] = '.$functionName.";\n";
			$functionQueued = false;
		}
		elseif($functionQueued == false && $line == ''){}
		else { //If row contains tokens, hopefully
			$tokens = explode("\t",$line);
			foreach($tokens as $token){
				if($token != '-')
					$js .= "\tnew ".$classes[array_search($token,$textClasses)].'(\''.$classes[array_search($token,$textClasses)].'-'.$column.'-'.$row.'\','.$column.','.$row.");\n"; //Leaving out customClass for now
				$column++;
			}
			$row++;
			$column = 0;
		}
	}
	$log = 'logs/changelog.txt';
	$file = 'includes/screens.js';
	if(file_put_contents($file,$js)){
		echo '<script>console.log("Maps parsed and updated.");</script>';
		file_put_contents($log,"\n".time(),FILE_APPEND);
	}
}
else echo '<script>console.log("Maps are up-to-date.");</script>';
?>