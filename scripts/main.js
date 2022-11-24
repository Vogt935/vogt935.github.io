let mySIDButton = document.getElementById("my-steamid-button");
let myHeading = document.querySelector("reqreturn");
let mySID = document.getElementById("my-steam-ID");
let fetchButton = document.getElementById("my-fetch-button");

let friendlist;





fetchButton.onclick = () => {
fetch("friends.json", {mode: "no-cors"})
.then(response => {response.json();})
.then(json => console.log(json));


console.log("finished");
}


//Steam ID of the websites user

// Change saved User Steam ID 
mySIDButton.onclick = () => {
  setUserName();

var response;



};


//function to set the Users Steam ID and save it as "name" in local storage
function setUserName() {
  const myName = prompt("Bitte geben Sie Ihre Steam-ID ein:");
  localStorage.setItem("name", myName);
  myHeading.textContent = `Angemeldet mit Steam-ID: ${myName}`;
  mySID.textContent = "Willkommen zurück, Fabs3953";

	getUserSID(localStorage.getItem("name"));

}

//request to save a Steam ID if there is non in local storage
if (!localStorage.getItem("name")) {
  mySID.textContent = "Nicht angemeldet!";
  myHeading.textContent = "";
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Angemeldet mit Steam-ID: ${storedName}`;
  mySID.textContent = "Willkommen zurück, Fabs3953";
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









