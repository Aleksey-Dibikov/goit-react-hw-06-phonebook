import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addContact } from '../../redux/contacts/contacts-actions';
import s from './ContactsForm.module.css';

function ContactsForm({ onAddContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = uuidv4();
  const numberId = uuidv4();

  const handleInputChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAddContact({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.TaskEditor}>
      <label id={nameId} className={s.TaskEditor_label}>
        <input
          className={s.TaskEditor_input}
          id={nameId}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв,
            апострофа, тире и пробелов.
            Например Adrian, Jacob Mercer,
            Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={handleInputChange}
        />
      </label>
      <label id={numberId} className={s.TaskEditor_label}>
        <input
          className={s.TaskEditor_input}
          id={numberId}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={handleInputChange}
        />
      </label>
      <button className={s.TaskEditor_button} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactsForm.propTypes = {
  onAddContact: PropTypes.func,
  name: PropTypes.string,
  number: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddContact: ({name, number}) => dispatch(addContact({name, number})),
  }
};

export default connect(null, mapDispatchToProps)(ContactsForm)
