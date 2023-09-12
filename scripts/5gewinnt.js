let drin1= "";
let drin2= "";
let drin3= "";

let raus1= "";
let raus2= "";
counter = 0;
turnoverCounter=0;





function reshuffle(){
    
    if (drin1 == ""){
        alert("Bitte Namen eingeben und bestätigen!");
    }
    
    else{
        
        let testBoxVisibilty= document.getElementsByClassName("box-Mitspieler");
        if(testBoxVisibilt.hasAttribute(visibility="hidden")== true){
            testBoxVisibilty.setAttribute(visibility="visible")
        }
        
        

        let wechselkandidat1;
        let wechselkandidat2;
        
        wechselkandidat1 = raus1;
        wechselkandidat2 = raus2;
        raus1 = drin2;
        raus2 = drin3;
        
        drin3 = drin1;
        drin1 = wechselkandidat1;
        drin2 = wechselkandidat2;
        
        counter= counter+1;
        if (counter % 5 ==0 ){
            turnoverCounter++;
        }
        document.getElementById("counter").textContent=counter;
        document.getElementById("turnoverCounter").textContent=turnoverCounter;

        document.getElementById("drin1").textContent=drin1;
        document.getElementById("drin2").textContent=drin2;
        document.getElementById("drin3").textContent=drin3;
        document.getElementById("raus1").textContent=raus1;
        document.getElementById("raus2").textContent=raus2;
    }
}

function teamInput(){
    
    drin1= document.getElementById("n1").value;
    drin2= document.getElementById("n2").value;
    drin3= document.getElementById("n3").value;
    raus1= document.getElementById("n4").value;
    raus2= document.getElementById("n5").value;

    counter = 0;
    turnoverCounter = 0;
    alert("Namen bestätigt!");
}