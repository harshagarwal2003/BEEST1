import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookself.js';

// const app = express();

const route = express.Router();

// app.use(express.json());

// Route for the root path
route.get('/', (request, response) => {
  return response.status(234).send('Welcome');
});

// Route for saving a new book
route.post('/api/books', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all the required fields: title, author, publishYear,genre,ISBN',
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      genre: request.body.genre,
      publishYear: request.body.publishYear,
      ISBN: request.body.ISBN
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//routes for get all books from database 

route.get('/api/books', async(request, response) => {
  try{
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books
    });
  }catch(error){

    console.log(error.message);
    response.status(500).send({message: error.message });
  }
});

//route for get one book from database by id
route.get('/api/books/:id', async(request, response) => {
  try{

    const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).json(book);
  }catch(error){

    console.log(error.message);
    response.status(500).send({message: error.message });
  }
});

//route for update a Book 

route.put('/api/books/:id', async(request, response) => {
  try{
    if(
      !request.body.title||
      !request.body.author||
      !request.body.publishYear
    ){
      return response.status(400).send({
        message: 'send all required fields: title, author, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if(!result){
      return response.status(404).json({ message: 'Book not found'});
    }
    return response.status(200).send({ message: 'Book updated successfully' });
  }catch(error){
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});
//route for delete a book

route.delete('/api/books/:id', async (request, response) => {
  try{
   const { id } = request.params;

   const result = await Book.findByIdAndDelete(id);

   if(!result){
    return response.status(400).json({ message: 'book not found'});
   }

   return response.status(200).send({ message: 'Book deleted successfully' });
  }catch(error){
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// MongoDB connection
mongoose.connect(mongoDBURL
)
  .then(() => {
    console.log('App connected to database');
  })
  .catch((error) => {
    console.log(error);
  });

  app.use('/myroute', route)

// Start the server
// app.listen(PORT, () => {
//   console.log(`App is listening to Port: ${PORT}`);
// });
