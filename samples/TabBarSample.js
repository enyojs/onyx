enyo.kind(
	{
		name: "App",
		fit: true,
		components: [
			{name:"bar",kind: "onyx.TabBar"},
			{
				name: 'stuff',
				content: 'empty',
				style: "border: 2px grooved black; width 600px; height: 100px; "
			}
		],

		handlers: {
			onTabChanged: "switchStuff"
		},

		create: function() {
			this.inherited(arguments);
			this.$.bar.addTab(
				{
					'caption': 'English',
					'data' : { 'msg': 'Hello World !' } // arbitrary user data
				}
			) ;
			this.$.bar.addTab(
				{
					'caption': 'Français',
					'data' : { 'msg': 'Bonjour tout le monde !' } // arbitrary user data
				}
			) ;
		},

		switchStuff: function(inSender,inEvent) {
			this.log("Tapped tab with caption "+ inEvent.caption
					 + " and message " + inEvent.data.msg );
			this.$.stuff.setContent( inEvent.data.msg);
		}
	}
);

enyo.kind(
	{
		name: "onyx.sample.TabBarSample",
		classes: "onyx onyx-sample",
		components: [
			{
				classes: "onyx-sample-divider",
				content: "Tab Bar"
			},
			{
				kind:"App"
			}

	]
});
