import { Component } from '@angular/core';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.html',
  styleUrl: './student-info.css',
  standalone: false
})
export class StudentInfo {
  studentId: string = "K234111388";
  studentName: string = "Trương Nguyệt Hà";
}