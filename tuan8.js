// Cau 1
db.restaurants.find({ cuisine: 'Hamburger' }).explain()
// Cau 2
db.restaurants.createIndex({ cuisine: 1 })
// Cau 3
db.restaurants.find({ cuisine: 'Hamburger' }).explain()
// Cau 4
db.restaurants.getIndexes()
// Cau 5
db.restaurants.dropIndex({ cuisine: 1 })
// Cau 6
db.restaurants.createIndex({cuisine: -1 }, { name: 'cuisine_inc' })
db.restaurants.getIndexes()
// Cau 7
db.restaurants.find({ borough: 'Brooklyn' }).explain()
db.restaurants.createIndex({ borough: 1 })
db.restaurants.find({ borough: 'Brooklyn' }).explain()
// Cau 8
db.restaurants.createIndex({ cuisine: -1, name: 1 })
db.restaurants.getIndexes()
// Cau 9
db.restaurants.find({ cuisine: 'Hamburger', name: /^Wil/ })
// Cau 10
db.restaurants.getIndexes()
// Cau 11
db.restaurants.createIndex({ name: 1 }, { unique: true })
// Cau 12 
db.restaurants.find({ name: 'Wild Asia' }).explain('executionStats')
// Cau 13
db.restaurants.dropIndex({ name: 1 })
db.restaurants.insertOne(
    {
        address: {
          building: '7715',
          coord: [ -73.9973325, 40.61174889999999 ],
          street: '18 Avenue',
          zipcode: '11214'
        },
        borough: 'Brooklyn',
        cuisine: 'American ',
        grades: [
          { date: ISODate("2014-04-16T00:00:00.000Z"), grade: 'A', score: 5 },
          { date: ISODate("2013-04-23T00:00:00.000Z"), grade: 'A', score: 2 },
          { date: ISODate("2012-04-24T00:00:00.000Z"), grade: 'A', score: 5 },
          { date: ISODate("2011-12-16T00:00:00.000Z"), grade: 'A', score: 2 }
        ],
        name: 'C & C Catering Service',
        restaurant_id: '40357437'
      }
)
// Cau 14
db.restaurants.createIndex({ 'address.zipcode': 1 })
db.restaurants.find({'address.zipcode': { $gt: 11000 }}).explain('executionStats')
db.restaurants.dropIndexes()
// Cau 15
// Cau 16

// Cau 17
db.restaurants.createIndex({ name: 1, 'address.zipcode': 1 })

// Cau 18
db.restaurants.aggregate([
    {
        $match: {
            $expr: {
                $gt: [ '$address.zipcode', 11000 ]
            }
        }
    },
    {
        $sort: {
            name: 1
        }
    }
])
// Cau 19

// Cau 20

// Cau 21

// Cau 22

// Cau 23

// Cau 24

// Cau 25

// Cau 26