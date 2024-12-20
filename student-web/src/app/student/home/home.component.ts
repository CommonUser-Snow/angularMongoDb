import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from'@angular/material/form-field';
import { MatInputModule } from'@angular/material/input';
import { MatIconModule } from'@angular/material/icon';
import { MatButtonModule } from'@angular/material/button';
import { MatTableDataSource, MatTableModule } from'@angular/material/table';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,MatTableModule,
    MatSortModule,MatPaginatorModule,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  displayedColumns: string[] = ['studentId', 'name', 'email', 'gender','edit', 'delete'];
  dataSource = new MatTableDataSource<Student>();
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  constructor(private studentService:StudentService){}
  student:Student={
    studentId:0,
    name:'',
    email:'',
    gender:''
  }
  students:Student[]=[];
  filterStudents:Student[]=[];

  ngAfterViewInit(): void {
      this.studentService.fetchAllStudents().subscribe((data)=>{
        this.students = data;
        this.dataSource = new MatTableDataSource<Student>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }

  searchStudents(input:String){
    this.filterStudents= this.students.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())
  || item.email.toLowerCase().includes(input.toLowerCase())
  || item.gender.toLowerCase().includes(input.toLowerCase()));
  this.dataSource = new MatTableDataSource<Student>(this.filterStudents); 
  }

  addorUpdateStudent(student:Student){
    if(student.studentId !==0){
      this.studentService.updateStudents(student).subscribe({
        next:(data)=>{
          console.log("New Student update Successful");
          window.location.reload();
        }        
      })
    }else{
      this.studentService.createStudents(student).subscribe({
        next:(data)=>{
          console.log("New Student created Successful");
          window.location.reload();
        }        
      })
    }
  }

  populateFormFields(student:Student){
    this.student.studentId = student.studentId;
    this.student.name = student.name;
    this.student.email = student.email;
    this.student.gender = student.gender;
  }

  deleteStudent(id:Number){
    const isConfirmed=window.confirm("Are you sure you wnat to delete");
    if(isConfirmed){
      this.studentService.deleteStudents(id).subscribe((data)=>{
        this.students=this.students.filter(item=>item.studentId!==id);
        window.location.reload();
      })
    }
  }
}
