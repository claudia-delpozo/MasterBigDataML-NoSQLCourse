# MongoDB NoSQL Final Project: Exercises with Screenshots  
**Master in Big Data, Data Science & Artificial Intelligence**  
**Project by:** Claudia del Pozo Iglesias  
**Date:** [Fecha de entrega]  
**Contact:** [Tu correo electrónico]

---

## Table of Contents
- [Introduction to MongoDB](#introduction-to-mongodb)  
- [Prerequisites](#prerequisites)  
- [Clients Used](#clients-used)  
- [Project Files](#project-files)  
- [Exercises with Screenshots](#exercises-with-screenshots)

---

## Introduction to MongoDB
MongoDB is a popular NoSQL database system widely used for modern application development. Unlike relational databases, MongoDB uses a flexible JSON-like document model, allowing efficient horizontal scalability and easy schema evolution.

---

## Prerequisites
To run this project, make sure:
1. MongoDB Community Edition is installed as a network service on a Windows machine.  
2. The MongoDB service is configured and running.

---

## Clients Used
- **MongoDB Compass**: GUI for exploring data, executing queries, and designing schemas.  
- **NoSQLBooster for MongoDB**: Offers autocomplete, a rich query editor, and powerful data manipulation tools.

---

## Project Files
- `Claudia del Pozo Iglesias.pdf` — Final report with explanations and screenshots.  
- `script.js` — Optional script (if used in your steps).  
- `images/` — Folder containing step-by-step screenshot files (`1.png`, `2.png`, ..., `23.2.png`, etc.).

---

## Exercises with Screenshots

### 1. Import JSON as "movies" Collection  
Import the dataset in `./Database/movies.json` into the `movies` collection using MongoDB Compass:  
![Dataset Imported](images/1.png)  

### 2. View Collection with `find()`  
```js
db.movies.find()
