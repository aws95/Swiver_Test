import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
    providedIn: "root"
})
export class DataService {
    private REST_API_SERVER = "https://jsonplaceholder.typicode.com/todos";

    constructor(private http: HttpClient) { }

    GetData() {
        return this.http.get(`${this.REST_API_SERVER}`);
    }
}
