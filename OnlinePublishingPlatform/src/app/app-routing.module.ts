import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/auth/login/login.component';
import { HomeComponent } from './core/pages/home/home.component';
import { ArticleDetailsComponent } from './core/pages/article-details/article-details.component';
import { AuthorDirectoryComponent } from './core/pages/author-directory/author-directory.component';
import { NewPostComponent } from './core/pages/new-post/new-post.component';
import { MyPostsComponent } from './core/pages/my-posts/my-posts.component';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'article/:id', component: ArticleDetailsComponent, canActivate: [AuthGuard], },
  { path: 'author-directory', component: AuthorDirectoryComponent },
  { path: 'new-post', component: NewPostComponent , canActivate: [AuthGuard], },
  { path: 'my-posts', component: MyPostsComponent ,  canActivate: [AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
