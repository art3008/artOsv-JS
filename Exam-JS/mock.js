const NAMES = [
    "Karaganda",
    "Astana",
    "Moscow",
    "Banqiao",
    "Chambly",
    "Khandagayty",
    "Angers",
    "NaKae",
    "Beizhuang",
    "KorydallГіs",
    "Huangshi",
    "Fkih Ben Salah",
    "Lagoa",
    "Denton",
    "Sumberrejo",
    "Bugcaon",
    "Hengli"
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