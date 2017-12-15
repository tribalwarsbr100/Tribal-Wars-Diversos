if (game_data.screen == 'Overview_villages&mode=combined' || canCANALYOUTUBETW100)
{
        twcheese.createNamerGUI();
        var canCANALYOUTUBETW100 = true;
}
else
{
        UI.InfoMessage('Utilizar em visualizacoes - Opcao Combinado.', 5000, 'erro');
};
{
        n = confirm('[OK]: S/IGREJA = Filtrar aldeias SEM influencia religiosa;\n[CANCELAR]: C/IGREJA = Filtrar aldeias COM influencia religiosa.');
        j = 0;
        e = $('#combined_table tr');
        a = $(e[0])
                .find('th');
        $(a)
                .each(function (i, e)
                {
                        if ($(e)
                                .html()
                                .match('church')) j = i;
                });
        if (j > 0)
        {
                for (i = 1; i < e.length; i++)
                {
                        a = $(e[i])
                                .find('td');
                        var k = $(a[j])
                                .html()
                                .match('running');
                        if (!n) k = !k;
                        if (k) e[i].parentNode.removeChild(e[i]);
                }
        };
};
