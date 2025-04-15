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


function handleTheme() {

    const savedValue = localStorage.getItem("theme");
    const select = document.getElementById("selectTheme");

    function applyTheme(theme) {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }

    if (select) {
       
        const themeToApply = savedValue ?? "light";
        select.value = themeToApply;
        applyTheme(themeToApply);

       
        select.addEventListener("change", (e) => {
            const newTheme = e.target.value;
            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });
    }
}

/* function handleTheme(){

    let theme = readTheme();

    let selectTheme = document.getElementById("selectTheme");
    if(selectTheme){
        selectTheme.addEventListener("change", onThemeSlectChange);

        for(var i = 0; i = selectTheme.options.length; i++) {
            if(i.value == temp) {
                mySelect.selectedIndex = j;
                break;
            }
        }
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

function onThemeSlectChange(e){

    if(e.target.value == "light"){
        document.documentElement.classList.remove('dark');
    }else{
        document.documentElement.classList.add('dark');
    }
    localStorage.setItem("theme", e.target.value);
} */





/* function makeItDark(){
    document.documentElement.classList.add('dark');
} */



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