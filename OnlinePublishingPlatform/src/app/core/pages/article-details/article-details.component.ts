import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDetail } from '../../models/article-detail';
import { Comment } from '../../models/Comment';
import { ArticleService } from 'src/app/shared/services/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {

  article: ArticleDetail | null = null;
  otherArticlesByAuthor: ArticleDetail[] = [];
  relatedArticles: ArticleDetail[] = [];
  comments: Comment[] = [];
  newComment: string = '';
  commentAuthor: string = 'Anonymous';
  sortOption: string = 'newest';

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService) { }

  ngOnInit(): void {
    // Fetch article based on route parameter
    this.route.paramMap.subscribe((params) => {
      const articleId = +params.get('id')!;
      this.loadArticle(articleId);
    });
  }

  loadArticle(articleId: number): void {
    this.article = this.articleService.getArticleById(articleId) || null;

    if (this.article) {
      this.comments = this.getCommentsForArticle(articleId);
      this.sortComments();
      this.getOtherArticlesByAuthor();
      this.getRelatedArticles();
    } else {
      this.router.navigate(['/']); // Redirect to home if article not found
    }
  }

  getOtherArticlesByAuthor(): void {
    if (this.article) {
      this.otherArticlesByAuthor = this.articleService
        .getArticles()
        .filter(
          (article) =>
            article.author === this.article!.author && article.id !== this.article!.id
        );
    }
  }

  getRelatedArticles(): void {
    if (this.article) {
      this.relatedArticles = this.articleService
        .getArticles()
        .filter(
          (article) =>
            article.category === this.article!.category && article.id !== this.article!.id
        );
    }
  }
  navigateToArticle(articleId: number) {
    this.router.navigate(['/article', articleId]);
  }

  getCommentsForArticle(articleId: number): Comment[] {
    const storedComments = localStorage.getItem(`comments_${articleId}`);
    const comments: Comment[] = storedComments ? JSON.parse(storedComments) : [];

    // Ensure `showReplyBox` and `newReply` are initialized
    comments.forEach(comment => {
      comment.showReplyBox = false;
      comment.newReply = '';
      comment.replies.forEach(reply => {
        reply.showReplyBox = false;
        reply.newReply = '';
      });
    });

    return comments;
  }

  addComment(parentCommentId: number | null = null) {
    if (!this.newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: this.commentAuthor || 'Anonymous',
      text: this.newComment.trim(),
      date: new Date(),
      likes: 0,
      replies: [],
      showReplyBox: false,
      newReply: '',
    };

    if (parentCommentId) {
      const parentComment = this.findCommentById(parentCommentId);
      if (parentComment) {
        parentComment.replies.push(comment); // Push reply into parent comment's replies
      }
    } else {
      this.comments.push(comment); // Add as a top-level comment
    }

    this.newComment = '';
    this.saveComments();
    this.sortComments(); // Reapply sorting
  }

  likeComment(commentId: number) {
    const comment = this.findCommentById(commentId);
    if (comment) comment.likes++;
    this.saveComments();
    this.sortComments(); // Reapply sorting
  }

  sortComments() {
    if (this.sortOption === 'newest') {
      this.comments.sort((a, b) => b.date.getTime() - a.date.getTime());
    } else if (this.sortOption === 'oldest') {
      this.comments.sort((a, b) => a.date.getTime() - b.date.getTime());
    } else if (this.sortOption === 'mostLiked') {
      this.comments.sort((a, b) => b.likes - a.likes);
    }
  }

  findCommentById(commentId: number): Comment | null {
    const traverse = (comments: Comment[]): Comment | null => {
      for (const comment of comments) {
        if (comment.id === commentId) return comment;
        const foundReply = traverse(comment.replies);
        if (foundReply) return foundReply;
      }
      return null;
    };
    return traverse(this.comments);
  }

  saveComments() {
    if (this.article) {
      localStorage.setItem(`comments_${this.article.id}`, JSON.stringify(this.comments));
    }
  }

  replyToComment(parentCommentId: number) {
    // Pre-fill the comment box to indicate a reply
    const parentComment = this.findCommentById(parentCommentId);
    if (parentComment) {
      this.newComment = `@${parentComment.author} `;
      // this.focusCommentBox();
    }
  }

  toggleReplyBox(commentId: number) {
    const comment = this.findCommentById(commentId);
    if (comment) {
      comment.showReplyBox = !comment.showReplyBox;
    }
  }

  addReply(parentCommentId: number, replyText: string) {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: Date.now(),
      author: this.commentAuthor || 'Anonymous',
      text: replyText.trim(),
      date: new Date(),
      likes: 0,
      replies: [],
      showReplyBox: false,
      newReply: '', // Used for nested reply input
    };

    const parentComment = this.findCommentById(parentCommentId);
    if (parentComment) {
      parentComment.replies.push(reply); // Add reply to the parent comment's replies
      parentComment.showReplyBox = false; // Hide reply box after posting
    }

    this.saveComments();
  }

}
