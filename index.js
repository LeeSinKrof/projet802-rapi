const fastify = require('fastify');
const fastifyCors = require('@fastify/cors');
const S = require('fluent-json-schema');
const DirectionRoute = require('./src/routes/DirectionRoute.cjs');
const GeoCodeRoute = require('./src/routes/GeocodeRoute.cjs');
const VehicleRoute = require('./src/routes/VehicleRoute.cjs');
const StationRoute = require('./src/routes/StationRoute.cjs');
const dotenv = require('dotenv');

dotenv.config();

const app = fastify({
    logger: true,
});

app.register(fastifyCors, {
    origin: true,
});

app.get('/', async (request, reply) => {
    return "Bonjour, vous êtes à la racine \n" +
        "Pour obtenir les directions, veuillez aller à /direction \n" +
        "Pour obtenir les géocodes, veuillez aller à /geocode \n" +
        "Pour obtenir les véhicules, veuillez aller à /vehicle \n";
});

app.get('/direction', {
    schema: {
        querystring: S.object()
            .prop('coord1', S)
            .prop('coord2', S)
    }
}, async (request, reply) => {
    return new DirectionRoute().run(request, reply, process.env.ROAD_API_KEY);
});

app.get('/geocode', {
    schema: {
        querystring: S.object()
            .prop('search', S.string())
    }
}, async (request, reply) => {
    return new GeoCodeRoute().run(request, reply, process.env.ROAD_API_KEY);
});

app.get('/vehicle', {
    schema: {
        querystring: S.object()
            .prop('page', S.number().default(1))
            .prop('size', S.number().default(30))
            .prop('search', S.string().default(''))
    }
}, async (request, reply) => {
    return new VehicleRoute().run(request, reply, process.env.APP_VEHICLE_API_KEY, process.env.CLIENT_VEHICLE_API_KEY);
});

app.post('/station', {
    schema: {
        body: S.object()
            .prop('routeCoordinates')
            .prop('intervalKilometers', S.number())
    }
}, async (request, reply) => {
    return new StationRoute().run(request, reply);
});

const start = async () => {
    try {
        const port = process.env.PORT || 8080;
        const host = process.env.HOST || '0.0.0.0';
        await app.listen({ port, host: host }, () =>
            console.log('SERVER LISTENING AT PORT : ' + port)
        );
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
