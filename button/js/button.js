$(function(){
	$('.link .button').hover(function(){
		var title = $(this).attr('data');
		$('.tip em').text(title);
		var pos = $(this).position().left;  /*提示按钮居中*/
		var dis = ($('.tip').outerWidth()-$(this).outerWidth())/2;
		var l = pos-dis;
		$('.tip').css({'left':l+'px'}).animate({'top':75,'opacity':0.9},300);
	},function(){
		if(!$('.tip').is(':animated')){
			$('.tip').animate({'top':50,'opacity':0},400);
		}
	})
})

function prepareGallery(){
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
		    var holder = document.getElementById("placeHolder");
			if(holder.firstChild){
				holder.removeChild(holder.firstChild);
			}
			var image = document.createElement("img");
			image.setAttribute("width","100%");
			image.setAttribute("height","300px");
			var source = whichPic.getAttribute("href");
			image.setAttribute("src",source);
			holder.appendChild(image);		
}
window.onload=prepareGallery;
