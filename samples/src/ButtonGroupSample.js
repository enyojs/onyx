var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	Button = require('onyx/Button'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	RadioGroup = require('onyx/RadioGroup');

module.exports = kind({
	name: 'onyx.sample.ButtonGroupSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'RadioGroup'},
		{kind: RadioGroup, onActivate: 'radioActivated', components: [
			{content: 'Alpha', active: true},
			{content: 'Beta'},
			{content: 'Gamma'}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'TabGroup'},
		{kind: RadioGroup, onActivate: 'tabActivated', controlClasses: 'onyx-tabbutton', components: [
			{content: 'Alpha', active: true},
			{content: 'Beta'}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Button Group'},
		{kind: Group, onActivate: 'buttonActivated', classes: 'onyx-sample-tools group', defaultKind: Button, highlander: true, components: [
			{content: 'Button A', active: true, classes: 'onyx-affirmative'},
			{content: 'Button B', classes: 'onyx-negative'},
			{content: 'Button C', classes: 'onyx-blue'}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'result', classes: 'onyx-sample-result', content: 'No button tapped yet.'}
		]}
	],
	radioActivated: function (sender, event) {
		if (event.originator.getActive()) {
			this.$.result.setContent('The \'' + event.originator.getContent() + '\' radio button is selected.');
		}
	},
	tabActivated: function (sender, event) {
		if (event.originator.getActive()) {
			this.$.result.setContent('The \'' + event.originator.getContent() + '\' tab button is selected.');
		}
	},
	buttonActivated: function (sender, event) {
		if (event.originator.getActive()) {
			this.$.result.setContent('The \'' + event.originator.getContent() + '\' button is selected.');
		}
	}
});
