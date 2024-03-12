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
    console.log(this.data);
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
}
