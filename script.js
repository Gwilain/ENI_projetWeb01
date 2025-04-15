window.onload = init;

function init(){
    document.getElementById("burger").addEventListener("click", showNavMobile);

    let tlist = document.getElementById("Tlist");
    let tCarte = document.getElementById("TCarte");
    if(tlist && tCarte){
        tlist.addEventListener("change", changeDisplyType)
        tCarte.addEventListener("change", changeDisplyType)
    }
    //console.log("init");
}

function changeDisplyType(e){

    let lis =  document.getElementsByClassName("student");
    let ul = document.getElementsByClassName('studentList');


    for (let i = 0; i < lis.length; i++) {

        const element = lis[i];
        console.log("lis"+lis[i]);
        
        if(e.target.value=="liste"){
            ul[0].classList.remove("studentCards");
            element.classList.remove("cardItem");
        }else{
            ul[0].classList.add("studentCards");
            element.classList.add("cardItem");
        }
    }

}

function showNavMobile(){
    let el =  document.getElementsByClassName("navMobile")[0];
    el.classList.toggle("navMobileShow");  
}