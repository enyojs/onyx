enyo.kind({
	name: "SimpleTabBar",
	fit: true,
	components: [
		{name:"bar",kind: "onyx.TabBar"},
		{
			style: "border: 2px solid grey; ",
			components: [
				{
					content: 'Only the content of this kind is changed',
					style: 'padding: 1em'
				},
				{name: 'stuff', content: 'empty', style: 'padding: 1em'}
			]
		}
	],

	handlers: {
		onTabChanged: "switchStuff"
	},

	rendered: function() {
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
});

enyo.kind(
	{
		name: "DynamicTabBar",
		fit: true,
		components: [
			{name:"bar",kind: "onyx.TabBar"},
			{
				style: "border: 2px solid grey; ",
				components: [
					{
						content: 'create many tabs and reduce the width of the browser'
					},
					{name: 'stuff', content: 'empty', style: 'padding: 1em'},
					{
						kind: 'onyx.Button',
						content: 'create tab',
						ontap: 'addATab',
						style: 'margin: 0.5em'
					},
					{
						kind: 'onyx.Button',
						content: 'kill last tab',
						ontap: 'killTab'
					}
				]
			}
		],

		handlers: {
			onTabChanged: "switchStuff"
		},

		number: 1,
		rendered: function() {
			this.inherited(arguments);
			var date = new Date();
			this.creationTime = date.getTime();
			this.addATab() ;
		},

		addATab: function(inSender,inEvent) {
			this.log("adding a tab");
			var date = new Date();
			var delta = ( date.getTime() - this.creationTime ) / 1000 ;
			this.$.bar.addTab(
				{
					'caption': 'Tab label ' + this.number++ ,
					data: { msg: "tab created after " + delta + " seconds" }
				}
			) ;
		},

		switchStuff: function(inSender,inEvent) {
			this.log("Tapped tab with caption "+ inEvent.caption
				+ " and message " + inEvent.data.msg );
			this.$.stuff.setContent( inEvent.data.msg);
		},
		killTab: function(inSender,inEvent) {
			this.log("killing tab");
			this.$.bar.removeTab({index: this.number-- - 2});
		}

	}
);

enyo.kind({
	name: "onyx.sample.TabBarSample",
	classes: "onyx onyx-sample",
	components: [
		{
			classes: "onyx-sample-divider",
			content: "Simple Tab Bar"
		},
		{
			kind:"SimpleTabBar"
		},
		{
			classes: "onyx-sample-divider",
			content: "Dynamic Tab Bar",
			style: 'padding-top: 4em;'
		},
		{
			kind:"DynamicTabBar"
		}

	]
});
