class TableTemplate {
    static fillIn(id, dict, coulmnName) {

        var reg = new RegExp(/{{(\w+)}}/i);
        var coulmnNames = [];
        var row = document.getElementById(id).rows;
        for (var x = 0; x < row.length; x++) {
            var cells = row[x].cells;
            if (x === 0) {
                for (var y = 0; y < cells.length; y++) {
                    var tempBool = reg.test(cells[y].innerHTML);
                    if (tempBool) {
                        var val = reg.exec(cells[y].innerHTML);
                        var swap = dict[val[1]];
                        cells[y].innerHTML = swap;
                        coulmnNames.push(swap);
                    }
                }
            }
            else {
                if (coulmnName == null) {
                    for (var y = 0; y < cells.length; y++) {
                        var tempBool = reg.test(cells[y].innerHTML);
                        if (tempBool) {
                            var val = reg.exec(cells[y].innerHTML);
                            var swap = dict[val[1]];
                            cells[y].innerHTML = swap;
                        }
                    }
                }
                else {
                    var updateCoulmn = coulmnNames.indexOf(coulmnName);
                    var tempBool = reg.test(cells[updateCoulmn].innerHTML);
                    if (tempBool) {
                        var val = reg.exec(cells[updateCoulmn].innerHTML);
                        var swap = dict[val[1]];
                        cells[updateCoulmn].innerHTML = swap;
                    }
                }
            }
        }
    }
}