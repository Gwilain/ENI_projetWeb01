document.addEventListener('DOMContentLoaded', init);

const dataPath = "datas/data.json";

function init(){
    
    //nav mobile
    document.getElementById("burger").addEventListener("click", showNavMobile);
    
    if(document.querySelector(".studentList")){
        fetch(dataPath).then(response=>response.json()).then(data=>handleData(data));
    }

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
    /* console.log("ul = "+ul); */
    
    // const ul = document.getElementById("studentList");

    ul.classList.toggle("studentCards", isCard);

    lis.forEach(el => el.classList.toggle("cardItem", isCard));

}


function showNavMobile(){
    let el =  document.getElementsByClassName("navMobile")[0];
    el.classList.toggle("navMobileShow");  
}


function handleData(data){

    const template = document.getElementById("liTemplate");
    const container = document.querySelector(".studentList");

    // const clone = document.importNode(template.content, true);

    //const clone =  template.content.cloneNode(true);
    console.log("container = "+container);
    

    data.users.forEach(el => {

        console.log("user "+ el.prenom);
        
        const clone = template.content.cloneNode(true);

        clone.querySelector('.nom').textContent = el.nom;

        clone.querySelector('.prenom').textContent = el.prenom;

        clone.querySelector('.ville').textContent = el.ville;

        // Et enfin l’ajouter à ta page
        container.appendChild(clone)


    });

    handleDisplay();
}