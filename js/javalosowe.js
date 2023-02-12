
var haslo1 = "";	
var haslo = "";
var dlugosc = "";
var ile_bledow = 0;	 
var yes = new Audio("img/yes.wav");	 
var no = new Audio("img/no.wav");	

/*WYLOSOWANIE HASŁA*/
function losowe()
{
	var haslokategoria = document.querySelector("select").value;
	function losowanie(n)
	{
		var liczba = Math.floor(Math.random() * 81);
		haslo = n[liczba];
		dlugosc = dlugosc + haslo.length;
		haslo = haslo.toUpperCase();
		for (i=0; i<dlugosc; i++)
			{
				if(haslo.charAt(i)==" ")haslo1 = haslo1 + " ";
				else haslo1 = haslo1 + "-";
			}
			document.getElementById('haslo').innerHTML = haslo1;
		
		/*responsywność*/
			
			responsywnosc();
			window.addEventListener('resize', responsywnosc);

			function responsywnosc(){
				w = document.documentElement.clientWidth;
				if(w<1500 && w>=1025){ 
				document.getElementById('licznik').style.display = "block";
				document.getElementById('klawiatura').style.margin = "2px";
				document.getElementById('klawiatura').style.width = "50%";
				document.getElementById('klawiatura').style.marginLeft = "0px";
				document.getElementById('klawiatura').style.marginRight = "0px";
				document.getElementById('klawiatura').style.paddingLeft = "0px";
				}
				else if(w<1025 && w>=900){ 
				document.getElementById('licznik').style.display = "block";
				document.getElementById('klawiatura').style.width = "77.5%";
				document.getElementById('klawiatura').style.marginLeft = "10%";
				document.getElementById('klawiatura').style.marginRight = "10%";
				document.getElementById('klawiatura').style.paddingLeft = "25px";
				document.getElementById('klawiatura').style.paddingRight = "0px";
				}
				else if(w<900 && w>660){ 
				document.getElementById('licznik').style.display = "block";
				document.getElementById('klawiatura').style.width = "80%";
				document.getElementById('klawiatura').style.marginLeft = "0px";
				document.getElementById('klawiatura').style.marginRight = "0px";
				document.getElementById('klawiatura').style.paddingLeft = "10%";
				document.getElementById('klawiatura').style.paddingRight = "10%";
				}
				else if(w<=660 && w>480){
				document.getElementById('licznik').style.display = "block";
				document.getElementById('klawiatura').style.width = "86%";
				document.getElementById('klawiatura').style.marginLeft = "0px";
				document.getElementById('klawiatura').style.marginRight = "0px";
				document.getElementById('klawiatura').style.paddingLeft = "7%";
				document.getElementById('klawiatura').style.paddingRight = "7%";
				}
				else if(w<=480 && w>420){
				document.getElementById('licznik').style.display = "block";
				document.getElementById('klawiatura').style.width = "96%";
				document.getElementById('klawiatura').style.marginLeft = "0px";
				document.getElementById('klawiatura').style.marginRight = "0px";
				document.getElementById('klawiatura').style.paddingLeft = "2%";
				document.getElementById('klawiatura').style.paddingRight = "2%";
				}
				else if(w<=420){
				document.getElementById('licznik').style.display = "block";
				document.getElementById('klawiatura').style.width = "92%";
				document.getElementById('klawiatura').style.marginLeft = "0px";
				document.getElementById('klawiatura').style.marginRight = "0px";
				document.getElementById('klawiatura').style.paddingLeft = "4%";
				document.getElementById('klawiatura').style.paddingRight = "4%";
				}
			}
		
		
		litery();
		start();
	}
	if(haslokategoria == "Przyroda")losowanie(Przyroda);
	else if(haslokategoria == "Turystyka")losowanie(Turystyka);
	else if(haslokategoria == "Zdrowie")losowanie(Zdrowie);	
}

/*GŁOŚNOŚĆ*/	
function glosnosc() {
var a =	document.getElementById("glosnosc")
var b = a.getAttribute("name"); 
if( b == "a"){
	document.getElementById("glosnosc").innerHTML = '<i class="icon-volume-off-1"></i>';
	yes.volume = 0;
	no.volume = 0;
	document.getElementById("glosnosc").setAttribute("name", "b");
}
else{
	document.getElementById("glosnosc").innerHTML = '<i class="icon-volume"></i>';
	yes.volume = 1;
	no.volume = 1;
	document.getElementById("glosnosc").setAttribute("name", "a");
}
}

/*POKAZANIE LITER*/

var litera ="AĄBCĆDEĘFGHIJKLŁMNŃOÓPQRSŚTUVWXYZŻŹ";
	function litery() 
	{
		var tresc = "";
		
		for (i=0; i<=34; i++)
		{
			var element = "lit" + i;
			tresc = tresc + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litera[i]+'</div>';
		}
		document.getElementById('klawiatura').innerHTML = tresc;
		document.getElementById('haslo').innerHTML = haslo1;
		
	}

/*CZAS*/

const timeDisplay = document.querySelector("#czass");

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let mins = 0;
let secs = 0;
let minuta = "";
let sekunda = "";
let bledy = "";

function start()
{
	startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 1000);
}

function pause()
{
    clearInterval(intervalId); 
}

function updateTime(){
    elapsedTime = Date.now() - startTime;

    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    
    secs = pad(secs);
    mins = pad(mins);
    
    timeDisplay.textContent = `${mins}:${secs}`;

    function pad(unit){
        return (("0") + unit).length > 2 ? unit : "0" + unit;
    }
}

/*MECHANIKA GRY*/

String.prototype.ustawZnak = function(miejsce,znak)
{
	if(miejsce > this.length - 1) return this.toString();
	else return this.substr(0,miejsce) + znak + this.substr(miejsce+1);
}



function sprawdz(nr)
{
	var trafiona = false;
	for(i=0; i<dlugosc; i++)
	{
		if(haslo.charAt(i) == litera[nr])
		{
			haslo1 = haslo1.ustawZnak(i,litera[nr]);
			trafiona = true;
		}
	}
	
	if(trafiona == true)
	{
		yes.play();
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00c000";
		document.getElementById(element).style.border = "3px solid #00c000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById('haslo').innerHTML = haslo1;	
	}
	else
	{
		no.play();
		var element = "lit" + nr;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";
		document.getElementById(element).setAttribute("onclick",";");
		
		//liczenie bledow
		ile_bledow++
		var pozostalo = 9-ile_bledow;
		var obraz = "img/s"+ ile_bledow + ".jpg";
		document.getElementById("obraz").innerHTML = '<img src="'+obraz+'"/>'

		if(pozostalo > 4)document.getElementById("proby").innerHTML = "POZOSTAŁO "+pozostalo+" SZANS";
		else if(pozostalo >=2 && pozostalo <=4)document.getElementById("proby").innerHTML = "POZOSTAŁY "+pozostalo+" SZANSE";
		else if( pozostalo == 1)document.getElementById("proby").innerHTML = "POZOSTAŁA "+pozostalo+" SZANSA";
	}
	

	// 0 minut 1 minute 2 3 4 minuty 5 minut 
	if(mins == "00")var minuta = "minut";
	else if(mins == "01")var minuta = "minute";
	else if(mins == "02" || mins == "03" || mins == "04")var minuta = "minuty";
	else if(mins >= "05")var minuta = "minut";
	
	//1 sekunde 2 3 4 sekundy 5 sekund
	if(secs == "00")var sekunda = "sekund";
	else if(secs == "01")var sekunda = "sekunde";
	else if(secs == "02" || secs == "03" || secs == "04" )var sekunda = "sekundy";
	else if (secs >= "05")var sekunda = "sekund";
	
	// 1blad 2 3 4 bledy  0, 5 bledow 
	if(ile_bledow == "0")var bledy = "błędów";
	else if(ile_bledow == "1")var bledy = "błąd";
	else if(ile_bledow == "2" || ile_bledow == "3" || ile_bledow == "4")var bledy = "błędy";
	else if(ile_bledow >= "5" )var bledy = "błędów";

	function panelkoncowy(zmienna){
		var rezultat = zmienna;
		if(rezultat == "WYGRAŁEŚ") 
		{
			var kolor1 = "#2ead1a";
			var kolor2 = "#1b6110";
			var border = "#62fc49";
		}
		else if(rezultat == "PRZEGRAŁEŚ")
		{
			var kolor1 = "#801b10";
			var kolor2 = "#3d1414";
			var border = "#d83526";
		}
		pause();
		/*responsywność*/
		if(window.matchMedia("(max-width: 1500px)").matches){
			document.getElementById('licznik').style.display = "none";
			document.getElementById('haslo').style.display = "none";
			document.getElementById('klawiatura').style.width = "100%";
		}
		
		if(window.matchMedia("(max-width: 1025px)").matches){ 
				document.getElementById('klawiatura').style.width = "50%";
				document.getElementById('klawiatura').style.marginLeft = "25%";
				document.getElementById('klawiatura').style.marginRight = "25%";
			}
			
		if(window.matchMedia("(max-width: 900px)").matches){ 
				document.getElementById('klawiatura').style.width = "80%";
				document.getElementById('klawiatura').style.marginLeft = "10%";
				document.getElementById('klawiatura').style.marginRight = "10%";
				document.getElementById('klawiatura').style.paddingLeft = "0%";
				document.getElementById('klawiatura').style.paddingRight = "0%";
			}
			
		document.getElementById("klawiatura").innerHTML = "<center><h1>"+rezultat+" hasło to: <span style='color:red'>"+haslo+'</span></h1><h1>Podsumowanie</h1><h3>Skończyłeś grę w '+mins+' '+minuta+' i '+secs+' '+sekunda+' oraz zrobiłeś '+ile_bledow+' '+bledy+' </h3><br><br><button class="buttonpodsumowanie" style="background:linear-gradient(to bottom,'+kolor1+' 5%,'+kolor2+' 100%); border:1px solid'+border+';" onclick="location.reload()">JESZCZE RAZ?</button><br><a href="index.html"><button class="buttonpodsumowanie" style="background:linear-gradient(to bottom,'+kolor1+' 5%,'+kolor2+' 100%); border:1px solid'+border+';">WRÓĆ DO MENU</button></a></center>';
	}
	//wygrana
	if(haslo == haslo1)panelkoncowy("WYGRAŁEŚ")
	//przegrana
	if(ile_bledow>=9)panelkoncowy("PRZEGRAŁEŚ")
}