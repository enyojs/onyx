/**

enyo.TabBar.Item is a special button for TabBar. This widget is
designed to be used only within TabBar.

*/

enyo.kind ({
	name: 'onyx.TabBar.Item',
	classes: "onyx-tab-item",
	events: {
		onTabActivated: ''
	},
	components: [
		{
			kind: "Button", // no need of onyx.RadioButton
			name: 'button' ,
			onActivate: 'relayActivate'
		},
		{
			classes: 'onyx-tab-item-dissolve',
			ontap: 'shadowRelay',
			name: 'dissolve',
			showing: false
		}
	],

	create: function() {
		this.inherited(arguments);
		this.$.button.setContent(this.content);
		// set up delegation
		this.setActive = enyo.bind(this.$.button, this.$.button.setActive);
	},

	shadowRelay: function (inSender, inEvent) {
		this.$.button.tap();
		return true;
	},

	relayActivate: function(inSender, inEvent) {
		// not called when a selected tab is tapped again
		if (this.$.button.hasNode()) {
			if (inEvent.originator.active) {
				var i = this.indexInContainer();
				this.doTabActivated(
					{
						index:    i,
						caption:  this.content,
						userData: this.userData,
						userId:   this.userId
					}
				);
				this.addClass('active');
				this.$.dissolve.addClass('active');
			}
			else {
				this.removeClass('active');
				this.$.dissolve.removeClass('active');
			}
		}
		// do not return true;
		// activate event must be propagated to my RadioGroup owner
	},

	_origWidth: null,
	origWidth: function() {
		this._origWidth = this._origWidth || this.$.button.getBounds().width;
		return this._origWidth;
	},
	reduce: function(coeff) {
		var width = Math.floor( this.origWidth() * coeff);

		if (coeff === 1) {
			this.$.dissolve.hide();
		}
		else {
			this.$.dissolve.show();
		}

		this.log('applyStyle width ' + width);
		this.$.button.applyStyle('width', width + 'px');
		this.$.button.render();
	}
});

