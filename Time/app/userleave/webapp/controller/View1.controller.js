sap.ui.define(["sap/ui/core/mvc/Controller"],
function(e){"use strict";
return e.extend("userleave.controller.View1",{
    onInit:function(){
        this.oModel=this.getOwnerComponent().getModel()},
        onItemPress:function(e){
            var o=e.getSource();
            if(o){
                var t=o.getBindingContext();
                if(t){
                    var n=t.getProperty("userId");
                    console.log(n)}}
                    var r=sap.ui.core.UIComponent.getRouterFor(this);
                    r.navTo("view2",{userId:n}
                    )}})});
