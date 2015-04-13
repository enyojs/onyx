var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	Popup = require('onyx/Popup'),
	Spinner = require('onyx/Spinner');

module.exports = kind({
	name: 'onyx.sample.PopupSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Popups'},
		{classes: 'onyx-sample-tools', components: [
			{kind: Button, content: 'Basic Popup', ontap: 'showPopup', popup: 'basicPopup'},
			{name: 'basicPopup', kind: Popup, centered: true, floating: true, classes:'onyx-sample-popup', style: 'padding: 10px;', content: 'Popup...'},
			{tag: 'br'},
			{kind: Button, content: 'Popup w/Spinner (Dark)', ontap: 'showPopup', popup: 'spinnerPopup'},
			{name: 'spinnerPopup', classes: 'onyx-sample-popup', kind: Popup, centered: true, floating: true, onHide: 'popupHidden', scrim: true, components: [
				{kind: Spinner},
				{content: 'Popup'}
			]},
			{tag: 'br'},
			{kind: Button, content: 'Popup w/Spinner (Light)', ontap: 'showPopup', popup: 'lightPopup'},
			{name: 'lightPopup', classes: 'onyx-sample-popup', style: 'background: #eee;color: black;', kind: Popup, centered: true, floating: true, onHide: 'popupHidden', scrim: true, components: [
				{kind: Spinner, classes: 'onyx-light'},
				{content: 'Popup'}
			]},
			{tag: 'br'},
			{kind: Button, content: 'Modal Popup with Input', ontap: 'showPopup', popup: 'modalPopup'},
			{name: 'modalPopup', classes: 'onyx-sample-popup', kind: Popup, centered: true, modal: true, floating: true, onShow: 'popupShown', onHide: 'popupHidden', components: [
				{kind: InputDecorator, components: [
					{kind: Input}
				]},
				{tag: 'br'},
				{kind: Button, content: 'Close', ontap: 'closeModalPopup'},
				{kind: Button, content: 'Another!', ontap: 'showPopup', popup: 'lightPopup'}
			]},
			{tag: 'br'},
			{kind: Button, content: 'Popup at Event (right)', ontap: 'showPopupAtEvent', popup: 'rightEventPopup', style: 'float: right;'},
			{kind: Button, content: 'Popup at Event', ontap: 'showPopupAtEvent', popup: 'leftEventPopup'},
			{name: 'leftEventPopup', classes: 'onyx-sample-popup', kind: Popup, modal: true, floating: true, content: 'Anchor defaults<br/>to top left corner', allowHtml: true},
			{name: 'rightEventPopup', classes: 'onyx-sample-popup', kind: Popup, modal: true, floating: true, content: 'Adjusts anchor to<br/>stay in viewport', allowHtml: true},
			{tag: 'br'},
			{kind: Button, content: 'Two Popups', ontap: 'showTwoPopups'},
			{name: 'firstPopup', classes: 'onyx-sample-popup', kind: Popup, modal: false, floating: true, content: 'Popup 1', style: 'top: 20px; left: 20px'},
			{name: 'secondPopup', classes: 'onyx-sample-popup', kind: Popup, modal: false, floating: true, content: 'Popup 2', style: 'top: 20px; left: 200px'}
		]}
	],
	showPopup: function (sender) {
		var p = this.$[sender.popup];
		if (p) {
			p.show();
		}
	},
	showPopupAtEvent: function (sender, event) {
		var p = this.$[sender.popup];
		if (p) {
			p.showAtEvent(event);
		}
	},
	popupHidden: function () {
		// FIXME: needed to hide ios keyboard
		document.activeElement.blur();
		if(this.$.modalPopup.showing) {   // Refocus input on modal
			this.startJob('focus', function () { this.$.input.focus(); }, 500);
		}
	},
	popupShown: function () {
		// FIXME: does not focus input on android.
		this.$.input.focus();
		this.startJob('focus', function () { this.$.input.focus(); }, 500);
	},
	closeModalPopup: function () {
		this.$.modalPopup.hide();
	},
	showTwoPopups: function () {
		this.$.firstPopup.show();
		this.$.secondPopup.show();
		this.startJob('clearSecond', function () { this.$.secondPopup.hide(); }, 2000);
	}
});