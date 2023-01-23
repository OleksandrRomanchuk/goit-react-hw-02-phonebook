import { Component } from "react";
import { nanoid } from "nanoid";

//========== components ==========
import { Section } from "components/Section/Section";
import { ContactForm } from "components/ContactForm/ContactForm";
import { Filter } from "components/Filter/Filter";
import { Notification } from "components/Notification/Notification";
import { ContactList } from "components/ContactList/ContactList";

//========== styles ==========
import { PhonebookApp, Container, Title, Wrapper } from './App.styled';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addNewContact = (newContact) => {
    this.setState({contacts: [{id: nanoid(), ...newContact}, ...this.state.contacts]});
  }

  deleteContact = (dataId) => {
    this.setState((prevState) => {
      return {contacts: prevState.contacts.filter(contact => contact.id !== dataId)}
    });
  }

  setFilterWord = (event) => {
    this.setState({filter: event.target.value.trim()});
  }

  filteredContacts = () => {
    const normalizeFilterWord = this.state.filter.toLowerCase();

    return this.state.contacts.filter(({name}) => name.toLowerCase().includes(normalizeFilterWord))
  }
  
  render() {
    const contacts = this.state.contacts;
    const contacsCount = contacts.length;

    return (
      <PhonebookApp>
        <Container>
          <Title>Phonebook</Title>
          <Wrapper>
            <Section title="Form to add contacts">
              <ContactForm
                contactsList={contacts}
                getNewContactData={this.addNewContact} />
            </Section>
            
            <Section title="Contacts">
              {!contacsCount
                ? <Notification
                  message="There are no contacts" />
                : <>
                  <Filter
                    onChange={this.setFilterWord} />
                  <ContactList
                    contacts={this.filteredContacts()}
                    deleteContact={this.deleteContact} />
                </>}
            </Section>
          </Wrapper>
        </Container>
      </PhonebookApp>
    );
  };
};

export { App };