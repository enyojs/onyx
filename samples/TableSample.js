var Person = function(first, last) {
	this.first=first;
	this.last=last;
};
Person.prototype.full = function() {
	return this.last + ', ' + this.first;
};

var arrayData = [['a','b','c'],['d','e','f'],['g','h','i']];
var hashData = [{first: 'a', second: 'b', third: 'c'}, {first: 'd', second: 'e', third: 'f'}, {first: 'g', second: 'h', third: 'i'}];
var complexData = [["Americas", -8.64, 8.14, 6.63, 3.92], ["Europe", 1.97, 7.28, -6.12, -1.34], ["Asia", 5.74, 0.9, 2.97, -0.37]];
var i = 0;
styleEveryOther = function(row, rows, rowI, colI) { return (i++%2) ? ("<b>"+row[colI]+"</b>") : ("<i>"+row[colI]+"</i>");};
enyo.kind({
	name: "onyx.sample.TableSample",
	classes: "onyx onyx-sample",
	components: [
		{classes: "onyx-sample-divider", content: "Array Data"},
		{content: JSON.stringify(arrayData)},
		{kind: "onyx.Table", titles: ['first', 'second', 'third'], rowData: arrayData},
		{tag: "br"},
		{kind: "onyx.Button", content: "Toggle header", ontap: "toggleHeader"},
		{tag: "br"}, {tag: "br"},
		{classes: "onyx-sample-divider", content: "Hash Data"},
		{content: JSON.stringify(this.hashData)},
		{kind: "onyx.Table", titles: ['first', 'second', 'third'], rowData: hashData,
			genRow: function(inRowCount) {
				var rowData = this.rowData[inRowCount];
				return [rowData["first"], rowData["second"], rowData["third"]];
			}
		},
		{tag: "br"},
		{classes: "onyx-sample-divider", content: "Complex table using classes, and programatically creating summary columns and rows"},
		{content: JSON.stringify(complexData)},
		{kind: "onyx.Table", titles: ['Office', 'Q1', 'Q2', 'Q3', 'Q4', 'Year'], rowData: complexData,
			genRow: function(inRowCount) {
				var rowData = this.rowData[inRowCount];
				// set a negative class on any cell containing a negative number.
				var out = enyo.map(rowData, function(cell) { return (cell < 0) ? { classes: "negative", content: cell } : cell; });
				console.log(rowData);
				// calculate the yearly income
				var year = rowData[1] + rowData[2] + rowData[3] + rowData[4];
				year = Math.round(year*100)/100;
				out.push((year < 0) ? { classes: "negative", content: year } : year);
				return out;
			},
			genFooter: function() {
				if (![].reduce) return;
				var out = [{ tag: "th", content: "totals"}];
				var sum = function(x, y) { return x + y; };
				for (var i=1; i<6; i++) {
					// calculate a sum for all offices in each column.
					var total = this.getCol(i).reduce(sum);
					total = Math.round(total*100)/100;
					out.push({ tag: "th", classes: (total < 0) ? "negative" : "", content: total });
				}
				return out;
			}
		}
	],
	toggleHeader: function(inSender, inEvent) {
		this.$.table.setdisplayHeader(!this.$.table.displayHeader);
	}
});
