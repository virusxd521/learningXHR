const button = document.querySelector(".button");
const people_div = document.querySelector(".people");
const onSpace_api = "http://api.open-notify.org/astros.json";
const wiki_api = "https://en.wikipedia.org/api/rest_v1/page/summary/";

function generateHTML(data) {
    let div = document.createElement("div");
    div.classList.add("astro-div");
    let p = document.createElement("p");   
    let img = document.createElement("img");
    if(data.thumbnail !== undefined){
        img.src = data.thumbnail.source;
    }
    p.innerHTML = data.extract_html;
    div.appendChild(p);
    div.appendChild(img);
    people_div.appendChild(div);
}

function xhr_requests(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            let data = JSON.parse(xhr.responseText);
            return callback(data);
        }
    }
    xhr.send();
};

button.addEventListener("click", () => {
    xhr_requests(onSpace_api, (json) => {
        json.people.map( person => {
            xhr_requests(`${wiki_api}${person.name}`, generateHTML);
        })
    })
});
