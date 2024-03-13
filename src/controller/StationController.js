const { Controller, POST } = require('fastify-decorators');
const S = require('fluent-json-schema');
const StationRoute = require('../routes/StationRoute');

@Controller('/station')
class StationController {

    @POST('', {
        schema: {
            body: S.object()
                .prop('routeCoordinates')
                .prop('intervalKilometers', S.number())
        }
    })
    async handlerStation(req, reply) {
        return new StationRoute().run(req, reply);
    }
}

module.exports = StationController;
