/**
	_onyx.Slider_ is a control that presents a range of selection options in the
	form of a horizontal slider with a control knob. The knob may be tapped and
	dragged	to the desired location.

		{kind: "onyx.Slider", value: 30}

	_onChanging_ events are fired while the control knob is being dragged, and
	an _onChange_ event is fired when the position is set, either by finishing a
	drag or by tapping the bar.

	For more information, see the documentation on [Progress
	Indicators](building-apps/controls/progress-indicators.html) in the Enyo
	Developer Guide.
*/
enyo.kind({
	name: "onyx.Slider",
	kind: "enyo.common.Slider",
	classes: "onyx-progress-bar onyx-slider",
	//* @protected
	_barClasses: "onyx-progress-bar-bar"
});
