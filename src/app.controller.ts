import { Body, Controller, Get, Post, Query, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import  type{ Response } from 'express';



class ProductId{
  termid: string;
}
class rendeles{
  terid: string;
  nev: string;
  szallitas: string;
  szamla: string;
  kupon?: string;
  cardszam: string;
  lejarat: string;
  cvv: string;
}
 
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return { message: this.appService.getHello(), products: this.appService.getProducts() };
  }
  
 @Get('/vasar')
 @Render('Vasarlas')
 fas(@Query() dto : ProductId ){
  return { ProductId: dto.termid, errors: [], dto:{} };
 }


 @Post('/vasar')
 @Render('Vasarlas')
 Check(@Body() rendeles: rendeles, @Res() res: Response){
  const error:string[]=[];
  //Név
  if(!rendeles.nev){
    error.push("Kérjük adja meg a nevét!");
  }
  //else if(rendeles.nev.trim().cote
  else if(rendeles.nev.length<3){
    error.push("Túl rövid név!");
  } 
  //Szállítási és számlázási cím

  if(!rendeles.szallitas){
    error.push("Kérjük adja meg a szállítási címet!");
  }else if(rendeles.szallitas.trim()==""){
    error.push("Szállítási cím! adja meg");
  }
  if(!rendeles.szamla){
    error.push("Kérjük adja meg a számlázási címet!");
  }else if(rendeles.szamla.trim()==""){
    error.push("Számlázási cím! adja meg");
  }
  //Card
  if(!rendeles.cardszam){
    error.push("Kérjük adja meg a kártya számát!");
  }else if(rendeles.cardszam.trim().length!=16){
    error.push("A kártya számának 16 számjegyűnek kell lennie!");
  }
  //Lejárat
  if(!rendeles.lejarat){
    error.push("Kérjük adja meg a lejárati dátumot!");
  }else if(rendeles.lejarat.trim().length!=5){
    error.push("A lejárati dátumnak 5 karakterből kell állnia!");
  }
  //CVV
  const cvv=Number(rendeles.cvv);
  if(!rendeles.cvv){
    error.push("Kérjük adja meg a CVV kódot!");
  }else if(rendeles.cvv.trim().length!=3){
    error.push("A CVV kódnak 3 számjegyűnek kell lennie!");
  }else if(cvv<100||cvv>999){
    error.push("A CVV Megfelelőnek kell lennie!");
  }
  if(error.length===0){
    return //vegleges =await this.appService.vegleges({terid: Number(rendeles.terid), nev: rendeles.nev, szallitas: rendeles.szallitas, szamla: rendeles.szamla} as 
  }

  console.log(rendeles);
  return { errors: error };
 };
}