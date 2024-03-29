const db = require('../db')
const { Draw, Player } = require('../models')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async() => {

    const paul = await Player.findOne({full_name: 'Tommy Paul'})
    const giron = await Player.findOne({full_name: 'Marcos Giron'})
    const shelton = await Player.findOne({full_name: 'Ben Shelton'})
    const mannarino = await Player.findOne({full_name: 'Adrian Mannarino'})
    const eubanks = await Player.findOne({full_name: 'Christopher Eubanks'})
    const purcell = await Player.findOne({full_name: 'Max Purcell'})
    const thompson = await Player.findOne({full_name: 'Jordan Thompson'})
    const koepfer = await Player.findOne({full_name: 'Dominik Koepfer'})
    const tiafoe = await Player.findOne({full_name: 'Frances Tiafoe'})
    const atmane = await Player.findOne({full_name: 'Terence Atmane'})
    const kudla = await Player.findOne({full_name: 'Denis Kudla'})
    const duckworth = await Player.findOne({full_name: 'James Duckworth'})
    const nishioka = await Player.findOne({full_name: 'Yoshihito Nishioka'})
    const lestienne = await Player.findOne({full_name: 'Constant Lestienne'})
    const vukic = await Player.findOne({full_name: 'Aleksandar Vukic'})
    const martinez = await Player.findOne({full_name: 'Pedro Martinez'})
    const svajda = await Player.findOne({full_name: 'Zachary Svajda'})

    const edition = new Draw({
        "_id": 4242024,
        "tournament": 424,
        "year": 2024,
        "start_date": "2024-02-05T00:00:00.000000Z",
        "end_date": "2024-02-11T00:00:00.000000Z",
        "category": "ATP 250",
        "type_of_draw": 32,
        "currency": "USD",
        "prize_money": 756020,
        "tfc": 841590,
        "location": {
          "venue": "Styslinger/Altec Tennis Complex",
          "city": "Dallas",
          "country": "USA"
        },
        "surface": {
          "environment": "indoor",
          "type": "hard",
          "hard_type": "laykold"
        },
        "supervisors": [
          "Hans-Juergen Ochs"
        ],
        "winner": paul._id,
        "finalist": giron._id,
        "final_score": "76(3) 57 63",
        "awards": {
          "winner": {
            "prize_money": 114970,
            "points": 250
          },
          "finalist": {
            "prize_money": 67070,
            "points": 165
          },
          "semifinalist": {
            "prize_money": 39435,
            "points": 100
          },
          "quarterfinalist": {
            "prize_money": 22850,
            "points": 50
          },
          "round2": {
            "prize_money": 13270,
            "points": 25
          },
          "round1": {
            "prize_money": 8110,
            "points": 0
          }
        },
        "seeds": [
          {
            "seed": 1,
            "player": tiafoe._id,
            "rank": 14
          },
          {
            "seed": 2,
            "player": paul._id,
            "rank": 15
          },
          {
            "seed": 3,
            "player": shelton._id,
            "rank": 16
          },
          {
            "seed": 4,
            "player": mannarino._id,
            "rank": 17
          },
          {
            "seed": 5,
            "player": eubanks._id,
            "rank": 32
          },
          {
            "seed": 6,
            "player": purcell._id,
            "rank": 43
          },
          {
            "seed": 7,
            "player": thompson._id,
            "rank": 44
          },
          {
            "seed": 8,
            "player": koepfer._id,
            "rank": 60
          }
        ],
        "entry_info": {
          "lda": {
            "player": svajda._id,
            "rank": 141
          },
          "lls": [
            atmane._id,
            kudla._id
          ],
          "wds": [
            {
                "player": vukic._id,
                "reason": "left leg"
            },
            {
                "player": martinez._id,
                "reason": "low back"
            }
          ],
          "rets": [
            {
                "player": duckworth._id,
                "reason": "back"
            },
            {
                "player": lestienne._id,
                "reason": "right triceps"
            }
          ],
          "wos": [
            {
                "player": nishioka._id,
                "reason": "stomach"
            }
          ]
        }
      })

    await edition.save()
    console.log(edition)
}

const run = async() => {
    await main()
    db.close()
}

run()