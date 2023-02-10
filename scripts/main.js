//TODO:     Friendslist nur Online-Friends
//lowTODO:     Home ausblenden in LocalStorage
//TODO:     Chatfunktion in node.js, websockets? Gibts da ein NPM Package? Anhand der Steam-ID eine Sitzung erstellen, die dann geteilt werden kann?
//TODO:     Share-Button in Friendslist einbauen
//TODO:     Icons der Spiele in Tabelle einfügen



//classes:
    class User {
        constructor(steamID){
            this.name = "tbs"; 
            this.steamID = steamID;
            //this.online = false; //TODO: incorporate online status
            this.ownedGames = [0]; 
            this.friendsListObjects = [];
            this.savedID= false;
            this.adHocGroup=false;
        }            
    }


// variables
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
    var lengthFL = 0;



//functions: 
//main function, set Steam ID, fetch information from Steam Web API
    function routineActingUser(mySteamID){
        
        actingUser.steamID = mySteamID;
        //start the three core functions to get data
        fillUserStats(mySteamID, actingUser);
        fillFriendList(mySteamID, actingUser);
        fillOwnedGames(mySteamID, actingUser);
        
        console.log("fill-Sachen durchgelaufen.")
        console.log("1. Die Länge der Freundesliste ist: "+lengthFL);
        
        //start building the games list
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
        let myIDstring = prompt("Bitte geben Sie Ihre Steam-ID ein:", "76561198101457809");
            //Check, if the input is a number
            let myIDnumber = parseFloat(myIDstring);
            let numberCheck = Number.isInteger(myIDnumber);
            while (numberCheck == false){
            myIDstring = prompt("Bitte geben Sie NUR Zahlen ein. Ihre Steam-ID besteht ausschließlich aus Zahlen.")
            myIDnumber = Number(myIDstring);
            numberCheck = Number.isInteger(myIDnumber);
        }
        localStorage.setItem("savedIDstring", myIDstring);
        alert("User-ID geändert!")
        
        //start the core routine to get data etc.
        routineActingUser(myIDstring);  
    }


//start the request-function and fill the received informations into the user objects
    function fillUserStats(steamID, user){
        getPlayerSummary(steamID).then(({response}) => {
            const players = response.players;
            user.name = players[0].personaname;
            user.lastlogoff = players[0].lastlogoff;
            user.name = players[0].personaname;
            user.avatar = players[0].avatarfull;
            }); //just copy selected data to the object
        console.log("Fill UserStats finished")
    }
    

//start the request-function and fill the received informations into the actingUser object
    function fillOwnedGames(steamID, user){
        getOwnedGames(steamID).then(({response}) => {
            const games = response.games;
            console.log(games);
            user.ownedGames = games;
            }); //get the games list response and copy it to the user-objects own games list
        console.log("Fill OwnedGames finished")
    }

//start the request-function and fill the received informations into the users objects
    function fillFriendList(steamID, user) {
        getFriendList(steamID).then(({ friendslist }) => {
            const { friends } = friendslist;
            user.friends = friends;
            }); //get friends information an copy it to the user-object own friends list
        console.log("Fill Friends List finished")
    }


// Functions about the Friends list creation
// build the frontend friendlist from the friendlist (not yet user-centered but input-centered)
    function buildFriendsList(){
        lengthFL = (actingUser.friends.length)-1;
        actingUser.friendsListObjects = [];
        if(lengthFL > 0) {
            let i = 0;
            while (i <= lengthFL) {
                let id = "friend"+i;
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

//function to refresh the Friendslist after changes
    function restartFL(){
        lengthFL = (actingUser.friendsListObjects.length)-1;
        document.getElementById("friendlist").innerHTML="Es sind "+(lengthFL+1)+" Freunde online:";
        document.getElementById("adHocCounter").style.visibility="visible";
        document.getElementById("deleteSteamID").style.visibility="visible";
        let i = 0;
        
        //for every friend-object in the acting user friends list there will be build a corresponding html item
        while (i <= lengthFL){
            console.log("Starting to build friendslist");
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



//request, if a Steam-ID is saved in local storage
//Abfrage, ob eine Steam-ID im localStorage ist und ein paar Darstellungsänderungen
    if (!localStorage.getItem("savedIDstring")) {
        mySID.textContent = "Nicht angemeldet!";
        userHeading.textContent = "";
    } 
    else {
        const storedIDstring = localStorage.getItem("savedIDstring");
        routineActingUser(storedIDstring);
        actingUser.savedID = true;
//        mySID.textContent = "Willkommen zurück, "+actingUser.name;
        newSIDButton.textContent = "Gespeicherte Steam-ID ändern";
    }


// delete the saved Steam-ID
    function deleteSteamIDfromLocalStorage(){
        localStorage.removeItem("savedIDstring");
        window.location.reload();
        alert("Steam-ID gelöscht!");
        }



// Functions for the AdHoc-Group
// set the AdHoc-attribute of every friend to false and change back the styling
    function eraseAdHocGroup(){
        actingUser.friendsListObjects.forEach((element) => {element.adHocGroup = false});
        adHocCounter = 0;
        i = 0;
        while (i < actingUser.friendsListObjects.length){
            document.getElementById("friend"+i).style.background="#c5c3c0";
            document.getElementById("friend"+i).style.color="black";
            i++
        }
        document.getElementById("deleteAdHocGroup").style.visibility="hidden";
        reloadAdHocStatus();
    }

// reload the number of friends in AdHoc-Group
    function reloadAdHocStatus(){
        document.getElementById("adHocCounter").innerHTML=adHocCounter;
        document.getElementById("deleteAdHocGroup").style.visibility="visible";
        buildGamesList();
        }

// add friend to AdHoc-Group by clicking on his Name
    function addToAdHocGroup(clickedFriend){
        if (actingUser.friendsListObjects[clickedFriend].adHocGroup == true){
            actingUser.friendsListObjects[clickedFriend].adHocGroup = false;
            document.getElementById("friend"+clickedFriend).style.background="#c5c3c0";
            document.getElementById("friend"+clickedFriend).style.color="black";
            //start routine to reload the tables
            //reload counterFriends
            adHocCounter--;
            reloadAdHocStatus();
            }
        else {
            actingUser.friendsListObjects[clickedFriend].adHocGroup=true;
            document.getElementById("friend"+clickedFriend).style.background="#577e87";
            document.getElementById("friend"+clickedFriend).style.color="white";
            //start routine to reload the tables
            //reload counterFriends
            adHocCounter++; 
            reloadAdHocStatus();
        }
    }



// Functions for the welcoming "Home"-text
// function to hide the "home"-text 
    function hideHomeText(){
        document.getElementById("home").style.display="none";
        localStorage.setItem("homeHidden", true);
        document.getElementById("homeButton").style.display="block";
    }

// function to show the "home"-text 
    function showHomeText(){
        document.getElementById("home").style.display="";
        document.getElementById("homeButton").style.display="none";
    }



// Functions to request informations from the wcwp-server 
// function to request information on player from the wcwp-server
    async function getPlayerSummary(reqsid1) {
        const response = await fetch(`http://157.245.17.114:3000/player_summaries/${reqsid1}`);
        const data = await response.json();
        return data;
    }

// function to request information on friends from the wcwp-server
    async function getFriendList(reqsid2) {
        const response = await fetch(`http://157.245.17.114:3000/friend_list/${reqsid2}`);
        const data = await response.json();
        return data;
    }

// function to request information on games from the wcwp-server
    async function getOwnedGames(reqsid3) {
        const response = await fetch(`http://157.245.17.114:3000/owned_games/${reqsid3}`);
        const data = await response.json();
        return data;
    }



// Other Functions
// function to set a sleep-timer
    function sleep(ms){
                return new Promise(resolve => setTimeout(resolve, ms));
            }


//loading with a counter, including a sleep timer, waiting for requests of friends info to be fulfilled 
//TODO: Add an animated loading bar
    async function loadingAnimationFreunde() {
        let i = 0;
        while (i < 100) {
            document.getElementById("friendlist").innerHTML="Freunde werden geladen: "+i+" %";
            i++;
            await sleep(35);
        }
        restartFL();
        console.log("Loading friends done");
    }

//loading with a counter, including a sleep timer, waiting for requests of games information to be fulfilled 
//TODO: Add an animated loading bar
    async function loadingAnimationSpiele() {
        let i = 0;
        while (i < 100) {
            document.getElementById("platzhalterLadebalken").innerHTML="Spiele werden geladen: "+i+" %";
            i++;
            await sleep(35);
        }
        document.getElementById("platzhalterLadebalken").innerHTML="";
        buildGamesList();
        console.log("Loading games done");
}


console.log("Ende des main-Skripts");