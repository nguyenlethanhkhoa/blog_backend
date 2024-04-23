import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlService {
    
    createSlug(str: string): string {
        str = str.toLowerCase();     
    
        str = str
            .normalize('NFD') 
            .replace(/[\u0300-\u036f]/g, '');
    
        str = str.replace(/[đĐ]/g, 'd');
        str = str.replace(/([^0-9a-z-\s])/g, '');
        str = str.replace(/(\s+)/g, '-');
        str = str.replace(/-+/g, '-');
        str = str.replace(/^-+|-+$/g, '');
    
        return str;
    }
}
