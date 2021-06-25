'use strict';
const arr = [];

const inputKeyword = document.querySelector(".inputKeyword");
const keywordList = document.querySelector('.keywords-list');
const btnSubmit = document.querySelector('.btnSubmit');

const displayKeywords = function (name) {
    keywordList.innerHTML = "";

    arr.forEach(function (ele, i){
        
        let highlight ="";
        if(ele.name === name)
            highlight = "background-color:green";

        const html = `
        <div class="row">
            <div class="keyword" style=${highlight}>${ele.name}</div>
            <div class="frequency" style=${highlight}>${ele.freq}</div>
            <button class="del" onClick="remove(${i})"> X </button>
        </div>
        `;

        keywordList.insertAdjacentHTML('beforeend', html);
    })
}

const isExists = function(name){
    let k = false;
    arr.forEach(function (ele){
        if(ele.name === name)
        {
            ele.freq++;
            k = true;
        }
    });
    return k;
}

const insert = function(name){
    for(let i=0; i<arr.length; i++)
    {
        const key = arr[i].name;
        
        if(name.localeCompare(key) === -1)
        {
            arr.splice(i,0,{name:name, freq:1});
            return;
        }
    }
    console.log("a".localeCompare("b"));
    arr.push({name:name, freq:1});
}

btnSubmit.addEventListener('click', function(){
    //console.log(inputKeyword.value);
    //console.log(!isExists(inputKeyword.value));
    const input = inputKeyword.value.toLowerCase();
    if(input === "")
        return;
    if(arr.length == 0)
        arr.push({name:input, freq:1});
    else if(!isExists(input))
    {
        insert(input);
    }
    displayKeywords(input);
    inputKeyword.value="";
})

function remove(i) {
    arr.splice(i,1);
    displayKeywords();
}
