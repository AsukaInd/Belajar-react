export function dataToOption(data) {
    const options = [];
    data.map((v) => {
        options.push({
            label: v.name,
            value: v.id,
        });
    });
    return options
}