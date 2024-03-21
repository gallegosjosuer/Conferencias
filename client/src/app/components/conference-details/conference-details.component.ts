import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConferenceService } from '../../services/conference.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Conference } from '../../models/conference.model';

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
    HttpClientModule,
  ],
  providers: [ConferenceService],
  templateUrl: './conference-details.component.html',
  styleUrl: './conference-details.component.css',
})
export class ConferenceDetailsComponent {
  public conference;
  public newTitle = '';
  public newDescription = '';
  public newAvailableSpots = '';
  public newSpeaker = '';
  public newPlace = '';
  public newDate = '';
  public newStart = '';
  public newEnd = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private conferenceService: ConferenceService,
    private dialogRef: MatDialogRef<ConferenceDetailsComponent>
  ) {
    this.conference = data.conference;
    console.log('ACTION: ', this.data.action);
    console.log('DATA: ', this.conference);

    if (this.data.action == 0 || this.data.action == 3) this.disableForm();
  }

  disableForm() {
    // TODO
  }

  addConference() {
    let newConference: Conference = new Conference();

    newConference.title = this.newTitle;
    newConference.description = this.newDescription;
    newConference.availableSpots = this.newAvailableSpots;
    newConference.attendees = new Array();
    newConference.schedules[0] = {
      date: this.newDate,
      start: this.newStart,
      end: this.newEnd,
      place: this.newPlace,
      speaker: this.newSpeaker,
    };

    this.conferenceService.addConference(newConference).subscribe(
      (result) => {
        this.dialogRef.close();
        alert('Conferencia insertada');
        window.location.reload();
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateConference() {
    this.conferenceService
      .updateConference(this.conference._id, this.conference)
      .subscribe(
        (result) => {
          this.dialogRef.close();
          alert('Conferencia actualizada');
          window.location.reload();
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteConference() {
    this.conferenceService.deleteConference(this.conference._id).subscribe(
      (result) => {
        this.dialogRef.close();
        alert('Conferencia eliminada');
        window.location.reload();
        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  formatDate(date: string) {
    if (date == '') return '-';

    let meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    let mes = parseInt(date.substring(5, 7)) - 1;
    let newDate = `${date.substring(8)} de
                  ${meses[mes]} del
                  ${date.substring(0, 4)}`;

    return newDate;
  }
}
