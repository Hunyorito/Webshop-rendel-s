import { Injectable } from '@nestjs/common';

import mysql, {ResultSetHeader} from 'mysql2/promise';

const db= mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'rendeles',
});

export interface product{
  id: number;
  nev: string;
  url: string;
}
export interface product2{
  termid: number;
  nev: string;
  szallitas: string;
  szamla: string;
 }

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

 getProducts(): product[]{
  const term: product[] = [
    {id:1, nev:"Alma", url:"https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg"},
    {id:2, nev:"Körte", url:"https://kreativfarmer.hu/wp-content/uploads/2021/09/gyumolcsfa-vilmoskorte.jpg"},
    {id:3, nev:"Banán", url:"https://upload.wikimedia.org/wikipedia/commons/8/8a/Banana-Single.jpg"}
  ];
  return term;
  }
async saveSQL(rendeles: product2){
  const [result, _]: [ResultSetHeader, any] = await db.query("INSERT INTO rendeles(termid, nev, szallitas, szamla) VALUES(?,?,?,?)",
  [rendeles.termid, rendeles.nev, rendeles.szallitas, rendeles.szamla]);
  console.log(result);
  if(result.affectedRows==1){
    console.log("Sikeres rögzítés");
    return true;
  }else{
    console.log("Sikertelen rögzítés");
    return false;
  }
  
}
}
