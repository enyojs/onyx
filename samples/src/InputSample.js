var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	Checkbox = require('onyx/Checkbox'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	RichText = require('onyx/RichText'),
	TextArea = require('onyx/TextArea');

module.exports = kind({
	name: 'onyx.sample.InputSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Inputs'},
		{classes: 'onyx-toolbar-inline', components: [
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Enter text here', onchange: 'inputChanged'}
			]},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Search term', onchange: 'inputChanged'},
				{kind: 'Image', src: 'assets/search-input-search.png'}
			]},
			{kind: InputDecorator, components: [
				{kind: Input, type: 'password', placeholder: 'Enter password', onchange: 'inputChanged'}
			]},
			{content: 'alwaysLookFocused: '},
			{kind: Checkbox, onchange: 'changeFocus'}
		]},
		{classes: 'onyx-toolbar-inline', components: [
			{kind: InputDecorator, components: [
				{kind: Input, disabled: true, value: 'Disabled input'}
			]},
			{kind: InputDecorator, components: [
				{content: 'Left: '},
				{kind: Input, value: 'Input Area', onchange: 'inputChanged'},
				{content: ' :Right'}
			]}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'RichTexts'},
		{classes: 'onyx-toolbar-inline', components: [
			{kind: InputDecorator, components: [
				{kind: RichText, style: 'width: 200px;', placeholder: 'Enter text here', onchange: 'inputChanged'}
			]},
			{kind: InputDecorator, components: [
				{kind: RichText, style: 'width: 200px;', placeholder: 'Search term', onchange: 'inputChanged'},
				{kind: 'Image', src: 'assets/search-input-search.png'}
			]}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'TextAreas'},
		{classes: 'onyx-toolbar-inline', components: [
			{kind: InputDecorator, components: [
				{kind: TextArea, placeholder: 'Enter text here', onchange: 'inputChanged'}
			]},
			{kind: InputDecorator, components: [
				{kind: TextArea, placeholder: 'Search term', onchange: 'inputChanged'},
				{kind: 'Image', src: 'assets/search-input-search.png'}
			]}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'result', classes: 'onyx-sample-result', content: 'No input entered yet.'}
		]}
	],
	inputChanged: function (sender, event) {
		this.$.result.setContent('Input: ' + sender.getValue());
	},
	changeFocus: function (sender, event) {
		utils.forEach([this.$.inputDecorator, this.$.inputDecorator2, this.$.inputDecorator3], function(inItem) {
			inItem.setAlwaysLooksFocused(sender.getValue());
			// If disabling alwaysLooksFocused, we need to blur the
			// InputDecorator for the setting to go into effect
			if (!sender.getValue()) {
				inItem.triggerHandler('onblur');
			}
		});
	}
});