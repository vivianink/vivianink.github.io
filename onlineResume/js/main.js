 window.onload=function(){

      $("#container").switchPage({
        'animationFunc':{
          eduPage:eduPageFunc,
          skillPage:skillFageFunc,
          demoShowPage:demoShowPageFunc,
          interPage:interPageFunc,
          hirePage:hirePageFunc
        },
        'eduDone':false,
        'interDone':false
      });
   

    /*section0 头像上升*/
    var img = new Image();
    img.src = 'imgs/fontPageBg.jpg';
    if(img.width!=0){
        $('.loading').remove();
        $('.headImg, .selfInfoCont').fadeIn('slow',function(){
           $(this).addClass('moveUp');
        });    
    }
    
   /*section1 教育背景页面*/
   function eduPageFunc(){
       //气泡上升
       function bubbleMove(ele,options,initPos){
           var timer = setInterval(function(){
               var bt = getInitPos(ele).bt,
                   lt = getInitPos(ele).lt;
             if(bt <= options.maxHeight){
                 ele.css('bottom',(bt+options.moveStep)+'px');
                 if(options.direc.right<options.moveDist){
                      ele.css('left',(lt+options.moveStep)+'px');
                      options.direc.right++; 
                      options.direc.left=0;          
                 }else{
                     if(options.direc.left<options.moveDist){
                        ele.css('left',(lt-options.moveStep)+'px');
                        options.direc.left++;
                     }else{
                        options.direc.right = 0; 
                     } 
                 }
                  
             }else{
                 ele.css({'bottom':initPos.bt+'px','left':initPos.lt+'px'});
                 return;
             }      
          },100);       
       }
       function getInitPos(ele){
         var initPos = {
             bt:parseInt(ele.css('bottom').split('p')[0]),
             lt:parseInt(ele.css('left').split('p')[0])
         };
         return initPos;
       }

       var options1 = {
          moveStep:1,   
          maxHeight:180,
          moveDist:Math.ceil(Math.random()*40),
          direc: {
            left:0,
            right:0
          }
       };
       var options2 = {
          moveStep:1,   
          maxHeight:170,
          moveDist:Math.ceil(Math.random()*45),
          direc: {
            left:0,
            right:0
          }
       };
       var options3 = {
          moveStep:1,   
          maxHeight:170,
          moveDist:Math.ceil(Math.random()*55),
          direc: {
            left:0,
            right:0
          }
       };
        var options4 = {
          moveStep:1,   
          maxHeight:170,
          moveDist:Math.ceil(Math.random()*30),
          direc: {
            left:0,
            right:0
          }
       };

      $('.bubble').each(function(index){
         var initPos = getInitPos($(this));
         switch(index){
          case 0:
              bubbleMove($(this),options1,initPos);
            case 1:
              bubbleMove($(this),options2,initPos);
            case 2:
              bubbleMove($(this),options3,initPos);
            case 3:
              bubbleMove($(this),options4,initPos);
         };
      });
        
   
  }
    /*section2 掌握技能页面*/
    function skillFageFunc(){
        // 环形进度条
        $('.circle').each(function(index, el) {
            var num = $(this).find('span').text() * 3.6;
            var right = $(this).find('.right');
            var left = $(this).find('.left');
            var timer=null;
            if (num<=180) {
                var deg=0;
                timer = setInterval(function(){
                   if(deg<=num){
                      right.css('transform', "rotate(" + deg + "deg)") ;
                      deg++;               
                   }else{
                      clearInterval(timer);
                   }
                },10);
            }
            else {
                var deg = 0;
                right.css('transform', "rotate(180deg)");
                timer = setInterval(function(){
                   if(deg<=(num-180)){
                      left.css('transform', "rotate(" + deg + "deg)") ;
                      deg++;
                   }else{
                      clearInterval(timer);
                   }
                },10);
            };
        });
    }

   /*section3 demo展示*/
   function demoShowPageFunc(){
       //鱼群游动
       var fishes = $('.proFishes1,.proFishes2').find('li');
       fishes.each(function(){
          //获取初始位置等相关属性
          this.initProp = {
              top:$(this).position().top,
              opacity:parseFloat($(this).css('opacity'))
          };
          var ph = $(this).parent().innerHeight();
          var min = Math.random()*10;
          this.hmMax = Math.ceil(min+Math.random()*20);   
          this.hmCount = {
          mu:1,
          md:1
          }
          this.dark = true;

          //设置小鱼游动和透明度变化
          var op = 0.1;
          var self = this,
              $self = $(this);
          var timer = setInterval(function(){
              //获取当前位置
            self.curProp = {
                left:$self.position().left, //返回number类型的数据
                top:$self.position().top,
                opacity:parseFloat($self.css('opacity'))  //返回string类型数据
            }; 
            //移动  
              if(self.hmCount.mu <= self.hmMax && self.curProp.top>=0){  //向上移动
                 $self.css('top',(self.curProp.top-1)+'px');
                 self.hmCount.mu++;
                 self.hmCount.md = 1;
              }else {
                 if(self.hmCount.md <= self.hmMax && self.curProp.top< ph){  //向下移动
                   $self.css('top',(self.curProp.top+1)+'px');
                   self.hmCount.md++;
               }else{
                   self.hmCount.mu = 1;
                 }
              }
              //透明度设置
              if(self.dark && self.curProp.opacity>=0.3){  //变透明
                   $self.css('opacity',self.curProp.opacity-0.05);
              }else{ //变亮
                   self.dark=false;
                   if(self.curProp.opacity < self.initProp.opacity){
                      $self.css('opacity',self.curProp.opacity+0.05);
                   }else{
                      self.dark=true;
                   }
              }
          },150);

       });

       //demo hover效果和点击打开新窗口
       $('.pro').each(function(){

        var proTlt = $(this).find('.proTlt'),
            jf = $(this).find('.jumpFish'),
          ms = $(this).find('.jumpMask');

          $(this).hover(function(){
               proTlt.css({'color':'#FF6666','font-weight':'bolder'});
             jf.show();
             ms.show();
             jf.animate({
               bottom:'60%',
               opacity:0.9
             },800,function(){
                 jf.fadeOut('500',function(){
                    jf.css({'bottom':'26px','opacity':0.1});
                    ms.fadeOut('1000');
                 })
             });
               
         },function(){
             proTlt.css({'color':'#fff','font-weight':'normal'});
             ms.hide();
         });
       });

       $('#pro1').click(function(){
          window.open('http://vivianink.github.io/button/button.html','choose a gift');
       });
       $('#pro1').click(function(){
          window.open('url','windowname');
       });
       $('#pro1').click(function(){
          window.open('url','windowname');
       });   
     }
   

   /*section4 实习页面*/
   function interPageFunc(){
     //设置图片宽高
     function setWdHt(eles,scale){
     	  var countGroup=1;
     	  eles.each(function(idx){
           this.wh = {
  			 w:$(this).outerWidth(),
  			 h:$(this).outerHeight()
  		};
  		if(idx%2==0){ //每组的起点
             $(this).css({'width':this.wh.w*(scale-0.1*countGroup)+'px','height':this.wh.h*(scale-0.1*countGroup)+'px'})
  		}else{  //每组第二个元素
             $(this).css({'width':this.wh.w*(scale-0.1*countGroup)+'px','height':this.wh.h*(scale-0.1*countGroup)+'px'})
             countGroup++;
  		}
     	  });
     }

     var sidePic = $('.picLib li').not(':last-child');
     var centerPic = $('.centerPic');
     
     //设置图片宽高
     setWdHt(sidePic,0.95);

     //图片散开
     var mr = Math.ceil(centerPic.outerWidth()*0.9); //向右移动距离
     var ml = 0;
     var mv = 15; //垂直方向移动距离

     function spreadPic(mr,ml,mv){
     	    var lastGpWidth = 0; //上一组图片宽度
             
  		sidePic.each(function(idx){
  			this.prop = {
  				 tp:$(this).position().top,
  				 lt:$(this).position().left,
  				 w:$(this).outerWidth(),
  				 h:$(this).outerHeight()
  			};

  			if(idx%2==0){ //每组第一张图片向右移动
  		        $(this).animate({
  		            top: this.prop.tp-mv+'px',
  		            left:this.prop.lt+mr+'px'		         
  		   	  	 },1200);

  		        if(idx = 0){ //第一组图片
  		        	lastGpWidth = centerPic.outerWidth();	
  		        }else{
  		        	lastGpWidth = this.prop.w;
  		        }
  		        	        
  		    }else{ //每组第二张图向左移动
                  ml+=this.prop.w-Math.ceil(lastGpWidth*0.1);
  		    	$(this).animate({
  		            top: this.prop.tp-mv+'px',
  		            left:this.prop.lt-ml+'px'		         
  		   	  	},1200);

                  mr+=Math.ceil(this.prop.w*0.9);
                  mv*=2;
  		    }
  		})
     }   
     spreadPic(mr,ml,mv);
   }

   /*section5 hirePage*/
   function hirePageFunc(){
     $('#section5 h2,.contactBox').addClass('moveDown')
   }
}