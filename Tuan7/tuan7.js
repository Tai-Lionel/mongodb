const movieExample = {
    _id: ObjectId("573a1390f29313caabcd4136"),
    title: 'Pauvre Pierrot',
    year: 1892,
    runtime: 4,
    released: ISODate("1892-10-28T00:00:00.000Z"),
    plot: 'One night, Arlequin come to see his lover Colombine. But then Pierrot knocks at the door and Colombine and Arlequin hide. Pierrot starts singing but Arlequin scares him and the poor man goes away.',
    fullplot: 'One night, Arlequin come to see his lover Colombine. But then Pierrot knocks at the door and Colombine and Arlequin hide. Pierrot starts singing but Arlequin scares him and the poor man goes away.',
    lastupdated: '2015-08-12 00:06:02.720000000',
    type: 'movie',
    directors: [ '�mile Reynaud' ],
    imdb: { rating: 6.7, votes: 566, id: 3 },
    countries: [ 'France' ],
    genres: [ 'Animation', 'Comedy', 'Short' ],
    num_mflix_comments: 1,
    comments: [
      {
        name: 'Warren Wilson',
        email: 'warren_wilson@fakegmail.com',
        movie_id: ObjectId("573a1390f29313caabcd4136"),
        text: 'Repudiandae minus voluptates quidem hic corporis corrupti id. Ipsum assumenda laborum officiis aliquam. Dolorum voluptatum saepe blanditiis. Eos modi dolores architecto laboriosam porro.',
        date: ISODate("2005-01-04T11:56:37.000Z")
      }
    ]
  }
// 1.  Đếm tổng số các document movies 
db.movies.aggregate([
    {
        $count: "numberOfMovieDocuments"
    }
])
// 2.  Xuất các document movies theo năm, tính tổng số film trong mỗi năm
db.movies.aggregate([
    {
        $group: {
            _id: "$year",
            numberOfMovies: { $count: {} }
        }
    }
])
// 3.  Xuất các document movies theo năm, tính tổng số film trong mỗi năm, sau đó sắp xếp tăng.
db.movies.aggregate([
    {
        $group: {
            _id: "$year",
            numberOfMovies: { $count: {} }
        }
    },
    {
        $sort: {
            numberOfMovies: 1
        }
    }
])
// 4.  Xuất các document movies theo năm, sau đó sắp xếp theo thứ tự giảm dần dựa trên số lượng.
db.movies.aggregate([
    {
        $group: {
            _id: "$year",
            numberOfMovies: { $count: {} }
        }
    },
    {
        $sort: {
            numberOfMovies: -1
        }
    }
])
// 5.  Xuất các document movies theo số lượng film mỗi đạo diễn có được, 
db.movies.aggregate([
    {
        $unwind: "$directors"
    },
    {
        $group: {
            _id: "$directors",
            numberOfMovies: { $count: {} }
        }
    }
])
// 6.  Xuất các document movies theo số lượng film từng year, type, title. Sau đó sắp xếp giảm dần theo số lượng đếm được.
db.movies.aggregate([
    {
        $group: {
            _id: { year: "$year", type: "$type", title: "$title"},
            numberOfMovies: { $count: {} }
        }
    },
    {
        $sort: {
            numberOfMovies: -1
        }
    }
])
// 7.  Liệt kê danh sách các đạo diễn có tham gia từ 30 bộ phim trở lên. Thông tin bao gồm: Tên đạo diễn (director) và số bộ phim.
db.movies.aggregate([
    {
        $unwind: "$directors"
    },
    {
        $group: {
            _id: "$directors",
            numberOfMovies: { $count: {} }
        }
    }, 
    {
        $match: {
            numberOfMovies: { $gte: 30 }
        }
    },
    {
        $project: {
            director: "$_id",
            numberOfMovies: "$numberOfMovies"
        }
    }
])
// 8.  Tìm tất cả các đạo diễn có tham gia đạo diễn nhiều bộ phim nhất
const maxMovie = db.movies.aggregate([
    {
        $unwind: "$directors"
    },
    {
        $group: {
            _id: "$directors",
            numberOfMovies: { $count: {} }
        }
    },
    {
        $sort: {
            numberOfMovies: -1
        }
    },
    {
        $limit: 1
    }
]).toArray()[0].numberOfMovies
db.movies.aggregate([
    {
        $unwind: "$directors"
    },
    {
        $group: {
            _id: "$directors",
            numberOfMovies: { $count: {} }
        }
    }, 
    {
        $match: {
            numberOfMovies: { $gte: maxMovie }
        }
    }
])
// 9.  Liệt kê tựa phim (title) theo từng đạo diễn. Thông tin bao gồm: tên đạo diễn (director) và danh sách tựa phim
db.movies.aggregate([
    {
        $unwind: "$directors"
    },
    {
        $group: {
            _id: "$directors",
            movies: { $addToSet: "$title"}
        }
    }
])
// 10.  Thống kê số bộ phim đã phát hành theo từng năm, sắp xếp giảm dần theo năm
db.movies.aggregate([
    {
        $group: {
            _id: "$year",
            numberOfMovies: { $count: {} }
        }
    },
    {
        $sort: {
            _id: -1
        }
    }
])
// 11.  Tìm năm phát hành nhiều bộ phim nhất.
db.movies.aggregate([
    {
        $group: {
            _id: "$year",
            numberOfMovies: { $count: {} }
        }
    },
    {
        $sort: {
            numberOfMovies: -1
        }
    },
    {
        $limit: 1
    }
])
// 12.  Liệt kê danh sách các tựa phim (title) theo từng quốc gia. Thông tin bao gồm: tên quốc gia và danh sách tựa phim
db.movies.aggregate([
    {
        $unwind: "$countries"
    },
    {
        $group: {
            _id: "$countries",
            movies: { $addToSet: "$title" }
        }
    }
])
// 13.  Đếm số bộ phim theo từng quốc gia, sắp xếp giảm dần theo số bộ phim. Thông tin bao gồm:Tên quốc gia và số bộ phim
db.movies.aggregate([
    {
        $unwind: "$countries"
    },
    {
        $group: {
            _id: "$countries",
            numberOfMovies: { $count: {} }
        }
    }
])
// 14.  Tìm những tựa phim (title) phát hành trong tháng 03 năm 2016’
db.movies.aggregate([
    {
        $match: {
            $expr: {
                $and: [
                    {$eq: [{$month: "$released"}, 3]},
                    {$eq: [{$year: "$released"}, 2016]}
                ]
            }
        }
    },
    {
        $project: {
            _id: 0,
            title: 1
        }
    }
])
// 15.  Liệt kê những tựa phim (title) do diễn viên “Frank Powell” hoặc “Charles Wellesley” đóng

// 16.  Tìm những quốc gia phát hành nhiều bộ phim nhất

