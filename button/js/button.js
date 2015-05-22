$(function(){
	$('.link .button').hover(function(){
		var title = $(this).attr('data');
		$('.tip em').text(title);
		var pos = $(this).position().left;  /*提示按钮居中*/
		var dis = ($('.tip').outerWidth()-$(this).outerWidth())/2;
		var l = pos-dis;
		$('.tip').css({'left':l+'px'}).animate({'top':75,'opacity':0.9},300);
	},function(){
		$('.tip').animate({'top':50,'opacity':0},400);
	})
})

/*function prepareGallery(){
	var links = document.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
			var choosedPart = document.getElementById("choosed");
	        var para = choosedPart.getElementsByTagName("p")[0];
			if(para.firstChild){
				para.removeChild(para.firstChild);
			}
			var des = this.getAttribute("des");
	        var txt = document.createTextNode(des);
	       	para.appendChild(txt);
			
			showPic(this);
			return false;
		}
	}
}

function showPic(whichPic){
		var source = "../"+whichPic.getAttribute("href");
		var placeholder = document.getElementById("placeHolder");
		placeholder.setAttribute("style","background:url("+source+")");
		document.body.style.background="url(1.jpg)";
		placeholder.style.background="url("+source+")";
			
}
window.onload=prepareGallery;*/
