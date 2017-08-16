import _ from 'lodash';
import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'textHighlight'
})
export class TextHighlightPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(text: string, term: string, className: string) {
    let html;

    if (term) {
      const re = new RegExp(`(?:${_.escapeRegExp(term)})+`, 'i');
      const match = re.exec(text);
      if (match) {
        html = (
          _.escape(text.slice(0, match.index)) +
          `<span class="${className}">${_.escape(match[0])}</span>` +
          _.escape(text.slice(match.index + match[0].length))
        );
      }
    }

    if (!html) {
      html = _.escape(text);
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
