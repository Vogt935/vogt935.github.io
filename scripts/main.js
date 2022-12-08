//Über-TODO: Import JSON; Get Game Infos; Show it all
//TODO: Akzeptanz und Verarbeitung von JSONs im Steam-Style, wie bekomme ich das hin? XMLhttprequest or fetch?
//TODO: HTML/CSS: Darstellung Games-List
//TODO: Funktionsbuttons/Filter umsetzen (Darstellung Liste, sortieren usw)
//TODO: Umbenennung SID-Button
//TODO: Friends as Buttons, CSS für Friend-Button und Checkboxen, onclick einen two-way-process starten (wenn in group, dann raus, wenn nicht, dann rein), Friends in AdHocGroup werden blau hervorgehoben in Tabelle
//TODO: Friendslist suchbar machen
//TODO: Tabelle Games-List erstellen, CSS für Games-List, Filter für Friendslist
      
// Testdaten:




      console.log("Script gestartet");
      
      fetch('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=440&count=3', {credentials: "include"})
      .then(res => res.json())
      .then(data => console.log(data));

      
      console.log("Fetch durchgeführt");
      
 


//   http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=5FEC780FE57D3BBEA4B74CDA91C7C72E&steamid=76561197960434622&format=json


const myFriendslist = {"friendslist":{"friends":[{"steamid":"76561197966953159","relationship":"friend","friend_since":1394392802},
                                                 {"steamid":"76561197969067270","relationship":"friend","friend_since":1452304416},{"steamid":"76561197979247125","relationship":"friend","friend_since":1620943081},{"steamid":"76561197984913701","relationship":"friend","friend_since":1401274804},{"steamid":"76561198011593392","relationship":"friend","friend_since":1551454004},{"steamid":"76561198017068250","relationship":"friend","friend_since":1456168382},{"steamid":"76561198036118525","relationship":"friend","friend_since":1394392809},{"steamid":"76561198038501532","relationship":"friend","friend_since":1394396986},{"steamid":"76561198053250556","relationship":"friend","friend_since":1617043740},{"steamid":"76561198113162927","relationship":"friend","friend_since":1403461061},{"steamid":"76561198170826159","relationship":"friend","friend_since":1419784457},{"steamid":"76561198297302899","relationship":"friend","friend_since":1460301328},{"steamid":"76561198983798096","relationship":"friend","friend_since":1643480286}]}};
                                                 

//classes:

class User {
    constructor(steamID){
        this.name = "Test"; //fetchGetName
        this.steamID = steamID;
        this.online = false; //fetchStatus
        this.ownedGames = [0]; //fetchOwnedGames
        this.friendsListInput = [] //fetchFriendlist
        this.friendsListIDs = []; 
        this.friendsListObjects = [];
        this.savedID= false;
        this.adHocGroup=false;
        
    }
    
}

class Game {
    constructor(appid){
        this.appid = appid;
    }
}
    
//variables:
// frontend
let mySIDButton = document.getElementById("my-steamid-button");
let myHeading = document.querySelector("reqreturn");
let mySID = document.getElementById("my-steam-ID");
    
// backend
const actingUser = new User();
let i = 0;
let n = 0;
let clickedFriend=10;
let adHocCounter=0;



//functions: 
//main function, set Steam ID, fetch information from Steam Web API
function routineActingUser(mySteamID){
    let myID = +mySteamID;

        actingUser.steamID=myID;
        actingUser.friendsListInput=myFriendslist.friendslist.friends;
        //formInputToUsers(actingUser.friendsListInput)
        buildFriendsList();
    myHeading.textContent = `Angemeldet mit Steam-ID: ${mySteamID}`;

}

// build the frontend friendlist from the friendlist (not jet user-centered but input-centered)
function buildFriendsList(){
    console.log("Die Friendslist ist "+actingUser.friendsListInput.length+" Freunde lang.");
    const lengthFl= actingUser.friendsListInput.length-1;
    if(lengthFl > 0) {
        document.getElementById("friendlist").innerHTML="Es sind Freunde online:";
        let i = 0;
        while (i <= lengthFl) {
            let id = "friend"+i;
            console.log(id);
            let friendToAdd = new User(actingUser.friendsListInput[i].steamid);
            console.log(friendToAdd.steamID);
            actingUser.friendsListObjects.push(friendToAdd);
            if (i < 10){
                document.getElementById(id).innerHTML= (""+actingUser.friendsListInput[i].steamid+" ist online");
                i++;
            }
            else{
                document.getElementById("moreFriends").innerHTML=("Es sind mehr als 10 Freunde online!");
            i++;
            }
        }
    }
}

function reloadAdHocStatus(){
    document.getElementById("adHocCounter").innerHTML=adHocCounter;
}

function addToAdHocGroup(clickedFriend){
    if (actingUser.friendsListObjects[clickedFriend].adHocGroup == true){
            actingUser.friendsListObjects[clickedFriend].adHocGroup = false;
            console.log("Changed adHocGroup for Friend "+clickedFriend+" to false.");
            document.getElementById("friend"+clickedFriend).style.background="#c5c3c0";
            document.getElementById("friend"+clickedFriend).style.color="black";
        //start routine to reload the tables
        //reload counterFriends
            adHocCounter--;
            reloadAdHocStatus();
        }
    else{
        actingUser.friendsListObjects[clickedFriend].adHocGroup=true;
        console.log("Changed adHocGroup for Friend "+clickedFriend+" to true.");
        document.getElementById("friend"+clickedFriend).style.background="#925026";
        document.getElementById("friend"+clickedFriend).style.color="white";
        //start routine to reload the tables
        //reload counterFriends
        adHocCounter++; 
        reloadAdHocStatus();
        
        }   
    
}


/*
function friendsCounter(){
    actingUser.friendsListObjects.forEach(g)
}
getAdHocStatus(i){
    actingUser.friendsListObjects[i].adHocGroup==true:
}
*/


//function to set the Users Steam ID and save it as "name" in local storage
function getAndSaveUserID() {
    const myIDstring = prompt("Bitte geben Sie Ihre Steam-ID ein:");
    localStorage.setItem("savedIDstring", myIDstring);
    routineActingUser(myIDstring);  
	//getUserSID(localStorage.getItem("name")); 
}

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



//events
    
mySIDButton.onclick = () => {
    getAndSaveUserID();
    alert("User-ID geändert!")
    mySID.textContent = "Willkommen, "+actingUser.name;
var response;
};



//script 
  
//request to save a Steam ID if there is non in local storage

if (!localStorage.getItem("savedIDstring")) {
    mySID.textContent = "Nicht angemeldet!";
    myHeading.textContent = "";
} else {
    const storedIDstring = localStorage.getItem("savedIDstring");
    routineActingUser(storedIDstring);
    actingUser.savedID = true;
    mySID.textContent = "Willkommen zurück, "+actingUser.name;
}


let FLl=actingUser.friendsListObjects.length;
console.log(FLl);
const lengthFl= FLl-1;
if(lengthFl > 0) {
	document.getElementById("friendlist").innerHTML="Es sind Freunde online:";
	let i = 0;
	while (i <= lengthFl) {
		let id = "Test"+i;
		//console.log(id);
		document.getElementById(id).innerHTML= "Freund Nr. "+(i+1)+": SteamID: "+objFL.friends[i].steamid;
		i++;
	}
}





//Excess functions

function getUserName(userProfile) {
    console.log("function started");
    return userProfile.myName

}

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
/*
const steamnews =
const objSN = JSON.parse(steamnews);

console.log(objSN.appnews.appid);
*/

//Friendslist:
{
// TODO: Zeitlich gesetzte neue Abfrage welche Freunde online sind?

    
let lengthFL=myFriendslist.friendslist.friends.length;
//console.log(FLl);

//myFriendslist.friendslist.friends.forEach()


}
console.log("Script durchgelaufen!");




/*
//function to build User-Object from steam IDs
function buildFriendsListObjects (user){
    while (i < n){
        user.friendsListObjects[i] = new User(user.friendsListIDs[i]);
        console.log("Neuer User angelegt, Nr.: "+i);
        i++
    }
}*/
console.log("Script durchgelaufen!");