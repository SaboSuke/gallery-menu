
/**
 * @desc Handles the menu drag, wheel and intro animations
 * 
 * @param {Object?} options
 * @param {Number} [options.wheelForwardStep=700] 
 * @param {Number} [options.wheelBackwardStep=-200] 
 * @return {InitMenu | null}
 */
const InitMenu = function (options = {}) {

    let menuItemWidth = 700;
    let menuItemsGap = 100;
    let offset = (menuItemWidth + menuItemsGap) * ($('.menu-wrapper').find('.menu-item').length - 1);

    let type = 'large';
    const cursor = document.querySelector('.gallery-cursor');
    const $menu = $(".menu-wrapper");
    let animationInfo = {
        started: false,
        ended: false
    }
    let x, y;

    const isMobileOrTablet = function () {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };

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
            const left = current >= (type === 'extrasmall' ? -200 : -300) ? -100 : -(current + minusStep);
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
                console.log({ current })
                const max = document.querySelector('.menu-wrapper').scrollWidth;

                let plusCurrent = 300;
                let plusOffset = 0;
                if (type === 'extrasmall') {
                    plusCurrent = 400;
                    plusOffset = 200;
                } else {
                    plusCurrent = 400;
                    plusOffset = 100;
                }

                if (current <= (type === 'extrasmall' ? -200 : -300)) {//start
                    gsap.to('.menu-wrapper', {
                        duration: 0.5,
                        left: `${0}px`,
                        ease: 'Expo.easeInOut'
                    });
                } else if (current >= (offset + 100)) {//end
                    gsap.to('.menu-wrapper', {
                        duration: 0.5,
                        left: `${offset - plusOffset}px`,
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
        let extraSmall = window.matchMedia('(max-width: 400px)');
        if (extraSmall.matches) {
            type = 'extrasmall';
            cursor.style.display = 'none';

            menuItemWidth = 390;
            menuItemsGap = 10;
            offset = (menuItemWidth + menuItemsGap) * ($('.menu-wrapper').find('.menu-item').length - 1);
        } else if (isMobileOrTablet()) {
            type = 'medium';
            cursor.style.display = 'none';

            menuItemWidth = 490;
            menuItemsGap = 20;
            offset = (menuItemWidth + menuItemsGap) * ($('.menu-wrapper').find('.menu-item').length - 1);
        }

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