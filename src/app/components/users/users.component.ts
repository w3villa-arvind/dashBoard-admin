import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  isGridView: boolean = false;
  isNewUser: boolean = false;
  registrationForm!: FormGroup;
  editOrDeleteElement:boolean = false;
  getUserDetails: UserData[] = [];
  userIndex:number = NaN;
  userId:number = NaN;
  buttonType:string ='';
  editUserId:number = NaN

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setForm();
   this.callUserDetails()
  }
  callUserDetails(){
    let getUserDetailsString = localStorage.getItem('userDetails')
    this.getUserDetails = getUserDetailsString ? JSON.parse(getUserDetailsString): [];
  }
  setForm() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.registrationForm.valid) {

     if(this.buttonType =='edit'){
      this.editUserData(this.editUserId);
     }
     else{
      let userDetailsString = localStorage.getItem('userDetails');
      let userDetails: UserData[] = userDetailsString ? JSON.parse(userDetailsString): [];
      this.userId = userDetails.length+1;
      let users = {
        id: this.userId,
        firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        role: this.registrationForm.value.role,
        department: this.registrationForm.value.department,
        email: this.registrationForm.value.email,
        phone: this.registrationForm.value.phone,
        address: this.registrationForm.value.address,
        confirmPassword: this.registrationForm.value.confirmPassword,
        password: this.registrationForm.value.password,
      };
      let newUserDetails = { ...users };
      userDetails.push(newUserDetails);
      localStorage.setItem('userDetails', JSON.stringify(userDetails));

     }
      this.callUserDetails();
      this.isNewUser = false;
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }

  viewGridMode(value: string) {
    this.isGridView = value == 'true' ? true : false;
  }
  newUser() {
    this.isNewUser = true;
  }
  cancalNewUser() {
    this.isNewUser = false;
  }
  editOrDelete(index:number){
  this.editOrDeleteElement = true;
  this.userIndex = index;
  }

  getUserData(): UserData[] {
    const storedData = localStorage.getItem('userDetails');
    return storedData ? JSON.parse(storedData) : [];
  }

  editUserDataById(id: number, newData: UserData): void {
    let userData = this.getUserData();
    const index = userData.findIndex(user => user.id === id);
    if (index !== -1) {
      const updatedUserData = { ...userData[index], ...newData };
      userData[index] = updatedUserData;
      localStorage.setItem('userDetails', JSON.stringify(userData));
    }
  }
  
  editButton(userdataDetails:UserData,type:string){
    this.registrationForm.patchValue(userdataDetails);
    this.editUserId = userdataDetails.id;
    this.buttonType = type;
    this.isNewUser = true;
  }
  editUserData(userId: number): void {
    const newData: UserData = {
      id: userId,
      firstName: this.registrationForm.value.firstName,
        lastName: this.registrationForm.value.lastName,
        role: this.registrationForm.value.role,
        department: this.registrationForm.value.department,
        email: this.registrationForm.value.email,
        phone: this.registrationForm.value.phone,
        address: this.registrationForm.value.address,
        confirmPassword: this.registrationForm.value.confirmPassword,
        password: this.registrationForm.value.password,
    };
    this.editUserDataById(userId, newData);
  }

  deleteUserDataById(id: number): void {
    let userData = this.getUserData();
    userData = userData.filter(user => user.id !== id);
    console.log(userData,'aaa')
    localStorage.setItem('userDetails', JSON.stringify(userData));
    this.callUserDetails();
  }
}
