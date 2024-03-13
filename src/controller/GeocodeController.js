
const { Controller, GET } = require('fastify-decorators');
const S = require('fluent-json-schema');
const GeoCodeRoute = require('../routes/GeocodeRoute');

@Controller('/geocode')
class GeocodeController {

    @GET('/', {
        schema: {
            querystring: S.object()
                .prop('search', S.string())
        }
    })
    async handlerGeoCode(req, reply) {
        return new GeoCodeRoute().run(req, reply);
    }
}

module.exports = GeocodeController;
