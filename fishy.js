

var interval = setInterval(onInterval, 10000);
var fish_health = 90;
var fish_happiness = 75;
var lastFeed = new Date();
var lastPlay = new Date();
var firstPlay = true;
var firstFeed = true;
var badFeed = 0;
var dead=false;

const cipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const byteHex = n => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);

    return text => text.split('')
        .map(textToChars)
        .map(applySaltToChar)
        .map(byteHex)
        .join('');
}

const decipher = salt => {
    const textToChars = text => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = code => textToChars(salt).reduce((a,b) => a ^ b, code);
    return encoded => encoded.match(/.{1,2}/g)
        .map(hex => parseInt(hex, 16))
        .map(applySaltToChar)
        .map(charCode => String.fromCharCode(charCode))
        .join('');
}

function onInterval(){
  if(!dead){
  if (fish_happiness >= 100 && fish_health >= 100){
	const d = decipher('alpha');
	var m = d('3737273732383533470f323d273c2d2b3e272b3d272b3c35373f313009');
	document.getElementById("info").innerHTML = m;
  }
  var currPlay = new Date();
  if(fish_health <= 0){
    dead = true;
  }
  
    var seconds = (currPlay.getTime() - lastFeed.getTime()) / 1000;
    if(seconds > 12){
    	fish_health -= 10;
    	document.getElementById("fish-state").src = "images/sad.png";
   	document.getElementById("fish-state").style.display = "block";
   	setTimeout(hideFace, 2000);
    }
    
  
    var seconds = (currPlay.getTime() - lastPlay.getTime()) / 1000;
    if(seconds > 12){
    	fish_health -= 2;
    	if(fish_happiness >=12){
    	fish_happiness -=12;
    	}
    	document.getElementById("fish-state").src = "images/sad.png";
   	document.getElementById("fish-state").style.display = "block";
   	setTimeout(hideFace, 2000);
    }
  
  if(fish_happiness == 0){
    fish_health -=10;
  }
  if(fish_health <= 0){
     dead = true;
     document.getElementById("fish-state").src = "images/dead.png";
     document.getElementById("fish-state").style.display = "block";
  }
   document.getElementById("fish-health").value = fish_health;
   document.getElementById("fish-happy").value = fish_happiness;
   }else{
   	document.getElementById("fish-state").src = "images/dead.png";
   	document.getElementById("fish-state").style.display = "block";
   }
}

function hideFace(){
   document.getElementById("fish-state").style.display = "none";
}

function hideFeed(){
  document.getElementById("fish-feed").style.display = "none";
}

function onPlay(){
   if(!dead){
   var currPlay = new Date();
   if(!firstPlay){
   	var seconds = (currPlay.getTime() - lastPlay.getTime()) / 1000;
   	if(seconds > 3){
   	  fish_happiness += 2;
   	  fish_health+=1;
   	  document.getElementById("fish-state").src = "images/happy.png";
   	  document.getElementById("fish-state").style.display = "block";
   	  setTimeout(hideFace, 2000);
   	}else{
   	  fish_happiness -= 1;
   	  document.getElementById("fish-state").src = "images/angry.png";
   	  document.getElementById("fish-state").style.display = "block";
   	  setTimeout(hideFace, 2000);
   	}
   }else{
          firstPlay=false;
      	  fish_happiness += 2;
   	  document.getElementById("fish-state").src = "images/happy.png";
   	  document.getElementById("fish-state").style.display = "block";
   	  setTimeout(hideFace, 2000);
   }
   lastPlay = currPlay;
   document.getElementById("fish-health").value = fish_health;
   document.getElementById("fish-happy").value = fish_happiness;
   }
}

function onFeed(){
  if(!dead){
  var currFeed = new Date();
   if(!firstFeed){
   	var seconds = (currFeed.getTime() - lastFeed.getTime()) / 1000;
   	if(seconds > 6){
   	  fish_happiness += 1;
   	  fish_health += 2;
   	  document.getElementById("fish-feed").style.display = "block";
   	  setTimeout(hideFeed, 1000);
   	  document.getElementById("fish-state").src = "images/happy.png";
   	  document.getElementById("fish-state").style.display = "block";
   	  setTimeout(hideFace, 2000);
   	}else{
   	  fish_happiness -= 1;
   	  fish_health-=3;
   	  document.getElementById("fish-feed").style.display = "block";
   	  setTimeout(hideFeed, 1000);
   	  document.getElementById("fish-state").src = "images/sad.png";
   	  document.getElementById("fish-state").style.display = "block";
   	  setTimeout(hideFace, 2000);
   	}
   }else{
          firstFeed=false;
      	  fish_health+=2;
      	  document.getElementById("fish-feed").style.display = "block";
      	  setTimeout(hideFeed, 1000);
   	  document.getElementById("fish-state").src = "images/happy.png";
   	  document.getElementById("fish-state").style.display = "block";
   	  setTimeout(hideFace, 2000);
   }
   lastFeed = currFeed;
   document.getElementById("fish-health").value = fish_health;
   document.getElementById("fish-happy").value = fish_happiness;
   }
}


