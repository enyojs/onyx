enyo.kind({
	name: "onyx.sample.ContextualPopupSample",
	kind: "FittableRows",
	classes: "onyx onyx-sample",
	handlers: {
		ontap: "tapHandler"
	},	
	components: [
		{kind: "onyx.Toolbar", name:"topToolbar", classes: "onyx-menu-toolbar", style:"background-color:lightgray", components: [
			{kind: "onyx.MenuDecorator", components: [
				{kind:onyx.Button, content:"Back"},
				{kind: "onyx.ContextualPopup", 
					title:"Back", 
					actionButtons:[
						{content:"test1", classes: "onyx-button-warning"},
						{content:"test2"},					
					], 
					components: [
						{content:"testing 1"},
						{content:"testing 2"}
					]
				}
			]},

			{kind: "onyx.MenuDecorator", style:"float:right;", components: [
			{kind:onyx.Button, content:"Facebook +"},
				{kind: "onyx.ContextualPopup", 
					title:"Facebook +", 
					actionButtons:[
						{content:"test1", classes: "onyx-button-warning"},
						{content:"test2"}
					], 
					components: [
						{content:"testing 1"},
						{content:"testing 2"},
						{content:"testing 3"},
						{content:"testing 4"},
						{content:"testing 5"},
						{content:"testing 6"}
					]
				}
			]},
		]},
		{classes:"onyx-contextualpopup-toolbarcheck", components:[
			{kind: "onyx.Checkbox", style:"margin-top:-20px", onchange: "topToolbarChecked"},		
			{content:"Hide/Show Toolbars", classes:"onyx-contextualpopup-toolbarcheck-label"},			
		]},
		
		{kind: "Panels", fit: true, draggable: false, components: [
			{kind: "Scroller", classes: "enyo-fit", thumb:false, components:[{
				classes:"onyx-contextualpopup-scroller-content",
				components:[
				{name:"buttonContainer", kind:"FittableRows", fit:true, classes:"onyx-contextualpopup-button-container", components:[
					//Top row of buttons
					{components:[
						{kind: "onyx.MenuDecorator", style:"display:inline-block", components: [
							{content: "Average"},
							{kind: "onyx.ContextualPopup", 
								title:"Average", 
								floating:true,
								actionButtons:[
									{content:"Press Me"}
								], 
								components: [
									{content:"Item 1"},
									{content:"Item 2"},
									{content:"Item 3"},
									{content:"Item 4"},
									{content:"Item 5"}										
								]
							}
						]},
						
						{kind: "onyx.MenuDecorator", style:"display:inline-block;float:right", components: [
							{content:"Small"},
							{kind: "onyx.ContextualPopup", 
								title:"Small",
								floating:true, 
							}
						]}
					]},

					//Center row of buttons
					{fit:true, style:"padding-top:30%;", components:[
						{kind: "onyx.MenuDecorator", style:"display:inline-block;", components: [
							{content: "Wide",},
							{kind: "onyx.ContextualPopup", 
								title:"Wide", 
								floating:true,
								actionButtons:[
									{content:"test1", classes: "onyx-button-warning"},
									{content:"test2"},
									{content:"test2"},							
									{content:"test3"}							
								], 
								components: [
									{content:"testing 1"},
									{content:"testing 2"},
									{content:"testing 3"},
									{content:"testing 4"},
									{content:"testing 5"},
									{content:"testing 6"}
								],
							}
						]},

						{kind: "onyx.MenuDecorator", style:"display:inline-block;float:right", components: [
							{content:"Long"},
							{kind: "onyx.ContextualPopup", 
								maxHeight: "300",
								title:"Long", 
								floating:true,
								actionButtons:[
									{content:"Press Me"}
								], 
								components: [
									{content:"testing 1"},
									{content:"testing 2"},
									{content:"testing 3"},
									{content:"testing 4"},
									{content:"testing 5"},
									{content:"testing 6"},
									{content:"testing 7"},
									{content:"testing 9"},
									{content:"testing 10"},
									{content:"testing 11"},
									{content:"testing 12"},
									{content:"testing 13"},
									{content:"testing 14"},
									{content:"testing 15"},
									{content:"testing 16"},
									{content:"testing 17"},
									{content:"testing 18"},
									{content:"testing 19"},
									{content:"testing 20"},
									{content:"testing 21"},
									{content:"testing 22"},
									{content:"testing 23"},
									{content:"testing 24"},
									{content:"testing 25"},
									{content:"testing 26"},
									{content:"testing 27"},
									{content:"testing 28"},
									{content:"testing 29"},
									{content:"testing 30"}
								],
							}
						]}
					]},

					//Bottom row of buttons			
					{components:[
						{kind: "onyx.MenuDecorator", style:"display:inline-block;", components: [
							{content: "Non-floating"},
							{kind: "onyx.ContextualPopup", 
								title:"Bottom Left",
								style:"width:200px",
								actionButtons:[
									{content:"test1", classes: "onyx-button-warning"},
									{content:"test2"}
								], 
								components: [
									{content:"This"},
									{content:"popup"},							
									{content:"will"},
									{content:"scroll"},
									{content:"with"},
									{content:"the page."}
								],
							}
						]},

						{kind: "onyx.MenuDecorator", style:"display:inline-block;float:right", components: [
							{content:"Modal"},
							{kind: "onyx.ContextualPopup", 
								style:"width:250px",
								title:"Modal",
								floating:true,
								autoDismiss: false,
								actionButtons:[
									{content:"Do Nothing", classes: "onyx-button-warning"},
									{content:"Dismiss", name:"dismiss_button"}
								],
								components: [
									{content:"Item 1"},
									{content:"Item 2"},
									{content:"Item 3"},
									{content:"Item 4"},
									{content:"Item 5"}										
								]
							}
						]}
					]}			
				]},
				]
			}]},
		]},
		{kind: "onyx.Toolbar", name:"bottomToolbar", classes: "onyx-menu-toolbar", style:"background-color:lightgray", components: [
			{kind: "onyx.MenuDecorator", components: [
				{content:"Back"},
				{kind: "onyx.ContextualPopup", 
					title:"Back", 
					actionButtons:[
						{content:"test1", classes: "onyx-button-warning"},
						{content:"test2"}
					], 
					components: [
						{content:"testing 1"},
						{content:"testing 2"},
						{content:"testing 3"},
						{content:"testing 4"},
						{content:"testing 5"},
						{content:"testing 6"}
					]
				}
			]},
						
			{kind: "onyx.MenuDecorator", style:"float:right;", components: [
			{kind:onyx.Button, content:"Facebook +"},
				{kind: "onyx.ContextualPopup", name:"facebook",
					title:"Facebook +",
					autoDismiss: false,
					actionButtons:[
						{content:"test1", classes: "onyx-button-warning"},
						{content:"Dismiss", name:"dismiss_button"}
					], 
					components: [
						{content:"This"},
						{content:"popup"},
						{content:"has"},
						{content:"autoDismiss"},
						{content:"set"},
						{content:"to"},
						{content:"true."},
						{content:"Press Dismiss!"}
					]
				}
			]},
		]}	
	],
	create:function(){
		this.inherited(arguments);
		this.initializeView();
	},
	initializeView: function(){
		//set the size of the button container area (so we get buttons spread evenly)
		this.$.buttonContainer.addStyles("width:"+ 
			(((window.innerWidth === undefined) ? document.documentElement.clientWidth : window.innerWidth) - 20/*sample padding*/) + "px");
		this.$.buttonContainer.addStyles("height:"+ 
			(((window.innerHeight === undefined) ? document.documentElement.clientHeight : window.innerHeight) - 140 /*toolbars height*/ - 10/*sample padding*/) + "px");		
		this.$.buttonContainer.resized();
		
		enyo.asyncMethod(this,function(){
			this.$.scroller.setScrollLeft(1500);
			this.$.scroller.setScrollTop(1000);
		});
	},
	resizeHandler:function(){
		this.inherited(arguments);
		this.initializeView();
	},
	topToolbarChecked: function(inSender, inEvent) {
		this.$.topToolbar.setShowing(!inSender.getValue());
		this.$.bottomToolbar.setShowing(!inSender.getValue());
		this.resized();
	},
	tapHandler: function(inSender, inEvent) {
		if (inEvent.actionButton) {
			enyo.log(inEvent.popup);	//info about popup it's coming from
			enyo.log("action button index: " + inEvent.originator.index); //index of action button			
			enyo.log("action button name: " + inEvent.originator.name); //name of action button (you can set this - see example use below)			

			if (inEvent.originator.name == "dismiss_button"){
				inEvent.popup.hide();
			}
		}
	}
});