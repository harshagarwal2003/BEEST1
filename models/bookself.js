//create mode using schema in mongoose

import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: true,
        },
        publicationYear: {
           type: Number,
           required: true,

        },
        ISBN: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)


export const Book = mongoose.model('animal', bookSchema);