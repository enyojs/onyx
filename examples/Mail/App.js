enyo.kind({
	name: "App",
	classes: "enyo-fit enyo-unselectable",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "FittableColumns", fit: true, components: [
				{name: "left", kind: "FittableRows", components: [
					{kind: "onyx.Toolbar", content: "Accounts", style: "text-align: center; padding: 13px 0 14px;"},
					{content: "MAILBOXES", classes: "divider"},
					{kind: "Scroller", fit: true, components: [
						{kind: "Repeater", count: 0, onSetupItem: "setupItem", ontap: "mailboxTap", components: [
							{name: "item", kind: "ToolDecorator", classes: "mailbox-item", components: [
								{kind: "Image", src: "images/mailbox_empty.png"},
								{tag: "span", name: "caption", style: "padding-left: 8px;"}
							]}
						]}
					]}
				]},
				{name: "left2", kind: "FittableRows", components: [
					{kind: "onyx.Toolbar", content: "Messages", style: "text-align: center; padding: 13px 0 14px;"},
					{kind: "onyx.InputDecorator", name: "inputDecorator", style: "display: block;", components: [
						{kind: "Input", placeholder: "search", style: "width: 90%;", name: "input"},
						{kind: "Image", src: "images/search.png"}
					]},
					{name: "boxName", content: "(no mailbox)", classes: "divider"},
					{kind: "Scroller", fit: true, components: [
						{kind: "Repeater", count: 0, onSetupItem: "setupHeaderItem", ontap: "headerTap", ondown: "headerDown", onclick: "headerClick", components: [
							{name: "item", kind: "HeaderItem"}
						]}
					]}
				]},
				{name: "body", fit: true, kind: "FittableRows", components: [
					{kind: "onyx.Toolbar", components: [
						{kind: "onyx.Button", content: "%", ontap: "testTap"}
					]},
					{content: "From", style: "padding: 8px;"},
					{content: "Subject", style: "padding: 8px;"},
					{content: "Attachments", style: "padding: 8px;"},
					{fit: true, kind: "Scroller", components: [
						{name: "mailBody", allowHtml: true, style: "padding: 8px;"}
					]}
				]}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	rendered: function() {
		this.inherited(arguments);
		var url = "php/boxesInfo.php";
		var url = "cache/boxes.json";
		new enyo.Ajax({url: url}).response(this, this.receiveBoxes).go();
	},
	receiveBoxes: function(inSender, inBoxes) {
		//this.log(inBoxes);
		this.boxes = inBoxes;
		this.$.repeater.count = this.boxes.length;
		this.$.repeater.build();
		this.$.repeater.render();
	},
	setupItem: function(inSender, inEvent) {
		var item = this.boxes[inEvent.index];
		inEvent.item.$.caption.setContent(item.name);
	},
	mailboxTap: function(inSender, inEvent) {
		var o = inEvent.originator.owner;
		if ("index" in o) {
			this.selectMailbox(o);
		}
	},
	selectMailbox: function(inMailbox) {
		if (this.mailbox) {
			this.mailbox.$.item.removeClass("selected-item");
		}
		//
		this.$.repeater2.count = 0;
		this.$.repeater2.build();
		this.$.repeater2.render();
		//
		this.mailbox = inMailbox;
		if (this.mailbox) {
			this.mailbox.$.item.addClass("selected-item");
			//
			var box = this.boxes[this.mailbox.index];
			this.$.boxName.setContent(box.name);
			//
			var url = "php/headers.php";
			var url = "cache/" + box.name + "-headers.json";
			new enyo.Ajax({url: url})
				.response(this, this.receiveHeaders)
				.go({box: box.box})
			;
		}
	},
	receiveHeaders: function(inSender, inResponse) {
		enyo.asyncMethod(this, "_receiveHeaders", inSender, inResponse);
	},
	_receiveHeaders: function(inSender, inResponse) {
		//this.log(inResponse);
		this.headers = inResponse;
		this.$.repeater2.count = Math.min(this.headers.length, 500);
		//
		var box = this.boxes[this.mailbox.index];
		this.$.boxName.setContent(box.name + " (" + this.$.repeater2.count + ")");
		//
		this.$.repeater2.build();
		this.$.repeater2.render();
	},
	setupHeaderItem: function(inSender, inEvent) {
		inEvent.item.$.item.setItem(this.headers[inEvent.index]);
	},
	//headerClick: function(inSender, inEvent) {
	//headerDown: function(inSender, inEvent) {
	headerTap: function(inSender, inEvent) {
		//console.log("delay between dispatch and handler:", new Date().getTime() - inEvent.time);
		var o = inEvent.originator.owner;
		if (!("index" in o)) {
			o = inEvent.originator.owner.owner;
		}
		if ("index" in o) {
			this.selectHeader(o);
		}
	},
	selectHeader: function(inHeader) {
		if (this.header && this.header.$.item) {
			this.header.$.item.removeClass("selected-item");
		}
		this.header = inHeader;
		if (this.header) {
			this.header.$.item.addClass("selected-item");
		}
		enyo.asyncMethod(this, function() {
			this.$.mailBody.setContent("");
			//
			var box = this.boxes[this.mailbox.index];
			var header = this.headers[this.header.index];
			//this.log(header.msgno);
			//
			if (this.mail) {
				this.receiveBody(this, this.mail[header.msgno]);
			} else {
				new enyo.Ajax({url: "cache/mail.json"})
					.response(this, function(inSender, inResponse) {
						this.mail = inResponse;
						this.receiveBody(this, this.mail[header.msgno]);
					})
					.go()
				;
				/*
				var url = "php/body.php";
				new enyo.Ajax({url: url, handleAs: "text"})
					.response(this, this.receiveBody)
					.go({box: box.box, msgno: header.msgno})
				;
				*/
			}
		});
	},
	receiveBody: function(inSender, inResponse) {
		//this.$.mailBody.show();
		//this.$.bodySpinner.hide();
		//this.log();
		this.$.mailBody.setContent("<pre>" + inResponse + "</pre>");
	},
	dumpMail: function() {
		var box = this.boxes[this.mailbox.index];
		var h$ = this.headers;
		var inflight = 0;
		var data = {};
		var url = "php/body.php";
		for (var i=0, h; h=h$[i]; i++) {
			if (!data[h.msgno]) {
				data[h.msgno] = "(temp)";
				inflight++;
				new enyo.Ajax({url: url, handleAs: "text", msgno: h.msgno})
					.go({box: box.box, msgno: h.msgno})
					.response(this, function(inSender, inText) {
						data[inSender.msgno] = inText;
						inflight--;
						console.log(inflight, inSender.msgno);
						if (inflight == 0) {
							console.log(JSON.stringify(data));
						}
					})
				;
			}
		}
	}
});
