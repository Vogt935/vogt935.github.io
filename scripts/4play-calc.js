var player1 ={name: "Spieler 1", value: 0, id: "player1"};
var player2 ={name: "Spieler 2", value: 0, id: "player2"};
var player3 ={name: "Spieler 3", value: 0, id: "player3"};
var player4 ={name: "Spieler 4", value: 0, id: "player4"};



function teamInput(){
    
    player1.name= document.getElementById("n1").value;
    player2.name= document.getElementById("n2").value;
    player3.name= document.getElementById("n3").value;
    player4.name= document.getElementById("n4").value;
    document.getElementById("player1").innerHTML = player1.name+"   "+player1.value;
    document.getElementById("player2").innerHTML = player2.name+"   "+player2.value;
    document.getElementById("player3").innerHTML = player3.name+"   "+player3.value;
    document.getElementById("player4").innerHTML = player4.name+"   "+player4.value;
    document.getElementById("4pBox").style.display="block"; 
}


function addValue(player){
    player.value++;
    
    document.getElementById(player.id).innerHTML = player.name+"   "+player.value;
}

function nullen(){
    player1.value=0;
    player2.value=0;
    player3.value=0;
    player4.value=0;
    document.getElementById("player1").innerHTML = player1.name+"   "+player1.value;
    document.getElementById("player2").innerHTML = player2.name+"   "+player2.value;
    document.getElementById("player3").innerHTML = player3.name+"   "+player3.value;
    document.getElementById("player4").innerHTML = player4.name+"   "+player4.value;

}


function reset(){
    player1.value=0;
    player2.value=0;
    player3.value=0;
    player4.value=0;
    ausblenden();
}


function ausblenden(){
    document.getElementById("4pBox").style.display="none";
    console.log("ausgeblendet");
}
//ausblenden();