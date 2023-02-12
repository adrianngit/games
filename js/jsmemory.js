
var cards_list = ["zdj11.jpg", "zdj22.jpg", "zdj33.jpg", "zdj44.jpg", "zdj55.jpg", "zdj66.jpg", "labo.jpg", "mazda.jpg", "merc.jpg", "gklasa.jpg", "nissan.jpg", "supra.jpg", ];
 
var no = new Audio("img/no.wav");		
var yes = new Audio("img/yes.wav");	
var win = new Audio("img/win.wav");	
var mouse = new Audio("img/mouse.mp3");	
win.volume = 0.3;
var cards = new Array();
var cards2 = new Array();
var onevisible = false;
var turncounter = 0;
var visible_nr;
var lock = false;
var pairsleft;
var tresc; 
window.addEventListener('load', poziomy());

/*GŁOŚNOŚĆ*/	
function glosnosc() {
var a =	document.getElementById("glosnosc")
var b = a.getAttribute("name"); 
if( b == "a"){
	document.getElementById("glosnosc").innerHTML = '<i class="icon-volume-off-1"></i>';
	yes.volume = 0;
	no.volume = 0;
	mouse.volume = 0;
	document.getElementById("glosnosc").setAttribute("name", "b");
}
else{
	document.getElementById("glosnosc").innerHTML = '<i class="icon-volume"></i>';
	yes.volume = 0.3;
	no.volume = 1;
	mouse.volume = 1;
	document.getElementById("glosnosc").setAttribute("name", "a");
}
}


function poziomy() {
	document.getElementById("button").innerHTML = '<button id="button"  value="12" onClick="start(this.value)">ŁATWY</button><br><button id="button2"  value="16" onClick="start(this.value)">ŚREDNI</button><br><button id="button3"  value="24" onClick="start(this.value)">TRUDNY</button><br>';
}

function start(value){
	pairsleft = value/2;
		var a = 12;
	for(var i = pairsleft;i>0;i--)
		{
			a--;
			var rand_id = Math.floor(Math.random() *a);
			cards2.push(cards_list[rand_id]);
			cards2.push(cards_list[rand_id]);//DODAJE DO TABLICY 1 ELEMENT O LOSOWEJ LICZBIE
			cards_list.splice(rand_id,1); //USUWA 1 ELEMENT Z TABLICY JUZ DODANY
		}
		
	for(i=value; i>0; i--)
	{
		var rand_id2 = Math.floor(Math.random() *i);
		cards.push(cards2[rand_id2]);
		cards2.splice(rand_id2,1);
	}
	
	if(value == "24" && window.matchMedia("(min-width: 1020px)").matches)document.getElementById('board').style.width = "1000px";
		
	for(i=0; i<value; i++){
		document.getElementById('menu').innerHTML += '<div class="card" id="c'+i+'" onClick="revealcard('+i+')"></div>';	
	}
	document.getElementById('score').innerHTML = "Liczba Prób: 0";
	document.getElementById('a').style.display = 'none';
	document.getElementById('button').style.display = 'none';
	document.getElementById('button2').style.display = 'none';
	document.getElementById('button3').style.display = 'none';
}

function revealcard(nr)
{
	var opacityvalue = document.getElementById("c"+nr);
	var opacityvalue2 = getComputedStyle(opacityvalue).opacity;
	
	if (opacityvalue2 != 0 && lock == false && visible_nr != nr)
	{
		lock = true;
		var obraz = "url(img/" + cards[nr] + ")";
		
		document.getElementById("c"+nr).style.backgroundImage = obraz;
		document.getElementById("c"+nr).classList.add("cardA");
		document.getElementById("c"+nr).classList.remove("card");
		
		if(onevisible == false)
		{
			onevisible = true;
			visible_nr = nr;
			mouse.play();
			setTimeout(() => {lock = false;}, 900)
		}
		else
		{
			if(cards[visible_nr] == cards[nr]){
				mouse.play();
				setTimeout(function() {hide2cards(nr, visible_nr) }, 1000);
			}
			else{
				mouse.play();
				setTimeout(function() {restore2cards(nr, visible_nr) }, 1000);				
			}
		turncounter++;
		document.getElementById("score").innerHTML = 'Liczba Prób: '+turncounter;
		onevisible = false;
		}	
	}
}

function hide2cards(nr1, nr2){
	yes.play();
	document.getElementById("c"+nr1).style.opacity = "0";
	document.getElementById("c"+nr2).style.opacity = "0";
	pairsleft--;
	if(pairsleft == 0){
		win.play();
		document.getElementById("board").innerHTML = '<h1>Wygrałeś!<br>Zajeło Ci to '+turncounter+' prób</h1><br><button onclick="location.reload()">JESZCZE RAZ</button><br><a href="index.html"><button>WRÓĆ DO MENU</button></a>';
	}
	lock = false;
}

function restore2cards(nr1, nr2){
	no.play();
	document.getElementById("c"+nr1).style.backgroundImage = "url(img/karta.jpg)";
	document.getElementById("c"+nr1).classList.add("card");
	document.getElementById("c"+nr1).classList.remove("cardA");
	document.getElementById("c"+nr2).style.backgroundImage = "url(img/karta.jpg)";
	document.getElementById("c"+nr2).classList.add("card");
	document.getElementById("c"+nr2).classList.remove("cardA");
	visible_nr = -1;
	lock = false;
}