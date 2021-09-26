import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MainTitle } from './App.styled';
import Section from 'components/Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const { name, number } = data;
    const newContact = {
      id: uuidv4(),
      name: name,
      number: number,
    };

    if (contacts.some(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts`);
      return;
    } else {
      this.setState({
        contacts: [...this.state.contacts, newContact],
      });
    }
  };

  filterChangeHandler = event => {
    console.log(event.currentTarget.value);
    this.setState({ filter: event.currentTarget.value });
  };

  getfilteredContacts = () => {
    const normilizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(record =>
      record.name.toLowerCase().includes(normilizedFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    console.log('App componentDidMount');

    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');

    console.log(prevState);
    console.log(this.state);

    if (this.state.contacts !== prevState.contacts) {
      console.log('Contacts updated');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    console.log('App render');

    const filteredContacts = this.getfilteredContacts();

    return (
      <>
        <MainTitle>Phonebook</MainTitle>

        <ContactForm onSubmit={this.formSubmitHandler} />

        <Section title="Contacts">
          <Filter
            value={this.state.filter}
            onChange={this.filterChangeHandler}
          />
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}

export default App;
