import {TranslateLoader} from '@ngx-translate/core';
import { Observable } from "rxjs";
const fs = require('fs');

export class TranslateUniversalLoader implements TranslateLoader {
    constructor(private prefix: string = 'i18n', private suffix: string = '.json') {}

    public getTranslation(lang: string): Observable<any> { 
        return new Observable((observer:any) => {
            observer.next(JSON.parse(fs.readFileSync(`${this.prefix}/${lang}${this.suffix}`, 'utf8')));
            observer.complete();
        });
    }
} 