import { Component } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent {
  newContact: Contact = {
    id: 0,
    firstName: '',
    lastName: '',
    phoneNumber: 0,
    email: '',
    profession: '',
    city: ''
  };

  constructor(private contactService: ContactService) { }

  onSubmit(): void {
    this.contactService.createContact(this.newContact).subscribe(
      (result: Contact) => {
        console.log("Contact was succesfully added", result);
      },
      (error) => {
        console.error("Mistake during adding the contact", error);
        alert("Something went wrong: " + error);
      }
    );
  }
}
