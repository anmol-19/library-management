import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable({
    providedIn: 'root'
})

export class backendService {
    constructor(private http:HttpClient){}

    getBook():Observable<any>{
        return this.http.get('http://localhost:3000/book');
    }

    getOneBook(id:Number):Observable<any>{
        return this.http.get(`http://localhost:3000/book/${id}`);
    }

    createBook(name:any,author:any,price:any){
        return this.http.post<any>('http://localhost:3000/book',
         {name,author,price},{responseType: 'text' as 'json'});
    }

    updateBook(id:any,name:any,author:any,price:any){
        return this.http.patch<any>(`http://localhost:3000/book/${id}`,
        {name,author,price},{responseType: 'text' as 'json'})
    }

    deleteOneBook(id:number){
        return this.http.delete(`http://localhost:3000/book/${id}`,
        {responseType: 'text' as 'json'});
    }
}