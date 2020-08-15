var dataInput = document.querySelector("#taskInput");
var searchInput = document.querySelector('#search');
var ulSpisok = document.getElementById("list");
var spans = document.getElementsByClassName("delete-button");
var favSpan = document.getElementsByClassName('favoriteBtn');
var saveBtn = document.getElementById("save");
var clearBtn = document.getElementById("clear");
var closeBtn = document.getElementById("close-modal");
var complete = document.querySelector('.completeSpan');
var favorite = document.querySelector('.favoriteSpan');
var allBtn = document.querySelector('#all');
var complBtn = document.querySelector('#complete');
var favoriteBtn = document.querySelector('#favorite');

complete.innerHTML = '0';
favorite.innerHTML = '0';

var favArr = [];
var complArr = [];


function favorTodo(){
    for(let i of favSpan){
        i.addEventListener('click', function(){
            let d = i.parentNode;
                li = d.parentNode;
            if(d.parentNode.style.color == 'yellow'){
                d.parentNode.style.color = 'black';
                favArr.pop(i);
                favorite.innerHTML = favArr.length;
                li.classList.remove('fav');
            } else{
                d.parentNode.style.color = 'yellow';
                favArr.push(i);
                favorite.innerHTML = favArr.length;
                li.classList.add('fav');
            }
        })
    }
}

function deleteTodo(){
    for(let span of spans){
        span.addEventListener("click", function(){
            let d = span.parentNode;
                li = d.parentNode;
                
            li.remove();
            event.preventDefault();
        })
    }
};

function loadTodo(){
    if(localStorage.getItem("todoApplication")){
        ulSpisok.innerHTML = localStorage.getItem("todoApplication");
        deleteTodo();
    }
};

function toComplete(){
    document.getElementById('list').addEventListener('click', function(e){

        if(e.target.tagName === 'P'){
            e.target.classList.toggle('line');
            e.target.parentNode.classList.toggle('compl');
        }
    })
  }

function completeCounter(){
    for(let li of document.getElementsByClassName('compl')){
        if(li.className === 'compl'){
            complArr.push(li);
            complete.innerHTML = complArr.length;
        } else{
            complArr.pop(li);
            complete.innerHTML = complArr.length;
        }
    }
}


// addEventListener - обработчик события с последующим вызовом функции

searchInput.addEventListener('keyup', function(){
    let filter = searchInput.value.toLowerCase(),
        filterEl = document.querySelectorAll('#list li');

        filterEl.forEach(item => {
            if(item.innerHTML.toLowerCase().indexOf(filter) > -1){
                item.style.display = '';
            } else{
                item.style.display = 'none';
            }
        })
})

dataInput.addEventListener("keypress", function(keyPressed){
    if(keyPressed.which === 13){
        var newLi = document.createElement("li");
        var div = document.createElement('div');
        var newSpan = document.createElement("span");
        var newTask = document.createElement('p');
        var liveTime = document.createElement("span");
        var fBtn = document.createElement('span'); 
        var time = new Date();
        var option = {
            hour: 'numeric',
            minute: 'numeric', 
            second: 'numeric'
        }
        // newTask.classList.add("task");
        
        fBtn.classList.add('favoriteBtn');
        fBtn.innerHTML = '!';
        newSpan.innerHTML = "Удалить";
        newSpan.classList.add("delete-button");
        liveTime.innerHTML = time.toLocaleString("ru", option);//время в формате 24часа("En" - время в формате 12часов)

        var newTodo = this.value; // текущее значение input
        

        if(this.value.trim() !== ""){
            newTask.append(newTodo);
            div.append(newSpan, fBtn);
            ulSpisok.appendChild(newLi).append(liveTime, " ", newTask, div);

        }

        this.value = ""; // очищаем поле ввода
        deleteTodo();
        toComplete();
        favorTodo();
    }
});

saveBtn.addEventListener("click", function(){
    localStorage.setItem("todoApplication", ulSpisok.innerHTML)
});

clearBtn.addEventListener("click", function(){
    ulSpisok.innerHTML = "";
    localStorage.setItem("todoApplication", ulSpisok.innerHTML);
});

favoriteBtn.addEventListener('click', () => {
    let allLi = document.querySelectorAll('li');
    for(let i of allLi){
        if(i.className !== 'fav'){
            i.style.display = 'none';
        }
    }
});

allBtn.addEventListener('click', () => {
    let allLi = document.querySelectorAll('li');
    for(let i of allLi){
        i.style.display = 'flex';
    }
});

complBtn.addEventListener('click', () => {
    let allLi = document.querySelectorAll('li');
    for(let i of allLi){
        if(i.className !== 'compl'){
            i.style.display = 'none';
        }
    }
});

// document.getElementById('testUl').addEventListener('click', function(e){
//     console.log(e.target.textContent);
//     if(e.target.tagName === 'P'){
//         e.target.classList.toggle('line');
//     }
// })


deleteTodo();
loadTodo();
toComplete();
favorTodo();