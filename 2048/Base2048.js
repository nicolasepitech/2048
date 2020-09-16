(function($) // début du pluggin
{
    var canmove = false;
    var firstmerge = false;
    var win = false
    var debut = false;
    $.fn.game2048 = function() //function game2048 du pluggin
    {
        // génération du tableau (table, tr, td) vide (rempli de zéros)
        function generateMap()
        {
            let table = $('<table></table>');
            for (let y = 0; y < 4; y++)
            {
                let line = $('<tr></tr>');
                for (let x = 0; x < 4; x++)
                {
                    let cell = $('<td></td>').attr('x', x).attr('y', y).attr('nbr', 0);
                    line.append(cell);
                }
                table.append(line);
            }
            return table;
        }

        // génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'
        function generateCell(cells)
        {
            for (let i = 0; i < cells; i++)
            {
                let empty = false;

                while (empty === false) // tant que la case récupéré aléatoirement n'est pas vide
                {
                    let x = Math.floor((Math.random() * 4));
                    let y = Math.floor((Math.random() * 4));
                    var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');
                    //console.log(elem[0]);

                    if (elem[0])
                        empty = true;
                }

                let value =  2 * (Math.floor((Math.random() * 2) + 1));
                if (value === 4 && Math.random() > 0.5)
                    value = 2;


                elem.attr('nbr', value);
                elem.text(value);
            }
        }

        $('.restart').on('click', function(){
            $('table').replaceWith(generateMap());
            $(".score").text(0);
            generateCell(2);
        });

        function score(val) {
            let score = $(".score").text();
            let total = parseInt(val)+parseInt(score);
            $(".score").text(total);
        }

        function victory(){
            alert("Vous avez gagné !");
        }

        function lose(){
            checkmoveRight();
            checkmoveUp();
            checkmoveDown()
            checkmoveLeft()
            //console.log(canmove);
            if(canmove == false){
                alert("Vous avez perdu")
            }
        }

        function checkmoveLeft() {
            for (let y = 0; y <= 3; y++) {
                for (let x = 0; x <= 3; x++) {
                    let supATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    if (supATTR > 0) {
                        for (let i = 0; i < x; i++) {
                            let supATTR = $("td[x=" + i + "][y=" + y + "]").attr("nbr");
                            if (supATTR == 0) {
                                return canmove = true;
                            }
                        }
                    }
                }
            }
            for (let y = 0; y <= 3; y++) {
                for (let x = 0; x <= 3; x++) {
                    let ATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr")
                    let nextATTR = $("td[x=" + (x + 1) + "][y=" + y + "]").attr("nbr")
                    if(ATTR == nextATTR && ATTR != 0 && nextATTR != 0){
                        return canmove = true;
                    }
                }
            }
        }
        function moveLeft() {
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    while ($("td[x=" + x + "][y=" + y + "]").attr("nbr") != 0 && x < 4) {
                        x++;
                    }
                    let i = x;
                    while ($("td[x=" + (i) + "][y=" + y + "]").attr("nbr") == 0 && i < 4) {
                        i++;
                    }
                    if (i != 0) {
                        let elemsupADDR = $('[x="' + i + '"][y="' + y + '"]');
                        let elemsupATTR = $("td[x=" + (i) + "][y=" + y + "]").attr("nbr");
                        let elemADDR = $('[x="' + x + '"][y="' + y + '"]');

                        elemADDR.attr('nbr', elemsupATTR);
                        elemADDR.text(elemsupATTR);

                        elemsupADDR.attr('nbr', 0);
                        elemsupADDR.text('');
                    }
                }
            }
        }
        function mergeLeft(){
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {

                    let elemATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr")
                    let elemADDR = $('[x="' + x + '"][y="' + y + '"]');
                    let elemsupATTR = $("td[x=" + (x + 1) + "][y=" + y + "]").attr("nbr")
                    let elemsupADDR = $('[x="' + (x + 1) + '"][y="' + y + '"]');

                    if (elemATTR == elemsupATTR && elemATTR != 0 && elemsupATTR != 0) {

                        let newVal = elemATTR * 2
                        elemADDR.attr('nbr', newVal)
                        elemADDR.text(newVal)

                        elemsupADDR.attr('nbr', 0);
                        elemsupADDR.text('');
                        score(newVal)
                        if(newVal == 2048){
                            victory();
                        }
                    }
                }
            }
        }

        function checkmoveUp(){
            for (let x = 0; x <= 3; x++) {
                for (let y = 0; y <= 3; y++) {
                    let supATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    if(supATTR > 0){
                        for (let i = 0; i <= y; i++) {
                            let supATTR = $("td[x=" + x + "][y=" + i + "]").attr("nbr");
                            if(supATTR == 0){
                                return canmove = true;
                            }
                        }
                    }
                }
            }
            for (let x = 0; x <= 3; x++) {
                for (let y = 0; y <= 3; y++) {
                    let ATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr")
                    let nextATTR = $("td[x=" + x + "][y=" + (y+1) + "]").attr("nbr")
                    if(ATTR == nextATTR && ATTR != 0 && nextATTR != 0){
                        return canmove = true;
                    }
                }
            }
        }
        function moveUp(){
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    while ($("td[x=" + x + "][y=" + y + "]").attr("nbr") != 0 && y < 4) {
                        y++;
                    }
                    let i = y;
                    while ($("td[x=" + x + "][y=" + (i) + "]").attr("nbr") == 0 && i < 4) {
                        i++;
                    }
                    if (i != 0) {
                        let elemsupADDR = $('[x="' + x + '"][y="' + (i) + '"]');
                        let elemsupATTR = $("td[x=" + x + "][y=" + (i) + "]").attr("nbr");
                        let elemADDR = $('[x="' + x + '"][y="' + y + '"]');
                        elemADDR.attr('nbr', elemsupATTR);
                        elemADDR.text(elemsupATTR);
                        elemsupADDR.attr('nbr', 0);
                        elemsupADDR.text('');
                    }
                }
            }
        }
        function mergeUp(){
            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    let elemATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr")
                    let elemADDR = $('[x="' + x + '"][y="' + y + '"]');
                    let elemsupATTR = $("td[x=" + x + "][y=" + (y+1) + "]").attr("nbr")
                    let elemsupADDR = $('[x="' + (x + '"][y="' + (y+1) + '"]'));

                    if(elemATTR == elemsupATTR && elemATTR !=0 && elemsupATTR != 0 ) {
                        let newVal = elemATTR * 2
                        elemADDR.attr('nbr', newVal)
                        elemADDR.text(newVal)
                        elemsupADDR.attr('nbr', 0);
                        elemsupADDR.text('');
                        score(newVal)
                        if(newVal == 2048){
                            victory();
                        }
                    }
                }
            }
        }

        function checkmoveRight(){
            for (let y = 0; y < 4; y++) {
                for (let x = 3; x >= 0; x--) {
                    let elemsupATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    if(elemsupATTR > 0){
                        for (let i = 3; i > x; i--) {
                            let elemsupATTR = $("td[x=" + i + "][y=" + y + "]").attr("nbr");
                            if(elemsupATTR == 0){
                                return canmove = true;
                            }
                        }
                    }
                }
            }
            for (let y = 0; y <= 3; y++) {
                for (let x = 3; x >= 0; x--) {
                    let ATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr")
                    let nextATTR = $("td[x=" + (x - 1) + "][y=" + y + "]").attr("nbr")
                    if(ATTR == nextATTR && ATTR != 0 && nextATTR != 0){
                        return canmove = true;
                    }
                }
            }
        }
        function moveRight(){
            for (let y = 0; y < 4; y++) {
                for (let x = 3; x >= 0; x--) {
                    while($("td[x=" + x + "][y=" + y + "]").attr("nbr") != 0 && x >= 0){
                        x--;
                    }
                    let i = x;
                    while($("td[x=" + (i) + "][y=" + y + "]").attr("nbr") == 0 && i >= 0 ){
                        i--;
                    }
                    if(i != 4 ){
                        let eleminfADDR = $('[x="' + i + '"][y="' + y + '"]');
                        let eleminfATTR = $("td[x=" + (i) + "][y=" + y + "]").attr("nbr");
                        let elemADDR = $('[x="' + x + '"][y="' + y + '"]');

                        elemADDR.attr('nbr', eleminfATTR);
                        elemADDR.text(eleminfATTR);

                        eleminfADDR.attr('nbr',0);
                        eleminfADDR.text('');
                    }
                }
            }
        }
        function mergeRight(){
            for (let y = 0; y < 4; y++) {
                for (let x = 4; x >= 0; x--) {

                    let elemATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr")
                    let elemADDR = $('[x="' + x + '"][y="' + y + '"]');
                    let elemsupATTR = $("td[x=" + (x-1) + "][y=" + y + "]").attr("nbr")
                    let elemsupADDR = $('[x="' + (x-1) + '"][y="' + y + '"]');

                    if (elemATTR == elemsupATTR && elemATTR != 0 && elemsupATTR != 0) {

                        let newVal = elemATTR * 2
                        elemADDR.attr('nbr', newVal)
                        elemADDR.text(newVal)

                        elemsupADDR.attr('nbr', 0);
                        elemsupADDR.text('');
                        score(newVal)
                        if(newVal == 2048){
                            victory();
                        }
                    }
                }
            }
        }

        function checkmoveDown(){
            for (let x = 0; x <= 3; x++) {
                for (let y = 3; y >= 0; y--) {
                    let elemsupATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr");
                    if(elemsupATTR > 0){
                        for (let i = 4; i > y; i--) {
                            let elemsupATTR = $("td[x=" + x + "][y=" + i + "]").attr("nbr");
                            if(elemsupATTR == 0){
                                return canmove = true;
                            }
                        }
                    }
                }
            }
            for (let x = 0; x <= 3; x++) {
                for (let y = 3; y >= 0; y--) {
                    let ATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr")
                    let nextATTR = $("td[x=" + x + "][y=" + (y-1) + "]").attr("nbr")
                    if(ATTR == nextATTR && ATTR != 0 && nextATTR != 0){
                        return canmove = true;
                    }
                }
            }
        }
        function moveDown(){
            for (let x = 0; x <= 3; x++) {
                for (let y = 3; y > 0; y--) {
                    while($("td[x=" + x + "][y=" + y + "]").attr("nbr") != 0 && y >= 0){
                        y--;
                    }
                    let i = y;

                    while($("td[x=" + x + "][y=" + (i) + "]").attr("nbr") == 0 && i >= 0 ){
                        i--;
                    }
                    if(i != 4 ){
                        let elemsupADDR = $('[x="' + x + '"][y="' + (i) + '"]');
                        let elemsupATTR = $("td[x=" + x + "][y=" + (i) + "]").attr("nbr");
                        let elemADDR = $('[x="' + x + '"][y="' + y + '"]');

                        elemADDR.attr('nbr', elemsupATTR);
                        elemADDR.text(elemsupATTR);

                        elemsupADDR.attr('nbr',0);
                        elemsupADDR.text('');
                    }
                }
            }
        }
        function mergeDown(){
            for (let x = 0; x <= 3; x++) {
                for (let y = 3; y > 0; y--) {
                    let elemATTR = $("td[x=" + x + "][y=" + y + "]").attr("nbr")
                    let elemADDR = $('[x="' + x + '"][y="' + y + '"]');
                    let elemsupATTR = $("td[x=" + x + "][y=" + (y-1) + "]").attr("nbr")
                    let elemsupADDR = $('[x="' + (x + '"][y="' + (y-1) + '"]'));

                    if(elemATTR == elemsupATTR && elemATTR !=0 && elemsupATTR != 0 ) {
                        let newVal = elemATTR * 2
                        elemADDR.attr('nbr', newVal)
                        elemADDR.text(newVal)
                        elemsupADDR.attr('nbr', 0);
                        elemsupADDR.text('');
                        score(newVal)
                        if(newVal == 2048){
                            victory();
                        }
                    }
                }
            }
        }


        // fonction de gestion des évenements (appuie de touches)
        $('html').keydown(function(event) {
            switch (event['key']) {
                case 'ArrowLeft':
                    // insérer algo move left
                    if(checkmoveLeft() == true){
                        moveLeft();
                        mergeLeft();
                        generateCell(1);
                    }
                    //console.log("Left");
                    break;

                case 'ArrowUp':
                    // insérer algo move up
                    if(checkmoveUp() == true){
                        moveUp();
                        mergeUp();
                        generateCell(1);
                    }
                    //console.log("Up");
                    break;

                case 'ArrowRight':
                    // insérer algo move right
                    if(checkmoveRight() == true){
                        moveRight();
                        mergeRight();
                        generateCell(1);
                    }
                    //console.log("Right");
                    break;

                case 'ArrowDown':
                    // insérer algo move down

                    if(checkmoveDown() == true){
                        moveDown();
                        mergeDown();
                        generateCell(1);
                    }
                    //console.log("Down");
                    break;

            }

        });
        // début du code lancé
        $(this).append(generateMap()); // génération du tableau vide
        generateCell(2); // génération aléatoire de deux cases pleines (2 ou 4)
    }

})(jQuery); // fin du pluggin
