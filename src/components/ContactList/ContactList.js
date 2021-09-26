import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'components/ContactList/ContactList.styled';
import { Button } from 'components/Button/Button.styled';

const ContactList = ({ contacts, onDeleteContact }) => (
  <List>
    {contacts.map(contact => (
      <ListItem key={contact.id}>
        {contact.name}: {contact.number}
        <Button type="button" onClick={() => onDeleteContact(contact.id)}>
          Delete
        </Button>
      </ListItem>
    ))}
  </List>
);

ContactList.propTypes = {
  contacts: PropTypes.array,
  onDeleteContact: PropTypes.func,
};

export default ContactList;
