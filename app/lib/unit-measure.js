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

let Languages = [
    {name: "English", value: "en"}, {name: "Russian", value: "ru"}, {name: "Italian", value: "it"}, {
        name: "Spanish",
        value: "sp"
    }, {name: "Ukrainian", value: "ua"}, {name: "German", value: "de"},
    {name: "Portuguese", value: "pt"}, {name: "Romanian", value: "ro"}, {name: "Polish", value: "pl"}, {
        name: "Finnish",
        value: "fi"
    }, {name: "Dutch", value: "nl"},
    {name: "French", value: "fr"}, {name: "Bulgarian", value: "bg"}, {
        name: "Swedish",
        value: "se"
    }, {name: "Chinese Traditional", value: "zh_tw"},
    {name: "Chinese Simplified", value: "zh_cn"}, {name: "Turkish", value: "tr"}, {
        name: "Croatian",
        value: "hr"
    }, {name: "Catalan", value: "ca"}
];

export {UnitMeasure};

export {Languages};