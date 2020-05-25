"use strict";
const fs = require("fs");
const readline = require("readline");
const rs = fs.createReadStream("./popu-pref.csv");
const rl = readline.createInterface({ input: rs, output: {} });
const prefectureDataMap = new Map();
rl.on("line", (lineString) => {
    const colum = lineString.split(",");
    const year = parseInt(colum[0]);
    const prefecture = colum[1];
    const population_between_15_19 = parseInt(colum[3]);
    if (year === 2010 || year === 2015) {
        let value = prefectureDataMap.get(prefecture);
        if (!value) {
            value = {
                population_10: 0,
                population_15: 0,
                change: null,
            };
        }
        if (year === 2010) {
            value.population_10 = population_between_15_19;
        }

        if (year === 2015) {
            value.population_15 = population_between_15_19;
        }
        prefectureDataMap.set(prefecture, value);
    }
});
rl.on("close", () => {
    for (let [key, value] of prefectureDataMap) {
        value.change = value.population_15 / value.population_10;
    }
    const rankingArray = Array.from(prefectureDataMap).sort((pair1, pair2) => {
        return pair2[1].change - pair1[1].change;
    });

    const rankingStrings = rankingArray.map(([key, value]) => {
        return (
            key +
            ":" +
            value.population_10 +
            "=>" +
            value.population_15 +
            "変化率" +
            value.change
        );
    });
    console.log(rankingStrings);
});
