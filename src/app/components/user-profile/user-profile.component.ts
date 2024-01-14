import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {


  userForm!: FormGroup;
  imagePerview: string = "";
  isFormChanged = false;

  private authService = inject(AuthService)

  ngOnInit() {
    this.formInit(); // init form
    this.userForm.valueChanges.subscribe(() => {
      this.isFormChanged = true;
    });
   }

  formInit() {
    this.userForm = new FormGroup({ // form init
      displayName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl(),
      aboutYourSelf: new FormControl('',Validators.maxLength(100)),
      interests: new FormControl(),
      userType: new FormControl('student'),
      userExpreince: new FormControl(),
      expertise: new FormControl(),
      role: new FormControl('',Validators.maxLength(100)),
      photo: new FormControl()
    })
  }

  onFileChange(event: any) {
    const file = event?.target?.files[0]; // get the selected image
    if (file) {
      this.imagePerview = URL.createObjectURL(file); // create a preview image
    }
    this.userForm.patchValue({ photo: file }); // update form value
    this.userForm.get('photo')?.updateValueAndValidity(); // update form

  }
  onSubmit() {
    console.log(this.userForm.value);

    const userFormData = new FormData();
    Object.keys(this.userForm.value).forEach(key => {
      userFormData.append(key, this.userForm.value[key]);
    })
    if (this.imagePerview) {
      userFormData.append('photo', this.imagePerview);
    }
     this.authService.signup(userFormData).subscribe({
       next: (data) => {
         console.log(data);
       },
       error: (error) => {
         console.log(error);
       }
     })

  }



}
