enyo.kind({
	name: "SearchPlaces",
	kind: "Component",
	published: {
		credentials: ""
	},
	events: {
		onResults: ""
	},
	url: "http://api.bing.net/json.aspx",
	params: {
		Version: "2.0",
		Market: "en-US",
		c: "en-US",
		Options: "EnableHighlighting",
		Sources: "PhoneBook",
		"Phonebook.Count": 10,
		JsonType: "callback"
	},
	search: function(inParams) {
		var params = enyo.clone(this.params);
		params.AppId = this.credentials;
		enyo.mixin(params, inParams);
		return new enyo.JsonpRequest({
        		url: this.url,
        		callbackName: "JsonCallback"
			})
			.response(enyo.bind(this, "processResponse"))
    		.go(params);
	},
	processResponse: function(inSender, inResponse) {
		var p = inResponse.SearchResponse.Phonebook;
		this.doResults({results: p && p.Results || []});
	}
});
