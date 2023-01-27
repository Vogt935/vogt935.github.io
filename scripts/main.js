//ÜberTODO: Import JSON; Get Game Infos; Show it all;  

//TODO:     Friendslist nur Online
//TODO:     deleteSteamID programmieren
//ÜberTODO: Share-Funktion; Chat-Funktion

//easyTOOD: Die verschiedenen Webfunktionen als Buttons einbauen (Starte Chat, starte ... direkt von der Website!)
//TODO:     Share-Button in Friendslist einbauen
//TODO:     Chatfunktion in node.js, websockets? Gibts da ein NPM Package? Anhand der Steam-ID eine Sitzung erstellen, die dann geteilt werden kann?


//highTODO: node.js einrichten
//highTODO: Die Abfragen "scharf schalten"



//TODO:     Icons neben Benutzernamen
//TODO:     Zeitlich gesetzte neue Abfrage welche Freunde online sind? Krücke über aktulisierungsbutton, Toast wenn neuer             Freund dazu kommt?



//lowTODO:  Home ausblenden in LocalStorage?






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
        }            
    }

    class steamApp {
        constructor(appid){
            this.appid = appid;
        }
    }
    

//variables:
// frontend
    let newSIDButton = document.getElementById("my-steamid-button");
    let mySID = document.getElementById("my-steam-ID");
    let userHeading =document.getElementById("userHeading");

    
// backend
    const webApiKey = "9DE0CBEBE65E780B49D58853EA3CAA15";
    const actingUser = new User();
    
    let i = 0;
    let n = 0;
    let clickedFriend=10;
    let adHocCounter=0;
    let lengthFL=actingUser.friendsListObjects.length;


buildGamesList();
//functions: 
//main function, set Steam ID, fetch information from Steam Web API
    function routineActingUser(mySteamID){
        let myID = +mySteamID;

            actingUser.steamID=myID;
            actingUser.friendsListInput=myFriendslist.friendslist.friends;
            //formInputToUsers(actingUser.friendsListInput)
            buildFriendsList();
        document.getElementById("userHeading").textContent = `Angemeldet mit Steam-ID: ${mySteamID}`;
        if (localStorage.getItem("homeHidden") = true) {
                homeText[0].innerHTML="";
        }
    }

//Diese Funktion befüllt die Friends-Objekte mit Infos
    function fillUserData(searchedUser){
        let id = ""+searchedUser.steamID;
        let idResponse = friendsUserData.response.players.find(({steamid}) => steamid === id)
        searchedUser.name = idResponse.personaname;
        searchedUser.avatar = idResponse.avatarmedium;
        searchedUser.online = idResponse.profilestate;
        console.log("Tada!");
    }

//Alle Friendsobjekte werden befüllt
function userDataList(){
    actingUser.friendsListObjects.forEach(element => fillUserData(element));
}



//function to set the Users Steam ID and save it as "name" in local storage
function getAndSaveUserID() {
    const myIDstring = prompt("Bitte geben Sie Ihre Steam-ID ein:");
    localStorage.setItem("savedIDstring", myIDstring);
    routineActingUser(myIDstring);  
	//getUserSID(localStorage.getItem("name")); 
}


// build the frontend friendlist from the friendlist (not yet user-centered but input-centered)
    function buildFriendsList(){
        const lengthFl= actingUser.friendsListInput.length-1;
        console.log(lengthFl);
        if(lengthFl > 0) {
            document.getElementById("adHocCounter").style.visibility="visible";
            document.getElementById("deleteSteamID").style.visibility="visible"
            document.getElementById("friendlist").innerHTML="Es sind "+(lengthFl+1)+" Freunde online:";

            let i = 0;
            while (i <= lengthFl) {
                let id = "friend"+i;

                //console.log(id);
                let friendToAdd = new User(actingUser.friendsListInput[i].steamid);
                //console.log(friendToAdd.steamID);
                actingUser.friendsListObjects.push(friendToAdd);
                userDataList();

                if (i < 10){
                    const element = document.getElementById(id);
                    element.style.visibility="visible";
                    document.getElementById(id).innerHTML= (""+actingUser.friendsListObjects[i].name+" ist online");
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

// delete the saved Steam-ID
    function deleteSteamIDfromLocalStorage(){
        localStorage.removeItem("savedIDstring");
        window.location.reload();
        alert("Steam-ID gelöscht!");
        
}


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
        document.getElementById("home").style.display="none";
        localStorage.setItem("homeHidden", true);
       document.getElementById("homeButton").style.display="block";
        
        
        //document.getElementById("xHome").innerHTML="Home";

    }
    
    function showHomeText(){
        document.getElementById("home").style.display="";
        document.getElementById("homeButton").style.display="none";
    }


//eventhandling
    
    newSIDButton.onclick = () => {
        getAndSaveUserID();
        alert("User-ID geändert!")
        mySID.textContent = "Willkommen, "+actingUser.name;
    };





console.log("Script main durchgelaufen!");

      



//Folgendes ist probably useless:

//Access functions
    function getUserName(userProfile) {
        console.log("function started");
        return userProfile.Name
    }

//TO BE USED oder zu ersetzen:


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

