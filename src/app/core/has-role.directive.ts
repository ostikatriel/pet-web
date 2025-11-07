import { Directive, Input, TemplateRef, ViewContainerRef, effect, inject } from '@angular/core';
import { AuthService } from './auth-service';

@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective {
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);

  private requiredRole: string | undefined;

  @Input('appHasRole') set role(role: string | undefined) {
    this.requiredRole = role;
    this.updateView();
  }

  constructor() {
    effect(() => {
      this.authService.user(); // Registrar la señal como dependencia del efecto
      this.updateView();
    });
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.authService.hasRole(this.requiredRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
