enyo.kind({
	name: "Image",
	kind: "Control",
	tag: "img",
	attributes: {
		onload: enyo.bubbler,
		onerror: enyo.bubbler,
		// Note: boolean false not working here
		// In Control.attributeToNode... it removes the attribute if the value is null or false,
		// that logic seems incorrect.
		draggable: "false"
	}
})
