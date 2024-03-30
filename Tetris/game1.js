function Dasht(id, x, y, w, h){
	this.id = "dasht" + id;
	this.x = x;
	this.y = y;
	this.width = w;
	this.heigth = h;
	this.kubId = null;
	this.kubKa = false;
};

function Kub(id, x, y, w, h){
	this.id = "kub" + id;
	this.x = x;
	this.y = y;
	this.width = w;
	this.heigth = h;
	this.dashtumA = false;
};


function DontMove(id, x, y, kId, idN) {
	this.dashtId = id;
	this.dashtX = x;
	this.dashtY = y;
	this.kubId = "kub" + kId;
	this.dashtIdNumber = idN;
}


function generateDasht() {
	var dashter = [];
	var id = 0;
	for(var y = 760; y >= 0; y = y - 40) {
		for(var x = 0; x <= 560; x = x + 40) {
			dashter.push(new Dasht(id, x, y, 40, 40));
			id++;
		}
	}
	return dashter;
}

function generateKub() {
	var kuber = [];
	kuber.push(new Kub(0, 280, 0, 40, 40));
	
	return kuber;
}

function goLeft(kubX) {
	kubX = kubX - 40;
	return kubX;
}
function goRigth(kubX) {
	kubX = kubX + 40;
	return kubX;
}
function goDown(kubY) {
	kubY = kubY + 40;
	return kubY;
}