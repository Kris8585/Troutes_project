import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
  name: 'domSecurity'
})
export class DomSecurityPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(unsafeUrl: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
}
