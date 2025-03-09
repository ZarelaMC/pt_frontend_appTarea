import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TareaComponent } from '../app/components/tarea/tarea.component';
import { TareaService } from '../app/services/tarea.service';
import { of } from 'rxjs';
import { Tarea } from '../app/services/tarea.service';
import { FormsModule } from '@angular/forms';

// Mock del servicio TareaService
class MockTareaService {
  getTareas() {
    return of([
      { id: 1, description: 'Tarea 1', completed: false },
      { id: 2, description: 'Tarea 2', completed: true },
    ]);
  }

  createTarea(tarea: Tarea) {
    return of({ id: 3, ...tarea });
  }

  updateTarea(tarea: Tarea) {
    return of(tarea);
  }

  deleteTarea(id: number) {
    return of({});
  }
}

describe('TareaComponent', () => {
  let component: TareaComponent;
  let fixture: ComponentFixture<TareaComponent>;
  let tareaService: TareaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Importa el componente standalone en el array "imports"
      imports: [FormsModule, TareaComponent], // Importa FormsModule para manejar formularios
      providers: [
        { provide: TareaService, useClass: MockTareaService }, // Usa el mock del servicio
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TareaComponent);
    component = fixture.componentInstance;
    tareaService = TestBed.inject(TareaService); // Obtiene una instancia del servicio
    fixture.detectChanges(); // Detecta cambios iniciales
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tareas on init', () => {
    // Llama a ngOnInit manualmente
    component.ngOnInit();

    // Verifica que las tareas se carguen correctamente
    expect(component.tareas.length).toBe(2);
    expect(component.tareas[0].description).toBe('Tarea 1');
    expect(component.tareas[1].description).toBe('Tarea 2');
  });

  it('should add a new tarea', () => {
    // Simula una nueva tarea
    component.newTarea = { description: 'Nueva Tarea', completed: false };

    // Llama al método para agregar una tarea
    component.addTarea();

    // Verifica que la tarea se haya agregado correctamente
    expect(component.tareas.length).toBe(3);
    expect(component.tareas[2].description).toBe('Nueva Tarea');
    expect(component.newTarea.description).toBe(''); // Verifica que el formulario se haya reseteado
  });

  it('should update a tarea', () => {
    // Simula una tarea existente
    const tareaToUpdate = { id: 1, description: 'Tarea 1 Actualizada', completed: true };

    // Convierte el método updateTarea en un spy
    spyOn(tareaService, 'updateTarea').and.callThrough();
    
    // Llama al método para actualizar la tarea
    component.updateTarea(tareaToUpdate);

    // Verifica que el servicio haya sido llamado
    expect(tareaService.updateTarea).toHaveBeenCalledWith(tareaToUpdate);
  });

  it('should delete a tarea', () => {
    // Simula el ID de una tarea a eliminar
    const tareaIdToDelete = 1;

    // Llama al método para eliminar la tarea
    component.deleteTarea(tareaIdToDelete);

    // Verifica que la tarea se haya eliminado correctamente
    expect(component.tareas.length).toBe(1);
    expect(component.tareas[0].id).toBe(2); // Verifica que la tarea con ID 1 se haya eliminado
  });
});