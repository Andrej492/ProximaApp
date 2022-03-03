import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserDetailComponent } from './home/user-detail/user-detail.component';
import { AuthGuard } from './user/auth-guard.service';
import { SigninComponent } from './user/signin/signin.component';
import { SignupComponent } from './user/signup/signup.component';

const routes: Routes = [
  { path: '', component: SignupComponent },
  { path: 'home', component: HomeComponent,
    children: [
      { path: ':id', component: UserDetailComponent }
    ]
  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
