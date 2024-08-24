import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productdata:any[],searchText:string):any {
    if(!productdata) return []
    if(!searchText) return productdata
 
    return productdata.filter(
      (userobj:any)=>{
        return userobj.name.toLowerCase().includes(searchText.toLowerCase())
      })
 
 
 
   
  }

}
