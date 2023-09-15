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
  contact: Contact = new Contact();

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

  editContact(contact: Contact): void {
    const editedContact: Contact = { ...contact };
    
    editedContact.firstName = prompt('Edit First Name:', contact.firstName) || contact.firstName;
    editedContact.lastName = prompt('Edit Last Name:', contact.lastName) || contact.lastName;
    editedContact.phoneNumber = parseInt(prompt('Edit Phone Number:', contact.phoneNumber.toString()) || contact.phoneNumber.toString(), 10);
    editedContact.email = prompt('Edit Email:', contact.email) || contact.email;
    editedContact.profession = prompt('Edit Profession:', contact.profession) || contact.profession;
    editedContact.city = prompt('Edit City:', contact.city) || contact.city;
  
    this.contactService.updateContact(editedContact.id, editedContact).subscribe(() => {
      const index = this.contacts.findIndex(c => c.id === contact.id);
      if (index !== -1) {
        this.contacts[index] = editedContact;
      }
    });
  }

  addContact(): void {
    const newContact: Contact = {
      id: this.contact.id,
      firstName: this.contact.firstName || '',
      lastName: this.contact.lastName || '',
      phoneNumber: this.contact.phoneNumber || 0,
      email: this.contact.email || '',
      profession: this.contact.profession || '',
      city: this.contact.city || ''
    };

    this.contactService.createContact(newContact).subscribe(() => {
      this.loadContacts(); 
      this.contact = new Contact(); 
    });
  }
}
