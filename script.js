window.onload = init;

function init(){
    document.getElementById("Tlist").addEventListener("change", changeDisplyType)
    document.getElementById("TCarte").addEventListener("change", changeDisplyType)
    console.log("init");
}

function changeDisplyType(e){
    console.log("display change en "+e.target.value);

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
    
    /* #studentList{
        display: flex;
        flex-flow: column nowrap;
    }
    
    #studentCards{
        display: flex;
        flex-flow: row wrap;
    } */
    /* lis.forEach((student) => {
        student.style.color = "red";
    });
 */

}