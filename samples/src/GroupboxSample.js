var
	kind = require('enyo/kind');

var
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator');

module.exports = kind({
	name: 'onyx.sample.GroupboxSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Groupboxes'},
		{kind: Groupbox, components: [
			{kind: GroupboxHeader, content: 'Header'},
			{content: 'I\'m a group item!', style: 'padding: 8px;'},
			{content: 'I\'m a group item!', style: 'padding: 8px;'}
		]},
		{tag: 'br'},
		{kind: Groupbox, components: [
			{content: 'I\'m a group item!', style: 'padding: 8px;'}
		]},
		{tag: 'br'},
		{kind: Groupbox, components: [
			{kind: GroupboxHeader, content: 'Header'},
			{kind: InputDecorator, components: [
				{kind: Input, style: 'width: 100%', placeholder: 'Enter text here'}
			]},
			{kind: InputDecorator, components: [
				{kind: Input, style: 'width: 100%', value: 'Middle'}
			]},
			{kind: InputDecorator, style: 'background: lightblue;', components: [
				{kind: Input, style: 'width: 100%;', value: 'Last'}
			]}
		]},
		{tag: 'br'},
		{kind: Groupbox, components: [
			{kind: InputDecorator, components: [
				{kind: Input, style: 'width: 100%', placeholder: 'Enter text here'}
			]}
		]},
		{kind: Groupbox, components: [
			{kind: InputDecorator, components: [
				{kind: Input, type: 'password', style: 'width: 100%', placeholder: 'Enter Password'}
			]}
		]}
	]
});