function GetAndUpdate(){
    console.log("Updating list...");
    tas = document.getElementById("task").value;
    desc = document.getElementById("des").value;

    if (localStorage.getItem('itemsJson') == null){
        ItemJsonArray = [];
        ItemJsonArray.push([tas,desc]);
        localStorage.setItem('itemsJson', JSON.stringify(ItemJsonArray));
    }
    else{
        ItemJsonArrayStr = localStorage.getItem('itemsJson');
        ItemJsonArray = JSON.parse(ItemJsonArrayStr);
        ItemJsonArray.push([tas,desc]);
        localStorage.setItem('itemsJson', JSON.stringify(ItemJsonArray));
    }
    update();
}
function update(){
    if (localStorage.getItem('itemsJson') == null){
        ItemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(ItemJsonArray));
    }
    else{
        ItemJsonArrayStr = localStorage.getItem('itemsJson');
        ItemJsonArray = JSON.parse(ItemJsonArrayStr);
    }
    // For adding in Table
    let tablebody = document.getElementById("Tbody");
    let str = "";
    ItemJsonArray.forEach((element,index) => {
        str +=`
        <tr>
        <th scope="row">${index+1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
        </tr>`;
    });
    tablebody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click",GetAndUpdate);
update();

function deleted(item){
    console.log("delete",item);
    ItemJsonArrayStr = localStorage.getItem('itemsJson')
    ItemJsonArray = JSON.parse(ItemJsonArrayStr);
    // Delete itemIndex element from the array
    ItemJsonArray.splice(item, 1);
    localStorage.setItem('itemsJson', JSON.stringify(ItemJsonArray));
    update();
}
  
function clear_S(){
    if (confirm("Do you areally want to clear?")){
    console.log('Clearing the storage')
    localStorage.clear();
    update()
    }
}