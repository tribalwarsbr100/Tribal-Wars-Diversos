// ==UserScript==
// @name                Renomeador Aldeias
// @namespace           @@marcosvinicius.santosmarques
// @icon                https://i.imgur.com/7WgHTT8.gif
// @website             https://tribalwarsbr100.wixsite.com/tw100
// @email               tribalwarsbr100@gmail.com
// @description 	Renomeia Em numero de coordenada, numero de k, numero de localização, ou por texto.
// @author		Marcos v.s Marques
// @include             http*://*.*screen=place&try=confirm*
// @version             0.0.1
// @copyright           2018, Tribalwarsbr100 (https://openuserjs.org//users/Tribalwarsbr100)
// @version             0.0.1
// @license             AGPL-3.0-or-later
// @grant               GM_getResourceText
// @grant               GM_addStyle
// @grant               GM_getValue
// @grant               unsafeWindow
// ==/UserScript==

/*==== Moldura Tw ====*/
if(!twcheese)
	var twcheese={};


twcheese.createNamerGUI = function ()
{	
	var contentContainer = document.createElement('div');
	contentContainer.id = 'twcheese_name_village_container';
	contentContainer.style.display = 'marker';
	contentContainer.style.position = 'fixed';
	contentContainer.style.zIndex = 5;
	contentContainer.style.top = '60px'; //below top menu
	contentContainer.style.left = '10px';
	contentContainer.style.borderStyle = 'ridge';
	contentContainer.style.borderColor = 'brown';
	contentContainer.style.backgroundColor = '#ffccff';	
	contentContainer.style.width = '650px';
	
	/*==== Barra De Titulo ====*/				
		var titleBar = document.createElement('table');
		titleBar.style.backgroundColor = '#5cd65c';
		titleBar.insertRow(-1);
		titleBar.rows[0].insertCell(-1);
		titleBar.rows[0].insertCell(-1);
		titleBar.rows[0].cells[0].innerHTML = '<b>Nome Das Aldeias</b> (max 32 caracteres)';
		titleBar.rows[0].cells[0].width = '100%';
		titleBar.rows[0].cells[1].innerHTML = '<img src="graphic/delete.png" alt="X"/>';
		titleBar.rows[0].cells[1].style.cursor="pointer";
		titleBar.rows[0].cells[1].onclick = function(){$('#twcheese_name_village_container').remove()};
		titleBar.rows[0].cells[1].style.color = 'Red';
		contentContainer.appendChild(titleBar);
		
		var narcismElement = document.createElement('span');			
		narcismElement.innerHTML = 'By <a href="https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg/" target="_blank">Canal Tw 100</a>';
		narcismElement.style.fontSize = '12px';
		narcismElement.style.fontStyle = 'italic';
		narcismElement.style.fontWeight = 'lighter';
		narcismElement.style.marginRight = '25px';
		narcismElement.style.cssFloat = 'right';
		titleBar.rows[0].cells[0].appendChild(narcismElement);
	
	
	var content = document.createElement('div');
	content.id = 'twcheese_name_config';
	content.style.padding = '5px';
	
	var useDefaultConfig = false;
	
	if(localStorage.getItem('twcheese.nameVillagesConfig'))
	{
		var options = JSON.parse(localStorage.getItem('twcheese.nameVillagesConfig'));
		content.config = options;
		
		/*==== update: 8 august 2013 - change format ====*/
		for(var i=0; i<options.length; i++)
		{			
			if(options[i].name == 'number_villages')
			{				
				if(!options[i].digits)
				{
					options[i].description = 'number villages';
					options[i].startNum = options[i].label;
					options[i].digits = 3;
					
					for(var j=0; j<options.length; j++)
					{
						options[j].label = options[j].defaultLabel;
					}
				}
			}			
		}
		
		/*==== update: 22 march 2014 - added direction option ====*/
		var hasDirectionOption = false;
		for (var i=0; i<options.length; i++) {
			if (options[i].name == 'direction') {
				hasDirectionOption = true;
			}
		}
		if (!hasDirectionOption) {
			var dirOpt = {
				name:'direction',
				description:'direction within the continent',
				defaultLabel:' ',
				label:' ',
				example:'NE',
				enabled: false
			};
			options.push(dirOpt);
			content.config = options;

			var alertUser = true;
			if (localStorage.getItem('twcheese_nameVillages_lastUpdateMessage')) {
				if (Number(localStorage.getItem('twcheese_nameVillages_lastUpdateMessage')) >= 1) {
					alertUser = false;
				}
			}
			
			if (alertUser) {
				alert('Update! A new renaming option has been added:\n\n"Direction"\nwill indicate the cardinal direction of the village within its continent');
				localStorage.setItem('twcheese_nameVillages_lastUpdateMessage', '1');
			}
		}		
	}
	else
		useDefaultConfig = true;	
	
	if(useDefaultConfig)
	{
		content.config = [];
		var options = [
			{
				name:'number_villages',
				description:'Numero de aldeias',
				defaultLabel:'0',
				startNum:'0',
				digits:'3',
				example:'',
				enabled: true
			},
			{
				name:'continent',
				description:'O numero do continente',
				defaultLabel:' K',
				example:'45',
				enabled: true
			},
			{
				name:'insert_text0',
				description:'Inserir texto',
				defaultLabel:' seu texto aqui ',
				example:'',
				enabled: true
			},	
			{
				name:'distance',
				description:'Distancia de uma aldeia (digite coordenadas na caixa a esquerda)',
				defaultLabel:'500|500',
				example:'4.20',
				enabled: true
			},
			{
				name:'sector',
				description:'Continente: setor: campo <img id="twcheese_sector_help" src="http://cdn.tribalwars.net/graphic/questionmark.png" style="width: 13px; height: 13px" title="O mapa e dividido da esquerda para a direita, de cima para baixo.<br/>Mundo - 100 continentes (10x10)<br/>Continente - 400 setores (20x20)<br/>Setor - 25 campos (5x5)">',
				defaultLabel:' ',
				example:'55:12:2',
				enabled: false
			},
			{
				name:'direction',
				description:'Direcao dentro do continente',
				defaultLabel:' ',
				example:'NE',
				enabled: false
			},
			{
				name:'random_text',
				description:'Nome aleatorio',
				defaultLabel:' ',
				example:'Nome aleatorio',
				enabled: false
			},			
			{
				name:'insert_text1',
				description:'Inserir texto',
				defaultLabel:' seu texto aqui',
				example:'',
				enabled: false
			},
			{
				name:'insert_text2',
				description:'Inserir texto',
				defaultLabel:' seu texto aqui',
				example:'',
				enabled: false
			}
		];
		for(var i=0; i<options.length; i++)
		{
			options[i].label = options[i].defaultLabel;
		}
	}
	

	
	content.generateExample = function()
	{
		var example = '';
		var rows = document.getElementById('twcheese_config_table').rows;
		for(var i=0; i<rows.length; i++){
			if(rows[i].cells[0].firstChild.checked)
			{
				if(rows[i].optionData.name == 'number_villages')
				{
					var number = Number(Number(rows[i].optionData.startNum) + 69);
						var digits = rows[i].optionData.digits;
						for(; String(number).length < digits; digits--)
							example += '0';					
					example += number;
				}
				else if(rows[i].optionData.name == 'distance')
				{
					example += rows[i].optionData.example;
				}
				else
				{
					example += rows[i].optionData.label;
					example += rows[i].optionData.example;
				}
			}
		}
		return example;		
	};
	
	content.preview = function()
	{
		document.getElementById('twcheese_name_preview').innerHTML = this.generateExample();
	};
	
	content.saveConfig = function()
	{
		//var rows = this.getElementsByTagName('tr');
		var rows = document.getElementById('twcheese_config_table').rows;
		for(var i=0; i<rows.length; i++)
		{
			this.config[i] = rows[i].optionData;
			if(this.config[i].label)
				this.config[i].defaultLabel = this.config[i].label;
				
		}
		mode = this.getMode();
		
		localStorage.setItem('twcheese.nameVillagesConfig',JSON.stringify(this.config));
		localStorage.setItem('twcheese_nameVillagesMode',mode);
		UI.InfoMessage('Configuration saved.',3000,'success');
	};
	
	content.getConfig = function()
	{
		//var rows = this.getElementsByTagName('tr');
		var rows = document.getElementById('twcheese_config_table').rows;
		for(var i=0; i<rows.length; i++)
		{
			this.config[i] = rows[i].optionData;
			if(!this.config[i].label)
				this.config[i].label = this.config[i].defaultLabel;
		}
		
		return this.config;
	}
	
	content.getMode = function()
	{
		var modeForm = document.getElementById('twcheese_name_mode_form');
		var options = modeForm.getElementsByTagName('input');
		for(var i=0; i<options.length; i++)
		{
			if(options[i].checked)
				this.mode = options[i].value;
		}
		return this.mode;
	}
	
	content.nameVillages = function()
	{
		if(document.getElementById('twcheese_name_preview').innerHTML.length >= 31)
		{
			UI.InfoMessage('Excedeu Limite (max 32 caracteres).',5000,'erro');
		}				
		else
		{
			var config = this.getConfig();
			var mode = this.getMode();
			$('#twcheese_name_village_container').remove();
			setTimeout(function(){twcheese.renameVillages(config,mode);},50);
		}
	}
		
		/*==== preview ====*/
		var preview = document.createElement('span');
		preview.id = 'twcheese_name_preview';
		preview.innerHTML = 'Tw100';
		content.innerHTML = '<b>&nbsp;Exemplo: </b>';
		content.appendChild(preview);
		
		
		/*==== config ====*/		
		var optionsTable = document.createElement('table');
		optionsTable.id = 'twcheese_config_table';
		
		for(var i=0;i<options.length;i++)
		{
			optionsTable.insertRow(-1);
			optionsTable.rows[i].optionData = options[i];
			optionsTable.rows[i].insertCell(-1);
			optionsTable.className = 'vis';
			
			var checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.checked = options[i].enabled;
			checkbox.onchange = function()
			{
				content.preview();
				this.parentNode.parentNode.optionData.enabled = this.checked;
			};
			optionsTable.rows[i].cells[0].appendChild(checkbox);
			
			optionsTable.rows[i].insertCell(-1);
			
			if(options[i].name == 'number_villages') //put the special numbering input in the label spot
			{
				var numberingInputTable = document.createElement('table');
				numberingInputTable.insertRow(-1);
				numberingInputTable.insertRow(-1);
				numberingInputTable.rows[0].insertCell(-1);
				numberingInputTable.rows[0].insertCell(-1);
				numberingInputTable.rows[1].insertCell(-1);
				numberingInputTable.rows[1].insertCell(-1);
				
				numberingInputTable.rows[0].cells[0].innerHTML = 'Iniciar #';
				numberingInputTable.rows[0].cells[0].style.width = '80px';
				numberingInputTable.rows[0].cells[1].innerHTML = 'Digitos';
				
				var startNumInput = document.createElement('input');
				startNumInput.type = 'text';
				startNumInput.size=5;
				startNumInput.value = options[i].startNum;
				startNumInput.onchange = function(){
					this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.optionData.startNum = this.value;
					content.preview();
				}
				numberingInputTable.rows[1].cells[0].appendChild(startNumInput);
				
				var digitsInput = document.createElement('input');
				digitsInput.type = 'number';
				digitsInput.size = 4;
				digitsInput.value = options[i].digits;
				digitsInput.onchange = function(){
					this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.optionData.digits = this.value;
					content.preview();
				}
				numberingInputTable.rows[1].cells[1].appendChild(digitsInput);
				
				
				
				optionsTable.rows[i].cells[1].appendChild(numberingInputTable);
			}
			else //put the regular label in
			{
				var label = document.createElement('input');
				label.type = 'text';
				if(!options[i].noLabel)
					label.value = options[i].defaultLabel;
				else
					label.value = '';
				label.onkeyup = function(){					
					this.parentNode.parentNode.optionData.label = this.value;
					if(!this.value)
						this.parentNode.parentNode.optionData.noLabel = true;
					else
						this.parentNode.parentNode.optionData.noLabel = false;
					content.preview();
				};
				optionsTable.rows[i].cells[1].appendChild(label);
			}
			
			optionsTable.rows[i].insertCell(-1);
			optionsTable.rows[i].cells[2].innerHTML = options[i].description;
			
			/*==== handle ====*/
			optionsTable.rows[i].insertCell(-1);
			optionsTable.rows[i].cells[3].innerHTML = '<div style="width: 11px; height:11px; background-image: url(http://cdn.tribalwars.net/graphic/sorthandle.png); cursor:move" class="qbhandle" title="Arraste para reordenar"> </div>';
		}
		
		content.appendChild(optionsTable);
		
		/*==== mode ====*/
		var modeForm = document.createElement('form');
		modeForm.id = 'twcheese_name_mode_form';
		
			/*==== overwrite ====*/
			overwriteButton = document.createElement('input');
			overwriteButton.id= 'twcheese_radio_overwrite';
			overwriteButton.type = 'radio';
			overwriteButton.name = 'name_mode';
			overwriteButton.value = 'overwrite';			
			overwriteButton.style.marginLeft = '20px';
			modeForm.appendChild(overwriteButton);			
			modeForm.innerHTML += 'Sobrescrever nomes atuais';
			
			/*==== prepend ====*/
			prependButton = document.createElement('input');
			prependButton.id= 'twcheese_radio_prepend';
			prependButton.type = 'radio';
			prependButton.name = 'name_mode';
			prependButton.value = 'prepend';
			prependButton.style.marginLeft = '20px';
			modeForm.appendChild(prependButton);
			modeForm.innerHTML += 'Antecipa para atuais';			
			
			/*==== append ====*/
			appendButton = document.createElement('input');
			appendButton.id= 'twcheese_radio_append';
			appendButton.type = 'radio';
			appendButton.name = 'name_mode';
			appendButton.value = 'append';
			appendButton.style.marginLeft = '20px';
			modeForm.appendChild(appendButton);
			modeForm.innerHTML += 'Anexar aos nomes atuais';
		
		content.appendChild(modeForm);
		
		
		/*==== buttons ====*/
		var buttonDiv = document.createElement('div');
		buttonDiv.align = 'center';
		buttonDiv.style.padding = '10px';
		
			/*==== save button ====*/
			var saveButton = document.createElement('button');
			saveButton.onclick = function(){content.saveConfig();};
			saveButton.innerHTML = 'Definir como padrao';
			buttonDiv.appendChild(saveButton);
			
			/*==== confirm button ====*/
			var confirmButton = document.createElement('a');
			confirmButton.className = 'btn-default btn-green';
			confirmButton.innerHTML = 'Nomear aldeias';
			confirmButton.onclick = function()
			{
				document.getElementById('twcheese_name_config').nameVillages();				
			};
			buttonDiv.appendChild(confirmButton);
			
			content.appendChild(buttonDiv);
		
	contentContainer.appendChild(content);
	document.getElementById('content_value').appendChild(contentContainer);
	$('#twcheese_config_table > tbody').sortable({handle: '.qbhandle', placeholder: 'sortable-placeholder'});
	$('#twcheese_config_table > tbody').on('sortstop', function(){content.preview()});
	UI.ToolTip('#twcheese_sector_help');

	
	content.preview();
	
	/*==== apply default mode ====*/
	content.mode = 'overwrite';
	if(localStorage.getItem('twcheese_nameVillagesMode'))
		content.mode = localStorage.getItem('twcheese_nameVillagesMode');
	var selection = document.getElementById('twcheese_radio_'+content.mode);
	selection.checked = true;
};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

/*==== calculators ====*/

	/**
	 *	@param	village1:Array(x,y)
	 *	@param	village2:Array(x,y)
	 *	@return	distance:Number
	 */
	twcheese.calculateDistance = function(village1,village2)
	{
		return Math.sqrt((village1[0]-village2[0])*(village1[0]-village2[0]) + (village1[1]-village2[1])*(village1[1]-village2[1]));
	};

/*==== renamer ====*/
	twcheese.renameVillages = function(config,mode)
	{
		try{
		$('.quickedit-vn').each(function(key,village){ //each village
			var villageId = $(village).attr('data-id');
			var $label = $(village).find('.quickedit-label');
			var originalFullName = $label.text();
			var originalName = $label.attr('data-text');

			var continent = originalFullName.match(/[0-9]{1,2}/gi).pop();
			var coordinates = originalFullName.match(/[0-9]{1,}\|[0-9]{1,}/gi).pop();
			var coordX = coordinates.match(/[0-9]{1,}/);
			var coordY = String(coordinates.match(/\|[0-9]{1,}/)).substring(1);			
			
			var name = '';
			for(var j=0; j<config.length; j++) //each configuration option
			{
				// Time out
				sleep(10);

				if(config[j].enabled)
				{
					if(config[j].name == 'number_villages')
					{					
						var number = key+Number(config[j].startNum);
						var digits = config[j].digits;
						for(; String(number).length < digits; digits--)
							name += '0';
						name += number;						
					}
					else if(config[j].name == 'distance')
					{
						var targetCoords = config[j].label.split('|');
						var targetX = targetCoords[0].match(/[0-9]{1,}/);
						var targetY = targetCoords[1].match(/[0-9]{1,}/);
						var distance = twcheese.calculateDistance([targetX,targetY],[coordX,coordY]);
						name += Math.round(distance*10)/10;
					}
					else
					{
						if(!config[j].noLabel)
							name += config[j].label; //write user-specified text
					}
					
					if(config[j].name == 'continent')
					{
						name += continent;
					}
					if(config[j].name == 'random_text')
					{
						var namePool = ['Cheese','Cheesy','Pickle','Noodle','Mc','Mega','Ultra','Super','Cuddle','Hug','Merge','Princess','Queen','O','Snappy','Dandy','Zippy','Fiddle','Harp','Chimes','Mooo','Quack','Oink','Penguin','Giraffe','Hippo','Sandals','Boots','Heels','Ninja','Pirate','Town','City','Burg','polis','ville','Land','Realm','Wand','Cape','Hat','Tickle','Smack','Kick','Armor','Sword','Shield','Happy','Sad','Grumpy','Forest','Lake','Mountain','Swamp','Fortress','Castle','Keep','Palace','Hall','Shiny','Dull','Hidden','King','Knight','Enchanted','Court','Bridge','Kingdom','Manor','Tower','Royal','Peasant','Unicorn','Dragon','Nightmare','Dark','Light','Red','Blue','Yellow','Green','Orange','Purple','Pink','Wood','Stone','Stick','Straw','Brick','Steel','Iron','Gold','Forge','Hut','Betrayal','Honor','Fellowship','Gardening','Cabbage','Potato','Pine','Oak','Bamboo','Flower','Daisy','Rose','Pansy','Fearless','Brave','Enduring','Fast','Slow','Steady','Strong'];
						for(var k=0; k<3; k++)
						{
							randomInt = Math.round(Math.random()*(namePool.length-1));
							name += namePool[randomInt];
						}
					}
					if(config[j].name == 'sector')
					{
						var tempX = Number(coordX);
						var tempY = Number(coordY);						
						
						//==== sector ====
						if(Number(tempX) >= 100)
							tempX = Number(String(coordX).substring(1));
						if(Number(tempY) >= 100)
							tempY = Number(String(coordY).substring(1));
						
						var xPos = Math.floor(tempX/5);
						var yPos = Math.floor(tempY/5);
						var sector = yPos*20 + xPos;
						
						//==== field ====
						if(Number(tempX) >= 10)
							tempX = Number(String(tempX).substring(1));
						if(Number(tempY) >= 10)
							tempY = Number(String(tempY).substring(1));
						
						if(Number(tempX) >= 5)
							tempX = tempX - 5;
						if(Number(tempY) >= 5)
							tempY = tempY - 5;
						var field = tempY*5 + tempX;
						
						name += continent + ':' + sector + ':' + field;
					}
					if (config[j].name == 'direction') {
						var directionNames = [['NW','N','NE'],['W','C','E'],['SW','S','SE']];
						
						function getLocation(number) {
							if (number > 66) {
								return 2;
							} else if (number > 33) {
								return 1;
							} else {
								return 0;
							}
						}
						var xLocation = getLocation(coordX % 100);
						var yLocation = getLocation(coordY % 100);
						
						name += directionNames[yLocation][xLocation];
					}
				}

			}			
			
			if(mode == 'overwrite')
				name = name;
			else if(mode == 'append')
				name = originalName + name;
			else if(mode == 'prepend')
				name = name + originalName;
			
			if (name.length <= 32) {
				$(village).find('.rename-icon').click();
				$(village).find('input[type=text]').val(name);
				$(village).find('input[type=button]').click();
			}
			else
				UI.InfoMessage('Texto Excedeu Limite (max 32 caracteres).<br/>Novo nome nao aplicado a todas aldeias.',5000,'erro');
		
		});
		}catch(e){alert(e)}
	}

/*==== main ====*/
	// register
	var script =
	{
		scriptname: 'Renomeador de aldeias',
		version: 1.0,
		author: 'Canal Tw 100',
		email: 'tribalwarsbr100@gmail.com',
		broken: false
	};
	$.post(ScriptAPI.url,script);

	if (game_data.screen == 'overview_villages' || canNameVillages) {
		twcheese.createNamerGUI();
		var canNameVillages = true; //hack for bug where renaming villages changes game_data.screen
	}
	else {
		UI.InfoMessage('Utilizar em visualizacoes gerais.',5000,'erro');
	}
