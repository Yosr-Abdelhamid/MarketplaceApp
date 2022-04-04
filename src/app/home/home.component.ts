import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductApiService } from '../product-api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public nameForm:FormGroup;

  isDisabled=true ;
  //inspectionList$!:Observable<any[]>;

  inspectionTypesList:any=[];

  sous_famille:string="";
  Reference: string = "";
  Magasin: string = "";
  Prix: string = "";
  description?:string;
 
  loading = false;
    errorMessage = '';
  
  constructor(private productapi:ProductApiService , private formBuilder: FormBuilder ,private sanitizer: DomSanitizer) { 
    this.nameForm = this.formBuilder.group({
      Reference: '' , sous_famille:'' ,Magasin:''
    });
    
  }
  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
}
  
  public getRepos() {
    this.loading = true;
    this.errorMessage = '';
    this.productapi.getInspectionList(this.Reference)
        .subscribe((response) => {this.inspectionTypesList = response;},
                   (error) => {
                       this.errorMessage = error.message; this.loading = false; 
                    },
                    () => {this.loading = false;})

}

testevent(){

  this.Reference=this.nameForm.get('Reference')?.value;
  this.sous_famille=this.nameForm.get('sous_famille')?.value;
  this.Magasin=this.nameForm.get('Magasin')?.value;


  if((this.Reference != '')&& (this.sous_famille != '')&&(this.Magasin  != '')) {
    this.isDisabled = false ;
    this.getRepos() ;


  }
}

  ngOnInit(): void {
    
  }

  
}


