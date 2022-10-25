/**
* hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne brian(at)cherne(dot)net
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev])}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev])};var handleHover=function(e){var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t)}if(e.type=="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob)},cfg.interval)}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob)},cfg.timeout)}}};return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover)}})(jQuery);

/*
--------------------------------
Infinite Scroll
--------------------------------
+ https://github.com/paulirish/infinite-scroll
+ version 2.0b2.120519
+ Copyright 2011/12 Paul Irish & Luke Shumard
+ Licensed under the MIT license
+ Documentation: http://infinite-scroll.com/
*/

(function(h,d,e){d.infinitescroll=function(a,c,b){this.element=d(b);this._create(a,c)||(this.failed=!0)};d.infinitescroll.defaults={loading:{finished:e,finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>",img:"http://www.infinite-scroll.com/loading.gif",msg:null,msgText:"<em>Loading the next set of posts...</em>",selector:null,speed:"fast",start:e},state:{isDuringAjax:!1,isInvalidPage:!1,isDestroyed:!1,isDone:!1,isPaused:!1,currPage:1},callback:e,debug:!1,behavior:e,binder:d(h),
nextSelector:"div.navigation a:first",navSelector:"div.navigation",contentSelector:null,extraScrollPx:150,itemSelector:"div.post",animate:!1,pathParse:e,dataType:"html",appendCallback:!0,bufferPx:40,errorCallback:function(){},infid:0,pixelsFromNavToBottom:e,path:e};d.infinitescroll.prototype={_binding:function(a){var c=this,b=c.options;b.v="2.0b2.111027";if(b.behavior&&this["_binding_"+b.behavior]!==e)this["_binding_"+b.behavior].call(this);else{if("bind"!==a&&"unbind"!==a)return this._debug("Binding value "+
a+" not valid"),!1;if("unbind"==a)this.options.binder.unbind("smartscroll.infscr."+c.options.infid);else this.options.binder[a]("smartscroll.infscr."+c.options.infid,function(){c.scroll()});this._debug("Binding",a)}},_create:function(a,c){var b=d.extend(!0,{},d.infinitescroll.defaults,a);if(!this._validate(a))return!1;this.options=b;var g=d(b.nextSelector).attr("href");if(!g)return this._debug("Navigation selector not found"),!1;b.path=this._determinepath(g);b.contentSelector=b.contentSelector||this.element;
b.loading.selector=b.loading.selector||b.contentSelector;b.loading.msg=d('<div id="infscr-loading"><img alt="Loading..." src="'+b.loading.img+'" /><div>'+b.loading.msgText+"</div></div>");(new Image).src=b.loading.img;b.pixelsFromNavToBottom=d(document).height()-d(b.navSelector).offset().top;b.loading.start=b.loading.start||function(){d(b.navSelector).hide();b.loading.msg.appendTo(b.loading.selector).show(b.loading.speed,function(){beginAjax(b)})};b.loading.finished=b.loading.finished||function(){b.loading.msg.fadeOut("normal")};
b.callback=function(a,g){b.behavior&&a["_callback_"+b.behavior]!==e&&a["_callback_"+b.behavior].call(d(b.contentSelector)[0],g);c&&c.call(d(b.contentSelector)[0],g,b)};this._setup();return!0},_debug:function(){if(this.options&&this.options.debug)return h.console&&console.log.call(console,arguments)},_determinepath:function(a){var c=this.options;if(c.behavior&&this["_determinepath_"+c.behavior]!==e)this["_determinepath_"+c.behavior].call(this,a);else{if(c.pathParse)return this._debug("pathParse manual"),
c.pathParse(a,this.options.state.currPage+1);if(a.match(/^(.*?)\b2\b(.*?$)/))a=a.match(/^(.*?)\b2\b(.*?$)/).slice(1);else if(a.match(/^(.*?)2(.*?$)/)){if(a.match(/^(.*?page=)2(\/.*|$)/))return a=a.match(/^(.*?page=)2(\/.*|$)/).slice(1);a=a.match(/^(.*?)2(.*?$)/).slice(1)}else{if(a.match(/^(.*?page=)1(\/.*|$)/))return a=a.match(/^(.*?page=)1(\/.*|$)/).slice(1);this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com.");
c.state.isInvalidPage=!0}this._debug("determinePath",a);return a}},_error:function(a){var c=this.options;c.behavior&&this["_error_"+c.behavior]!==e?this["_error_"+c.behavior].call(this,a):("destroy"!==a&&"end"!==a&&(a="unknown"),this._debug("Error",a),"end"==a&&this._showdonemsg(),c.state.isDone=!0,c.state.currPage=1,c.state.isPaused=!1,this._binding("unbind"))},_loadcallback:function(a,c){var b=this.options,g=this.options.callback,f=b.state.isDone?"done":!b.appendCallback?"no-append":"append";if(b.behavior&&
this["_loadcallback_"+b.behavior]!==e)this["_loadcallback_"+b.behavior].call(this,a,c);else{switch(f){case "done":return this._showdonemsg(),!1;case "no-append":"html"==b.dataType&&(c=d("<div>"+c+"</div>").find(b.itemSelector));break;case "append":var i=a.children();if(0==i.length)return this._error("end");for(f=document.createDocumentFragment();a[0].firstChild;)f.appendChild(a[0].firstChild);this._debug("contentSelector",d(b.contentSelector)[0]);d(b.contentSelector)[0].appendChild(f);c=i.get()}b.loading.finished.call(d(b.contentSelector)[0],
b);b.animate&&(f=d(h).scrollTop()+d("#infscr-loading").height()+b.extraScrollPx+"px",d("html,body").animate({scrollTop:f},800,function(){b.state.isDuringAjax=!1}));b.animate||(b.state.isDuringAjax=!1);g(this,c)}},_nearbottom:function(){var a=this.options,c=0+d(document).height()-a.binder.scrollTop()-d(h).height();if(a.behavior&&this["_nearbottom_"+a.behavior]!==e)return this["_nearbottom_"+a.behavior].call(this);this._debug("math:",c,a.pixelsFromNavToBottom);return c-a.bufferPx<a.pixelsFromNavToBottom},
_pausing:function(a){var c=this.options;if(c.behavior&&this["_pausing_"+c.behavior]!==e)this["_pausing_"+c.behavior].call(this,a);else{"pause"!==a&&("resume"!==a&&null!==a)&&this._debug("Invalid argument. Toggling pause value instead");switch(a&&("pause"==a||"resume"==a)?a:"toggle"){case "pause":c.state.isPaused=!0;break;case "resume":c.state.isPaused=!1;break;case "toggle":c.state.isPaused=!c.state.isPaused}this._debug("Paused",c.state.isPaused);return!1}},_setup:function(){var a=this.options;if(a.behavior&&
this["_setup_"+a.behavior]!==e)this["_setup_"+a.behavior].call(this);else return this._binding("bind"),!1},_showdonemsg:function(){var a=this.options;a.behavior&&this["_showdonemsg_"+a.behavior]!==e?this["_showdonemsg_"+a.behavior].call(this):(a.loading.msg.find("img").hide().parent().find("div").html(a.loading.finishedMsg).animate({opacity:1},2E3,function(){d(this).parent().fadeOut("normal")}),a.errorCallback.call(d(a.contentSelector)[0],"done"))},_validate:function(a){for(var c in a)if(c.indexOf&&
-1<c.indexOf("Selector")&&0===d(a[c]).length)return this._debug("Your "+c+" found no elements."),!1;return!0},bind:function(){this._binding("bind")},destroy:function(){this.options.state.isDestroyed=!0;return this._error("destroy")},pause:function(){this._pausing("pause")},resume:function(){this._pausing("resume")},retrieve:function(a){var c=this,b=c.options,g=b.path,f,i,j,h,a=a||null;beginAjax=function(a){a.state.currPage++;c._debug("heading into ajax",g);f=d(a.contentSelector).is("table")?d("<tbody/>"):
d("<div/>");i=g.join(a.state.currPage);j="html"==a.dataType||"json"==a.dataType?a.dataType:"html+callback";a.appendCallback&&"html"==a.dataType&&(j+="+callback");switch(j){case "html+callback":c._debug("Using HTML via .load() method");f.load(i+" "+a.itemSelector,null,function(a){c._loadcallback(f,a)});break;case "html":c._debug("Using "+j.toUpperCase()+" via $.ajax() method");d.ajax({url:i,dataType:a.dataType,complete:function(a,b){(h="undefined"!==typeof a.isResolved?a.isResolved():"success"===b||
"notmodified"===b)?c._loadcallback(f,a.responseText):c._error("end")}});break;case "json":c._debug("Using "+j.toUpperCase()+" via $.ajax() method"),d.ajax({dataType:"json",type:"GET",url:i,success:function(b,d,g){h="undefined"!==typeof g.isResolved?g.isResolved():"success"===d||"notmodified"===d;a.appendCallback?a.template!=e?(b=a.template(b),f.append(b),h?c._loadcallback(f,b):c._error("end")):(c._debug("template must be defined."),c._error("end")):h?c._loadcallback(f,b):c._error("end")},error:function(){c._debug("JSON ajax request failed.");
c._error("end")}})}};if(b.behavior&&this["retrieve_"+b.behavior]!==e)this["retrieve_"+b.behavior].call(this,a);else{if(b.state.isDestroyed)return this._debug("Instance is destroyed"),!1;b.state.isDuringAjax=!0;b.loading.start.call(d(b.contentSelector)[0],b)}},scroll:function(){var a=this.options,c=a.state;a.behavior&&this["scroll_"+a.behavior]!==e?this["scroll_"+a.behavior].call(this):!c.isDuringAjax&&!c.isInvalidPage&&!c.isDone&&!c.isDestroyed&&!c.isPaused&&this._nearbottom()&&this.retrieve()},toggle:function(){this._pausing()},
unbind:function(){this._binding("unbind")},update:function(a){d.isPlainObject(a)&&(this.options=d.extend(!0,this.options,a))}};d.fn.infinitescroll=function(a,c){switch(typeof a){case "string":var b=Array.prototype.slice.call(arguments,1);this.each(function(){var c=d.data(this,"infinitescroll");if(!c||!d.isFunction(c[a])||"_"===a.charAt(0))return!1;c[a].apply(c,b)});break;case "object":this.each(function(){var b=d.data(this,"infinitescroll");b?b.update(a):(b=new d.infinitescroll(a,c,this),b.failed||
d.data(this,"infinitescroll",b))})}return this};var k=d.event,l;k.special.smartscroll={setup:function(){d(this).bind("scroll",k.special.smartscroll.handler)},teardown:function(){d(this).unbind("scroll",k.special.smartscroll.handler)},handler:function(a,c){var b=this,e=arguments;a.type="smartscroll";l&&clearTimeout(l);l=setTimeout(function(){d.event.handle.apply(b,e)},"execAsap"===c?0:100)}};d.fn.smartscroll=function(a){return a?this.bind("smartscroll",a):this.trigger("smartscroll",["execAsap"])}})(window,
jQuery);


/*************************************************
**  jQuery Masonry version 1.3.2
**  Copyright David DeSandro, licensed MIT
**  http://desandro.com/resources/jquery-masonry
**************************************************/
(function(e){var n=e.event,o;n.special.smartresize={setup:function(){e(this).bind("resize",n.special.smartresize.handler)},teardown:function(){e(this).unbind("resize",n.special.smartresize.handler)},handler:function(j,l){var g=this,d=arguments;j.type="smartresize";o&&clearTimeout(o);o=setTimeout(function(){jQuery.event.handle.apply(g,d)},l==="execAsap"?0:100)}};e.fn.smartresize=function(j){return j?this.bind("smartresize",j):this.trigger("smartresize",["execAsap"])};e.fn.masonry=function(j,l){var g=
{getBricks:function(d,b,a){var c=a.itemSelector===undefined;b.$bricks=a.appendedContent===undefined?c?d.children():d.find(a.itemSelector):c?a.appendedContent:a.appendedContent.filter(a.itemSelector)},placeBrick:function(d,b,a,c,h){b=Math.min.apply(Math,a);for(var i=b+d.outerHeight(true),f=a.length,k=f,m=c.colCount+1-f;f--;)if(a[f]==b)k=f;d.applyStyle({left:c.colW*k+c.posLeft,top:b},e.extend(true,{},h.animationOptions));for(f=0;f<m;f++)c.colY[k+f]=i},setup:function(d,b,a){g.getBricks(d,a,b);if(a.masoned)a.previousData=
d.data("masonry");a.colW=b.columnWidth===undefined?a.masoned?a.previousData.colW:a.$bricks.outerWidth(true):b.columnWidth;a.colCount=Math.floor(d.width()/a.colW);a.colCount=Math.max(a.colCount,1)},arrange:function(d,b,a){var c;if(!a.masoned||b.appendedContent!==undefined)a.$bricks.css("position","absolute");if(a.masoned){a.posTop=a.previousData.posTop;a.posLeft=a.previousData.posLeft}else{d.css("position","relative");var h=e(document.createElement("div"));d.prepend(h);a.posTop=Math.round(h.position().top);
a.posLeft=Math.round(h.position().left);h.remove()}if(a.masoned&&b.appendedContent!==undefined){a.colY=a.previousData.colY;for(c=a.previousData.colCount;c<a.colCount;c++)a.colY[c]=a.posTop}else{a.colY=[];for(c=a.colCount;c--;)a.colY.push(a.posTop)}e.fn.applyStyle=a.masoned&&b.animate?e.fn.animate:e.fn.css;b.singleMode?a.$bricks.each(function(){var i=e(this);g.placeBrick(i,a.colCount,a.colY,a,b)}):a.$bricks.each(function(){var i=e(this),f=Math.ceil(i.outerWidth(true)/a.colW);f=Math.min(f,a.colCount);
if(f===1)g.placeBrick(i,a.colCount,a.colY,a,b);else{var k=a.colCount+1-f,m=[];for(c=0;c<k;c++){var p=a.colY.slice(c,c+f);m[c]=Math.max.apply(Math,p)}g.placeBrick(i,k,m,a,b)}});a.wallH=Math.max.apply(Math,a.colY);d.applyStyle({height:a.wallH-a.posTop},e.extend(true,[],b.animationOptions));a.masoned||setTimeout(function(){d.addClass("masoned")},1);l.call(a.$bricks);d.data("masonry",a)},resize:function(d,b,a){a.masoned=!!d.data("masonry");var c=d.data("masonry").colCount;g.setup(d,b,a);a.colCount!=c&&
g.arrange(d,b,a)}};return this.each(function(){var d=e(this),b={};b.masoned=!!d.data("masonry");var a=b.masoned?d.data("masonry").options:{},c=e.extend({},e.fn.masonry.defaults,a,j),h=a.resizeable;b.options=c.saveOptions?c:a;l=l||function(){};g.getBricks(d,b,c);if(!b.$bricks.length)return this;g.setup(d,c,b);g.arrange(d,c,b);!h&&c.resizeable&&e(window).bind("smartresize.masonry",function(){g.resize(d,c,b)});h&&!c.resizeable&&e(window).unbind("smartresize.masonry")})};e.fn.masonry.defaults={singleMode:false,
columnWidth:undefined,itemSelector:undefined,appendedContent:undefined,saveOptions:true,resizeable:true,animate:false,animationOptions:{}}})(jQuery);


//MOLITOR SCRIPTS
function molitorscripts() {
	
	// VARIABLES
	var sidebar = jQuery('#sidebar'),
		sideToggle = jQuery("#sidebarToggle"),
		sidePlus = jQuery("#plusSign"),
		sideAccent = jQuery("#sidebarAccent"),
		theBody = jQuery("body"),
		toggleComments = jQuery('#toggleComments'),
		commentOpen = jQuery('#commentOpen'),
		commentClose = jQuery('#commentClose'),
		backTop = jQuery('#backTop');
		
		
	jQuery('#navigation').click(function(){
		jQuery('#dropmenu').toggleClass('open');
	});
	
	//SIDEBAR HEIGHT FUNCTION
	function sideHeight(){
		var pageHeight = jQuery(window).height() - 30;
		sidebar.css({"height":pageHeight});
	}	
	sideHeight();
	jQuery(window).resize(function() {sideHeight();});
	
	//SIDEBAR CLICK FUNCTION
	jQuery("#sidebarAccent,#plusSign").click(function(){
  		sidebar.toggle(400);
  		sidePlus.toggleClass("closeMe");
  		if(sideToggle.attr('class') == "openSide"){
  			sideToggle.animate({"width":"65px","height":"65px"},400).toggleClass();   
  			sidePlus.animate({"right":"1px","top":"1px"},400);  
  			jQuery('#contentContainer').animate({"opacity":".5"},300);
  			theBody.css({"overflow":"hidden"});
  		} else {
  			sideToggle.animate({"width":"160px","height":"160px"},400).toggleClass(); 
  			sidePlus.animate({"right":"30px","top":"30px"},400);
  			jQuery('#contentContainer').animate({"opacity":"1"},300);	
  			theBody.css({"overflow":"auto"});	
  		}
  	});
  	  	
	//REMOVE TITLE ATTRIBUTE
	jQuery("#dropmenu a, .attachment-post-thumbnail,.postImg img,.thumbLink img").removeAttr("title");
	
	
	//MENU
	jQuery("#dropmenu li").hover(function(){
		jQuery(this).find('ul:first').slideDown(100);
		},function(){
		jQuery(this).find('ul:first').slideUp(100);
	});
	jQuery("#dropmenu ul").css("display", "none").parent().children("a").append(" &nbsp;+");
	
	//COMMENT TOGGLE
	jQuery('#commentToggle').click(function(){
		toggleComments.slideToggle(500);
		commentOpen.toggle(0);
		commentClose.toggle(0);
	}); 
	
	//BACK TO TOP
	backTop.click(function(){
		jQuery("html,body").animate({scrollTop:0},499);
		return false;
	});
	jQuery(document).scroll(function(){
		if(jQuery(document).scrollTop() > 0){
			backTop.fadeIn(200)
		} else {
			backTop.fadeOut(200)
		}
	});
  	
  	//OPACITY ON HOVER
  	jQuery(".postImg img,.thumbLink img").live({
  		mouseenter:function(){
       		jQuery(this).stop().animate({opacity:".8"},200);
       	},mouseleave:function(){
			jQuery(this).stop().animate({opacity:"1"},200);
		}
	});
    
    //iPod - iPhone - iPad
    if(navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod'){
    
    	theBody.addClass('mobileBrowser');
    	    	     	
     	//SIDEBAR HEIGHT FUNCTION
		function sideHeight(){
			var pageHeight = jQuery(window).height();
			sidebar.css({"height":pageHeight});
		}	
		sideHeight();
		jQuery(window).resize(function() {sideHeight();});
	};
	
	//MASONRY
	jQuery('#listing,.listing').masonry({ 
		singleMode: true,
		animate: true,
		itemSelector: '.post:visible, .page:visible'
	});
	jQuery('#postImgs').masonry({ 
		singleMode: true,
		animate: true,
		itemSelector: '.postImg'
	});
	
	//REMOVE LOADING GIF
	jQuery(window).load(function(){
		jQuery("#loaderGif").fadeOut(300);
	});
};