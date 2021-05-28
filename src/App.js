import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import ContactList from "./ContactList";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ContactProfile from "./ContactProfile";
import AddContact from "./AddContact";
import EditContact from "./EditContact";

export const ContactContext = React.createContext();

function App() {
  const [contacts, setContacts] = useState(contactsApi.contacts);

  const contactContextValue = {
    contacts: contacts,
    handleContactAdd,
    handleContactDelete,
    handleContactEdit,
  };

  function handleContactAdd(newContact) {
    const newContactsList = [...contacts, newContact];
    setContacts(newContactsList);
  }

  function handleContactDelete(id) {
    const contactList = [...contacts];
    const newContactList = contactList.filter((c) => c.id !== id);
    setContacts(newContactList);
  }

  function handleContactEdit(
    id,
    editName,
    editImage_url,
    editEmail,
    editPhone_number
  ) {
    const contactList = [...contacts];
    const indexToEdit = contactList.findIndex((c) => c.id === id);
    const editedContact = {
      id,
      name: editName,
      image_url: editImage_url,
      email: editEmail,
      phone_number: editPhone_number,
    };
    contactList[indexToEdit] = editedContact;
    setContacts(contactList);
  }

  return (
    <div>
      <h1>Contact List</h1>
      <div className="container">
        <BrowserRouter>
          <ContactContext.Provider value={contactContextValue}>
            <Switch>
              <Route path="/contacts/new" component={AddContact} />
              <Route path="/contacts/:id/edit" component={EditContact} />
              <Route path="/contacts/:id" component={ContactProfile} />
              <Route path="/contacts" component={ContactList} />
              <Route path="/" component={ContactList} />
            </Switch>
          </ContactContext.Provider>
        </BrowserRouter>
      </div>
    </div>
  );
}

const contactsApi = {
  contacts: [
    {
      id: 70219577,
      name: "Aaron Hayslip",
      image_url:
        "https://pbs.twimg.com/profile_images/1364965517526769664/5fwOCY83_400x400.jpg",
      email: "amhayslip@parsity.com",
      phone_number: "15555555555",
    },
  ],
};

export default App;
