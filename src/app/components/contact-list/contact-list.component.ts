import { Component } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  contacts: Contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe((data: Contact[]) => {
      this.contacts = data;
    });
  }

  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(
      () => {
        this.contactService.getContacts().subscribe((contacts: Contact[]) => {
          this.contacts = contacts;
        });
      },
      (error) => {
        console.error("Mistake while deleting the contact.", error);
        alert("Something went wrong: " + error);
      }
    );
  }

  getContact(id: number) {
    this.contactService.getContact(id).subscribe(
      (contact: Contact) => {
        const contactInfo = `ID: ${contact.id}\nFirst Name: ${contact.firstName}\nLast Name: ${contact.lastName}\nPhone Number: ${contact.phoneNumber}\nEmail: ${contact.email}\nProfession: ${contact.profession}\nCity: ${contact.city}`;
        alert(contactInfo);
      },
      (error) => {
        console.error("Mistake while seeking for the details of the contact.", error);
        alert("Something went wrong: " + error);
      }
    );  
  }
}
