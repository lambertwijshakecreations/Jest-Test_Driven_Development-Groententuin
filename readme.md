# De TDD Groententuin.

Dit was een eindopdracht voor de module TDD testing met Jest. Hier moest ik het volgende doen :


In deze opdracht gaan we code schrijven voor een groentetuin. Maar we gaan dat nu "Test-Driven" doen. We gaan dus de volgende cyclus herhalen tijdens het schrijven van onze code.

schrijf één of meerdere tests voor een stukje functionaliteit
draai de nieuwe tests en check dat ze falen (rood)
schrijf code om alle tests te laten slagen (groen)
verbeter de code zodat deze er netjes uit ziet (refactor)
commit je code
terug naar stap 1 met het volgende stukje functionaliteit
Terminologie en groenteformules
Maar eerst even terug naar de planten. We verbouwen groente en fruit in een tuin. We gaan berekenen hoeveel opbrengst de verschillende groenten en fruit voor de tuin hebben. We gaan ook rekening houden met omgevingsfactoren zoals bijvoorbeeld zon, wind en temperatuur. Die omgevingsfactoren hebben invloed op hoeveel kilo groente en fruit er aan de planten groeit. Als laatste gaan we berekenen hoeveel winst we kunnen maken met onze groentetuin.

Laten we eerst even wat Engelse termen en definities uitleggen:

"crop" is een verzameling planten van dezelfde soort, dus bijvoorbeeld een veld maïs
"costs" zijn de kosten voor het zaaien van één plant
"yield" is de opbrengst van één plant of één crop (in kilo's)
"sale price" is de verkoopsprijs van een soort groente of fruit per kilo
"revenue" is de omzet of de inkomsten van één kilo groente of fruit
"profits" is winst, dat is dus revenue - costs
"factor" is in deze context een omgevingsfactor die invloed heeft op de yield
Danger

Let op dat je het woord "yield" niet als variabele gebruikt, dat is een reserved keyword in JavaScript

Om de berekeningen in eerste instantie simpel te houden doen we de volgende aannames: * groente en fruit worden altijd direct verkocht (je hoeft geen rekening te houden met bederf of te weinig vraag) * er zijn geen loonkosten * we gebruiken geen mest * we hoeven niet te betalen voor de grond

We hebben voor de berekeningen een aantal formules. De formules zijn relatief simpel, maar samengenomen kan de code nog best complex worden.

Kosten
De kosten om een plant te zaaien zijn vast per plant.

Voorbeeld: 1 maïsplant zaaien kost 1 euro.

Als je een crop van 230 maïsplanten hebt zijn de kosten voor die crop dus 230 euro.

Revenue
Elke plant heeft een "sale price". Dat is hoeveel euro je verdient met één kilo groente of fruit van die plant.

Als appels een sale price van 2 euro hebben en we verkopen 5 kilo appels dan is de revenue dus 10 euro.

Opbrengst (yield) van één plant
Elke plant heeft een standaard-opbrengst in kilo's. Als er geen omgevingsfactoren meespelen is dat de opbrengst.

Elke plant kan nul, één of meerdere omgevingsfactoren hebben. Elke omgevingsfactor heeft een waarde, die waarde is de procentuele invloed op de opbrengst.

Als voorbeeld kunnen we avocado nemen en als omgevingsfactor de zon. Als een avocado een bepaalde hoeveelheid zon krijgt dan wordt de opbrengst anders:

veel zon: +50% opbrengst
medium zon: 100% opbrengst
weinig zon: -20% opbrengst
Laten we zeggen dat een avocadoplant een standaard opbrengst van 3 kilo heeft. Laten we daarnaast zeggen dat er veel zon is. Dan brengt die plant 3kg* 150% = 4,5 kilo avocado's op.

Maar stel nou dat er nog een factor is: wind.

veel wind: -60% opbrengst
medium wind: -30% opbrengst
weinig wind: 100% opbrengst
En laten we zeggen dat er nu niet alleen veel zon is, maar ook veel wind. Dan kunnen we de opbrengst zo berekenen: 3kg * 150% * 40% = 1,8 kilo.

Als er een factor is die niet van invloed is op een bepaalde plantsoort dan hoef je die ook niet mee te rekenen. Voorbeeld:

De groei van avocadoplanten wordt niet beïnvloedt door de grondsoort. Als de avocadoplant groeit op klei dan heeft die factor geen invloed op hoeveel kilo avocado's een avocadoplant produceert. Als er in de groentetuin andere planten groeien die daar wel door beïnvloed worden moet je daar wel rekening mee houden uiteraard.

Algemene tips
Schrijf al je code (en je comments) in het Engels.

Ga stapje voor stapje en draai je tests de hele tijd door, gebruik hiervoor het watch commando. Zie ook de TDD-cyclus bovenin. Denk eraan te committen na elke cyclus, of zelfs ook als je tests groen zijn.

Maak een nieuw repository aan voor deze opdracht. Als je een herkansing doet en de aanpassingen doet zijn klein dan kun je verder werken in hetzelfde repository en hoef je niet alles opnieuw te committen.

Om je een beginnetje te geven geven we je alvast wat tests. Die mag je niet aanpassen.

const { getYieldForPlant, getYieldForCrop, getTotalYield } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});
Zorg dat je de tests eerst draaiend krijgt met jest. Schrijf dus de code die nodig is om de tests te laten slagen.

Ga vervolgens stapje voor stapje functionaliteit toevoegen. Gebruik de TDD-cyclus die bovenin deze opdracht staat. Voeg de functionaliteit in de volgende stappen toe:

bereken de kosten voor een crop:getCostsForCrop
bereken inkomsten voor een crop (zonder omgevingsfactoren): getRevenueForCrop
bereken de winst voor een crop (zonder omgevingsfactoren): getProfitForCrop
bereken de winst voor meerdere crops (zonder omgevingsfactoren): getTotalProfit
Implementeer de hierop volgende functionaliteiten door je eerder geschreven functies aan te passen. Schrijf dus geen nieuwe functies. Het is dus de bedoeling dat je nu binnen de functies gaat checken of er wel/geen relevante omgevingsfactoren zijn meegegeven.

neem omgevingsfactoren mee in het berekenen van de opbrengst (in kilo's) van een plant: getYieldForPlant, gebruik daarvoor de volgende datastructuren:
const corn = {
  name: "corn",
  yield: 30,
  factors: {
    sun: {
      low: -50,
      medium: 0,
      high: 50,
    },
  },
};

const environmentFactors = {
  sun: "low",
};
doe deze berekening met meerdere omgevingsfactoren
zorg dat je niet-relevante omgevingsfactoren negeert in je berekeningen
bereken de opbrengst in kilo's van een crop getYieldForCrop, neem omgevingsfactoren mee in je berekening
bereken de totale opbrengst van meerdere crops getTotalYield, neem omgevingsfactoren mee in je berekening
bereken de inkomsten van een crop getRevenueForCrop, neem omgevingsfactoren mee in je berekening
bereken de winst van een crop getProfitForCrop, neem omgevingsfactoren mee in je berekening
bereken de winst voor meerdere crops getTotalProfit, neem omgevingsfactoren mee in je berekening
Dus als voorbeeld voor de eerste stap "bereken de kosten voor een crop".

schrijf één of meerdere tests voor "bereken de kosten voor een crop"
draai de nieuwe tests en check dat ze falen (rood)
schrijf code om alle tests (inclusief deze nieuwe) te laten slagen (groen)
verbeter de code zodat deze er netjes uit ziet (refactor)
commit je code
terug naar stap 1 met het volgende stukje functionaliteit

