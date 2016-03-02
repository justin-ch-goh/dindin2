const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.bind({
    apiBaseUrl: 'http://localhost:3000/api',
    webBaseUrl: 'htpp://localhost:3000'
});

server.register([
    require('dindin-api'),
    require('inert'),
    require('vision'),
    {
        register: require('yar'),
        options: {
            cookieOptions: {
                password: 'passwordpasswordpasswordpasswordcorrect!', //needed to update this for yar > 7.x.x, minimum password needs 32 characters!
                isSecure: false
            }
        }
    }
], (err) => {

    if (err) {
        throw err;
    }

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path: './views',
        layoutPath: './views/layout',
        layout: true,
        isCached: false,
        partialsPath: './views/partials',
        helpersPath: './views/helpers'
    });

    server.route(require('./routes'));

    server.start(() => {

        console.log('Started server at:', server.info.uri);
    });
});