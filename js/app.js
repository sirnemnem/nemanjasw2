
//var click = document.getElementById('submit');
//click.addEventListener('click', addData);

var arr = new Array();

function addData(){
    DeleteData();
    getData();
    
    arr.push({
        name:document.getElementById('name').value,
        category:document.getElementById('category').value,
        
        amount:document.getElementById('amount').value,
        date:document.getElementById('date').value
        
    });

        localStorage.setItem("localData", JSON.stringify(arr));
}

function getData(){
    var str = localStorage.getItem("localData");
    if (str!= null)
        arr = JSON.parse(str);
}

function DeleteData(){
localStorage.clear();
}

function showData(){

  var arr1 = new Array();
  arr1 = JSON.parse(localStorage.getItem("localData"));

  var tbl = document.getElementById('animal');

  for(i = 0; i < arr1.length; i++){
      var r = tbl.insertRow();
      var cell1 = r.insertCell();
      var cell2 = r.insertCell();
      var cell3 = r.insertCell();
      var cell4 = r.insertCell();
     

      cell1.innerHTML = arr1[i].name;
      cell2.innerHTML = arr1[i].category;
      cell3.innerHTML = arr1[i].amount;
      cell4.innerHTML = arr1[i].date;
     
  }

}


if (navigator.serviceWorker) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(regEvent => console.log("Service worker registered!"))
      .catch(err => console.log("Service worker not registered"));
  });
}






    
    
    
  