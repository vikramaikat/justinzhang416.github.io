// Attributes: jump shot, driving, passing, defense, rebounding, work ethic
function Player(name, attr, year){
	this.name = name;
	this.attr = attr;
  	this.year = year;
}
function Team(name, totalRating, w, l){
  this.name  = name;
  this.totalRating = totalRating;
  this.w = w;
  this.l = l;
}

function updatePlayers(){
	let newRoster = []
	for(player of players){
		if(player.year != 4){
			player.attr["shooting"] += 1;
			newRoster.push(player);
		}
	}
	players = newRoster;
}

function playGame(t1,t2){
	var firstScore = Math.floor(Math.random() * t1.totalRating + .2* t1.totalRating);
	var secondScore = Math.floor(Math.random() * t2.totalRating + .2*t2.totalRating);

	if(firstScore > secondScore){
		t1.w ++
		t2.l++
	}
	else{
		t1.l++
		t2.w++
	}
}

function generatePlayerTable(){
	let str = "<table>";
	let header = "<tr><th>Name</th><th>Shooting</th><th>Handle</th><th>Defense</th><th>Rebounding</th><th>Ethic</th></tr>";
	str = str + header;
	for(player of players){
		let row = "<tr>"
		row += "<td>"+ player.name +"</td>";
		for(let key in player.attr){
			row += "<td>"+ player.attr[key] + "</td>";
		}
		row += "</tr>"
		str = str + row;
	}
	str = str + "</table>";
	// console.log(str);
	return str;
}

function generateRecruits(){

	let str = `<form action="/handleRecruits" method="post">`;
	recruits = [];
	for(let i = 0; i <= 7; i++){
		let r = new Player(i, {"shooting":Math.floor(Math.random() * 10 + 1),"handle":Math.floor(Math.random() * 10 + 1),
			"defense":Math.floor(Math.random() * 10 + 1),"rebounding":Math.floor(Math.random() * 10 + 1),
			"ethic":Math.floor(Math.random() * 10 + 1)},0);
		recruits.push(r);
	}
	str = str + "<table>"

	let header = "<tr><th>Name</th><th>Shooting</th><th>Handle</th><th>Defense</th><th>Rebounding</th><th>Ethic</th><th>Recruit?</th></tr>";
	str = str + header;
	for(let i = 0; i <= 7; i++){
		r = recruits[i];
		let row = "<tr>";
		row += "<td>"+ r.name +"</td>";
		for(let key in r.attr){
			row += "<td>"+ r.attr[key] + "</td>";
		}
		row += `<td> <input type="checkbox" name="recruit" value=`+ i + `> </td>`;
		row += "</tr>";
		str = str + row;
	}
	str = str + "</table>";
	str += `<input type="submit" value="Submit"></form>`;
	return str;
}

function generateStandings(){
	let str = "<table>";
	let header = "<tr><th>Team</th><th>Win</th><th>Loss</th></tr>";
	str = str + header;

	for(team of teams){
		let row = "<tr>"
		row += "<td>"+ team.name +"</td>";
		row += "<td>"+ team.w + "</td>";
		row += "<td>"+ team.l + "</td>";
		row += "</tr>"
		str = str + row;
	}
	str = str + "</table>";
	console.log(str);
	return str;
}