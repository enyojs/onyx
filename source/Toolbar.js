/**
	A toolbar is a horizontal bar containing controls used to perform common ui actions.
	
	Toolbar customizes the styling of the controls it hosts, including buttons, icons, and inputs.
	
		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "Favorites"},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", placeholder: "Enter a search term..."}
			]},
			{kind: "onyx.IconButton", src: "go.png"}
		]}
	
	
	Note: it's possible to style a set of controls to look like they are in a toolbar without
	the container itself looking like a toolbar. To do so, apply the onyx-toolbar-inline 
	css class to the container around the controls.

*/
enyo.kind({
	name: "onyx.Toolbar",
	classes: "onyx onyx-toolbar onyx-toolbar-inline"
});