import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() repo:any;
  @Input() i:number;
  @Input() repoIndex:number;
  @Input() issues:any[];
  @Input() searchOpenedIssues:any;

}
