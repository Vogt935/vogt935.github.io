let drin1= "";
let drin2= "";
let drin3= "";

let raus1= "";
counter = 0;
turnoverCounter=0;





function reshuffle(){
    
    if (drin1 == ""){
        alert("Bitte Namen eingeben und bestätigen!");
    }
    
    else{
        
        document.getElementById("box-Mitspieler").style.display="block";
        document.getElementById("box-Counter").style.display="block";
        
        let wechselkandidat1;
        let wechselkandidat2;

        
        wechselkandidat1 = raus1;
        raus1 = drin3;
        drin3 = drin2;
        drin2 = drin1;
        drin1 = wechselkandidat1;

        
        counter= counter+1;
        if (counter % 4 ==0 ){
            turnoverCounter++;
        }
        document.getElementById("counter").textContent=counter;
        document.getElementById("turnoverCounter").textContent=turnoverCounter;

        document.getElementById("drin1").textContent=drin1;
        document.getElementById("drin2").textContent=drin2;
        document.getElementById("drin3").textContent=drin3;
        document.getElementById("raus1").textContent=raus1;

    }
}

function teamInput(){
    
    document.getElementById("box-Mitspieler").style.display="none";
    document.getElementById("box-Counter").style.display="none";
    drin1= document.getElementById("n1").value;
    drin2= document.getElementById("n2").value;
    drin3= document.getElementById("n3").value;
    raus1= document.getElementById("n4").value;


    counter = 0;
    turnoverCounter = 0;
    alert("Namen bestätigt!");
}