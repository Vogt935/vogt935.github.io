// Table-specific variable
    var filteredGamesList;

// Function to build the games list from informations in actingUser object
    function buildGamesList() {
        let table = document.getElementById("ergebnisListe");
        table.innerHTML="";
        filteredGamesList = actingUser.ownedGames;    
        filteredGamesList.forEach((element) => 
                                  {delete element.img_icon_url; delete element.has_community_visible_stats; delete element.playtime_linux_forever; delete element.playtime_mac_forever; delete element.playtime_windows_forever; delete element.rtime_last_played; delete element.has_leaderboards; delete element.content_descriptorids; delete element.playtime_2weeks}); //delete data from response unused in this application
        filteredGamesList.forEach((element) =>          
                                  {element.yourPlaytime_forever = element.playtime_forever}); //copy personal playtime_forever data before it get redefined as the groups playtime data
        if (adHocCounter > 0){ // select just adHoc-Group members information
            filteredGamesList.forEach((element) => {
                element.owners = [actingUser];
                if (actingUser.friendsListObjects) { actingUser.friendsListObjects.forEach((friend) => {
                    if (friend.ownedGames && friend.adHocGroup === true) {
                        friend.ownedGames.forEach((game) => {
                        if (game && game.appid === element.appid) {
                            element.owners.push(friend);
                            element.playtime_forever += game.playtime_forever;
                                }
                            });
                        }
                    });
                }
            });
        }
        else { //otherwise select everyones information
            filteredGamesList.forEach((element) => {
            element.owners = [actingUser];
            if (actingUser.friendsListObjects) { actingUser.friendsListObjects.forEach((friend) => {
                if (friend.ownedGames) {
                    friend.ownedGames.forEach((game) => {
                    if (game && game.appid === element.appid) {
                        element.owners.push(friend);
                        element.playtime_forever += game.playtime_forever;
                            }
                        });
                    }
                });
            }
            });
        }
        filteredGamesList.forEach((element) => {
                                    element.playtime_forever = Math.round(element.playtime_forever / 60);
                                    element.yourPlaytime_forever = Math.round(element.yourPlaytime_forever / 60);});   // change the requests minutes to hours
        filteredGamesList.forEach((element) => function(addActingUser) {
                                    element.owners = actingUser;});     
        let data = Object.keys(filteredGamesList[0]);
        sortTablePlaytimeMost();
        var reducedList = filteredGamesList.slice(0,20); //select the first 20 games after sorting the list
        buildingProgress(data, reducedList, table); //build the table
    }


// Main process to build the table object
    function buildingProgress(data, list, table){
        generateTableHead(table, data);
        generateTable(table, list);
        let input, filter, tr, td, txtValue;
        generateTableButtons();
        generateTableAvatars();
    }


// Sort table array for games with most playtime
    function sortTablePlaytimeMost(){
        let table = document.getElementById("ergebnisListe");
        table.innerHTML="";
        let sortedGamesList = filteredGamesList.sort((a,b) => b.playtime_forever - a.playtime_forever);
        let data = Object.keys(sortedGamesList[0]);
        let reducedList = sortedGamesList.filter(sortedGamesList => sortedGamesList.playtime_forever > 60);

        buildingProgress(data, reducedList, table); //rebuild the table
    }

// Sort table array for games with least playtime
    function sortTablePlaytimeLeast(){
        let table = document.getElementById("ergebnisListe");
        table.innerHTML="";
        let sortedGamesList = filteredGamesList.sort((a,b) => a.playtime_forever - b.playtime_forever);
        let data = Object.keys(sortedGamesList[0]);

        buildingProgress(data, sortedGamesList, table); //rebuild the table
    }

// Show all games in table
function sortAllSteamGames(){
    let table = document.getElementById("ergebnisListe");
    table.innerHTML="";
    let data = Object.keys(filteredGamesList[0]);

    buildingProgress(data, filteredGamesList, table); //rebuild the table
}

// Sort table by most friends who own the game
    function sortTableByOwnersCount() {
        let table = document.getElementById("ergebnisListe");
        table.innerHTML = "";
        let sortedGamesList = filteredGamesList.sort((a, b) => b.owners.length - a.owners.length);
        let data = Object.keys(sortedGamesList[0]);
        
        buildingProgress(data, sortedGamesList, table); //rebuild the table
    }



// Rebuild the table just considering users who are marked as Ad Hoc Group by user
    function selectTableForAdHocGroup(){
        let table = document.getElementById("ergebnisListe");
        table.innerHTML="";
        let selectedGamesList = filteredGamesList.filter(game => {
            let isAdHoc = false;
            game.owners.forEach(owner => {
                if (owner.adHocGroup === true){
                    isAdHoc = true;
                }
            })
            return isAdHoc;
        })
        buildingProgress(data, selectedGamesList, table)
    }


//Searchbar function
    function searchFunctionErgebnisliste() {
      // establish searchbar variables
          input = document.getElementById("inputSearchErgebnisliste");
          filter = input.value.toUpperCase();
          table = document.getElementById("ergebnisListe");
          tr = table.getElementsByTagName("tr");

          // iterate through the rows
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


// Generate Table functions:
// generate the table head
    function generateTableHead(table, data){
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let j=0; j<7; j++){
            let th = document.createElement("th");
            let text = document.createTextNode("...");
            th.appendChild(text);
            row.appendChild(th);
            }
        var headers = document.getElementsByTagName("th");
        headers[0].innerHTML = "";
        headers[1].innerHTML = "Titel des Spiels";
        headers[2].innerHTML = "Spielzeit Gruppe (Stunden)";
        headers[3].innerHTML = "Deine Spielzeit (Stunden)";
        headers[4].innerHTML = "";
        headers[5].innerHTML = "";
        headers[6].innerHTML = "Freunde, die das Spiel besitzen";

    }

// generate the table body
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

// generate the buttons above the table
    function generateTableButtons(){

        let table = document.getElementById("ergebnisListe").firstChild;
        console.log(table.childElementCount);
        for (let l = 1; l < table.childElementCount; l++){
            let varAppID = table.children[l].firstChild.innerHTML;
            //console.log(varAppID);
            document.getElementById("ergebnisListe").firstChild.children[l].firstChild.innerHTML='<a href="steam://rungameid/'+varAppID+'"><button class="iconButton"><i class="fa-solid fa-share"></i> Spiel starten!</button></a>';
        }

    }

// generate the avatars of friends who own the respective games and display them in the table
    function generateTableAvatars() {
        let table = document.getElementById("ergebnisListe").firstChild;
        for (let l = 1; l < table.childElementCount; l++) {
            let owner = document.createElement("td");
            let game = filteredGamesList[l - 1];
            for (let o = 0; o < game.owners.length; o++) {    
                let picAvatar = document.createElement("img");
                picAvatar.classList.add("friendsPic");
                let picSrc = game.owners[o].avatar;
                picAvatar.src = picSrc;
                owner.appendChild(picAvatar);
            }
            table.children[l].appendChild(owner);
        }
    }



console.log("Skript tableJS durchgelaufen.")