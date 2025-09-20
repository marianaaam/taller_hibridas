import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class LoginPage {
  correo: string = '';
  contrasena: string = '';

  constructor(private toastController: ToastController, private router: Router) {}

  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

  async onLogin() {
    if (!this.correo || !this.contrasena) {
      this.presentToast('Debes llenar todos los campos');
      return;
    }

    const data = localStorage.getItem('usuario');
    if (!data) {
      this.presentToast('No hay usuarios registrados');
      return;
    }

    const usuario = JSON.parse(data);

    if (usuario.correo === this.correo && usuario.contrasena === this.contrasena) {
      this.presentToast('Inicio de sesión exitoso ✅', 'success');
      this.router.navigate(['/inicio']);
    } else {
      this.presentToast('Usuario o contraseña incorrectos');
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
