import { style, animate, animation, keyframes } from "@angular/animations";

export const fadeIn = animation([
  style({ opacity: 0 }), // start state
  animate("300ms", style({ opacity: 1 }))
]);

export const fadeOut = animation([animate("300ms", style({ opacity: 0 }))]);

export const slideUp = animation([
  /*  style({ 'margin-bottom': '-1500px' }), */ // start state
  style({ transform: "translate3d(0, 100%, 0)" }),
  animate("0.4s cubic-bezier(0.36,0.66,0.04,1)", style({ transform: "translate3d(0,0,0)" }))
]);

export const slideDown = animation([animate("0.2s cubic-bezier(.35,0,.76,.82)", style({ transform: "translate3d(0, 100%, 0)" }))]);

export const popIn = animation([
  style({ transform: "scale3d(.8, .8, .8)", opacity: 0 }), // start state
  animate("0.4s cubic-bezier(0.61, -0.26, 0, 1.68)", style({ transform: "scale3d(1, 1, 1)", opacity: 1 }))
]);

export const popOut = animation([
  style({ transform: "scale3d(1, 1, 1)", opacity: 1 }),
  animate("0.4s cubic-bezier(0.61, -0.26, 0, 1.68)", style({ transform: "scale3d(.8, .8, .8)", opacity: 0 }))
]);
