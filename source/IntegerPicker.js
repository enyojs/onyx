/**
    _onyx.IntegerPicker_, a subkind of <a href="#onyx.Picker">onyx.Picker</a>,
    is used to display a list of integers that can be selected, ranging from
    _min_ to _max_. It is meant to be used in conjunction with an
    <a href="#onyx.PickerDecorator">onyx.PickerDecorator</a>. The decorator
    loosely couples the picker with an
    <a href="#onyx.PickerButton">onyx.PickerButton</a>--a button that, when
    tapped, shows the picker. Once an item is selected, the list of items
    closes,	but the item stays selected and the PickerButton displays the choice
    that was made.

    To initialize the IntegerPicker to a particular value, set the _value_
    property to the integer that should be selected.

        {kind: "onyx.PickerDecorator", components: [
            {}, //this uses the defaultKind property of PickerDecorator to inherit from PickerButton
            {kind: "onyx.IntegerPicker", min: 0, max: 25, value: 5}
        ]}

    Each item in the list is an <a href="#onyx.MenuItem">onyx.MenuItem</a>, so
    an application may listen for an _onSelect_ event with the item to determine
    which picker item was selected.

    For more information, see the documentation on
    <a href="https://github.com/enyojs/enyo/wiki/Pickers">Pickers</a> in the
    Enyo Developer Guide.
 */
enyo.kind({
	name: "onyx.IntegerPicker",
	kind: "onyx.Picker",
	published: {
		value: 0,
		min: 0,
		max: 9
	},
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.rangeChanged();
	},
	minChanged: function() {
		this.destroyClientControls();
		this.rangeChanged();
		this.render();
	},
	maxChanged: function() {
		this.destroyClientControls();
		this.rangeChanged();
		this.render();
	},
	rangeChanged: function() {
		for (var i=this.min; i<=this.max; i++) {
			this.createComponent({content: i, active: (i===this.value) ? true : false});
		}
	},
	valueChanged: function(inOld) {
		var controls = this.getClientControls();
		var len = controls.length;
		// Validate our value
		this.value = this.value >= this.min && this.value <= this.max ? this.value : this.min;
		for (var i=0; i<len; i++) {
			if (this.value === parseInt(controls[i].content)) {
				this.setSelected(controls[i]);
				break;
			}
		}
	},
	selectedChanged: function(inOld) {
		if (inOld) {
			inOld.removeClass("selected");
		}
		if (this.selected) {
			this.selected.addClass("selected");
			this.doChange({selected: this.selected, content: this.selected.content});
		}
		this.value = parseInt(this.selected.content);
	}
});
