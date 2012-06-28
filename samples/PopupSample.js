enyo.kind({
	name: "PopupSample",
	classes: "onyx onyx-sample",
	components: [
		{classes: "onyx-sample-divider", content: "Popups"},
		{classes: "onyx-sample-tools", defaultKind: "onyx.Button", components: [
			{kind: "onyx.Button", content: "Popup...", ontap: "showPopup", popup: "popup"},
			{kind: "onyx.Button", content: "Modal Popup...", ontap: "showPopup", popup: "modalPopup"}
		]},
		{name: "popup", kind: "onyx.Popup", centered: true, floating: true, style: "padding: 10px; font-size: 30px;", content: "Popup..."},
		{name: "modalPopup", kind: "onyx.Popup", centered: true, modal: true, floating: true, style: "padding: 10px; font-size: 30px;", content: "Modal Popup..."},
	],
	showPopup: function(inSender) {
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
		}
	}
});
