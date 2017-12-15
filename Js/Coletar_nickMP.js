if (game_data.screen != 'info_member')
{
        UI.InfoMessage('Canal :> #TW 100# Script deve ser usado na pagina de membros de uma tribo.', 3000, true);
        end();
}

var membros = new Array();

$("#content_value table:not(:first) tr:not(:first) td:first-child")
        .each(function ()
        {
                membros.push($(this)
                        .text()
                        .replace(/\(.*$/, "")
                        .trim());
        });

prompt("Copiar membros: Ctrl+C, Enter", membros.join(";"));
