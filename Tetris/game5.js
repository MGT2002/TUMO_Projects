$(function(){
	var platform = $("<div/>").appendTo("body").attr("id", "platform");
	var scoreD = $("<div/>").appendTo("body").attr("id", "score");
	var score = 0;
	scoreD.text("SCORE: " + score);
	
	var levelD = $("<div/>").appendTo("body").attr("id", "level");
	var level = 1;
	levelD.text("LEVEL: " + level);
	
	var intervalTime = 1000;
		
	alert("START");
	alert("SHARJUM:  a, s, d, \n pttel: w")
	
	var dir = {tar: 0};
	var dashter = generateDasht();
	var kuber = [];
	var kubId = 0;
	var kubNumberSkizb = 4;
	var dontMoveD = [];
	var kubSarqec = 0;
	var kubSarqelCounter = 0;
	var randomNumber = null;
	
	var dirq = 0;
	
	$("html").keydown(kod);
	
	function kod(e) {
		dir.tar = e.key;
	}
		
	for(var i in dashter) {
		var div = $("<div/>").attr("class", "dasht").attr("id", dashter[i].id)
		div.css("left", dashter[i].x).css("top", dashter[i].y);
		div.appendTo(platform);
	}
	
	function norKub() {
		var x = Math.floor((Math.random() * 6) + 1);
		randomNumber = x;
		
		for(var i = 0; i < kubNumberSkizb; i++) {
			kubSarqel(x);
			
			var div = $("<div/>").attr("id", kuber[kubId].id);
			
			if(x == 1) {
				div.attr("class", "kub");
			}
			else if(x == 2) {
				div.attr("class", "karmir");
			}
			else if(x == 3) {
				div.attr("class", "dexin");
			}
			else if(x == 4) {
				div.attr("class", "kanach");
			}
			else if(x == 5) {
				div.attr("class", "fika");
			}
			else {
				div.attr("class", "oka");
			}
			
			div.css("left", kuber[kubId].x).css("top", kuber[kubId].y);
			div.appendTo(platform);
			
			kubId++;
		}
	}
	norKub();
	
	function kubSarqel(r) {
		if(kubSarqelCounter != 4) {
			if(r == 1) {
				if(kubSarqelCounter == 0) {
					kuber.push(new Kub(kubId, 280, 0, 40, 40));
				}
				if(kubSarqelCounter == 1) {
					kuber.push(new Kub(kubId, 280, 40, 40, 40));
				}
				if(kubSarqelCounter == 2) {
					kuber.push(new Kub(kubId, 320, 0, 40, 40));
				}
				if(kubSarqelCounter == 3) {
					kuber.push(new Kub(kubId, 320, 40, 40, 40));
				}
				//kub
			}
			if(r == 2) {
				if(kubSarqelCounter == 0) {
					kuber.push(new Kub(kubId, 280, 0, 40, 40));
				}
				if(kubSarqelCounter == 1) {
					kuber.push(new Kub(kubId, 280, 40, 40, 40));
				}
				if(kubSarqelCounter == 2) {
					kuber.push(new Kub(kubId, 280, 80, 40, 40));
				}
				if(kubSarqelCounter == 3) {
					kuber.push(new Kub(kubId, 280, 120, 40, 40));
				}
				//uxix
			}
			if(r == 3) {
				if(kubSarqelCounter == 0) {
					kuber.push(new Kub(kubId, 280, 0, 40, 40));
				}
				if(kubSarqelCounter == 1) {
					kuber.push(new Kub(kubId, 320, 0, 40, 40));
				}
				if(kubSarqelCounter == 2) {
					kuber.push(new Kub(kubId, 280, 40, 40, 40));
				}
				if(kubSarqelCounter == 3) {
					kuber.push(new Kub(kubId, 280, 80, 40, 40));
				}
				//G
			}
			if(r == 4) {
				if(kubSarqelCounter == 0) {
					kuber.push(new Kub(kubId, 280, 0, 40, 40));
				}
				if(kubSarqelCounter == 1) {
					kuber.push(new Kub(kubId, 240, 0, 40, 40));
				}
				if(kubSarqelCounter == 2) {
					kuber.push(new Kub(kubId, 280, 40, 40, 40));
				}
				if(kubSarqelCounter == 3) {
					kuber.push(new Kub(kubId, 280, 80, 40, 40));
				}
				//-G
			}
			if(r == 5) {
				if(kubSarqelCounter == 0) {
					kuber.push(new Kub(kubId, 240, 0, 40, 40));
				}
				if(kubSarqelCounter == 1) {
					kuber.push(new Kub(kubId, 280, 0, 40, 40));
				}
				if(kubSarqelCounter == 2) {
					kuber.push(new Kub(kubId, 280, 40, 40, 40));
				}
				if(kubSarqelCounter == 3) {
					kuber.push(new Kub(kubId, 320, 40, 40, 40));
				}
				//Z
			}
			if(r == 6) {
				if(kubSarqelCounter == 0) {
					kuber.push(new Kub(kubId, 280, 0, 40, 40));
				}
				if(kubSarqelCounter == 1) {
					kuber.push(new Kub(kubId, 280, 40, 40, 40));
				}
				if(kubSarqelCounter == 2) {
					kuber.push(new Kub(kubId, 320, 40, 40, 40));
				}
				if(kubSarqelCounter == 3) {
					kuber.push(new Kub(kubId, 240, 40, 40, 40));
				}
				//_I_
			}
		}
		kubSarqelCounter++;
		if(kubSarqelCounter == 4) {kubSarqelCounter = 0;}
	}
	
	function colision() {
		switch(dir.tar) {
			case "a": 
				var kubKaDontMoveA = false;
				for(var i11 = 1; i11 < kubNumberSkizb +1; i11++) {
					for(var i1 in dontMoveD) {
						if((kuber[kubId-i11].x - dontMoveD[i1].dashtX == 40) &&
							kuber[kubId-i11].y == dontMoveD[i1].dashtY){
							kubKaDontMoveA = true;
							break;
						}
					}
					if(kuber[kubId-i11].x == 0) {
						kubKaDontMoveA = true;
						break;
					}
					if(kubKaDontMoveA == true) {
						break;
					}
				}
				
				if(!(kubKaDontMoveA)) {
					for(var i12 = 1; i12 < kubNumberSkizb +1; i12++) {
						kuber[kubId-i12].x = goLeft(kuber[kubId-i12].x);
						$("#" + kuber[kubId -i12].id).css("left", kuber[kubId-i12].x)
					}
					kuberColisionA();
					kuberNkarelCA();
				}
				
				var kCACounter = 1;
				function kuberColisionA() {
					for(var i13 = 1; i13 < kubNumberSkizb +1; i13++) {
						for(var i in dontMoveD) {
							if(dontMoveD[i].dashtX == kuber[kubId-i13].x &&
							(dontMoveD[i].dashtY - kuber[kubId-i13].y == 40)) {
								kCACounter = 0;
								return kCACounter;
							}
						}
					}
				}
				function kuberNkarelCA() {
					if(kCACounter == 0) {
						kCACounter = 1;
						for(var i14 = 1; i14 < kubNumberSkizb +1; i14++) {
							kubTexadrel(dashter, kuber[kubId-i14].y, kuber[kubId-i14].x, (kubId -i14));
						}
					}
				}
								
				dir.tar = 0;
				break;
			case "d":
				var kubKaDontMoveD = false;
				for(var i21 = 1; i21 < kubNumberSkizb +1; i21++) {
					for(var i2 in dontMoveD) {
						if((kuber[kubId-i21].x - dontMoveD[i2].dashtX == -40) &&
							kuber[kubId-i21].y == dontMoveD[i2].dashtY){
							kubKaDontMoveD = true;
						}
					}
					if(kuber[kubId-i21].x == 560) {
						kubKaDontMoveD = true;
					}
					if(kubKaDontMoveD == true) {
						break;
					}
				}
				
				if(!(kubKaDontMoveD)) {
					for(var i22 = 1; i22 < kubNumberSkizb +1; i22++) {
						kuber[kubId-i22].x = goRigth(kuber[kubId-i22].x);
						$("#" + kuber[kubId -i22].id).css("left", kuber[kubId-i22].x)
					}
					kuberColisionD();
					kuberNkarelCD();
				}
				
				var kCDCounter = 1;
				function kuberColisionD() {
					for(var i23 = 1; i23 < kubNumberSkizb +1; i23++) {
						for(var i in dontMoveD) {
							if(dontMoveD[i].dashtX == kuber[kubId-i23].x &&
							(dontMoveD[i].dashtY - kuber[kubId-i23].y == 40)) {
								kCDCounter = 0;
								return kCDCounter;
							}
						}
					}
				}
				
				function kuberNkarelCD() {
					if(kCDCounter == 0) {
						kCDCounter = 1;
						for(var i24 = 1; i24 < kubNumberSkizb +1; i24++) {
							kubTexadrel(dashter, kuber[kubId-i24].y, kuber[kubId-i24].x, (kubId -i24));
						}
					}
				}
				dir.tar = 0;
				break;
			case "s":
				var kubKaDontMoveS = false;
				for(var i31 = 1; i31 < kubNumberSkizb +1; i31++) {
					for(var i in dontMoveD) {
						if(dontMoveD[i].dashtX == kuber[kubId-i31].x &&
						(dontMoveD[i].dashtY - kuber[kubId-i31].y == 40)) {
							kubKaDontMoveS = true;
							break;
						}
					}
					if(kubKaDontMoveS) {
						break;
					}
					if(kuber[kubId-i31].y !== 760) { 
						kubKaDontMoveS = false;
					}
					else {
						kubKaDontMoveS = true;
						break;
					}
				}
				if(!kubKaDontMoveS) {
					for(var i32 = 1; i32 < kubNumberSkizb +1; i32++) {
						kuber[kubId-i32].y = goDown(kuber[kubId-i32].y);
						$("#" + kuber[kubId -i32].id).css("top", kuber[kubId-i32].y);
					}
				}
				var kuberyKpelen = false;
				for(var i33 = 1; i33 < kubNumberSkizb +1; i33++) {
					if(kuber[kubId-i33].y == 760) {
						kuberyKpelen = true;
					}
					for(var i in dontMoveD) {
						if(dontMoveD[i].dashtX == kuber[kubId-i33].x &&
						(dontMoveD[i].dashtY - kuber[kubId-i33].y == 40)) {
							kuberyKpelen = true;
							break;
						}
					}
				}
				if(kuberyKpelen) {
					for(var i34 = 1; i34 < kubNumberSkizb +1; i34++) {
						kubTexadrel(dashter, kuber[kubId-i34].y, kuber[kubId-i34].x, (kubId -i34));
					}
				}
				if(dashter[277].kubKa) {
					alert("GAME OVER!!!");
					$("body").empty();
					clearInterval(interval);
					clearInterval(intervalS);
					var scoreD = $("<div/>").appendTo("body").attr("id", "score");
					var levelD = $("<div/>").appendTo("body").attr("id", "level");
					scoreD.text("SCORE: " + score);
					levelD.text("LEVEL: " + level);
				}
				dir.tar = 0;
				
				colisionTox();
				break;
			case "w": 
				var kubKaDontMoveW = false;
				if(randomNumber == 2) {
					if(dirq == 0) {
						for(var i41 = 1; i41 < kubNumberSkizb; i41++) {
							for(var i1 in dontMoveD) {
								if((kuber[kubId-i41].x + (160 - i41*40) == dontMoveD[i1].dashtX) &&
									(kuber[kubId-i41].y - (160 - i41*40) == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
								
							}
							if(kuber[kubId-i41].x == (440 + i41*40)) {
								kubKaDontMoveW = true;
								break;
							}
							if(kubKaDontMoveW == true) {
								break;
							}
						}
						if(!kubKaDontMoveW) {
							for(var i42 = 1; i42 < kubNumberSkizb; i42++) {
								kuber[kubId-i42].x = kuber[kubId-i42].x + (160 - i42*40);
								kuber[kubId-i42].y = kuber[kubId-i42].y - (160 - i42*40);
								$("#" + kuber[kubId -i42].id).css("left", kuber[kubId-i42].x)
								$("#" + kuber[kubId -i42].id).css("top", kuber[kubId-i42].y);
							}
							dirq = 1;
						}
					}
					else if(dirq == 1) {
						for(var i41 = 1; i41 < kubNumberSkizb; i41++) {
							for(var i1 in dontMoveD) {
								if((kuber[kubId-i41].x - (160 - i41*40) == dontMoveD[i1].dashtX) &&
									(kuber[kubId-i41].y + (160 - i41*40) == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
								
							}
							if(kuber[kubId-i41].y >= 680) {
								kubKaDontMoveW = true;
								break;
							}
							if(kubKaDontMoveW == true) {
								break;
							}
						}
						if(!kubKaDontMoveW) {
							for(var i42 = 1; i42 < kubNumberSkizb; i42++) {
								kuber[kubId-i42].x = kuber[kubId-i42].x - (160 - i42*40);
								kuber[kubId-i42].y = kuber[kubId-i42].y + (160 - i42*40);
								$("#" + kuber[kubId -i42].id).css("left", kuber[kubId-i42].x)
								$("#" + kuber[kubId -i42].id).css("top", kuber[kubId-i42].y);
							}
							dirq = 0;
						}
					}
				}
				else if(randomNumber == 3) {
					if(dirq == 0) {
						for(var i41 = 1; i41 < kubNumberSkizb -1; i41++) {
							for(var i1 in dontMoveD) {
								if((kuber[kubId-i41].x + 80 == dontMoveD[i1].dashtX) &&
									(kuber[kubId-i41].y - 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
								
							}
							if(kuber[kubId-i41].x >= 520) {
								kubKaDontMoveW = true;
								break;
							}
							if(kubKaDontMoveW == true) {
								break;
							}
						}
						if(!kubKaDontMoveW) {
							for(var i42 = 1; i42 < kubNumberSkizb -1; i42++) {
								kuber[kubId-i42].x = kuber[kubId-i42].x + 80;
								kuber[kubId-i42].y = kuber[kubId-i42].y - 40;
								$("#" + kuber[kubId -i42].id).css("left", kuber[kubId-i42].x)
								$("#" + kuber[kubId -i42].id).css("top", kuber[kubId-i42].y);
							}
							dirq = 1;
						}
					}
					else if(dirq == 1) {
						for(var i41 = 1; i41 < kubNumberSkizb -1; i41++) {
							for(var i1 in dontMoveD) {
								if((kuber[kubId-i41].x - 40 == dontMoveD[i1].dashtX) &&
									(kuber[kubId-i41].y + 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}	
							}
							if(kubKaDontMoveW == true) {
								break;
							}
						}
						if(!kubKaDontMoveW) {
							for(var i1 in dontMoveD) {
								if((kuber[kubId -4].x == dontMoveD[i1].dashtX) &&
									(kuber[kubId -4].y + 80 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
							}
						}
						
						if(!kubKaDontMoveW) {
							for(var i42 = 1; i42 < kubNumberSkizb -1; i42++) {
								kuber[kubId-i42].x = kuber[kubId-i42].x - 40;
								kuber[kubId-i42].y = kuber[kubId-i42].y + 40;
								$("#" + kuber[kubId -i42].id).css("left", kuber[kubId-i42].x)
								$("#" + kuber[kubId -i42].id).css("top", kuber[kubId-i42].y);
							}
							kuber[kubId -4].y = kuber[kubId -4].y + 80;
							$("#" + kuber[kubId -4].id).css("top", kuber[kubId -4].y);
							dirq = 2;
						}
					}
					else if(dirq == 2) {
						
						if(kuber[kubId -1].x == 560) {
								kubKaDontMoveW = true;
							}
						else {
							for(var i1 in dontMoveD) {
								if((kuber[kubId -1].x + 40 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -1].y - 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
								if((kuber[kubId -4].x == dontMoveD[i1].dashtX) &&
									(kuber[kubId -4].y - 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
								if((kuber[kubId -3].x -40 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -3].y == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
							}
						}
						if(!kubKaDontMoveW) {
							kuber[kubId -1].x = kuber[kubId -1].x + 40;
							kuber[kubId -1].y = kuber[kubId -1].y - 40;
							$("#" + kuber[kubId -1].id).css("left", kuber[kubId -1].x);
							$("#" + kuber[kubId -1].id).css("top", kuber[kubId -1].y);
							
							kuber[kubId -4].y = kuber[kubId -4].y - 40;
							$("#" + kuber[kubId -4].id).css("top", kuber[kubId -4].y);
							
							kuber[kubId -3].x = kuber[kubId -3].x - 40;
							$("#" + kuber[kubId -3].id).css("left", kuber[kubId -3].x);
							
							dirq = 3;
						}
					}
					else if(dirq == 3) {
						for(var i1 in dontMoveD) {
							if((kuber[kubId -4].x == dontMoveD[i1].dashtX) &&
								(kuber[kubId -4].y - 40 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
							if((kuber[kubId -3].x + 40== dontMoveD[i1].dashtX) &&
								(kuber[kubId -3].y == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
							if((kuber[kubId -2].x -40 == dontMoveD[i1].dashtX) &&
								(kuber[kubId -2].y == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
							if((kuber[kubId -1].x - 80 == dontMoveD[i1].dashtX) &&
								(kuber[kubId -1].y + 40 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
						}
						
						if(!kubKaDontMoveW) {
							kuber[kubId -1].x = kuber[kubId -1].x - 80;
							kuber[kubId -1].y = kuber[kubId -1].y + 40;
							$("#" + kuber[kubId -1].id).css("left", kuber[kubId -1].x);
							$("#" + kuber[kubId -1].id).css("top", kuber[kubId -1].y);
							
							kuber[kubId -4].y = kuber[kubId -4].y - 40;
							$("#" + kuber[kubId -4].id).css("top", kuber[kubId -4].y);
							
							kuber[kubId -3].x = kuber[kubId -3].x + 40;
							$("#" + kuber[kubId -3].id).css("left", kuber[kubId -3].x);
							
							kuber[kubId -2].x = kuber[kubId -2].x - 40;
							$("#" + kuber[kubId -2].id).css("left", kuber[kubId -2].x);
							
							dirq = 0;
						}
					}
				}
				else if(randomNumber == 4) {
					if(dirq == 0) {
						if(kuber[kubId -4].x == 560) {
							kubKaDontMoveW = true;
						}
						else {
							for(var i1 in dontMoveD) {
								if((kuber[kubId -4].x + 40 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -4].y == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
								if((kuber[kubId -3].x == dontMoveD[i1].dashtX) &&
									(kuber[kubId -3].y + 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
								if((kuber[kubId -1].x + 40 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -1].y - 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
							}
						}
						if(!kubKaDontMoveW) {
							kuber[kubId -1].x = kuber[kubId -1].x + 40;
							kuber[kubId -1].y = kuber[kubId -1].y - 40;
							$("#" + kuber[kubId -1].id).css("left", kuber[kubId -1].x);
							$("#" + kuber[kubId -1].id).css("top", kuber[kubId -1].y);
							
							kuber[kubId -4].x = kuber[kubId -4].x + 40;
							$("#" + kuber[kubId -4].id).css("left", kuber[kubId -4].x);
							
							kuber[kubId -3].y = kuber[kubId -3].y + 40;
							$("#" + kuber[kubId -3].id).css("top", kuber[kubId -3].y);
							
							dirq = 1;
						}
					}
					else if(dirq == 1) {
						for(var i1 in dontMoveD) {
							if((kuber[kubId -4].x -80 == dontMoveD[i1].dashtX) &&
								(kuber[kubId -4].y == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
							if((kuber[kubId -2].x -40 == dontMoveD[i1].dashtX) &&
								(kuber[kubId -2].y + 40 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
							if((kuber[kubId -1].x - 40 == dontMoveD[i1].dashtX) &&
								(kuber[kubId -1].y + 40 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
						}
						
						if(!kubKaDontMoveW) {
							kuber[kubId -1].x = kuber[kubId -1].x - 40;
							kuber[kubId -1].y = kuber[kubId -1].y + 40;
							$("#" + kuber[kubId -1].id).css("left", kuber[kubId -1].x);
							$("#" + kuber[kubId -1].id).css("top", kuber[kubId -1].y);
							
							kuber[kubId -4].x = kuber[kubId -4].x - 80;
							$("#" + kuber[kubId -4].id).css("left", kuber[kubId -4].x);
							
							kuber[kubId -2].x = kuber[kubId -2].x - 40;
							kuber[kubId -2].y = kuber[kubId -2].y + 40;
							$("#" + kuber[kubId -2].id).css("left", kuber[kubId -2].x);
							$("#" + kuber[kubId -2].id).css("top", kuber[kubId -2].y);
							
							dirq = 2;
						}
					}
					else if(dirq == 2) {
						if(kuber[kubId -1].x == 560) {
							kubKaDontMoveW = true;
						}
						else {
							for(var i1 in dontMoveD) {
								if((kuber[kubId -2].x + 40 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -2].y - 80 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
								if((kuber[kubId -1].x + 40 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -1].y - 80 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
							}
						}
						if(!kubKaDontMoveW) {
							kuber[kubId -1].x = kuber[kubId -1].x + 40;
							kuber[kubId -1].y = kuber[kubId -1].y - 80;
							$("#" + kuber[kubId -1].id).css("left", kuber[kubId -1].x);
							$("#" + kuber[kubId -1].id).css("top", kuber[kubId -1].y);
							
							kuber[kubId -2].x = kuber[kubId -2].x + 40;
							kuber[kubId -2].y = kuber[kubId -2].y - 80;
							$("#" + kuber[kubId -2].id).css("left", kuber[kubId -2].x);
							$("#" + kuber[kubId -2].id).css("top", kuber[kubId -2].y);
							
							dirq = 3;
						}
					}
					else if(dirq == 3) {
						for(var i1 in dontMoveD) {
							if((kuber[kubId -4].x + 40 == dontMoveD[i1].dashtX) &&
								(kuber[kubId -4].y == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
							if((kuber[kubId -3].x == dontMoveD[i1].dashtX) &&
								(kuber[kubId -3].y - 40 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
							if((kuber[kubId -2].x == dontMoveD[i1].dashtX) &&
								(kuber[kubId -2].y + 40 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
							if((kuber[kubId -1].x - 40 == dontMoveD[i1].dashtX) &&
								(kuber[kubId -1].y + 80 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
						}
						
						if(!kubKaDontMoveW) {
							kuber[kubId -1].x = kuber[kubId -1].x - 40;
							kuber[kubId -1].y = kuber[kubId -1].y + 80;
							$("#" + kuber[kubId -1].id).css("left", kuber[kubId -1].x);
							$("#" + kuber[kubId -1].id).css("top", kuber[kubId -1].y);
							
							kuber[kubId -4].x = kuber[kubId -4].x + 40;
							$("#" + kuber[kubId -4].id).css("left", kuber[kubId -4].x);
							
							kuber[kubId -3].y = kuber[kubId -3].y - 40;
							$("#" + kuber[kubId -3].id).css("top", kuber[kubId -3].y);
							
							kuber[kubId -2].y = kuber[kubId -2].y + 40;
							$("#" + kuber[kubId -2].id).css("top", kuber[kubId -2].y);
							
							dirq = 0;
						}
					}
				}
				else if(randomNumber == 5) {
					if(dirq == 0) {
						for(var i1 in dontMoveD) {
							if((kuber[kubId -4].x == dontMoveD[i1].dashtX) &&
								(kuber[kubId -4].y + 40 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;								}
							if((kuber[kubId -1].x - 80 == dontMoveD[i1].dashtX) &&
								(kuber[kubId -1].y + 40 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
						}
							
						if(!kubKaDontMoveW) {
							kuber[kubId -1].x = kuber[kubId -1].x - 80;
							kuber[kubId -1].y = kuber[kubId -1].y + 40;
							$("#" + kuber[kubId -1].id).css("left", kuber[kubId -1].x);
							$("#" + kuber[kubId -1].id).css("top", kuber[kubId -1].y);
							
							kuber[kubId -4].y = kuber[kubId -4].y + 40;
							$("#" + kuber[kubId -4].id).css("top", kuber[kubId -4].y);
								
							dirq = 1;
						}
					}
					else if(dirq == 1) {
						if(kuber[kubId -2].x == 560) {
							kubKaDontMoveW = true;
						}
						else {
							for(var i1 in dontMoveD) {
								if((kuber[kubId -4].x == dontMoveD[i1].dashtX) &&
									(kuber[kubId -4].y - 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;								}
								if((kuber[kubId -1].x + 80 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -1].y - 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
							}
						}
						if(!kubKaDontMoveW) {
							kuber[kubId -1].x = kuber[kubId -1].x + 80;
							kuber[kubId -1].y = kuber[kubId -1].y - 40;
							$("#" + kuber[kubId -1].id).css("left", kuber[kubId -1].x);
							$("#" + kuber[kubId -1].id).css("top", kuber[kubId -1].y);
							
							kuber[kubId -4].y = kuber[kubId -4].y - 40;
							$("#" + kuber[kubId -4].id).css("top", kuber[kubId -4].y);
								
							dirq = 0;
						}
					}
				}
				else if(randomNumber == 6) {
					if(dirq == 0) {
						for(var i1 in dontMoveD) {
							if((kuber[kubId -4].x - 40 == dontMoveD[i1].dashtX) &&
								(kuber[kubId -4].y == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;								}
							if((kuber[kubId -2].x - 80 == dontMoveD[i1].dashtX) &&
								(kuber[kubId -2].y + 40 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
						}
							
						if(!kubKaDontMoveW) {
							kuber[kubId -2].x = kuber[kubId -2].x - 80;
							kuber[kubId -2].y = kuber[kubId -2].y + 40;
							$("#" + kuber[kubId -2].id).css("left", kuber[kubId -2].x);
							$("#" + kuber[kubId -2].id).css("top", kuber[kubId -2].y);
							
							kuber[kubId -4].x = kuber[kubId -4].x - 40;
							$("#" + kuber[kubId -4].id).css("left", kuber[kubId -4].x);
								
							dirq = 1;
						}
					}
					else if(dirq == 1) {
						if(kuber[kubId -3].x == 560) {
							kubKaDontMoveW = true;
						}
						else {
							for(var i1 in dontMoveD) {
								if((kuber[kubId -1].x + 40 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -1].y - 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;								}
								if((kuber[kubId -2].x + 80 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -2].y - 80 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
							}
						}
						if(!kubKaDontMoveW) {
							kuber[kubId -2].x = kuber[kubId -2].x + 80;
							kuber[kubId -2].y = kuber[kubId -2].y - 80;
							$("#" + kuber[kubId -2].id).css("left", kuber[kubId -2].x);
							$("#" + kuber[kubId -2].id).css("top", kuber[kubId -2].y);
							
							kuber[kubId -1].x = kuber[kubId -1].x + 40;
							kuber[kubId -1].y = kuber[kubId -1].y - 40;
							$("#" + kuber[kubId -1].id).css("left", kuber[kubId -1].x);
							$("#" + kuber[kubId -1].id).css("top", kuber[kubId -1].y);
								
							dirq = 2;
						}
					}
					else if(dirq == 2) {
						for(var i1 in dontMoveD) {
							if((kuber[kubId -4].x == dontMoveD[i1].dashtX) &&
								(kuber[kubId -4].y + 40 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;								}
							if((kuber[kubId -2].x - 40 == dontMoveD[i1].dashtX) &&
								(kuber[kubId -2].y + 80 == dontMoveD[i1].dashtY)){
								kubKaDontMoveW = true;
								break;
							}
						}
							
						if(!kubKaDontMoveW) {
							kuber[kubId -2].x = kuber[kubId -2].x - 40;
							kuber[kubId -2].y = kuber[kubId -2].y + 80;
							$("#" + kuber[kubId -2].id).css("left", kuber[kubId -2].x);
							$("#" + kuber[kubId -2].id).css("top", kuber[kubId -2].y);
							
							kuber[kubId -4].y = kuber[kubId -4].y + 40;
							$("#" + kuber[kubId -4].id).css("top", kuber[kubId -4].y);
								
							dirq = 3;
						}
					}
					else if(dirq == 3) {
						if(kuber[kubId -2].x == 560) {
							kubKaDontMoveW = true;
						}
						else {
							for(var i1 in dontMoveD) {
								if((kuber[kubId -4].x + 40 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -4].y - 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;								}
								if((kuber[kubId -2].x + 40 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -2].y - 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
								if((kuber[kubId -1].x - 40 == dontMoveD[i1].dashtX) &&
									(kuber[kubId -1].y + 40 == dontMoveD[i1].dashtY)){
									kubKaDontMoveW = true;
									break;
								}
							}
						}
						if(!kubKaDontMoveW) {
							kuber[kubId -2].x = kuber[kubId -2].x + 40;
							kuber[kubId -2].y = kuber[kubId -2].y - 40;
							$("#" + kuber[kubId -2].id).css("left", kuber[kubId -2].x);
							$("#" + kuber[kubId -2].id).css("top", kuber[kubId -2].y);
							
							kuber[kubId -1].x = kuber[kubId -1].x - 40;
							kuber[kubId -1].y = kuber[kubId -1].y + 40;
							$("#" + kuber[kubId -1].id).css("left", kuber[kubId -1].x);
							$("#" + kuber[kubId -1].id).css("top", kuber[kubId -1].y);
							
							kuber[kubId -4].x = kuber[kubId -4].x + 40;
							kuber[kubId -4].y = kuber[kubId -4].y - 40;
							$("#" + kuber[kubId -4].id).css("left", kuber[kubId -4].x);
							$("#" + kuber[kubId -4].id).css("top", kuber[kubId -4].y);
								
							dirq = 0;
						}
					}
				}
				
				dir.tar = 0;
				break;	
			default: 
				dir.tar = 0;
				break;
		}
	}
		
	function kubTexadrel(dashteriZangvac, kubY, kubX, kubiIdin) {
		for(var j = 0; j < kubNumberSkizb; j++) {
			for(var i in dashteriZangvac) {
				if(dashteriZangvac[i].x == kubX &&
					dashteriZangvac[i].y == kubY &&
					dashteriZangvac[i].kubKa == false) {
					dashteriZangvac[i].kubKa = true;
					dashteriZangvac[i].kubId = kubiIdin;
					var dashtIdN = dashteriZangvac[i].id;
					var dashtIdNP = dashtIdN.substr(5);
					dontMoveD.push(new DontMove(dashteriZangvac[i].id, dashteriZangvac[i].x, dashteriZangvac[i].y, kubiIdin, dashtIdNP));
					kubSarqec++;
					if(kubSarqec == kubNumberSkizb) {kubSarqec = 0; dirq = 0; norKub();}
					break;
				}
			}
		}
	}
	
	function kubTexadrelIjcnel(dashteriZangvac, kubY, kubX, kubiIdin) {
		for(var i in dashteriZangvac) {
			if(dashteriZangvac[i].x == kubX &&
				dashteriZangvac[i].y == kubY &&
				dashteriZangvac[i].kubKa == false) {
				dashteriZangvac[i].kubKa = true;
				dashteriZangvac[i].kubId = kubiIdin;
				var dashtIdN = dashteriZangvac[i].id;
				var dashtIdNP = dashtIdN.substr(5);
				dontMoveD.push(new DontMove(dashteriZangvac[i].id, dashteriZangvac[i].x, dashteriZangvac[i].y, kubiIdin, dashtIdNP));
				break;
			}
		}
	}
	
	function colisionTox() {
		var kubKaCounter = 0;
		for(var i = 0; i < 20; i++) {
			for(var j = 0; j < 15; j++) {
				if(dashter[(j + i*15)].kubKa) {
					kubKaCounter++;
				}
				else {
					kubKaCounter = 0;
					break;
				}
			}
			if(kubKaCounter == 15) {
				deleteKubs(i);
				break;
			}
		}
	}
	
	var music1 = $("<audio/>").appendTo("body").attr("src", "music2.mp3").attr("loop", "");
	
	function deleteKubs(tox) {
		score = score + 10;
		scoreD.text("SCORE: " + score);
		
		if(score%100 == 0) {
			level++;
			levelD.text("LEVEL: " + level);
			if(intervalTime > 100) {
				intervalTime = intervalTime - 100;
				clearInterval(intervalS);
				intervalS = setInterval(function(){colisionIS()}, intervalTime);
			}
		}
		
		for(var i = 0; i < 15; i++) {
			dashter[(i + tox*15)].kubKa = false;
			$("#kub" + dashter[(i + tox*15)].kubId).remove();
			for(var j in dontMoveD) {
				if(dontMoveD[j].dashtId == dashter[(i + tox*15)].id) {
					dontMoveD[j] = {};
				}
			}
		
		}
		kuberIjacnel(tox);
	}
	
	function compare(a, b) {
	  var ia = parseInt(a);
	  var ib = parseInt(b);
	  if (ia < ib) {
		return -1;
	  }
	  if (ia > ib) {
		return 1;
	  }
	  
	  return 0;
	}
	
	function kuberIjacnel(tox) {
		var bardzrutyun = 760 - tox*40;
		var dashteriHamarner = [];
		for(var i in dontMoveD) {
			if(dontMoveD[i].dashtY < bardzrutyun) {
				dashteriHamarner.push(dontMoveD[i].dashtIdNumber);
			}
		}
		dashteriHamarner.sort(compare);
		for(var i in dashteriHamarner) {
			dashter[dashteriHamarner[i]].kubKa = false;
			for(var i1 in dontMoveD) {
				if(dashteriHamarner[i] == dontMoveD[i1].dashtIdNumber) {
					dontMoveD[i1] = {};
					break;
				}
			}
			for (var i2 in kuber) {
				if("kub" + dashter[dashteriHamarner[i]].kubId == kuber[i2].id) {
					kuber[i2].y = goDown(kuber[i2].y);
					$("#" + kuber[i2].id).css("top", kuber[i2].y);
					kubTexadrelIjcnel(dashter, kuber[i2].y, kuber[i2].x, dashter[dashteriHamarner[i]].kubId);
					break;
				}
			}
			dashter[dashteriHamarner[i]].kubId = null;
		}
	}
	
	function colisionIS() {
		dir.tar = "s";
		colision();
	}
	
	var interval = setInterval(function(){colision()}, 20);
	var intervalS = setInterval(function(){colisionIS()}, intervalTime);
});