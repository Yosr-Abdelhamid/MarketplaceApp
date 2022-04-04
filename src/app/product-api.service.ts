import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  baseURL ="https://localhost:7147/api/Produit/"

constructor(private http:HttpClient) { }

getInspectionList(Reference: string): Observable<any[]> {
 
 
  let params = new HttpParams()
          .set('reference', Reference)

  console.log(params.toString());

  return this.http.get<any[]>(this.baseURL + 'SearchProduitAsync', {params});
}

}