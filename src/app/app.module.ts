import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { Clinical } from '../pages/clinical/clinical';
import { Department } from '../pages/department/department';
import { ClinicalDetailPage } from '../pages/clinical-detail/clinical-detail';
import { DepartmentDetailPage } from '../pages/department-detail/department-detail';
import { FirebaseService } from '../providers/firebase-service';
import { LazyImgComponent } from '../providers/lazy-img';
import { EditModalComponent } from '../components/edit-modal/edit-modal';
import { NewItemComponent } from '../components/new-item/new-item';



@NgModule({
  declarations: [
    MyApp,
    Clinical,
    Department,
    ClinicalDetailPage,
    DepartmentDetailPage,
    LazyImgComponent,
    EditModalComponent,
    NewItemComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Clinical,
    Department,
    ClinicalDetailPage,
    DepartmentDetailPage,
    LazyImgComponent,
    EditModalComponent,
    NewItemComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseService,
    Storage

  ]
})
export class AppModule {}
