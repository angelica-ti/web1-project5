var all_books = new Array();
var id = 0;

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
    cell1.innerHTML = all_books[i].id;
    cell2.innerHTML = all_books[i].title;
    cell3.innerHTML = all_books[i].author;

    var array = ["Lido","Não lido"];

    //Create and append select list
    var selectList = document.createElement("select");
    selectList.setAttribute("class", "statusL");

    //Create and append the options
    for (var j = 0; j < array.length; j++) {
        var option = document.createElement("option");
        option.value = array[j];
        option.text = array[j];
        if(all_books[i].status == array[j]){
            option.selected = true;
        }
        selectList.appendChild(option);
    }
    selectList.addEventListener("change", function() {
        if(this.value == "Lido")
        {   
            this.parentElement.parentElement.cells[1].style.textDecoration = "line-through"; 
        }
        else{
            this.parentElement.parentElement.cells[1].style.textDecoration = "none";
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
        for(var k=0;k<books.length;k++){
            if(books[k].id == this.parentElement.parentElement.id){
                all_books=all_books.slice(0,k-1).concat(all_books.slice(k,all_books.length));
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
    all_books.push(book);
    showBooks(all_books.length-1);
    id+=1;
    
}

function searchBooks(){
    var books = document.querySelector('table').rows;
    const titleBook = document.getElementById('search').value;
    for(var i=1;i<books.length;i++){
        if(all_books[i-1].title != titleBook){
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
    for(var i=0;i<all_books.length;i++){
        var book = document.getElementById(all_books[i].id);
        book.remove();
    }
    all_books = [];

}