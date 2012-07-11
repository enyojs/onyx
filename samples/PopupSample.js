enyo.kind({
	name: "onyx.sample.PopupSample",
	classes: "onyx onyx-sample",
	components: [
		{classes: "onyx-sample-divider", content: "Popups"},
		{classes: "onyx-sample-tools", components: [
			{kind: "onyx.Button", content: "Basic Popup", ontap: "showPopup", popup: "basicPopup"},
			{name: "basicPopup", kind: "onyx.Popup", centered: true, floating: true, classes:"onyx-sample-popup", style: "padding: 10px;", content: "Popup..."},
			{tag: "br"},
			{kind: "onyx.Button", content: "Popup w/Spinner (Dark)", ontap: "showPopup", popup: "spinnerPopup"},
			{name: "spinnerPopup", classes: "onyx-sample-popup", kind: "onyx.Popup", centered: true, floating: true, onHide: "popupHidden", scrim: true, components: [
				{kind: "onyx.Spinner"},
				{content: "Popup"}
			]},
			{tag: "br"},
			{kind: "onyx.Button", content: "Popup w/Spinner (Light)", ontap: "showPopup", popup: "lightPopup"},
			{name: "lightPopup", classes: "onyx-sample-popup", style: "background: #eee;color: black;", kind: "onyx.Popup", centered: true, floating: true, onHide: "popupHidden", scrim: true, components: [
				{kind: "onyx.Spinner", classes: "onyx-light"},
				{content: "Popup"}
			]},
			{tag: "br"},
			{kind: "onyx.Button", content: "Modal Popup with Input", ontap: "showPopup", popup: "modalPopup"},
			{name: "modalPopup", classes: "onyx-sample-popup", kind: "onyx.Popup", centered: true, modal: true, floating: true, onShow: "popupShown", onHide: "popupHidden", components: [
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input"}
				]},
				{tag: "br"},
				{kind: "onyx.Button", content: "Close", ontap: "closeModalPopup"},
				{kind: "onyx.Button", content: "Another!", ontap: "showPopup", popup: "lightPopup"}
			]}
		]}
	],
	showPopup: function(inSender) {
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
		}
	},
	popupHidden: function() {
		// FIXME: needed to hide ios keyboard
		document.activeElement.blur();
		if(this.$.modalPopup.showing) {   // Refocus input on modal
			enyo.job("focus", enyo.bind(this.$.input, "focus"), 500);
		}
	},
	popupShown: function() {
		// FIXME: does not focus input on android.
		this.$.input.focus();
		enyo.job("focus", enyo.bind(this.$.input, "focus"), 500);
	},
	closeModalPopup: function() {
		this.$.modalPopup.hide();
	}
	
});
