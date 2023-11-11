import { Injectable } from "@angular/core";
import { Orderable } from "../model/orderable.model";


@Injectable({
    providedIn: 'root'
  })
  export class ArrayService {
  
    public reorderArray(input: Orderable[]): Orderable[]{
        for (let i = 0; i < input.length; i++) {
            input[i].order = i;
        }
        return input;
    }
    

  }