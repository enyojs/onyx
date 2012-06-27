/**
    An enhanced popup with built-in Scrim and z-Index handling. Modal popups will
     get a transparent scrim by default. To get a translucent scrim when modal,
     specify scrim: true, scrimWhenModal: false.
**/
enyo.kind({
	name: "onyx.Popup",
	kind: "Popup",
	classes: "onyx-popup",
    published: {
        // by default show a transparent scrim when modal
        scrimWhenModal: true,
        scrim: false,
        scrimClassName: ""
    },
    defaultZ: 120,
    showingChanged: function() {
        if(this.showing) {
            onyx.Popup.count++;
            this.applyZIndex();
        }
        else {
            onyx.Popup.count--;
        }
        this.showHideScrim(this.showing);
        this.inherited(arguments);
    },
    showHideScrim: function(inShow) {
        if (this.scrim || (this.modal && this.scrimWhenModal)) {
            var scrim = this.getScrim();
            if (inShow) {
                // move scrim to just under the popup to obscure rest of screen
                var i = this.getScrimZIndex();
                this._scrimZ = i;
                scrim.showAtZIndex(i);
            } else {
                scrim.hideAtZIndex(this._scrimZ);
            }
            enyo.call(scrim, "addRemoveClass", [this.scrimClassName, scrim.showing]);
        }
    },
    getScrimZIndex: function() {
        return this.findZIndex()-1;
    },
    getScrim: function() {
        // show a transparent scrim for modal popups if scrimWhenModal is true
        // if scrim is true, then show a regular scrim.
        if (this.modal && this.scrimWhenModal && !this.scrim) {
            return onyx.scrimTransparent.make();
        }
        return onyx.scrim.make();
    },
    applyZIndex: function() {
        this._zIndex = onyx.Popup.count * 2 + this.findZIndex() + 1;
        // leave room for scrim
        this.applyStyle("z-index", this._zIndex);
    },
    findZIndex: function() {
        // a default z value
        var z = this.defaultZ;
        if (this._zIndex) {
            z = this._zIndex;
        } else if (this.hasNode()) {
            z = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || z;
        }
        return (this._zIndex = z);
    }
});

onyx.Popup.count = 0;