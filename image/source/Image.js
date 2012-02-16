enyo.kind({
	name: "Image",
	tag: "img",
	attributes: {
		onload: enyo.bubbler,
		onerror: enyo.bubbler,
		draggable: false
	}
})
