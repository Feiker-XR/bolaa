$(function(){
	//屏蔽ios下上下弹性
	$(window).on('scroll.elasticity', function (e) {
    e.preventDefault();
    }).on('touchmove.elasticity', function (e) {
    e.preventDefault();
	});
	
	$(".page").height(window.innerHeight*640/window.innerWidth).hide();
	$("body").css("zoom",window.innerWidth/640);
//音乐控件	
	var music;
	var audioEle = document.getElementById("audio");
	$("#music").bind("touchstart",function(e){
		if(!music){
			$("#music").css("background","url('images/music_off.png')");
			//$("#audio").pause();
			audioEle.pause();
			$("#music").removeClass("mi");
			music=!music;
		}else{
			$("#music").css("background","url('images/music_on.png')");
			//$("#audio").play();
			audioEle.play();
			$("#music").addClass("mi");
			music=!music;
		}
	});
	
	$("#p1 img").hide(1);
	$("#p2 img").hide(1);
	$("#p3 img").hide(1);
	$("#p4 img").hide(1);
	$("#p5 img").hide(1);
	$("#p6 img").hide(1);
	$("#p7 .p7_word").hide(1);
	$("#p7 .p7_button").hide(1);
	
	$("#p1 img").show().fadeIn(3000);
	
	var startY;
	var endY;
//滑动第一屏	
	$("#p1").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientY;
	});
	$("#p1").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p1").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
			$("#p1 img").hide(1);
			$("#p1").animate({top:"-500px"}).hide(10);
			$("#p2 img").show().fadeIn(3000);
			$("#p2").show().animate({top:"0px"});
			startY=null;
			endY=null;
		}
	});
//滑动第二屏	
	$("#p2").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientY;
	});
	$("#p2").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p2").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
			$("#p2 img").hide();
			$("#p2").animate({top:"-500px"}).hide(10);
			$("#p3 img").show().fadeIn(3000);
			$("#p3").show().animate({top:"0px"});
			startY=null;
			endY=null;
		}
		if(startY-endY<100 && endY!=null){
			$("#p2 img").hide(1);
			$("#p2").animate({top:"1136px"}).hide(10);
			$("#p1 img").show().fadeIn(3000);
			$("#p1").show().animate({top:"0px"});
			startY=null;
			endY=null;
		}
	});
//滑动第三屏	
	$("#p3").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientY;
	});
	$("#p3").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p3").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
			$("#p3 img").hide();
			$("#p3").animate({top:"-500px"}).hide(10);
			$("#p4 img").show().fadeIn(3000);
			$("#p4").show().animate({top:"0px"});
			startY=null;
			endY=null;
		}
		if(startY-endY<-100 && endY!=null){
			$("#p3 img").hide();
			$("#p3").animate({top:"1136px"}).hide(10);
			$("#p2 img").show().fadeIn(3000);
			$("#p2").show().animate({top:"0px"});
			startY=null;
			endY=null;
		}
	});
//滑动第四屏	
	$("#p4").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientY;
	});
	$("#p4").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p4").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
			$("#p4 img").hide();
			$("#p4").animate({top:"-500px"}).hide(10);
			$("#p5 img").show().fadeIn(3000);
			$("#p5").show().animate({top:"0px"});
			startY=null;
			endY=null;
		}
		if(startY-endY<-100 && endY!=null){
			$("#p4 img").hide();
			$("#p4").animate({top:"1136px"}).hide(10);
			$("#p3 img").show().fadeIn(3000);
			$("#p3").show().animate({top:"0px"});
			startY=null;
			endY=null;
		}
	});
//滑动第五屏	
	$("#p5").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientY;
	});
	$("#p5").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p5").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
			$("#p5 img").hide();
			$("#p5").animate({top:"-500px"}).hide(10);
			$("#p6 img").show().fadeIn(3000);
			$("#p6").show().animate({top:"0px"});
			startY=null;
			endY=null;
		}
		if(startY-endY<-100 && endY!=null){
			$("#p5 img").hide();
			$("#p5").animate({top:"1136px"}).hide(10);
			$("#p4 img").show().fadeIn(3000);
			$("#p4").show().animate({top:"0px"});
			startY=null;
			endY=null;
		}
	});
//滑动第六屏	
	$("#p6").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientY;
	});
	$("#p6").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p6").bind("touchend",function(e){
		if(startY-endY>100 && endY!=null){
			$("#p6 img").hide();
			$("#p6").animate({top:"-500px"}).hide(10);
			$("#p7 .p7_word").show().fadeIn(3000);
			$("#p7 .p7_button").show().fadeIn(3000);
			$("#p7").show().animate({top:"0px"});
			$("#arrow").hide();
			
		//	$("#music").css("background","url('images/music_off.png')");
			//$("#audio").pause();
		//	audioEle.pause();
		//	$("#music").removeClass("mi");
		//	music=!music;
			
			startY=null;
			endY=null;
		}
		if(startY-endY<-100 && endY!=null){
			$("#p6 img").hide();
			$("#p6").animate({top:"1136px"}).hide(10);
			$("#p5 img").show().fadeIn(3000);
			$("#p5").show().animate({top:"0px"});
			startY=null;
			endY=null;
		}
	});
	
	
	
	
	
	/*$("#p7 .p7_button").bind("touchstart",function(e){
		$("#em").attr("starttime","2");
	});*/
	
	
	
//滑动第七屏	
	$("#p7").bind("touchstart",function(e){
		startY=e.originalEvent.touches[0].clientY;
	});
	$("#p7").bind("touchmove",function(e){
		endY=e.originalEvent.touches[0].clientY;
	});
	$("#p7").bind("touchend",function(e){
		if(startY-endY<-100 && endY!=null){
			$("#p7 .p7_word").hide();
			$("#p7 .p7_button").hide();
			$("#p7").animate({top:"1136px"}).hide(10);
			$("#p6 img").show().fadeIn(3000);
			$("#p6").show().animate({top:"0px"});
			$("#arrow").show();
			
		//	$("#music").css("background","url('images/music_on.png')");
			//$("#audio").play();
		//	audioEle.play();
			//$("#music").addClass("mi");
			//music=!music;
			
			startY=null;
			endY=null;
		}
	});
	
	
	
	
	
	
	
	
	var imgsstr=["images/logo.png","images/p1_bg.jpg","images/p2_bg.jpg","images/p3_bg.jpg","images/p4_bg.jpg","images/p5_bg.jpg","images/p6_bg.jpg","images/p7_bg2.jpg",
	"images/p1_word.png","images/p2_word.png","images/p3_word.png","images/p4_word.png","images/p5_word.png","images/p6_word.png","images/p7_word.png","images/p1_word.png",
	"images/p7_button.png","images/p7_vedio.png","images/arrow.png","images/music_on.png","images/music_off.png"];
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
						$("#p1 img").show().fadeIn(3000);
					}
				});
			}
		}
		if(loadCount==0){
			$(".loading").hide();
			$("#p1").show();
			$("#p1 img").show().fadeIn(3000);
		}
	}
	
	
	
	
	
	
});