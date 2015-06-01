require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Grabber~Grabber} kind.
* @module onyx/Grabber
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Grabber~Grabber} is a control styled to indicate that an object may be grabbed
* and moved. It should only be used in this limited context--to indicate that
* dragging an object will result in movement.
*
* ```
* var
* 	Button = require('onyx/Button'),
* 	Grabber = require('onyx/Grabber'),
* 	Toolbar = require('onyx/Toolbar');
*
* {kind: Toolbar, components: [
* 	{kind: Grabber, ondragstart: 'grabberDragstart',
* 		ondrag: 'grabberDrag', ondragfinish: 'grabberDragFinish'},
* 	{kind: Button, content: 'More stuff'}
* ]}
* ```
*
* When using a Grabber inside a [Fittable]{@link module:layout/FittableLayout~FittableLayout} control,
* be sure to set `'noStretch: true'` on the Fittable, or else give it an explicit
* height. Otherwise, the Grabber may not be visible.
*
* @class Grabber
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Grabber~Grabber.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Grabber',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-grabber'
});
