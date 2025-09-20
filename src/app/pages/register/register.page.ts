import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class RegisterPage {
  nombres: string = '';
  apellidos: string = '';
  correo: string = '';
  telefono: string = '';
  contrasena: string = '';
  repetirContrasena: string = '';

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

  async onRegister() {
    if (!this.nombres || !this.apellidos || !this.correo || !this.telefono || !this.contrasena || !this.repetirContrasena) {
      this.presentToast('Por favor completa todos los campos');
      return;
    }

    if (!this.correo.includes('@')) {
      this.presentToast('El correo no es válido');
      return;
    }

    if (this.contrasena.length < 6) {
      this.presentToast('La contraseña debe tener mínimo 6 caracteres');
      return;
    }

    if (this.contrasena !== this.repetirContrasena) {
      this.presentToast('Las contraseñas no coinciden');
      return;
    }

    const usuario = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      correo: this.correo,
      telefono: this.telefono,
      contrasena: this.contrasena
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.presentToast('Registro exitoso 🎉', 'success');

    this.router.navigate(['/login']); // redirige al login
  }
}
