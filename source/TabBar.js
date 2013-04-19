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
			 *        caption: <caption of tab>,
			 *        data: { <user data passed to addTab> }
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
		 * Append a new tab to the tab bar. inControl is an object
		 * with optional caption and data attributes. When not
		 * specified the tab will have a generated caption like 'Tab
		 * 0', 'Tab 1'. etc... data is an arbitrary object that will
		 * be given back with onTabChanged events
		 *
		 */
		addTab: function(inControl) {
			var c = inControl.caption || ("Tab " + this.$.tabs.controls.length);
			var d = inControl.data || { } ;
			var t = this.$.tabs.createComponent({content: c, user_data: d });
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
			var tab = this.resolveTab(target,'removeTab');
			tab && tab.destroy();
		},

		//@ protected
		resolveTab: function(target,action_name){
			var targetTab ;
			if (target.caption) {
				enyo.forEach(
					this.$.tabs.controls,
					function(tab){
						if (tab.content === target.caption) {
							targetTab = tab;
						}
					}
				);
			}
			else if (typeof target.index !== undefined) {
				targetTab = this.$.tabs.controls[target.index];
			}
			else {
				alert("internal error: " + action_name+ " called without index or caption");
			}
			return targetTab ;
		},

		/**
		 * @public
		 *
		 * Activate a tab in the tab bar. target is an object with
		 * either a caption attribute or an index. The tab(s) matching
		 * the caption will be activated or the tab with matching
		 * index will be activated
		 *
		 * Example:
		 *
		 *    myTab.activate({'index':0}); // activate the leftmost tab
		 *    myTab.activate({'caption':'foo.js'});
		 *
		 * Note that tabActivated event will be fired.
		 *
		 */
		activate: function(target) {
			var tab = this.resolveTab(target,'activate');
			tab && this.$.tabs.setActive(tab);
		},

		//* @protected
		tabActivated: function(inSender, inEvent) {
			// not called when a selected tab is tapped gain
			if (this.hasNode()) {
				if (inEvent.originator.active) {
					var orig = inEvent.originator ;
					var i = orig.indexInContainer();
					this.dlog("tabActivated called on index " + i ) ;
					this.doTabChanged(
						{
							index: i,
							caption: orig.content,
							data: orig.user_data
						}
					);
				}
			}
		}

	}

);

