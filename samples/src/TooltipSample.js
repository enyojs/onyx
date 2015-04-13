var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	IconButton = require('onyx/IconButton'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	Menu = require('onyx/Menu'),
	MenuDecorator = require('onyx/MenuDecorator'),
	Toolbar = require('onyx/Toolbar'),
	Tooltip = require('onyx/Tooltip'),
	TooltipDecorator = require('onyx/TooltipDecorator');

module.exports = kind({
	name: 'onyx.sample.TooltipSample',
	classes: 'onyx onyx-sample',
	handlers: {
		onSelect: 'itemSelected'
	},
	components: [
		{classes: 'onyx-sample-divider', content: 'Tooltips on Toolbar'},
		{kind: Toolbar, classes: 'onyx-menu-toolbar', components: [
			{kind: TooltipDecorator, components: [
				{kind: Button, content: 'Tooltip'},
				{kind: Tooltip, content: 'I\'m a tooltip for a button.'}
			]},
			{kind: TooltipDecorator, components: [
				{kind: InputDecorator, components: [
					{kind: Input, style: 'width: 130px;', placholder: 'Just an input...'}
				]},
				{kind: Tooltip, content: 'I\'m a tooltip for an input.'}
			]}
		]},
		{tag: 'br'},
		{kind: Toolbar, classes: 'onyx-menu-toolbar', components: [
			{kind: MenuDecorator, components: [
				{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
				{kind: Tooltip, content: 'Bookmarks menu'},
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
			{kind: MenuDecorator, components: [
				{content: 'Bookmarks menu'},
				{kind: Tooltip, content: 'Tap to open...'},
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
		{classes: 'onyx-sample-divider', content: 'Tooltips on items'},
		{kind: TooltipDecorator, components: [
			{kind: Button, content: 'Tooltip'},
			{kind: Tooltip, content: 'I\'m a tooltip for a button.'}
		]},
		{tag: 'br'},
		{kind: TooltipDecorator, components: [
			{kind: InputDecorator, components: [
				{kind: Input, style: 'width: 130px;', placholder: 'Just an input...'}
			]},
			{kind: Tooltip, content: 'I\'m a tooltip for an input.'}
		]},
		{tag: 'br'},
		{kind: MenuDecorator, components: [
			{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
			{kind: Tooltip, content: 'Bookmarks menu'},
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
		{tag: 'br'},
		{kind: MenuDecorator, components: [
			{content: 'Bookmarks menu'},
			{kind: Tooltip, content: 'Tap to open...'},
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
	]
});