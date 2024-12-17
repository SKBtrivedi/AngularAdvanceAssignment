import { SafeHtml } from "@angular/platform-browser";

export interface ArticleDetail {
    id: number;
    title: string;
    description: string;
    content: string| SafeHtml;
    thumbnail: string;
    author: string;
    authorBio: string;
    publishDate: Date;
    category: string; 
    draft?: boolean;
    scheduledDate?: Date;
    tags?: string[];
  
  }