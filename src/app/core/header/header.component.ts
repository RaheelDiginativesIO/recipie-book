import { Component } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService, public authService: AuthService) {
    }

    onSaveData() {
        this.dataStorageService.storeRecipes()
        .subscribe(
            (response: HttpEvent<Object>) => {
                console.log(response);
            }
        );
    }

    onFetchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }

}
