import PropTypes from "prop-types";
import styles from "./Filter.module.css"

const Filter =({value, onChange}) => (
    <label className={styles.fieldName}>
        Find contact by name:
        <input 
        className={styles.input} 
        type="text" 
        value={value} 
        onChange={onChange}
        placeholder="Search contacts..."/>
    </label>
);

Filter.propTypes ={
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Filter;