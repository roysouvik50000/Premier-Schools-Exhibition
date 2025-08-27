const slidesWrap = document.getElementById('slides');
const dotsWrap = document.getElementById('dots');
const slides = slidesWrap.children;
let index = 0, startX = 0, cur = 0, prev = 0, isDrag = false;

[...slides].forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot';
    if (i === 0) d.classList.add('active');
    d.onclick = () => go(i);
    dotsWrap.appendChild(d);
});

function go(i) {
    index = Math.max(0, Math.min(i, slides.length - 1));
    prev = -index * slider.clientWidth;
    slidesWrap.style.transition = 'transform .3s ease';
    slidesWrap.style.transform = `translateX(${prev}px)`;
    [...dotsWrap.children].forEach((d, j) => d.classList.toggle('active', j === index));
}

const slider = document.getElementById('slider');
slider.addEventListener('touchstart', e => { isDrag = true; startX = e.touches[0].clientX; });
slider.addEventListener('touchmove', e => {
    if (!isDrag) return; cur = prev + (e.touches[0].clientX - startX);
    slidesWrap.style.transition = 'none'; slidesWrap.style.transform = `translateX(${cur}px)`;
});
slider.addEventListener('touchend', () => {
    if (!isDrag) return; isDrag = false;
    let moved = cur - prev;
    if (moved > 50) go(index - 1);
    else if (moved < -50) go(index + 1);
    else go(index);
});
window.addEventListener('resize', () => go(index));

// Exhibition section  Slider

const exhibitionSlider = document.getElementById('exhibition-slider');
let scrollAmount = 0;

function moveSlide(direction) {
    const cardWidth = exhibitionSlider.querySelector('.exhibition .card').offsetWidth + 20; // width + margin
    scrollAmount += direction * cardWidth;
    exhibitionSlider.style.transform = `translateX(${-scrollAmount}px)`;
}


// header scroll sticky 
window.addEventListener("scroll", function () {
    let header = document.getElementById("header");
    if (window.scrollY > 0) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});