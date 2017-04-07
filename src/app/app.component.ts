import { Component } from '@angular/core';

@Component({
  selector: 'a-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'a works!';

  alert(message) {
    alert(message);
  }
}
