const defaultMulEnergy_G = 8;
class Grass{
    constructor(i, j, index) {
       this.i = i;
       this.j = j;
       this.index = index;
       this.multiply = 0;
    }
	
	getDirections()
	{
		var directions = [
			[this.i - 1, this.j - 1],
			[this.i    , this.j - 1],
			[this.i + 1, this.j - 1],
			[this.i - 1, this.j    ],
			[this.i + 1, this.j    ],
			[this.i - 1, this.j + 1],
			[this.i    , this.j + 1],
			[this.i + 1, this.j + 1]
			];
		return directions;
	}
	
	mul()
	{
		this.multiply++;
		//console.log(this.multiply);
		
		if(this.multiply >= defaultMulEnergy_G)
		{
			var newCell = random(this.chooseCell(0));
			
			if(newCell)
			{
				//console.log(newCell);
				
				this.multiply = 0;
				
				grasses.push(new Grass(newCell[0], newCell[1], this.index));
				
				matrix[newCell[0]][newCell[1]] = this.index;
			}
		}
	}
	
	chooseCell(character) 
	{
		var found = [];
		var arr = this.getDirections();
		for (var k in arr) 
		{
		   var i = arr[k][0];
		   var j = arr[k][1];
		   if(matrix[i] == undefined || matrix[i][j] == undefined)
				continue;
	   
		   if (matrix[i][j] == character) 
		   {
			   found.push(arr[k]);
		   }
		}
		return found;
	}
}

const defaultEnergy_GE = 8, defaultMulEnergy_GE = 12;
class GrassEater{	
    constructor(i, j, index) {
       this.i = i;
       this.j = j;
       this.index = index;
       this.energy = defaultEnergy_GE;
    }
	
	getDirections()
	{
		var directions = [
			[this.i - 1, this.j - 1],
			[this.i    , this.j - 1],
			[this.i + 1, this.j - 1],
			[this.i - 1, this.j    ],
			[this.i + 1, this.j    ],
			[this.i - 1, this.j + 1],
			[this.i    , this.j + 1],
			[this.i + 1, this.j + 1]
			];
		return directions;
	}	

	eat(food, arr, energy)
	{
		var newPos = random(food);
			
		for(var i in arr)
		{
			if(arr[i].i == newPos[0] && arr[i].j == newPos[1])
			{
				arr.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
		
		this.i = newPos[0];
		this.j = newPos[1];
		
		matrix[this.i][this.j] = this.index;
		
		this.energy += energy;
	}

	move()
	{
		this.energy--;
		var nearGrasses = this.chooseCell(1);
		var nearCells = this.chooseCell(0);
		if(nearGrasses.length > 0)
		{					
			this.eat(nearGrasses, grasses, 2);
		}
		else if(nearCells.length > 0)
		{
			this.eat(nearCells, [], 0)
		}
		
		if(this.energy == 0)
		{
			this.die();
		}
		
		if(this.energy >= defaultMulEnergy_GE)
		{
			this.mul();
			this.energy = defaultEnergy_GE;
		}
	}
	
	mul()
	{		
		var newCell = random(this.chooseCell(0));
		if(newCell)
		{
			//console.log(newCell);
			
			grassEaters.push(new GrassEater(newCell[0], newCell[1], this.index));
			
			matrix[newCell[0]][newCell[1]] = this.index;
		}
	}
	
	die()
	{
		for(var i in grassEaters)
		{
			if(grassEaters[i].i == this.i && grassEaters[i].j == this.j)
			{
				grassEaters.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
	}
	
	chooseCell(character) 
	{
		var found = [];
		var arr = this.getDirections();
		for (var k in arr) 
		{
		   var i = arr[k][0];
		   var j = arr[k][1];
		   if(matrix[i] == undefined || matrix[i][j] == undefined)
				continue;
	   
		   if (matrix[i][j] == character) 
		   {
			   found.push(arr[k]);
		   }
		}

		return found;
	}
}

const defaultEnergy_P = 30, defaultMulEnergy_P = 40, grassPeredoz = 50;
class Predator{	
    constructor(i, j, index) {
       this.i = i;
       this.j = j;
       this.index = index;
       this.energy = defaultEnergy_P;
       this.eatGrass = 0;
    }
	
	getDirections()
	{
		var directions = [
			[this.i - 1, this.j - 1],
			[this.i    , this.j - 1],
			[this.i + 1, this.j - 1],
			[this.i - 1, this.j    ],
			[this.i + 1, this.j    ],
			[this.i - 1, this.j + 1],
			[this.i    , this.j + 1],
			[this.i + 1, this.j + 1]
			];
		return directions;
	}	

	move()
	{
		this.energy--;
		var nearGrassEaters = this.chooseCell(2);
		var nearGrasses = this.chooseCell(1);
		var nearCells = this.chooseCell(0);
		var mageCell = this.chooseCell(4);

		if(nearGrassEaters.length > 0)
		{					
			this.eat(nearGrassEaters, grassEaters, 5);
			this.eatGrass = 0;
		}
		else if(mageCell.length > 0)
		{
			this.energy += 50;
			matrix[this.i][this.j] = 0;
			this.i = mage.i; this.j = mage.j;
			matrix[this.i][this.j] = this.index;
			mage = null;
		}
		else if(nearGrasses.length > 0)
		{
			this.eat(nearGrasses, grasses, 1);
			this.eatGrass++;
		}
		else if(nearCells.length > 0)
		{
			this.eat(nearCells, [], 0)
		}
		
		if(this.energy == 0 || this.eatGrass == grassPeredoz)
		{
			this.die();
		}
		
		if(this.energy >= defaultMulEnergy_P)
		{
			this.mul();
			this.energy = defaultEnergy_P;
		}
	}
	
	eat(food, arr, energy)
	{
		var newPos = random(food);
			
		for(var i in arr)
		{
			if(arr[i].i == newPos[0] && arr[i].j == newPos[1])
			{
				arr.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
		
		this.i = newPos[0];
		this.j = newPos[1];
		
		matrix[this.i][this.j] = this.index;
		
		this.energy += energy;
	}
	
	mul()
	{		
		var newCell = random(this.chooseCell(0));
		if(newCell)
		{
			//console.log(newCell);
			
			predators.push(new Predator(newCell[0], newCell[1], this.index));
			
			matrix[newCell[0]][newCell[1]] = this.index;
		}
	}
	
	die()
	{
		for(var i in predators)
		{
			if(predators[i].i == this.i && predators[i].j == this.j)
			{
				predators.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
	}
	
	chooseCell(character) 
	{
		var found = [];
		var arr = this.getDirections();
		for (var k in arr) 
		{
		   var i = arr[k][0];
		   var j = arr[k][1];
		   if(matrix[i] == undefined || matrix[i][j] == undefined)
				continue;
	   
		   if (matrix[i][j] == character) 
		   {
			   found.push(arr[k]);
		   }
		}

		return found;
	}
}

const defaultEnergy_SP = 50, delta_SP = 5;
class spawner{	
    constructor(i, j, index, k) {
       this.i = i;
       this.j = j;
       this.index = index;
       this.energy = defaultEnergy_SP - k*delta_SP;
    }
	
	getDirections()
	{
		var directions = [
			[this.i - 1, this.j - 1],
			[this.i    , this.j - 1],
			[this.i + 1, this.j - 1],
			[this.i - 1, this.j    ],
			[this.i + 1, this.j    ],
			[this.i - 1, this.j + 1],
			[this.i    , this.j + 1],
			[this.i + 1, this.j + 1]
			];
		return directions;
	}	

	spawn()
	{
		this.energy++;
		
		if(this.energy >= defaultEnergy_SP)
		{
			var rndCell = random(this.chooseCell(0));
			
			if(rndCell)
			{
				this.energy = 0;
				soliders.push(new Solider(rndCell[0], rndCell[1], 6));
				matrix[rndCell[0]][rndCell[1]] = 6;
			}
			else
			{
				var rndGrass = random(this.chooseCell(1));
				if(rndGrass)
				{
					this.energy = 0;
					for(var i in grasses)
					{
						if(grasses[i].i == rndGrass[0] && grasses[i].j == rndGrass[1])
						{
							grasses.splice(i, 1);
							break;
						}
					}
					soliders.push(new Solider(rndGrass[0], rndGrass[1], 6));
					matrix[rndGrass[0]][rndGrass[1]] = 6;
				}
			}
			
		}
	}
	
	chooseCell(character) 
	{
		var found = [];
		var arr = this.getDirections();
		for (var k in arr) 
		{
		   var i = arr[k][0];
		   var j = arr[k][1];
		   if(matrix[i] == undefined || matrix[i][j] == undefined)
				continue;
	   
		   if (matrix[i][j] == character) 
		   {
			   found.push(arr[k]);
		   }
		}

		return found;
	}
}

const health_S = 250;
class Solider{	
    constructor(i, j, index) {
       this.i = i;
       this.j = j;
       this.index = index;
       this.health = health_S;
    }
	
	getDirections()
	{
		var directions = [
			[this.i - 1, this.j - 1],
			[this.i    , this.j - 1],
			[this.i + 1, this.j - 1],
			[this.i - 1, this.j    ],
			[this.i + 1, this.j    ],
			[this.i - 1, this.j + 1],
			[this.i    , this.j + 1],
			[this.i + 1, this.j + 1]
			];
		return directions;
	}	

	move()
	{
		this.health--;
		if(this.health == 0)
		{
			this.die();
			return
		}
		
		var nearMage = this.chooseMage();

		if(nearMage.length > 0)
		{				
			matrix[this.i][this.j] = 0;
			matrix[mage.i][mage.j] = this.index;
			this.i = mage.i; this.j = mage.j;			
			mage = null;
		}
		else
		{
			var pos = random(this.chooseCell());			
			if(pos)
			{
				var index = matrix[pos[0]][pos[1]];
				this.destroy(pos, index);
			}
		}
	}
	
	destroy(pos, index)
	{
		var arr = [];
		if(index == 1)
		{
			arr = grasses;
		}
		else if(index == 2)
		{
			arr = grassEaters;
		}
		else if(index == 3)
		{
			arr = predators;
		}
	
		for(var i in arr)
		{
			if(arr[i].i == pos[0] && arr[i].j == pos[1])
			{
				arr.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
		
		this.i = pos[0];
		this.j = pos[1];
		
		matrix[this.i][this.j] = this.index;
	}
	
	die()
	{
		for(var i in soliders)
		{
			if(soliders[i].i == this.i && soliders[i].j == this.j)
			{
				soliders.splice(i, 1);
				break;
			}
		}
		
		matrix[this.i][this.j] = 0;
	}
	
	chooseCell() 
	{
		var found = [];
		var arr = this.getDirections();
		for (var k in arr) 
		{
		   var i = arr[k][0];
		   var j = arr[k][1];
		   if(matrix[i] == undefined || matrix[i][j] == undefined)
				continue;
	   
		   if (matrix[i][j] <= 3) 
		   {
			   found.push(arr[k]);
		   }
		}

		return found;
	}
	chooseMage() 
	{
		var found = [];
		var arr = this.getDirections();
		for (var k in arr) 
		{
		   var i = arr[k][0];
		   var j = arr[k][1];
		   if(matrix[i] == undefined || matrix[i][j] == undefined)
				continue;
	   
		   if (matrix[i][j] == 4) 
		   {
			   found.push(arr[k]);
		   }
		}

		return found;
	}
}

class Mage
{
	constructor(i, j, index)
	{
		this.i = i;
		this.j = j;
		this.index = index;
	}
	
	getDirections(i, j)
	{
		var directions = [
			[i-2, j-1],
			[i-2, j],
			[i-2, j+1],
			[i-1, j+2],
			[i, j+2],
			[i+1, j+2],
			[i+2, j+1],
			[i+2, j],
			[i+2, j-1],
			[i+1, j-2],
			[i, j-2],
			[i-1, j-2]
			];
		return directions;
	}
	
	granatDirection(i, j)
	{
		var direction = [
			[i-4, j],
			[i-4, j+1],
			[i-4, j+2],
			[i-3, j+3],
			[i-2, j+4],
			[i-1, j+4],
			[i, j+4],
			[i+1, j+4],
			[i+2, j+4],
			[i+3, j+3],
			[i+4, j+2],
			[i+4, j+1],
			[i+4, j],
			[i+4, j-1],
			[i+4, j-2],
			[i+3, j-3],
			[i+2, j-4],
			[i+1, j-4],
			[i, j-4],
			[i-1, j-4],
			[i-2, j-4],
			[i-3, j-3],
			[i-4, j-2],
			[i-4, j-1],
			];
		var arr = [];
		for(var k in direction)
		{
			var a = direction[k][0];
			var b = direction[k][1];
			if(matrix[a] == undefined || matrix[a][b] == undefined)
				continue;
			arr.push(direction[k]);
		}
		return arr;
	}
	
	goTo(newPos)
	{
		if(matrix[newPos[0]] == undefined || matrix[newPos[0]][newPos[1]] == undefined)
			return;
		
		var index = matrix[newPos[0]][newPos[1]];
		if(index == 0)
		{
			matrix[this.i][this.j] = 0;
			this.i = newPos[0]; this.j = newPos[1];
			matrix[this.i][this.j] = this.index;
		}
		else if(index == 1)
		{
			matrix[this.i][this.j] = 0;
			this.i = newPos[0]; this.j = newPos[1];
			matrix[this.i][this.j] = this.index;
			for(var i in grasses)
			{
				if(grasses[i].i == this.i && grasses[i].j == this.j)
				{
					grasses.splice(i, 1);
				}
			}
		}
		else if(index == 8)
		{
			matrix[this.i][this.j] = 0;
			mage = null;
		}
	}
	
	move(put)
	{
		if(shit != null)
			shit.die();
		
		if(put == 1)//aj
		{
			this.goTo([this.i, this.j + 1]);
		}
		else if(put == 2)//dzax
		{
			this.goTo([this.i, this.j - 1]);
		}
		else if(put == 3)//verev
		{
			this.goTo([this.i - 1, this.j]);
		}
		else if(put == 4)//nerqev
		{
			this.goTo([this.i + 1, this.j]);
		}
	}
	
	granatQci()
	{
		var rndPos = random(this.granatDirection(this.i, this.j));
		if(rndPos)
		{
			var index = matrix[rndPos[0]][rndPos[1]];
			for(var i in obshyak[index])
			{
				if(obshyak[index][i].i == rndPos[0] && obshyak[index][i].j == rndPos[1])
					obshyak[index].splice(i, 1);
			}
			matrix[rndPos[0]][rndPos[1]] = 8;
			granat = new Granat(rndPos[0], rndPos[1], 8);
		}
	}
	
	attack()
	{		
		if(shit != null)
			shit.die();
		
		var rndPos = random(this.chooseCell());
		if(rndPos)
		{
			var index = matrix[rndPos[0]][rndPos[1]];
			for(var i in obshyak[index])
			{
				if(obshyak[index][i].i == rndPos[0] && obshyak[index][i].j == rndPos[1])
				{
					obshyak[index].splice(i, 1);
					break;
				}
			}
			matrix[rndPos[0]][rndPos[1]] = 7;
			shit = new Shit(rndPos[0], rndPos[1], 7, this.i, this.j);
		}
	}
	
	chooseCell() 
	{
		var found = [];
		var arr = this.getDirections(this.i, this.j);
		for (var k in arr) 
		{
		   var i = arr[k][0];
		   var j = arr[k][1];
		   if(!(matrix[i] == undefined || matrix[i][j] == undefined))
		   {
				found.push(arr[k]);
		   }
		}

		return found;
	}
}

class Shit
{
	constructor(i1, j1, index, i, j)
	{
		this.i = i1;
		this.j = j1;
		this.index = index;
		this.transform = [
			[i-2, j-1],
			[i-2, j],
			[i-2, j+1],
			[i-1, j+2],
			[i, j+2],
			[i+1, j+2],
			[i+2, j+1],
			[i+2, j],
			[i+2, j-1],
			[i+1, j-2],
			[i, j-2],
			[i-1, j-2]
		]
		this.p = 0;
		for(var k in this.transform)
		{
			if(this.transform[k][0] == this.i && this.transform[k][1] == this.j)
			{
				this.p = k;
				break;
			}
		}
	}
	
	move()
	{
		matrix[this.i][this.j] = 0;	
		
		if(this.p == this.transform.length - 1)
			this.p = 0;
		else
			this.p++;

		var i = this.transform[this.p][0];
		var j = this.transform[this.p][1];
		if(matrix[i] == undefined || matrix[i][j] == undefined
		|| matrix[i][j] == 8)
		{
			shit = null;
		}
		else
		{
			var index = matrix[i][j];
			
			for(var k in obshyak[index])
			{
				if(obshyak[index][k].i == i && obshyak[index][k].j == j)
				{
					obshyak[index].splice(k, 1);
				}
			}
			this.i = i; this.j = j;
			matrix[i][j] = this.index;		
		}
	}
	die()
	{
		matrix[this.i][this.j] = 0;	
		shit = null;
	}
}

class Granat
{
	constructor(a, b, index)
	{
		this.i = a;
		this.j = b;
		this.index = index;
		this.res1 = []; this.res2 = [];
		this.res25 = [];
		this.res = 0;
		//console.log(a, b);
		for(var i = a - 3; i <= a + 3; i++)
		{
			for(var j = b - 3; j <= b + 3; j++)
			{
				if((matrix[i] == undefined || matrix[i][j] == undefined)
					|| (i == a && j == b))
					continue;
				
				if((i >= a-1 && i <= a+1) && (j >= b-1 && j <= b+1))
				{
					this.res1.push([i, j]);
				}
				else if(
				(i == a-2 && (j >= b-1 && j <= b+1))||
				(i == a+2 && (j >= b-1 && j <= b+1))||
				(j == b-2 && (i >= a-1 && i <= a+1))||
				(j == b+2 && (i >= a-1 && i <= a+1))
				)
				{
					this.res25.push([i, j]);
				}
				else if(!(
				(j == b-3 &&(i == a-3 || i == a-2 || i== a+3 || i==a+2))||
				(j == b+3 &&(i == a-3 || i == a-2 || i== a+3 || i==a+2))||
				(i == a - 3 && (j == b-2 || j==b+2))||
				(i == a + 3 && (j == b-2 || j==b+2))
				))
				{
					this.res2.push([i, j]);
				}
			}
		}
		//console.log(this.res1);
		//console.log(this.res2);
	}
	
	drawVzryv(arr)
	{
		for(var j in arr)
			{
				var index = matrix[arr[j][0]][arr[j][1]];
				if(index == 4)
				{
					mage = null;
				}
				else if(index == 7)
				{
					shit.die();
				}
				else
				{
					for(var i in obshyak[index])
					{
						if(obshyak[index][i].i == arr[j][0] && obshyak[index][i].j == arr[j][1])
						{
							obshyak[index].splice(i, 1);
							break;
						}
					}
				}
				matrix[arr[j][0]][arr[j][1]] = this.index;
			}
	}
	removeVzryv(arr)
	{
		for(var j in arr)
			{				
				matrix[arr[j][0]][arr[j][1]] = 0;
			}
	}
	
	live()
	{
		this.res++;
		if(this.res == 1)
		{
			this.drawVzryv(this.res1);
		}
		else if(this.res == 2)
		{
			this.drawVzryv(this.res25);
		}
		else if(this.res == 3)
		{
			this.drawVzryv(this.res2);
		}
		else if(this.res == 4)
		{
			matrix[this.i][this.j] = 0;
		}
		else if(this.res == 5)
		{
			this.removeVzryv(this.res1);
		}
		else if(this.res == 6)
		{
			this.removeVzryv(this.res25);
		}
		else if(this.res == 7)
		{
			this.removeVzryv(this.res2);
			granat = null;
		}
	}
}
























//:::