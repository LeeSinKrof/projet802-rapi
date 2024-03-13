const axios = require('axios');

function calculateDistance(coord1, coord2) {
    const earthRadiusKm = 6371;

    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadiusKm * c;
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

class StationRoute {
    run = async (req, reply) => {
        const fields = req.body;
        const routeCoordinates = fields.routeCoordinates;
        const intervalKilometers = fields.intervalKilometers;

        const steps = [];
        steps.push(routeCoordinates[0]);

        let distanceAccumulator = 0;

        for (let i = 1; i < routeCoordinates.length; i++) {
            const coord1 = routeCoordinates[i - 1];
            const coord2 = routeCoordinates[i];

            const distanceBetweenPoints = calculateDistance(coord1, coord2);

            distanceAccumulator += distanceBetweenPoints;

            if (distanceAccumulator >= intervalKilometers) {
                const query = `within_distance(geo_point_borne, GEOM'POINT(${coord1[0]} ${coord2[1]})', ${30000}m)`;
                const url = `https://odre.opendatasoft.com/api/explore/v2.1/catalog/datasets/bornes-irve/records?limit=1&where=${encodeURIComponent(query)}`;

                try {
                    const bornesResponse = await axios.get(url);
                    const bornes = bornesResponse.data.results;

                    if (bornes.length > 0) {
                        const nearestBorn = bornes[0];
                        const latBorne = nearestBorn.geo_point_borne.lat;
                        const lngBorne = nearestBorn.geo_point_borne.lon;
                        steps.push([lngBorne, latBorne]);
                        distanceAccumulator = 0;
                    }
                } catch (error) {
                    console.error('Error fetching data from API:', error);
                    throw error;
                }
            }
        }

        steps.push(routeCoordinates[routeCoordinates.length - 1]);
        return steps;
    }
}

module.exports = StationRoute;
