enyo.kind({
	name: "StyleMatters",
	kind: enyo.Control,
	components: [
		{content: "StyleMatters"},
		{kind: enyo.Button, content:"Button"},
		{kind: enyo.Checkbox, content:"Checkbox"},
		{kind: enyo.Input, value:"Input"},
		{},
		{kind: enyo.RadioGroup, components:[
			{content:"Foo"},
			{content:"Bar"},
			{content:"Baz"},
			{content:"Unicorn"},
			{content:"Chocolate"},
			{content:"Princess"}
		]}
	]
});
