var mock_reminders = [
	{title: "Enyo 2.0.1 Release", notes: "Finish Onyx UI widget set and API documentation."},
	{title: "Dinner", notes: "Dinner at somewhere."},
	{title: "Laundry", notes: ":("}
]

enyo.kind({
	name: "App",
	classes: "enyo-unselectable",
	components: [
		{name: "list", classes: "enyo-fit", components: [
			{kind: "FittableRows", classes: "enyo-fit", components: [
				{content: "Reminders", style: "height: 50px; font-size: 28px; color: #D90F60; padding: 10px;"},
				{kind: "FittableColumns", style: "height: 50px; color: #635F61", components: [
					{name: "numCompleted", style: "width: 100px; text-align: center;"},
					{fit: true, content: "Completed"}
				]},
				{name: "reminders", fit: true, kind: "Scroller"}
			]}
		]},
		{kind: "Details", classes: "enyo-fit", showing: false, onDone: "showList", onDelete: "deleteReminder"}
	],
	numCompleted: 0,
	create: function() {
		this.inherited(arguments);
		for (var i=0; i<50; i++) {
			this.createComponent({kind: "ReminderItem", container: this.$.reminders, onCheck: "reminderCheck", onDetails: "showDetails"},
				mock_reminders[i]);
		}
		this.updateNumCompleted();
	},
	reminderCheck: function(inSender, inCheckbox) {
		inCheckbox.value ? this.numCompleted++ : this.numCompleted--;
		this.updateNumCompleted();
	},
	updateNumCompleted: function() {
		this.$.numCompleted.setContent(this.numCompleted);
	},
	showList: function() {
		this.showPanel("list");
	},
	showDetails: function(inSender) {
		this.showPanel("details");
		this.$.details.setReminder(inSender);
	},
	showPanel: function(inPanel) {
		this.$.list.hide();
		this.$.details.hide();
		this.$[inPanel].show();
		// need to call resized to force Fittable to re-flow the layout
		this.$[inPanel].resized();
	},
	deleteReminder: function(inSender) {
		var r = inSender.reminder;
		if (r) {
			if (r.isChecked()) {
				this.numCompleted--;
				this.updateNumCompleted();
			}
			r.clearAll();
		}
		this.showList();
	}
});

enyo.kind({
	name: "ReminderItem",
	style: "border-bottom: 1px solid lightblue; height: 64px; line-height: 64px;",
	published: {
		title: "",
		notes: ""
	},
	events: {
		onCheck: "",
		onDetails: ""
	},
	components: [
		{kind: "FittableColumns", style: "height: 100%;", components: [
			{style: "width: 100px; border-right: 1px double pink; text-align: center;", components: [
				{kind: "onyx.Checkbox", onChange: "doCheck"}
			]},
			{fit: true, components: [
				{kind: "onyx.InputDecorator", style: "width: 100%; border: 0; margin-left: 5px;", components: [
					{kind: "onyx.Input", style: "width: 100%;", onblur: "titleUpdated", onInputChange: "inputChange"}
				]}
			]},
			{style: "width: 80px; text-align: center;", components: [
				{name: "image", kind: "onyx.Icon", src: "images/arrow-icon.png", ontap: "doDetails"}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.titleChanged();
	},
	titleChanged: function() {
		this.$.input.setValue(this.title);
		this.titleUpdated();
	},
	titleUpdated: function() {
		var empty = !this.$.input.getValue();;
		this.$.checkbox.setShowing(!empty);
		this.$.image.setShowing(!empty);
	},
	inputChange: function() {
		var v = this.$.input.getValue();
		if (v) {
			this.title = v;
		}
	},
	isChecked: function() {
		return this.$.checkbox.getValue();
	},
	clearAll: function() {
		this.setTitle("");
		this.setNotes("");
		this.$.checkbox.setValue(false);
	}
});

enyo.kind({
	name: "Details",
	classes: "details",
	events: {
		onDone: "",
		onDelete: ""
	},
	components: [
		{kind: "onyx.Toolbar", content: "Details", style: "text-align: center;"},
		{kind: "onyx.Groupbox", components: [
			{kind: "onyx.InputDecorator", components: [
				{name: "titleInput", kind: "onyx.Input", style: "width: 100%;", onInputChange: "titleChange"}
			]}
		]},
		{kind: "onyx.Groupbox", components: [
			{kind: "onyx.InputDecorator", components: [
				{name: "notesInput", kind: "onyx.Input", style: "width: 100%;", placeholder: "Enter Notes Here...", onInputChange: "notesChange"}
			]},
			{kind: "onyx.InputDecorator", components: [
				{name: "datetime", kind: "onyx.Input", style: "width: 100%;", placeholder: "Enter Date & Time Here...", attributes: {type: "datetime"}}
			]}
		]},
		{classes: "onyx-toolbar-inline", style: "float: right;", components: [
			{kind: "onyx.Button", content: "Done", ontap: "doDone"},
			{kind: "onyx.Button", style: "background-color: #FAF5F7; color: #FA1672;", content: "Delete", ontap: "doDelete"}
		]}
	],
	setReminder: function(inReminder) {
		this.reminder = inReminder;
		this.$.titleInput.setValue(this.reminder.title);
		this.$.notesInput.setValue(this.reminder.notes);
	},
	titleChange: function(inSender) {
		if (this.reminder) {
			this.reminder.setTitle(inSender.getValue());
		}
	},
	notesChange: function(inSender) {
		if (this.reminder) {
			this.reminder.setNotes(inSender.getValue());
		}
	}
});
