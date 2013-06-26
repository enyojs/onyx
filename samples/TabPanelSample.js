enyo.kind({
	name: "SimpleTabPanel",
	kind: "onyx.TabPanels",
	style: "height: 100px;",
	fit: true,
	components: [
		{	
			name: 'Blue welcome',
			'caption': 'Blue',
			style: "height: 100px; border: 2px solid grey; padding: 1em; color: blue",
			content: 'The whole kind is changed: Blue Hello World !'
		},
		{
			name: 'Red welcome',
			'caption': 'Red',
			style: "height: 100px; border: 2px solid grey; padding: 1em; color: red",
			content: 'The whole kind is changed: Red Hello World !'
		}
	]

});

enyo.kind(
	{
		name: "DynamicTabPanel",
		fit: true,
		components: [
			{name:"bar",kind: "onyx.TabPanels"},
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
	name: "onyx.sample.TabPanelSample",
	classes: "onyx onyx-sample",
	components: [
		{
			classes: "onyx-sample-divider",
			content: "Simple Tab Panel"
		},
		{
			kind:"SimpleTabPanel"
//		},
//		{
//			classes: "onyx-sample-divider",
//			content: "Dynamic Tab Panel",
//			style: 'padding-top: 4em;'
//		},
//		{
//			kind:"DynamicTabPanel"
		}

	]
});
