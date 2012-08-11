/**
	_onyx.InputDecorator_ is a control that provides input styling. Any controls
	in the InputDecorator will appear to be inside an area styled as an	input.
	Usually, an InputDecorator surrounds an	<a href="#onyx.Input">onyx.Input</a>.

		{kind: "onyx.InputDecorator", components: [
			{kind: "onyx.Input"}
		]}

	Other controls, such as buttons, may be placed to the right or left of the
	input control, e.g.:

		{kind: "onyx.InputDecorator", components: [
			{kind: "onyx.IconButton", src: "search.png"},
			{kind: "onyx.Input"},
			{kind: "onyx.IconButton", src: "cancel.png"}
		]}

	Note that the InputDecorator fits around the content inside it. If the
	decorator is sized, then its contents will likely need to be sized as well.

		{kind: "onyx.InputDecorator", style: "width: 500px;", components: [
			{kind: "onyx.Input", style: "width: 100%;"}
		]}
*/
enyo.kind({
	name: "onyx.InputDecorator",
	kind: "enyo.ToolDecorator",
	tag: "label",
	classes: "onyx-input-decorator",
	published:{
		//* Set to true to make the input look focused when it's not.
		alwaysLooksFocused:false
	},
	//* @protected
	handlers: {
		onDisabledChange: "disabledChange",
		onfocus: "receiveFocus",
		onblur: "receiveBlur"
	},
	create:function() {
		this.inherited(arguments);
		this.updateFocus(false);
	},
	alwaysLooksFocusedChanged:function(oldValue) {
		this.updateFocus(this.focus);
	},
	updateFocus:function(focus) {
		this.focused = focus;
		this.addRemoveClass("onyx-focused", this.alwaysLooksFocused || this.focused);
	},
	receiveFocus: function() {
		this.updateFocus(true);
	},
	receiveBlur: function() {
		this.updateFocus(false);
	},
	disabledChange: function(inSender, inEvent) {
		this.addRemoveClass("onyx-disabled", inEvent.originator.disabled);
	}
});