import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service';
import { LoginPage } from '../../pages/login/login';
import { AccountPage } from '../../pages/account/account';
import { AuthServ } from '../../providers/auth-serv';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { UserService } from '../../providers/user-service';




@Component({
  selector: 'page-setup-db',
  templateUrl: 'setup-db.html',
})
export class SetupDbPage {
  hospital:string;
  specialty:string;
  details:object;
  public signupForm:FormGroup;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  specialtyChanged:boolean = false;
  submitAttempt: boolean = false;
  userList: any;
  isAuth: Boolean;
  isGuest: Boolean;
  specialties: Array<String>;
  newSpecName: String = "";
  checking: Boolean = false;
  userName:string;
  currentUser:Object={"email":"","admin":"","specialty":""};
  user:any;
  private auth:boolean = false;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      private fbServ: FirebaseService,
       private alertCtrl: AlertController,
       public authServ: AuthServ,
       private userServ: UserService,
       public formBuilder: FormBuilder,
       
      ) {
    this.details = this.fbServ.getDBDetails();
    this.hospital = this.details["hospital"];
    this.specialty = this.details["specialty"];
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
    
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupDbPage');
    this.auth = this.authServ.getAuth();
    if(this.auth){console.log("SetUpDB auth is positive");}
    else{
      console.log("SETUPDB-not auth'd");
      let alrt = this.alertCtrl.create({
        message:"Please create an administrator",
        buttons:[
          {text:"OK",
          role:'cancel'
          
        }
        ]
      });
      alrt.present(); 
   
    }
  }

  Setup(){
    this.signupUser();
    
  }

  signupUser() {
    let alert = this.alertCtrl.create({
      message: "User created!",
      buttons: [{
        text: "Ok",
        role: 'cancel'
      }]
    });

    alert.onDidDismiss(()=>{
                
             this.navCtrl.setRoot(LoginPage);        
    })
    
        this.submitAttempt = true;
        if (!this.signupForm.valid) { console.log("not valid", this.signupForm.value); }
        else {
            this.authServ.createUser(this.signupForm.value.email, this.signupForm.value.password)
            .then((user) => {
              // console.log("New user is:", user);
              this.userServ.addUser(this.signupForm.value.email, this.specialty, true);
              this.fbServ.setupFirstDB()
              .then(()=>{
                alert.present();
              })
              .catch((err)=>console.log("setupDB err",err))
      
            })
            
    
             .catch((error) => {
              console.log("Error in signupUser ", error);
              // this.loading.dismiss();
              let errorMessage: string = error.message;
              let alrt = this.alertCtrl.create({
                message: errorMessage,
                buttons: [{
                  text: "Ok",
                  role: 'cancel'
                }]
              });
              alrt.present();
            });
    
        }
      }

}
