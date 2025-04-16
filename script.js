window.onload = init;

function init(){
    
    //nav mobile
    document.getElementById("burger").addEventListener("click", showNavMobile);

    handleTheme();

    handleDisplay();

    handleSavePref();
}

function handleSavePref(){

    let saveBtn = document.getElementById("savePref");

    //si on est sur la page de prefs
    if(saveBtn){

        saveBtn.addEventListener("click", (e)=>{
            localStorage.setItem("theme", document.getElementById("selectTheme").value);

            let displayPref = document.querySelector('input[name="display"]:checked').value;
            localStorage.setItem("display", displayPref );
            console.log("document.getElementById(display).value = "+displayPref);
            
        });
    } 

}


function handleTheme(){

    let theme = readStorage("theme", "dark");
    if(theme=="dark"){
        document.documentElement.classList.add('dark');
     }

    let selectTheme = document.getElementById("selectTheme");
    //si on est sur la page de prefs
    if(selectTheme){

        selectTheme.value = theme;
        selectTheme.addEventListener("change",  (e)=>{
            document.documentElement.classList.toggle('dark');
            
        });

    } 
}


function handleDisplay(){

    let display = readStorage("display", "list");
    
    const radios = document.querySelectorAll("input[name='display']");

    //si on est sur la page de prefs ou l'accueil
    if(radios.length>0){
        radios.forEach( radio =>{ 

            radio.addEventListener("change", changeDisplayType);

            if (radio.value === display) {
                radio.checked = true;
                radio.dispatchEvent(new Event("change"));
            }

            }
         )

        //  changeDisplayType(null);
    }

}

function readStorage(localName, localDefault){

    let value = localStorage.getItem(localName);
    if (value === null) {
        localStorage.setItem(localName, localDefault);
        return localDefault;
    }
    return value;

}


function changeDisplayType(e){

    console.log("changeDisplayType");
    

    const isCard = e.target.value === "card"; 
    const lis = document.querySelectorAll(".student");
    const ul = document.querySelector(".studentList");

    ul.classList.toggle("studentCards", isCard);

    lis.forEach(el => el.classList.toggle("cardItem", isCard));

}


function showNavMobile(){
    let el =  document.getElementsByClassName("navMobile")[0];
    el.classList.toggle("navMobileShow");  
}