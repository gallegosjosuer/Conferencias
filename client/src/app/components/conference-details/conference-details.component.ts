import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConferenceService } from '../../services/conference.service';
import { Conference } from '../../models/conference.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-conference-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatDialogActions,
    MatDialogClose,
  ],
  providers: [ConferenceService],
  templateUrl: './conference-details.component.html',
  styleUrl: './conference-details.component.css',
})
export class ConferenceDetailsComponent {
  public newConference: Conference;
  public disabled = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.newConference = new Conference();
    console.log('ACTION: ', this.data.action);
    console.log('DATA: ', this.data.conference);
    this.disabled = this.data.action == 0 ? true : false;
  }

  addConference() {
    console.log(this.data);
  }

  updateConference() {
    console.log(this.data);
  }

  deleteConference() {
    console.log(this.data);
  }
}
