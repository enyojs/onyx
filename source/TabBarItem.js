/**

enyo.TabBar.Item is a special button for TabBar. This widget is
designed to be used only within TabBar.

*/

enyo.kind ({
	name: 'onyx.TabBar.Item',
	classes: "onyx-tab-item",
	kind: 'enyo.GroupItem',
	events: {
		onTabActivated: '',
		onTabCloseRequest: '',
		onActivate: '',
		onShowTooltip: '',
		onHideTooltip: ''
	},
	handlers: {
		onmouseover: "navOver",
		onmouseout: "navOut"
	} ,
	navOver: function(item) {
		this.$.dissolve.addClass('onyx-tab-item-hovered');
	},
	navOut: function(item) {
		this.$.dissolve.removeClass('onyx-tab-item-hovered');
	},
	components: [
		{
			kind: "enyo.Button", // no need of onyx.RadioButton
			name: 'button',
			ontap: 'setActiveTrue',
			onmouseover: 'showTooltipFromTab',
			onmouseout: 'doHideTooltip'
		},
		{
			classes: 'onyx-tab-item-dissolve',
			ontap: 'setActiveTrue',
			name: 'dissolve',
			showing: false,
			onmouseover: 'showTooltipFromTab',
			onmouseout: 'doHideTooltip'
		},
		{
			classes: 'onyx-tab-item-close',
			name: 'closeButton' ,
			ontap: 'requestClose'
		}
	],

	create: function() {
		this.inherited(arguments);
		this.$.button.setContent(this.content);
	},

	raise: function() {
		this.addClass('active');
		this.$.dissolve.addClass('active');
	},
	putBack: function() {
		this.removeClass('active');
		this.$.dissolve.removeClass('active');
	},

	setActiveTrue: function() {
		this.setActive(true);
	},

	activeChanged: function(inOldValue) {
		// called during destruction, hence the test on this.container
		if (this.container && this.hasNode()) {
			var i = this.indexInContainer();
			if (this.active) {
				this.doTabActivated(
					{
						index:    i,
						caption:  this.content,
						userData: this.userData,
						userId:   this.userId
					}
				);
				this.raise();
			}
			else {
				this.putBack();
			}
			this.doActivate();
		}
		// do not return true;
		// activate event must be propagated to my RadioGroup owner
	},

	_origWidth: null,
	origWidth: function() {
		this._origWidth = this._origWidth || this.getBounds().width ;
		return this._origWidth;
	},
	reduce: function(coeff) {
		var width = Math.floor( this.origWidth() * coeff )
				- this.$.closeButton.getBounds().width -7 ;

		if (coeff === 1) {
			this.$.dissolve.hide();
		}
		else {
			this.$.dissolve.show();
		}

		this.$.button.applyStyle('width', width + 'px');
		this.$.button.render();
	},

	requestClose: function(inSender, inEvent) {
		this.doTabCloseRequest({ index: this.tabIndex });
		return true;
	},

	showTooltipFromTab: function(inSender, inEvent){
		this.doShowTooltip({tooltipContent: this.tooltipMsg, bounds:this.getBounds()});

	}
});
