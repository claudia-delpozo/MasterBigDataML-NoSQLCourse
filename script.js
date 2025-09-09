use entrega
db.movies.find()

db.movies.find().count()

var pelicula = {
    title: "Barbie", year: 2023,
    cast: ["Margott Robie", "Ryan Gosling"],
    genres: ["Comedy", "Fantasy"]
    
}
db.movies.insertOne(pelicula)

var titulo = { title: "Barbie" }
db.movies.deleteMany(titulo)

var consulta = { cast: "and" }
db.movies.find(consulta).count()

var query = {cast : "and"}
var operacion = { $pull: { cast: "and"} }
db.movies.updateMany(query,operacion)

var consulta = { cast: [] }
db.movies.find(consulta).count()

var query = {cast : []}
var operacion = { $addToSet: {cast:"Undefined"}}
db.movies.updateMany(query, operacion)

var consulta = {genres: []}
db.movies.find(consulta).count()

var query = {genres : []}
var operacion = { $addToSet: {genres:"Undefined"}}
db.movies.updateMany(query, operacion)

db.movies.find({}).sort({year: -1})
    .limit(1)
    .project({"_id": 0, year: 1})
    
var docu = {title:"$title", year:"$year", cast: "$cast", genres: "$genres"}
var fase1 = {
    $group: {
        "_id": null,
        maxi: {$max: "$year"},
        movies: { $push: docu}
    }
}
var fase2 = {$unwind: "$movies"}
var fase3 = {
    $replaceWith: {
        $mergeObjects:
            [{"maxYear": {$subtract: ["$maxi", 20]}}, "$movies"]
    }
}
var fase4 = {$match: {$expr: {$gte: ["$year", "$maxYear"] } } }
var fase5 = { $group: { "_id": null, peliculas: {$sum: 1} } }
var pipeline = [fase1, fase2, fase3, fase4, fase5]
db.movies.aggregate(pipeline)
    .match({})
    .project({})
    .sort({_id:-1})
    .limit(100)
    
var op1 = {$match: {year: {$gte: 1960, $lte: 1969} } }
var op2 = {$group: { "_id": null, total: {$sum: 1} } }
var pipeline = [op1, op2]
db.movies.aggregate(pipeline)
    .match({})
    .project({})
    .sort({_id:-1})
    .limit(100)

var op1 = { $group: {"_id": "$year", movies: {$sum: 1} } }
var op2 = { $project: { "_id": 0, year: "$_id", movies : "$movies"} }
var op3 = { $group: {"_id": "$movies", years: {$push: "$year"} } }
var op4 = { $project: {"_id": 0, movies: "$_id", years: "$years"} }
var op5 = { $sort: {"movies": -1} }
var op6 = { $limit: 1}
var op7 = { $unwind: "$years"}
var op8 = { $project: {year: "$years", movies: "$movies" } }
var pipeline = [op1, op2, op3, op4, op5, op6, op7, op8]
db.movies.aggregate(pipeline)
    .match({})
    .project({})
    .sort({_id:-1})
    .limit(100)
    
var op1 = { $group: {"_id": "$year", movies: {$sum: 1} } }
var op2 = { $project: { "_id": 0, year: "$_id", movies : "$movies"} }
var op3 = { $group: {"_id": "$movies", years: {$push: "$year"} } }
var op4 = { $project: {"_id": 0, movies: "$_id", years: "$years"} }
var op5 = { $sort: {"movies": 1} }
var op6 = { $limit: 1}
var op7 = { $unwind: "$years"}
var op8 = { $project: {year: "$years", movies: "$movies" } }
var pipeline = [op1, op2, op3, op4, op5, op6, op7, op8]
db.movies.aggregate(pipeline)

var op1 = { $unwind: "$cast"}
var op2 = { $project: { "_id": 0 } }
var op3 = { $out: "actors" }
var ops = [op1, op2, op3]
db.movies.aggregate(ops)
db.actors.find().count()

var op1 = { $match: { cast: { $ne: "Undefined"} } }
var op2 = { $group: {"_id": "$cast", peliculas: { $sum: 1 } } }
var op3 = { $sort: { peliculas: -1} }
var op4 = { $limit: 5}
var op5 = {
    $project: {
        "_id": 0,
        "Actor": "$_id",
        Peliculas: "$peliculas"
    }
}
var pipeline = [op1, op2, op3, op4, op5]
db.actors.aggregate(pipeline)

var op1 = {$match: {cast: { $ne: "Undefined" } } }
var op2 = {
    $group: {
        "_id": {
            pelicula: "$title", year : "$year"
        },
        actores: { $addToSet: "$cast" }
    }
}
var op3 = { $addFields: {countActors: {$size: "$actores"}}}
var op4 = { $sort: { countActors: -1 } }
var op5 = { $limit: 5 }
var op6 = { $project: {actores: 0} }
var pipeline = [op1, op2, op3, op4, op5, op6]
db.actors.aggregate(pipeline)