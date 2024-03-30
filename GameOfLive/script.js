const delta = 5;
const n = 4 * delta, m = 8 * delta, side = 200 / delta;
var matrix = [], grasses = [], grassEaters = [], predators = [];
var spawners = [], soliders = [];
var mage = null, shit = null, granat = null;
var colors = ["#acacac", "green", "yellow", "red", "blue", "black", "#0972C3", "#00FFF7", "#FF8C00"];
//0-datark,1-xot,2-xotaker,3-gishatich,4-mag,5-spawner,6-zinvor,7-shit,8-granat

var obshyak = [
	[],
	grasses,
	grassEaters,
	predators,
	[],
	spawners,
	soliders
];

getRandomMatrix();

//console.log(matrix);
//console.log(grasses);

function getRandomMatrix2()
{
	for(var i = 0; i < n; i++)
	{
		matrix[i] = [];
		for(var j = 0; j < m; j++)
		{
			var a = 0;//0-1
			
			if(i == 2)
				var a = 1;
			if(i == 3 && j == 4)
				var a = 2;
						
			matrix[i][j] = a;
			if(a == 1)
			{
				grasses.push(new Grass(i, j, a));				
			}
			if(a == 2)
			{
				grassEaters.push(new GrassEater(i, j, a));				
			}
		}
	}
}

function getRandomMatrix()
{
	var spCounter = 1;
	for(var i = 0; i < n; i++)
	{
		matrix[i] = [];
		for(var j = 0; j < m; j++)
		{
			var a = Math.floor(Math.random() * 100);//0-99
			if(j == 1 && i == parseInt(n/2))
			{
				matrix[i][j] = 4;
				mage = new Mage(i, j, 4);
			}
			else if((j >= 0 && j <= 3) && (i >= parseInt(n/2) - 2 && i <= parseInt(n/2) + 2))
			{
				matrix[i][j] = 0;
			}
			else if((j == m - 1 && (i == parseInt(n/2) || i == parseInt(n/2) - 1))
				|| (j == m - 2 && (i == parseInt(n/2) || i == parseInt(n/2) - 1)))
			{
				spawners.push(new spawner(i, j, 5, spCounter++));
				matrix[i][j] = 5;
			}
			else if(a < 14)
			{
				grasses.push(new Grass(i, j, 1));		
				matrix[i][j] = 1;				
			}
			else if(a == 14)
			{
				grassEaters.push(new GrassEater(i, j, 2));
				matrix[i][j] = 2;
			}
			else if(a == 15)
			{
				predators.push(new Predator(i, j, 3));
				matrix[i][j] = 3;
			}
			else
			{
				matrix[i][j] = 0;
			}
		}
	}
}

function setup() {
   frameRate(20);
   createCanvas(matrix[0].length * side, matrix.length * side);
   background('#acacac');
   drawMatrix();
	
}
const defRate = 10;
var myRate = defRate, granatCounter = 0, granatRate = 0;
function draw()
{
	drawMatrix();	
	if(myRate-- <= 0)
	{
		//console.log(grasses,1);
		myRate = defRate
		for(var i in grasses)
		{
			grasses[i].mul();
		}	
		for(var i in grassEaters)
		{
			grassEaters[i].move();
		}
		for(var i in predators)
		{
			predators[i].move();
		}
		for(var i in soliders)
		{
			soliders[i].move();
		}
		for(var i in spawners)
		{
			spawners[i].spawn();
		}
	}	
	
	if(shit != null)
	{
		shit.move();
	}
	
	if(mage != null)
	{
		if(keyNumber > 0)
		{
			if(keyNumber == 10)
			{
				mage.attack();
			}
			else if(keyNumber == 5)
			{
				if( granatCounter >= defRate * 4)//vor else chmtni
				{
					granatCounter = 0;
					mage.granatQci();
				}
			}
			else
			{
				mage.move(keyNumber);
			}
			keyNumber = 0;
		}
	}
	else
	{
		if(shit != null)
			shit.die();
	}
	if(granat != null && ++granatRate == 2)
	{
		granatRate = 0;
		granat.live();
	}
	granatCounter++;
}

var keyNumber = 0;

function drawMatrix() 
{
   for (var i = 0; i < n; i++) 
   {
		for (var j = 0; j < m; j++) 
		{
		   fill(colors[matrix[i][j]]);
		   
		   rect(j * side, i * side, side, side);    
		}
   }
}

function keyPressed() 
{
	if(key == "ArrowDown")
	{
		keyNumber = 4;
	}
	else if(key == "ArrowUp")
	{
		keyNumber = 3;
	}
	else if(key == "ArrowLeft")
	{
		keyNumber = 2;
	}
	else if(key == "ArrowRight")
	{
		keyNumber = 1;
	}
	else if(key == " ")
	{
		keyNumber = 10;
	}
	else if(key == "g")
	{
		keyNumber = 5;
	}
	else
	{
		keyNumber = 0;
	}
}

















//:::