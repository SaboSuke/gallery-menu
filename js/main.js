
/**
 * @desc Handles the menu drag, wheel and intro animations
 * 
 * @param {Object?} options
 * @param {Number} [options.wheelForwardStep=700] 
 * @param {Number} [options.wheelBackwardStep=-200] 
 * @return {InitMenu | null}
 */
const InitMenu = function (options = {}) {

    const menuItemWidth = 700;
    const menuItemsGap = 100;

    const cursor = document.querySelector('.gallery-cursor');
    const $menu = $(".menu-wrapper");
    const offset = (menuItemWidth + menuItemsGap) * ($('.menu-wrapper').find('.menu-item').length - 1);
    let animationInfo = {
        started: false,
        ended: false
    }
    let x, y;

    const reset = function () {
        animationInfo.started = false;
        animationInfo.ended = true;
    }

    const handleWheel = function (e) {
        const current = parseInt($menu.css('left').replace('px', ''));
        const pluStep = options.wheelForwardStep || 700, minusStep = options.wheelBackwardStep || -200;

        if (e.originalEvent.wheelDelta / 120 > 0) {
            const left = (current + 500) >= offset ? (offset - 200) : Math.abs(current + pluStep);
            if (animationInfo.started) return;

            animationInfo.started = true;
            gsap.to($menu, {
                duration: 1,
                left: `${left}px`,
                ease: 'Expo.easeInOut',
            });
            setTimeout(reset, 700);
        }
        else {
            const left = current >= -300 ? -250 : -(current + minusStep);
            if (animationInfo.started) return;

            animationInfo.started = true;
            gsap.to($menu, {
                duration: 1,
                left: `${left}px`,
                ease: 'Expo.easeInOut',
            });
            setTimeout(reset, 700);
        }
    }

    const handleDragging = function () {
        $menu.draggable({
            axis: "x",
            helper: ".gallery-cursor",
            scrollSensitivity: 100,
            scrollSpeed: 100,
            snap: false,
            scroll: false,
            drag: function (event, ui) {
                const current = parseInt($menu.css('left').replace('px', ''));
                const max = document.querySelector('.menu-wrapper').scrollWidth;

                if (current + max <= 1000) {
                    gsap.to('.menu-wrapper', {
                        duration: 0.5,
                        left: `${current + 300}px`,
                        ease: 'Expo.easeInOut'
                    });
                } else if (current >= (offset + 100)) {
                    gsap.to('.menu-wrapper', {
                        duration: 0.5,
                        left: `${offset}px`,
                        ease: 'Expo.easeInOut'
                    });
                }
            },
        });
    };

    this.animate = function () {
        const tl = gsap.timeline();
        tl.from('.gallery-clip', {
            duration: 1.5,
            opacity: 0,
            width: 0,
            x: '100%',
            ease: 'Expo.easeIn'
        }, '-=1').from('.menu-wrapper', {
            duration: 1,
            opacity: 0,
            x: '100%',
            ease: 'Expo.easeIn',
        }).from('.menu-wrapper .menu-item .item-details', {
            duration: .5,
            y: '20%',
            opacity: 0,
            ease: 'Expo.easeOut'
        });
    };

    const init = function () {
        document.addEventListener('mousemove', function (e) {
            x = e.pageX;
            y = e.pageY;
            cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
        });

        handleDragging();
    }();

    $(document).on('mousewheel', handleWheel);
}

const gallery = new InitMenu();
gallery.animate();