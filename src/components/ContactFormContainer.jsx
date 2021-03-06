import React from 'react';
import ContactForm from './ContactForm';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

class ContactFormContainer extends React.Component {

  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showInputError = this.showInputError.bind(this);
  }

  handleOutsideClick(event) {
    const formContainer = this.form_container;

    if(event.target == formContainer) {
      this.props.closeForm();
    }
  }

  handleChange(e) {
    e.target.classList.add('active');
    this.showInputError(e.target.name);
  }

  handleSubmit() {
    const inputs = document.querySelectorAll('.contact-form__input');
    let isValid = true;

    // validate form fields
    inputs.forEach(input => {
      
      if (input.name !== 'company') {
        input.classList.add('active');
        isValid = !this.showInputError(input.name);
      }

    });

    if (isValid) {
      const form = this.form_ref;
      console.log('submit form');
      
      let formData = JSON.stringify({
        name: form.firstname.value + ' ' + form.lastname.value,
        email: form.email.value,
        company: form.company.value,
        message: form.message.value
      });

      fetch('https://mighty-meadow-15610.herokuapp.com/mail', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: formData
      })
      .then(response => response.json())
      .then(message => {
        console.log(message);
        this.props.completeForm();
      });
    }
  }

  showInputError(name) {
    const validity = document.getElementById(name).validity;
    const label = document.getElementById(`${name}Label`).textContent;
    const error = document.getElementById(`${name}Error`);
    const isError = !validity.valid;
    let message = '';

    if (isError && validity.valueMissing) {
      message = `${label} is a required field`; 
    }
    if (isError && validity.patternMismatch) {
      message = `${label} should be a valid email address`; 
    }
    error.textContent = message;

    return isError;
  }
  
  render() {
    return (
      <ContactForm 
        formContainerRef={ el => this.form_container = el }
        formRef={ el => this.form_ref = el }
        showForm={ this.props.showForm }
        closeForm={ this.props.closeForm }
        handleOutsideClick={ this.handleOutsideClick }
        handleChange={ this.handleChange }
        handleSubmit={ this.handleSubmit } 
        completed={ this.props.isComplete } />
    );
  }

}

const mapStateToProps = (state) => {
  return {
    showForm: state.contact.showForm,
    isComplete: state.contact.isComplete
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeForm: () => {
      dispatch(actions.showContactForm(false));
    },
    completeForm: () => {
      dispatch(actions.setFormCompleted(true));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactFormContainer);