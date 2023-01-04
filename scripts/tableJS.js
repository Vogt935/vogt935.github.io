var filteredGamesList;

function buildGamesList(){
    let table = document.getElementById("ergebnisListe");
    table.innerHTML="";
    filteredGamesList = ownedGames.response.games;
    
    filteredGamesList.forEach((element) => {delete element.img_icon_url; delete element.has_community_visible_stats; delete element.playtime_linux_forever; delete element.playtime_mac_forever; delete element.playtime_windows_forever; delete element.rtime_last_played; delete element.has_leaderboards; delete element.content_descriptorids; delete element.playtime_2weeks});
    let data = Object.keys(filteredGamesList[0]);
    var reducedList = filteredGamesList.slice(0,20);
    generateTableHead(table, data);
    generateTable(table, reducedList);
    generateTableButtons();
}


//Sort Array of Games functions:

function sortTablePlaytimeMost(){
    let table = document.getElementById("ergebnisListe");
    table.innerHTML="";
    let sortedGamesList = filteredGamesList.sort((a,b) => b.playtime_forever - a.playtime_forever);
    let data = Object.keys(sortedGamesList[0]);
    let reducedList = sortedGamesList.filter(sortedGamesList => sortedGamesList.playtime_forever > 60);
    generateTableHead(table, data);
    generateTable(table, reducedList);
    let input, filter, tr, td, txtValue;
    generateTableButtons();
    

}

function sortTablePlaytimeLeast(){
    let table = document.getElementById("ergebnisListe");
    table.innerHTML="";
    let sortedGamesList = filteredGamesList.sort((a,b) => a.playtime_forever - b.playtime_forever);
    let data = Object.keys(sortedGamesList[0]);
    generateTableHead(table, data);
    generateTable(table, sortedGamesList);
    let input, filter, tr, td, txtValue;
    generateTableButtons();
}

function sortAllSteamGames(){
    let table = document.getElementById("ergebnisListe");
    table.innerHTML="";
    filteredGamesList = ownedGames.response.games;
    let data = Object.keys(filteredGamesList[0]);
    generateTableHead(table, data);
    generateTable(table, filteredGamesList);
    generateTableButtons();

}


//Searchbar function

function searchFunctionErgebnisliste() {
  // Variablen für die Suchleiste etablieren
      input = document.getElementById("inputSearchErgebnisliste");
      filter = input.value.toUpperCase();
      table = document.getElementById("ergebnisListe");
      tr = table.getElementsByTagName("tr");

      // Durch die einzelnen Reihen laufen
      for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
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


//Generate Table functions:


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
    headers[0].innerHTML = "Steam-App-ID";
    headers[1].innerHTML = "Titel des Spiels";
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

function generateTableButtons(){
    let table = document.getElementById("ergebnisListe").firstChild;
    console.log(table.childElementCount);
    for (let l = 1; l <= table.childElementCount; l++){
        var varAppID = table.children[l].firstChild.innerHTML;
        console.log(varAppID);
        table.children[l].firstChild.innerHTML='<a href="steam://rungameid/'+varAppID+'"><button class="iconButton" > <i class="fa-solid fa-share"></i> Spiel starten!</button></a>';
    }

}



console.log("Skript tableJS durchgelaufen.")