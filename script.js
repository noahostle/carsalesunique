i = document.createElement("input");
s = document.createElement("button");
d = document.createElement("div");
i.placeholder = "Enter max pages";
i.type="number";
s.onclick=function(){run(i.value)};
d.style.zIndex = "999";
d.style.marginTop="50px";
s.style.border="none";
s.textContent="Filter";
s.style.height="30px";
s.id="011001100110010101101101011000100110111101111001";
d.style.textAlign="center";

d.appendChild(i);
d.appendChild(s);
document.body.insertBefore(d, document.body.firstChild);


function run(pages){
  container = document.getElementsByClassName("listing-items")[0];
  container.innerHTML="";
  s=document.getElementById("011001100110010101101101011000100110111101111001");
  console.log(s);
  s.innerHTML="Loading...";
  console.log(s);


  url = window.location.href.split("offset=");
 //url = "https://www.carsales.com.au/cars/?q=(And.Service.carsales._.(C.Make.Toyota._.(C.Model.Celica._.(Or.Badge.4WS._.Badge.GT-Four.))))".split("offset=");
  urlbase = url[0] + "offset=";
  urlend = "";
  if (url.length!=1){
    urlend = url[1].split("&");
      alert("here");
    if (urlend.length > 1) {
      urlend = url[1].split("&");
      urlend.shift();
      urlend = urlend.join("&");
      urlend = "&" + urlend;
    }
  } else {
      if (url[0].split("?").length==1){
          urlbase=urlbase.split("offset=")[0];
          urlbase += "?offset=";
      } else {
          urlbase=urlbase.split("offset=")[0];
          urlbase += "&offset=";
      }
  }



  cars = [];
  index = 0;
  adding = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  done=0;

  (async () => {
    while (adding.length == 12 && done != pages) {
      adding = await retr(urlbase, urlend, index);
      cars = cars.concat(adding);
      index += 12;
      done+=1
    }


    uniq=[];
    nodes=[];
    for (var i =0; i < cars.length; i++){
      name = cars[i].getAttribute("data-webm-make") + cars[i].getAttribute("data-webm-model");
      if (!uniq.includes(name)){
        uniq[uniq.length]=name;
        nodes[nodes.length]=cars[i];
      }
    }



    for (var y=0; y < nodes.length; y++){

      container.appendChild(nodes[y]);
    }


  s.innerHTML="Filter";
  })();
}

async function retr(urlbase, urlend, index) {
  try {
    const get = urlbase + index + urlend;
    const response = await fetch(get);

    if (!response.ok) {
      throw new Error("Network response failed");
    }

    const data = await response.text();
    const parser = new DOMParser();
    const resp = parser.parseFromString(data, 'text/html');
    const elements = resp.querySelectorAll('.listing-item');
    const filteredArray = Array.from(elements);
    return filteredArray;
  } catch (error) {
    alert("There was a problem with the fetch operation: " + error);
    return [];
  }
}