import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service'
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service'
import * as moment from 'moment';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  dateFormat = "YYYY-MM-DD HH:mm:ss";
  vehicleLoading = true;
  currentAuction: any;
  defaultImage = "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1618222180/dkfuggmcdqs09wfvppvo.jpg"
  constructor(private auction: VehicleService, private auth: TokenStorageService, private router: Router) {
    this.currentAuction = [];
  }

  ngOnInit(): void {
    interval(20000)
      .subscribe(() => {
        this.getAuctions()
      });
  }
  logout() {
    this.auth.signOut()
    this.router.navigate(["login"])

  }
  getAuctions() {
    this.auction.getAuctions().subscribe(
      data => {
        this.vehicleLoading = false
        this.currentAuction = data.items
        this.currentAuction.map(function (item: any) {
          item.createdAt = moment(item.createdAt).format("DD/MM/YYYY")
          if (new Date(item.endingTime) < new Date()) {
            item.differenceInHours = "invalid"
          }
          else {
            item.differenceInHours = moment.utc(moment(new Date(item.endingTime), "DD/MM/YYYY HH:mm:ss").diff(moment(new Date(), "DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
          }
        });
        console.log(this.currentAuction)
      },
      err => {
        this.currentAuction = JSON.parse(err.error).message;
      }
    )
  }
}


