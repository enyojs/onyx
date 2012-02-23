enyo.kind({
	name: "App",
	components: [
		{kind: "onyx.Toolbar", classes: "align-center", components: [
			{kind: "Image", src: "soundsandalerts_48x48.png"},
			{content: "Sounds & Ringtones"}
		]},
		{classes: "main", components: [
			{kind: "onyx.Groupbox", components: [
				{components: [
					{content: "Sounds"},
					{kind: "onyx.ToggleButton", value: true}
				]}
			]},
			{kind: "onyx.Groupbox", components: [
				{kind: "onyx.GroupboxHeader", content: "SOUNDS"},
				{components: [
					{content: "System Sounds"},
					{kind: "onyx.ToggleButton", value: true}
				]},
				{components: [
					{content: "Keyboard Clicks"},
					{kind: "onyx.ToggleButton"}
				]},
				{components: [
					{content: "Ringtone"},
					{kind: "onyx.Checkbox", value: true}
				]}
			]},
			{kind: "onyx.Groupbox", components: [
				{kind: "onyx.GroupboxHeader", content: "Ringtone"},
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", value: "Marimba"},
				]}
			]},
			{kind: "onyx.Groupbox", components: [
				{components: [
					{content: "Vibrate"},
					{kind: "onyx.ToggleButton"}
				]}
			]},
			{kind: "onyx.Groupbox", components: [
				{components: [
					{content: "Beats Audio"},
					{kind: "onyx.ToggleButton", value: true}
				]}
			]}
		]}
	]
});
