/*
 * --------------------------------------------
 * BaseComponent 指令扩展
 * @version  1.0
 * @author   hzzhenghaibo(hzzhenghaibo@corp.netease.com)
 * --------------------------------------------
 */
define([
  'pro/lib/regularjs/dist/regular'
  ], function( _ ,  s, j ){

  // Regular中的dom帮助函数
  var dom = Regular.dom;

  var directives = {
    /**
     * lazymodel用来处理，当r-model表达式也是由表达式生成的的情况，
     * 我们先通过get获取字符串，然后用`r-model`处理
     * @return {Function} [distroy]
     */
    'r-lazy-model': function(elem, value){
      var dmodel = Regular.directive('r-model'),
        value = this.$get(value);
        
      var destroy = dmodel.link.call(this.$context, elem, value, 'r-model');

      window.app = this.$context;
      return destroy;
    },
	// <b class="i-warn f-cp" data-clazz="u-tooltip-1" data-placement="right" data-content="tip" r-tooltip></b>
	'r-tooltip': function(elem, value){
      t0._$$ToolTipWrap._$allocate({element: elem});
    }

  }

  var events = {

    // on-upload 的custom event实现
    // 注意 on-upload 必须绑定在 label上

    'upload': function(elem, fire, attrs){
      // 我们需要另外一个属性以提取参数

      

    }
  }






  return {
    events: events,
    directives: directives
  };

})