let UnitMeasure = {
    type: {
        thermodynamic: {
            temperature: {
                name: "Kelvin",
                letter: "K",
                example: 264
            },
            wind: "m/s",
            wind_example: 3
        },
        metric: {
            temperature: {
                name: "Celsius",
                letter: "C",
                example: -9
            },
            wind: "m/s",
            wind_example: 3
        },
        imperial: {
            temperature: {
                name: "Fahrenheit",
                letter: "F",
                example: 15
            },
            wind: "mph",
            wind_example: 7
        }
    },
    pressure: "hPa",
    pressure_example: 978,
    precipitation: "mm",
    precipitation_example: 4
};

export default UnitMeasure;