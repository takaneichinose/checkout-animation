# Checkout Animation Microinteraction for E-Commerce
This is a microinteraction when clicked on a button, the animation of a delivery truck will be shown, and it will appear to be delivering a product/s that was put inside the parcel box.

To make an illusion of speeding up entrance of the truck, I used CSS skewX property. -45deg for the entrance, and 45 for exit.

I used GSAP timeline to make the sequence of animation.

I created a simple SVG asset for the image of a truck, using Inkscape application on Linux.

The box is created with HTML element, adding CSS to make an appearance of a box.

the shadow at the truck, and parcel was done using CSS filter: drop-shadow. Its usage is almost as the same as using CSS box-shadow.

This animation may be used in e-commerce website, implementing online store.

I created the code using Typescript.

You may look how it works by clicking the link below.

[Checkout Animation Microinteraction for E-Commerce](https://codepen.io/takaneichinose/full/XWXOGeq)

### Testing on local

To test this animation on local computer, NodeJS is required to be installed in your device.

If you have NodeJS on your device, just run the command below at the same directory as the project

``` npm install gsap ```
