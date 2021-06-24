import { Pipe, PipeTransform } from '@angular/core';
import { Prof } from './DBModels/prof.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Prof[], searchText: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.nom.toLocaleLowerCase().includes(searchText);
    });
  }
}
