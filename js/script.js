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
    const lis = document.querySelectorAll(".listItem");
    const ul = document.querySelector(".studentList");

    ul.classList.toggle("studentCards", isCard);

    lis.forEach(el => el.classList.toggle("cardItem", isCard));

}


function showNavMobile(){

    let el =  document.querySelector(".navMobile");
    el.classList.toggle("navMobileShow");
}


function handleData(data){

    const template = document.getElementById("liTemplate");
    const container = document.querySelector(".studentList");

    data.users.forEach(el => {

        const clone = template.content.cloneNode(true);

        clone.querySelector('.nom').textContent = el.nom;
        clone.querySelector('.prenom').textContent = el.prenom;
        clone.querySelector('.ville').textContent = el.ville;
        
        clone.querySelector('.btn').addEventListener('click', e =>{
            e.preventDefault();    
            showUser(el)
        });

        /* showUser(el) */
        container.appendChild(clone)
    });

    handleDisplay();
}

/* *********************** */
/* MODALE ACCUEIL */
/* *********************** */

function showUser(user){

    const rootImgUrl = "images/users/"

    const openBtn = document.getElementById('openDialog');
    const closeBtn = document.getElementById('closeDialog');
    const dialog = document.getElementById('dialog');
    const dialogContent = dialog.querySelector('.dialog-content');

    const avatar = document.getElementById("imgModal");
    const nom = document.getElementById("nom");
    const prenom = document.getElementById("prenom");
    const ville = document.getElementById("ville");
    const anecdote = document.getElementById("anecdote");
    
    let lastFocusedElement;
    
    lastFocusedElement = document.activeElement;

    dialog.style.display = "flex";

    avatar.src = rootImgUrl + user.avatar;
    
    nom.innerText = user.nom;
    prenom.innerText = user.prenom;
    ville.innerText = user.ville;
    anecdote.innerText = user.anecdotes;



    dialogContent.focus();
    trapFocus(dialogContent);
    
    closeBtn.addEventListener('click', closeDialog);
    

    function closeDialog() {
      
        dialog.style.display = "none";
        
      if (lastFocusedElement) lastFocusedElement.focus();
    }
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
    //   if (dialog.style.display == "none" && e.key === 'Escape') {
        closeDialog();
      }
    });
    
    // Focus trap
    function trapFocus(container) {
      const focusableEls = container.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];
    
      container.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      });
    }

}


