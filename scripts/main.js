//Stufe 1 - Basic Function:
//ÜberTODO: Import JSON; Get Game Infos; Show it all; node.js; 
//highTODO: node.js einrichten
//highTODO: Die Abfragen "scharf schalten"
//TODO:     Code-Review und Refractoring!
//lowTODO:  Aus einer Skript-Datei mehrere machen?


//Stufe 2 - Added Group Functions:
//ÜberTODO: Share-Funktion; Chat-Funktion
//highTOOD: Die verschiedenen Webfunktionen als Buttons einbauen (Starte Chat, starte Spiel, starte ... direkt von der Website!)
//TODO:     Share-Button in Friendslist einbauen
//TODO:     Chatfunktion in node.js? Anhand der Steam-ID eine Sitzung erstellen, die dann geteilt werden kann?
//lowTODO:  Friendslist suchbar machen?


//Stufe 3 - Polish:
//TODO:     Icons neben Benutzernamen
//TODO:     Zeitlich gesetzte neue Abfrage welche Freunde online sind? Krücke über aktulisierungsbutton, Toast wenn neuer             Freund dazu kommt?
//TODO:     Responsiveness noch verbessern? (Ist eigentlich schon ganz ok...)
//TODO:     Letzte Code-Review, noch mal alles an Müll rausschmeißen!
//lowTODO:  Home ausblenden in LocalStorage?



// Testdaten:
var myFriendslist = {"friendslist":{"friends":[{"steamid":"76561197966953159","relationship":"friend","friend_since":1394392802},
                                                 {"steamid":"76561197969067270","relationship":"friend","friend_since":1452304416},{"steamid":"76561197979247125","relationship":"friend","friend_since":1620943081},{"steamid":"76561197984913701","relationship":"friend","friend_since":1401274804},{"steamid":"76561198011593392","relationship":"friend","friend_since":1551454004},{"steamid":"76561198017068250","relationship":"friend","friend_since":1456168382},{"steamid":"76561198036118525","relationship":"friend","friend_since":1394392809},
                                                 
                                                 {"steamid":"76561198038501532","relationship":"friend","friend_since":1394396986},{"steamid":"76561198053250556","relationship":"friend","friend_since":1617043740},{"steamid":"76561198113162927","relationship":"friend","friend_since":1403461061},/*{"steamid":"76561198170826159","relationship":"friend","friend_since":1419784457},{"steamid":"76561198297302899","relationship":"friend","friend_since":1460301328},{"steamid":"76561198983798096","relationship":"friend","friend_since":1643480286}*/
                                                 
                                                 
                                                 ]}};
                                                 


console.log("Testdaten erstellt!");






//classes:
    class User {
        constructor(steamID){
            this.name = "Test"; //fetchGetName
            this.steamID = steamID;
            this.online = false; //fetchStatus
            this.ownedGames = [0]; //fetchOwnedGames
            this.friendsListInput = [] //fetchFriendlist
            this.friendsListObjects = [];
            this.savedID= false;
            this.adHocGroup=false;
        }}

    class steamApp {
        constructor(appid){
            this.appid = appid;
        }}
    

//variables:
// frontend
    let newSIDButton = document.getElementById("my-steamid-button");
    let mySID = document.getElementById("my-steam-ID");
    let userHeading =document.getElementById("userHeading");

    
// backend
    const actingUser = new User();
    let i = 0;
    let n = 0;
    let clickedFriend=10;
    let adHocCounter=0;
    let lengthFL=myFriendslist.friendslist.friends.length;
    let homeText = document.getElementsByTagName("home");


//functions: 
//main function, set Steam ID, fetch information from Steam Web API
    function routineActingUser(mySteamID){
        let myID = +mySteamID;

            actingUser.steamID=myID;
            actingUser.friendsListInput=myFriendslist.friendslist.friends;
            //formInputToUsers(actingUser.friendsListInput)
            buildFriendsList();
        userHeading.textContent = `Angemeldet mit Steam-ID: ${mySteamID}`;
    }

//function to set the Users Steam ID and save it as "name" in local storage
function getAndSaveUserID() {
    const myIDstring = prompt("Bitte geben Sie Ihre Steam-ID ein:");
    localStorage.setItem("savedIDstring", myIDstring);
    routineActingUser(myIDstring);  
	//getUserSID(localStorage.getItem("name")); 
}


//Access functions
    function getUserName(userProfile) {
        console.log("function started");
        return userProfile.Name
    }

// build the frontend friendlist from the friendlist (not jet user-centered but input-centered)
    function buildFriendsList(){
        console.log("Die Friendslist ist "+actingUser.friendsListInput.length+" Freunde lang.");
        const lengthFl= actingUser.friendsListInput.length-1;
        if(lengthFl > 0) {
            document.getElementById("adHocCounter").style.visibility="visible";
            document.getElementById("friendlist").innerHTML="Es sind "+(lengthFl+1)+" Freunde online:";
            let i = 0;
            while (i <= lengthFl) {
                let id = "friend"+i;
                //console.log(id);
                let friendToAdd = new User(actingUser.friendsListInput[i].steamid);
                //console.log(friendToAdd.steamID);
                actingUser.friendsListObjects.push(friendToAdd);
                if (i < 10){
                    const element = document.getElementById(id);
                    element.style.visibility="visible";
                    document.getElementById(id).innerHTML= (""+actingUser.friendsListInput[i].steamid+" ist online");
                    i++;
                }
                else{
                    const element = document.getElementById("moreFriends");
                    element.style.visibility="visible";
                    document.getElementById("moreFriends").innerHTML=("Es sind mehr als 10 Freunde online!");
                i++;
                } } }
        else{
            document.getElementById("friendslist").innerHTML="Es sind keine Freunde online.";
        }}


//reload the number of friends in AdHoc-Group
    function reloadAdHocStatus(){
        document.getElementById("adHocCounter").innerHTML=adHocCounter;
        }

//add friend to AdHoc-Group by clicking on his Name
    function addToAdHocGroup(clickedFriend){
        if (actingUser.friendsListObjects[clickedFriend].adHocGroup == true){
                actingUser.friendsListObjects[clickedFriend].adHocGroup = false;
                    //console.log("Changed adHocGroup for Friend "+clickedFriend+" to false. Adhoc-group is "+(adHocCounter-1)+" friends.");
                document.getElementById("friend"+clickedFriend).style.background="#c5c3c0";
                document.getElementById("friend"+clickedFriend).style.color="black";
            //start routine to reload the tables
            //reload counterFriends
                adHocCounter--;
                reloadAdHocStatus();
            }
        else{
            actingUser.friendsListObjects[clickedFriend].adHocGroup=true;
                //console.log("Changed adHocGroup for Friend "+clickedFriend+" to true. Adhoc-group is "+(adHocCounter+1)+" friends.");
            document.getElementById("friend"+clickedFriend).style.background="#577e87";
            document.getElementById("friend"+clickedFriend).style.color="white";
            //start routine to reload the tables
            //reload counterFriends
            adHocCounter++; 
            reloadAdHocStatus();
        }}


    function hideHomeText(){
        homeText[0].innerHTML="";
        homeButton.style.visibility="visible";
    }



//script 
  
//request to save a Steam ID if there is non in local storage

//Abfrage, ob eine Steam-ID im localStorage ist und ein paar Darstellungsänderungen
    if (!localStorage.getItem("savedIDstring")) {
        mySID.textContent = "Nicht angemeldet!";
        userHeading.textContent = "";
    } else {
        const storedIDstring = localStorage.getItem("savedIDstring");
        routineActingUser(storedIDstring);
        actingUser.savedID = true;
        mySID.textContent = "Willkommen zurück, "+actingUser.name;
        newSIDButton.textContent = "Gespeicherte Steam-ID ändern";
    }

//Erstellung der Friendslist
    const lengthFl= actingUser.friendsListObjects.length-1;
    if(lengthFl > 0) {
        document.getElementById("friendlist").innerHTML="Es sind "+actingUser.friendsListObjects.length+" Freunde online:";
    }






//eventhandling
    
    newSIDButton.onclick = () => {
        getAndSaveUserID();
        alert("User-ID geändert!")
        mySID.textContent = "Willkommen, "+actingUser.name;
    };




//TO BE USED oder zu ersetzen:

// Get information from steam servers
// Serialization variables to be filled
    var serRequestFriendList = "empty";
    var serRequestOwnedGames = "empty";
    var serRequestGameStats = "empty";
    var serRequestGameInfo= "empty";

//Serialization with the saved User Steam ID
    function getUserSID(sid) {
        console.log(sid);
        serRequestFriendList = "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=5FEC780FE57D3BBEA4B74CDA91C7C72E&steamid="+sid+"&relationship=friend&format=json";
        console.log(serRequestFriendList);
        serRequestOwnedGames = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5FEC780FE57D3BBEA4B74CDA91C7C72E&steamid="+sid+"&format=json";
        console.log(serRequestOwnedGames);
        serRequestGameStats = "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=5FEC780FE57D3BBEA4B74CDA91C7C72E&steamid="+sid+"format=json";
        console.log(serRequestGameStats);
    }

//Get information about a specific game
    function getGameStats(appid) {
        console.log(appid);
        serRequestGameInfo = "http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=440&key=5FEC780FE57D3BBEA4B74CDA91C7C72E&steamid="+appid;
        console.log(serRequestGameInfo);
    }



//Fetch-Funktionen? -> Nach node.js erst notwendig bzw. für Node.js notwendig
/* 
function fetchOwnedGames(userProfile){
    gameslist = [1,2];
    //fetch gameslist from steam API
    this.myOwnedGames = gameslist;
    console.log("function finished");
}

function fetchSetFriendsList(userProfile){
    friendsList = [4,5];
    //fetc friendList from steam API
    userProfile.myFriendsList = friendsList;
    console.log("function finished");
}

function setSteamUser(inputSteamID, steamUser){
    //get Steam ID from Input per Button
    owningSteamUser.mySteamid = inputSteamID;
    //buildUpByNewSteamID(owningSteamUser.mySteamid);
    console.log("function finished");
    
}


function buildUpByNewSteamID(activeSteamUser){
    fetchFriendsList(activeSteamUser);
    fetchGameStats(activeSteamUser);
    }
*/

console.log("Script durchgelaufen!");

      



//Spielwiese, Table-Erstellung




let gamesList = [
  { name: "Age of Empires II", groupPlaytime: 1658, yourPlaytime: 3 },
  { name: "World of Warcraft", groupPlaytime: 1654, yourPlaytime: 2 },
  { name: "Valheim", groupPlaytime: 1520, yourPlaytime: 5 },
  { name: "DOTA 2", groupPlaytime: 1592, yourPlaytime: 1 },
  { name: "Broforce", groupPlaytime: 1738, yourPlaytime: 2 }
];

function generateTableHead(table, data){
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
  }
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
    var headers = document.getElementsByTagName("th");
    headers[0].innerHTML = "Name des Spiels";
    headers[1].innerHTML = "Gemeinsame Spielzeit";
    headers[2].innerHTML = "Online-Freunde, die das Spiel besitzen";
    
}

let table = document.querySelector("table");
let data = Object.keys(gamesList[0]);
generateTableHead(table, data);
generateTable(table, gamesList);
  let input, filter, tr, td, txtValue;

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
    } } } }


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