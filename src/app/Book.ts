import { Author } from './Author';

export class Book1{
    id: number;
    title: string;
    authors: Author[]=[];
    subjects: string[]=[];
    bookshelves: string[]=[];
    languages: string[]=[];
    copyright: boolean;
    media_type: string;
    formats:string[]=[];
    download_count: number
  }