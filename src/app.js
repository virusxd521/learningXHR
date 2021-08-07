const button = document.querySelector(".button");
const people_div = document.querySelector(".people");
const onSpace_api = "http://api.open-notify.org/astros.json";









button.addEventListener("click", () => {
    let astros_obj;
    const callBack_of_xhr = () => {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                astros_obj = JSON.parse(xhr.responseText);
                for( let i = 0; i < astros_obj.people.length; i++){
                    let div = document.createElement("div");
                    div.classList.add("astro-div");
                    let p = document.createElement("p");   
                    p.innerHTML = astros_obj.people[i].name;
                    p.classList.add("p-name");
                    div.appendChild(p);
                    people_div.appendChild(div);

                    const wiki_api = `https://en.wikipedia.org/api/rest_v1/page/summary/${astros_obj.people[i].name}`;
                    const wiki_callback = () => {
                        if(wiki_xhr.readyState === 4){
                            const wiki_astors = JSON.parse(wiki_xhr.responseText);
                            console.log(wiki_astors);
                            let p = document.createElement("p");   
                            let img = document.createElement("img");
                            img.src = wiki_astors.thumbnail.source;
                            console.log(img);
                            p.innerHTML = wiki_astors.extract_html;
                            div.appendChild(p);
                            div.appendChild(img);
                            people_div.appendChild(div);
                        }
                        
                    }
                     const wiki_xhr = new XMLHttpRequest();
                     wiki_xhr.open("GET", wiki_api);
                     wiki_xhr.onreadystatechange = wiki_callback;
                     wiki_xhr.send();

                }
            }   
        }    
    };

    const xhr = new XMLHttpRequest();
    xhr.open("GET", onSpace_api);
    xhr.onreadystatechange = callBack_of_xhr;
    xhr.send();
});



