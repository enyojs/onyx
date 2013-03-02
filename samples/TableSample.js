var Person = function(first, last) {
	this.first=first;
	this.last=last;
};
Person.prototype.full = function() {
	return this.last + ', ' + this.first;
};

var arrayData = [['a','b','c'],['d','e','f'],['g','h','i']];
var hashData = [{first: 'a', second: 'b', third: 'c'}, {first: 'd', second: 'e', third: 'f'}, {first: 'g', second: 'h', third: 'i'}];
var objectData = [new Person("John", "Doe"), new Person("Sally", "Smith"), new Person("Betty", "Baker")];
var i = 0;
styleEveryOther = function(row, rows, rowI, colI) { return (i++%2) ? ("<b>"+row[colI]+"</b>") : ("<i>"+row[colI]+"</i>");};
enyo.kind({
	name: "onyx.sample.TableSample",
	classes: "onyx onyx-sample",
	components: [
		{classes: "onyx-sample-divider", content: "Array Data"},
		{content: JSON.stringify(arrayData)},
		{kind: "onyx.Table", titles: ['first', 'second', 'third'], rows: arrayData},
		{kind: "onyx.Button", content: "Toggle header", ontap: "toggleHeader"},
		{tag: "br"},
		{classes: "onyx-sample-divider", content: "Hash Data"},
		{content: JSON.stringify(this.hashData)},
		{kind: "onyx.Table", titles: ['first', 'second', 'third'], columns: ['first', 'second', 'third'], rows: hashData},
		{tag: "br"},
		{classes: "onyx-sample-divider", content: "Object Data"},
		{content: JSON.stringify(this.objectData)},
		{kind: "onyx.Table", titles: ['first', 'last', 'full'], columns: ['first', 'last', 'full'], rows: objectData},
		{tag: "br"},
		{classes: "onyx-sample-divider", content: "Html in cell"},
		{content: JSON.stringify(arrayData)},
		{kind: "onyx.Table", titles: ['first', 'second', 'third'], rows: arrayData, allowHtml: true,
		columns: [styleEveryOther, styleEveryOther, styleEveryOther]
		},
		{tag: "br"},
		{classes: "onyx-sample-divider", content: "Data transforms"},
		{content: JSON.stringify(arrayData)},
		{kind: "onyx.Table", titles: ['no transform', 'to number', 'next letter'], rows: arrayData,
		columns: [undefined, function(row) {return row[1].charCodeAt(0);}, function(row) {return String.fromCharCode(row[2].charCodeAt(0)+1);}]
		}
	],
	toggleHeader: function(inSender, inEvent) {
		this.$.table.setDisplayHeader(!this.$.table.displayHeader);
	}
});
