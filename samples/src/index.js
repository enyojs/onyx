require('enyo/drag');

var
	kind = require('enyo/kind'),
	ready = require('enyo/ready'),
	Anchor = require('enyo/Anchor'),
	Collection = require('enyo/Collection'),
	Control = require('enyo/Control'),
	DataRepeater = require('enyo/DataRepeater');

var
	samples = {
		ButtonGroup			: require('./ButtonGroupSample'),
		Button				: require('./ButtonSample'),
		Checkbox			: require('./CheckboxSample'),
		ContextualPopup		: require('./ContextualPopupSample'),
		DatePicker			: require('./DatePickerSample'),
		Groupbox			: require('./GroupboxSample'),
		IconButton			: require('./IconButtonSample'),
		Input				: require('./InputSample'),
		Menu				: require('./MenuSample'),
		MoreToolbar			: require('./MoreToolbarSample'),
		Picker				: require('./PickerSample'),
		Popup				: require('./PopupSample'),
		Progress			: require('./ProgressSample'),
		Slider				: require('./SliderSample'),
		Spinner				: require('./SpinnerSample'),
		Submenu				: require('./SubmenuSample'),
		TabBar				: require('./TabBarSample'),
		TabPanel			: require('./TabPanelSample'),
		TimePicker			: require('./TimePickerSample'),
		ToggleButton		: require('./ToggleButtonSample'),
		Toolbar				: require('./ToolbarSample'),
		Tooltip				: require('./TooltipSample')
	};

var List = kind({
	kind: Control,
	components: [
		{name: 'list', kind: DataRepeater, components: [
			{style: 'margin: 10px;', components: [
				{name: 'a', kind: Anchor}
			], bindings: [
				{from: 'model.name', to: '$.a.href', transform: function (v) { return '?' + v; }},
				{from: 'model.name', to: '$.a.content', transform: function (v) { return v + ' Sample'; }}
			]}
		]}
	],
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.$.list.set('collection', new Collection(Object.keys(samples).map(function (key) {
			return {name: key};
		})));
	}
});

ready(function () {
	var name = window.document.location.search.substring(1),
		Sample = samples[name] || List;

	new Sample({samples: samples}).renderInto(document.body);
});