'use strict';

const container = document.querySelector('.container');
const row = document.querySelector('.row');
const btnSubmit = document.querySelector('.btnSubmit');


const arr = [];

const displayData = function () {
    container.innerHTML="";
    arr.forEach(function (ele, i) {
        const bgcolor = i % 2 == 0 ? "#C8C8C8" : "white";
        const html = `
            <div class="row" style="background-color:${bgcolor}">
                <div class="id">${ele.albumId}</div>
                <div class="title">${ele.title}</div>
                <div class="url">${ele.url}</div>
                <div class="thumbnail">${ele.thumbnailUrl}</div>
                <div class="del">
                <button id="btndel" onClick="delElement(${ele.albumId})" type="button"><h2>X</h2></button>
                </div>
            </div>
        `;

        container.insertAdjacentHTML("beforeend", html);
    });
}

const getData = function(){
    fetch('https://jsonplaceholder.typicode.com/photos?albumId=1')
        .then(res => res.json())
        .then(data => {
            console.log(data[0]);

            data.forEach(function(ele,i){
                ele.albumId=(i+1).toString();
                arr.push(ele);
            });
            displayData();
        });
}
getData();

const addElement = function (ele) {
    fetch('https://jsonplaceholder.typicode.com/photos', {
        method: 'POST',
        body: JSON.stringify(ele),
        headers: {
            'Content-type': 'application,json; charset=UTF-8',
        },
    })
    .then( res => {
        
        console.log(res);
        alert(
            `ADDED :\nUrl       : ${res.url}\nstatus   : ${res.status}\nOk       : ${res.ok}
            `
        );
        return res.json();
    })
    .then(data => console.log(data));
   
    arr.push(ele);
    displayData();
}

const delElement = function (num) {
    for(let i=0; i<arr.length; i++)
    {
        if(arr[i].albumId == num.toString())
        {
            arr.splice(i,1);
            break;
        }
    }
    displayData();
    fetch(`https://jsonplaceholder.typicode.com/photos/${num+1}`, {
        method: 'DELETE',
    })
    .then(res => {
        console.log(res);
        alert(
            `DELETED :\nUrl       : ${res.url}\nstatus   : ${res.status}\nOk       : ${res.ok}
            `
        );
    }); 
}


btnSubmit.addEventListener('click', function () {
    
    const element = {
        albumId: document.querySelector('#id').value,
        title: document.querySelector('#title').value,
        url: document.querySelector('#url').value,
        thumbnailUrl: document.querySelector('#thumbnail').value
    };
    addElement(element);
})

function togglePopup(num) {
    if(num === 1)
    {
        document.querySelector('.container').style.opacity = "25%";
        document.querySelector('.header').style.opacity = "25%";
    }
    else
    {
        document.querySelector('.container').style.opacity = "100%";
        document.querySelector('.header').style.opacity = "100%";
    }
    document.getElementById("popup-1")
     .classList.toggle("active");
}
