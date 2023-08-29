/*import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);*/

let fetchInit = {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "default"
};


let url = "http://localhost:3000/film";

async function fetchData() {
    let response = await fetch(url, fetchInit);
    let data = await response.json();
    data = JSON.stringify(data);
    data = JSON.parse(data);
    return data;
}




let tableBody = document.querySelector("#userTable tbody");
let createTD = (html, parent) => {
    let td = document.createElement("td");
    td.innerHTML = html;
    parent.appendChild(td);
}
let createButtonGroup = parent => {
    let group = document.createElement("div");
    group.className = "btn-group";

    let btnInfo = document.createElement("button");
    btnInfo.className = "btn btn-success";
    btnInfo.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    selectRow();


    let td = document.createElement("td");
    td.appendChild(group);
    parent.appendChild(td);

    group.appendChild(btnInfo);
}



function tableData() {
    for (let k in title) {
        let tr = document.createElement("tr");
        for (let value of Object.values(title[k])) {
            createTD(value, tr)
        }
        createButtonGroup(tr);
        tableBody.appendChild(tr);
    }
}

let abc=fetchData().then(
    data => title = data

).then(
    () => tableData()
);


$(document).ready(function(){
    let length=0; 
    $.get(url,function(data){
        length=data.length;
        return(length);
    });

    $(".input-group").hover(function(){
        $(".input-group").css({"box-shadow": "0px 0px 2px 2px lightblue","border-radius":"5px"});
    },function(){
        $(".input-group").css("box-shadow", "0px 0px 0px 0px");
    }
    );
    $("#button-addon2").click(function(){    
        $.post(url,
        {
            id: length+1,
            title: $("input").val(),
            saw : " "
         },
        function(data){
           console.log(data);
        }); 
     });
 }); 

 function selectRow(){
    $(document).ready(function(){
        $(".btn-success").click(function(){
            let currentRow= $(this).closest("tr");
            let data={
                id: currentRow.find("td:eq(0)").text(),
                title: currentRow.find("td:eq(1)").text(),
                saw: currentRow.find("td:eq(2)").innerHTML='<i class="fa fa-check-circle-o" aria-hidden="true"></i>',
            };
             let fetchOptions={
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            };
        
            fetch(`http://localhost:3000/film/${data.id}`, fetchOptions).then(
                    resp=>resp.json(),
                    err => console.error(err)
            ).then(
                data => tableData()
            );
         });
    });
}


 function delTable(){
            if(confirm("Biztos?:)")===true){
                let fetchOptions={
                    method: "DELETE",
                    mode: "cors",
                    cache: "no-cache",
                    headers: new Headers(),
            };
            for(i=0;i<title.length;i++){           
                fetch(`http://localhost:3000/film/${title[i].id} `, fetchOptions).then(
                    response => response.json(),
                ).then(
                    (data) => {
                        tableData();
                    }
                ).catch((err)=>console.error(err));
            }
        }
        else{
            console.log("something wrong");
        }
}
