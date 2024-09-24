///////////////////////////////////////////////////////////
//  public/js/src/Router.js                              //
///////////////////////////////////////////////////////////
//
//
//

    import { RouterConfig } from "./../config/RouterConfig.js";

    import { Clients } from "./Clients.js";
    import { Feedback } from "./Feedback.js";


    export const Router = () => {
        
        let __route = false;

        let __id = false;
        let __page = false;

        let __change_page = false;


        const __refresh_all = () => {
            if (window.__set_image_height)
                window.__set_image_height();
            if (window.__refresh_display)
                window.__refresh_display();
            if (window.__set_max_height)
                window.__set_max_height();
        };


///////////////////////////////////////////////////////////
//  __enable_mouse_events()                              //
///////////////////////////////////////////////////////////
//
        const __enable_mouse_events = (
            class_name,
            prefix
        ) => {

            $('#nav_link_title').on('click', function() {
                $('#nav_link_home').trigger('click');
            });

            $(`.${class_name}`).on('mouseover', function() {
                const   __el_id = $(this).attr('id').replace(prefix, '');
                if (__id === __el_id || __change_page)
                    return;
                $(this).stop().animate(
                    RouterConfig['mouseover'],
                    RouterConfig['duration'],
                    RouterConfig['easing']
                );
            });

            $(`.${class_name}`).on('mouseout', function() {
                const   __el_id = $(this).attr('id').replace(prefix, '');
                if (__id === __el_id || __change_page)
                    return;
                $(this).stop().animate(
                    RouterConfig['mouseout'],
                    RouterConfig['duration'],
                    RouterConfig['easing']
                );
            });

            $(`.${class_name}`).on('click', function(ev) {
                ev.preventDefault();
                const   __el_id = $(this).attr('id').replace(prefix, '');
                if (__id === __el_id || __change_page)
                    return;
                __change_page = true;
                $(`.nav_link`).stop().animate(
                    RouterConfig['mouseout'],
                    RouterConfig['duration'],
                    RouterConfig['easing']
                );
                $(`#${RouterConfig['prefix'][0]}${__el_id}`).stop().animate(
                    RouterConfig['mouseover'],
                    RouterConfig['duration'],
                    RouterConfig['easing']
                );
                $(`#page_${__id}`).stop().animate({
                    'opacity': '0.01'
                }, 500, "linear", function() {
                    $(`#page_${__id}`).css('display', 'none');
                    __set_route(__el_id);
                    __show_page();
                    __refresh_all();
                });
            });
            

            $(`.footer_link`).on('click', function(ev) {
                ev.preventDefault();
                const   __el_id = $(this).attr('id').replace('footer_link_', '');
                if (__id === __el_id || __change_page)
                    return;
                __change_page = true;
                $(`.nav_link`).stop().animate(
                    RouterConfig['mouseout'],
                    RouterConfig['duration'],
                    RouterConfig['easing']
                );
                $(`#page_${__id}`).stop().animate({
                    'opacity': '0.01'
                }, 500, "linear", function() {
                    $(`#page_${__id}`).css('display', 'none');
                    __set_route(__el_id);
                    __show_page();
                    __refresh_all();
                });
            });

            $(`.footer_link`).on('mouseover', function() {
                $(this).stop().animate(
                    RouterConfig['mouseover'],
                    RouterConfig['duration'],
                    RouterConfig['easing']
                );
            });

            $(`.footer_link`).on('mouseout', function() {
                $(this).stop().animate(
                    RouterConfig['mouseout'],
                    RouterConfig['duration'],
                    RouterConfig['easing']
                );
            });

        };


///////////////////////////////////////////////////////////
//  __build_links()                                      //
///////////////////////////////////////////////////////////
//
        const __build_links = element => {

            let __html_out = '';
            let __prefix = RouterConfig['prefix'][RouterConfig['elements'].indexOf(element)];
            let __class = RouterConfig['classes'][RouterConfig['elements'].indexOf(element)];

            Object.keys(RouterConfig['routes']).forEach(route => {
                let __objCss = window.__css_string(RouterConfig['mouseout']);

                if (route === __route)
                    __objCss = window.__css_string(RouterConfig['selected']);

                if (RouterConfig['routes'][route].hasOwnProperty('link')) {
                    __html_out += `
                        <a 
                            id="${__prefix}${RouterConfig['routes'][route]['id']}"
                            href="${RouterConfig['routes'][route]['path']}"
                            class="${__class}"
                            style="${__objCss}"
                            title="${RouterConfig['routes'][route]['title']}"
                        >
                            ${RouterConfig['routes'][route]['link']}
                        </a>
                    `;
                }

                $(`#content`).append(`<div id="page_${RouterConfig['routes'][route]['id']}" class="content_page"></div>`);
                $(`#page_${RouterConfig['routes'][route]['id']}`).load(`${window.__url}${RouterConfig['routes'][route]['path']}`);
            });

            $(`#${element}`).html(__html_out);
            
            __enable_mouse_events(__class, __prefix);

        };


///////////////////////////////////////////////////////////
//  __set_route()                                        //
///////////////////////////////////////////////////////////
//
        const __set_route = route => {

            __route = route.toLowerCase();

            if (typeof __route === 'undefined' || __route === '') 
                __route = Object.keys(RouterConfig['routes'])[0];
            else {
                if (__route.substring(0, 1) === '#')
                    __route = __route.substring(1);
                if (! RouterConfig['routes'].hasOwnProperty(__route))
                    __route = Object.keys(RouterConfig['routes'])[0];
            }

            __id = RouterConfig['routes'][__route]['id'];
            __page = RouterConfig['routes'][__route]['path'];
            
            window.location.hash = __id;

        };


///////////////////////////////////////////////////////////
//  __load_page()                                        //
///////////////////////////////////////////////////////////
//
        const __show_page = () => {

            $(`#page_${__id}`).css({
                'display': 'block',
                'opacity': '0.01'
            });

            $(`#page_${__id}`).stop().animate({
                'opacity': '0.99'
            }, 1000, "linear", () => {
                __change_page = false;
            });

        };


        const __enable_icon_events = () => {

            $('.icon_image').on('mouseover', function() {
                let   __el_id = $(this).attr('id');
                if (__el_id.substring(0, 15) === 'page_telephone_')
                    __el_id = __el_id.substring(0, 15);
                else
                    __el_id = __el_id.substring(0, 17);
                $(`#${__el_id}_background`).stop().animate({
                    'opacity': '0.90'
                }, 500, "linear");
            });

            $('.icon_image').on('mouseout', function() {
                let   __el_id = $(this).attr('id');
                if (__el_id.substring(0, 15) === 'page_telephone_')
                    __el_id = __el_id.substring(0, 15);
                else
                    __el_id = __el_id.substring(0, 17);
                $(`#${__el_id}_background`).stop().animate({
                    'opacity': '0.01'
                }, 500, "linear");
            });

        };


///////////////////////////////////////////////////////////
//  __initialise()                                       //
///////////////////////////////////////////////////////////
//
        const __initialise = () => {

            __set_route(window.location.hash);

            RouterConfig.elements.forEach(element => {
                __build_links(element);
            });

            $('.content_page').css('display', 'none');

            __show_page();
            setTimeout(() => {
                const   __clients = Clients();
                const   __feedback = Feedback();
                $(`.content_link`).on('click', function(ev) {
                    ev.preventDefault();
                    const   __el_id = $(this).attr('id').replace('content_link_', '');
                    if (__id === __el_id || __change_page)
                        return;
                    __change_page = true;
                    $(`.nav_link`).stop().animate(
                        RouterConfig['mouseout'],
                        RouterConfig['duration'],
                        RouterConfig['easing']
                    );
                    $(`#${RouterConfig['prefix'][0]}${__el_id}`).stop().animate(
                        RouterConfig['mouseover'],
                        RouterConfig['duration'],
                        RouterConfig['easing']
                    );
                    $(`#page_${__id}`).stop().animate({
                        'opacity': '0.01'
                    }, 500, "linear", function() {
                        $(`#page_${__id}`).css('display', 'none');
                        __set_route(__el_id);
                        __show_page();
                        __refresh_all();
                    });
                });
                __enable_icon_events();
            }, 500);

        };


        __initialise();

    };
