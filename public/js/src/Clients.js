///////////////////////////////////////////////////////////
//  public/js/src/Clients.js                             //
///////////////////////////////////////////////////////////
//
//
//

    import { ClientData } from "./../../data/ClientData.js";


    export const Clients = () => {

        let __html_out = '';
        let __link_no = 0;

        ClientData.forEach(client => {

            __html_out += `
                <a href="${client['website']}" title="Click to visit ${client['website']}">
                    <img
                        id="client_${__link_no++}"
                        class="client_wrapper"
                        style="content: url(${window.__url}${client['logo']}); border: none;"
                    />
                </a>
            `;

        });

        $('#clients_inner').append(__html_out);

        const _set_image_height = () => {
            
            let __image_width = parseInt($('.client_wrapper').css('width').replace('px', ''));
            $('.client_wrapper').css('height', `${__image_width}px`);
        
        };

        _set_image_height();

        // $(window).on('resize', () => {
        //     __set_image_height();
        // })

        window.__set_image_height = _set_image_height;

    };
