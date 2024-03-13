const { createClient, fetchExchange, cacheExchange } = require('@urql/core');
const { vehicleListQuery } = require('../../query/VehicleQuery');

class VehicleRoute {
    run = async (req, reply, key) => {
        const options = req.query;

        const headers = {
            'x-client-id': '65a0fad803f11572e9c6ae4a',
            'x-app-id': key,
        };

        const client = createClient({
            url: 'https://api.chargetrip.io/graphql',
            fetchOptions: {
                method: 'POST',
                headers,
            },
            exchanges: [fetchExchange, cacheExchange],
        });

        if (!client) {
            return reply.code(500).send({
                statusCode: 500,
                error: 'Internal server error, client not defined!',
            });
        }

        try {
            const vehicles = await client.query(vehicleListQuery, options).toPromise();
            return reply.code(200).send(vehicles.data.vehicleList);
        } catch (error) {
            console.error('Error in getVehicleList:', error);
            throw error;
        }
    };
}

module.exports = VehicleRoute;
