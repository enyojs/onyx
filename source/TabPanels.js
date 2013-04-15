/**
enyo.TabPanels is a subkind of <a href="#enyo.Panels">enyo.Panels</a> that
displays a set of tabs, which allow navigation between the individual panels.
Unlike enyo.Panels, by default, the user cannot drag between the panels of a
TabPanels. This behavior can be enabled by setting *draggable* to true.

Here's an example:

		enyo.kind({
			name: "App",
			kind: "TabPanels",
			fit: true,
			components: [
				{kind: "MyStartPanel"},
				{kind: "MyMiddlePanel"},
				{kind: "MyLastPanel"}
			]
		});
		new App().write();
*/
enyo.kind(
	{
		name: "enyo.TabPanels",
		kind: "Panels",
		//* @protected
		draggable: false,

		tabTools: [
			{
				kind: "FittableColumns",
				isPanel: true,
				name: 'wrapper',
				components: [
					{
						name: "scroller",
						isPanel: true,
						kind: "Scroller",
						fit:true,
						maxHeight: "100px",

						// FIXME: may need to be revisited for desktop
						strategyKind: "TranslateScrollStrategy",

						thumb: false,
						vertical: "hidden",
						horizontal: "auto",
						classes: "onyx-tab-panel-scroller",
						components: [
							{
								name: "tabs",
								isPanel: true,
								kind: "onyx.RadioGroup",
								style: "text-align: left; white-space: nowrap;",
								controlClasses: "onyx-tabbutton",
								onActivate: "tabActivate"
							}
						]
					},
					{
						kind: "onyx.MenuDecorator",
						isPanel: true,
						components: [
							{
								kind: "onyx.Button",
								isPanel: true,
								content: "\\/" // FIXME: is ugly
							},
							{
								name: "picker",
								kind: "onyx.ContextualPopup",
								isPanel: true,
								actionButtons: [
									{content:"Button 1", classes: "onyx-button-warning"},
									{content:"Button 2"}
								]
							}
						]
					}
				]
			},
			{
				name: "client",
				fit: true,
				kind: "Panels",
				classes: "enyo-tab-panels",
				onTransitionStart: "clientTransitionStart"
			}
		],

		dlog: function () {
			if (this.debug) {
				this.log(arguments) ;
			}
		},

		create: function() {
			this.inherited(arguments);
			this.dlog("create called");
			this.$.client.getPanels = this.bindSafely("getClientPanels");

			// basically, set all these Panel parameters to false
			this.draggableChanged();
			this.animateChanged();
			this.wrapChanged();
		},
		initComponents: function() {
			this.dlog("initComponents called");
			this.createChrome(this.tabTools);
			this.inherited(arguments);
			this.dlog("initComponents done");
		},
		getClientPanels: function() {
			return this.getPanels();
		},
		flow: function() {
			this.inherited(arguments);
			this.$.client.flow();
		},
		reflow: function() {
			this.inherited(arguments);
			this.$.client.reflow();
		},
		draggableChanged: function() {
			this.$.client.setDraggable(this.draggable);
			this.draggable = false;
		},
		animateChanged: function() {
			this.$.client.setAnimate(this.animate);
			this.animate = false;
		},
		wrapChanged: function() {
			this.$.client.setWrap(this.wrap);
			this.wrap = false;
		},
		isClient: function(inControl) {
			return ! inControl.isPanel ;
		},
		addControl: function(inControl) {
			this.dlog("addControl called on name "+ inControl.name + " content "+inControl.content , inControl);
			this.inherited(arguments);
			if (this.isClient(inControl)) {
				var c = inControl.caption || ("Tab " + this.$.tabs.controls.length);
				var t = inControl._tab = this.$.tabs.createComponent({content: c});
				this.dlog("addControl add tab " + c);
				if (this.hasNode()) {
					t.render();
				}
			}
			this.dlog("addControl done");
		},
		removeControl: function(inControl) {
			if (this.isClient(inControl) && inControl._tab) {
				inControl._tab.destroy();
			}
			this.inherited(arguments);
		},

		// layout is a property of inherited UiComponent
		layoutKindChanged: function() {
			if (!this.layout) {
				this.layout = enyo.createFromKind("FittableRowsLayout", this);
			}
			this.$.client.setLayoutKind(this.layoutKind);
		},
		indexChanged: function() {
			// FIXME: initialization order problem
			if (this.$.client.layout) {
				this.$.client.setIndex(this.index);
			}
			this.index = this.$.client.getIndex();
		},
		tabActivate: function(inSender, inEvent) {
			this.dlog("tabActivate called") ;
			if (this.hasNode()) {
				if (inEvent.originator.active) {
					var i = inEvent.originator.indexInContainer();
					if (this.getIndex() != i) {
						this.setIndex(i);
					}
				}
			}
		},
		clientTransitionStart: function(inSender, inEvent) {
			var i = inEvent.toIndex;
			var t = this.$.tabs.getClientControls()[i];
			if (t && t.hasNode()) {
				this.$.tabs.setActive(t);
				var tn = t.node;
				var tl = tn.offsetLeft;
				var tr = tl + tn.offsetWidth;
				var sb = this.$.scroller.getScrollBounds();
				if (tr < sb.left || tr > sb.left + sb.clientWidth) {
					this.$.scroller.scrollToControl(t);
				}
			}
			return true;
		},
		startTransition: enyo.nop,
		finishTransition: enyo.nop,
		stepTransition: enyo.nop,
		refresh: enyo.nop
	}
);
