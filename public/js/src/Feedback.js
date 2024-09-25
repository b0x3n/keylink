///////////////////////////////////////////////////////////
//  public/js/src/Feedback.js                            //
///////////////////////////////////////////////////////////
//
//
//

    import { FeedbackData } from "./../../data/FeedbackData.js";
    import { FeedbackConfig } from "./../config/FeedbackConfig.js";


    export const Feedback = () => {

        let __current_entry = 0;
        let __last_entry = 0;

        let __max_height = 0;


///////////////////////////////////////////////////////////
//  __set_max_height()                                   //
///////////////////////////////////////////////////////////
//
        const __set_max_height = () => {

            if ($('#contact_header').css('display') === 'none') {
                for (let el_no = 0; el_no < FeedbackData.length; el_no++) {
                    const __height = parseInt($(`#quote_${el_no}`).css('height').replace('px', ''));
                    if (__height > __max_height)
                        __max_height = __height;
                }
                $('.content_page').css('padding-top', `${__max_height + 48}px`);
            }    
            else
                $('.content_page').css('padding-top', '0px');

        };


///////////////////////////////////////////////////////////
//  __build_quotes()                                     //
///////////////////////////////////////////////////////////
//
        const __build_quotes = () => {

            let __html_out = '';

            for (let el_no = 0; el_no < FeedbackData.length; el_no++) {
                let __client_info = FeedbackData[el_no]['client_name'];

                if (FeedbackData[el_no]['client_title'] !== '')
                    __client_info += `, ${FeedbackData[el_no]['client_title']}`;

                __client_info += `, ${FeedbackData[el_no]['client_company']}`;

                __html_out += `
                    <div
                        id="quote_${el_no}"
                        class="content_quote"
                        style="
                            display: none;
                            opacity: 0.01
                        "
                    >
                        <div id="quote_text_${el_no}" class="client_quote">
                            &quot;${FeedbackData[el_no]['quote']}&quot;
                        </div>
                        <div id="quote_client_${el_no}" class="client_info">
                            ${__client_info} 
                        </div>
                    </div>
                `;
            }

            $('#content').append(__html_out);

        };


///////////////////////////////////////////////////////////
//  __show_quote()                                       //
///////////////////////////////////////////////////////////
//
        const __show_quote = () => {

            __set_max_height();

            const _quote = FeedbackData[__current_entry]['quote'];
            const _client_name = FeedbackData[__current_entry]['client_name'];
            const _client_title = FeedbackData[__current_entry]['client_title'];
            const _client_company = FeedbackData[__current_entry]['client_company'];

            __last_entry = __current_entry;

            if (FeedbackConfig['mode'] === 'random') {
                while (__current_entry === __last_entry)
                    __current_entry = Math.floor(Math.random() * FeedbackData.length);
            }
            else {
                __current_entry++;
                if (__current_entry >= FeedbackData.length)
                    __current_entry = 0;
            }

            $(`#quote_${__current_entry}`).css('display', 'block');

            $(`#quote_${__current_entry}`).stop().animate({
                'opacity': '0.99'
            }, 1000, "linear")
            $(`#quote_text_${__current_entry}`).stop().animate({
                'opacity': '0.99',
                'top': '0px',
                'left': '0px'
            }, 500, "linear")
            $(`#quote_client_${__current_entry}`).stop().animate({
                'opacity': '0.99',
                'top': '1vw',
                'margin-bottom': '1vw',
                'left': '0px'
            }, 500, "linear");

            setTimeout(() => {
                $(`#quote_${__current_entry}`).stop().animate({
                    'opacity': '0.99'
                }, 1000, "linear");
                $(`#quote_client_${__current_entry}`).stop().animate({
                    'opacity': '0.00',
                    'top': '2vw',
                    'margin-bottom': '0vw',
                    'left': '10px'
                }, 200, "linear");
                $(`#quote_text_${__current_entry}`).stop().animate({
                    'opacity': '0.01',
                    'top': '1vw',
                    'left': '10px'
                }, 200, "linear", () => {
                    $(`#quote_${__current_entry}`).stop().animate({
                        'opacity': '0.01'
                    }, 1000, "linear", function() {
                        $(this).css('display', 'none');
                        __show_quote();
                    });
                });
            }, FeedbackConfig['display_for'])

        };


        const __populate_feedback_page = () => {

            let __html_out = '';
            let __index = 0;

            FeedbackData.forEach(feedback => {
                let __client_info = FeedbackData[__index]['client_name'];

                if (FeedbackData[__index]['client_title'] !== '')
                    __client_info += `, ${FeedbackData[__index]['client_title']}`;

                __client_info += `, ${FeedbackData[__index]['client_company']}`;

                __html_out += `
                    <div
                        id="feedback_${__index}"
                        class="feedback_wrapper"
                    >
                        <div id="feedback_quote_${__index}" class="feedback_quote">
                            &quot;${feedback['quote']}&quot;
                        </div>
                        <div id="feedback_info_${__index++}" class="feedback_info">
                            ${__client_info}
                        </div>
                    </div>
                    `;

            });

            $('.feedback').append(__html_out);
            
        };


///////////////////////////////////////////////////////////
//  __initialise()                                       //
///////////////////////////////////////////////////////////
//
        const __initialise = () => {

            __build_quotes();

            if (FeedbackConfig['mode'] === 'random')
                __current_entry = Math.floor(Math.random() * FeedbackData.length);

            __show_quote();

            window.__set_max_height = __set_max_height;

            __populate_feedback_page();

        };


        __initialise();

    };
