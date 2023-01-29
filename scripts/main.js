//ÜberTODO: Import JSON; Get Game Infos; Show it all; 

//highTODO: node.js einrichten
//highTODO: Die Abfragen "scharf schalten"
//TODO:     Friendslist nur Online-Friends
//TODO:     Zeitlich gesetzte neue Abfrage welche Freunde online sind? Krücke über aktulisierungsbutton, Toast wenn neuer Freund dazu kommt?
//TODO:     Bug: Wenn man die Steam-ID löscht, auch die Freundesliste löschen!!!
//TODO:     Bug: Gaming-Zeiten in Std. 

//lowTODO:     Home ausblenden in LocalStorage

//lateTODO:     Chatfunktion in node.js, websockets? Gibts da ein NPM Package? Anhand der Steam-ID eine Sitzung erstellen, die dann geteilt werden kann?
//lateTODO:     Share-Button in Friendslist einbauen
//lateTODO:     Icons der besessenen Spiele in Tabelle einfügen usw.




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



//functions: 
//main function, set Steam ID, fetch information from Steam Web API
    function routineActingUser(mySteamID){
        let myID = +mySteamID;

            actingUser.steamID=myID;
            actingUser.friendsListInput=myFriendslist.friendslist.friends;
            //formInputToUsers(actingUser.friendsListInput)
            buildFriendsList();
        document.getElementById("userHeading").textContent = `Angemeldet mit Steam-ID: ${mySteamID}`;
        if (localStorage.getItem("homeHidden") == true) {
                homeText[0].innerHTML="";
        }
        buildGamesList();
        document.getElementById("absatzListe").style.display="inline";
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
    console.log("get input!");
    let myIDstring = prompt("Bitte geben Sie Ihre Steam-ID ein:");
    console.log("got input!");
    let myIDnumber = Number(myIDstring);
    console.log("myIDnumber ist vom Typ:"); console.log(typeof myIDnumber)
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

                if (i < 25){
                    let friendEntry = document.createElement("p");
                    friendEntry.classList.add("friendEntry");
                    
                    let avatar = document.createElement("img");
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
                                                         
                    document.getElementById("friendslist").appendChild(friendEntry);
                    
                    
                     i++;

                }
                
                else{
                    const element = document.getElementById("moreFriends");
                    element.style.visibility="visible";
                    document.getElementById("moreFriends").innerHTML=("Es sind mehr als 25 Freunde online!");
                i++;
                } } }
        else{
            document.getElementById("friendslist").innerHTML="Es sind keine Freunde online.";
        }}

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

