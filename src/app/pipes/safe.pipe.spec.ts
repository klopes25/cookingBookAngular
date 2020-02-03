import { SanitizeHtmlPipe } from './safe.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { inject } from '@angular/core/testing';

describe('SanitizeHtmlPipe', () => {

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SanitizeHtmlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));

  it('check pipe transformation', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const text = "<mark>toto<mark>";
    const pipe = new SanitizeHtmlPipe(domSanitizer);
    const result = pipe.transform(text);
    expect(result).toBeTruthy();
    expect(result['changingThisBreaksApplicationSecurity']).toContain("toto");
  }));

});
