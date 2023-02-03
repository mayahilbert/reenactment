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
var overlayTrigger = 0;
var gridCircles = document.querySelectorAll(".gridLink");
gridCircles.forEach((el) =>
  el.addEventListener("click", (event) => {
    event.preventDefault(); // stop default link navigation
    var target = $(el).data("scroll-target");
    $("html, body").addClass("overlay-on");
    $("html,body").animate(
      {
        scrollTop: 500,
      },
      "500"
    );
    $("#overlay-project").fadeIn();
    // $("#overlay-project").css("visibility", "visible");
    document.location.href = $(el).data("scroll-target");

    // const sections = gsap.utils.toArray(".work");
    // // sections.reverse();
    // sections.forEach((section, index) => {
    //   const work = section.querySelector(".work-inner");
    //   (notFirst = document.querySelector(".work:not(:first-child) *")),
    //     (notLast = document.querySelector(".work:not(:last-child) *"));
    //   if (overlayTrigger < 1) {
    //     gsap.utils.toArray(".step").forEach((step) => {
    //       ScrollTrigger.create({
    //         trigger: step,
    //         start: "top top",
    //         end: "center top",
    //         toggleClass: "active",
    //       });
    //     });

    //     // var tl = gsap.timeline({

    //     //   scrollTrigger: {
    //     //     trigger: section,
    //     //     pin: true,
    //     //     anticipatePin: 1,
    //     //     scrub: 1,
    //     //     start: "top top",
    //     //   },
    //     // });
    //     // if (index > 0) {
    //     // tl.from(work, {
    //     //   scale: 2,
    //     //   ease: "ease",
    //     //   duration: 10,
    //     // });
    //     // }
    //     // if (index < sections.length - 1) {
    //     //   tl.to(work, {
    //     //     scale: 2,
    //     //     ease: "ease",
    //     //     duration: 15,
    //     //   });
    //     // }

    //     // console.log("tl " + tl);
    //   }
    // });
    overlayTrigger = 1;
    event.stopPropagation();
  })
);

$(document).on("click", function () {
  vidContainers.forEach((el) => {
    pauseVideo(el);
  });

  $("#overlay-project").fadeOut();
  // $("#overlay-project").css("visibility", "hidden");

  $("html, body").animate(
    {
      scrollTop: $(document).height(),
    },
    "fast"
  );
  $("html, body").removeClass("overlay-on");
  $("#overlay-project").scrollTop(0);
  document.location.href = "#";
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
