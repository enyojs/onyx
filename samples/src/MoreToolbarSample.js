var
	kind = require('enyo/kind');

var
	FittableRows = require('layout/FittableRows');

var
	Button = require('onyx/Button'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	MoreToolbar = require('onyx/MoreToolbar');

module.exports = kind({
	name: 'onyx.sample.MoreToolbarSample',
	classes: 'onyx onyx-sample',
	kind: FittableRows,
	fit: true,
	components: [
		{kind: MoreToolbar, components: [
			{content: 'More Toolbar', unmoveable: true},
			{kind: Button, content: 'Alpha'},
			{kind: Button, content: 'Beta'},
			{kind: Button, content: 'Gamma', unmoveable: true},
			{kind: Button, content: 'Epsilon'},
			{kind: Button, content: 'Othercon'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'pulez'}
			]},
			{kind: Button, content: 'Maxizon'}
		]},
		{fit: true, style: 'background: lightpurple;padding:25px;', components: [
			{content: 'The \'More Toolbar\' label and the Gamma button have the unmoveable property set to true.'}
		]},
		{kind: MoreToolbar, components: [
			{content: 'More Toolbar', unmoveable: true},
			{kind: Button, content: 'Alpha'},
			{kind: Button, content: 'Beta'},
			{kind: Button, content: 'Gamma', unmoveable: true},
			{kind: Button, content: 'Epsilon'},
			{kind: Button, content: 'Othercon'},
			{kind: InputDecorator, components: [
				{kind: Input, placeholder: 'pulez'}
			]},
			{kind: Button, content: 'Maxizon'}
		]}
	]
});