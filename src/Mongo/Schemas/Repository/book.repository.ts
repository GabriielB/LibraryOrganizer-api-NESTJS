/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book } from "../Interfaces/book.interface";
import { BookDTO } from "src/DTO/books.dto";

@Injectable()
export class BookRepository {
    constructor(@InjectModel('book') private readonly bookModel: Model<Book> ){}
    async saveBook(newBook: BookDTO): Promise<Book>{
        const savedBook = new this.bookModel(newBook);
        return await savedBook.save();
    }

    async getAllBooks(): Promise<Book[]>{
        return await this.bookModel.find().exec();
    }

    async getBookById(bookID: string): Promise<Book>{
        return await this.bookModel.findById(bookID);
    }

    async deleteBook(bookID: string): Promise<Book>{
        return await this.bookModel.findOneAndDelete({ _id: bookID});
    }

    async updateBookById(bookID: string, newBook: BookDTO): Promise<Book>{
        return await this.bookModel.findOneAndUpdate({ _id: bookID}, newBook).exec()
    }

    async getBookByAuthorName(authorName: string[]): Promise<Book[]>{
        return await this.bookModel.find({
            $or : [
                {"author.name" : {$in: authorName}},
                {"author.surname": {$in: authorName}}
            ]
        }
        )
    }

    async getBookByName(bookName: string): Promise<Book[]>{
        return await this.bookModel.find({
            name: { '$regex' : bookName, '$options': 'i'}
        })
    }
}

