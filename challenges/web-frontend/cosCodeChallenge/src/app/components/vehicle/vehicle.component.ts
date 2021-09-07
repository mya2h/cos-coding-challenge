import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../../services/vehicle.service'
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  currentAuction: any;
  constructor(private auction: VehicleService) { }

  ngOnInit(): void {

    this.auction.getAuctions().subscribe(
      data => {
        this.currentAuction = data;
        console.log(data)
      },
      err => {
        this.currentAuction = JSON.parse(err.error).message;
        console.log(err)
      }
    
    )
  }

}
