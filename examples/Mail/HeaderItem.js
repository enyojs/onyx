enyo.kind({
	name: "HeaderItem",
	published: {
		item: null
	},
	classes: "header-item",
	components: [
		{name: "flag", classes: "mail-flag-icon"},
		//{name: "status", classes: "mail-status-icon"},
		//{name: "invite", classes: "mail-calendar-icon"},
		{name: "when", classes: "mail-when"},
		//{name: "attach", classes: "mail-attach-icon"},
		{name: "from", classes: "mail-from"},
		//{classes: "mail-flag-icon"},
		{name: "subject", classes: "mail-subject"},
		{name: "blurb", classes: "mail-blurb"}
	],
	create: function() {
		//this.addClass("enyo-bg");
		this.inherited(arguments);
		this.itemChanged();
	},
	itemChanged: function() {
		var m = this.item;
		if (!m) {
			return;
		}
		m.priority = "high";
		m.meetingInfo = true;
		//
		var flags = m.flags || {read: true, replied: true};
		//
		this.$.when.setContent(this.item.date ? this.item.date.slice(0, 11) : "(no date)");
		//
		//this.domStyles["font-weight"] = flags.read ? null : "bold";
		this.$.from.content = m.from || "(no sender)";
		this.$.subject.content = m.subject;
		this.$.blurb.content = m.blurb || "";
		//
		// Configure priority/flagged
		this.$.flag.setShowing(m.priority || flags.flagged);
		if (this.$.flag.showing) {
			this.$.flag.addClass("mail-flag-" + (m.priority ? "priority" : ""));
		}
		//
		// Configure send/reply/fwd
		/*
		if (m.sendStatus && m.sendStatus.fatalError) {
			this.$.status.addClass("mail-status-error");
		} else if (flags.replied && flags.forwarded) {
			this.$.status.addClass("mail-status-reply-forward");
		} else if (flags.replied) {
			this.$.status.addClass("mail-status-reply");
		} else if (flags.forwarded) {
			this.$.status.addClass("mail-status-forward");
		}
		this.$.status.setShowing(false); //flags.replied || flags.forwarded || (m.sendStatus && m.sendStatus.fatalError));
		this.$.invite.setShowing(false); //m.meetingInfo);
		*/
	}
});
