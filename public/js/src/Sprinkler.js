///////////////////////////////////////////////////////////
//  public/js/src/Sprinkler.js                           //
///////////////////////////////////////////////////////////
//
//
//

    export const Sprinkler = () => {


///////////////////////////////////////////////////////////
//  __check_option()                                     //
///////////////////////////////////////////////////////////
//
        const __check_option = (
            objConfig,
            option_name,
            default_value = false
        ) => {

            if (! objConfig.hasOwnProperty(option_name)) {
                if (! default_value)
                    throw new Error(`In Sprinkler.__check_option(): objConfig requires a '${option_name}' property`);
                objConfig[option_name] = default_value;
            }

        };


///////////////////////////////////////////////////////////
//  __build_html()                                       //
///////////////////////////////////////////////////////////
//
        const __build_html = objConfig => {

            const __el = $(`#${objConfig['target_id']}`);

            if (__el.length < 1)
                throw new Error(`In Sprinkler.__build_html(): Target element '${objConfig['target_id']}' not found`);

            let __html_out = '';

            for (let byte_no = 0; byte_no < objConfig['output_string'].length; byte_no++) {
                let __byte = objConfig['output_string'].substring(byte_no, (byte_no + 1));

                if (__byte === ' ')
                    __byte = '&nbsp;';
                else if (__byte === '&')
                    __byte = '&amp;';

                __html_out += `
                    <div
                        id="${objConfig['id_prefix']}${byte_no}"
                        class="${objConfig['class_name']}"
                        style="${window.__css_string(objConfig['default_style'])}"
                    >
                        ${__byte}
                    </div>
                `
            }

            __el.html(__html_out);

        };


///////////////////////////////////////////////////////////
//  __flash_forwards()                                   //
///////////////////////////////////////////////////////////
//
        const __flash_forwards = (objConfig, index) => {

            if (index >= objConfig['output_string'].length)
                return;

            $(`#${objConfig['id_prefix']}${index}`).stop().animate(
                objConfig['from']['style'],
                objConfig['from']['duration'],
                objConfig['from']['easing'],
                function() {
                    $(this).stop().animate(
                        objConfig['to']['style'],
                        objConfig['to']['duration'],
                        objConfig['to']['easing'],
                    );
                    __flash_forwards(objConfig, (index + 1));
                }
            );

        };


///////////////////////////////////////////////////////////
//  __flash_backwards()                                  //
///////////////////////////////////////////////////////////
//
        const __flash_backwards = (objConfig, index) => {

            if (index < 0)
                return;

            $(`#${objConfig['id_prefix']}${index}`).stop().animate(
                objConfig['from']['style'],
                objConfig['from']['duration'],
                objConfig['from']['easing'],
                function() {
                    $(this).stop().animate(
                        objConfig['to']['style'],
                        objConfig['to']['duration'],
                        objConfig['to']['easing'],
                    );
                }
            );

            setTimeout(() => {
                __flash_backwards(objConfig, (index - 1));
            }, objConfig['from']['next']);

        };


///////////////////////////////////////////////////////////
//  __reveal_text()                                      //
///////////////////////////////////////////////////////////
//
        const __reveal_text = objConfig => {

            let _index = 0;

            if (objConfig['reveal']['direction'] !== 'forwards')
                _index = (objConfig['output_string'].length - 1);

            if (_index === 0)
                __flash_forwards(objConfig, _index);
            else
                __flash_backwards(objConfig, _index);

        };


///////////////////////////////////////////////////////////
//  _build_string()                                      //
///////////////////////////////////////////////////////////
//
        const _build_string = objConfig => {

            __check_option(objConfig, 'target_id');
            __check_option(objConfig, 'id_prefix', 'strinkles_');
            __check_option(objConfig, 'class_name', 'sprinkles');
            __check_option(objConfig, 'output_string', 'Sprinkles');
            __check_option(objConfig, 'default_style', { 'color': '#FFF' });

            __check_option(objConfig, 'reveal', { 'after': 0, 'direction': 'forwards', 'flip': true });

            __check_option(objConfig, 'from', {
                'style': {
                    'color': '#FFF',
                    'opacity': '0.99'
                },
                'duration': 100,
                'easing': 'linear'
            });
            __check_option(objConfig, 'to', {
                'style': {
                    'color': '#1E90FF',
                    'opacity': '0.90'
                },
                'duration': 100,
                'easing': 'linear'
            });

            __check_option(objConfig, 'repeat', 10000);

            __build_html(objConfig);

            setTimeout(() => {
                __reveal_text(objConfig);
            }, objConfig['reveal']['after']);

            setInterval(() => {
                setTimeout(() => {
                    if (objConfig['reveal'].hasOwnProperty('flip') && objConfig['reveal']['flip']) {
                        if (objConfig['reveal']['direction'] === 'forwards')
                            objConfig['reveal']['direction'] = 'backwards';
                        else
                            objConfig['reveal']['direction'] = 'forwards';
                    }

                    __reveal_text(objConfig);
                }, objConfig['reveal']['after']);
            }, objConfig['repeat']);

        };


        return {

            build_string: _build_string

        };

    };
