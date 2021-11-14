import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contacts-actions';
import s from './ContactList.module.css';
function ContactList({ contacts, onDeleteContact }) {

  return (
    <ul className={s.TaskList}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.TaskList_item}>
          {name} : {number}
          <button
            className={s.TaskList_button}
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  onDeleteContact: PropTypes.func,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }),
  ),
};

const visibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();

  return allContacts.filter(({name}) =>
    name.toLowerCase().includes(normalizedFilter),
  );
};

const mapStateToProps = ({contacts: {items, filter}}) => ({
  contacts: visibleContacts(items, filter)
})

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(deleteContact(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);