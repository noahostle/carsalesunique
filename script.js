cars = document.getElementsByClassName("listing-item");
seen = [];
remove=[];
for (var i =0; i < cars.length; i++){
	name = cars[i].getAttribute("data-webm-make") + cars[i].getAttribute("data-webm-model");
	if (seen.includes(name)){
		remove[remove.length]= cars[i];
	}else{
		seen[seen.length]=name;
	}
}

for (var x = 0; x<remove.length; x++){
	remove[x].remove()
}