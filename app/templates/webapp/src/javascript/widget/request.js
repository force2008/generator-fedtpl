/*
 * --------------------------------------------
 * 项目内工具函数集合，此页面尽量写注释
 * @version  1.0
 * @author   yuqijun(yuqijun@corp.netease.com)
 * --------------------------------------------
 */
define([
    'pro/widget/regular/components/progress/progress',
    'util/ajax/rest',
    'util/ajax/xdr'
    ], function( progress , rest, xdr) {


  /**
   * 平台request, 避免后续需要统一处理
   * opt:  其他参数如 $request
   *   - progress:  是否使用进度条提示(假)
   *   - norest:  是否 不使用REST接口
   */
  var request = function(url, opt){
    opt = opt || {};
    var olderror = opt.onerror || noop,
      oldload = opt.onload || noop;

    if(opt.progress){
      progress.start();
      opt.onload = function(json){
        if(json && json.code>=200 && json.code < 400 ){
          progress.end();
          oldload.apply(this, arguments);
        }else{
          progress.end(true)
          olderror.apply(this, arguments);
        }
      }
      opt.onerror = function(json){
        progress.end(true)
        olderror.apply(this, arguments);
      }
    }
    if(opt.norest){
      xdr._$request(url, opt)
    }else{
      rest._$request(url, opt)
    }
  }
  return request;
})