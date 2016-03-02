const Wreck = require('wreck');

exports.home = function (request, reply) {

    const apiUrl = this.apiBaseUrl + '/recipes';

    Wreck.get(apiUrl, { json: true }, (err, res, payload) => {

        if (err) {
            throw err;
        }

        reply.view('index', {
            recipes: payload,
            user: request.yar.get('user')
        });
    });

    // const recipes = [{
    //     id: 1,
    //     name: 'Silicate soup',
    //     cuisine: 'Maritian',
    //     stars: 100,
    //     serves: 1,
    //     prep_time: '2 hours',
    //     cooking_time: '12 minutes'
    // },{
    //     id: 2,
    //     name: 'Methane trifle',
    //     cuisine: 'Neptunian',
    //     stars: 200,
    //     serves: 2,
    //     prep_time: '1 hour',
    //     cooking_time: '24 minutes'
    // }];

    // reply.view('index', {
    //     recipes: recipes
    // });
};

exports.viewRecipe = function (request, reply) {

    const apiUrl = this.apiBaseUrl + '/recipes/' + request.params.id;

    Wreck.get(apiUrl, { json: true }, (err, res, payload) => {

        if (err) {
            throw err;
        }

        reply.view('recipe', {
            recipe: payload,
            user: request.yar.get('user')
        });
    });
};

exports.login = function (request, reply) {

    reply.view('login');
};

exports.createRecipe = function (request, reply) {

    reply.view('create', {
        user: request.yar.get('user')
    });
};