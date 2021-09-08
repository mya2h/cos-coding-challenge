import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../../services/vehicle.service'
import { TokenStorageService } from '../../services/token-storage.service'
import {Vehicle} from '../../model/vehicle'
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  currentAuction: any;
  constructor(private auction: VehicleService,private token: TokenStorageService) { 
    this.currentAuction = [];
  }

  ngOnInit(): void {

    this.auction.getAuctions().subscribe(
      data => {
        this.currentAuction = data.items;
        console.log(this.currentAuction)
      },
      err => {
        this.currentAuction = JSON.parse(err.error).message;
      }
    
    )
  }

}
