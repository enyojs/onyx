var
	kind = require('enyo/kind'),
	Scroller = require('enyo/Scroller'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');

var
	Button = require('onyx/Button'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	IconButton = require('onyx/IconButton'),
	Menu = require('onyx/Menu'),
	MenuDecorator = require('onyx/MenuDecorator'),
	MenuItem = require('onyx/MenuItem'),
	Toolbar = require('onyx/Toolbar');

module.exports = kind({
	name: 'onyx.sample.MenuSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Menus in Toolbars'},
		{kind: Toolbar, classes: 'onyx-menu-toolbar', components: [
			{kind: MenuDecorator, onSelect: 'itemSelected', components: [
				{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
				{kind: Menu, components: [
					{components: [
						{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
						{content: 'Bookmarks'}
					]},
					{content: 'Favorites'},
					{classes: 'onyx-menu-divider'},
					{content: 'Recents'}
				]}
			]},
			{kind: MenuDecorator, onSelect: 'itemSelected', components: [
				{content: 'Bookmarks menu'},
				{kind: Menu, components: [
					{components: [
						{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
						{content: 'Bookmarks'}
					]},
					{content: 'Favorites'},
					{classes: 'onyx-menu-divider'},
					{content: 'Recents'}
				]}
			]}
		]},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Menus from Buttons'},
		{kind: MenuDecorator, onSelect: 'itemSelected', components: [
			{content: 'Popup menu (floating)'},
			{kind: Menu, floating: true, components: [
				{content: '1'},
				{content: '2'},
				{classes: 'onyx-menu-divider'},
				{content: '3'}
			]}
		]},
		{tag: 'br'},
		{kind: MenuDecorator, onSelect: 'itemSelected', components: [
			{content: 'Scrolling Popup menu'},
			{kind: Menu, components: [
				{name: 'menuScroller', kind: Scroller, defaultKind: MenuItem, vertical: 'auto', classes: 'enyo-unselectable', maxHeight: '200px', strategyKind: TouchScrollStrategy, components: [
					{content: '1'},
					{content: '2'},
					{classes: 'onyx-menu-divider'},
					{content: '3'},
					{content: '4'},
					{content: '5'},
					{classes: 'onyx-menu-divider'},
					{content: '6'},
					{content: '7'}
				]}
			]}
		]},
		{tag: 'br'},
		{kind: MenuDecorator, onSelect: 'itemSelected', components: [
			{content: 'Split Popup menu', kind: Button, onActivate: 'preventMenuActivate', style: 'border-radius: 3px 0 0 3px;'},
			{content: 'v', allowHtml: true, style: 'border-radius: 0 3px 3px 0;'},
			{kind: Menu, components: [
				{content: '1'},
				{content: '2'},
				{classes: 'onyx-menu-divider'},
				{content: '3'}
			]}
		]},
		{tag: 'br'},
		{kind: Groupbox, classes: 'onyx-sample-result-box', components: [
			{kind: GroupboxHeader, content: 'Result'},
			{name: 'menuSelection', classes: 'onyx-sample-result', content: 'No menu selection yet.'}
		]}
	],
	showPopup: function (sender) {
		var p = this.$[sender.popup];
		if (p) {
			p.show();
		}
	},
	preventMenuActivate: function () {
		return true;
	},
	itemSelected: function (sender, event) {
		// Menu items send an onSelect event with a reference to themselves & any directly displayed content
		if (event.originator.content) {
			this.$.menuSelection.setContent(event.originator.content + ' Selected');
		} else if (event.selected) {
			//	Since some of the menu items do not have directly displayed content (they are kinds with subcomponents),
			//	we have to handle those items differently here.
			this.$.menuSelection.setContent(event.selected.controlAtIndex(1).content + ' Selected');
		}
	}
});