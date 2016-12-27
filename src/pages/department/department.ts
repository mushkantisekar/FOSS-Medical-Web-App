import { Component } from '@angular/core';
import { NavController, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { FirebaseService } from '../../providers/firebase-service';
import { DepartmentDetailPage } from '../department-detail/department-detail';
import { NewItemComponent } from '../../components/new-item/new-item';

@Component({
  selector: 'page-department',
  templateUrl: 'department.html'
})
export class Department {

  public departmentListData;

  constructor(private navCtrl: NavController, public fbServ: FirebaseService,
    private alertCtrl: AlertController, private modalCtrl: ModalController,
    private loadingCtrl: LoadingController) {
    // this.departmentListData = fbServ.getDepartmentList();
    fbServ.getList("department")
      .then((data) => {
        this.departmentListData = data;
      });
  }

  showDetail(info) {
    // console.log('item ', info);
    let index = this.departmentListData.indexOf(info);
    // console.log("index is ", index);
    this.navCtrl.push(DepartmentDetailPage, { info: info, index: index });
  }

  moveUp(info) {
    this.fbServ.moveItem("department", -1, info);
  }

  moveDown(info) {
    this.fbServ.moveItem("department", 1, info);
  }

  publishDeptData() {
    this.fbServ.publishData("department");
  }

  localSave() {
    this.fbServ.localSave("department");
  }

  localLoad() {
    this.fbServ.getLocalFlag("department")
      .then((data) => {
        if (!data) {
          this.showAlert("Error", "No Department data saved locally");
          return
        }

        else {
          this.fbServ.localLoad("department")
            .then((data) => {
              this.departmentListData = data;
            })
            .catch((err) => {
              console.warn(err);
            })
        }
      })


  }

  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  createNew(info) {
    let newModal = this.modalCtrl.create(NewItemComponent);
    //TODO consider checking against the list of existing names- pass in an array

    newModal.onDidDismiss((name) => {
      // console.log('Dismissed');
      //if returns data from Modal
      if (!name || name.length == 0) {
        this.showAlert("Error", "No name provided");
      }
      else {
        if (name.image && name.image == "false") {
          let index = this.departmentListData.indexOf(info);
          let newItem = { "group": name.content, "data": [{ "type": "text", "detail": "Your data here" }] };
          this.departmentListData.splice(1, 0, newItem);
          this.showDetail(newItem);
          return;
        }
        else {
          // console.log(name.file || "No file");
          //now call fbService to upload name.file as this is the file that has been selected
          //use name.content and department as part of the reference
          //TODO will need to keep a list of the images to ensure no overlap - if checked for duplicates
          //above won't need to do this!
          let loading = this.loadingCtrl.create({
            content: 'Please wait...'
          });
          loading.present();

          let uploadTask =()=> this.fbServ.uploadFile(name.file[0], "department", name.content);
          uploadTask().then((uploadItem) => {
              // console.log(uploadItem.downloadURL);
              loading.dismiss();
              let index = this.departmentListData.indexOf(info);
              let newItem = { "group": name.content, "image":uploadItem.downloadURL };
              this.departmentListData.splice(1, 0, newItem);
              this.showDetail(newItem);
            })
            .catch(()=>{
              this.showAlert("Error","File upload error");
            })
        }
      }

    });

    newModal.present();
  }

  delete(info) {
    let confirm = this.alertCtrl.create({
      title: 'Delete this item?',
      message: 'Do you want to permanently delete this?',
      buttons: [
        {
          text: 'No-Cancel',
          handler: () => {
            console.log('Disagree clicked');
            return true;
          }

        },
        {
          text: 'Yes-Delete',
          handler: () => {
            console.log('Agree clicked');
            let index = this.departmentListData.indexOf(info);
            this.departmentListData.splice(index, 1);
            return true;

          }
        }
      ]
    });
    confirm.present();
  }
}
