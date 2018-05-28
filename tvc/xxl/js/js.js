// JavaScript Document
$(document).ready(function(){
   $(".rule ").bind("touchstart",function(){
	   $(".page").children().removeClass("appear").addClass("noappear");
	   $("#p2").removeClass("noappear").addClass("appear");
   });
   $(".close_rule").bind("touchstart",function(){
	   $(".page").children().removeClass("appear").addClass("noappear");
	   $("#p1").removeClass("noappear").addClass("appear");
   });
   
   $(".begin_game").bind("touchstart",function(){
	   $(".page").children().removeClass("appear").addClass("noappear");
	   $("#p3").removeClass("noappear").addClass("appear");
   });
   
   $(".open_rank").bind("touchstart",function(){
	   $(".page").children().removeClass("appear").addClass("noappear");
	   $("#p4").removeClass("noappear").addClass("appear");
   });
   
   $(".open_data").bind("touchstart",function(){
	   $(".page").children().removeClass("appear").addClass("noappear");
	   $("#p5").removeClass("noappear").addClass("appear");
   });
   $(".open_prize").bind("touchstart",function(){
	   $(".page").children().removeClass("appear").addClass("noappear");
	   $("#p6").removeClass("noappear").addClass("appear");
   });
   
   $(".open_mainpage").bind("touchstart",function(){
	   $(".page").children().removeClass("appear").addClass("noappear");
	   $("#p1").removeClass("noappear").addClass("appear");
   });
});