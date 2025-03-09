import { Component, OnInit } from '@angular/core';

import { Tarea, TareaService } from '../../services/tarea.service';
import { AppMaterialModule } from '../../app.material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarea',
  standalone: true,
  imports: [AppMaterialModule, CommonModule, FormsModule],
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {
  tareas: Tarea[] = [];
  newTarea: Tarea = { description: '', completed: false };

  constructor(private tareaService: TareaService) {}

  ngOnInit(): void {
    this.loadTareas();
  }

  loadTareas(): void {
    this.tareaService.getTareas().subscribe(tareas => this.tareas = tareas);
  }

  addTarea(): void {
    this.tareaService.createTarea(this.newTarea).subscribe(tarea => {
      this.tareas.push(tarea);
      this.newTarea = { description: '', completed: false };
    });
  }

  updateTarea(tarea: Tarea): void {
    this.tareaService.updateTarea(tarea).subscribe();
  }

  deleteTarea(id: number): void {
    this.tareaService.deleteTarea(id).subscribe(() => {
      this.tareas = this.tareas.filter(tarea => tarea.id !== id);
    });
  }
}
