/**
 * xx平台首页
 * author xxxx(xxxx@corp.netease.com)
 */

/**
 * xx平台首页
 * author xxxx(xxxx@corp.netease.com)
 */

define(['{lib}base/util.js'
       ,'{lib}base/event.js'
       ,'{lib}base/element.js'
       ,'{pro}widget/module.js'],
    function(ut,v,e,Module,p,o,f,r) {
        var pro;

        var _$$IndexModule = NEJ.C();
        pro = _$$IndexModule._$extend(Module);
        
        pro.__init = function(_options) {
            this.__supInit(_options);
            this.__getNodes();
            this.__addEvent();
        };
        
        pro.__getNodes = function(){
            
        };
        
        pro.__addEvent = function(){
           
        };

        _$$IndexModule._$allocate();
    });