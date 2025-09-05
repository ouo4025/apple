gsap.registerPlugin(ScrollTrigger);

// 새로고침 시 스크롤 맨 위로 이동
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};


// Lenis 부드러운 스크롤 효과
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smooth: true,
  smoothTouch: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length ? lenis.scrollTo(value) : window.scrollY;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  pinType: document.body.style.transform ? "transform" : "fixed"
});

lenis.on("scroll", ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: document.body });

// Lenis 효과 끝

// 타임라인 생성 
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".main-visual",
    start: "top top",
    end: "+=12000",
    scrub: true,
    pin: true,
    markers: false
  }
});

// tit1 색 채워짐 
tl.to(".visual-tit1", { backgroundPositionX: "0%", duration: 3, ease: "none" })
  .to(".visual-tit1", { opacity: 0, duration: 1 });

// tit2  애니메이션
if (window.innerWidth > 1024) {
  tl.fromTo(".visual-tit2", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" })
    .from(".visual-txt1", { opacity: 0, y: 50, duration: 1, ease: "power2.out" })
    .from(".visual-txt2", { opacity: 0, y: 50, duration: 1, ease: "power2.out" })
    .to(".visual-txt1", { x: "-80%", opacity: 1, duration: 1 }, "<")
    .from(".visual-txt3", { opacity: 0, y: 50, duration: 1, ease: "power2.out" })
    .to(".visual-txt2", { x: "-44%", opacity: 1, duration: 1 }, "<")
    .to(".visual-txt3", { x: "-25%", duration: 1, ease: "power2.out" })
    .to(".visual-tit2", { scale: 300, duration: 5, ease: "power2.out", transformOrigin: "60% 50%"})

} else {
  // 1024px 이하일때
  tl.from(".visual-tit2", {
    opacity: 0,
    y: -80,             
    duration: 1.5,
    ease: "power2.out"
  });
}

// logo-section 공통 애니메이션
tl.to(".logo-section", { opacity: 1, duration: 1 })
  .from(".logo-section p span", {
    opacity: 0,
    y: -100,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out"
  })
  .to(".logo-section", {
    backgroundColor: "#000000",
    duration: 2,
    ease: "power2.out"
  })
  .to(".logo-section p span", {
    color: "#ffffff",
    duration: 2,
    ease: "power2.out"
  }, "<")
  .to(".logo-section p span", {
    opacity: 0,
    y: -50,
    stagger: 0.1,
    duration: 1,
    ease: "power2.in"
  });

  // 모바일 GNB 열기/닫기
document.addEventListener("DOMContentLoaded", () => {
  const ham = document.querySelector(".ham");
  const mgnbWrap = document.querySelector(".mgnb-wrap");
  const closeBtn = document.querySelector(".mgnb-close");

  // 왼쪽 밖으로 숨김
  gsap.set(mgnbWrap, { right: "-110%" });

  // 햄버거 버튼 클릭 → 메뉴 열기
  ham.addEventListener("click", () => {
    gsap.to(mgnbWrap, { right: 0, duration: 0.6, ease: "power2.out" });
  });

  // 닫기 버튼 클릭 → 메뉴 닫기
  closeBtn.addEventListener("click", () => {
    gsap.to(mgnbWrap, { right: "-110%", duration: 0.6, ease: "power2.in" });
  });
});

// section01 이미지 흑백 // 컬러 전환
gsap.utils.toArray([".iphone-img img", ".airpods-img img"]).forEach(img => {
  gsap.fromTo(img,
    { filter: "grayscale(100%)" },
    {
      filter: "grayscale(0%)",
      duration: 0.3, 
      scrollTrigger: {
        trigger: img,
        start: "top 100%",
        end: "bottom 60%",
        toggleActions: "play reverse play reverse",
        scrub: 0.1 
      }
    }
  );
});

// section01 텍스트 Parallax Effect
const txtsFast = document.querySelectorAll(".section01-txt");

gsap.to(txtsFast[0], {
  yPercent: -80, 
  ease: "none",
  scrollTrigger: {
    trigger: txtsFast[0],
    start: "top bottom",
    end: "bottom top",
    scrub: 0.5
  }
});

gsap.to(txtsFast[1], {
  yPercent: -120,
  ease: "none",
  scrollTrigger: {
    trigger: txtsFast[1],
    start: "top bottom",
    end: "bottom top",
    scrub: 0.5
  }
});

// section02 스크롤 애니메이션 (이미지들이 밑에서 올라옴)
gsap.timeline({
  scrollTrigger: {
    trigger: ".section02",
    start: "top top",
    end: "bottom bottom",   
    scrub: true,
    pin: ".section02-cont",
    markers: false
  }
})
.from(".section02-img1", { y: 300, scale: 0.9, opacity: 0, duration: 1 }, 0)
.from(".section02-img2", { y: 400, scale: 0.9, opacity: 0, duration: 1 }, 0.2)
.from(".section02-img3", { y: 500, scale: 0.9, opacity: 0, duration: 1 }, 0.4)
.from(".section02-img4", { y: 600, scale: 0.9, opacity: 0, duration: 1 }, 0.6)
.from(".section02-img5", { y: 700, scale: 0.9, opacity: 0, duration: 1 }, 0.8);


gsap.to(".section03-wrapper", {
  xPercent: -100, // 왼쪽으로 한 화면 이동
  ease: "none",
  scrollTrigger: {
    trigger: ".section03",
    start: "top top",
    end: "+=2000", // 스크롤 길이
    scrub: true,
    pin: true,
    anticipatePin: 1
  }
});

// section04 원 확장 
let section04TL = gsap.timeline({
  scrollTrigger: {
    trigger: ".section04",
    start: "top top",
    end: "+=2500",   // 스크롤 구간 길게
    scrub: 2,        // 부드럽게, 느리게
    pin: true,
    markers: false
  }
});

// 원 확장
section04TL.to(".section04-overlay", {
  clipPath: "circle(150% at center)",
  ease: "none",
  duration: 1
});

// 텍스트 색상 전환 
section04TL.to(".section04-tit", {
  color: "#000000",
  duration: 1,
  ease: "power2.out"
});

// section05 배경 이미지 스크롤 이동
gsap.to(".section05 .section05-bg img", {
  y: "-20%", // 위로 천천히 이동 (양수면 아래로 이동)
  ease: "none",
  scrollTrigger: {
    trigger: ".section05",
    start: "top bottom",   // 섹션이 화면에 들어올 때부터
    end: "bottom top",     // 섹션이 화면을 벗어날 때까지
    scrub: true,           // 스크롤과 연동
    markers: false
  }
});







