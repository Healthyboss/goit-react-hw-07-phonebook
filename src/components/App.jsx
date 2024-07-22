import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addContact,
  setContacts,
  removeContact,
} from "../slices/contactsSlice";
import { setFilter } from "../slices/filterSlice";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";
const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts);  // tutaj tylko nawiasy
  const filter = useSelector((state) => state.filter); // tutaj tylko nawiasy
  useEffect(() => {
    const localStorageContacts = localStorage.getItem("contacts");
    if (localStorageContacts && localStorageContacts !== "undefined") {        //tutaj dodano warunek dodatkowy i sprawdzamy jeszcze kilka warunków aby upewnić się że wszystko jest takie jak oczekujemy
      try {
        const parsedContacts = JSON.parse(localStorageContacts);
        if (Array.isArray(parsedContacts)) {
          dispatch(setContacts(parsedContacts));
        } else {
          console.error("Dane w localStorage nie są tablicą.");
        }
      } catch (error) {
        console.error("Błąd parsowania danych z localStorage: ", error);
      }
    }
  }, [dispatch]);
  useEffect(() => {
    if (contacts) {    // dodano sprawdzenie czy contacts istnieje w localStorage
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);
  const handleAddContact = (name, number) => {
    const normalizedName = name.toLowerCase();
    const existingName = contacts.filter(
      (contact) =>
        typeof contact.name === "string" &&  // sprawdzamy czy napewno jest stringiem
        contact.name.toLowerCase() === normalizedName,
    );
    if (existingName.length > 0) {
      alert(`${name} is already on the Contacts list !`);
      return;
    }
    dispatch(addContact(name, number));  // tutaj tylko poprawiamy nawiasy
  };
  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target.value));
  };
  const filteredContacts = () => {
    if (!contacts) return [];   // dodatkowe sprawdzenie czy contacts istnieje
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(
      (contact) =>
        typeof contact.name === "string" &&  // sprawdzamy czy napewno jest stringiem
        contact.name.toLowerCase().includes(normalizeFilter),
    );
  };
  const handleDeletedContact = (id) => {
    dispatch(removeContact(id));
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
      <ContactList
        contacts={filteredContacts()}
        onDeleteContacts={handleDeletedContact}
      />
    </div>
  );
};
export default App;