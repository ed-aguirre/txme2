import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traductor',
  pure: false
})
export class TraductorPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if( args != null ) {
      //console.log(value.split(" ")[1] );
      let num = value.split(" ")[0];

        if( args == 'esp' )
        switch (value.split(" ")[1]) {
          case 'few': return 'Hace unos segundos';
          case 'minute': return '1 min'
          case 'minutes': return num + ' min'
          case 'hour': return '1 h';
          case 'hours': return num + ' hrs';
        }

    }
    return null;

  }

}
