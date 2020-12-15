import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user!: User;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private location: Location
              ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    var $idn:number = 0;
    if(id)
      $idn = parseInt(id, 10);
    this.userService.getUser($idn)
      .subscribe(user => this.user = user);
  }
}
