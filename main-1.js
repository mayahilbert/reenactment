const sections = gsap.utils.toArray(".work");

sections.forEach((section, index) => {
  const work = section.querySelector(".work *");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      anticipatePin: 1,
      scrub: 1,
      start: "top top",
      end: "+=500",
    },
  });
  if (index > 0) {
    tl.from(work, {
      opacity: 0,
      ease: "ease",
      duration: 7,
    });
  }
  if (index < sections.length - 1) {
    tl.to(work, {
      opacity: 0,
      ease: "ease",
      duration: 15,
    });
  }
});
