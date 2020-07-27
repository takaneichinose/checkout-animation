var CheckoutAnimation = /** @class */ (function () {
    function CheckoutAnimation(elm) {
        this.elm = document.querySelector(elm);
        this.tl = gsap.timeline();
        this.truck = this.elm.querySelector('.truck');
        this.parcel = this.elm.querySelector('.parcel');
        this.coverLeft = this.parcel.querySelector("span:first-child");
        this.coverRight = this.parcel.querySelector("span:last-child");
        this.checkout = this.elm.querySelector('.checkout');
        this.thankYou = this.elm.querySelector('.thank-you');
        this.originalHeight = this.truck.clientHeight;
    }
    CheckoutAnimation.prototype.morphButton = function () {
        var TIME = 0.3;
        this.tl.fromTo(this.elm, {
            height: this.originalHeight
        }, {
            height: this.elm.clientWidth,
            duration: TIME,
            ease: "elastic.out(1, 0.3)"
        });
        this.tl.fromTo(this.thankYou, {
            opacity: 0,
            translateY: "100px",
            duration: 0
        }, {
            opacity: 0,
            translateY: "100px"
        });
        this.tl.fromTo(this.checkout, {
            opacity: 1
        }, {
            opacity: 0,
            duration: TIME,
            ease: "power2.out"
        }, "-=" + TIME);
    };
    CheckoutAnimation.prototype.truckEntrance = function () {
        var width = (this.elm.clientWidth / 2) + this.truck.clientWidth;
        this.tl.fromTo(this.truck, {
            opacity: 1,
            translateX: (-width) + "px",
            skewX: "45deg"
        }, {
            translateX: "0px",
            skewX: "0deg",
            duration: 0.5,
            ease: "back.out"
        });
    };
    CheckoutAnimation.prototype.parcelEntrance = function () {
        var TIME = 0.65;
        var OPEN_ANGLE = 210;
        this.tl.fromTo(this.parcel, {
            opacity: 0,
            translateY: -(this.parcel.clientHeight * 3)
        }, {
            opacity: 1,
            translateY: 0,
            duration: TIME,
            ease: "bounce.out"
        });
        this.tl.fromTo(this.coverLeft, {
            rotate: "0deg"
        }, {
            rotate: -(OPEN_ANGLE) + "deg",
            ease: "bounce.out",
            duration: TIME
        }, "-=" + (TIME / 2));
        this.tl.fromTo(this.coverRight, {
            rotate: "0deg"
        }, {
            rotate: OPEN_ANGLE + "deg",
            ease: "bounce.out",
            duration: TIME
        }, "-=" + (TIME - 0.1));
    };
    CheckoutAnimation.prototype.parcelClose = function () {
        var TIME = 0.25;
        var DELAY = 0.2;
        this.tl.to(this.coverLeft, {
            rotate: "0deg",
            ease: "bounce.out",
            duration: TIME,
            delay: DELAY
        });
        this.tl.to(this.coverRight, {
            rotate: "0deg",
            ease: "bounce.out",
            duration: TIME
        }, "-=" + (TIME / 2));
    };
    CheckoutAnimation.prototype.parcelPutIn = function () {
        var TIME = 0.2;
        var parcelWidth = this.parcel.clientWidth / 2;
        var truckWidth = this.truck.clientWidth / 2;
        this.tl.fromTo(this.parcel, {
            bottom: "calc(50% - " + (this.truck.clientHeight / 2) + "px)"
        }, {
            bottom: "calc(50% - " + (this.parcel.clientHeight / 2) + "px)",
            ease: "power2.out",
            duration: TIME,
            delay: 0.2
        });
        this.tl.fromTo(this.parcel, {
            left: "calc(50% - " + parcelWidth + "px)"
        }, {
            left: "calc(50% + " + parcelWidth + "px)",
            ease: "power2.out",
            duration: TIME
        });
        this.tl.to(this.parcel, {
            left: "calc(50% - " + (truckWidth + (parcelWidth * 4)) + "px)",
            ease: "power2.out",
            duration: TIME
        });
        this.tl.fromTo(this.parcel, {
            scale: 1
        }, {
            left: "calc(50% - " + (truckWidth + parcelWidth) + "px)",
            scale: 0,
            ease: "power2.out",
            duration: TIME
        });
    };
    CheckoutAnimation.prototype.truckExit = function () {
        var width = (this.elm.clientWidth / 2) + this.truck.clientWidth;
        this.tl.to(this.truck, {
            translateX: width + "px",
            skewX: "-45deg",
            duration: 0.5,
            ease: "back.in"
        });
    };
    CheckoutAnimation.prototype.returnButton = function () {
        var TIME = 0.3;
        this.tl.to(this.elm, {
            height: this.originalHeight,
            duration: TIME,
            ease: "elastic.out(1, 0.3)",
            delay: 0.5
        });
        this.tl.to(this.thankYou, {
            translateY: "0px",
            ease: "elastic.out(1, 0.3)",
            duration: TIME,
            delay: 0.3
        }, "-=" + TIME);
        this.tl.to(this.thankYou, {
            opacity: 1,
            ease: "power2.out",
            duration: TIME
        }, "-=" + TIME);
    };
    CheckoutAnimation.prototype.reset = function (resetTime) {
        var TIME = 0.3;
        this.tl.to(this.checkout, {
            opacity: 1,
            duration: TIME,
            ease: "power2.out",
            delay: resetTime
        });
        this.tl.to(this.thankYou, {
            opacity: 0,
            duration: TIME,
            ease: "power2.out"
        }, "-=" + TIME);
        this.tl.to(this.thankYou, {
            translateY: "100px",
            duration: 0
        });
    };
    CheckoutAnimation.prototype.start = function (resetTime) {
        if (this.tl.isActive() === false) {
            this.morphButton();
            this.truckEntrance();
            this.parcelEntrance();
            this.parcelClose();
            this.parcelPutIn();
            this.truckExit();
            this.returnButton();
            this.reset(resetTime);
        }
    };
    return CheckoutAnimation;
}());
var checkout = new CheckoutAnimation("#btn_checkout");
checkout.elm.addEventListener("click", function () {
    checkout.start(3);
});
