import { Injectable } from '@angular/core';
import { ArticleDetail } from 'src/app/core/models/article-detail';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articles: ArticleDetail[] = [
    {
      id: 1,
      title: 'Understanding Angular Directives',
      description: 'A comprehensive guide to Angular directives.',
      content:
        'Angular directives are a core building block for creating dynamic web applications. In this article, we cover structural and attribute directives with examples.',
      thumbnail: '/assets/images/angulardirective.jpg',
      author: 'John Doe',
      authorBio: 'John Doe is a senior Angular developer with 10 years of experience.',
      publishDate: new Date('2024-11-01'),
      category: 'latest',
    },
    {
      id: 2,
      title: 'Top 10 JavaScript Frameworks in 2024',
      description: 'An overview of the most popular JavaScript frameworks.',
      content:
        'In 2024, JavaScript remains a dominant language in web development. Explore the top frameworks like Angular, React, Vue, and more, and learn why they are widely adopted.',
      thumbnail: '/assets/images/top-10-javascript-frameworks.jpg',
      author: 'John Doe',
      authorBio: 'Jane Smith is a JavaScript enthusiast and tech writer.',
      publishDate: new Date('2024-10-28'),
      category: 'popular',
    },
    {
      id: 3,
      title: 'Editor’s Picks: Building Responsive UIs',
      description: 'Tips and tricks for building responsive web applications.',
      content:
        'Building responsive UIs is a critical skill in modern web development. Learn about CSS grid, flexbox, and media queries to create layouts that adapt seamlessly.',
      thumbnail: '/assets/images/responsiveUi.jpg',
      author: 'Alice Johnson',
      authorBio: 'Alice Johnson is a UI/UX designer and frontend developer.',
      publishDate: new Date('2024-10-15'),
      category: 'editor',
    },
    {
      id: 4,
      title: 'A Beginner’s Guide to TypeScript',
      description: 'Why TypeScript is essential for modern JavaScript development.',
      content: 'In 2024, JavaScript remains a dominant language...',
      thumbnail: '/assets/images/beginnertypescript.jpg',
      author: 'Alice Johnson',
      authorBio: 'John Doe is a senior Angular developer with 10 years of experience.',
      publishDate: new Date('2024-10-10'),
      category: 'latest',
    },
    {
      id: 5,
      title: 'Exploring RxJS in Angular',
      description: 'How to handle reactive programming with RxJS in Angular.',
      content: 'In 2024, JavaScript remains a dominant language...',
      thumbnail: '/assets/images/rxjx2',
      author: 'Robert Downey Jr.',
      authorBio: 'John Doe is a senior Angular developer with 10 years of experience.',
      publishDate: new Date('2024-10-05'),
      category: 'popular',
    },
    {
      id: 6,
      title: 'Effective State Management in Angular',
      description: 'A deep dive into NgRx and alternatives for state management.',
      content: 'In 2024, JavaScript remains a dominant language...',
      thumbnail: '/assets/images/State-Management.jpg',
      author: 'Scarlett Johansson',
      authorBio: 'John Doe is a senior Angular developer with 10 years of experience.',
      publishDate: new Date('2024-10-01'),
      category: 'editor',
    },
    {
      id: 7,
      title: 'Optimizing Angular Performance',
      description: 'Tips to make your Angular apps faster and more efficient.',
      content: 'In 2024, JavaScript remains a dominant language...',
      thumbnail: '/assets/images/angularPerform.jpg',
      author: 'Scarlett Johansson',
      authorBio: 'John Doe is a senior Angular developer with 10 years of experience.',
      publishDate: new Date('2024-09-25'),
      category: 'latest',
    },
    {
      id: 8,
      title: 'Understanding Dependency Injection',
      description: 'How dependency injection works in Angular and why it’s powerful.',
      content: 'In 2024, JavaScript remains a dominant language...',
      thumbnail: '/assets/images/dependency.jpg',
      author: 'Robert Downey Jr.',
      authorBio: 'John Doe is a senior Angular developer with 10 years of experience.',
      publishDate: new Date('2024-09-20'),
      category: 'popular',
    },
    {
      id: 9,
      title: 'Mastering Angular Forms',
      description: 'Everything you need to know about reactive and template-driven forms.',
      content: 'In 2024, JavaScript remains a dominant language...',
      thumbnail: '/assets/images/maxresdefault.jpg',
      author: 'Natalie Portman',
      authorBio: 'John Doe is a senior Angular developer with 10 years of experience.',
      publishDate: new Date('2024-09-15'),
      category: 'editor',
    },
    {
      id: 10,
      title: 'Building Progressive Web Apps with Angular',
      description: 'How to use Angular to create fast and reliable PWAs.',
      content: 'In 2024, JavaScript remains a dominant language...',
      thumbnail: '/assets/images/progressive web app.jpg',
      author: 'Natalie Portman',
      authorBio: 'John Doe is a senior Angular developer with 10 years of experience.',
      publishDate: new Date('2024-09-10'),
      category: 'latest',
    },
    
  ];

  getArticles(): ArticleDetail[] {
    return this.articles;
  }

  addArticle(article: ArticleDetail): void {
    this.articles.push(article);
  }

  getArticleById(id: number): ArticleDetail | undefined {
    return this.articles.find((article) => article.id === id);
  }

}
