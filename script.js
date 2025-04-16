window.onload = init;

function init(){
    document.getElementById("burger").addEventListener("click", showNavMobile);
    
    //makeItDark();
   

    let tlist = document.getElementById("Tlist");
    let tCarte = document.getElementById("TCarte");

    if(tlist && tCarte){
        tlist.addEventListener("change", changeDisplayType)
        tCarte.addEventListener("change", changeDisplayType)
    }
    //console.log("init");

    handleTheme();

}


function handleTheme(){

    let theme = readTheme();
    let selectTheme = document.getElementById("selectTheme");

    if(selectTheme){

        selectTheme.value = theme;

        selectTheme.addEventListener("change",  (e)=>{
            if(selectTheme.value == "light"){
                document.documentElement.classList.remove('dark');
            }else{
                document.documentElement.classList.add('dark');
            }
        });

        document.getElementById("validBtn").addEventListener("click", (e)=>{
            localStorage.setItem("theme", selectTheme.value);
        });

    } 
}

function readTheme(){
    let localTheme = localStorage.getItem("theme");
    if(!localTheme){
        localStorage.setItem("theme", "light");
        theme = "light";
    }else{
        theme = localTheme;
    }

    if(theme=="dark"){
       document.documentElement.classList.add('dark');
    }
    return theme;
}


function changeDisplayType(e){

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