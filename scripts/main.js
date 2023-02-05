//ÜberTODO: Import JSON; Get Game Infos; Show it all; 


//TODO:     Friendslist nur Online-Friends
//TODO:     Bug: Wenn man die Steam-ID löscht, auch die Freundesliste löschen!!!
//lowTODO:     Home ausblenden in LocalStorage
//lateTODO:     Chatfunktion in node.js, websockets? Gibts da ein NPM Package? Anhand der Steam-ID eine Sitzung erstellen, die dann geteilt werden kann?
//lateTODO:     Share-Button in Friendslist einbauen
//lateTODO:     Icons der besessenen Spiele in Tabelle einfügen usw.




//classes:
    class User {
        constructor(steamID){
            this.name = "Test"; //fetchGetName
            this.steamID = steamID;
            //this.online = false; //fetchStatus
            this.ownedGames = [0]; //fetchOwnedGames
            //this.friendsListInput = [] //fetchFriendlist
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
   // const webApiKey = "9DE0CBEBE65E780B49D58853EA3CAA15";
    const actingUser = new User();

    var apiResponse;


       


    
    

    let i = 0;
    let n = 0;
    let clickedFriend=10;
    let adHocCounter=0;
    var lengthFL = 0;



//functions: 
//main function, set Steam ID, fetch information from Steam Web API
    function routineActingUser(mySteamID){
        
        var apiResponse;
        actingUser.steamID = mySteamID;
        fillUserStats(mySteamID, actingUser);

        fillFriendList(mySteamID, actingUser);
        
        
        fillOwnedGames(mySteamID, actingUser);
        console.log("fill-Sachen durchgelaufen.")
                console.log("1. Die Länge der Freundesliste ist: "+lengthFL);
        // actingUser.steamID=myID;
        //  actingUser.friendsListInput=myFriendslist.friendslist.friends;
        //formInputToUsers(actingUser.friendsListInput)
        
        buildFriendsList();
        loadingAnimationFreunde();        
        
        document.getElementById("userHeading").textContent = `Angemeldet mit Steam-ID: ${mySteamID}`;
        if (localStorage.getItem("homeHidden") == true) {
                homeText[0].innerHTML="";
        }
        loadingAnimationSpiele();
        
        
 document.getElementById("absatzListe").style.display="inline";
    }

//function to set the Users Steam ID and save it as "name" in local storage
function getAndSaveUserID() {
    console.log("get input!");
    let myIDstring = prompt("Bitte geben Sie Ihre Steam-ID ein:", "76561198101457809");
    console.log("got input!");
            
        //Check, ob die Zahl in Ordnung ist
            let myIDnumber = parseFloat(myIDstring);
            console.log("myIDnumber ist vom Typ:"); console.log(typeof myIDnumber); console.log(myIDstring); console.log(myIDnumber);
            let numberCheck = Number.isInteger(myIDnumber);
            while (numberCheck == false){
            myIDstring = prompt("Bitte geben Sie NUR Zahlen ein. Ihre Steam-ID besteht ausschließlich aus Zahlen.")
            console.log(myIDstring);
            console.log("try to change MyIDNUMBER")
            myIDnumber = Number(myIDstring);
            console.log(myIDnumber);
            console.log("Neue Eingabe myIDnumber"); console.log(typeof myIDnumber)
            numberCheck = Number.isInteger(myIDnumber);

    }
        
    localStorage.setItem("savedIDstring", myIDstring);
    routineActingUser(myIDstring);  

    
}


//Abfrage der Daten von Steam-Web-API

function fillUserStats(steamID, user){
    getPlayerSummary(steamID).then(({response}) => {
    const players = response.players;
    user.name = players[0].personaname;
    user.lastlogoff = players[0].lastlogoff;
    user.name = players[0].personaname;
    user.avatar = players[0].avatarfull;
});
        console.log("Fill UserStats fertig")
}
    

function fillOwnedGames(steamID, user){
    getOwnedGames(steamID).then(({response}) => {
        const games = response.games;
        console.log(games);
        user.ownedGames = games;
    });
        console.log("Fill OwnedGames fertig")
}


function fillFriendList(steamID, user) {
  getFriendList(steamID).then(({ friendslist }) => {
    const { friends } = friendslist;
    user.friends = friends;
  });
    console.log("Fill Friends List fertig")
}



// build the frontend friendlist from the friendlist (not yet user-centered but input-centered)
function buildFriendsList(){
        lengthFL = (actingUser.friends.length)-1;
        
        console.log("Die länge der Freundesliste ist: "+lengthFL);
        actingUser.friendsListObjects = [];

        if(lengthFL > 0) {


            let i = 0;
            while (i <= lengthFL) {
                let id = "friend"+i;

                console.log(id);
                let friendToAdd = new User(actingUser.friends[i].steamid);
                fillUserStats(friendToAdd.steamID, friendToAdd);
                fillOwnedGames(friendToAdd.steamID, friendToAdd); 
                actingUser.friendsListObjects.push(friendToAdd);
                console.log("Freund hinzugefügt: "+friendToAdd.name);
                
                let friendEntry = document.createElement("p");
                    friendEntry.classList.add("friendEntry");
                    friendEntry.id="entryFriend"+i;

                 document.getElementById("friendslist").appendChild(friendEntry);
                
                
                i++;
                } 
        } 
}

function restartFL(){
    lengthFL = (actingUser.friendsListObjects.length)-1;
    document.getElementById("friendlist").innerHTML="Es sind "+(lengthFL+1)+" Freunde online:";
    document.getElementById("adHocCounter").style.visibility="visible";
    document.getElementById("deleteSteamID").style.visibility="visible";
            
    let i = 0;
                            console.log("i ist wieder: "+i);
            while (i <= lengthFL){
                console.log("start der erstellung");

                            
                var id = "entryFriend"+i;
                let friendEntry = document.getElementById(id);
                
                let avatar = document.createElement("img");
                    avatar.src = actingUser.friendsListObjects[i].avatar;
                    avatar.classList.add("friendsPic");
                    friendEntry.appendChild(avatar);
                    
                let friendButton = document.createElement("button");
                    friendButton.innerHTML= (""+actingUser.friendsListObjects[i].name+" ");
                    friendButton.classList.add("flButton");
                    friendButton.id="friend"+i;
                    let n = ""+i;
                    friendButton.onclick=function(){addToAdHocGroup(n)};
                    friendEntry.appendChild(friendButton);
                                      

                let link = document.createElement('chatLink');
                    link.innerHTML='<a href="steam://friends/message/'+actingUser.friendsListObjects[i].steamID+'"><button class="chatButton" > <i class="fa-regular fa-message"></i> </button></a>';
                    friendEntry.appendChild(link);       

                i++;
}
}




/*

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

*/









//request to save a Steam ID if there is non in local storage



//Abfrage, ob eine Steam-ID im localStorage ist und ein paar Darstellungsänderungen
    if (!localStorage.getItem("savedIDstring")) {
        mySID.textContent = "Nicht angemeldet!";
        userHeading.textContent = "";
    } else {
        const storedIDstring = localStorage.getItem("savedIDstring");
        routineActingUser(storedIDstring);
        actingUser.savedID = true;
//        mySID.textContent = "Willkommen zurück, "+actingUser.name;
        newSIDButton.textContent = "Gespeicherte Steam-ID ändern";
    }

/*
//Erstellung der Friendslist
    const lengthFl= actingUser.friends.length-1;
    if(lengthFl > 0) {
        document.getElementById("friendlist").innerHTML="Es sind "+actingUser.friendsListObjects.length+" Freunde online:";
    }
*/

//onclick function for starting a chat with friends

    function startChatWithThisID(id){
        re
    }


// delete the saved Steam-ID
    function deleteSteamIDfromLocalStorage(){
        localStorage.removeItem("savedIDstring");
        window.location.reload();
        alert("Steam-ID gelöscht!");
        
}



    function eraseAdHocGroup(){
        actingUser.friendsListObjects.forEach((element) => {element.adHocGroup = false});
        adHocCounter = 0;
        document.getElementsByClassName("flButton").style.background-color="#c5c3c0";
        buildGamesList();
        document.getElementById("deleteAdHocGroup").style.visibility="hidden";
    
    }


//reload the number of friends in AdHoc-Group
    function reloadAdHocStatus(){
        document.getElementById("adHocCounter").innerHTML=adHocCounter;
        document.getElementById("deleteAdHocGroup").style.visibility="visible";
        buildGamesList();
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
        }
    }


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



function sleep(ms){
            return new Promise(resolve => setTimeout(resolve, ms));
        }


async function loadingAnimationFreunde() {
  let i = 0;
  while (i < 100) {
    //console.log("Loading: " + i + "%");
    document.getElementById("friendlist").innerHTML="Freunde werden geladen: "+i+" %";
    i++;
    await sleep(35);
      
  }
    restartFL();
  
  console.log("Done");
}

async function loadingAnimationSpiele() {
  let i = 0;
  while (i < 100) {
    //console.log("Loading: " + i + "%");
    document.getElementById("platzhalterLadebalken").innerHTML="Spiele werden geladen: "+i+" %";
    i++;
    await sleep(35);
      
  }
    document.getElementById("platzhalterLadebalken").innerHTML="";
    buildGamesList();

  
  console.log("Done");
}

//Folgendes ist probably useless:


/*
Das Friendpic mit Playtime-Nummer, was in index.html lag:

           <friendPic>
            <img class="friendsPic" src="https://avatars.akamai.steamstatic.com/08b4b85ea46ed3ee30726e87a3ef787194c9dcbd_medium.jpg" >
            <playtimeNumber>12345</playtimeNumber>
        </friendPic>
            </home>



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

async function getPlayerSummary(reqsid1) {
  const response = await fetch(`http://157.245.17.114:3000/player_summaries/${reqsid1}`);
  const data = await response.json();
  return data;
}

getPlayerSummary(actingUser.steamID).then(response => {
  console.log(response.response.players);
});
    

async function getFriendList(reqsid2) {
  const response = await fetch(`http://157.245.17.114:3000/friend_list/${reqsid2}`);
  const data = await response.json();
  return data;
}

async function getOwnedGames(reqsid3) {
  const response = await fetch(`http://157.245.17.114:3000/owned_games/${reqsid3}`);
  const data = await response.json();
  return data;
}


console.log("Ende des Skripts");

getPlayerSummary(actingUser.steamID).then(response => {
  console.log(response.response.players);
});


getPlayerSummary(actingUser.friendsListObjects[0].steamID).then(response => {
  console.log(response.response.players);
});
getPlayerSummary(actingUser.friendsListObjects[3].steamID).then(response => {
  console.log(response.response.players);
});
