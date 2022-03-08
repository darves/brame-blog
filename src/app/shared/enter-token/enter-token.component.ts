import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppUserService } from 'src/app/app-user.service';

@Component({
  selector: 'app-enter-token',
  templateUrl: './enter-token.component.html',
  styleUrls: ['./enter-token.component.scss']
})
export class EnterTokenComponent implements OnInit {

  form = new FormGroup({
    token: new FormControl('', [Validators.required, Validators.pattern(/^9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN$/)])
  })

  constructor(public dialogRef: MatDialogRef<EnterTokenComponent>, private appUserService: AppUserService) { }

  ngOnInit(): void {
  }

  onSubmitClick() {
    this.appUserService.setToken(this.form.value.token);
    this.dialogRef.close();
  }
}
