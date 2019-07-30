    
// ==UserScript==
// @name                Farm Player
// @namespace           @@marcosvinicius.santosmarques
// @icon                https://i.imgur.com/7WgHTT8.gif
// @website             https://tribalwarsbr100.wixsite.com/tw100
// @email               tribalwarsbr100@gmail.com
// @description 	    Script Para Farmar Players na praça de reunião
// @author		        Marcos v.s Marques
// @include             https://*/game.php?village=*&screen=place*
// @version     	    0.0.1
// @copyright           2018, Tribalwarsbr100 (https://openuserjs.org//users/Tribalwarsbr100)
// @license             AGPL-3.0-or-later
// ==/UserScript==
var win=window;
//var win=(window.frames.length > 0)?window.main:window;
if (document.URL.search(/screen=place/)!= -1 && document.URL.search(/try=confirm/)===-1) {
	var units=new Array($( "[id^=unit_input_]").length);
	for (i =0; i<$( "[id^=unit_input_]").length;i++){
		units[i]=parseInt((localStorage.getItem('farm_unit_'+i))?localStorage.getItem('farm_unit_'+i):0)
	}
	var FARMPIRATATW100=parseInt((localStorage.getItem('farm_Index'))?localStorage.getItem('farm_Index'):0);
	var coords=(localStorage.getItem('farm_coords'))?localStorage.getItem('farm_coords'):'|';
	
	if(!document.getElementById("akk_msg")){
		var name='𝔽𝕒𝕜𝕖 𝕋𝕨 𝟙𝟘𝟘';
		var version='2.0';
		var site='https://tribalwarsbr100.wixsite.com/tw100';
		var youtube='https://www.youtube.com/c/TW100TRIBALWARS';
		var akkRight=-140;
		var data="";
		var divNode = document.createElement('div');
		divNode.id='akk_msg';
		data='<img style = "border-radius: 15px 0px 0px 15px;float:left; margin-right:5px" src="https://dl.dropbox.com/s/9u87oxmzpayjdv0/FARM%20PIRATA.png" height="80" width="75"></div width="'+(-akkRight)+'">'+name+'<br />VersÃ£o: '+version+'<br /><a target="_blank" href="'+site+'">Site TW 100</a><br /><a target="_blank" href="'+youtube+'">YouTube: TW 100</a></div>';
		divNode.innerHTML = data;
		divNode.style.zIndex="999999"
		divNode.style.position="fixed";
		divNode.style.display="block";
		divNode.style.top="0px";
		divNode.style.right=akkRight+"px";
		divNode.style.backgroundColor="orange";
		divNode.style.borderRadius="15px 0px 0px 15px";
		divNode.style.minWidth=(70-akkRight)+'px';
		divNode.onmouseover=function(){this.style.right="0"};
		divNode.onmouseout=function(){this.style.right=akkRight+"px"};
		document.body.appendChild(divNode);
		
		var divNode2 = document.createElement('div');
		divNode2.id='pushfarmCoords';
		data='<textarea id="farm_coords" style="resize:vertical; width:100%" placeholder="As coordenadas das aldeias-alvo" rows="5" resize="none" onFocus="this.select();"/>'+coords+'</textarea><br/><div style = "width:100%">Quantidade de Coordenadas: <input id="FARMPIRATATW100" type="text" style="width: 20px" value="'+(FARMPIRATATW100+1)+'"> de <span id="coordsLength" value="'+coords.split(" ").length+'"></span> <input readonly onClick = "setLS()" class="btn" value="Salve as ConfiguraÃ§Ãµes"></div>';
		divNode2.innerHTML = data;
		$('.vis.modemenu')[0].outerHTML=$('.vis.modemenu')[0].outerHTML+divNode2.outerHTML;
	}
	function cleanCoords(){
		var matched=document.getElementById('farm_coords').value.match(/[0-9]{3}\|[0-9]{3}/g);
		var output='';
		if(matched.length>0){
			output=matched[0];
			for (i=1;i<matched.length;i++){
				output=output + ' ' + matched[i];
			}
		} 
		document.getElementById('farm_coords').value=output;
		document.getElementById('coordsLength').innerHTML=document.getElementById('farm_coords').value.split(" ").length;
	}
	function setLS(){
		for (i =0; i<$( "[id^=unit_input_]").length;i++){
			localStorage.setItem('farm_unit_'+i, ($( "[id^=unit_input_]")[i].value!='')?$( "[id^=unit_input_]")[i].value:0);
		}
		localStorage.setItem('farm_Index', parseInt(document.getElementById('FARMPIRATATW100').value)-1);
		cleanCoords();
		localStorage.setItem('farm_coords', document.getElementById('farm_coords').value);
		alert("Salvar os novos dados");
	}
	for (i =0; i<$( "[id^=unit_input_]").length;i++){
			$( "[id^=unit_input_]")[i].value=units[i];
	}
	coords = coords.split(" ");
	document.getElementById('coordsLength').innerHTML=coords.length;
	if (FARMPIRATATW100 >= coords.length) {
		FARMPIRATATW100 = 0;
		document.getElementById('FARMPIRATATW100').value=1;	
	}
	coord = coords[FARMPIRATATW100];
	coord = coord.split("|");
	FARMPIRATATW100 = FARMPIRATATW100 + 1;
	document.getElementById('FARMPIRATATW100').value=FARMPIRATATW100;
	localStorage.setItem('farm_Index', FARMPIRATATW100);
	document.forms[0].x.value = coord[0];
	document.forms[0].y.value = coord[1];
	document.forms[0].y.focus();
