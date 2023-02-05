//ÜberTODO: Get Game Infos; Show it all; 


//TODO:     Friendslist nur Online-Friends
//TODO:     Zeitlich gesetzte neue Abfrage welche Freunde online sind? Krücke über aktulisierungsbutton, Toast wenn neuer Freund dazu kommt?
//TODO:     Bug: Gaming-Zeiten in Std. 

//lowTODO:     Home ausblenden in LocalStorage

//lateTODO:     Chatfunktion in node.js, websockets? Gibts da ein NPM Package? Anhand der Steam-ID eine Sitzung erstellen, die dann geteilt werden kann?
//lateTODO:     Share-Button in Friendslist einbauen
//lateTODO:     Icons der besessenen Spiele in Tabelle einfügen usw.


//Kommentierung ist möglichst in Englisch gehalten

//classes:
    class User {
        constructor(steamID){
            this.name = "Test"; 
            this.steamID = steamID;
            //this.online = false; 
            this.ownedGames = [0]; 
            //this.friendsListInput = [] 
            this.friendsListObjects = [];
            this.savedID= false;
            this.adHocGroup=false;
            this.friends=[];
        }            
    }

    


//variables:
    let newSIDButton = document.getElementById("my-steamid-button");
    let mySID = document.getElementById("my-steam-ID");
    let userHeading =document.getElementById("userHeading");

    const actingUser = new User(); //Dieses JS-Objekt steht für den Nutzer, vor dem PC sitzt und sich anmeldet

    let i = 0;
    let n = 0;
    let clickedFriend=10;
    let adHocCounter=0;
    //var lengthFL = 0;




//functions: 
//main function, set Steam ID, fetch information from Steam Web API
    function routineActingUser(mySteamID){
        console.log(actingUser);
        console.log("Start routine");
        actingUser.steamID = mySteamID;
                console.log(actingUser);
        fillUserStats(mySteamID, actingUser);
                console.log(actingUser);
        fillFriendList(mySteamID, actingUser);
                console.log(actingUser);
        fillOwnedGames(mySteamID, actingUser);
                console.log(actingUser);
        console.log("fill-Sachen durchgelaufen.")
            loadingAnimationFreunde(80, 0, false);
                console.log(actingUser);


        sleep(6000);
        console.log("Warten rum?"+actingUser.friends.length)
        //lengthFL = actingUser.friends.length;
                    //console.log("1. Die Länge der Freundesliste ist: "+lengthFL);
        buildFriendsList();
        loadingAnimationFreunde(101, 80, true);

        document.getElementById("userHeading").textContent = `Angemeldet mit Steam-ID: ${mySteamID}`;
        if (localStorage.getItem("homeHidden") == true) {
                homeText[0].innerHTML="";
        }
        loadingAnimationSpiele(); //Erzeugt eine Zeitverzögerung, um der Abfrage Zeit zu geben
        
        
    document.getElementById("absatzListe").style.display="inline";
    }




// delete the saved Steam-ID
    function eraseSteamIDfromLocalStorage(){
        localStorage.removeItem("savedIDstring");
        window.location.reload();
        alert("Steam-ID gelöscht!");
        
}





//function to set the Users Steam ID and save it as "name" in local storage
    function getAndSaveUserID() {
        console.log("Erstmal alten Kram löschen!")
        eraseSteamIDfromLocalStorage();
        //console.log("get input!");
        let myIDstring = prompt("Bitte geben Sie Ihre Steam-ID ein:", "76561198101457809");
        //console.log("got input!");

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

console.log("Teilabschnitt 1 geladen");

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

console.log("Teilabschnitt 2 geladen");

// build the frontend friendlist from the friendlist (not yet user-centered but input-centered)
    function buildFriendsList(){
            //lengthFL = (actingUser.friends.length)-1;

            //console.log("Die länge der Freundesliste ist: "+lengthFL);
            actingUser.friendsListObjects = [];

            if((actingUser.friends.length -1) > 0) {
                let i = 0;
                while (i <= (actingUser.friends.length -1)) {
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
    //lengthFL = (actingUser.friendsListObjects.length-1);
    //document.getElementById("friendlist").innerHTML="Es sind "+(lengthFL+1)+" Freunde online:";
    document.getElementById("adHocCounter").style.visibility="visible";
    document.getElementById("deleteSteamID").style.visibility="visible"
            
    let i = 0;
            console.log("i ist wieder: "+i);
            while (i <= (actingUser.friendsListObjects.length-1)){
                console.log("start der erstellung");

                            
                var id = "entryFriend"+i;
                let friendEntry = document.getElementById(id);
                
                let atar = document.createElement("img");
                    avatar.src = actingUser.friendsListObjects[i].avatar;
                    avatar.classList.add("friendsPic");
                    friendEntry.appendChild(avatar);
                    
                let friendButton = document.createElement("button");
                    friendButton.innerHTML= (""+actingUser.friendsListObjects[i].name+" ist online");
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


console.log("Teilabschnitt 3 geladen");


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


    function restartFL(){
        //lengthFL = (actingUser.friendsListObjects.length)-1;
        //document.getElementById("friendlist").innerHTML="Es sind "+(lengthFL+1)+" Freunde online:";
        document.getElementById("adHocCounter").style.visibility="visible";
        document.getElementById("deleteSteamID").style.visibility="visible"

        let i = 0;
            while (i <= (actingUser.friendsListObjects.length)-1){
                    console.log("start der Erstellung der Freundesliste");

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

console.log("Teilabschnitt 2 geladen");
*/


//EN: request to save a Steam ID if there is non in local storage
//DE: Abfrage, ob eine Steam-ID im localStorage ist und ein paar Darstellungsänderungen
function start (){

    if (!localStorage.getItem("savedIDstring")) {
            userHeading.textContent = "";
        } else {
            const storedIDstring = localStorage.getItem("savedIDstring");
            routineActingUser(storedIDstring);
            actingUser.savedID = true;
    //        mySID.textContent = "Willkommen zurück, "+actingUser.name;
            newSIDButton.textContent = "Gespeicherte Steam-ID ändern";
        }
}




//reload the number of friends in AdHoc-Group
    function reloadAdHocStatus(){
        document.getElementById("adHocCounter").innerHTML=adHocCounter;
        }

//add friend to AdHoc-Group by clicking on his Name
    function addToAdHocGroup(clickedFriend){
        if (actingUser.friendsListObjects[clickedFriend].adHocGroup == true){
                actingUser.friendsListObjects[clickedFriend].adHocGroup = false; //console.log("Changed adHocGroup for Friend "+clickedFriend+" to false. Adhoc-group is "+(adHocCounter-1)+" friends.");
                document.getElementById("friend"+clickedFriend).style.background="#c5c3c0";
                document.getElementById("friend"+clickedFriend).style.color="black"; //start routine to reload the tables
                adHocCounter--; //reload counterFriends
                reloadAdHocStatus();
            }
        else{
                actingUser.friendsListObjects[clickedFriend].adHocGroup=true; //console.log("Changed adHocGroup for Friend "+clickedFriend+" to true. Adhoc-group is "+(adHocCounter+1)+" friends.");
                document.getElementById("friend"+clickedFriend).style.background="#577e87";
                document.getElementById("friend"+clickedFriend).style.color="white"; //start routine to reload the tables
                adHocCounter++; //reload counterFriends
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

console.log("Teilabschnitt 3 geladen");



//Sleep functions

    function sleep(ms){
                return new Promise(resolve => setTimeout(resolve, ms));
            }


    async function loadingAnimationFreunde(duration, start, reloadNeeded) {
        let j = start;
        while (j < duration) {
            console.log("Loading: " + j + "%");
            document.getElementById("friendlist").innerHTML="Freunde werden geladen: "+j+" %";
            await sleep(55);
            j++;
        }
        if (reloadNeeded == true){
            restartFL();
        }
        console.log("loading Animation done, duration: "+duration+", start: "+start);
    }

    async function loadingAnimationSpiele() {
        i= 0;
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

console.log("Teilabschnitt 4 geladen");

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


*/


//EN: Server-request-functions
//DE: Server-Abfrage-Funktionen
    async function getPlayerSummary(reqsid1) {
      const response = await fetch(`http://157.245.17.114:3000/player_summaries/${reqsid1}`);
      const data = await response.json();
      return data;
    }
   
   
   
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


/*
    getPlayerSummary(actingUser.steamID).then(response => {
    console.log(response.response.players);
    });

    getPlayerSummary(actingUser.steamID).then(response => {
      console.log(response.response.players);
    });


    getPlayerSummary(actingUser.friendsListObjects[0].steamID).then(response => {
      console.log(response.response.players);
    });
    getPlayerSummary(actingUser.friendsListObjects[3].steamID).then(response => {
      console.log(response.response.players);
    });
*/


console.log("Ende des Skripts");
