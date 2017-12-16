if (document.URL.indexOf('screen=overview_villages') == -1)
{
        alert("O Boot funciona na visualização geral")
}
else
{
        $('#production_table')
                .before(
                        '<center><table class=\'bbcodetable\' style=\'display:inline-table;margin:10px 0 10px 0;\'><tbody><tr style=\'height:22px\'><th>YouTube : </th><td><a id=\'Todo\' class=\'TW 100\' href=\'https://www.youtube.com/channel/UCIngQdlpQxocFDB4Vk6yERg\' target=\'_blank\'>TW 100</a>  ©</td></tr></tbody></table><br /></center>'
                );
        $('#production_table')
                .before('<button id = "B1">Classificar por pontos</button>');
        $('#production_table')
                .before('<button id = "B2">Classificar por tropas</button>');
        $('#production_table')
                .before('<button id = "B3">Classificar por fazenda</button>');
        $('#production_table')
                .before('<button id = "B4">Renomear numero</button>');
        $('#production_table')
                .before('<button id = "B5">Renomear texto</button>');
        var url = document.URL
        $("#B1")
                .click(function ()
                {
                        if (document.URL.indexOf('/game.php?village=' + game_data.village.id +
                                        '&page=-1&order=points&dir=desc&mode=prod&group=0&screen=overview_villages') == -1)
                        {
                                location.search = '/game.php?village=' + game_data.village.id +
                                        '&page=-1&order=points&dir=desc&mode=prod&group=0&screen=overview_villages';
                        }
                        else
                        {
                                javascript: $(".rename-icon")
                                        .click();
                                var P = prompt("Digite o nome das aldeias:");
                                $(".quickedit-edit")
                                .each(function (i)
                                {
                                        $(this)
                                                .find("input:first")
                                                .val(P + " " + (i <= 9 ? "00" : i <= 99 ? "0" : "") + i);
                                        $(this)
                                                .find("input:last")
                                                .click();
                                });
                                void(0);
                        }
                });
        $("#B2")
                .click(function ()
                {
                        if (document.URL.indexOf('/game.php?village=' + game_data.village.id +
                                        '&page=-1&order=storage&dir=desc&mode=prod&group=0&screen=overview_villages') == -1)
                        {
                                location.search = '/game.php?village=' + game_data.village.id +
                                        '&page=-1&order=storage&dir=desc&mode=prod&group=0&screen=overview_villages';
                        }
                        else
                        {
                                javascript: $(".rename-icon")
                                        .click();
                                var P = prompt("Digite o nome das aldeias:");
                                $(".quickedit-edit")
                                .each(function (i)
                                {
                                        $(this)
                                                .find("input:first")
                                                .val(P + " " + (i <= 9 ? "00" : i <= 99 ? "0" : "") + i);
                                        $(this)
                                                .find("input:last")
                                                .click();
                                });
                                void(0);
                        }
                });
        $("#B3")
                .click(function ()
                {
                        if (document.URL.indexOf('/game.php?village=' + game_data.village.id +
                                        '&page=-1&order=pop&dir=desc&mode=prod&group=0&screen=overview_villages') == -1)
                        {
                                location.search = '/game.php?village=' + game_data.village.id +
                                        '&page=-1&order=pop&dir=desc&mode=prod&group=0&screen=overview_villages';
                        }
                        else
                        {
                                javascript: $(".rename-icon")
                                        .click();
                                var P = prompt("Digite o nome das aldeias:");
                                $(".quickedit-edit")
                                .each(function (i)
                                {
                                        $(this)
                                                .find("input:first")
                                                .val(P + " " + (i <= 9 ? "00" : i <= 99 ? "0" : "") + i);
                                        $(this)
                                                .find("input:last")
                                                .click();
                                });
                                void(0);
                        }
                });
        $("#B4")
                .click(function ()
                {
                        $(".rename-icon")
                                .click();
                        var P = prompt("Digite o nome das aldeias:");
                        $(".quickedit-edit")
                                .each(function (i)
                                {
                                        $(this)
                                                .find("input:first")
                                                .val(P + " " + (i <= 9 ? "00" : i <= 99 ? "0" : "") + i);
                                        $(this)
                                                .find("input:last")
                                                .click();
                                });
                        void(0);
                });
        $("#B5")
                .click(function ()
                {
                        $(function ()
                        {
                                $("#content_value")
                                        .prepend(
                                                "<center><table class='vis' style='border: 1px solid #7D510F;margin: 15px 5px;box-shadow: 1px 1px 2px 1px rgba(60, 30, 0, 0.2);'><tbody><tr><th colspan='3'> Mudança de nome: </th></tr><tr><td><input id='same' type='text' size='32' minlength='3' maxlength='32' value='Coloque o nome de novo' name='name'></input></td><td><input id='name' class='btn' type='submit' value='Salvar'></input></td></tr></tbody></table></center></br>"
                                        );
                                $("#name")
                                        .click(function ()
                                        {
                                                $(".quickedit-content")
                                                        .find(".rename-icon")
                                                        .click();
                                                var same = $("#same")
                                                        .val();
                                                $("#content_value")
                                                        .each(function ()
                                                        {
                                                                $(this)
                                                                        .find(".quickedit-edit input:nth-child(1)")
                                                                        .val(same);
                                                                $(".quickedit-edit input:nth-child(2)")
                                                                        .click();
                                                        });
                                        });
                        });
                });
};
