let players;
let recruits;
let teams;


$(document).ready(function(){
    $(".main").html(
    	`<div class="page-title">Welcome to Basketball Manager</div>
    	<div class="page-content">Are you ready for the challenge?</div>
    	
    	<div class="page-continue"><button onclick='startGame()'>Begin game</button></div>`
    	)
});

function startGame(){
	players = new Array();
	players.push(new Player("Joel Berry", {"shooting":8,"handle":7,"defense":5,"rebounding":3,"ethic":6},4));
	players.push(new Player("Theo Pinson", {"shooting":3,"handle":8,"defense":8,"rebounding":7,"ethic":6},4));
	players.push(new Player("Justin Jackson", {"shooting":9,"handle":7,"defense":7,"rebounding":6,"ethic":7},3));
	players.push(new Player("Kennedy Meeks", {"shooting":6,"handle":4,"defense":7,"rebounding":9,"ethic":7},3));
	players.push(new Player("Isaiah Hicks", {"shooting":8,"handle":5,"defense":7,"rebounding":6,"ethic":7},3));


	teams = [];
	teams.push(new Team("Duke",50,0,0));
	teams.push(new Team("Virginia", 80,0,0));
	teams.push(new Team("Louisville", 79,0,0));
	recruitScreen();
}

function recruitScreen(){
	$(".main").html(
    	`<div class="page-title">This year's returning players!</div>` +
    	`<div class="page-content">`
    		+ generatePlayerTable()
    		+ `<div class="page-title">This year's recruiting class. Select those who you want to recruit!</div>`
    		+ generateRecruits() +
    	`</div>`
    	);

	$('form').on('submit', function(e) { //use on if jQuery 1.7+
        e.preventDefault();  //prevent form from submitting
        let data = $("form :input").serializeArray();
        console.log(data); 
        for(entry of data){
        	//console.log(entry.value);
        	players.push(recruits[parseInt(entry.value)]);
        }
        startSeason();
    });
}

let temp;
let day;
let numDays; // Days needed to complete tournament
let halfSize;
let teamsSize;

function startSeason(){
	let yourTeam = new Team("UNC",100,0,0);
	teams.push(yourTeam);

	temp = new Array();
	day = 0;
	temp.push.apply(temp,teams);
	temp.splice(0,1);
	numDays = (teams.length - 1); // Days needed to complete tournament
	halfSize = teams.length / 2;
	teamsSize = temp.length;

	$(".main").html(
    	`<div class="page-title">This year's final roster!</div>` +
    	`<div class="page-content">`
    		+ generatePlayerTable() 
    		+ `<div class="page-continue"><button onclick='playGames()'>Start Season!</button></div>` +
    	`</div>`
    	);
}

function endSeason(){
	updatePlayers()
	$(".main").html(
    	`<div class="page-title">End of Season! Your player's made the following improvements.</div>` +
    	`<div class="page-content">`
    		+ generatePlayerTable() 
    		+ `<div class="page-continue"><button onclick='recruitScreen()'>Start Next Season!</button></div>` +
    	`</div>`
    	);
}

function playGames(){
	if(numDays < day){
		$(".main").html(
    	`<div class="page-title">Current Standings</div>` +
    	`<div class="page-content">`
    		+ generateStandings() 
    		+ `<div class="page-continue"><button onclick='endSeason()'>Season Done</button></div>` +
    	`</div>`
    	);
    	return;
	}

	$(".main").html(
    	`<div class="page-title">Current Standings</div>` +
    	`<div class="page-content">`
    		+ generateStandings() 
    		+ `<div class="page-continue"><button onclick='playGames()'>Play Game</button></div>` +
    	`</div>`
    	);

	console.log("something...")
	var teamIdx = day % teamsSize;
	playGame(temp[teamIdx],teams[0]);


	for (var idx = 1; idx < halfSize; idx++)
	{               
		var firstTeam = temp[(day + idx) % teamsSize];
		var secondTeam = temp[(day  + teamsSize - idx) % teamsSize];
		playGame(firstTeam, secondTeam);
	}
	day++;
}
