/**
 A floating control.

 This control is unparented and therefore must be rendered manually.
 
 It is always rendered in the document.body.

 All events bubble to its owner.

 */
enyo.kind({
	name: "onyx.Floater",
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.setParent(null);
		this.parentNode = document.body;
	},
	// bubbled events will go to owner.
	getBubbleTarget: function() {
		return this.owner;
	}
});
//
enyo.kind({
	name: "onyx.FloaterDeux",
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.parentNode = document.body;
	},
	generateHtml: function() {
		this.render();
		return "";
	}
});
//
enyo.kind({
	name: "onyx.FloaterTrois",
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.setParent(onyx.modalLayer);
	},
	// bubbled events will go to owner.
	getBubbleTarget: function() {
		return this.owner;
	}
});
//
enyo.kind({
	name: "onyx.ModalLayer",
	id: "",
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.setParent(null);
	},
	render: function() {
		this.parentNode = document.body;
		return this.inherited(arguments);
	},
	generateInnerHtml: function() {
		return "";
	},
	beforeChildRender: function() {
		if (!this.hasNode()) {
			this.render();
		}
	},
	teardownChildren: function() {
	}
});

onyx.modalLayer = new onyx.ModalLayer();