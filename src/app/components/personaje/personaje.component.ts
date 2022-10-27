import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css'],
})
export class PersonajeComponent implements OnInit {
  // ------------------------------------------------------------------- //
  public idPersonaje: number;
  public personaje: any;
  public peliculas: Array<any>;

  // ------------------------------------------------------------------- //
  constructor(private http: HttpClient) {
    this.idPersonaje = 1;
    this.peliculas = [];
    this.personaje = null;
  }

  // ------------------------------------------------------------------- //
  public siguiente = (): void => {
    this.personaje = null;
    this.peliculas = [];
    if (this.idPersonaje < 10) {
      this.idPersonaje++;
    } else {
      this.idPersonaje = 1;
    }
    this.cargarPersonaje();
  };

  // ------------------------------------------------------------------- //
  public anterior = (): void => {
    this.personaje = null;
    this.peliculas = [];
    if (this.idPersonaje > 1) {
      this.idPersonaje--;
    } else {
      this.idPersonaje = 10;
    }
    this.cargarPersonaje();
  };

  // ------------------------------------------------------------------- //
  public obtenerPeliculas = (film: any) => {
    this.http.get(film).subscribe({
      next: (res) => {
        this.peliculas.push(res);
      },
      error: (e) => {
        console.log(e);
      },
    });
  };

  // ------------------------------------------------------------------- //
  public cargarPersonaje = (): void => {
    this.http
      .get('https://swapi.dev/api/people/' + this.idPersonaje + '/?format=json')
      .subscribe({
        next: (res) => {
          this.personaje = res;
          this.personaje.films.forEach((film: any) => {
            this.obtenerPeliculas(film);
          });
        },
        error: (e) => {
          this.personaje = null;
          console.log(e);
        },
      });
  };

  // ------------------------------------------------------------------- //
  ngOnInit(): void {
    this.cargarPersonaje();
  }
}
