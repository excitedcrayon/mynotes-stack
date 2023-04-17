import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { WebRequestService } from 'src/app/web-request.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{

  notesCollection: any;
  currentNote: any;
  formattedDate: any;

  constructor(private webRequest: WebRequestService, private activatedRoute: ActivatedRoute){}

  ngOnInit(){
    this.getCurrentNote();
    this.getNotes();
  }

  getCurrentNote(){
    try{
      this.activatedRoute.params.subscribe((params: Params) => {
        this.webRequest.getSingleNote('notes', params['id']).subscribe((response: any) => {
          this.currentNote = response;
          this.formattedDate = new Date(this.currentNote.dateCreated).toLocaleString();
        });
      });
    }catch(error){}
  }

  getNotes(){
    return this.webRequest.getNotes('notes').subscribe((response: any) => {
      this.notesCollection = response;
    });
  }
}
