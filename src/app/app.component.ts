import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  schoolForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.schoolForm = this.fb.group({
      students: this.fb.array([]),
    });
  }

  //! ------------------------Students FormArray----------------------------------------
  students(): FormArray {
    return this.schoolForm.get('students') as FormArray;
  }

  newStudent(): FormGroup {
    return this.fb.group({
      studentName: '',
      rollNo: '',
      Standard: '',
      exams: this.fb.array([]),
    });
  }

  addStudent() {
    this.students().push(this.newStudent());
  }


  //! ------------------------Exams FormArray----------------------------------------
  exams(studentIndex: number): FormArray {
    return this.students().at(studentIndex).get('exams') as FormArray;
  }

  newExam(): FormGroup {
    return this.fb.group({
      examType: '',
      subjects: this.fb.array([]),
    });
  }

  addExam(studentIndex: number) {
    this.exams(studentIndex).push(this.newExam());
  }


  //! ------------------------Subjects FormArray----------------------------------------
  subjects(studentIndex: number, examIndex: number) {
    let students = this.students().at(studentIndex).get('exams') as FormArray;
    return students.at(examIndex).get('subjects') as FormArray;
  }

  newSubject(): FormGroup {
    return this.fb.group({
      subjectName: '',
    });
  }

  addSubject(studentIndex: number, examIndex: number) {
    this.subjects(studentIndex, examIndex).push(this.newSubject());
  }

  //! ------------------------Console FormArray Values---------------------------------------
  onSubmit() {
    console.log(this.schoolForm.value);
  }
}
