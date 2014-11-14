/*
 * --------------------------------------------
 * 消息体生成 包括guid生成规则
 * @version  1.0
 * @author   yuqijun
 * --------------------------------------------
 */
define(['base/util'], function(_ut) {
	var _util ={};
	_util.extend = function(o1, o2 ,override){
    for( var i in o2 ) if( o1[i] == undefined || override){
      o1[i] = o2[i]
    }
    return o1;
  }
	return _util
	
})