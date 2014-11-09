nej新的版本已经加入注入功能，但还是兼容了老的命名空间形式

|- xxx  平台的缩写，公共方法、对象、类必须放到这个名字空间下
  |- m    module的缩写，各模块(页面)的名字空间（扩展nej.e）
  |- u    util的缩写，云计算系统的公共功能性方法、对象、类的名字空间
  |- ui   user interface的缩写，云计算系统的公共UI方法、对象、类的名字空间
  |- w    widget的缩写，云计算系统中的弹窗相关方法、对象、类的名字空间
  |- d    data的缩写，数据的名字空间
  |- l    layer的缩写，窗体，卡片，弹层的名字空间

模块都依赖'{pro}widget/module.js' 这个文件
继承于 _pn._$$Module
可参照index.js的写法

每个依赖的类都会注入到回调函数的变量上，一一对应，最后返回的是对象
最后的4个参数如果没用用到可以去掉，如查用了注入的形式，上面的命名空间的类组织形式就可以去掉了。

define([ 'base/klass', 
         'base/util', 
         'base/event', 
         'base/element', 
         'util/event',
     'ui/base', 
     'util/template/tpl',  
     'text!./address.html',
     'util/form/form',
     'pro/widget/util/address'],
    function(k, ut, v, e, t, i, e1,  html,ut1,Address, p, o, f, r) {
      var pro, sup, seed_html = e1._$addNodeTemplate(html);

      /**
       * 全局状态控件
       * @class   {nm.i._$$Address}
       * @extends {nej.ui._$$Abstract}
       */
      p._$$Address = k._$klass();
      pro = p._$$Address._$extend(i._$$Abstract);
      sup = p._$$Address._$supro;

      return p._$$Address;
    })