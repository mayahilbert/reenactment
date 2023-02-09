// const sections = gsap.utils.toArray(".work");

// sections.forEach((section, index) => {
//   const work = section.querySelector(".work *");

//   const tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: section,
//       pin: true,
//       anticipatePin: 1,
//       scrub: 1,
//       start: "top top",
//       end: "+=500",
//     },
//   });
//   if (index > 0) {
//     tl.to(work, {
//       opacity: 0,
//       ease: "ease",
//       duration: 7,
//     });
//   }
//   if (index < sections.length - 1) {
//     tl.from(work, {
//       opacity: 0,
//       ease: "ease",
//       duration: 15,
//     });
//   }
// });
// gsap.utils.toArray(".work").forEach((step) => {
//   ScrollTrigger.create({
//     trigger: step,
//     start: "top 80%",
//     end: "center top",
//     toggleClass: "active",
//   });
// });
let sections = gsap.utils.toArray("section"),
  currentSection = sections[0];

gsap.defaults({ overwrite: "auto" });

// stretch out the body height according to however many sections there are.
gsap.set("body", { height: sections.length * 65 + "%" });

// create a ScrollTrigger for each section
sections.forEach((section, i) => {
  ScrollTrigger.create({
    // use dynamic scroll positions based on the window height (offset by half to make it feel natural)
    start: () => ((i - 0.5) * innerHeight) / 2,
    end: () => ((i + 0.5) * innerHeight) / 2,
    // when a new section activates (from either direction), set the section accordinglyl.
    onToggle: (self) => self.isActive && setSection(section),
    // scrub: 1,
    // snap: {
    //   snapTo: 1,
    // },
  });
  if (i > 0) {
    ScrollTrigger.create({
      start: () => ((i - 0.5) * innerHeight) / 2,
      end: () => ((i + 0.5) * innerHeight) / 2,
      snap: {
        snapTo: 1,
        duration: { min: 0, max: 0.1 },
        delay: 1,
        snapDirectional: (1, 1),
        ease: "power1.inOut",
      },
    });
  }
});

function setSection(newSection) {
  if (newSection !== currentSection) {
    gsap.to(currentSection, { scale: 1.7, duration: 0.7 });
    gsap.to(currentSection, { autoAlpha: 0, duration: 0.7 });
    gsap.from(newSection, { scale: 0.6, duration: 0.7 });
    gsap.to(newSection, { autoAlpha: 1, duration: 0.7 });
    gsap.to(currentSection, { scale: 1, delay: 0.9 });
    // gsap.to(currentSection, { scale: 2, autoAlpha: 0 });
    // gsap.from(newSection, { scale: 0.6 });
    // gsap.to(newSection, { autoAlpha: 1 });
    // gsap.to(currentSection, { scale: 1 });
    currentSection = newSection;
  }
}

// handles the infinite part, wrapping around at either end....
ScrollTrigger.create({
  start: 1,
  end: () => ScrollTrigger.maxScroll(window) - 1,
  onLeaveBack: (self) => self.scroll(ScrollTrigger.maxScroll(window) - 2),
  onLeave: (self) => self.scroll(2),
}).scroll(2);
