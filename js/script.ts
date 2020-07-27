class CheckoutAnimation {
  elm: button;
  tl: object;
  truck: span;
  parcel: span;
  coverLeft: span;
  coverRight: span;
  checkout: span;
  thankYou: span;
  originalHeight: number;

  constructor(elm) {
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

  morphButton(): void {
    const TIME: number = 0.3;

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
  }

  truckEntrance(): void {
    const width: number = (this.elm.clientWidth / 2) + this.truck.clientWidth;

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
  }

  parcelEntrance(): void {
    const TIME: number = 0.65;
    const OPEN_ANGLE: number = 210;

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
  }

  parcelClose(): void {
    const TIME: number = 0.25;
    const DELAY: number = 0.2;

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
  }

  parcelPutIn(): void {
    const TIME: number = 0.2;
    const parcelWidth: number = this.parcel.clientWidth / 2;
    const truckWidth: number = this.truck.clientWidth / 2;

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
  }

  truckExit(): void {
    const width: number = (this.elm.clientWidth / 2) + this.truck.clientWidth;

    this.tl.to(this.truck, {
      translateX: width + "px",
      skewX: "-45deg",
      duration: 0.5,
      ease: "back.in"
    });
  }

  returnButton(): void {
    const TIME: number = 0.3;

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
  }

  reset(resetTime: number): void {
    const TIME: number = 0.3;

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
  }

  start(resetTime: number): void {
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
  }
}

const checkout: CheckoutAnimation = new CheckoutAnimation("#btn_checkout");

checkout.elm.addEventListener("click", () => {
  checkout.start(3);
});
