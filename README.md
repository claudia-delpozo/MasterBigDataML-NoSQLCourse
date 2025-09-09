# 📃 NoSQL Module - MongoDB Project

> Final project for the **NoSQL Module** of the Master's in Big Data, Data Science & AI.
> Developed by **Claudia del Pozo Iglesias** using **MongoDB Compass** and **NoSQLBooster**.

---

## 📚 Description

This project covers the complete manipulation of a MongoDB collection using a dataset of movies. Each exercise follows academic requirements, demonstrating:

* Data import
* Querying with `find()`
* Updates and deletions
* Aggregation pipelines
* Creation of additional collections via `$unwind`

All queries include corresponding screenshots with the results.

---

## 🗃️ Exercise Descriptions and Screenshots

### **1. Import the JSON file into a collection called `movies`**

Used MongoDB Compass to import `movies.json`. Result: 28,795 documents successfully imported.

![Exercise 1](images/0.png)

---

### **2. Explore the dataset using `find()`**

Simple query to inspect structure:

```js
db.movies.find().limit(1)
```

![Exercise 2](images/1.png)

---

### **3. Count total documents in `movies`**

```js
db.movies.countDocuments()
```

Returns total number of movies.

![Exercise 3](images/2.png)

---

### **4. Insert a new movie**

```js
db.movies.insertOne({
  title: "The Silence of the Lambs",
  year: 1991,
  cast: ["Anthony Hopkins", "Jodie Foster"],
  genres: ["Horror", "Crime"]
})
```

![Exercise 4](images/3.png)

---

### **5. Delete the inserted movie**

```js
db.movies.deleteOne({ title: "The Silence of the Lambs" })
```

![Exercise 5](images/4.png)

---

### **6. Count how many movies have an actor called "and"**

```js
db.movies.countDocuments({ cast: "and" })
```

![Exercise 6](images/5.png)

---

### **7. Remove "and" from the cast array**

```js
db.movies.updateMany(
  { cast: "and" },
  { $pull: { cast: "and" } }
)
```

![Exercise 7](images/6.png)

---

### **8. Count how many documents have empty cast**

```js
db.movies.countDocuments({ cast: { $size: 0 } })
```

![Exercise 8](images/7.png)

---

### **9. Update all empty casts with \["Undefined"]**

```js
db.movies.updateMany(
  { cast: { $size: 0 } },
  { $set: { cast: ["Undefined"] } }
)
```

![Exercise 9](images/8.png)

---

### **10. Count how many documents have empty genres**

```js
db.movies.countDocuments({ genres: { $size: 0 } })
```

![Exercise 10](images/9.png)

---

### **11. Update all empty genres with \["Undefined"]**

```js
db.movies.updateMany(
  { genres: { $size: 0 } },
  { $set: { genres: ["Undefined"] } }
)
```

![Exercise 11](images/10.png)

---

### **12. Show the most recent year in the dataset**

```js
db.movies.find().sort({ year: -1 }).limit(1)
```

![Exercise 12](images/11.png)

---

### **13. Count how many movies were released in the last 20 years**

```js
db.movies.aggregate([
  { $match: { year: { $gte: 2003 } } },
  { $count: "total" }
])
```

![Exercise 13](images/12.png)

---

### **14. Count movies from the 1960s**

```js
db.movies.aggregate([
  { $match: { year: { $gte: 1960, $lte: 1969 } } },
  { $count: "total" }
])
```

![Exercise 14](images/13.png)

---

### **15. Year(s) with the most movies**

```js
db.movies.aggregate([
  { $group: { _id: "$year", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
])
```

![Exercise 15](images/14.png)

---

### **16. Year(s) with the fewest movies**

```js
db.movies.aggregate([
  { $group: { _id: "$year", count: { $sum: 1 } } },
  { $sort: { count: 1 } },
  { $limit: 1 }
])
```

![Exercise 16](images/15.png)

---

### **17. Unwind cast and save to new collection `actors`**

```js
db.movies.aggregate([
  { $unwind: "$cast" },
  { $out: "actors" }
])
```

![Exercise 17](images/16.png)

---

### **18. Top 5 actors with most movies (excluding "Undefined")**

```js
db.actors.aggregate([
  { $match: { cast: { $ne: "Undefined" } } },
  { $group: { _id: "$cast", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 5 }
])
```

![Exercise 18](images/17.png)

---

### **19. Top 5 movies with most actors**

```js
db.actors.aggregate([
  { $group: { _id: { title: "$title", year: "$year" }, count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 5 }
])
```

![Exercise 19](images/18.png)

---

### **20. 5 actors with the longest careers**

```js
db.actors.aggregate([
  { $match: { cast: { $ne: "Undefined" } } },
  { $group: {
      _id: "$cast",
      start: { $min: "$year" },
      end: { $max: "$year" },
      span: { $sum: 1 }
  } },
  { $project: {
      begins: "$start",
      ends: "$end",
      years: { $subtract: ["$end", "$start"] }
  } },
  { $sort: { years: -1 } },
  { $limit: 5 }
])
```

![Exercise 20](images/19.png)

---

### **21. Unwind genres and create `genres` collection**

```js
db.actors.aggregate([
  { $unwind: "$genres" },
  { $out: "genres" }
])
```

![Exercise 21](images/20.png)

---

### **22. Top 5 (Year + Genre) with most distinct movies**

```js
db.genres.aggregate([
  { $group: {
      _id: { year: "$year", genre: "$genres" },
      movies: { $addToSet: "$title" }
  } },
  { $project: {
      count: { $size: "$movies" }
  } },
  { $sort: { count: -1 } },
  { $limit: 5 }
])
```

![Exercise 22](images/21.png)

---

### **23. Top 5 actors with the widest genre variety**

```js
db.genres.aggregate([
  { $match: { cast: { $ne: "Undefined" } } },
  { $group: {
      _id: "$cast",
      genres: { $addToSet: "$genres" }
  } },
  { $project: {
      numGenres: { $size: "$genres" },
      genres: 1
  } },
  { $sort: { numGenres: -1 } },
  { $limit: 5 }
])
```

![Exercise 23](images/22.png)

---

### **24. Top 5 movies with most genre diversity**

```js
db.genres.aggregate([
  { $group: {
      _id: { title: "$title", year: "$year" },
      genres: { $addToSet: "$genres" }
  } },
  { $project: {
      numGenres: { $size: "$genres" },
      genres: 1
  } },
  { $sort: { numGenres: -1 } },
  { $limit: 5 }
])
```

![Exercise 24](images/23.png)

---
