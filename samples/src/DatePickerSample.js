var
	kind = require('enyo/kind'),
	$L = require('enyo/hooks').$L;

var
	FittableColumns = require('layout/FittableColumns'),
	FittableRows = require('layout/FittableRows');

var
	ilib = require('enyo-ilib');

var
	Button = require('onyx/Button'),
	DatePicker = require('onyx/DatePicker'),
	Groupbox = require('onyx/Groupbox'),
	GroupboxHeader = require('onyx/GroupboxHeader'),
	Picker = require('onyx/Picker'),
	PickerDecorator = require('onyx/PickerDecorator'),
	Toolbar = require('onyx/Toolbar');

module.exports = kind({
	name: 'onyx.sample.DatePickerSample',
	kind: FittableRows,
	classes: 'onyx',
	handlers: {
		onSelect: 'updateDateValues'
	},
	components: [
		{kind: Toolbar, content:$L('Dates')},
		{kind: FittableColumns, style: 'padding: 10px', components:[
			{components: [
				{content:$L('Choose Locale: '), classes: 'onyx-sample-divider'},
				{kind: PickerDecorator, style: 'padding: 10px;', onSelect: 'localeChanged', components: [
					{content: 'Pick One...', style: 'width: 200px'},
					{kind: Picker, name: 'localePicker', components: [
						{content: 'en-US', active: true},
						{content: 'en-CA'},
						{content: 'en-IE'},
						{content: 'en-GB'},
						{content: 'en-MX'},
						{content: 'de-DE'},
						{content: 'fr-FR'},
						{content: 'fr-CA'},
						{content: 'it-IT'},
						{content: 'es-ES'},
						{content: 'es-MX'},
						{content: 'es-US'},
						{content: 'ko-KR'},
						{content: 'ja-JP'},
						{content: 'zh-HK'}
					]}
				]}
			]}
		]},
		{kind: Button, content: 'Get Dates', style: 'margin: 10px;', ontap: 'getDates'},
		{kind: Button, content: 'Reset Dates', ontap: 'resetDates'},
		{style: 'width: 100%;height: 5px;background-color: black;margin-bottom: 5px;'},
		{caption: 'Dates', style: 'padding: 10px', components: [
			{content: 'DATE',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker1', kind: DatePicker}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Value'},
				{name: 'datePicker1Value', style: 'padding: 15px;'}
			]},
			{content: 'DATE W/MIN & MAX YEARS',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker2', kind: DatePicker, minYear: 2010, maxYear: 2020}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Value'},
				{name: 'datePicker2Value', style: 'padding: 15px;'}
			]},
			{content: 'DATE W/DAYS HIDDEN',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker3', kind: DatePicker, dayHidden: true}
			]},
			{kind: Groupbox, style: 'padding: 5px;', components: [
				{kind: GroupboxHeader, content: 'Value'},
				{name: 'datePicker3Value', style: 'padding: 15px;'}
			]},
			{content: 'DISABLED',classes: 'onyx-sample-divider'},
			{classes: 'onyx-toolbar-inline', components: [
				{name: 'datePicker4', kind: DatePicker, disabled: true}
			]}
		]}
	],
	bindings: [
		{from: '.$.localePicker.selected.content', to: '.locale'}
	],
	rendered: function () {
		this.inherited(arguments);
		this.localeChanged();
	},
	localeChanged: function () {
		this.$.datePicker1.setLocale(this.locale);
		this.$.datePicker2.setLocale(this.locale);
		this.$.datePicker3.setLocale(this.locale);
		this.$.datePicker4.setLocale(this.locale);
		return true;
	},
	resetDates: function (date) {
		var d = new Date();
		this.$.datePicker1.setValue(d);
		this.$.datePicker2.setValue(d);
		this.$.datePicker3.setValue(d);
		this.$.datePicker4.setValue(d);
		this.getDates();
	},
	getDates: function () {
		var fmt = this.format();
		this.$.datePicker1Value.setContent(fmt.format(this.$.datePicker1.getValue()));
		this.$.datePicker2Value.setContent(fmt.format(this.$.datePicker2.getValue()));
		// reformat the formatter to display the Date wiht only Month and year
		fmt = this.format('my');
		this.$.datePicker3Value.setContent(fmt.format(this.$.datePicker3.getValue()));
	},
	updateDateValues: function (sender, event){
		var fmt = event.name != 'datePicker3' ? this.format() :  this.format('my');
		this.$[event.name + 'Value'].setContent(fmt.format(event.value));
	},
	format: function (dateComponents) {
		if (ilib) {
			var fmt = new ilib.DateFmt({
				dateComponents: dateComponents || undefined,
				date: 'short',
				locale: this.locale,
				timezone: 'local'
			});
			return fmt;
		} else {
			return function (v) { return v ? v.toString() : ''; };
		}
	}
});
