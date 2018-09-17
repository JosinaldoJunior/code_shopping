import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ColorFirstLetterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'colorFirstLetter',
})
export class ColorFirstLetterPipe implements PipeTransform {
  
  mapColors = {
          'a': '#4286f4', 'b': '#80f442', 'c': '#f48042', 'd': '#f442df', 'e': '#42dff4', 'f': '#B7410E',
          'g': '#E6E8FA', 'h': '#DF73FF', 'i': '#4B0082', 'j': '#F8DE7E', 'k': '#8EE53F', 'l': '#FF8C00',
          'm': '#DEB887', 'n': '#000080', 'o': '#6B8E23', 'p': '#CC6600', 'q': '#111111', 'r': '#FFE4E1',
          's': '#FA7F72', 't': '#B22222', 'u': '#40E0D0', 'v': '#00FF00', 'x': '#738678', 'y': '#9400D3',
          'w': '#8878C3', 'z': '#0014A8'
  }
  
  defaltColor = '#000000';
  
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(!value || value === ''){
        return this.defaltColor;
    }
    
    const letterLowerCase = value.substring(0,1).toLowerCase();
    return this.mapColors.hasOwnProperty(letterLowerCase) ? this.mapColors[letterLowerCase] : this.defaltColor;
    
  }
}
