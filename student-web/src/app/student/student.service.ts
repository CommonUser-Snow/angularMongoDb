import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private _httpClient:HttpClient) { }

  baseUrl:String = "/api/v1/students";

  fetchAllStudents():Observable<Student[]>{
    return this._httpClient.get<Student[]>(`${this.baseUrl}`);
  }

  createStudents(data:Student){
    return this._httpClient.post<Student>(`${this.baseUrl}`,data);
  }

  updateStudents(data:Student){
    return this._httpClient.put<Student>(`${this.baseUrl}/${data.studentId}`,data);
  }

  deleteStudents(id:Number){
    return this._httpClient.delete<Student>(`${this.baseUrl}/${id}`);
  }
}
