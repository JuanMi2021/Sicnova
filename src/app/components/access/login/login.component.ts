import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceAuth } from 'src/app/services/auth.service';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild("cajamail") cajamail!: ElementRef;
  @ViewChild("cajapassword") cajapassword!: ElementRef;
  loading: boolean = false;

  constructor(
    private _auth: ServiceAuth,
    private _router: Router,
    private toastr: ToastrService,
    private firebaseError: FirebaseCodeErrorService,
    private afAuth: AngularFireAuth,

  ) { }

  ngOnInit(): void {
  }

  logIn(): void {
    var mail = this.cajamail.nativeElement.value;
    var contra = this.cajapassword.nativeElement.value;
    this.loading = true;

    this.afAuth.signInWithEmailAndPassword(mail, contra).then ((user)  => {

      if(user.user?.email){

        console.log('parte del if');
        this._router.navigate(['access']);
        this.loading = false;
      }else{
        console.log('parte del else');

      }
      console.log (user);
    }).catch ((error)=>{
      console.log('parte del catch');

      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code),'Error');
    })



                                            // this._auth.login(mail, contra).then(user => {
                                            //   // console.log(user);
                                            //   console.log('user');

                                            //   this.toastr.error(this.firebaseError.codeError(error.code),'Error');

                                            //   if (user?.user?.email) {
                                            //     console.log('Parte del If');

                                            //   } else (error : string) => {
                                            //     console.log('parte del else');
                                            //     // console.log(error);


                                            //   }

                                            // })
  }

  // Quitado el login por Google
  // logInGoogle():void{
  //   var mail = this.cajamail.nativeElement.value;
  //   var contra = this.cajapassword.nativeElement.value;
  //   this._auth.loginGoogle(mail, contra).then(res=>{
  //     console.log(res);
  //     this._router.navigate(['perfil']);
  //   });
  // }


}

// Unificado con anterior sistema de Login
