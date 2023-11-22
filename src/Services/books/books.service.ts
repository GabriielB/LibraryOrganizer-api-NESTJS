import { BadRequestException, Injectable } from '@nestjs/common';
import { BookDTO } from 'src/DTO/books.dto';
import { Book } from 'src/Mongo/Schemas/Interfaces/book.interface';
import { BookRepository } from 'src/Mongo/Schemas/Repository/book.repository';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BookRepository) {}

  async saveBook(newBook: BookDTO): Promise<Book> {
    return await this.bookRepository.saveBook(newBook);
  }

  async getAllBooks(): Promise<Book[]> {
    const allBooks = await this.bookRepository.getAllBooks();
    if (allBooks.length == 0) {
      throw new BadRequestException('There are no books registered yet');
    }
    return allBooks;
  }

  async getBookById(bookID: string): Promise<Book> {
    try {
      return await this.bookRepository.getBookById(bookID);
    } catch (e) {
      throw new BadRequestException('There are no results', e);
    }
  }

  async deleteBook(bookID: string): Promise<Book> {
    try {
      const existBook = await this.bookRepository.deleteBook(bookID);
      if (!existBook) {
        throw new BadRequestException('This Book does not exists');
      }
      return existBook;
    } catch (e) {
      throw new BadRequestException('This Book does not exists', e);
    }
  }

  async updateBookById(bookID: string, newBook: BookDTO): Promise<Book> {
    const existBook = await this.bookRepository.getBookById(bookID);
    if (!existBook) {
      throw new BadRequestException('There are no results with this id');
    }
    const updatedBook = await this.bookRepository.updateBookById(
      bookID,
      newBook,
    );
    if (updatedBook) {
      return this.bookRepository.getBookById(bookID);
    }
  }

  async getBookByAuthorName(authorName: string): Promise<Book[]> {
    const splitedAuthorName = authorName.split(' ');
    const foundBooks =
      await this.bookRepository.getBookByAuthorName(splitedAuthorName);

    if (!foundBooks.length) {
      throw new BadRequestException('No results for this autor');
    }
    return foundBooks;
  }

  async getBookByName(bookName: string): Promise<Book[]> {
    const foundBooks = await this.bookRepository.getBookByName(bookName);

    if (!foundBooks.length) {
      throw new BadRequestException('No results for this autor');
    }
    return foundBooks;
  }
}
