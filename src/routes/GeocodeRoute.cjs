
class GeoCodeRoute {
    run = async (req, reply, apiKey) => {
        const { search } = req.query;

        const apiUrl = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${apiKey}&text=${search}&boundary.country=FR&size=5`;

        try {

            const { default: fetch } = await import('node-fetch');

            const response = await fetch(apiUrl, {
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

module.exports = GeoCodeRoute;
