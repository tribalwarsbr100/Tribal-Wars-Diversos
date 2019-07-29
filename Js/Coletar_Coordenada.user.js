    
// ==UserScript==
// @name                Coletar Coordenada
// @namespace           @@marcosvinicius.santosmarques
// @icon                https://i.imgur.com/7WgHTT8.gif
// @website             https://tribalwarsbr100.wixsite.com/tw100
// @email               tribalwarsbr100@gmail.com
// @description 	     Script Para Coletar Coordenadas Game Tribal Wars
// @author		        Marcos v.s Marques
// @include             https://*/game.php?village=*&screen=map*
// @version     	    0.0.1
// @copyright           2018, Tribalwarsbr100 (https://openuserjs.org//users/Tribalwarsbr100)
// @license             AGPL-3.0-or-later
// ==/UserScript==
win = window;
// === tw100 ===
ScriptAPI.lib = {
    launchOnScreen: function (screen, onError, noConflict) {
        if (game_data.screen != screen) {
        	if (onError == null) return false;
            if (onError.substring(0, 1) == "/") window.location.href = onError;
            	else UI.ErrorMessage(onError, 5000);
            return false;
        }
        if (ScriptAPI.preventLaunch === true)  {
            UI.ErrorMessage('O script ja esta sendo TW100\'Executado', 5000);
            return false;
    	}
        win.DSSelectVillages.enableScript();
        ScriptAPI.preventLaunch = (noConflict !== false) ? true : false;
       	return true; 
    }
}
win.DSSelectVillages =
    {
        currentLang: 'fr',
        
        showWithCoords: true,
        
        showWithCounter: true,
        
        showWithNewLine: true,
        
        breakAfter: -1,
        
        enabled: false,
        
        villages: [],
        
        villagesId: [],
        
        lang: {
            de: {
                UI: {
                    selectedVillages: "Aldeias selecionadas:",
                    enableShowWithCoords: "Mostrar BBCodes",
                    enableShowWithCounter: "Mostrar contadores"
                }
            },
            fr: {
                UI: {
                    selectedVillages: "𝕐𝕠𝕦𝕥𝕦𝕓𝕖 𝕋𝕨 𝟙𝟘𝟘",
                    enableShowWithCoords: "BBcodes",
                    enableShowWithCounter: "Lista Numerica",
                    enableShowWithNewLine: "Em Linha"
                }
            }
        },
        
        enableScript: function () {
            this.enabled = true;
            this.showWithCoords = win.showWithCoords;
            this.showWithCounter = win.showWithCounter;
            this.breakAfter = win.breakAfter;
            win.TWMap.mapHandler.integratedSpawnSector = win.TWMap.mapHandler.spawnSector;
            win.TWMap.mapHandler.spawnSector = this.spawnSector;
            
            this.oldClickFunction = win.TWMap.mapHandler.onClick;
            win.TWMap.mapHandler.onClick = this.clickFunction;
            win.TWMap.reload();
            
            this.showUi();
        },
        
        spawnSector: function (data, sector) {
            win.TWMap.mapHandler.integratedSpawnSector(data, sector);
            for (var i = 0; i < win.DSSelectVillages.villagesId.length; i++) {
                var villageId = win.DSSelectVillages.villagesId[i];
                if(villageId === null){
                    continue;
                }
                var v = $('#map_village_' + villageId);
                $('<div class="DSSelectVillagesOverlay" id="DSSelectVillages_overlay_' + villageId + '" style="width:52px; height:37px; position: absolute; z-index: 50; left:' + $(v).css('left') + '; top: ' + $(v).css('top') + ';"></div>').appendTo(v.parent());
                $('#DSSelectVillages_overlay_' + villageId).css('outline', 'rgba(51, 255, 0, 0.7) solid 2px').css('background-color', 'rgba(155, 252, 10, 0.14)');
            }
        },
        
        markVillageAsSelected: function (id) {
            $('#DSSelectVillages_overlay_' + id).css('outline', 'rgba(51, 255, 0, 0.7) solid 2px').css('background-color', 'rgba(155, 252, 10, 0.14)');
        },
        demarkVillageAsSelected: function (id) {
            $('#DSSelectVillages_overlay_' + id).css('outline', '').css('background-color', '');
        },
        
        disableScript: function () {
            this.enabled = false;
            this.villages = [];
            this.villagesId = [];
            win.TWMap.mapHandler.onClick = this.oldClickFunction;
            win.TWMap.mapHandler.spawnSector = win.TWMap.mapHandler.integratedSpawnSector;
            win.TWMap.reload();
            $('#bb_main_div').remove();
        },
        
        showUi: function () {
            
            $('#map_config').prepend('<table id="bb_main_div" class="vis" style="border-spacing:0px;border-collapse:collapse;margin-top:15px;" width="100%"><tbody>'
									+'<tr><th colspan="3">' + this.lang[this.currentLang].UI.selectedVillages + '</th></tr>'
									+'<tr>'
                                    +'	<td>'
                                    +'		<input type="checkbox" id="bbcode">'
                                    +'	</td>'
                                    +'	<td>'
									+'		<label for="warplanner_enabled">' + this.lang[this.currentLang].UI.enableShowWithCoords + '</label>'
									+'	</td>'
                                    +'</tr>'
                                    +'<tr>'
                                    +'	<td>'
                                    +'		<input type="checkbox" id="zaehlen">'
                                    +'	</td>'
                                    +'	<td>'
									+'		<label for="warplanner_enabled">' + this.lang[this.currentLang].UI.enableShowWithCounter + '</label>'
									+'	</td>'
                                    +'</tr>'
                                    +'<tr>'
                                    +'	<td>'
                                    +'		<input type="checkbox" id="new-line">'
                                    +'	</td>'
                                    +'	<td>'
									+'		<label for="new-line">' + this.lang[this.currentLang].UI.enableShowWithNewLine + '</label>'
									+'	</td>'
                                    +'</tr>'
                                    +'<tr><td></td>'
                                    +'	<td>'
                                     +'		<textarea id="output" rows="5" style="width:95%;" readonly></textarea>'
                                    +'	</td>'
                                    +'</tr>'
                                    +'</tbody></table>');
            var chkbxBBcode = $('#bbcode');
            var chkbxcounter = $('#zaehlen');
            var chkbxShowWithNewLine = $('#new-line');
            chkbxBBcode.prop('checked', this.showWithCoords);
            chkbxcounter.prop('checked', this.showWithCounter);
            chkbxShowWithNewLine.prop('checked', this.showWithNewLine);
            chkbxBBcode.change(function () {
                win.DSSelectVillages.showWithCoords = this.checked;
                win.DSSelectVillages.outputCoords();
            });
            chkbxcounter.change(function () {
                win.DSSelectVillages.showWithCounter = this.checked;
                win.DSSelectVillages.outputCoords();
            });
            chkbxShowWithNewLine.change(function () {
            	win.DSSelectVillages.showWithNewLine = this.checked;
                win.DSSelectVillages.outputCoords();
            });
        },
        
        outputCoords: function () {
            var coordsOutput = "";
            for (var i = 0; i < this.villages.length; i++) {
                if (this.villages[i] === null) {
                    continue;
                }
                var realCount = 0;
                for (var j = 0; j <= i; j++) {
                    if (this.villages[j] != null) {
                        realCount++;
                    }
                }
                coordsOutput += (this.showWithCounter ? realCount + ". " : "" ) + (this.showWithCoords ? "[coord]" : "") + this.villages[i] + (this.showWithCoords ? "[/coord]" : "") + (this.showWithNewLine ? "\n" : " ");
                if (this.breakAfter != -1 && realCount % this.breakAfter == 0) {
                    coordsOutput += "\n";
                }
            }
            $('#output').html(coordsOutput);
            $("#output").select();
        },
        
        handleVillage: function (x, y) {
            var coord = x + "|" + y;
            var index = this.villages.indexOf(coord);
            var village = win.TWMap.villages[(x) * 1000 + y];
            if (!village) {
                return;
            }
            if (index === -1) {
                this.villages.push(coord);
                this.villagesId.push(village.id);
                this.markVillageAsSelected(village.id);
                win.TWMap.reload();
            } else {
                this.villages[index] = null;
                var indexId = this.villagesId.indexOf(village.id);
                this.villagesId[indexId] = null;
                this.demarkVillageAsSelected(village.id);
            }
            this.outputCoords();
        },
        
        clickFunction: function (x, y, event) {
            win.DSSelectVillages.handleVillage(x, y);
            return false; // Sinaliza que o TWMap nÃ£o deve seguir o URL associado a este evento de clique
        },
        
        oldClickFunction: null
    };

ScriptAPI.lib.launchOnScreen('map', "Este script deve ser executado a partir do mapa");
