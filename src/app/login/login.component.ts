import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLogin: UserLogin = new UserLogin()

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  login(event: any){
    this.authService.entrar(this.userLogin).subscribe({
      next: (resp: UserLogin) => {
        this.userLogin = resp

        environment.id = this.userLogin.id
        environment.nome = this.userLogin.nome
        environment.usuario = this.userLogin.usuario
        environment.tipo = this.userLogin.tipo
        environment.foto = this.userLogin.foto
        environment.token = this.userLogin.token

        console.log(environment.usuario)
        console.log(environment.token)
        console.log(environment.foto)

        this.router.navigate(['/inicio'])
      },
      error: erro => {
        if(erro == 401){
          alert("Usuário ou senha inválidos")
        }
      }
    })
  }

}
