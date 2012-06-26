/**
	A control that displays a spinner animation to indicate that activity is taking place. 
	By default, onyx.Spinner will display a light spinner, best shown on dark backgrounds. To render 
	a dark spinner to be shown on a lighter background, add the onyx-light class to the spinner.
	
		{kind: "onyx.Spinner", classes: "onyx-light"}
	
	It's typical to show and hide the spinner to indicate activity. The spinner animation 
	will automatically start when the spinner is shown. It's also possible to call 
	start, stop, and toggle to control the animation directly.
*/
enyo.kind({
	name: "onyx.Spinner",
	classes: "onyx-spinner",
	//* @public
	//* Stop the spinner animation.
	stop: function() {
		this.setShowing(false);
	},
	//* Start the spinner animation.
	start: function() {
		this.setShowing(true);
	},
	//* Toggle the spinner animation on/off.
	toggle: function() {
		this.setShowing(!this.getShowing());
	}
});
