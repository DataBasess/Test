import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'apiYoutube'
})
export class ApiYoutubePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+url);
  }

}
