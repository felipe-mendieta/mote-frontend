import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommentsAppComponent } from './comments.app.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CommentsAppComponent }
    ])],
    exports: [RouterModule]
})
export class CommentsAppRoutingModule { }
