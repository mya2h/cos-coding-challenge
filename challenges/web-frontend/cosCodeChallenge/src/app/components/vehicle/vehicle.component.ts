import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../../services/vehicle.service'
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service'


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  vehicleLoading = true;
  currentAuction: any;
  defaultImage = "https://res.cloudinary.com/castle-tech-gmbh/image/upload/v1618222180/dkfuggmcdqs09wfvppvo.jpg"
  constructor(private auction: VehicleService,private auth: TokenStorageService,private router: Router) { 
    this.currentAuction = [];
  }

  ngOnInit(): void {

    this.auction.getAuctions().subscribe(
      data => {
        this.currentAuction = data.items;
        this.vehicleLoading= false
        console.log(this.currentAuction)
      },
      err => {
        this.currentAuction = JSON.parse(err.error).message;
      }
    
    )
  }
  logout(){
    this.auth.signOut()
    this.router.navigate(["login"])
    
  }

}
