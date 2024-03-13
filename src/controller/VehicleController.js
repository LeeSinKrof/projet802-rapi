const { Controller, GET } = require('fastify-decorators');
const S = require('fluent-json-schema');
const VehicleRoute = require('../routes/VehicleRoute');

@Controller('/vehicle')
class VehicleController {
    @GET('/', {
        schema: {
            querystring: S.object()
                .prop('page', S.number().default(1))
                .prop('size', S.number().default(30))
                .prop('search', S.string().default(''))
        }
    })
    async handlerVehicles(req, reply) {
        return new VehicleRoute().run(req, reply);
    }
}

module.exports = VehicleController;
