import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Conference } from '../../models/conference.model';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
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
    MatIconModule,
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
      (result: []) => {
        this.conferencesDataSource = new MatTableDataSource(result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.conferencesDataSource.filter = filterValue.trim().toLowerCase();
  }

  seeDetails(row: Conference) {
    this.dialog.open(ConferenceDetailsComponent, {
      data: { action: 0, conference: row },
    });
  }
}
