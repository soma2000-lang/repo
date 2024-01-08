sap.ui.define([
  "sap/ui/core/mvc/Controller",
 
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
      "use strict";

      return Controller.extend("userleave.controller.view2", {
          
          onInit: function () {
              var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
              oRouter.getRoute("view2");
              this.initJsonModel();

          }
          
      });
  });
