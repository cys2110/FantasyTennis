const db = require('../db')
const { Point } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {
    const points = [
        {
            level: "Grand Slam",
            round: "R128",
            winner: 160,
            score: 160,
            games: 80,
            sets: 40
        },
        {
            level: "Grand Slam",
            round: "R64",
            winner: 360,
            score: 200,
            games: 90,
            sets: 40
        },
        {
            level: "Grand Slam",
            round: "R32",
            winner: 440,
            score: 240,
            games: 100,
            sets: 40
        },
        {
            level: "Grand Slam",
            round: "R16",
            winner: 520,
            score: 380,
            games: 110,
            sets: 40
        },
        {
            level: "Grand Slam",
            round: "QF",
            winner: 600,
            score: 320,
            games: 120,
            sets: 40
        },
        {
            level: "Grand Slam",
            round: "SF",
            winner: 800,
            score: 360,
            games: 130,
            sets: 40
        },
        {
            level: "Grand Slam",
            round: "F",
            winner: 1000,
            score: 400,
            games: 140,
            sets: 40
        },
        {
            level: "ATP Masters 1000",
            round: "R128",
            winner: 80,
            score: 80,
            games: 40,
            sets: 20
        },
        {
            level: "ATP Masters 1000",
            round: "R64",
            winner: 120,
            score: 100,
            games: 50,
            sets: 20
        },
        {
            level: "ATP Masters 1000",
            round: "R32",
            winner: 160,
            score: 120,
            games: 60,
            sets: 20
        },
        {
            level: "ATP Masters 1000",
            round: "R16",
            winner: 200,
            score: 140,
            games: 70,
            sets: 20
        },
        {
            level: "ATP Masters 1000",
            round: "QF",
            winner: 240,
            score: 160,
            games: 80,
            sets: 20
        },
        {
            level: "ATP Masters 1000",
            round: "SF",
            winner: 280,
            score: 180,
            games: 90,
            sets: 20
        },
        {
            level: "ATP Masters 1000",
            round: "F",
            winner: 320,
            score: 200,
            games: 100,
            sets: 20
        },
        {
            level: "ATP 500",
            round: "R64",
            winner: 50,
            score: 50,
            games: 25,
            sets: 10
        },
        {
            level: "ATP 500",
            round: "R32",
            winner: 75,
            score: 60,
            games: 30,
            sets: 10
        },
        {
            level: "ATP 500",
            round: "R16",
            winner: 125,
            score: 80,
            games: 40,
            sets: 10
        },
        {
            level: "ATP 500",
            round: "QF",
            winner: 100,
            score: 70,
            games: 35,
            sets: 10
        },
        {
            level: "ATP 500",
            round: "SF",
            winner: 150,
            score: 90,
            games: 45,
            sets: 10
        },
        {
            level: "ATP 500",
            round: "F",
            winner: 200,
            score: 100,
            games: 50,
            sets: 10
        },
        {
            level: "ATP 250",
            round: "R64",
            winner: 50,
            score: 50,
            games: 25,
            sets: 10
        },
        {
            level: "ATP 250",
            round: "R32",
            winner: 75,
            score: 60,
            games: 30,
            sets: 10
        },
        {
            level: "ATP 250",
            round: "R16",
            winner: 125,
            score: 80,
            games: 40,
            sets: 10
        },
        {
            level: "ATP 250",
            round: "QF",
            winner: 100,
            score: 70,
            games: 35,
            sets: 10
        },
        {
            level: "ATP 250",
            round: "SF",
            winner: 150,
            score: 90,
            games: 45,
            sets: 10
        },
        {
            level: "ATP 250",
            round: "F",
            winner: 200,
            score: 100,
            games: 50,
            sets: 10
        }
    ]

    await Point.insertMany(points)
    console.log('inserted')
}

const run = async() => {
    await main()
    db.close()
}

run()