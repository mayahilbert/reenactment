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

gsap
  .timeline({
    scrollTrigger: {
      trigger: ".grid-container",
      start: "top top",
      end: () => innerHeight * 2.5,
      // end: () => `+=${inner.offsetWidth}`;
      scrub: true,
      pin: ".container-drag",
      anticipatePin: 1,
    },
  })
  .set(".gridBlock:not(.centerBlock)", { filter: "blur(5px)", opacity: 0 })
  .to(".centerPiece .gridBlock", { duration: 0.02, autoAlpha: 0 }, 0)
  .to(
    ".gridBlock:not(.centerBlock)",
    { duration: 0.03, filter: "blur(0px)", opacity: 1 },
    0
  )

  .from(".gridLayer", { duration: 0.05, scale: 3, ease: "ease" }, 0);

// Images to make it look better, not related to the effect
// const size = Math.max(innerWidth, innerHeight);
// gsap.set(".gridBlock", {
//   backgroundImage: (i) =>
//     `url(https://picsum.photos/${size}/${size}?random=${i})`,
// });

// const bigImg = new Image();
// bigImg.addEventListener("load", function () {
// gsap.to(".centerPiece .gridBlock", { autoAlpha: 1, duration: 0.5 });
// });

// bigImg.src = `https://picsum.photos/${size}/${size}?random=50`;
const scrollIndicator = document.getElementById("scrollIndicator");

$(window).bind("scroll", function () {
  if ($(window).scrollTop() > 100) {
    scrollIndicator.style.opacity = "0";
  } else {
    scrollIndicator.style.opacity = "1";
  }
});
