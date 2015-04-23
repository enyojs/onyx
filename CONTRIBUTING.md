# Contributions

The Enyo team welcomes contributions to Enyo core and its associated libraries.

Please see [Contributing to Enyo](http://enyojs.com/community/contribute/) for
details on our contribution policy and guidelines covering the use of the
`Enyo-DCO-1.0-Signed-off-by` line in your commits and pull requests.

If you're interested in introducing new kinds, you might also consider hosting
your own repo and contributing to the [Enyo Community
Gallery](http://enyojs.com/gallery).

## New Controls

When contributing new controls, please adhere to the following guidelines to
ensure compatibility with the Enyo framework's theming support:

If the control is implemented in a single `.js` file, place that `.js` file in `onyx/lib`.

If the control has multiple files (`.js`, `.less`, or both):

* Create a directory matching the control's name within `onyx/lib` (e.g., `onyx/lib/MyNewControl`).

* Place the control's `.js` file(s) and `.less` file(s) in the new directory.

* When possible, use existing variables from
    [`lib/onyx/css/onyx-variables.less`](https://github.com/enyojs/onyx/blob/master/css/onyx-variables.less)
    in your control's LESS files.  If your control needs new variables, add them
    (along with their default definitions) to `onyx-variables.less`.

* Create a `package.json` file with the necessary references to the `.js` and
    `.less` file(s).

For more details, please refer to the [UI Theming Guide](https://github.com/enyojs/enyo/wiki/UI-Theming).

## Samples

Each new control should be accompanied by at least one sample, to be plugged
into the library's internal sampler located at `samples/src/index.js`.

The following are some basic guidelines regarding samples:

* Place samples in `onyx/samples/src`.

* In your sample, be sure to exercise useful APIs and events from the new
    control.

* When multiple interesting or significantly different configurations of the
    control are available, include multiple instances of the control in the
    sample.

* When resolving a bug, update the sample to ensure that the original bug and
    its resolution are testable.
