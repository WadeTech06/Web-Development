var jsonData;
const _CONTENT = "_content";


function InsertMenu(node, optionName, xmlData, category) {
    var divPanel = document.createElement("div");
    divPanel.setAttribute("class", "panel panel-success");
    var divPanelHeading = document.createElement("div");
    divPanelHeading.setAttribute("class", "panel-heading");
    divPanelHeading.appendChild(document.createTextNode(optionName + " - " + category));

    var divPanelBody = document.createElement("div");
    divPanelBody.setAttribute("class", "panel-body");

    var divRow = document.createElement("div");
    divRow.setAttribute("class", "row");
    divPanel.appendChild(divPanelHeading);

    path = "/menu/" + node.nodeName + "/" + category;
    var nodes = xmlData.evaluate(path, xmlData, null, XPathResult.ANY_TYPE, null);
    var result = nodes.iterateNext();
    while (result) {

        var divName = document.createElement("div");
        divName.setAttribute("class", "col-lg-8");
        divName.appendChild(document.createTextNode(result.childNodes[0].innerHTML));
        var divPrice = document.createElement("div");
        divPrice.setAttribute("class", "col-lg-4");
        divPrice.appendChild(document.createTextNode(result.childNodes[1].innerHTML));

        divRow.appendChild(divName);
        divRow.appendChild(divPrice);

        divPanelBody.appendChild(divRow);

        divPanel.appendChild(divPanelBody);

        var breakfast_content = document.getElementsByClassName(node.nodeName + _CONTENT);
        breakfast_content[0].appendChild(divPanel);
        result = nodes.iterateNext();
    }
}

function parseJson() {
    $.getJSON("LabJASON/OnebusinessDataFormat_yelp.json", function (data) {
        //sets name elements
        document.getElementById("NameContent").innerText = data["name"];
        //sets address elements
        document.getElementById("AddressContent").innerText = data["full_address"];

        //sets hour elements
        var hours = data["hours"];
        var table = document.getElementById("HoursContent");
        for (var key in hours) {
            if (hours.hasOwnProperty(key)) {
                var open = hours[key].open;
                var close = hours[key].close;

                var rowCount = table.rows.length;
                var row = table.insertRow(rowCount);

                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);

                cell1.innerHTML = key;
                cell2.innerHTML = open + " - " + close;
            }
        }

        var attributes = data["attributes"];
        var ul = document.getElementById("service_content");
        for (var x in attributes) {
            if (attributes.hasOwnProperty(x)) {
                var keyVal = attributes[x];
                if (typeof (keyVal) === 'object') {
                    for (var y in keyVal) {
                        if (keyVal.hasOwnProperty(y)) {
                            var innerKeyVal = keyVal[y];
                            if (innerKeyVal) {
                                var li = document.createElement("li");
                                li.appendChild(document.createTextNode(y));
                                ul.appendChild(li);
                            }
                        }
                    }
                } else if (typeof (keyVal) === 'boolean' && keyVal) {
                    var li = document.createElement("li");
                    li.appendChild(document.createTextNode(x));
                    ul.appendChild(li);
                }

            }
        }
    });
}

function parseXML() {

    var xmlData;
    var xhttp = new XMLHttpRequest();
    xhttp.overrideMimeType('text/xml')
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            xmlData = xhttp.responseXML;

            var path = "/menu/*";
            if (xmlData.evaluate) {
                var nodes = xmlData.evaluate(path, xmlData, null, XPathResult.ANY_TYPE, null);
                var result = nodes.iterateNext();
                var menuOption_ul = document.getElementById("menu_option");
                while (result) {
                    //Creates submenu of menu items
                    var li = document.createElement("li");
                    var a = document.createElement("a");
                    var optionName = result.nodeName;
                    optionName = optionName.charAt(0).toUpperCase() + optionName.slice(1);
                    a.appendChild(document.createTextNode(optionName))
                    a.setAttribute("id", result.nodeName + _CONTENT);
                    a.setAttribute("tabindex", "-1");
                    a.setAttribute("data-toggle", "tab");
                    a.setAttribute("href", "#"+result.nodeName);
                    li.appendChild(a);
                    menuOption_ul.appendChild(li);

                    //Create panels from 
                    InsertMenu(result, optionName, xmlData, "appetizer");
                    InsertMenu(result, optionName, xmlData, "salad");
                    InsertMenu(result, optionName, xmlData, "soup");
                    InsertMenu(result, optionName, xmlData, "entree");
                    InsertMenu(result, optionName, xmlData, "dessert");
                    InsertMenu(result, optionName, xmlData, "beer");
                    InsertMenu(result, optionName, xmlData, "wine");
                    InsertMenu(result, optionName, xmlData, "coffee");
                    InsertMenu(result, optionName, xmlData, "soda");

                    result = nodes.iterateNext();
                }
            }
        }
    };
    xhttp.open("GET", "LabJASON/restaurant_menu.xml", true);
    xhttp.send();
}