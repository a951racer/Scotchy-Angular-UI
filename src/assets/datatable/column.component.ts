import {Component, Input} from '@angular/core';
import {DatatableComponent} from './datatable.component';

@Component({
  selector: 'app-column',
  template: ``,
})
export class ColumnComponent {
  @Input() fieldName;
  @Input() header;
  @Input() sortable;
  @Input() filterable;
  @Input() dataType;
  @Input() styleClass;
  @Input() displayAs;
  @Input() navLink;
  @Input() navId;

  constructor(table: DatatableComponent) {
    table.addColumn(this);
  }
}
