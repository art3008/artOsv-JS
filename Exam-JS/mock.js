const NAMES = [
    "Karaganda",
    "Astana",
    "Moscow"
]



const mockName = i => 
    NAMES[randomInt(0,NAMES.length)];

const mockAirport = i => {
    const name = mockName(i);

    return new Airport(
        name
    );
}

const mockAirports = createArray(mockAirport);