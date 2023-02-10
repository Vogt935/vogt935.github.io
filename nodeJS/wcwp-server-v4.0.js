// required npm modules
var cors = require('cors');
var request = require('request');
var express = require('express');
var app = express();
app.use(cors({origin: 'http://wcwp.de'}));


// first function, requests player information from the Steam Web-API
app.get('/player_summaries/:steamid', function (req, res) {
  var steamid = req.params.steamid;
  request(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=9DE0CBEBE65E780B49D58853EA3CAA15&steamids=${steamid}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});


// second function, requests friends information from the Steam Web-API
app.get('/friend_list/:steamid', function (req, res) {
  var steamid = req.params.steamid;
  request(`https://api.steampowered.com/ISteamUser/GetFriendList/v1/?key=9DE0CBEBE65E780B49D58853EA3CAA15&steamid=${steamid}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});


// third function, requests player information from the Steam Web-API
app.get('/owned_games/:steamid', function (req, res) {
  var steamid = req.params.steamid;
  request(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=9DE0CBEBE65E780B49D58853EA3CAA15&steamid=${steamid}&include_appinfo=1`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});


// the app is listening to port 3000, which will be used by the requests of the wcwp.de website
app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});
