const { Controller, GET } = require('fastify-decorators');
const S = require('fluent-json-schema');
const DirectionRoute = require('../routes/DirectionRoute');

@Controller('/direction')
class DirectionController {

    @GET('/', {
        schema: {
            querystring: S.object()
                .prop('coord1', S)
                .prop('coord2', S)
        }
    })
    async handlerDirection(req, reply) {
        return new DirectionRoute().run(req, reply);
    }
}

module.exports = DirectionController;
