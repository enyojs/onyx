var
	kind = require('enyo/kind'),
	Scroller = require('enyo/Scroller');

var
	FittableRows = require('layout/FittableRows'),
	FittableColumns = require('layout/FittableColumns');

var
	ContextualPopup = require('onyx/ContextualPopup'),
	IconButton = require('onyx/IconButton'),
	MenuDecorator = require('onyx/MenuDecorator'),
	Toolbar = require('onyx/Toolbar');

module.exports = kind({
	name: 'onyx.sample.ContextualPopupSample',
	kind: FittableRows,
	classes: 'onyx enyo-fit',
	handlers: {
		ontap: 'tapHandler'
	},
	components: [
		{kind: Toolbar, name: 'topToolbar', classes: 'onyx-menu-toolbar', style: 'background-color:lightgray', components: [
			{kind: FittableColumns, style: 'width:100%;', components: [
				{kind: MenuDecorator, components: [
					{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
					{kind: ContextualPopup, title: 'Toolbar Button', floating: true, actionButtons: [
						{content: 'test1',	classes: 'onyx-button-warning'},
						{content: 'test2'}
					], components: [
						{content: 'testing 1'},
						{content: 'testing 2'}
					]}
				]},
				{kind: MenuDecorator, fit: true, style: 'position:absolute;right:0;', components: [
					{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
					{kind: ContextualPopup, title: 'Toolbar Button', floating: true, actionButtons: [
						{content: 'test1', classes: 'onyx-button-warning'},
						{content: 'test2'}
					], components: [
						{content: 'testing 1'},
						{content: 'testing 2'},
						{content: 'testing 3'},
						{content: 'testing 4'},
						{content: 'testing 5'},
						{content: 'testing 6'}
					]}
				]}
			]}
		]},
		{kind: Scroller, fit: true, thumb: false, components: [
			{name: 'buttonContainer', kind: FittableRows, classes: 'onyx-contextualpopup-button-container enyo-fit', components: [
				//Top row of buttons
				{components: [
					{kind: MenuDecorator, style: 'display:inline-block', components: [
						{content: 'Average'},
						{kind: ContextualPopup, title: 'Average', floating: true, actionButtons: [
							{content: 'Press Me'}
						], components: [
							{content: 'Item 1'},
							{content: 'Item 2'},
							{content: 'Item 3'},
							{content: 'Item 4'},
							{content: 'Item 5'}
						]}
					]},
					{kind: MenuDecorator, style: 'display:inline-block;float:right', components: [
						{content: 'Small'},
						{kind: ContextualPopup, title: 'Small', floating: true}
					]}
				]},
				//Center row of buttons
				{fit: true, style: 'padding-top:15%;padding-bottom:15%;', components: [
					{kind: MenuDecorator, style: 'display:inline-block;', components: [
						{content: 'Wide'},
						{kind: ContextualPopup, title: 'Wide', style: 'width:300px', floating: true, actionButtons: [
							{content: 'test1', classes: 'onyx-button-warning'},
							{content: 'test2'}
						], components: [
							{kind: Scroller, style: 'min-width:150px;', horizontal: 'auto', touch: true, thumb: false, components: [
								{content: 'testing 1'},
								{content: 'testing 2'}
							]}
						]}
					]},
					{kind: MenuDecorator, style: 'display:inline-block;float:right', components: [
						{content: 'Long'},
						{kind: ContextualPopup, maxHeight: '200', title: 'Long', floating: true, actionButtons: [
							{content: 'Press Me'}
						], components: [
							{content: 'testing 1'},
							{content: 'testing 2'},
							{content: 'testing 3'},
							{content: 'testing 4'},
							{content: 'testing 5'},
							{content: 'testing 6'},
							{content: 'testing 7'},
							{content: 'testing 8'},
							{content: 'testing 9'},
							{content: 'testing 10'},
							{content: 'testing 11'},
							{content: 'testing 12'},
							{content: 'testing 13'},
							{content: 'testing 14'},
							{content: 'testing 15'},
							{content: 'testing 16'},
							{content: 'testing 17'},
							{content: 'testing 18'},
							{content: 'testing 19'},
							{content: 'testing 20'},
							{content: 'testing 21'},
							{content: 'testing 22'},
							{content: 'testing 23'},
							{content: 'testing 24'},
							{content: 'testing 25'},
							{content: 'testing 26'},
							{content: 'testing 27'},
							{content: 'testing 28'},
							{content: 'testing 29'},
							{content: 'testing 30'}
						]}
					]}
				]},
				//Bottom row of buttons
				{components: [
					{kind: MenuDecorator, style: 'display:inline-block;', components: [
						{content: 'Press Me'},
						{kind: ContextualPopup, title: 'Press Me', floating: true, style: 'width:200px', actionButtons: [
							{content: 'test1', classes: 'onyx-button-warning'},
							{content: 'test2'}
						], components: [
							{content: 'testing 1'},
							{content: 'testing 2'},
							{content: 'testing 3'},
							{content: 'testing 4'},
							{content: 'testing 5'},
							{content: 'testing 6'},
							{content: 'testing 7'},
							{content: 'testing 8'},
							{content: 'testing 9'},
							{content: 'testing 10'}
						]}
					]},
					{kind: MenuDecorator, style: 'display:inline-block;float:right', components: [
						{content: 'Try Me'},
						{kind: ContextualPopup, style: 'width:250px', title: 'Try Me', floating: true, actionButtons: [
							{content: 'Do Nothing', classes: 'onyx-button-warning'},
							{content: 'Dismiss', ontap: 'dismissTap'}
						], components: [
							{content: 'Item 1'},
							{content: 'Item 2'},
							{content: 'Item 3'},
							{content: 'Item 4'},
							{content: 'Item 5'}
						]}
					]}
				]}
			]}
		]},
		{kind: Toolbar, name: 'bottomToolbar', classes: 'onyx-menu-toolbar', style: 'background-color:lightgray', components: [
			{kind: FittableColumns, style: 'width:100%;', components: [
				{kind: MenuDecorator, components: [
					{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
					{kind: ContextualPopup, title: 'Toolbar Button', floating: true, actionButtons: [
						{content: 'test1', classes: 'onyx-button-warning'},
						{content: 'test2'}
					], components: [
						{content: 'testing 1'},
						{content: 'testing 2'},
						{content: 'testing 3'},
						{content: 'testing 4'},
						{content: 'testing 5'},
						{content: 'testing 6'}
					]}
				]},
				{kind: MenuDecorator, fit: true, style: 'position:absolute;right:0;', components: [
					{kind: IconButton, src: 'assets/menu-icon-bookmark.png'},
					{kind: ContextualPopup, name: 'facebook', title: 'Toolbar Button', floating: true, actionButtons: [
						{content: 'test1', classes: 'onyx-button-warning'},
						{content: 'Dismiss', name: 'dismiss_button'}
					], components: [
						{content: 'testing 1'},
						{content: 'testing 2'},
						{content: 'testing 3'},
						{content: 'testing 4'},
						{content: 'testing 5'},
						{content: 'testing 6'}
					]}
				]}
			]}
		]}
	],
	dismissTap: function (sender, event) {
		this.log(sender.name, 'action button tapped');
		sender.popup.hide();
		return true;
	},
	tapHandler: function (sender, event) {
		if (event.originator.actionButton) {
			this.log(event.originator.popup); //info about popup it's coming from
			this.log('action button name: ' + event.originator.name); //name of action button (you can set this - see example use below)

			if (event.originator.name == 'dismiss_button') {
				event.originator.popup.hide();
			}
		}
	}
});
