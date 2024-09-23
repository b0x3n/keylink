///////////////////////////////////////////////////////////
//  resources/js/src/Elasticate.js                       //
///////////////////////////////////////////////////////////
//
//
// 

    export const Elasticate = () => {

        let __elasticate_timer = false;

        let __viewport_height;
        let __page_height;
        let __content_height;

        let __scroll_pos;

        let __header_min;
        let __header_max;
        let __header_diff;
        let __header_height;

        let __nav_min;
        let __nav_max;
        let __nav_diff;
        let __nav_height;

        let __footer_min;
        let __footer_max;
        let __footer_diff;
        let __footer_height;


///////////////////////////////////////////////////////////
//  __update_header()                                    //
///////////////////////////////////////////////////////////
//
        const __update_header = () => {

            __header_diff = (__header_max - __header_min);

            if (__scroll_pos === 0)
                __header_height = __header_max;
            else if (__scroll_pos >= __header_diff)
                __header_height = __header_min;
            else
                __header_height = (__header_max - __scroll_pos);        

            $('header').css('height', `${__header_height}px`);

        };


///////////////////////////////////////////////////////////
//  __update_nav()                                       //
///////////////////////////////////////////////////////////
//
        const   __update_nav = () => {

            __nav_diff = (__nav_max - __nav_min);

            $('nav').css('top', `${__header_height}px`);

            if (__scroll_pos < __header_diff)
                __nav_height = __nav_max;
            // else if (__scroll_pos > (__header_diff + __nav_diff))
            //     __nav_height = __nav_min;
            else
                __nav_height = (__nav_max - (__scroll_pos - __header_diff));

            $('nav').css('height', `${__nav_height}px`);

        };


///////////////////////////////////////////////////////////
//  __update_footer()                                    //
///////////////////////////////////////////////////////////
//
        const   __update_footer = () => {

            __footer_diff = (__footer_max - __footer_min);
            __footer_height = __footer_min;

            const   __remaining = (__page_height - (__scroll_pos + __viewport_height));

            if (__remaining < __footer_diff)
                __footer_height = (__footer_max - __remaining);

            $('footer').css('height', `${__footer_height}px`);

        };


///////////////////////////////////////////////////////////
//  __update_display()                                   //
///////////////////////////////////////////////////////////
//
        const  __update_display = () => {

            __viewport_height = parseInt($('#outer').css('height').replace('px', ''));
            __content_height = parseInt($('#content').css('height').replace('px', ''));

            __scroll_pos = $(window).scrollTop();

            __header_min = parseInt($('header').css('min-height').replace('px', ''));
            __header_max = parseInt($('header').css('max-height').replace('px', ''));

            __nav_min = parseInt($('nav').css('min-height').replace('px', ''));
            __nav_max = parseInt($('nav').css('max-height').replace('px', ''));
            
            __footer_min = parseInt($('footer').css('min-height').replace('px', ''));
            __footer_max = parseInt($('footer').css('max-height').replace('px', ''));

            __page_height = (__header_max + __nav_max + __content_height + __footer_max);

            __update_header();
            __update_nav();
            __update_footer();

        };


///////////////////////////////////////////////////////////
//  __initialise()                                       //
///////////////////////////////////////////////////////////
//
        const __initialise = () => {

            $(document).scrollTop(0);
            __update_display();

            document.addEventListener('scroll', function() {
                __update_display();
            }, true);

            document.addEventListener('resize', function() {
                if (__elasticate_timer) {
                    clearTimeout(__elasticate_timer);
                    __elasticate_timer = false;
                }

                __elasticate_timer = setTimeout(() => {
                    __elasticate_timer = false;
                    $(document).scrollTop(0);
                    __update_display();
                }, 100);
            }, true);

        }; 

        __initialise();

    };
