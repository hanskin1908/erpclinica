import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacturacionService } from '../../../core/services/facturacion.service';
import { Factura } from '../../../core/models/factura.model';
import { EstadoFactura } from '../../../core/models/EstadoFactura.enum';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@Component({
  selector: 'app-facturacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatProgressBarModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <h2>Facturación</h2>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="facturaForm" (ngSubmit)="saveFactura()">
          <mat-form-field appearance="outline">
            <mat-label>Monto</mat-label>
            <input matInput type="number" formControlName="monto">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Fecha de Emisión</mat-label>
            <input matInput type="date" formControlName="fechaEmision">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Estado</mat-label>
            <mat-select formControlName="estado">
              <mat-option [value]="EstadoFactura.Pendiente">Pendiente</mat-option>
              <mat-option [value]="EstadoFactura.Pagada">Pagada</mat-option>
              <mat-option [value]="EstadoFactura.Vencida">Vencida</mat-option>
            </mat-select>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="facturaForm.invalid">
            {{ isEditMode ? 'Actualizar' : 'Generar' }}
          </button>
        </form>
        <div class="facturas-list">
          <h3>Facturas Generadas</h3>
          <table mat-table [dataSource]="facturas" class="facturas-table">
            <!-- ID Column -->
            <ng-container matColumnDef="idFactura">
              <th mat-header-cell *matHeaderCellDef> ID </th>
              <td mat-cell *matCellDef="let factura"> {{ factura.idFactura }} </td>
            </ng-container>
            <!-- Monto Column -->
            <ng-container matColumnDef="monto">
              <th mat-header-cell *matHeaderCellDef> Monto </th>
              <td mat-cell *matCellDef="let factura"> {{ factura.monto }} </td>
            </ng-container>
            <!-- Fecha Emisión Column -->
            <ng-container matColumnDef="fechaEmision">
              <th mat-header-cell *matHeaderCellDef> Fecha Emisión </th>
              <td mat-cell *matCellDef="let factura"> {{ factura.fechaEmision | date:'shortDate' }} </td>
            </ng-container>
            <!-- Estado Column -->
            <ng-container matColumnDef="estado">
              <th mat-header-cell *matHeaderCellDef> Estado </th>
              <td mat-cell *matCellDef="let factura"> {{ factura.estado }} </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="facturaDisplayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: facturaDisplayedColumns;"></tr>
          </table>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    mat-card { margin: 20px; }
    form { display: flex; flex-direction: column; gap: 15px; }
    .facturas-list { margin-top: 30px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 8px; border: 1px solid #ccc; }
  `]
})
export class FacturacionComponent implements OnInit {
  facturaForm: FormGroup;
  isEditMode = false;
  facturas: Factura[] = [];
  facturaDisplayedColumns: string[] = ['idFactura', 'monto', 'fechaEmision', 'estado'];
  EstadoFactura = EstadoFactura; // Para usar en el template

  constructor(
    private fb: FormBuilder,
    private facturacionService: FacturacionService
  ) {
    this.facturaForm = this.fb.group({
      monto: ['', Validators.required],
      fechaEmision: ['', Validators.required],
      estado: [EstadoFactura.Pendiente, Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarFacturas();
  }

  cargarFacturas(): void {
    this.facturacionService.getFacturas().subscribe({
      next: data => this.facturas = data,
      error: err => console.error(err)
    });
  }

  saveFactura(): void {
    if (this.facturaForm.invalid) return;
    const formValue = this.facturaForm.value;
    const facturaData: Factura = {
      idFactura: this.isEditMode ? 0 : 0, // Para crear se asigna 0; en edición se usaría el ID real
      idPaciente: 1, // Se debe obtener de la sesión o contexto del usuario
      fechaEmision: new Date(formValue.fechaEmision),
      monto: formValue.monto,
      estado: formValue.estado
    };

    if (this.isEditMode) {
      this.facturacionService.updateFactura(facturaData).subscribe({
        next: () => {
          this.cargarFacturas();
          this.facturaForm.reset();
          alert('Factura actualizada correctamente');
        },
        error: err => console.error(err)
      });
    } else {
      this.facturacionService.createFactura(facturaData).subscribe({
        next: () => {
          this.cargarFacturas();
          this.facturaForm.reset();
          alert('Factura generada correctamente');
        },
        error: err => console.error(err)
      });
    }
  }
}
