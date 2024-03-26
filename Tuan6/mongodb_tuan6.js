[
    {
      _id: '01020',
      city: 'CHICOPEE',
      loc: [ -72.576142, 42.176443 ],
      pop: 31495,
      state: 'MA'
    },
    {
      _id: '01008',
      city: 'BLANDFORD',
      loc: [ -72.936114, 42.182949 ],
      pop: 1240,
      state: 'MA'
    },
    {
      _id: '01013',
      city: 'CHICOPEE',
      loc: [ -72.607962, 42.162046 ],
      pop: 23396,
      state: 'MA'
    },
    {
      _id: '01011',
      city: 'CHESTER',
      loc: [ -72.988761, 42.279421 ],
      pop: 1688,
      state: 'MA'
    },
    {
      _id: '01001',
      city: 'AGAWAM',
      loc: [ -72.622739, 42.070206 ],
      pop: 15338,
      state: 'MA'
    },
    {
      _id: '01010',
      city: 'BRIMFIELD',
      loc: [ -72.188455, 42.116543 ],
      pop: 3706,
      state: 'MA'
    },
    {
      _id: '01028',
      city: 'EAST LONGMEADOW',
      loc: [ -72.505565, 42.067203 ],
      pop: 13367,
      state: 'MA'
    },
    {
      _id: '01030',
      city: 'FEEDING HILLS',
      loc: [ -72.675077, 42.07182 ],
      pop: 11985,
      state: 'MA'
    },
    {
      _id: '01032',
      city: 'GOSHEN',
      loc: [ -72.844092, 42.466234 ],
      pop: 122,
      state: 'MA'
    },
    {
      _id: '01026',
      city: 'CUMMINGTON',
      loc: [ -72.905767, 42.435296 ],
      pop: 1484,
      state: 'MA'
    },
    {
      _id: '01035',
      city: 'HADLEY',
      loc: [ -72.571499, 42.36062 ],
      pop: 4231,
      state: 'MA'
    },
    {
      _id: '01012',
      city: 'CHESTERFIELD',
      loc: [ -72.833309, 42.38167 ],
      pop: 177,
      state: 'MA'
    },
    {
      _id: '01034',
      city: 'TOLLAND',
      loc: [ -72.908793, 42.070234 ],
      pop: 1652,
      state: 'MA'
    },
    {
      _id: '01022',
      city: 'WESTOVER AFB',
      loc: [ -72.558657, 42.196672 ],
      pop: 1764,
      state: 'MA'
    },
    {
      _id: '01050',
      city: 'HUNTINGTON',
      loc: [ -72.873341, 42.265301 ],
      pop: 2084,
      state: 'MA'
    },
    {
      _id: '01040',
      city: 'HOLYOKE',
      loc: [ -72.626193, 42.202007 ],
      pop: 43704,
      state: 'MA'
    },
    {
      _id: '01056',
      city: 'LUDLOW',
      loc: [ -72.471012, 42.172823 ],
      pop: 18820,
      state: 'MA'
    },
    {
      _id: '01057',
      city: 'MONSON',
      loc: [ -72.319634, 42.101017 ],
      pop: 8194,
      state: 'MA'
    },
    {
      _id: '01039',
      city: 'HAYDENVILLE',
      loc: [ -72.703178, 42.381799 ],
      pop: 1387,
      state: 'MA'
    },
    {
      _id: '01031',
      city: 'GILBERTVILLE',
      loc: [ -72.198585, 42.332194 ],
      pop: 2385,
      state: 'MA'
    }
  ]

// 1.  Hiển thị n documents từ document thứ k. (n, k tùy ý)
db.zipcodes.aggregate([
  {
    $skip: 3
  }, 
  {
    $limit: 5
  }
])

// 2.  Chèn thêm 1 document mới. (tùy ý)
db.zipcodes.insertOne(
  {
    _id: '01100',
    city: 'NEW YORK CITY',
    loc: [ -73.935242, 40.730610 ],
    pop: 8468,
    state: 'NY'
  }
)

// 3.  Cập nhật thông tin của một document khi biết id bất kỳ.
db.zipcodes.updateOne({ _id: '01100' }, { $set: { pop: 8469 } })
// 4.  Tìm dân số của thành phố (city) PALMER.
db.zipcodes.aggregate([
  {
    $match: {
      city: 'PALMER'
    }
  },
  {
    $project: {
      _id: 0,
      state: 1,
      city: 1,
      pop: 1,
    }
  }
])
// 5.  Tìm các document có dân số (pop) >100000
db.zipcodes.aggregate([
  {
    $match: {
      $expr: {
        $gt: [ '$pop', 100000 ]
      }
    }
  }
])
// 6.  Tìm dân số của thành phố (city) FISHERS ISLAND
db.zipcodes.aggregate([
  {
    $match: {
      city: 'FISHERS ISLAND'
    }
  },
  {
    $project: {
      _id: 0,
      pop: 1
    }
  }
])
// 7.  Tìm các thành phố có dân số từ 10 – 50
db.zipcodes.aggregate([
  {
    $match: {
      $and: [ {pop: {$gte: 10}} , { pop: { $lte: 50} } ]
    }
  },
  {
    $project: {
      _id: 0,
      city: 1,
    }
  }
])
// 8.  Tìm tất cả các thành phố của bang MA có dân số trên 500
db.zipcodes.aggregate([
  {
    $match: {
      $and: [
        { state: 'MA' },
        { pop: { $gt: 500 } }
      ]
    }
  },
  {
    $project: {
      _id: 0,
      city: 1
    }
  }
])
// 9.  Tìm tất cả các bang (không trùng)
db.zipcodes.aggregate([
  {
    $group: {
      _id: '$state'
    }
  },
  {
    $project: {
      _id: 0,
      state: '$_id'
    }
  }
])
// 10.  Tìm tất cả các bang mà có chứa ít nhất 1 thành phố có dân số trên 100000
db.zipcodes.aggregate([
  {
    $group: {
      _id: '$state',
      citiPops: { $push: '$pop' }
    }
  },
  {
    $match: {
      $expr: {
        $gt: [ '$citiPops', 100000 ]
      }
    }
  },
  {
    $project: {
      state: '$_id'
    }
  }
])
// 11.  Tính tổng số dân (pop) theo từng bang (state).
db.zipcodes.aggregate([
  {
    $group: {
      _id: '$state',
      pop:  { $sum: '$pop' }
    }
  }
])
// 12.  Tìm tất cả các bang có tổng dân số trên 10.000.000
db.zipcodes.aggregate([
  {
    $group: {
      _id: '$state',
      pop:  { $sum: '$pop' }
    }
  }, 
  {
    $match: {
      $expr: {
        $gt: ['$pop', 10000000]
      }
    }
  }
])
// 13.  Tính dân số trung bình (các thành phố) theo từng bang (state).
db.zipcodes.aggregate([
  {
    $group: {
      _id: '$state',
      avgPop: { $avg: '$pop' }
    }
  }
])
// 14.  Tìm những document của bang 'CT' và thành phố 'WATERBURY'
db.zipcodes.aggregate([
  {
    $match: {
      $and: [
        { state: 'CT' },
        { city: 'WATERBURY' }
      ]
    }
  }
])
// 15.  Bang WA có bao nhiêu city (nếu trùng chỉ tính 1 lần)**
db.zipcodes.aggregate([
  {
    $match: {
      state: 'WA'
    }
  },
  {
    $group: {
      _id: '$city',
    }
  },
  {
    $count: "numberOfCity"
  }
])
// 16.  Tính số city của mỗi bang (nếu trùng chỉ tính 1 lần), kết quả giảm dần theo số city
db.zipcodes.aggregate([
  {
    $group: {
      _id: '$state',
      cities: { $addToSet: '$city' }
    }
  }, 
  {
    $project: {
      state: '$state',
      numberOfCity: { $size: '$cities' }
    }
  },
  {
    $sort: { numberOfCity: -1 }
  }
])
// 17.  Tìm ra các thành phố có dân số (pop) lớn (nhỏ) nhất.
db.zipcodes.aggregate([
  {
    $sort: { pop: -1 }
  },
  {
    $limit: 1
  }
])

db.zipcodes.aggregate([
  {
    $sort: { pop: 1 }
  },
  {
    $limit: 1
  }
])

// 18.  Tìm bang có dân số (pop) lớn (nhỏ) nhất.
db.zipcodes.aggregate([
  {
    $group: {
      _id: '$state',
      pop: { $sum: '$pop' }
    }
  }, 
  {
    $sort: { pop: -1 }
  },
  {
    $limit: 1
  }
])

db.zipcodes.aggregate([
  {
    $group: {
      _id: '$state',
      pop: { $sum: '$pop' }
    }
  }, 
  {
    $sort: { pop: 1 }
  },
  {
    $limit: 1
  }
])
// 19.  Xuất những document có dân số dưới dân số trung bình của mỗi city
const avgCityPop = db.zipcodes.aggregate([
  {
    $group: {
      _id: null,
      avgCityPop: {
        $avg: '$pop'
      }
    }
  }
]).toArray()[0].avgCityPop

db.zipcodes.aggregate([
  {
    $match: {
      pop: { $lt: avgCityPop }
    }
  }
])