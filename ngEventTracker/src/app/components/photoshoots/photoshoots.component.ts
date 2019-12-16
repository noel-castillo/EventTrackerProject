import { Address } from './../../models/address';
import { Photoshoot } from './../../models/photoshoot';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoshootService } from 'src/app/services/photoshoot.service';

@Component({
  selector: 'app-photoshoots',
  templateUrl: './photoshoots.component.html',
  styleUrls: ['./photoshoots.component.css']
})
export class PhotoshootsComponent implements OnInit {

  // F I E L D S

  title = 'myPhotoshoots';

  photoshoots: Photoshoot[] = [];

  selected: Photoshoot = null;

  newPhotoshoot: Photoshoot = new Photoshoot();

  newAddress: Address = new Address();

  editPhotoshoot: Photoshoot = null;

  showComplete = false;

  urlId = '';
  currentRoute: ActivatedRoute;

  // C O N S T R U C T O R

  constructor(private psSvc: PhotoshootService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.psSvc.index().subscribe(
      data => {
        this.photoshoots = data;
        // if (!this.selected && this.currentRoute.snapshot.paramMap.get('email')) {
        //   this.urlId = '';
        //   this.urlId = this.currentRoute.snapshot.paramMap.get('email');
        //   console.log(this.urlId);
        //   this.photoshoots.forEach((d) => {
        //     if (d.email === this.urlId) {
        //       this.selected = d;
        //       console.log(this.selected);
        //     }
        //   });
        //   if (this.selected === null) {
        //     this.router.navigateByUrl('**');
        //   }
        // }
      },
      err => console.error('Cannot load photoshoots component index()')
    );
  }

  reload() {
    this.psSvc.index().subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.photoshoots = aGoodThingHappened;
      },
      (didntWork) => {
        console.error(didntWork);
      }
    );
  }

  getNumOfPhotoshoots() {
    return this.photoshoots.length;
  }

  count(): number {

    return this.photoshoots.length;
  }

  displayPhotoshoot(photoshoot) {
    this.selected = photoshoot;
  }


  displayTable() {
    this.selected = null;
  }

  addPhotoshoot() {
    this.newPhotoshoot.address = this.newAddress;
    this.psSvc.create(this.newPhotoshoot).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.newPhotoshoot = new Photoshoot();
        this.newAddress = new Address();
        this.reload();
      },
      (didntWork) => {
        console.error(didntWork);
        this.reload();
      }
    );
  }

  setEditPhotoshoot() {
    this.editPhotoshoot = Object.assign({}, this.selected);
  }

  updatePhotoshoot(photoshoot: Photoshoot) {
    this.psSvc.updatePhotoshoot(photoshoot).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
        this.editPhotoshoot = null;
        this.selected = null;
      },
      (didntWork) => {
        console.error(didntWork);
        this.reload();
      }

    );
  }

  deletePhotoshoot(id) {
    this.psSvc.delete(id).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
      },
      (didntWork) => {
        console.error(didntWork);
        this.reload();
      }

    );
  }

  checkLogin(): boolean {
    return this.auth.checkLogin();
  }

}
