var
	animation = require('enyo/animation'),
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	Checkbox = require('onyx/Checkbox'),
	Input = require('onyx/Input'),
	InputDecorator = require('onyx/InputDecorator'),
	ProgressBar = require('onyx/ProgressBar'),
	ProgressButton = require('onyx/ProgressButton'),
	Slider = require('onyx/Slider');

module.exports = kind({
	name: 'onyx.sample.ProgressSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Progress Bars'},
		{kind: ProgressBar, progress: 25},
		{kind: ProgressBar, animateStripes: false, progress: 25},
		{kind: ProgressBar, progress: 25, barClasses: 'onyx-green'},
		{kind: ProgressBar, progress: 25, barClasses: 'onyx-red'},
		{kind: ProgressBar, progress: 25, barClasses: 'onyx-dark'},
		{kind: ProgressBar, animateStripes: false, barClasses: 'onyx-light', progress: 50},
		{kind: ProgressBar, showStripes: false, progress: 75},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Progress Buttons'},
		{kind: ProgressButton, progress: 25, onCancel:'clearValue', components: [
			{content: '0'},
			{content: '100', style: 'float: right;'}
		]},
		{kind: ProgressButton, animateStripes: false, barClasses: 'onyx-dark', progress: 50, onCancel:'clearValue'},
		{kind: ProgressButton, showStripes: false, progress: 75, onCancel:'clearValue'},
		{tag: 'br'},
		{kind: InputDecorator, style:'margin-right:10px;', components: [
			{kind: Input, placeholder: 'Value', style:'width:50px;'}
		]},
		{kind: Button, content:'Set', classes:'onyx-sample-spaced-button', ontap:'changeValue'},
		{kind: Button, content:'-', classes:'onyx-sample-spaced-button', ontap:'decValue'},
		{kind: Button, content:'+', classes:'onyx-sample-spaced-button', ontap:'incValue'},
		{tag: 'br'},
		{tag: 'br'},
		{kind: Checkbox, name:'animateSetting', checked:true},
		{content:'Animated', classes:'enyo-inline onyx-sample-animate-label'},
		{tag: 'br'},
		{tag: 'br'},
		{classes: 'onyx-sample-divider', content: 'Sliders'},
		{kind: Slider, min: 10, max: 50, value: 30},
		{tag: 'br'},
		{kind: Slider, lockBar: false, progress: 20, value: 75},
		{tag: 'br'},
		{name: 'progressSlider', kind: Slider, lockBar: false, value: 75},
		{kind: Button, content: 'Toggle Progress', ontap: 'toggleProgress'}
	],
	changeValue: function (sender, event) {
		for (var i in this.$) {
			if (this.$[i].kind == ProgressBar || this.$[i].kind == ProgressButton) {
				if (this.$.animateSetting.getValue()) {
					this.$[i].animateProgressTo(this.$.input.getValue());
				} else {
					this.$[i].setProgress(this.$.input.getValue());
				}
			}
		}
	},
	incValue: function () {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0, 10) + 10, 100));
		this.changeValue();
	},
	decValue: function () {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0, 10) - 10, 0));
		this.changeValue();
	},
	clearValue: function (sender, event) {
		sender.setProgress(0);
	},
	toggleProgress: function () {
		this._progressing = !this._progressing;
		this.nextProgress();
	},
	nextProgress: function () {
		if (this._progressing) {
			animation.requestAnimationFrame(this.bindSafely(function () {
				this.incrementProgress();
				setTimeout(this.bindSafely('nextProgress'), 500);
			}), this.hasNode());
		}
	},
	incrementProgress: function () {
		var p = this.$.progressSlider;
		var i = p.min + ((p.progress - p.min + 5) % (p.max - p.min + 1));
		p.animateProgressTo(i);
	}
});