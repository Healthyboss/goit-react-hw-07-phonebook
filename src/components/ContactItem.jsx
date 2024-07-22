import PropTypes from 'prop-types';
import styles from "./ContactItem.module.css"

const ContactItem = ({contact, onDeleteContacts}) => 
<li className={styles.listItem}>
    {contact.name}: {contact.number}
    <button className={styles.deleteButton} onClick={()=> onDeleteContacts(contact.id)}>Delete</button>
</li>

ContactItem.propTypes ={
    contact: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    }).isRequired,
    onDeleteContacts: PropTypes.func.isRequired,
}

export default ContactItem;