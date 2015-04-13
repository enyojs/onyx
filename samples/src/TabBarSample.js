var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Control = require('enyo/Control');

var
	Button = require('onyx/Button'),
	Popup = require('onyx/Popup'),
	TabBar = require('onyx/TabBar');

var SimpleTabBar = kind({
	name: 'SimpleTabBar',
	kind: Control,
	fit: true,
	components: [
		{name: 'bar',kind: 'onyx.TabBar'},
		{style: 'border: 2px solid grey; ', components: [
			{content: 'Only the content of this kind is changed', style: 'padding: 1em'},
			{name: 'stuff', content: 'empty', style: 'padding: 1em'}
		]}
	],

	handlers: {
		onTabChanged: 'switchStuff'
	},

	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		this.$.bar.addTab(
			{'caption': 'English', 'tooltipMsg': 'English/Anglais', 'data': {'msg': 'Hello World !'}}
		);
		this.$.bar.addTab(
			{'caption': 'Français', 'tooltipMsg': 'French/Français', 'data': {'msg': 'Bonjour tout le monde !'}}
		);
	},

	switchStuff: function (sender, event) {
		this.log('Tapped tab with caption ' + event.caption + ' and message ' + event.data.msg);
		this.$.stuff.setContent(event.data.msg);
	}
});

var DynamicTabBar = kind({
		name: 'DynamicTabBar',
		kind: Control,
		fit: true,
		components: [
			{name: 'bar', kind: 'onyx.TabBar', maxMenuHeight: 200},
			{style: 'border: 2px solid grey; ', components: [
				{content: 'create many tabs and reduce the width of the browser'},
				{name: 'stuff', content: 'empty', style: 'padding: 1em'},
				{kind: Button, content: 'create tab', ontap: 'addATab', style: 'margin: 0.5em'},
				{kind: Button, content: 'kill last tab', ontap: 'killTab'}
			]}
		],

		handlers: {
			onTabChanged: 'switchStuff'
		},

		number: 1,
		rendered: function () {
			Control.prototype.rendered.apply(this, arguments);
			var date = new Date();
			this.creationTime = date.getTime();
			this.addATab() ;
		},

		addATab: function (sender, event) {
			this.log('adding a tab');
			var date = new Date();
			var delta = (date.getTime() - this.creationTime) / 1000;
			this.$.bar.addTab({'caption': 'Tab label ' + this.number, data: {
				msg: 'tab ' + this.number++ + ' created after ' + delta + ' seconds'
			}});
		},

		switchStuff: function (sender, event) {
			this.log('Tapped tab with caption ' + event.caption + ' and message ' + event.data.msg );
			this.$.stuff.setContent( event.data.msg);
		},
		killTab: function (sender, event) {
			this.log('killing tab');
			this.$.bar.removeTab({index: this.number-- - 2});
		}
	}
);

// This class shows how actual switch or actual close can be controlled
// from the application. In the example below, these are controlled by a
// 500ms timer.

var DelayedTabBar = kind({
	name: 'DelayedTabBar',
	kind: Control,
	fit: true,
	components: [
		{name: 'bar', kind: TabBar, checkBeforeChanging: true, checkBeforeClosing: true},
		{style: 'border: 2px solid grey;', components: [
			{content: 'Only the content of this kind is changed', style: 'padding: 1em'},
			{name: 'stuff', content: 'empty', style: 'padding: 1em'}
		]},
		{name: 'delayPopup', kind: Popup, modal: true, floating: true, centered: true, content: 'delayed'}
	],

	handlers: {
		// for convenienve, the same delay is applied to tabChange and close
		// Of course, different handlers can be used.
		onTabChangeRequested: 'delayAction',
		onTabChanged:         'updateContent',
		onTabRemoveRequested: 'delayAction'
	},

	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		// With apologies to Morris and Goscinny
		var names = ['Joe', 'Jack', 'William', 'Averell'];

		var add = function (name) {
			this.$.bar.addTab({
				'caption': name,
				'data' : { 'msg': 'Hello ' + name } // arbitrary user data
			});
		};
		utils.forEach(names, add, this);
	},

	delayAction: function (sender, event) {
		this.log('Tapped tab with caption ' + event.caption + ' and message ' + event.data.msg );
		this.$.delayPopup.show();
		setTimeout(this.bindSafely(this.resumeAction, sender, event), 500);
	},
	resumeAction: function (sender, event) {
		this.$.delayPopup.hide();
		this.$.stuff.setContent(event.data.msg);
		event.next(); // call event.next(error) is abort is needed
	},
	updateContent: function (sender, event) {
		this.$.stuff.setContent( event.data.msg);
	}
});

module.exports = kind({
	name: 'onyx.sample.TabBarSample',
	classes: 'onyx onyx-sample',
	components: [
		{classes: 'onyx-sample-divider', content: 'Simple Tab Bar'},
		{kind: SimpleTabBar},
		{classes: 'onyx-sample-divider', content: 'Dynamic Tab Bar', style: 'padding-top: 4em;'},
		{kind: DynamicTabBar},
		{classes: 'onyx-sample-divider', content: 'Delayed Tab Bar', style: 'padding-top: 4em;'},
		{kind: DelayedTabBar}
	]
});