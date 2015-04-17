# Contributions

Contributions are welcome for Enyo and its associated libraries including onyx and layout.

Please see [Contributing to Enyo](http://enyojs.com/community/contribute/) for details
on our contribution policy and guidelines for use of the Enyo-DCO-1.0-Signed-off-by
line in your commits and pull requests.

If you're interested in introducing new kinds, you might also consider hosting your own repo
and contributing to the [Enyo community gallery](http://enyojs.com/gallery).

## New Controls

Any new controls contributed should follow this basic pattern to ensure proper themability support.

If the control has multiple files (.js, .less, or both):
* Create a directory matching the control's name within `onyx/lib`. Within that directory:
  * Place the control's .js file(s),
  * Place the control's .less file(s),
  	Use existing variables from[`lib/onyx/css/onyx-variables.less`](https://github.com/enyojs/onyx/blob/master/css/onyx-variables.less)
  	in your control's LESS files when available, add any new variables your particular control needs
  	along with their default definitions to onyx-variables.less.
  * Create the package.json file with the necessary references to both the .js and .less file(s)

If the control is implemented in a single .js file:
* Place the control's .js file in `onyx/lib`

Refer to the [UI Theming Guide](https://github.com/enyojs/enyo/wiki/UI-Theming) for more details.

## Samples

Every new control should be accompanied by at least one sample, pluggable into the library's
internal sampler located in `samples/src/index.js`.

Guidelines for samples:

* Should live in `onyx/samples/src`,
* Should exercise useful API's and events of the control in the sample,
* Should include more than one instance in the sample when one or more significantly different or
  interesting configurations of the control are available,
* Should be updated ensure the original bug and resolution are testable when resolving a bug
