//Get all keys different of id and sort
keys = Object.keys(localStorage).filter(function(e) { return e !== 'id' }).sort();

//Presents all stored books
for(w=0;w<keys.length;w++){
    id = keys[w];
    showBooks(w);
}

var id = parseInt(localStorage.getItem('id'))+1;
if(!localStorage.getItem('id')){
    id = 0;
}

function openAddScreen() {
    document.getElementById("myForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function showBooks(i){
    var book = document.querySelector('table');
    var row = book.insertRow(i+1);
    row.setAttribute("id", id);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var book_json = JSON.parse(localStorage.getItem(id.toString()));
    console.log(book_json);
    cell1.innerHTML = book_json.id;
    cell2.innerHTML = book_json.title;
    cell3.innerHTML = book_json.author;

    var array = ["Lido","Não lido"];

    //Create and append select list
    var selectList = document.createElement("select");
    selectList.setAttribute("class", "statusL");

    //Create and append the options
    for (var j = 0; j < array.length; j++) {
        var option = document.createElement("option");
        option.value = array[j];
        option.text = array[j];
        if(book_json.status == option.value){
            option.selected = true;
            if(!j){
                cell2.className = "line";
            }
        }
        selectList.appendChild(option);
    }
    selectList.addEventListener("change", function() {
        if(this.value == "Lido")
        {   
            this.parentElement.parentElement.cells[1].className = "line"; 
            book_json.status = this.value;
            localStorage.removeItem(book_json.id.toString());
            localStorage.setItem(book_json.id.toString(),JSON.stringify(book_json));
        }
        else{
            this.parentElement.parentElement.cells[1].className = "without-line";
            book_json.status = this.value;
            localStorage.removeItem(book_json.id.toString());
            localStorage.setItem(book_json.id.toString(),JSON.stringify(book_json));
        }
    });
    cell4.appendChild(selectList);

    //Create button to remove row
    var btn = document.createElement('button');
    var icon = document.createElement('i');
    icon.setAttribute("class", "fa fa-trash");
    icon.setAttribute("style", "font-size:24px;color:red");
    btn.type = "button";
    btn.className = "btn";

    btn.addEventListener('click', function(){
        var books = document.querySelector('table').rows;
        for(var k=1;k<books.length;k++){
            console.log(books[k].id);
            if(books[k].id == this.parentElement.parentElement.id){
                keys=keys.slice(0,k-1).concat(keys.slice(k,keys.length));
                localStorage.removeItem(books[k].id.toString());
                books[k].remove();
                break;
            }
        }
    });

    btn.appendChild(icon);
    cell5.appendChild(btn);

    document.body.appendChild(book);
    
}

function addBooks(){
    const titleBook = document.getElementById('titleBook').value;
    const author = document.getElementById('author').value;
    const status = document.getElementById('status').value;

    if(titleBook == ""){
        alert("Título do livro não foi informado!");
        return;
    }
    var book = {
        id: id,
        title: titleBook,
        author: author,
        status: status
    };
    localStorage.setItem('id',id);
    localStorage.setItem(id.toString(),JSON.stringify(book));
    keys.push(id);
    showBooks(keys.length-1);
    id+=1;
    
}

function searchBooks(){
    var books = document.querySelector('table').rows;
    const titleBook = document.getElementById('search').value;
    for(var i=1;i<books.length;i++){
        title = books[i].cells[1].innerHTML;
        if(title != titleBook){
            books[i].style.display="none";
        }
        else{
            books[i].style.display="table-row";
        }
    }

}

function showAll(){
    var books = document.querySelector('table').rows;

    for(var i=1;i<books.length;i++){
        books[i].style.display="table-row";
    }

}

function removeAll(){
    for(var i=0;i<keys.length;i++){
        var book = document.getElementById(keys[i]);
        console.log(book);
        book.remove();
    }
    keys = [];
    localStorage.clear();
    localStorage.setItem('id',0);
    id = 0;

}
