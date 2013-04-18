/**
enyo.TabBar is a scrolled set of radio buttons that is used by TabPanels. This bar may
be used by other kinds to provide a similar layout


Here's an example:

	enyo.kind({
		  name: "myStuff",
	);

	enyo.kind({
		name: "App",
		fit: true,
		components: [
			{name:"bar",kind: "TabBar"},
			{kind: "MyStuff"},
		],

		events: {
			onTabChanged: "switchStuff"
		}

		create: function() {
			this.$.bar.addTab({'caption': 'hello'}) ;
		}

		switchStuff: function(data) {
			this.log("tab with caption "+ data.caption + " was tapped");
		}
	});

*/

enyo.kind (
	{
		name: 'onyx.TabBar',
		kind: "FittableColumns",
		isPanel: true,

		events: {
			/**
			 * Fired when a tab different from the one currently selected is tapped.
			 * inEvent contains :
			 *
			 *    {
			 *        index: <index of tab in tab bar>,
			 *        caption: <caption of tab>
			 *    }
			 */
			onTabChanged: ""
		},

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
						kind: "onyx.RadioGroup",
						style: "text-align: left; white-space: nowrap;",
						controlClasses: "onyx-tabbutton",
						onActivate: 'tabActivated'
					}
				]
			},
			{
				kind: "onyx.MenuDecorator",
				components: [
					{
						kind: "onyx.Button",
						content: "\\/" // FIXME: is ugly
					},
					{
						name: "picker",
						kind: "onyx.ContextualPopup",
						actionButtons: [
							{content:"Button 1", classes: "onyx-button-warning"},
							{content:"Button 2"}
						]
					}
				]
			}
		],

		// debug: true,

		//* @protected
		dlog: function () {
			if (this.debug) {
				this.log(arguments) ;
			}
		},

		//* @protected
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

		/**
		 * @public
		 *
		 * Append a new tab to the tab bar. inControl is an object with an optional
		 * caption attribute. When not specifief the tab will have a generated content
		 * like 'Tab 0', 'Tab 1'. etc...
		 *
		 */
		addTab: function(inControl) {
			var c = inControl.caption || ("Tab " + this.$.tabs.controls.length);
			var t = this.$.tabs.createComponent({content: c});
			this.dlog("addControl add tab " + c);
			if (this.hasNode()) {
				t.render();
			}
			return t;
		},

		/**
		 * @public
		 *
		 * Remove a tab from the tab bar. target is an object with
		 * either a caption attribute or an index. The tab(s) matching
		 * the caption will be destroyed or the tab with matching
		 * index will be destroyed.
		 *
		 * Example:
		 *
		 *    myTab.remove({'index':0}); // remove the leftmost tab
		 *    myTab.remove({'caption':'foo.js'});
		 *
		 */

		removeTab: function(target) {
			if (target.caption) {
				enyo.forEach(
					this.$.tabs.controls,
					function(tab){
						if (tab.content === target.caption) {
							tab.destroy() ;
						}
					}
				);
			}
			else if (typeof target.index !== undefined) {
				var goner = this.$.tabs.controls[target.index];
				goner && goner.destroy() ;
			}
			else {
				alert("internal error: removeTab called without index or caption");
			}
		},

		//* @protected
		tabActivated: function(inSender, inEvent) {
			// not called when a selected tab is tapped gain
			if (this.hasNode()) {
				if (inEvent.originator.active) {
					var orig = inEvent.originator ;
					var i = orig.indexInContainer();
					this.dlog("tabActivated called on index " + i ) ;
					this.doTabChanged({index: i, caption: orig.content});
				}
			}
		}

	}

);

