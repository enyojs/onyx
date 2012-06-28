enyo.kind({
	name: "IconButtonSample",
	classes: "onyx onyx-sample",
	components: [
		{classes: "onyx-sample-divider", content: "Icon Button"},
		{kind: "onyx.IconButton", src: "assets/menu-icon-bookmark.png", ontap:"iconTapped" },
		{tag: "br"},
		{tag: "br"},
		{classes: "onyx-sample-divider", content: "Grouped Icon Buttons"},
		{kind: "Group", onActivate:"iconGroupActivated", components: [
			{kind: "onyx.IconButton", active: true, src: "assets/menu-icon-bookmark.png"},
			{kind: "onyx.IconButton", src: "assets/menu-icon-bookmark.png"},
			{kind: "onyx.IconButton", src: "assets/menu-icon-bookmark.png"}
		]},
		{tag: "br"},
		{classes: "onyx-sample-divider", content: "Icon Buttons in Toolbar"},
		{kind: "onyx.Toolbar", defaultKind: "onyx.IconButton", components: [
			{src: "assets/menu-icon-bookmark.png", ontap:"iconTapped"},
			{src: "assets/menu-icon-bookmark.png", ontap:"iconTapped"},
			{src: "assets/menu-icon-bookmark.png", ontap:"iconTapped"},
			{kind: "Control"},
			{kind: "Group", tag: null, onActivate:"iconGroupActivated", defaultKind: "onyx.IconButton", components: [
				{src: "assets/menu-icon-bookmark.png", active: true},
				{src: "assets/menu-icon-bookmark.png"},
				{src: "assets/menu-icon-bookmark.png"}
			]}
		]},
		{tag: "br"},
		{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
			{kind: "onyx.GroupboxHeader", content: "Result"},
			{name:"result", classes:"onyx-sample-result", content:"No button tapped yet."}
		]}
	],
	iconTappedCounts: {},
	iconTapped: function(inSender, inEvent) {
		this.iconTappedCounts[inSender.name] = this.iconTappedCounts[inSender.name] || 0;
		this.$.result.setContent("The icon button was tapped: " + ++this.iconTappedCounts[inSender.name]);
	},
	ordinals: ["1st", "2nd", "3rd"],
	iconGroupActivated: function(inSender, inEvent) {
		if (inEvent.originator.getActive()) {
			var selected = inEvent.originator.indexInContainer();
			this.$.result.setContent("The " + this.ordinals[selected] + " icon button in the group is selected.");
		}
	}
});
