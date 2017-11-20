import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-open-issues',
  templateUrl: './open-issues.component.html',
  styleUrls: ['./open-issues.component.css']
})
export class OpenIssuesComponent implements OnInit {
    // This component lists the Open Issues

  constructor() { }

  ngOnInit() {
  }
  @Input() issues;
  @Input() repo;

}