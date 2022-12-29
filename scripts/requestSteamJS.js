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



// https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=9DE0CBEBE65E780B49D58853EA3CAA15&steamids=76561197966953159+76561197969067270+76561197979247125+76561197984913701+76561198011593392+76561198017068250+76561198036118525+76561198038501532+76561198053250556+76561198113162927+76561198170826159+76561198297302899+76561198983798096