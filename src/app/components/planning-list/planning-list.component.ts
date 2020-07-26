import { parseISO } from 'date-fns';
import { MatSort } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { isSameDay } from 'date-fns';


import { PlanningListService } from '../../core/services/planning-list.service';
import { PlanningDataModel } from '../../core/models';

@Component({
  selector: 'app-planning-list',
  templateUrl: './planning-list.component.html',
  styleUrls: ['./planning-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*', minHeight: '60px'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PlanningListComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['title', 'status', 'place', 'address', 'date', 'edit', 'delete', 'done'];
  public options = ['done', 'expired', 'placed'];
  public dataSource: MatTableDataSource<any>;
  public expandedElement: PlanningDataModel | null;

  // datePicker
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = true;
  public enableMeridian = false;
  public minDate: Date;
  public maxDate: Date;
  public stepHour = 1;
  public stepMinute = 5;
  public stepSecond = 10;
  public color: ThemePalette = 'primary';
  public disableMinute = false;
  public hideTime = false;


  public title = '';
  public status = '';
  public place = '';
  public address = '';
  public description = '';
  public date: Date;

  @ViewChild(MatSort, {static: true})
  public sort: MatSort;

  @ViewChild('planningTable')
  private planningTable: MatTable<any>;

  public COLORS = {
    done: 'green',
    expired: 'red',
    placed: 'orange'
  };

  private checkExpired = setInterval((self) => {
    const planningsData = self.dataSource.data;
    self.dataSource.data = planningsData.map((data) => {
      if (data.status === 'placed' && isSameDay(new Date(data.date), new Date())) {
        self.openSnackBar(data);
      }
      return {
        ...data,
        status: new Date(data.date) < new Date() && data.status === 'placed' ? 'expired' : data.status,
      };
    });
  }, 30000, this);

  constructor(private planningservice: PlanningListService,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.planningservice.getPlanningList()
      .subscribe((data: PlanningDataModel[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (planingData: PlanningDataModel, filter) => {
          return !filter ||
            (planingData.title.toLowerCase().indexOf(filter) !== -1) ||
            (planingData.place.toLowerCase().indexOf(filter) !== -1) ||
            (planingData.address.toLowerCase().indexOf(filter) !== -1);

        };
      }, (err) => {
        console.log(err);
      });
  }

  private openSnackBar(data: PlanningDataModel): void {
    this._snackBar.open(`${data.title} \n ${data.description}`, 'Carry out', {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public parseToDate(dateString): Date {
    return parseISO(dateString);
  }

  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public deleteData(elem): void {
    this.dataSource.data = this.dataSource.data.filter((i) => i !== elem);
  }

  public expand(event, element): void {
    this.expandedElement = this.expandedElement === element
    || (event.target.name || event.target.dataset.name) === 'delete'
      ? null
      : element;
  }

  public saveData(element): void {
    if (element.edit) {
      element.status = this.status;
      element.title = this.title;
      element.place = this.place;
      element.address = this.address;
      element.description = this.description;
      element.date = typeof this.date === 'string' ? this.date : this.date.toISOString();
      element.edit = false;
      return;
    }
    this.title = element.title;
    this.status = element.status;
    this.place = element.place;
    this.address = element.address;
    this.description = element.description;
    this.date = element.date;

    this.dataSource.data.forEach((el) => {
      el.edit = el === element;
    });
  }

  public addPlanningData(data: PlanningDataModel): void {
    const pllaningData = this.dataSource.data;
    pllaningData.push(data);
    this.dataSource.data = pllaningData;
    console.log(this.dataSource);
  }

  ngOnDestroy(): void {
    clearInterval(this.checkExpired);
  }

}
