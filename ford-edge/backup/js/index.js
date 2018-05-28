document.ready=function(){
	//屏蔽ios上下弹性
	$(window).on('scroll.elasticity', function (e) {
    e.preventDefault();
    }).on('touchmove.elasticity', function (e) {
    e.preventDefault();
	});
	//设置页面缩放
	$(".page").height(window.innerHeight*640/window.innerWidth).hide();
	$("body").css("zoom",window.innerWidth/640);
	
	
	//p1
	
	$(".p1_light1").hide();
	$(".p1_word1").hide();
	$(".p1_light2").hide();
	$(".p1_word2").hide();
	$(".p1_word3").hide();
	$(".p1_car").hide();
	$(".p1_carer").hide();
	
	
	$(".p1_word1").show().fadeIn(1000);
	$(".p1_light2").animate({width:"376px", left:"126px"},2000).show();
	$(".p1_word2").show().fadeIn(2000);
	$(".p1_word3").fadeIn(2000).show(2000);
	$(".p1_car").show(1500).fadeIn(2000,function(){
		$(".p1_carer").show(5000);
	});
	$(".p1_light1").show(2500).fadeIn(3500);
	
	//p2
	var startY;
	var endY;
	
	$(".p2_word").hide();
	$(".p2_light").hide();
	
	$("#p1").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientY;
	});
	$("#p1").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p1").bind("touchend",function(e){
		if(startY-endY>100){
				$("#p1").animate({top:"-1136px"}).hide();
				$("#p2").animate({top:"0px"},1000).show();
				$("#p2_1").animate({top:"0px"});
				$(".p2_light").fadeIn(3000).show(1000);
				$(".p2_word").animate({width:"481px",left:"76px"},3000).show();
				setTimeout(p2Main,3000);
				startY=null;
				endY=null;
					$(".p1_light1").hide();
					$(".p1_word1").hide();
					$(".p1_light2").hide();
					$(".p1_word2").hide();
					$(".p1_word3").hide();
					$(".p1_car").hide();
					$(".p1_carer").hide();
		}
	});
	
	function p2Main(){
		//$("#p2").css("background","url('images/p2_main.jpg')").fadeIn(3000);
		//$("#p2").css("background-position","bottom");
		$("#p2").fadeOut(1500).show();
		$("#p2_1").fadeIn(1500).show();
	}
	
//p3宜商篇
	$(".p3_title").hide();
	$(".p3_word").hide();
				
	$("#p2_1").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientY;
	});
	$("#p2_1").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p2_1").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p2_1").animate({top:"-1136px"}).hide(1000);
				$("#p3").show().animate({top:"0px"});
				$(".p3_title").fadeIn(1500);
				$(".p3_word").show().animate({width:"481px"},2000);
				startY=null;
				endY=null;
		}
		/*上翻
		if(startY-endY<-100){
			$("#p2").animate({top:"1136px"}).hide();
			$("#p2_1").animate({top:"1136px"}).hide();
			$("#p1").animate({top:"0px"}).show();
			$(".p1_word1").fadeIn(1000).show();
			$(".p1_light2").animate({width:"376px", left:"126px"},2000).show();
			$(".p1_word2").fadeIn(2000).show();
			$(".p1_word3").fadeIn(2000).show(2000);
			$(".p1_car").show(1500).fadeIn(2000,function(){
				$(".p1_carer").show(5000);
			});
			$(".p1_light1").fadeIn(3500).show(2500);
		}
		*/
	});

//p4
	$(".p4_title").hide();
	$(".p4_content").hide();

	$("#p3").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p3").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p3").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p3").animate({top:"-1136px"}).hide(1000);
				$("#p4").show().animate({top:"0px"});
				$(".p4_title").fadeIn(2000);
				$(".p4_content").animate({width:"515px",left:"62px"},2000).show();
				startY=null;
				endY=null;
		}
		if(startY-endY<-100){
			$(".p4_title")
		}
	});
	
	

//p5
	$(".p5_title").hide();
	$(".p5_content").hide();

	$("#p4").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p4").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p4").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p4").animate({top:"-1136px"}).hide(1000);
				$("#p5").show().animate({top:"0px"});
				$(".p5_title").fadeIn(2000);
				$(".p5_content").animate({width:"515px",left:"62px"},2000).show();
				startY=null;
				endY=null;
		}
	});
	
	var touch_count=0;
	$(".click").bind("touchstart",function(e){
		if(touch_count%2==1){
			$("#p5").css("background","url('images/p5_bg_close.jpg')");
			touch_count++;
		}else{
			$("#p5").css("background","url('images/p5_bg.jpg')");
			touch_count++;
		}
	});

//p6宜旅篇
	$(".p6_title").hide();
	$(".p6_content").hide();

	$("#p5").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p5").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p5").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p5").animate({top:"-1136px"}).hide(1000);
				$("#p6").show().animate({top:"0px"});
				$(".p6_title").fadeIn(1500);
				$(".p6_content").animate({height:"218px"},2000).show();
				startY=null;
				endY=null;
		}
	});
	
//p7
	$(".p7_title").hide();
	$(".p7_content").hide();

	$("#p6").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p6").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p6").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p6").animate({top:"-1136px"}).hide(1000);
				$("#p7").show().animate({top:"0px"});
				$(".p7_title").fadeIn(2000);
				$(".p7_content").animate({width:"515px",left:"58px"},2000).show();
			//	setInterval(change,500);
				startY=null;
				endY=null;
		}
	});	
	
/*	var bg;
	function change(){
		if(!bg){
			$("#p7").css("background","url('images/p7_bg2.jpg')");
			bg=!bg;
		}else{
			$("#p7").css("background","url('images/p7_bg.jpg')");
			bg=!bg;
		}
	}
	*/
//p8
	$(".p8_title").hide();
	$(".p8_content").hide();
	
	$(".p8_circle1").hide();
	$(".p8_circle2").hide();
	$(".p8_circle3").hide();
	$(".p8_circle4").hide();
	$(".p8_circle5").hide();

	$("#p7").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p7").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p7").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p7").animate({top:"-1136px"}).hide(1000);
				$("#p8").show().animate({top:"0px"});
				$(".p8_title").fadeIn(2000);
				$(".p8_content").animate({width:"515px",left:"64px"},2000).show();
				setInterval(wifi,1000);
				startY=null;
				endY=null;
		}
	});	
	
	function wifi(){
		$(".p8_circle1").show(500);
		$(".p8_circle2").show(1000);
		$(".p8_circle3").show(1500);
		$(".p8_circle4").show(2000);
		$(".p8_circle5").show(2500,function(){
			$(".p8_circle1").hide(1);
			$(".p8_circle2").hide(1);
			$(".p8_circle3").hide(1);
			$(".p8_circle4").hide(1);
			$(".p8_circle5").hide(1);
		});
	}

//p9宜私篇
	$(".p9_title").hide();
	$(".p9_content").hide();

	$("#p8").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p8").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p8").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p8").animate({top:"-1136px"}).hide(1000);
				$("#p9").show().animate({top:"0px"});
				$(".p9_title").fadeIn(1500);
				$(".p9_content").show().animate({height:"516px"},2000);
				startY=null;
				endY=null;
		}
	});	
	
//p10
	$(".p10_title").hide();
	$(".p10_content").hide();

	$("#p9").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p9").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p9").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p9").animate({top:"-1136px"}).hide(1000);
				$("#p10").show().animate({top:"0px"});
				$(".p10_title").fadeIn(1000);
				$(".p10_content").show(1500);
				$(".p10_black_car").animate({left:"0px",top:"0px"},3000);
				$(".p10_white_car").animate({right:"0px",top:"0px"},3000);
				startY=null;
				endY=null;
		}
	});		
	
//p11
	$(".p11_title").hide();
	$(".p11_content").hide();

	$("#p10").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p10").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p10").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p10").animate({top:"-1136px"}).hide(1000);
				$("#p11").show().animate({top:"0px"});
				$(".p11_title").fadeIn(2000);
				$(".p11_content").animate({width:"515px",left:"60px"},2000).show();
				startY=null;
				endY=null;
		}
	});		
	
//p12 宜家篇
	$(".p12_title").hide();
	$(".p12_content").hide();

	$("#p11").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p11").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p11").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p11").animate({top:"-1136px"}).hide(1000);
				$("#p12").show().animate({top:"0px"});
				$(".p12_title").fadeIn(1500);
				$(".p12_content").show().animate({width:"481px"},2000);
				$(".p12_car").animate({right:"0px"},2000);
				startY=null;
				endY=null;
		}
	});	
	
//p13
	$(".p13_car").hide();
	$(".p13_content").hide();
	$(".p13_car2").hide();

	$("#p12").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p12").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p12").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p12").animate({top:"-1136px"}).hide(1000);
				$("#p13").show().animate({top:"0px"});
				$(".p13_car").fadeIn(2000);
				$(".p13_content").animate({width:"549px",left:"42px"},2000).show();
				startY=null;
				endY=null;
		}
	});	
	var car_count=1;
	$(".car_click").bind("touchstart",function(e){
		if(car_count%2==1){
			$(".p13_car").hide();
			$(".p13_car2").show();
			car_count++;
		}else{
			$(".p13_car2").hide();
			$(".p13_car").show();
			car_count++;
		}
	});
	
//p14
	$(".p14_title").hide();
	$(".p14_content").hide();

	$("#p13").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p13").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p13").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p13").animate({top:"-1136px"}).hide(1000);
				$("#p14").show().animate({top:"0px"});
				$(".p14_title").fadeIn(2000);
				$(".p14_content").animate({width:"479px",left:"80px"},2000).show();
				startY=null;
				endY=null;
		}
	});	
		
//p15
	$(".p15_title").hide();
	$(".p15_content").hide();

	$("#p14").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p14").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p14").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p14").animate({top:"-1136px"}).hide(1000);
				$("#p15").show().animate({top:"0px"});
				$(".p15_title").fadeIn(2000);
				$(".p15_content").animate({width:"363px",left:"135px"},2000).show();
				startY=null;
				endY=null;
		}
	});

//p16
	

	$("#p15").bind("touchstart",function(e){
	startY=e.originalEvent.touches[0].clientY;
	});
	$("#p15").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p15").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
				$("#p15").animate({top:"-1136px"}).hide(1000);
				$("#p16").show().animate({top:"0px"});
				startY=null;
				endY=null;
		}

	});	
	
	
	
	
//loading
	$(".loading").show();
	var imgsstr=["images/p1_bg.jpg"];
	var imgs=new Array();
	var img;
	for(var i=0;i<imgsstr.length;i++){
		img=new Image();
		img.src=imgsstr[i];
		imgs.push(img);
	}
	
	var loadCount=0;
	loadingPicture(imgs);
	
	function loadingPicture(images){
		for(i=0;i<images.length;i++){
			if(!images[i].complete){
				loadCount++;
				$(images[i]).bind("load",function(e){
					loadCount--;
					if(loadCount==0){
						$(".loading").hide();
						$("#p1").show();
						
					}
				});
			}
		}
		if(loadCount==0){
			$(".loading").hide();
			$("#p1").show();
			
		}
	}
	
}