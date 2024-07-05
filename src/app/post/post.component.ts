import {Component, inject, OnInit} from '@angular/core';
import { HttpClient} from "@angular/common/http";
import {PostService} from "../services/post.service";


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})

export class PostComponent implements OnInit {

  private postService = inject(PostService);
  contacts: any = [];
  userId = 'eeb9f898-e75e-4e28-bdbe-4c77bce549c1';

  ngOnInit(): void {
    //this.fetchPost();
    //this.loadPosts();
    this.loadFriends();

  }

  loadFriends() {
    this.postService.getAllFriends(this.userId).subscribe({
      next: (contacts: any) => {
      this.contacts = contacts;
      },
      error: (error) => console.log('Error Message: ', error)
    });
  }

  /*
  loadPosts() {
    this.postService.getPost().subscribe({
      next: (posts: any) => {
        this.posts = posts;
        console.log('Lick MY Pussy');
      },
      error: (error) => console.log('Fuck My Pussy', error)
    });
  }
  */

  /*
  loadPosts() {
    this.postService.getPost().subscribe((posts: any) => {
      console.log(posts);
      this.posts = posts;
    });
  }
  */

  /*
  fetchPost() {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((posts: any) => {
        console.log(posts);
        this.posts = posts;
    });
  }
  */
}
