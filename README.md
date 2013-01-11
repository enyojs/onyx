### Looking for the issue tracker?  
It's moved to [https://enyojs.atlassian.net](https://enyojs.atlassian.net).

---

## Onyx UI Library

Onyx is a UI library for Enyo 2.

We originally set out to adapt the Enyo 1 widgets for use with Enyo 2, but we quickly determined that we could achieve better cross-platform compatibility and build a more solid foundation for the future by starting with a clean slate. The result is a new UI library for Enyo 2 called **Onyx**.

Despite the changes under the hood, you'll find that Onyx is clearly an evolution of the Enyo 1 UI from a design point of view. This first Onyx release features a variety of commonly used widgets, including toolbars, text inputs, checkboxes, groups and multiple types of buttons. Onyx also includes a base `Slideable` control that you can use to implement views that slide back and forth between pre-defined positions, including on and off screen.

To get a feel for Onyx, check out the [OnyxSampler example](http://enyojs.com/samples/onyxsampler). Needless to say, we're not done -- we'll be expanding the Onyx widget set as we go.

## Changes

Any time  you commit  a change  to a  `.less` file,  you also  need to
re-generate the top-level library `.css` file as follows:

	cd lib/onyx/css
	../../enyo/tools/lessc.sh ./package.js 

This command will generate a new `onyx.css`, which you should check in
with your `.less` changes.

Please don't manually  edit the top-level `onyx.css`:  those should be
treated  as output  files, and  we should  only be  making changes  to
`.less` files and generating the `.css` file using the above command.
