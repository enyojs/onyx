enyo.kind({
	name: "App",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "onyx.Toolbar", classes: "align-center", components: [
				{kind: "Image", src: "soundsandalerts_48x48.png", style: "width: 48px; height: 48px;"},
				{content: "Sounds & Ringtones"}
			]},
			{kind: "Scroller", fit: true, components: [
				{classes: "main", components: [
					{kind: "onyx.Groupbox", components: [
						{classes: "groupbox-item", components: [
							{content: "Sounds"},
							{kind: "onyx.ToggleButton", value: true}
						]}
					]},
					{kind: "onyx.Groupbox", components: [
						{kind: "onyx.GroupboxHeader", content: "SOUNDS"},
						{classes: "groupbox-item", components: [
							{content: "System Sounds"},
							{kind: "onyx.ToggleButton", value: true}
						]},
						{classes: "groupbox-item",components: [
							{content: "Keyboard Clicks"},
							{kind: "onyx.ToggleButton"}
						]},
						{classes: "groupbox-item",components: [
							{content: "Ringtone"},
							{kind: "onyx.Checkbox", value: true}
						]}
					]},
					{kind: "onyx.Groupbox", components: [
						{kind: "onyx.GroupboxHeader", content: "Volume"},
						{classes: "groupbox-item", components: [
							{kind: "onyx.Slider", value: 25}
						]}
					]},
					{kind: "onyx.Groupbox", components: [
						{kind: "onyx.GroupboxHeader", content: "Ringtone"},
						{kind: "onyx.InputDecorator", components: [
							{kind: "onyx.Input", value: "Marimba", style: "width: 100%;"},
						]}
					]},
					{kind: "onyx.Groupbox", components: [
						{classes: "groupbox-item", components: [
							{content: "Vibrate"},
							{kind: "onyx.ToggleButton"}
						]}
					]},
					{kind: "onyx.Groupbox", components: [
						{classes: "groupbox-item", components: [
							{content: "Beats Audio"},
							{kind: "onyx.ToggleButton", value: true}
						]}
					]}
				]}
			]}
		]}
	]
});
