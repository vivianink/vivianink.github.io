(function($){
	var defaults = {
		'container' : '#container',//容器
		'sections' : '.section',//子容器
		'easing' : 'ease',//特效方式，ease-in,ease-out,linear
		'duration' : 900,//每次动画执行的时间
		'pagination' : true,//是否显示分页
		'loop' : true,//是否循环
	};

	var win = $(window),
		container,sections;
	var winH = win.height();

	var opts = {},
		canScroll = true;

	var iIndex = 0;

	var arrElement = [];

	var SP = $.fn.switchPage = function(options){
		opts = $.extend({}, defaults , options||{});

		container = $(opts.container),
		sections = container.find(opts.sections);

		sections.each(function(){
			arrElement.push($(this));
		});

		return this.each(function(){	
			if(opts.pagination){
				initPagination();
			}		
		});
	}

	//滚轮向上滑动事件
	SP.moveSectionUp = function(){
		if(iIndex){
			iIndex--;
		}else if(opts.loop){
			iIndex = arrElement.length-1;
		}
		scrollPage(arrElement[iIndex]);
	};

	//滚轮向下滑动事件
	SP.moveSectionDown = function(){
		if(iIndex<(arrElement.length-1)){
			iIndex++;
		}else if(opts.loop){
			iIndex = 0;
		}
		scrollPage(arrElement[iIndex]);
	};

	//私有方法
	//页面滚动事件
	function scrollPage(element){
		var dest = element.position(); //目标页面的位置
		if(typeof dest === 'undefined'){ return; }
		initEffects(dest,element);
	}

	//重写鼠标滑动事件
	$(document).on("mousewheel DOMMouseScroll", MouseWheelHandler);
	function MouseWheelHandler(e) {
		e.preventDefault();
		var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
		var delta = Math.max(-1, Math.min(1, value));
		if(canScroll){
			if (delta < 0) {
				SP.moveSectionDown();
			}else {
				SP.moveSectionUp();
			}
		}
		return false;
	}

	//初始化分页
	function initPagination(){
		var length = sections.length;
		if(length){

		}
		var pageHtml = '<ul id="pages"><li class="active"></li>';
		for(var i=1;i<length;i++){
			pageHtml += '<li></li>';
		}
		pageHtml += '</ul>';
		$("body").append(pageHtml);
	}

	//分页事件
	function paginationHandler(){
		var pages = $("#pages li");
		pages.eq(iIndex).addClass("active").siblings().removeClass("active");
	}

	//渲染效果
	function initEffects(dest,element){
    	canScroll = false;
		var cssObj = {top: -dest.top};
        
		container.animate(cssObj, opts.duration, function(){
			canScroll = true;
			var contTop = Math.abs(container.position().top);
			if(contTop==winH && opts.eduDone==false){
				opts.animationFunc.eduPage();
				opts.eduDone=true;
				return;
			}
			else if(contTop==2*winH){
				opts.animationFunc.skillPage();
				return;
			}
			else if(contTop==3*winH){
				opts.animationFunc.demoShowPage();
				return;
			}
			else if(contTop==4*winH && opts.interDone==false){
				opts.animationFunc.interPage();
				opts.interDone = true;
				return;
			}else if(contTop==5*winH){
				opts.animationFunc.hirePage();
			}
		});
		element.addClass("active").siblings().removeClass("active");
		if(opts.pagination){
			paginationHandler();
		}
	}

	//窗口Resize
	var resizeId;
	win.resize(function(){
		clearTimeout(resizeId);
		resizeId = setTimeout(function(){
			reBuild();
		},500);
	});

	function reBuild(){
		var currentHeight = win.height(),
			currentWidth = win.width();

		var element = arrElement[iIndex];
		var offsetTop = element.offset().top;
		if(Math.abs(offsetTop)>currentHeight/2 && iIndex <(arrElement.length-1)){
			iIndex ++;
		}
		if(iIndex){
			paginationHandler();
			var cuerrentElement = arrElement[iIndex],
				dest = cuerrentElement.position();
			initEffects(dest,cuerrentElement);
		}
	}

})(jQuery);