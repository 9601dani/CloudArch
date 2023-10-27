import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChangesVService {
  Opcion!: string;

  constructor(private httpClient: HttpClient) { }
}
