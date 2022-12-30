
function sortOwnedGames(){
    let sortedGameList = ownedGames.response.games.sort((a,b) => b.playtime_forever - a.playtime_forever);
    
        sortedGameList.forEach((element) => {delete element.appid; delete element.img_icon_url; delete element.has_community_visible_stats; delete element.playtime_linux_forever; delete element.playtime_mac_forever; delete element.playtime_windows_forever; delete element.rtime_last_played; delete element.has_leaderboards; delete element.content_descriptorids});
    
    let table = document.getElementById("ergebnisListe");
    let data = Object.keys(sortedGameList[0]);
    generateTableHead(table, data);
    generateTable(table, sortedGameList);
      let input, filter, tr, td, txtValue;

}


function generateTableHead(table, data){
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let j=0; j<4; j++){
        let th = document.createElement("th");
        let text = document.createTextNode("...");
        th.appendChild(text);
        row.appendChild(th);
        }
    var headers = document.getElementsByTagName("th");
    headers[0].innerHTML = "Titel des Spiels";
    headers[1].innerHTML = "Spielzeit letzte 2 Wochen";
    headers[2].innerHTML = "Spielzeit Gesamt";
    headers[3].innerHTML = "Freunde, die das Spiel besitzen";

}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
        
    }
  }
}



function searchFunctionErgebnisliste() {
  // Variablen für die Suchleiste etablieren
      input = document.getElementById("inputSearchErgebnisliste");
      filter = input.value.toUpperCase();
      table = document.getElementById("ergebnisListe");
      tr = table.getElementsByTagName("tr");

      // Durch die einzelnen Reihen laufen
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.innerHTML;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""; 
            } 
            else {
            tr[i].style.display = "none";
                  console.log(5); 
            } 
        } 
      } 
}


function sortTablePlaytime() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("ergebnisListe");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      // Check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function sortTablePlayers() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("ergebnisListe");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      // Check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}



/*
<tr>
                        <th>Spiel</th>
                        <th>Anzahl der Mitspieler</th>
                        <th>Im Besitz:</th>
                    </tr><tr>
                        <td>Age of Empires 2</td>
                        <td>3</td>
                        <td>Peter, Björn, Florian</td>
                    </tr><tr>
                        <td> DOTA 2</td>
                        <td> 2</td>
                        <td> Peter, Björn</td>
*/

console.log("Table Spielwiese durchgelaufen");