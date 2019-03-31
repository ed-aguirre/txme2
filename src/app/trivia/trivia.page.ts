import { Component, OnInit, ViewChild } from '@angular/core';
import { Socket } from "ng-socket-io";
import { UsuarioService } from '../providers/usuario.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
declare var $: any;

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.page.html',
  styleUrls: ['./trivia.page.scss'],
})
export class TriviaPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;

  trivia = [
    {title:"¿Cuanto cuesta el platano chiapas?", op1:"$Nose cuanto aguante este espacio pero lo checare", op2:"$80",op3:"$35", val1:1, val2:2, val3:3},
    {title:"¿Cuanto cuesta el platano chiapas?", op1:"$50", op2:"$80",op3:"$35", val1:1, val2:2, val3:3},
    {title:"¿Cuanto cuesta el platano chiapas?", op1:"$50", op2:"$80",op3:"$35", val1:1, val2:2, val3:3},
    {title:"¿Cuanto cuesta el platano chiapas?", op1:"$50", op2:"$80",op3:"$35", val1:1, val2:2, val3:3},
    {title:"¿Cuanto cuesta el platano chiapas?", op1:"$50", op2:"$80",op3:"$35", val1:1, val2:2, val3:3},
    {title:"¿Cuanto cuesta el platano chiapas?", op1:"$50", op2:"$80",op3:"$35", val1:1, val2:2, val3:3},
    {title:"¿Cuanto cuesta el platano chiapas?", op1:"$50", op2:"$80",op3:"$35", val1:1, val2:2, val3:3},
    {title:"¿Cuanto cuesta el platano chiapas?", op1:"$50", op2:"$80",op3:"$35", val1:1, val2:2, val3:3},
    {title:"¿Cuanto cuesta el platano chiapas?", op1:"$50", op2:"$80",op3:"$35", val1:1, val2:2, val3:3},
    {title:"Listo", op1:"$50", op2:"$80",op3:"$35", val1:1, val2:2, val3:3}

  ];

  private conectados = 0;
  private chat = [];
  private band:boolean = true;
  private cambio:boolean = false;

  private msj = '';
  private user = '';
  private tmp:number = 0;
  private indice = 0;
  private resp = [];

  private mili = 0;
  private seg = 0;
  // private timer:any;

  private numerico:any;
  private coloradio = 'primary';

  constructor(public socket: Socket,
              public _us: UsuarioService,
              public router: Router) {
    
    this.socket.connect();
    this.user = this._us.user_data['matricula'];

    this.observables();
   }

  observables(){
    this.getMensaje().subscribe( data => {
      console.log(data);
      this.chat = data;
    });
    
    this.getUsers().subscribe(n =>{
      this.conectados = n;
    });

    this.getNumerico().subscribe(n => {
      this.numerico = n;
      console.log(this.numerico);
    });

    this.getTimer().subscribe(n => {
      // console.log(n);
      this.mili = n['milisegundos'];
      this.seg = n['segundos'];
      if(this.seg == 0 && this.mili == 0){
       this.begin();
       console.log('loop')
      }
    });

    this.getCambio().subscribe(n =>{
      console.log(n);
    })

  }

  ngOnInit() {
      this.slides.lockSwipes(true);

      this.slides.ionSlideDidChange.subscribe(() =>{
        this.resp[this.indice] = this.tmp;
        // console.log(this.tmp);
        // console.log(this.indice);

        console.log(this.resp);
        this.tmp = 0;
      });

      this.slides.ionSlidesDidLoad.subscribe(() => { //cuando inicia el slide(el primer indice)
       
        this.slides.getActiveIndex().then(f =>{
          console.log(f)
          this.indice = f;
        });

        this.slides.ionSlideReachEnd.subscribe(() => {
          // clearInterval(this.timer);
        })
      });


      this.slides.ionSlideTransitionStart.subscribe(() =>{ //cuando la animacion inicia
        this.cambio = true;
       
      });

      this.slides.ionSlideTransitionEnd.subscribe(() =>{ //cuando la animacion termina
        this.cambio = false;

        this.slides.getActiveIndex().then(f =>{ //obtiene el indice actual
          //console.log(f)
          this.indice = f;
        });
        
      });

  }

  valor(e){
    this.tmp = e.detail['value'];
    this.socket.emit('numerar', {
      num: e.detail['value']
    });
  }
  
  cantidad(e){
    this.socket.emit('blur', {
      num: e
    });
  }

  async begin(){

    const bandF = () => {
      this.band = false;
    }
    const bandT = () => {
      this.band = true;
    }
    const block = () => {
     this.slides.lockSwipes(this.band);
    }
    const next = () => {
      this.slides.slideNext(2000);
    }

    const beAsync = async() =>{
      const uno = await bandF();
      const dos = await block();
      const tres = await next();
      const cua = await bandT();
      const cin = await block();
      return cin;
    }

    beAsync().then(fin =>{
      //console.log(fin)
    })
    
  }

  close() {
    this.router.navigate(['tabs/home']);
  }

  send(){
    this.socket.emit('add-msn',{
      mensaje : this.msj,
      user: this.user
    });
    this.msj = '';
   
  }

  getCambio(): Observable<any>{
    let w = new Observable(observer =>{
      this.socket.on('slide', n =>{
        observer.next(n);
      });
    });
    return w;
  }

  getTimer():Observable<any>{
    let r = new Observable(observer =>{
      this.socket.on('timer', n =>{
        observer.next(n);
      })
    });
    return r;
  }

  getUsers(): Observable<any>{
    let p = new Observable(observer => {
      this.socket.on('users', n =>{
        observer.next(n);
      });
    });
    return p;
  }

   getMensaje(): Observable<any>{
    let o = new Observable(observer => {
      this.socket.on('mensaje', data => {
        observer.next(data);
        $("#mensajes").animate({ scrollTop: $('#mensajes').prop("scrollHeight")}, 1000);
      });
    });
    return o;
  } 

  getNumerico(): Observable<any>{
    let q = new Observable(observer =>{
      this.socket.on('numerico', data => {
        observer.next(data);
      });
    });
    return q;
  }
  
  ngOnDestroy() {
    //his.socket.emit('desconectar',{data: this.user});
    this.socket.disconnect();
    console.log('dest');
  }

  ngOnChanges() {
    //$('#mensajes').scrollTop()
  }
  ngDoCheck(){
    //$('#mensajes').scrollTo('#id'+ (this.mensajes.length - 1));
  }
  ngAfterContentInit() {
    //$('#mensajes').scrollTo('#id'+ (this.mensajes.length - 1));
  }
  ngAfterContentChecked() {
    //$('#mensajes').scrollTo('#id'+ (this.mensajes.length - 1));
  }
  ngAfterViewInit() {
    //$('#mensajes').scrollTo('#id'+ (this.mensajes.length - 1));
  }
  ngAfterViewChecked() {
    //$('#mensajes').scrollTo('#id'+ (this.mensajes.length - 1));
  }
  

  

}
