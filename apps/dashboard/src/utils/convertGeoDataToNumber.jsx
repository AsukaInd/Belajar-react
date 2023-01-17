export function convertGeoDataToNumber(geodata) {
    geodata.features.forEach((feature) => {
        feature.geometry.coordinates[0].forEach((coordinate) => {
            coordinate[0] = parseFloat(coordinate[0]);
            coordinate[1] = parseFloat(coordinate[1]);
        });

        const zoom = feature.properties.zoom;
        const circleRadius = feature.properties.circleRadius;

        feature.properties.zoom = parseFloat(zoom);
        feature.properties.circleRadius = parseFloat(circleRadius);
    });

    return geodata;
}
