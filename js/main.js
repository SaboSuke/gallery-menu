const InitMenu = function () {

    let cursor = document.querySelector('.gallery-cursor');
    let cursorClip = $('.gallery-cursor .cursor-clip');
    let menu = document.querySelectorAll('.menu-wrapper .menu-item');
    let x, y;

    const handleDragging = function () {
        const $menu = $(".menu-wrapper");
        $menu.draggable({
            axis: "x",
            helper: ".gallery-cursor",
            scrollSensitivity: 100,
            scrollSpeed: 100,
            snap: false,
            drag: function (event, ui) {
                const current = parseInt($menu.css('left').replace('px', ''));
                const max = document.querySelector('.menu-wrapper').scrollWidth;

                if (current + max <= 1000) {
                    gsap.to('.menu-wrapper', {
                        duration: 0.5,
                        left: `${current + 300}px`,
                        ease: 'Expo.easeInOut'
                    });
                } else if (current - max >= 1900) {
                    gsap.to('.menu-wrapper', {
                        duration: 0.5,
                        left: `3000px`,
                        ease: 'Expo.easeInOut'
                    });
                }
            },
        });
    };

    this.animate = function () {
        const tl = gsap.timeline();
        tl.from('.menu-wrapper', {
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

}

const menu = new InitMenu();
menu.animate();