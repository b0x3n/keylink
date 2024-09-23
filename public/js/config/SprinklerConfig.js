///////////////////////////////////////////////////////////
//  public/js/config/SprinklesConfig.js                  //
///////////////////////////////////////////////////////////
//

    export const SprinklerConfig = {

        'title_left': {
            'repeat': 30000,
            'target_id': 'header_title_logo_left',
            'id_prefix': 'sprinker_left_',
            'class_name': 'sprinkler_char',
            'output_string': 'KEYLINK',
            'default_style': { 'color': '#1E90FF', 'opacity': '0.01' },
            'from': {
                'style': {
                    'color': '#5ED0FF',
                    'opacity': '0.99'
                },
                'duration': 100,
                'easing': 'linear',
                'next': 100
            },
            'to': {
                'style': {
                    'color': '#3EB0FF',
                    'opacity': '0.90'
                },
                'duration': 100,
                'easing': 'linear'
            }
        },

        'title_right': {
            'repeat': 30000,
            'target_id': 'header_title_logo_right',
            'id_prefix': 'sprinker_right_',
            'class_name': 'sprinkler_char',
            'output_string': 'PARTNERSHIP',
            'default_style': { 'color': '#FFF', 'opacity': '0.01' },
            'reveal': { 'after': 0, 'direction': 'backwards', 'flip': true },
            'from': {
                'style': {
                    'color': '#FFF',
                    'opacity': '0.99'
                },
                'duration': 62,
                'easing': 'linear',
                'next': 62
            },
            'to': {
                'style': {
                    'color': '#FFF',
                    'opacity': '0.90'
                },
                'duration': 62,
                'easing': 'linear'
            }
        },

        'title_tag': {
            'repeat': 15000,
            'target_id': 'header_title_tag',
            'id_prefix': 'sprinker_tag_',
            'class_name': 'sprinkler_tag_char',
            'output_string': 'Consultency, Training & Facilitation',
            'default_style': { 'color': '#FFF', 'opacity': '0.01' },
            'reveal': { 'after': 900, 'direction': 'forwards', 'flip': true },
            'from': {
                'style': {
                    'margin-top': '-5px',
                    'color': '#5ED0FF',
                    'opacity': '0.99'
                },
                'duration': 20,
                'easing': 'linear'
            },
            'to': {
                'style': {
                    'margin-top': '0px',
                    'color': '#3EB0FF',
                    'opacity': '0.90'
                },
                'duration': 200,
                'easing': 'linear'
            }
        }

    };
