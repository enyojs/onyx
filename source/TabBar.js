/**
enyo.TabBar is a scrolled set of radio buttons that is used by TabPanels. This bar may
be used by other kinds to provide a similar layout


Here's an example:

		enyo.kind({
			name: "App",
			kind: "TabBar",
			fit: true,
			components: [
 // FIXME: provide real example
				{kind: "MyStartPanel"},
				{kind: "MyMiddlePanel"},
				{kind: "MyLastPanel"}
			]
		});
		new App().write();
*/

enyo.kind (
	{
		name: 'onyx.TabBar',
		kind: "FittableColumns",
		isPanel: true,
		components: [
			{
				name: "scroller",
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
		],

		dlog: function () {
			if (this.debug) {
				this.log(arguments) ;
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

		addTab: function(inControl) {
			var c = inControl.caption || ("Tab " + this.$.tabs.controls.length);
			var t = this.$.tabs.createComponent({content: c});
			this.dlog("addControl add tab " + c);
			if (this.hasNode()) {
				t.render();
			}
			return t;
		}

	}

);

