import React, { useState } from 'react';
import PropTypes from "prop-types";
import styles from "./ContactForm.module.css"

const ContactForm = ({onAddContact}) => {
    const[name, setName] = useState('');
    const[number, setNumber] = useState('');

    const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() && number.trim()) {
        onAddContact(name, number);
        setName('');
        setNumber('');
    }
   };

   return(
    <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.fieldName}>
              Full Name: <input className={styles.input}
                type="text"
                name="name"
                pattern= "[A-Za-zÀ-ÿąęłńóśźżĄĘŁŃÓŚŹŻ ]+"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                value ={name}
                onChange={(event) => setName(event.target.value)}
            />
        </label>

        <label className={styles.fieldName}>
              Telephone Number <input className={styles.input}
                type="tel"
                name="number"
                pattern="\+?[0-9\s\-]+"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                value={number}
                onChange={(event) => setNumber(event.target.value)}
            />
        </label>

        <button className={styles.button} type="submit"> Add Contact </button>
    </form>
   )
}

ContactForm.propTypes ={
 onAddContact: PropTypes.func.isRequired,
}

export default ContactForm;