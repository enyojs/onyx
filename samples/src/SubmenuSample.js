var
	kind = require('enyo/kind');

var
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Menu = require('onyx/Menu'),
	MenuDecorator = require('onyx/MenuDecorator'),
	Submenu = require('onyx/Submenu');

module.exports = kind({
	name: 'onyx.sample.SubmenuSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Submenu'},
		{kind: MenuDecorator, onSelect: 'itemSelected', components:[
			{content: 'Contact actions'},
			{kind: Menu, components:[
				{content: 'Add contact'},
				{kind: Submenu, content: 'Sort by...', components:[
					{content: 'First Name'},
					{content: 'Last Name'},
					{content: 'Company'}
				]},
				{content: 'Sync'}
			]}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Nested Submenu'},
		{kind: MenuDecorator, onSelect: 'itemSelected', components: [
			{content: 'Email actions'},
			{kind: Menu, components: [
				{content: 'Reply'},
				{content: 'Forward'},
				{kind: Submenu, content: 'Move to...', components:[
					{kind: Submenu, content: 'Personal...', components:[
						{content: 'Games'},
						{content: 'Recpies'}
					]},
					{kind: Submenu, content: 'Work...', components:[
						{content: 'Primary project'},
						{content: 'Super secret project'}
					]}
				]},
				{content: 'Delete'}
			]}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'menuSelection', classes: 'onyx-sample-result', content: 'No menu selection yet.'}
		]}
	],
	itemSelected: function (sender, event) {
		this.$.menuSelection.setContent(event.originator.content + ' Selected');
	}
});
