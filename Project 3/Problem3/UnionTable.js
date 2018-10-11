class UnionTable {
    static GenerateTable() {
        var docContents = document.getElementsByClassName("toc");
        docContents = docContents[0].childNodes[3].children

        var name = "",
            date = "",
            address = "";

        for (var x = 0; x < docContents.length; x++) {
            var text = docContents[x].innerText;
            var html = docContents[x].innerHTML;

            name = text.substring(0, text.indexOf('(') - 1);
            date = text.substring(text.indexOf('(') + 1, text.indexOf(')'));
            address = html.substring(html.indexOf("href=") + 6, html.indexOf(".html") + 5);

            UnionTable.appenedTable(name, date, address);
            console.log("fdg");
        }
    }

    static appenedTable(name, date, address) {
        var table = document.getElementById("UnionTable");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);
        row.className = "row"
        var cell1 = row.insertCell(0);
        cell1.className = "cell"
        var cell2 = row.insertCell(1);
        cell2.className = "cell"
        var cell3 = row.insertCell(2);
        cell3.className = "cell"

        cell1.innerHTML = name;
        cell2.innerHTML = date;

        var link = document.createElement("a");
        link.setAttribute('href',address)
        link.innerHTML = address;
        cell3.appendChild(link);
        
    }

}