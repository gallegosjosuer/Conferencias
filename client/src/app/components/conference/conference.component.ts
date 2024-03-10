import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Conference } from '../../models/conference.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ConferenceService } from '../../services/conference.service';
import { ConferenceDetailsComponent } from '../conference-details/conference-details.component';

@Component({
  selector: 'app-conference',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule,
  ],
  providers: [ConferenceService],
  templateUrl: './conference.component.html',
  styleUrl: './conference.component.css',
})
export class ConferenceComponent {
  displayedColumns: string[] = ['titulo', 'descripcion', 'lugares', 'fechas'];
  public conferencesDataSource: MatTableDataSource<any>;

  constructor(
    private conferenceService: ConferenceService,
    public dialog: MatDialog
  ) {
    this.conferencesDataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.conferenceService.getConferences(1, 100).subscribe(
      (result) => {
        let conferences = [result];

        this.conferencesDataSource = new MatTableDataSource(conferences);
        this.conferencesDataSource = this.conferencesDataSource.filteredData[0];

        console.log(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  seeDetails(row: Conference) {
    this.dialog.open(ConferenceDetailsComponent, {
      data: { action: 0, conference: row },
    });
  }

  saveConference() {
    this.dialog.open(ConferenceDetailsComponent, {
      data: {
        action: 1,
        conference: {
          _id: null,
          title: null,
          description: null,
          schedules: [],
        },
      },
    });
  }
}
