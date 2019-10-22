import { Author } from './Author';
import { Format } from './Format';

export class Book1{
    id: number;
    title: string;
    authors: Author[]=[];
    subjects: string[]=[];
    bookshelves: string[]=[];
    languages: string[]=[];
    copyright: boolean;
    media_type: string;
    formats:Format;
    download_count: number
  }