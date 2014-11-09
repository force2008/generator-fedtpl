/**
 * 活动列表筛选
 * author hzzhenghaibo(hzzhenghaibo@corp.netease.com)
 */

define([
  "text!./list.html",
  "pro/widget/regular/ListComponent"
  ], function(tpl, ListComponent,notify){
  var ActList = ListComponent.extend({
    url: "/ajaxUrl",
    template: tpl,

    // @子类修改
    watchedAttr: ['current', 'auditState', 'city'],
  	_sendReq:function(_url,_data){
  	    this.$request(_url,{
            method:'post',
            query:_data,
            onload:function(_json){
          	  notify.notify({
                    type: "success",
                    message: _json.message
                  });
                this.$emit('updatelist');
            },
            onerror:function(_error){
          	  notify.notify({
                    type: "error",
                    message: _error.message
                  });
            }
        });


  	},
  	operate: function(_id,_opt,_auditValue){
  	  var _url = this.api + _opt,
  	      _data = {id:_id,auditValue:_auditValue};
  	  	  	
        this._sendReq(_url,_data);
      },
  	__getList: function(){
        var data = this.data;
        var self = this;
        // this.$request(this.url, {
        //   progress: true,
        //   data: this.getListParam(),
        //   onload: function(json){
        //     data.total = json.total;
        //     data.list = json.list;
        //   },
        //   onerror: function(json){
        //   	notify.notify({
        //           type: "error",
        //           message: "网络异常，稍后再试！"
        //         });
        //   }
        // })
        // 以上是真实环境的代码，现模拟异步请求
        setTimeout(function(){
          data.list = [{name:'1',id:1},{name:'4',id:4},{name:'3',id:3},{name:'2',id:2},
                        {name:'1',id:1},{name:'4',id:4},{name:'3',id:3},{name:'2',id:2},
                        {name:'1',id:1},{name:'4',id:4},{name:'3',id:3},{name:'2',id:2},
                        {name:'1',id:1},{name:'4',id:4},{name:'3',id:3},{name:'2',id:2},
                        {name:'1',id:1},{name:'4',id:4},{name:'3',id:3},{name:'2',id:2}]
          data.total = 20;
          self.$update();
        },1000)

      },
      update:function(_item){
          var _win = new AddWin({data:{title:'修改分类',name:_item.name}});
          _win.$on('onok',function(_event){
            
            this.$request(this.api+'update',{
                    method:'POST',
                    data:{id:_item.id,name:_item.name},
                    onload:function(_json){
                     if(_json.code==200){
                       notify.show('分类更新成功');
                      _item.name = _event.name
                     }
                        //this.$emit('updatelist');
                    },
                    onerror:function(_error){
                        notify.showError('分类更新失败');
                    }
                });
            _win.close();
          }._$bind(this))
        },
        remove:function(_item,_index){
           this.$request(this.api+'remove',{
                 method:'POST',
                 data:{id:_item.id},
                 onload:function(_json){
                   if(_json.code==200){
                     notify.show('操作成功');
                     this.data.list.splice(_index,1);
                   }
                     //this.$emit('updatelist');
                 }._$bind(this),
                 onerror:function(_error){
                     notify.showError('操作失败');
                 }
             });
        },
        newCategory:function(_item,_index){
          var _win = new AddWin({data:{title:'添加分类'}});
          _win.$on('onok',function(_event){
            this.$request(this.api+'add',{
                    method:'POST',
                    data:{name:_event.name},
                    onload:function(_json){
                      if(_json.code==200){
                        notify.show('添加成功');
                        this.data.list.push({name:_json.result.dirName,id:_json.result.id});
                      }
                        //this.$emit('updatelist');
                    }._$bind(this),
                    onerror:function(_error){
                        notify.showError('操作失败');
                    }
                });
            _win.close();
          }._$bind(this))
        }
    });

    return ActList;

})