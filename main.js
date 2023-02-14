const vidContainers = document.querySelectorAll(".vid-container");
vidContainers.forEach((el) =>
  el.addEventListener("click", (event) => {
    playVideo(el);
  })
);

function playVideo(thisVid) {
  var thisVideo = thisVid;

  var playButton = thisVideo.querySelectorAll(".playbutton")[0];
  var player = thisVideo.querySelectorAll("iframe")[0];
  var vimeoplayer = new Vimeo.Player(player);

  $(playButton).addClass("hide");
  $(thisVideo).addClass("show");
  vimeoplayer.play();
}
function pauseVideo(thisVid) {
  var thisVideo = thisVid;

  var playButton = thisVideo.querySelectorAll(".playbutton")[0];
  var player = thisVideo.querySelectorAll("iframe")[0];
  var vimeoplayer = new Vimeo.Player(player);

  $(playButton).removeClass("hide");
  $(thisVideo).removeClass("show");
  vimeoplayer.pause();
}
var overlayTrigger;
var overlayContainer = $("#overlay-project");
let overlaySnaps = [];
let overlaySections = [],
  overlayLoop,
  sections = gsap.utils.toArray(".work"),
  currentSection = sections[0];
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".grid-container",
      start: "top top",
      end: () => innerHeight * 2.5,
      // end: () => `+=${inner.offsetWidth}`;
      scrub: 1,
      pin: ".container-drag",
      anticipatePin: 1,
    },
  })
  .set(".gridBlock:not(.centerBlock)", { filter: "blur(5px)", autoAlpha: 0 })
  .to(".centerPiece .gridBlock", { duration: 0.02, autoAlpha: 0 }, 0)
  .to(
    ".gridBlock:not(.centerBlock)",
    { duration: 0.03, filter: "blur(0px)", autoAlpha: 1 },
    0
  )

  .from(".gridLayer", { duration: 0.05, scale: 3, ease: "ease" }, 0);

const scrollIndicator = document.getElementById("scrollIndicator");

$(window).bind("scroll", function () {
  if ($(window).scrollTop() > 100) {
    scrollIndicator.style.opacity = "0";
  } else {
    scrollIndicator.style.opacity = "1";
  }
});

var gridCircles = document.querySelectorAll(".gridLink");
gridCircles.forEach((el, i) =>
  el.addEventListener("click", (event) => {
    event.preventDefault(); // stop default link navigation
    var target = $(el).data("scroll-target");

    // $("#overlay-project").css("visibility", "visible");
    let targetElem = document.querySelector(target),
      y = targetElem,
      gridContainer = document.querySelector(".grid"),
      currentSectionIndex = sections.findIndex(
        (x) => x.id === $(el).data("scroll-target").replace("#", "")
      ),
      sectionCount = 0;

    gsap.defaults({ overwrite: "auto" });
    // gsap.set(".main-container", { height: "0px" });
    $("html,body").animate(
      {
        scrollTop: 500,
      },
      "500"
    );

    gsap.set("body", { height: sections.length * 100 + "%" });

    // document.location.href = $(el).data("scroll-target");

    // create a ScrollTrigger for each section
    // sections.forEach((section, i) => {
    var sectionScrollsCreated = new Promise((resolve, reject) => {
      sections.forEach((section, i) => {
        // function createSectionScrolls() {
        //   for (const section of sections) {
        let overlaySection = ScrollTrigger.create({
          id: "overlay-section-" + i,
          // use dynamic scroll positions based on the window height (offset by half to make it feel natural)
          pinned: true,
          start: () => (i - 0.5) * innerHeight,
          end: () => (i + 0.5) * innerHeight,
          // markers: true,
          // when a new section activates (from either direction), set the section accordingly.
          onToggle: (self) => self.isActive && setSection(section),
        });
        overlaySections.push(overlaySection);
        console.log("overlaySections: ");
        console.log(overlaySections);
        // if (i > 0) {
        //   let overlaySnap = ScrollTrigger.create({
        //     id: "overlay-snap-" + i,
        //     start: () => (i - 0.5) * innerHeight,
        //     end: () => (i + 0.5) * innerHeight,
        //     snap: {
        //       snapTo: 0.5,
        //       duration: { min: 0, max: 0.1 },
        //       delay: 1,
        //       snapDirectional: (1, 1),
        //       ease: "power1.inOut",
        //     },
        //   });
        //   overlaySnaps.push(overlaySnap);
        // }
        if (i === sections.length - 1) resolve();
      });
    });

    sectionScrollsCreated.then(() => {
      console.log("All done!");
      setTimeout(function () {
        //your code to be executed after 1 second
        gsap.to(window, {
          duration: 0,
          scrollTo: currentSectionIndex * window.innerHeight,
          overwrite: true,
        });
        setSection(sections[currentSectionIndex]);

        console.log(
          "currentSectionIndex: " +
            currentSectionIndex +
            " currentSection: " +
            currentSection +
            " scrollTo " +
            currentSectionIndex * window.innerHeight
        );
        $("html, body").addClass("overlay-on");

        $("#overlay-project").fadeIn();
      }, 500);
    });

    function setSection(newSection) {
      if (newSection !== currentSection) {
        gsap.to(currentSection, { autoAlpha: 0, duration: 0.7 });
        gsap.to(currentSection, { scale: 1.7, duration: 0.7 });
        gsap.to(currentSection, { scale: 1, delay: 0.9 });
        gsap.from(newSection, { scale: 0.6, duration: 0.7 });
        gsap.to(newSection, { autoAlpha: 1, duration: 0.7 });
        console.log(
          "setting section: " + currentSection.id + " to " + newSection.id
        );
        currentSection = newSection;
      }
    }
    // handles the infinite part, wrapping around at either end....
    overlayLoop = ScrollTrigger.create({
      id: "overlay-loop",
      start: 1,
      end: () => ScrollTrigger.maxScroll(window) - 1,
      onLeaveBack: (self) => self.scroll(ScrollTrigger.maxScroll(window) - 2),
      onLeave: (self) => self.scroll(2),
    }).scroll(2);

    overlayTrigger = 1;

    event.stopPropagation();
  })
);

$(document).on("click", function () {
  if (overlayTrigger === 1) {
    overlaySections.forEach((overlaySection) => overlaySection.kill());
    overlaySnaps.forEach((overlaySnap) => overlaySnap.kill());
    overlaySections = [];
    overlaySnaps = [];
    ScrollTrigger.getById("overlay-loop").kill();
  }
  vidContainers.forEach((el) => {
    pauseVideo(el);
  });

  $("#overlay-project").fadeOut();
  gsap.to(currentSection, { autoAlpha: 0 });
  gsap.to(currentSection, { scale: 0.6 });
  // $("#overlay-project").css("visibility", "hidden");
  $("body").css("height", "100%");

  $("html, body").removeClass("overlay-on");
  $("html, body").animate(
    {
      scrollTop: $(document).height(),
    },
    "fast"
  );
  $("#overlay-project").scrollTop(0);
  document.location.href = "#";
  overlayTrigger = 0;
});

$(".work > *").on("click", function (event) {
  event.stopPropagation();
});

// gsap
//   .timeline({
//     scrollTrigger: {
//       trigger: ".work-overlay-container",
//       start: "top top",
//       end: () => innerHeight * 2.5,
//       // end: () => `+=${inner.offsetWidth}`;
//       scrub: true,
//       pin: ".overlay",
//       anticipatePin: 1,
//     },
//   })
//   .set(".gridBlock:not(.centerBlock)", { filter: "blur(5px)", opacity: 0 })
//   .to(".centerPiece .gridBlock", { duration: 0.02, autoAlpha: 0 }, 0)
//   .to(
//     ".gridBlock:not(.centerBlock)",
//     { duration: 0.03, filter: "blur(0px)", opacity: 1 },
//     0
//   )

// =============================================
// var imgs = gsap.utils.toArray(".work"),
//   wrap = gsap.utils.wrap(imgs),
//   count = imgs.length,
//   tl = gsap.timeline({
//     scrollTrigger: {
//       start: 0,
//       end: "+=8000",
//       pin: ".work-overlay-wrapper",
//       scrub: 0.5,
//     },
//   }),
//   i;

// imgs.reverse();

// for (i = 0; i < count; i++) {
//   tl.to(wrap(i), {
//     duration: 1,
//     autoAlpha: 0,
//     scale: 1,
//   });
// }
