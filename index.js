window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
};

const date_time = document.getElementById('date_time');
const date = new Date();
const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
date_time.innerHTML = dayName[date.getDay()]+', '+monthNames[date.getMonth()]+' '+date.getDate();

const mainInput = document.getElementById('mainField');
const resultDiv = document.getElementById('result');

let i=0;
let arrayOfTasks = [];

function addTaskOperation(){
    popUp.classList.remove('active');
    restoreOriginal();
    const taskTitle = mainInput.value.trim()
    if (taskTitle!==''){
        resultDiv.innerHTML+=
        `<div class='visible' id='activity`+i+`'>
            <div class='container'>
                <label id='label`+i+`'><input type='checkbox' onclick='strikeTask(this);' value=`+i+`> `+taskTitle+`</label>
                <button class='removeBtn' onclick='remove(this);' value=`+i+`>Remove</button>
            </div>
        </div>`;
        arrayOfTasks.push(taskTitle);
        i++;
    }
    mainInput.value='';
}
    
function strikeTask(element){
    const toStrike =document.getElementById('label'+element.value);
    var string = toStrike.innerHTML;
    if (!toStrike.classList.contains('passive')){
        toStrike.classList.add('passive');
        var index = toStrike.innerHTML.indexOf("value=")
        var stringFirst = string.slice(0, index);
        stringFirst+='checked ';
        string = stringFirst.concat(string.slice(index, string.length));
        toStrike.innerHTML=string;
    } else{
        toStrike.classList.remove('passive');
        var index = toStrike.innerHTML.indexOf("checked")
        var stringFirst = string.slice(0, index-1);
        index+=10;
        string = stringFirst.concat(string.slice(index, string.length));
        toStrike.innerHTML=string;
    }
}
function remove(element){
    const todelete = document.getElementById('activity'+element.value);
    todelete.innerHTML='';
    var i = parseInt(element.value);
    arrayOfTasks[i]=0;                                  /*arr.splice(i,1);*/
    console.log(i);
}

const allTasks = document.getElementsByClassName('visible');
const searchValue = document.getElementById('search');
const popUp = document.getElementById('popUp');
let flag = 0;
function searchTask(){
    popUp.classList.remove('active');
    for (var i=0; i<arrayOfTasks.length; i++){
        allTasks[i].classList.add('hidden');  
        if (arrayOfTasks[i].toLowerCase()==searchValue.value.trim().toLowerCase()){
            var index = arrayOfTasks.indexOf(searchValue.value.trim());
            const found = document.getElementById('activity'+index);
            found.classList.remove('hidden');
            flag=1;
        }
        
    }
    if (flag===0){
        popUp.classList.add('active');
    }
    searchValue.value='';
    flag=0;
}
function restoreOriginal(){
    for (var i=0; i<arrayOfTasks.length; i++){
        allTasks[i].classList.remove('hidden');                    
    }
    popUp.classList.remove('active');
}
mainInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        addTaskOperation();
    }
});
searchValue.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchBtn").click();
    }
});
