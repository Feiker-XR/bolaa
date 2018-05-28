	//屏蔽ios下上下弹性
	$(window).on('scroll.elasticity', function (e) {
    e.preventDefault();
    }).on('touchmove.elasticity', function (e) {
    e.preventDefault();
	});
	$(".page").height(window.innerHeight*640/window.innerWidth).hide();
	$("body").css("zoom",window.innerWidth/640);
	
	var startY;
	var endY;
	var multi=640/window.innerWidth;
	
	$("#p1").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientY;

	});
	$("#p1").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p1").bind("touchend",function(e){
		if(startY-endY>50){
			canslid=false;
			$("#p2").css("top",window.innerHeight*multi+"px").show();
			$("#p1").animate({"top":-window.innerHeight*multi+"px"},1000).hide(1000);
			$("#p2").animate({"top":"0px"},1000);
			$("#p2_1").delay(1000).animate({"bottom":164+"px"},1000,function(){
				canslid=true;
			});
			startY=null;
			endY=null;
		}
	});	
	
	var p2slid=0;
	var canslid
	$("#p2").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientY;
	});
	$("#p2").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p2").bind("touchend",function(e){
		if(startY-endY>50){
			switch(p2slid){
				case 0:
					if(canslid){
						$("#p2_1").animate({"bottom":window.innerHeight*multi+"px"},1000);
						$("#p2_2").animate({"bottom":"236px"},1000,function(){
							canslid=true;
							p2slid++;
						});	
						break;
					}
				case 1:
					if(canslid){
						$("#p2_2").animate({"bottom":window.innerHeight*multi+"px"},1000);
						$("#p2_3").animate({"bottom":"188px"},1000,function(){
							canslid=true;
							p2slid++;
						});
					}
					break;
				default:
					$("#p3").css("top",window.innerHeight*multi+"px").show();
					$("#p2").animate({"top":-window.innerHeight*multi+"px"},1000).hide(1000);
					$("#p3").animate({"top":"0px"},1000);
				}
			
		}
	});	
	
	$("#startbutton").bind("touchstart",function(e){
		$("#p3").hide();
		$("#p4").show();
	});
	$("#speedup").bind("touchstart", function (e) {
	    e.preventDefault();
	    game.speedup();
	    var audio = document.getElementById("carMusic");

	    audio.play();
	});
	$("#speedup").bind("touchend", function (e) {
	    game.speedup();

	    var audio = document.getElementById("carMusic");

	    audio.pause();
	    //audio.stop();

	});
	$("#turnl").bind("touchstart",function(e){
		e.preventDefault();
		game.turnleft();
	});
	$("#turnl").bind("touchend",function(e){
		game.turnleft();
	});
	$("#turnr").bind("touchstart",function(e){
		e.preventDefault();
		game.turnright();
	});
	$("#turnr").bind("touchend",function(e){
		game.turnright();
	});
	$("#xuan").css("left",(640-1250)/2+"px").css("top",(window.innerHeight*multi-1250)/2+"px");	

//choose car star

	var carno=0;
	var car;
	var carstate=["unlock","lock","lock"];
	$("#ok").bind("touchstart",function(e){
		if(carstate[carno]=="unlock"){
				$("#p4").hide();
				$("#gamepage").show();
				$("#promptp").show();
				$("#startprompt").show();
				$("#endprompt").hide();	

				game.start(carno);
			}
	});
	$("#try").bind("touchstart",function(e){
			game=new Game(96,542,$("#gameContainer"),30000,gameend);
			$("#startprompt").show();
			$("#endprompt").hide();	
			game.start(carno);
	});
	$("#su").bind("touchstart",function(e){
			$("#startprompt").hide();
			$("#signup").show();
	});
	$("#return").bind("touchstart",function(e){
			$("#signup").hide();
			$("#gamepage").hide();
			$("#promptp").hide();
			$("#p4").show();
	});
	for(var i=0;i<3;i++){
	    car = $("<div></div>").addClass("car").css("background-image", "url(/Content/images/car" + (i + 1) + ".png)").css("left", 539 * (i > 0 ? 1 : 0)).attr("state", carstate[i]);
/*		car.bind("touchstart",function(e){
			if($(e.srcElement).attr("state")=="unlock"){
				$("#p4").hide();
				$("#gamepage").show();
				$("#promptp").show();
				$("#startprompt").show();
				$("#endprompt").hide();	
				game.start(carno);			
			}
		});*/
		$("#carsContener").append(car);
	}

	$("#carsContener").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientX;
	});
	$("#carsContener").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientX;
	});
	$("#carsContener").bind("touchend",function(e){
		if(endY-startY>50){
			$("#rbutton").css("opacity",1);
			if(carno>0){
				$(".car").each(function(index,ele){
					if(index-carno==0){
						$(this).animate({"left":"539px"});
					}else if(index-carno==-1){
						$(this).animate({"left":"0px"});
					}
				});
				carno--;
				if(carno==0){
					$("#lbutton").css("opacity",0.5);
				}
			}
		}else if(endY-startY<-50){
			$("#lbutton").css("opacity",1);
			if(carno<2){
				$(".car").each(function(index,ele){
					if(index-carno==0){
						$(this).animate({"left":"-539px"});
					}else if(index-carno==1){
						$(this).animate({"left":"0px"});
					}
				});
				carno++;
				if(carno==2){
					$("#rbutton").css("opacity",0.5);
				}
			}
		}
		endY=null;
		startY=null;
	});
	$(".arrow").bind("touchstart",function(e){
		if($(e.srcElement).attr("id")=="lbutton"){
			$("#rbutton").css("opacity",1);
			if(carno>0){
				$(".car").each(function(index,ele){
					if(index-carno==0){
						$(this).animate({"left":"539px"});
					}else if(index-carno==-1){
						$(this).animate({"left":"0px"});
					}
				});
				carno--;
				if(carno==0){
					$("#lbutton").css("opacity",0.5);
				}
			}
		}else{
			$("#lbutton").css("opacity",1);
			if(carno<2){
				$(".car").each(function(index,ele){
					if(index-carno==0){
						$(this).animate({"left":"-539px"});
					}else if(index-carno==1){
						$(this).animate({"left":"0px"});
					}
				});
				carno++;
				if(carno==2){
					$("#rbutton").css("opacity",0.5);
				}
			}
		}
	});
//choose car end
	
	$("#startprompt").bind("touchstart",function(e){
		$("#promptp").hide();
		game.resume();
	});
//Game class
	var Game=function(l,r,bg,time,endcallback){
		r=r-64;
		var Car=function(t,s,y,channel,width,height,x){
			var channelX=[108,224,340,456];
			var flag=true;
			this.type=t;
			this.speed=s;
			if(channel==null){
				while(flag){
					flag=false;
					channel=Math.floor(Math.random()*3);		
					for(var i=0;i<cars.length;i++){
						if(cars[i].x==channelX[channel]){
							flag=true;
						}
					}
				}
				
			}
			if(!x){
				this.x=channelX[channel];
			}else{
				this.x=x;
			}
			this.y=y;
			if(width==null && (t=="n" || t=="c"))
				width=51;
			this.width=width;
			if(height==null && (t=="n" || t=="c"))
				height=100;
			this.height=height;
			var xs;
			var fx;
			var count=0;
			var changeRoadChount;
			var startChannel;
			var turnCount=0
			this.run=function(){
				turnCount++;
				if(turnCount>=20){
					if(!count){
						changeRoadChount=Math.floor(Math.random()*11)+30;
						fx=Math.floor(Math.random()*2);
						xs=116/changeRoadChount;
						if(fx==0)
							fx=-1;
						if(this.x==channelX[0]){
							startChannel=0;
							fx=1;
						}else if(this.x==channelX[3]){
							startChannel=3;
							fx=-1;
						}else if(this.x==channelX[1]){
							startChannel=1;
						}else{
							startChannel=2;
						}
						
						count++;
					}else{
						count++;
						this.x+=xs*fx;
						if(count==changeRoadChount){
							this.x=channelX[startChannel+fx];
							fx==0;
							xs=0;
							count=0;
							turnCount=0;
						}
					}
				}
			}
			this.across=function(car){
				var ccenterX=this.width/2+this.x;
				var ccenterY=this.height/2+this.y;

				var ocenterX=car.width/2+car.x;
				//try{ocenterX=car.width/2+car.x;}
				//catch(e){
				//	console.trace(e);
				//console.trace(car);}
				var ocenterY=car.height/2+car.y;
				if(Math.abs(ccenterX-ocenterX)<this.width/2+car.width/2 &&
					Math.abs(ccenterY-ocenterY)<this.height/2+car.height/2){
/*					if(this.x>car.x){
						this.x+=10;
						if(this.x>r)
							this.x=r;
						car.x-=10;
						if(car.x<l)
							car.x=l;
					}else{
						this.x-=10;
						if(this.x<l)
							this.x=l;
						car.x=+10;
						if(car.x>r)
							car.x=r;
					}
					if(this.y>car.y){
						this.xs+=5;
						car.xs-=5;
					}else{
						this.xs-=5;
						car.xs+=5;
					}*/
					return true;
				}else{
					return false;
				}
			}
		}
		var metre=0;
		var cars=new Array();
		var carIDs=new Array();
		this.totletime=time;
		this.userCar=new Car("u",0,274,1,60,140,198);
		cars.push(new Car("n",12,536,0));
		cars.push(new Car("c",12,652,2));
		cars.push(new Car("c",12,392,3));
		
		this.start=function(carno){
		    $("div").remove(".movecar");
		    $("div").remove(".movecar2");
			var div=$("<div></div>").addClass("movecar").attr("id","usercar").css("left",this.userCar.x+"px").css("bottom",this.userCar.y+"px");
			div.css({ "background": "url(/Content/images/movecar" + (carno + 1) + ".png) no-repeat center" });
			bg.append(div);
			for(var i=0;i<cars.length;i++){
				carIDs.push("other"+i);
				if(cars[i].type=='c')
					div=$("<div></div>").addClass("movecar2").attr("id",carIDs[i]).css("left",cars[i].x+"px").css("bottom",cars[i].y+"px");
				else	
					div=$("<div></div>").addClass("movecar").attr("id",carIDs[i]).css("left",cars[i].x+"px").css("bottom",cars[i].y+"px");
				bg.append(div);
			}
		}
		this.end=function(metre,time){
			clearInterval(intval);
			endcallback(metre,time);
		}
		var isspeedup;
		var isturnleft;
		var isturnright;
		this.speedup=function(){
			isspeedup=!isspeedup;
		}
		this.turnleft=function(){
			isturnleft=!isturnleft;
		}
		this.turnright=function(){
			isturnright=!isturnright;
		}
		this.pause=function(){
		}
		var intval=null;
		this.resume=function(){
			intval=setInterval(gameplay.bind(this),40,this.userCar,this.end,this.totletime);
		}


		gameplay=function(userCar,end,totletime){
			var left,top;
			var car;
			var div;
			var changeIndex;
			var pos;
			if(time==0){
				end(metre,this.totletime-time);
			}
			if(userCar.speed<35 && isspeedup){
				userCar.speed+=2;
				$("#usercar").css("opacity",0.8+0.2*userCar.speed/35);
			}else if(!isspeedup && userCar.speed>0){
				userCar.speed-=0.5;
				$("#usercar").css("opacity",0.8+0.2*userCar.speed/35);
			}
			if(userCar.x>=l && isturnleft){
				userCar.x-=12;
			}
			if(userCar.x<=r && isturnright){
				userCar.x+=12;
			}
			metre+=userCar.speed;
			$(bg).parent().css("background-position-y",metre);
			$("#usercar").css("left",userCar.x+"px");

			for(var i=0;i<cars.length;i++){
				if(cars[i].type=="c"){
					cars[i].run();
				}
				cars[i].y+=cars[i].speed-userCar.speed;
				for(var j=0;j<cars.length;j++){
					if(j!=i){
						if(cars[i].y<cars[j].y && cars[i].y+100>cars[j].y && (cars[i].x+51>cars[j].x||cars[j].x+51>cars[i].x)){
							cars[i].y=cars[j].y-100;
							cars[i].speed--;
						}
					}
				}
				$("#"+carIDs[i]).css({"bottom":cars[i].y+"px","left":cars[i].x+"px"});
				if(cars[i].y>=window.innerHeight*multi){
					changeIndex=i;
					pos=-176;
				}else if(cars[i].y<=-176){
					changeIndex=i;
					pos=window.innerHeight*multi;
				}
				for(var j=0;j<cars.length;j++){
					if(cars[j]!=cars[i])
						cars[i].across(cars[j]);
				}
				if(cars[i].across(userCar)){
					end(metre,this.totletime-time);
				}
				
			}
			if(changeIndex ||changeIndex==0){
				var t=cars[changeIndex].type;
				cars.splice(changeIndex,1);
				car=newCar(t,pos);
				$("#"+carIDs[changeIndex]).remove();
				cars.splice(changeIndex,0,car);
								var div;
				if(car.type=='c')
					div=$("<div></div>").addClass("movecar2").attr("id",carIDs[changeIndex]).css("left",cars[changeIndex].x+"px").css("bottom",cars[changeIndex].y+"px");
				else	
					div=$("<div></div>").addClass("movecar").attr("id",carIDs[changeIndex]).css("left",cars[changeIndex].x+"px").css("bottom",cars[changeIndex].y+"px");
				bg.append(div);
			}

			
			time-=40;
		}
		function newCar(t,pos,channel){
			var car=new Car(t,Math.floor(Math.random()*11)+20,pos);
			return car;
		}
	}
//Game class end
	var game=new Game(96,542,$("#gameContainer"),30000,gameend);

	function gameend(metre, totletime) {
	    var m = metre / 10;
	    if (m < 1000) {

	        WXParameter.desc = "赛车天赋暴露了！我在赛道冲刺了" + m + "米，收获“极速蜗牛”称号！";
	    } else if (m > 1000 && m < 2000) {

	        WXParameter.desc = "赛车天赋暴露了！我在赛道冲刺了" + m + "米，收获“狂热冲刺者”称号！";
	    } else {

	        WXParameter.desc = "赛车天赋暴露了！我在赛道冲刺了" + m + "米，收获“极品车神”称号！";
	    }
	    share();
		$("#overtips").text("您在"+totletime/1000+"秒内冲刺了"+ m +"米");
		$("#promptp").show();
		$("#startprompt").hide();
		$("#endprompt").show();
	}

	var imgsstr=["images/p1.jpg","images/p2.jpg","images/p1_1.png","images/p2_p1.png","images/p2_p2.png",
	"images/p2_p3.png","images/logo.png","images/arrow.png","images/bg.jpg","images/button.png",
	"images/buttons.png","images/car1.png","images/car2.png","images/car3.png","images/carbak.png",
	"images/guang.png","images/lt.png","images/movecar1.png","images/movecar2.png","images/movecar3.png",
	"images/over.png","images/p4.jpg","images/rb.png","images/signup.jpg","images/tips.png"];
	var imgs=new Array();
	var img;
	for(var i=0;i<imgsstr.length;i++){
		img=new Image();
		img.src='/Content/' + imgsstr[i];
		imgs.push(img);
	}
	
	var loadCount=0;
	loadingPicture(imgs);
	
	function loadingPicture(images) {

        
		for(i=0;i<images.length;i++){
			if(!images[i].complete){
				loadCount++;
				$(images[i]).bind("load",function(e){
					loadCount--;
					if(loadCount==0){
						$(".loading").hide();
						$("#p1").show();
						$("#p1_1").animate({"bottom":"196px"},1000);
					}
				});
			}
		}
	
		if(loadCount==0){
			$(".loading").hide();
			$("#p1").show();
			$("#p1_1").animate({"bottom":"196px"},1000);
		}
	}