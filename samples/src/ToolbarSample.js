var
	kind = require('enyo/kind'),
	Scroller = require('enyo/Scroller');

var
	Button = require('onyx/Button'),
	Grabber = require('onyx/Grabber'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	MoreToolbar = require('onyx/MoreToolbar'),
	Toolbar = require('onyx/Toolbar');

module.exports = kind({
	name: 'onyx.sample.ToolbarSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'ToolBar'},
		{kind: Toolbar, components: [
			{kind: Grabber},
			{content: 'Header'},
			{kind: Button, content: 'Button'},
			{kind: Button, content: 'Down', classes: 'active'},
			{kind: Button, content: 'Button'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Input'}
			]},
			{kind: Button, content: 'Right'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Right Input'}
			]},
			{kind: Button, content: 'More Right'},
			{content: 'There\'s more'},
			{kind: Button, content: 'Far Right'}
		]},
		{tag: 'br'},

		{classes: 'onyx-sample-divider', content: 'Scrolling ToolBar'},
		{kind: Scroller, classes: 'onyx-toolbar', touchOverscroll: false, touch: true, vertical: 'hidden', style: 'margin: 0px;', thumb: false, components: [
			{classes: 'onyx-toolbar-inline', style: 'white-space: nowrap;', components: [
				{kind: Grabber},
				{content: 'Header'},
				{kind: Button, content: 'Button'},
				{kind: Button, content: 'Down', classes: 'active'},
				{kind: Button, content: 'Button'},
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Input'}
				]},
				{kind: Button, content: 'Right'},
				{kind: InputDecorator, components: [
					{kind: Input, placeholder: 'Right Input'}
				]},
				{kind: Button, content: 'More Right'},
				{content: 'There\'s more'},
				{kind: Button, content: 'Far Right'}
			]}
		]},
		{tag: 'br'},

		{classes: 'onyx-sample-divider', content: 'More ToolBar'},
		{kind: MoreToolbar, components: [
			{kind: Grabber},
			{content: 'Header'},
			{kind: Button, content: 'Button'},
			{kind: Button, content: 'Down', classes: 'active'},
			{kind: Button, content: 'Button'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Input'}
			]},
			{kind: Button, content: 'Right'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'Right Input'}
			]},
			{kind: Button, content: 'More Right'},
			{content: 'There\'s more'},
			{kind: Button, content: 'Far Right'}
		]}
	]
});