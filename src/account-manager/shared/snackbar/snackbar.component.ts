import {
    Component,
    Input,
    Inject
} from "@angular/core";
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MaterialModule } from "src/account-manager/material/material.module";

@Component({
    selector: 'app-snackbar',
    template: '<span>{{ data }}</span>',
    styles: [':host { display: flex; }'],
    standalone: true,
    imports: [MaterialModule]
})
export class SnackbarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
}