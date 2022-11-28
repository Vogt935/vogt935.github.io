let mySIDButton = document.getElementById("my-steamid-button");
let myHeading = document.querySelector("reqreturn");
let mySID = document.getElementById("my-steam-ID");
//let fetchButton = document.getElementById("my-fetch-button");

//Über-TODO: Import JSON; Get Game Infos; Show it all
//TODO: Akzeptanz und Verarbeitung von JSONs im Steam-Style, wie bekomme ich das hin?
//TODO: HTML/CSS: Darstellung Games-List, Darstellung Friendlist
//TODO: Funktionsbuttons umsetzen (Darstellung Liste, sortieren usw)



//Friendslist:
{
// TODO: Zeitlich gesetzte neue Abfrage welche Freunde online sind?
let fl ='{ "friends": [' +
	'{ "steamid":"76561197966953159" , "relationship":"friend" , "friend_since":1394392802 },' +
	'{ "steamid":"76561197969067270" , "relationship":"friend" , "friend_since":1452304416 } ,' +
		'{ "steamid":"76561197969067270" , "relationship":"friend" , "friend_since":1452304416 } ,' +
	'{ "steamid":"76561197979247125" , "relationship":"friend" , "friend_since":1620943081 } ]}';
const objFL = JSON.parse(fl);

let FLl=objFL.friends.length;
//console.log(FLl);
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
}



/*
const steamnews =
const objSN = JSON.parse(steamnews);

console.log(objSN.appnews.appid);
*/

//fetchButton.onclick = () => {}



//Steam ID of the websites user

// Change saved User Steam ID
{
mySIDButton.onclick = () => {
  setUserName();
  alert("User-ID geändert!")
var response;
};
}

//function to set the Users Steam ID and save it as "name" in local storage
function setUserName() {
  const myName = prompt("Bitte geben Sie Ihre Steam-ID ein:");
  localStorage.setItem("name", myName);
  myHeading.textContent = `Angemeldet mit Steam-ID: ${myName}`;
  mySID.textContent = "Willkommen zurück, Fabs3953";

	getUserSID(localStorage.getItem("name"));

}

//request to save a Steam ID if there is non in local storage
{
if (!localStorage.getItem("name")) {
  mySID.textContent = "Nicht angemeldet!";
  myHeading.textContent = "";
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Angemeldet mit Steam-ID: ${storedName}`;
  mySID.textContent = "Willkommen zurück, Fabs3953";
}
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
