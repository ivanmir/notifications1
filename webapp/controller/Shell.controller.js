sap.ui.define([
		"jquery.sap.global",
		"sap/m/MessageToast",
		"sap/ui/core/Fragment",
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel"	
], function(jQuery, MessageToast, Fragment, Controller, JSONModel) {
	"use strict";

	var ControllerController = Controller.extend("Notification1.controller.Shell", {
		
		onInit: function() {
			var oData = {logo: jQuery.sap.getModulePath("sap.ui.core", "/") + "mimes/logo/sap_50x26.png"};
			var oModel = new JSONModel();
			oModel.setData(oData);
			this.getView().setModel(oModel);
		},
		
		handleAlertPress: function(oEvent) {
			
			// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("Notification1", "Notification1.view.fragment.AlertOverlay", this);
				this.getView().addDependent(this._oPopover);
			}

			this._oPopover.openBy(oEvent.getSource());
			

			//mock data
			var aResultData = [];
			for (var i = 0; i < 10; i++) {
				aResultData.push({
									Head: (i + 1) + ". " + "Head",
									Fecha: new Date(),
									Subhead: "Lorem ipsum sit dolem",
									Content: "Lorem ipsum sit dolem Lorem ipsum sit dolem",
									ProductPicUrl: jQuery.sap.getModulePath("sap.ui.core", "/") + "mimes/logo/icoonly_white_100x80.png"
								});
			}
			var oData = {
							NotificationCollection: aResultData
						};
			var oModel = new JSONModel();
			oModel.setData(oData);
			this._oPopover.setModel(oModel);

		},
		
		onNavToProduct : function (oEvent) {
			var oCtx = oEvent.getSource().getBindingContext();
			var oNavCon = Fragment.byId("Notification1", "navCon");
			var oDetailPage = Fragment.byId("Notification1", "detail");
			oNavCon.to(oDetailPage);
			oDetailPage.bindElement(oCtx.getPath());
		},
		
		onNavBack : function (oEvent) {
			var oNavCon = Fragment.byId("Notification1", "navCon");
			oNavCon.back();
		},		

		handlePressConfiguration: function(oEvent) {
			var oItem = oEvent.getSource();
			var oShell = this.byId("myShell");
			var bState = oShell.getShowPane();
			oShell.setShowPane(!bState);
			oItem.setShowMarker(!bState);
			oItem.setSelected(!bState);
		},

		handleLogoffPress: function(oEvent) {
			MessageToast.show("Logoff Button Pressed");
		},

		handleUserItemPressed: function(oEvent) {
			MessageToast.show("User Button Pressed");
		},

		handleSearchItemSelect: function(oEvent) {
			MessageToast.show("Search Entry Selected: " + oEvent.getSource().getTitle());
		},

		handleShellOverlayClosed: function() {
			MessageToast.show("Overlay closed");
		},

		handleSearchPressed: function(oEvent) {
			var sQuery = oEvent.getParameter("query");
			if (sQuery == "") {
				return;
			}

			// create Overlay only once
			if (!this._overlay) {
				this._overlay = sap.ui.xmlfragment(
					"Notification1.view.fragment.ShellOverlay",
					this
				);
				this.getView().addDependent(this._overlay);
			}

			// mock data
			var aResultData = [];
			for (var i = 0; i < 10; i++) {
				aResultData.push({
									title:(i + 1) + ". " + sQuery,
									text:"Lorem ipsum sit dolem"
								});
			}
			var oData = {
							searchFieldContent: sQuery,
							resultData: aResultData
						};
			var oModel = new JSONModel();
			oModel.setData(oData);
			this._overlay.setModel(oModel);

			// set reference to shell and open overlay
			this._overlay.setShell(this.byId("myShell"));
			this._overlay.open();
		}		

	});
	
	return ControllerController;
	
});