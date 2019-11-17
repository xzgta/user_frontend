export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
            {
                rel: 'stylesheet',
                href: '/css/uikit.css'
            },
            {
                rel: 'stylesheet',
                href: '/css/custom.css'
            },
        ],
        script: [{
                src: '/js/uikit.min.js',
                body: true
            },
            {
                src: '/js/uikit-icons.min.js',
                body: true
            },
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: {
        color: '#fff'
    },
    /*
     ** Global CSS
     */
    css: [],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth'
    ],

    axios: {
        // baseURL: 'https://api-desa.sedanten.id/'
        baseURL: 'http://localhost:3000'
    },
    auth: {
        resetOnError: true,
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: 'user/login',
                        method: 'post',
                        propertyName: 'data'
                    },
                    user: {
                        url: 'user/me',
                        method: 'get',
                        propertyName: 'data'
                    },
                    logout: false
                },
                tokenRequired: true,
                tokenType: 'Bearer',
            }
        },
        redirect: {
            login: '/',
            logout: '/',
            home: '/backend/home'
        }
    },
    router: {
        middleware: ['auth'],
    },


    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}