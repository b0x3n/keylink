///////////////////////////////////////////////////////////
//  public/js/config/RouterConfig.js                     //
///////////////////////////////////////////////////////////
//
//
//

    export const RouterConfig = {

        'elements': [
            'nav_inner'
        ],

        'classes': [
            'nav_link'
        ],

        'prefix': [
            'nav_link_'
        ],
        
        'routes': {

            'clients': {
                'id': 'clients',
                'path': '/public/pages/clients.html',
                'title': 'Meet some of our clients!'
            },
            'feedback': {
                'id': 'feedback',
                'path': '/public/pages/feedback.html',
                'title': 'Read some of the wonderful feedback from our Clients!'
            },

            'contact': {
                'id': 'contact',
                'link': 'Contact',
                'path': '/public/pages/contact_us.html',
                'title': 'Contact Keylink Partnership'
            },
            'team': {
                'id': 'team',
                'link': 'Our Team',
                'path': '/public/pages/our_team.html',
                'title': 'Meet the Keylink Partnership team'
            },
            'services': {
                'id': 'services',
                'link': 'Services',
                'path': '/public/pages/our_services.html',
                'title': 'Services provided by Keylink Partnership'
            },
            'home': {
                'id': 'home',
                'link': 'Home',
                'path': '/public/pages/home.html',
                'title': 'Go to the Keylink Partnership home page'
            }
            
        },

        'mouseover': {
            'color': '#3EB0FF'
        },

        'mouseout': {
            'color': '#FFF'
        },

        'selected': {
            'color': '#3EB0FF'
        },

        'duration': 1000,
        'easing': 'swing'

    };
