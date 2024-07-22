import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchContacts, addContact, deleteContact } from "../slices/contactsSlice";
import { setFilter } from "../slices/filterSlice";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";


const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filter); 
  const status = useSelector((state) => state.contacts.status);
  const error = useSelector((state) => state.contacts.error);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    dispatch(addContact({ name, number }));
  };

  const handleDeletedContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };


  return (
    <div>
      <h1
        style={{
          margin: "0 ,auto",
          height: "100%",
          display: "flex",
          fontSize: 30,
          fontStyle: "italic",
          color: "#E645BB",
        }}>
        Phonebook
      </h1>

      <ContactForm onAddContact={handleAddContact} />

      <h2
        style={{
          margin: "0 ,auto",
          height: "100%",
          display: "flex",
          fontSize: 20,
          fontStyle: "italic",
          color: "#A83275",
        }}>
        Contacts:
      </h2>
      
      <Filter value={filter} onChange={handleFilterChange} />

      {status === 'loading' && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ContactList
        contacts={filteredContacts()}
        onDeleteContacts={handleDeletedContact}
      />
    </div>
  );
};
export default App;