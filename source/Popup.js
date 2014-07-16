(function (enyo, scope) {

	/**
	* _onyx.Popup_ is an enhanced {@link enyo.Popup} with built-in scrim and
	* z-index handling.
	*
	* To avoid obscuring popup contents, scrims require the dialog to be floating;
	* otherwise, they won't render. A modal popup will get a transparent scrim
	* unless the popup isn't floating. To get a translucent scrim when modal,
	* specify `{@link onyx.Popup#scrim}: true` and `{@link onyx.Popup#scrimWhenModal}: false`.
	*
	* For more information, see the documentation on
	* [Popups](building-apps/controls/popups.html) in the Enyo Developer Guide.
	*
	* @class  onyx.Popup
	* @extends enyo.Popup
	* @ui
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.Popup.prototype */ {
		name: 'onyx.Popup',
		kind: 'enyo.Popup',
		classes: 'onyx-popup',

		/**
		* @private
		* @lends onyx.Popup.prototype
		*/
		published: {
			/**
			* Boolean that controls whether a scrim will appear when the dialog is
			* modal. Note that modal scrims are transparent, so you won't see them.
			*
			* @type {Boolean}
			* @default true
			* @public
			*/
			scrimWhenModal: true,

			/**
			* Boolean that controls whether or not a scrim will be displayed. Scrims are
			* only displayed when the dialog is floating.
			*
			* @type {Boolean}
			* @default  false
			* @public
			*/
			scrim: false,

			/**
			* Optional class name to apply to the scrim. Be aware that the scrim
			* is a singleton and you will be modifying the scrim instance used for
			* other popups.
			*
			* @type {String}
			* @default  ''
			* @public
			*/
			scrimClassName: '',

			/**
			* Lowest z-index that may be applied to a popup
			*
			* @type {Number}
			* @default  120
			* @public
			*/
			defaultZ: 120
		},

		/**
		* @lends  onyx.Popup
		* @private
		*/
		protectedStatics: {
			/**
			* Count of currently showing popups
			* @type {Number}
			* @static
			* @private
			*/
			count: 0,

			/**
			* Highest possible z-index for a popup
			* @type {Number}
			* @static
			* @private
			*/
			highestZ: 120
		},

		/**
		* @private
		*/
		showingChanged: function () {
			if(this.showing) {
				onyx.Popup.count++;
				this.applyZIndex();
			}
			else {
				if(onyx.Popup.count > 0) {
					onyx.Popup.count--;
				}
			}
			this.showHideScrim(this.showing);
			this.inherited(arguments);
		},

		/**
		* Toggles the display of the scrim
		*
		* @param  {Boolean} show - Show the scrim
		* @private
		*/
		showHideScrim: function (show) {
			if (this.floating && (this.scrim || (this.modal && this.scrimWhenModal))) {
				var scrim = this.getScrim();
				if (show) {
					// move scrim to just under the popup to obscure rest of screen
					var i = this.getScrimZIndex();
					this._scrimZ = i;
					scrim.showAtZIndex(i);
				} else {
					scrim.hideAtZIndex(this._scrimZ);
				}
				enyo.call(scrim, 'addRemoveClass', [this.scrimClassName, scrim.showing]);
			}
		},

		/**
		* Calculates the z-index for the scrim so it's directly below the popup
		*
		* @private
		*/
		getScrimZIndex: function () {
			return onyx.Popup.highestZ >= this._zIndex ? this._zIndex - 1 : onyx.Popup.highestZ;
		},

		/**
		* Show a transparent scrim for modal popups if {@link onyx.Popup#scrimWhenModal} is `true`
		* if {@link onyx.Popup#scrim} is `true`, then show a regular scrim.
		*
		* @return {onyx.Scrim}
		* @private
		*/
		getScrim: function () {
			//
			if (this.modal && this.scrimWhenModal && !this.scrim) {
				return onyx.scrimTransparent.make();
			}
			return onyx.scrim.make();
		},

		/**
		* Adjust the zIndex so that popups will properly stack on each other.
		*
		* @private
		*/
		applyZIndex: function () {
			this._zIndex = (onyx.Popup.count * 2) + this.findZIndex() + 1;
			if (this._zIndex <= onyx.Popup.highestZ) {
				this._zIndex = onyx.Popup.highestZ + 1;
			}
			if (this._zIndex > onyx.Popup.highestZ) {
				onyx.Popup.highestZ = this._zIndex;
			}
			// leave room for scrim
			this.applyStyle('z-index', this._zIndex);
		},

		/**
		* Find the z-index for this popup, clamped by {@link onyx.Popup#defaultZ}
		*
		* @return {Number} z-index value
		* @private
		*/
		findZIndex: function () {
			// a default z value
			var z = this.defaultZ;
			if (this._zIndex) {
				z = this._zIndex;
			} else if (this.hasNode()) {
				// Re-use existing zIndex if it has one
				z = Number(enyo.dom.getComputedStyleValue(this.node, 'z-index')) || z;
			}
			if (z < this.defaultZ) {
				z = this.defaultZ;
			}
			this._zIndex = z;
			return this._zIndex;
		}
	});

})(enyo, this);