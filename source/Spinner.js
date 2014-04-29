/**
	_onyx.Spinner_ is a control that displays a spinning animation to indicate
	that activity is taking place. By default, a light spinner, suitable for
	displaying against a dark background, is shown. To get a dark spinner
	(suitable for use on a lighter background), apply the _onyx-light_ CSS class:

		{kind: "onyx.Spinner", classes: "onyx-light"}

	Typically, a spinner is shown to indicate activity and hidden to indicate
	that the activity has ended. The spinning animation will automatically start
	when the spinner is shown. If you wish, you may control the animation directly
	by calling the _start()_, _stop()_, and _toggle()_ methods.
*/
enyo.kind({
	name: "onyx.Spinner",
	classes: "onyx-spinner",
	//* @public
	//* Stops the spinner animation.
	stop: function() {
		this.setShowing(false);
	},
	//* Starts the spinner animation.
	start: function() {
		this.setShowing(true);
	},
	//* Toggles the spinner animation on or off.
	toggle: function() {
		this.setShowing(!this.getShowing());
	}
});
