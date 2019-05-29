const fs = require('fs');
const { google } = require('googleapis');
const spreadsheetId = '1101KMyfiR9H4-sKfIrvegNAcauMU5EiPZ9QNFhKSEVQ';

process.env.GOOGLE_APPLICATION_CREDENTIALS = __dirname + '/private/rook-scores-service-account.json';

var offsets = {
    Maia: 0,
    Joshua: 1,
    Bill: 2,
    Deborah: 3
};

var ranges = {
    gameNum: 0,
    nest: 1,
    bid: 2,
    bakedApplesauceScore: 3,
    ariasPetsScore: 4,
    rook: 5,
    date: 6,
    bakedApplesauceTotal: 7,
    ariasPetsTotal: 8,
    totalDiff: 9,
    nullGame: 10,
    badScores: 12,
    rookAndNest: 15,
    rookAndNoNest: 19,
    rookAndNestSum: 24,
    rookAndNoNestSum: 28,
    bidAmountClassCount: 32,
    bidAmountValues: 33,
    bidAmountCount: 34,
    dateCount: 35,
    date: 36,
    gamesPerNight: 37,
    totalGamesAfterNight: 38,
    rookStreaks: 40,
    noRookStreaks: 44,
    maxRookStreak: 48,
    maxNoRookStreak: 52,
    rookPerNight: 57,
    rookPercentPerNight: 61,
    lastScoreOfTheNightBakedApplesauce: 66,
    lastScoreOfTheNightAriasPets: 67,
    scoreAfterNightBakedApplesauce: 68,
    scoreAfterNightAriasPets: 69,
    scoreChangeAfterNightBakedApplesauce: 70,
    scoreChangeAfterNightAriasPets: 71,
    changeinScoreDiffAfterNight: 72,
}

var formulas = {
    //  Give functions like so
    //  rookAndNest = (row, person) => `=IF(AND($${A1(ranges.nest, row + 1)}="Baked Applesauce",${AI(ranges.rook, row + 1)}="${person}"),1,0)`
    //  for each range defined above.
}

main().catch(err => console.log(err.trace || err.message || err));

async function main() {
    let auth = await google.auth.getClient({
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    google.options({ auth });
    
    const sheets = google.sheets('v4');

    let spreadsheet = (await sheets.spreadsheets.get({ spreadsheetId })).data;

    let scores = spreadsheet.sheets.find(s => s.properties.sheetId === 0);

    console.log(scores);

    let headers = await sheets.spreadsheets.values.batchGet({ spreadsheetId, ranges: ['A1:BW1'], valueRenderOption: 'UNFORMATTED_VALUE', auth });

    console.log(headers);

    // let result = await sheets.spreadsheets.values.update({
    //     spreadsheetId,
    //     auth,
    //     range: 'Scores!D296',
    //     valueInputOption: 'USER_ENTERED',
    //     responseValueRenderOption: 'UNFORMATTED_VALUE',
    //     requestBody: {
    //         values: [ [ 'GOOGLE_API_TEST' ] ]
    //     }
    // });

    // console.log(result);

    debugger
}

