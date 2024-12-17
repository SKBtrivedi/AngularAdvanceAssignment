import { Component } from '@angular/core';
import { Author } from '../../models/author';

@Component({
  selector: 'app-author-directory',
  templateUrl: './author-directory.component.html',
  styleUrls: ['./author-directory.component.scss']
})
export class AuthorDirectoryComponent {

  authors: Author[] = [
    {
      id: 1,
      name: 'John Doe',
      bio: 'John Doe is a senior Angular developer with 10 years of experience.',
      profilePicture: '/assets/images/johndoe.jpg',
      articles: [1]
    },
    {
      id: 2,
      name: 'Alice Johnson',
      bio: 'Alice Johnson is a UI/UX designer and frontend developer.',
      profilePicture: '/assets/images/alice-johnson.jpg',
      articles: [3]
    },
    {
      id: 3,
      name: 'Robert Downey Jr.',
      bio: 'Robert is passionate about building scalable web applications.',
      profilePicture: '/assets/images/robert.jpg',
      articles: [5]
    },
    {
      id: 4,
      name: 'Scarlett Johansson',
      bio: 'Robert is passionate about building scalable web applications.',
      profilePicture: '/assets/images/Scarlett.jpg',
      articles: [6]
    },
    {
      id: 5,
      name: 'Natalie Portman',
      bio: 'Robert is passionate about building scalable web applications.',
      profilePicture: '/assets/images/natalie.jpg',
      articles: [9]
    }
  ];

  // Search Term and Filtered Authors
  searchTerm: string = '';
  filteredAuthors: Author[] = [...this.authors];

  // Filter Authors by Name
  filterAuthors(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredAuthors = this.authors.filter(author =>
      author.name.toLowerCase().includes(term)
    );
  }

}
