import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTable } from '@angular/material';

@Component({
  selector: 'app-wireframe',
  templateUrl: './wireframe.component.html',
  styleUrls: ['./wireframe.component.scss']
})
export class WireframeComponent implements OnInit {

  displayedColumns: string[] = ['task', 'date', 'user', 'important', 'action']

  constructor(private http: HttpClient) { }

  taskData : any;
  userData : any;

  dataSource = [];

  @ViewChild(MatTable, {static: true}) table!: MatTable<any>;
  
  ngOnInit() {
    this.getTasks();
    this.getUser();
  }

  isHighlighted: boolean = false;

  toggleHighlight(): void {
    this.isHighlighted = !this.isHighlighted;
  }

  usertasks(form: NgForm){
    console.log(form.value);
  }

  getTasks(){
    this.http.get('http://localhost:3000/thoughti/api/tasks')
    .subscribe(post => {
      this.taskData = post;
      // console.log
      this.dataSource = this.taskData;
    })
  }

  getUser(){
    this.http.get('http://localhost:3000/thoughti/api/users')
    .subscribe(post => {
      this.userData = post;
    })
  }

  deleteTask(task: any) {
    this.http.delete(`http://localhost:3000/thoughti/api/delete/` + task.Task)
      .subscribe(res => {
        console.log(res);
        // Remove the deleted task from the data source
        const index = this.dataSource.findIndex(e => e.Task === task.Task);
        this.dataSource.splice(index, 1);
        // Refresh the table view
        this.table.renderRows();
      });
  }

  removeTask(task: any) {
    const index = this.dataSource.indexOf(task);
    if (index > -1) {
      this.dataSource.splice(index, 1);
    }
  }

}
