import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppMaterialModule } from '../app.material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TareaComponent } from '../components/tarea/tarea.component';


@Component({
  selector: 'app-index',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AppMaterialModule, FormsModule, CommonModule, TareaComponent],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
