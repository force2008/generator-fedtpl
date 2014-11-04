/**
 * 基础模块
 * author yuqijun(yuqijun@corp.netease.com)
 */
define(['{lib}util/event.js'
       , '{lib}util/template/tpl.js'
       , '{lib}util/query/query.js'
       , '{pro}widget/BaseComponent.js'
       ],
    function(ut,e, e2) {
        var _ = NEJ.P,
            pro, pn;

        var $$Module = NEJ.C();
        pro = $$Module._$extend(ut._$$EventTarget);

        pro.__init = function(_options) {
            this.__supInit(_options);
            if ( !! _options.tpl)
                e._$parseTemplate(_options.tpl);
            e._$parseTemplate('wgt-tpl');
        };

        
        return $$Module;
    });