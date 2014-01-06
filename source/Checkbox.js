/**
	A box that shows or hides a check mark when clicked.
	The onChange event is fired when it is clicked. Use getValue() to fetch
	the checked status.

		{kind: "onyx.Checkbox", onchange: "checkboxClicked"}

		checkboxClicked: function(inSender) {
			if (inSender.getValue()) {
				this.log("I've been checked!");
			}
		}
*/
enyo.kind({
	name: "onyx.Checkbox",
	kind: "enyo.common.Checkbox",
	classes: "onyx-checkbox"
});
