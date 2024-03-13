

class DirectionRoute {
    async run(req, reply, apiKey) {
        const coordinates = req.query;

        const apiUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${coordinates.coord1}&end=${coordinates.coord2}`;

        try {

            const { default: fetch } = await import('node-fetch');

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8'
                }
            });

            const data = await response.json();
            return reply.code(200).send(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
}

module.exports = DirectionRoute;
