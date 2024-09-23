///////////////////////////////////////////////////////////
//  public/js/src/App.js                                 //
///////////////////////////////////////////////////////////
//
//
//

    import { Elasticate } from './Elasticate.js';
    import { Router } from "./Router.js";
    import { Sprinkler } from "./Sprinkler.js";

    import { SprinklerConfig } from "./../config/SprinklerConfig.js";


    export const App = () => {

        let __elasticate;
        let __router;

        
///////////////////////////////////////////////////////////
//  __css_string()                                       //
///////////////////////////////////////////////////////////
//
        window.__css_string = objCss => {

            let _css_string = '';

            Object.keys(objCss).forEach(key => {
                _css_string += `${key}: ${objCss[key]};`;
            });

            return _css_string;

        };


        const __start_sprinklers = () => {

            const   __sprinkler = Sprinkler();

            __sprinkler.build_string(SprinklerConfig['title_left']);
            __sprinkler.build_string(SprinklerConfig['title_right']);
            __sprinkler.build_string(SprinklerConfig['title_tag']);

        };


///////////////////////////////////////////////////////////
//  __initialise()                                       //
///////////////////////////////////////////////////////////
//
        const __initialise = () => {
            
            $(window).on('load', () => {

                __elasticate = Elasticate();
                __router = Router();

                __start_sprinklers();

            });

        };


        __initialise();

    };
