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
// Grab the prefers reduced media query.
const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
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

  .to(".gridLayer", { duration: 0.05, scale: 1, ease: "ease" }, 0);

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

    let targetElem = document.querySelector(target),
      y = targetElem,
      gridContainer = document.querySelector(".grid"),
      currentSectionIndex = sections.findIndex(
        (x) => x.id === $(el).data("scroll-target").replace("#", "")
      ),
      sectionCount = 0;

    gsap.defaults({ overwrite: "auto" });

    gsap.to($(".centerPiece"), { autoAlpha: 0, duration: 0 });

    $(".main-container").fadeOut();

    gsap.set("body", { height: sections.length * 100 + "%" });

    // create a ScrollTrigger for each section
    var sectionScrollsCreated = new Promise((resolve, reject) => {
      sections.forEach((section, i) => {
        let overlaySection = ScrollTrigger.create({
          id: "overlay-section-" + i,
          // use dynamic scroll positions based on the window height (offset by half to make it feel natural)
          start: () => (i - 0.5) * innerHeight,
          end: () => (i + 0.5) * innerHeight,
          // when a new section activates (from either direction), set the section accordingly.
          onToggle: (self) => self.isActive && setSection(section),
        });
        overlaySections.push(overlaySection);
        console.log("overlaySections: ");
        console.log(overlaySections);
        if (i > 0 && i < sections.length - 1) {
          let overlaySnap = ScrollTrigger.create({
            id: "overlay-snap-" + i,
            start: () => (i - 0.5) * innerHeight,
            end: () => (i + 0.5) * innerHeight,
            snap: {
              snapTo: 0.98,
              duration: { min: 0, max: 0.01 },
              delay: 0,
              snapDirectional: (1, 1),
              ease: "power1.inOut",
            },
          });
          overlaySnaps.push(overlaySnap);
        }

        if (i === sections.length - 1) resolve();
      });
    });

    sectionScrollsCreated.then(() => {
      console.log("All done!");
      setTimeout(function () {
        setSection(sections[currentSectionIndex]);
        if (currentSectionIndex === 0) {
          gsap.to(window, {
            duration: 0,
            scrollTo: "10",
            overwrite: true,
          });
        } else {
          gsap.to(window, {
            duration: 0,
            scrollTo: currentSectionIndex * window.innerHeight,
            overwrite: true,
          });
        }

        console.log(
          "currentSectionIndex: " +
            currentSectionIndex +
            " currentSection: " +
            currentSection +
            " scrollTo " +
            currentSectionIndex * window.innerHeight
        );
        setTimeout(function () {
          $("#overlay-project").fadeIn();
        }, 400);
      }, 300);
    });

    function setSection(newSection) {
      console.log(
        "setting section: " + currentSection.id + " to " + newSection.id
      );
      // if (newSection !== currentSection) {
      if (!mediaQuery || mediaQuery.matches) {
        gsap.to(currentSection, { autoAlpha: 0, duration: 0 });
        gsap.to(newSection, { autoAlpha: 1, duration: 0.5 });
        gsap.to(newSection, { scale: 1, duration: 0 });
      } else {
        gsap.to(currentSection, { autoAlpha: 0, duration: 1 });
        gsap.to(currentSection, { scale: 1.7, duration: 1 });
        gsap.to(currentSection, { scale: 1, delay: 1 });
        gsap.from(newSection, { scale: 0.6, duration: 1.3 });
        gsap.to(newSection, { autoAlpha: 1, duration: 1.3 });
      }

      mediaQuery.addEventListener("change", () => {
        if (mediaQuery.matches) {
          gsap.to(currentSection, { autoAlpha: 0, duration: 0 });
          gsap.to(newSection, { autoAlpha: 1, duration: 0.5 });
          gsap.to(newSection, { scale: 1, duration: 0 });
        } else {
          gsap.to(currentSection, { autoAlpha: 0, duration: 1 });
          gsap.to(currentSection, { scale: 1.7, duration: 1 });
          gsap.to(currentSection, { scale: 1, delay: 1 });
          gsap.from(newSection, { scale: 0.6, duration: 1.3 });
          gsap.to(newSection, { autoAlpha: 1, duration: 1.3 });
        }
      });

      currentSection = newSection;
      vidContainers.forEach((el) => {
        pauseVideo(el);
      });
      // }
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
  gsap.to($(".centerPiece"), { autoAlpha: 1, duration: 0 });

  $(".main-container").fadeIn();

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
$("nav").on("click", function (event) {
  event.stopPropagation();
});
