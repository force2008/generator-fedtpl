/**
 * Regular Component 基类，用于启动整页component
 * author 
 */
define([
  "pro/lib/regularjs/dist/regular",
  "base/element",
  "pro/widget/regular/directive/index",
  "pro/widget/regular/filter/index",
  "pro/widget/request"
], function(x, e, directive, filters, formModule,request){


  var noop = function(){},
      config = {BEGIN: "{{", END: "}}"};

  if(Regular.config){
    Regular.config(config);
  }


  // BaseComponent与Hub没有任何关系， 它是整个工程的基础Regular组件(基类)，
  // 主要是作为容器使用, 你可以通过扩展BaseComponent来达到工程范围内的组件能力
  // 具体: http://regularjs.github.io/guide/zh/core/use.html
  // 
  var BaseComponent = Regular.extend({
    // TODO
	config:function(data){
		if(data.css){
			data.css = e._$pushCSSText(data.css)
		}
	},
    $request: function(url, options){
      var self = this;
      var olderror = options.onerror || noop,
        oldload = options.onload || noop;


      self.$update("loading", true);
      function oncomplete(){
        self.$update("loading", false);
      }

      options.onload = oldload._$aop(null, oncomplete).bind(this);
      options.onerror = olderror._$aop(null, oncomplete).bind(this);

      request(url, options)
    }
  })// À©Õ¹Ö¸ÁîºÍÊÂ¼þ
    .directive(directive.directives)
    .event(directive.events)
    .filter(filters)

  

  return BaseComponent;
})