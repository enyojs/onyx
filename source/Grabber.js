/**
	A control styled to look like an object which can be grabbed and moved. It's used to indicate that 
	that dragging it will make something move and should only be used in this case.

		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Grabber", ondragstart: "grabberDragstart", ondrag: "grabberDrag", ondragfinish: "grabberDragFinish"},
			{kind: "onyx.Button", content: "More stuff"}
		]}
	
*/
enyo.kind({
	name: "onyx.Grabber",
	classes: "onyx-grabber"
});