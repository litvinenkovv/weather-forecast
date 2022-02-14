import { Component, Input, OnInit } from '@angular/core';
import {
  IDaily,
  IEightHours,
  IHourly,
  ISevenDays,
} from '../shared/table.interface';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
})
export class TablesComponent implements OnInit {
  @Input() hourlyTable: IHourly[] = [];
  @Input() dailyTable: IDaily[] = [];
  @Input() modeToggle: number = 0;
  @Input() sevenDays: ISevenDays[] = [];
  @Input() eightHours: IEightHours[] = [];

  constructor() {}

  ngOnInit(): void {}
}
