import PropTypes, { number } from 'prop-types';
import ContactItem from './ContactItem';
import styles from "./ContactList.module.css";

const ContactList = ({contacts, onDeleteContacts }) =>(
    <ul className={styles.contactList}>
    {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact} onDeleteContacts={onDeleteContacts} />
    ))}
    </ul>
)

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDeleteContacts: PropTypes.func.isRequired,
}

export default ContactList;