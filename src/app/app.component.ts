import { Component, OnInit, ElementRef } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'epons-training-videos',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private baseUri: string = 'http://api.sadfm.co.za';
  // private baseUri: string = 'http://localhost:4484';

  public name: string;

  public files: string[] = [];

  public categories: string[] = [];

  constructor(private http: Http, private el: ElementRef) {

  }

  ngOnInit(): void {

    this.name = this.el.nativeElement.getAttribute('name');
    this.load(this.name);
  }

  private load(name: string): void {
    if (name) {
      this.get(`/api/TrainingVideos/List?name=${name}`).map((x) => {

        const json: any = x.json();

        return json;
      }).subscribe((json) => {
        this.files = Object.keys(json);
      });
    } else {
      this.get(`/api/TrainingVideos/ListAll`).map((x) => {

        const json: any = x.json();

        return json;
      }).subscribe((json) => {
        this.categories = json;
      });
    }
  }


  protected post(uri: string, obj: any): Observable<Response> {
    const headers = new Headers();
    headers.append('apikey', '2c0d64c1-d002-45f2-9dc4-784c24e996');

    const jwtToken = localStorage.getItem('jwt.token');

    if (jwtToken !== null || jwtToken === '') {
      headers.append('Authorization', 'Bearer ' + jwtToken);
    }

    return this.http.post(`${this.baseUri}${uri}`, obj, {
      headers,
    });
  }

  protected get(uri: string): Observable<Response> {
    const headers = new Headers();
    headers.append('apikey', '2c0d64c1-d002-45f2-9dc4-784c24e996');

    const jwtToken = localStorage.getItem('jwt.token');

    if (jwtToken !== null || jwtToken === '') {
      headers.append('Authorization', 'Bearer ' + jwtToken);
    }

    return this.http.get(`${this.baseUri}${uri}`, {
      headers,
    });
  }
}
