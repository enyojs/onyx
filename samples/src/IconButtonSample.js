var
	kind = require('enyo/kind'),
	Control = require('enyo/Control'),
	Group = require('enyo/Group');

var
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Icon = require('onyx/Icon'),
	IconButton = require('onyx/IconButton'),
	ToggleIconButton = require('onyx/ToggleIconButton'),
	Toolbar = require('onyx/Toolbar');

module.exports = kind({
	name: 'onyx.sample.IconButtonSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Icon'},
		{kind: Icon, src: 'assets/menu-icon-bookmark.png' },
		{tag: 'br'},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Icon Button'},
		{kind: IconButton, src: 'assets/menu-icon-bookmark.png', ontap: 'iconTapped'},
		{kind: IconButton, src: 'assets/menu-icon-bookmark.png', disabled: true, ontap: 'iconTapped'},
		{tag: 'br'},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Grouped Icon Buttons'},
		{kind: Group, onActivate: 'iconGroupActivated', components: [
			{kind: IconButton, active: true, src: 'assets/menu-icon-bookmark.png'},
			{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
			{kind: IconButton, src: 'assets/menu-icon-bookmark.png'}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Toggle Icon Buttons'},
		{kind: ToggleIconButton, onChange: 'toggleChanged', src: 'assets/menu-icon-bookmark.png'},
		{kind: ToggleIconButton, onChange: 'toggleChanged', value: true, src: 'assets/menu-icon-bookmark.png'},
		{kind: ToggleIconButton, onChange: 'toggleChanged', disabled: true, src: 'assets/menu-icon-bookmark.png'},
		{kind: ToggleIconButton, onChange: 'toggleChanged', value: true, disabled: true, src: 'assets/menu-icon-bookmark.png'},
		{tag: 'br'},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Icon Buttons in Toolbar'},
		{kind: Toolbar, defaultKind: IconButton, components: [
			{src: 'assets/menu-icon-bookmark.png', ontap: 'iconTapped'},
			{src: 'assets/menu-icon-bookmark.png', ontap: 'iconTapped'},
			{src: 'assets/menu-icon-bookmark.png', ontap: 'iconTapped'},
			{kind: Control},
			{kind: Group, tag: null, onActivate: 'iconGroupActivated', defaultKind: IconButton, components: [
				{src: 'assets/menu-icon-bookmark.png', active: true},
				{src: 'assets/menu-icon-bookmark.png'},
				{src: 'assets/menu-icon-bookmark.png'}
			]}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'result', classes: 'onyx-sample-result', content: 'No button tapped yet.'}
		]}
	],
	iconTappedCounts: {},
	iconTapped: function (sender, event) {
		this.iconTappedCounts[sender.name] = this.iconTappedCounts[sender.name] || 0;
		this.$.result.setContent('The icon button was tapped: ' + (++this.iconTappedCounts[sender.name]));
	},
	toggleChanged: function (sender, event) {
		this.$.result.setContent(sender.name + ' was ' + (sender.getValue() ? ' selected.' : 'deselected.'));
	},
	ordinals: ['1st', '2nd', '3rd'],
	iconGroupActivated: function (sender, event) {
		if (event.originator.getActive()) {
			var selected = event.originator.indexInContainer();
			this.$.result.setContent('The ' + this.ordinals[selected] + ' icon button in the group is selected.');
		}
	}
});