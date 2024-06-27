import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigRoomFormComponent } from '../../components/config-room-form/config-room-form.component';

@Component({
    selector: 'app-my-configroom',
    templateUrl: './my-configroom.component.html',
    styleUrls: ['./my-configroom.component.css'],
    standalone: true,
    imports: [ConfigRoomFormComponent],
})
export class MyConfigroomComponent {
 
}
