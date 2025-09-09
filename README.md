# Proyecto Final NoSQL: Ejercicios MongoDB
Máster Big Data, Data Science & Inteligencia Artificial
Proyect by: Claudia del Pozo Iglesias
November 2023

# MongoDB NoSQL Project

## Table of Contents

* [Introduction to MongoDB](#introduction-to-mongodb)
* [Prerequisites](#prerequisites)
* [Clients Used](#clients-used)
* [Exercises](#exercises)

## Introduction to MongoDB

MongoDB is a NoSQL database management system that has gained wide popularity in modern application development. Unlike traditional relational databases, MongoDB uses a flexible JSON-like document data model, enabling efficient horizontal scalability and easier adaptation to changing data schemas.

## Prerequisites

Before starting this project, it is necessary to install MongoDB as a network service on your local Windows machine. Here are the steps:

1. **Download MongoDB**: Visit the official MongoDB website and download the Community Edition for Windows.
2. **Installation**: Follow the installation steps and ensure to select the option to install MongoDB as a network service.
3. **Configuration**: After installation, configure your instance as needed and ensure the MongoDB service is up and running.

## Clients Used

This project uses two popular clients to interact with the MongoDB database:

### MongoDB Compass

A GUI client that facilitates data exploration and manipulation in MongoDB. It provides intuitive visual tools for querying, analyzing performance, and designing schemas.

### NoSQLBooster for MongoDB

An advanced MongoDB GUI that features intelligent query autocompletion, an integrated query editor, and a user-friendly interface that simplifies development and management tasks.

## Exercises

This section covers a series of MongoDB queries and operations, showcasing the use of Compass and NoSQLBooster. Exercises include importing JSON data, executing queries, inserting and deleting documents, updating arrays, performing aggregations, and creating new collections.

### Topics Covered:

* Importing JSON datasets into MongoDB collections
* Querying collections with `find()`
* Counting documents
* Inserting and deleting documents
* Filtering based on array values
* Updating arrays using `$pull`, `$push`
* Aggregation framework usage (`$match`, `$group`, `$project`, `$sort`, `$limit`)
* `$unwind` and `$out` to create new collections
* Creating views and statistical analysis by year, genre, and actor

Each exercise is paired with a clear query and screenshot (available in the `/images` folder) to validate the expected outcome. The project builds from basic MongoDB operations to more advanced analytics using the aggregation pipeline.

### Example Queries:

```js
// Find all movies
> db.movies.find()

// Count documents
> db.movies.count()

// Insert new movie
> db.movies.insertOne({ title: "The Silence of the Lambs", year: 1991, cast: ["Anthony Hopkins", "Jodie Foster"], genres: ["Horror", "Crime"] })

// Remove invalid actor entry
> db.movies.updateMany({ cast: "and" }, { $pull: { cast: "and" } })

// Count movies with empty cast array
> db.movies.count({ cast: { $size: 0 } })

// Add 'Undefined' to empty genre arrays
> db.movies.updateMany({ genres: { $size: 0 } }, { $push: { genres: "Undefined" } })

// Aggregation: top 5 actors with most appearances
> db.actors.aggregate([
  { $match: { cast: { $ne: "Undefined" } } },
  { $group: { _id: "$cast", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 5 }
])
```

📁 Full script and screenshots for each query are available in this repository.

---

This project demonstrates practical usage of MongoDB queries and tools to understand how NoSQL databases function and how they can be used for real-world data analytics workflows.
