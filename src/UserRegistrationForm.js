import React,{ Component } from 'react'
import './UserRegistrationForm.css'

//-------------------------------------------------------------------------------------------------
class UserRegistrationForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            npiNumber: '',
            businessAddress: '',
            phoneNumber: '',
            email: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //---------------------------------------------------------------------------------------------
    handleSubmit(event) {


        const {
            firstName,
            lastName,
            npiNumber,
            businessAddress,
            phoneNumber,
            email
        } = this.state;

        // validate entered data upon form submit
        if (!this.isValidName(firstName) ||
            !this.isValidName(lastName) ||
            !this.isValidNipNumber(npiNumber) ||
            !this.isValidStreetAddress(businessAddress) ||
            !this.isValidPhoneNumber(phoneNumber) ||
            !this.isValidEmailAddress(email)
        ) {
            alert("Please enter valid information.");
            // if data is not valid, then don't submit it
            event.preventDefault();
        } else {
            let message = ("Registration information: \n\n"
                + "First Name: " + firstName +"\n"
                + "Last Name: " + lastName +"\n"
                + "NPI Number: " + npiNumber +"\n"
                + "Business Address: " + businessAddress +"\n"
                + "Telephone Number: " + phoneNumber +"\n"
                + "Email: " + email
            );
            alert(message);
            console.log(message);
        }
    }

    //---------------------------------------------------------------------------------------------
    handleChange(event) {

        this.setState( { [event.target.id]: event.target.value } )
        let errorText = "";
        let isValid = true;
        let elementId = event.target.id;

        if ( elementId === "firstName" ) {
            if ( !this.isValidName(event.target.value) ) {
                errorText = "Please enter a valid first name";
                isValid = false;
            }
        } else if ( elementId === "lastName" ) {
            if ( !this.isValidName(event.target.value) ) {
                errorText = "Please enter a valid last name";
                isValid = false;
            }
        } else if ( elementId === "npiNumber" ) {
            if ( !this.isValidNipNumber(event.target.value) ) {
                errorText = "Please enter a valid (10 digits) NPI number. Example: 0123456789";
                isValid = false;
            }
        } else if ( elementId === "businessAddress" ) {
            if ( !this.isValidStreetAddress(event.target.value) ) {
                errorText = "Please enter a valid address: # Street, City, State Zip";
                isValid = false;
            }
        } else if ( elementId === "phoneNumber" ) {
            if ( !this.isValidPhoneNumber(event.target.value) ) {
                errorText = "Please enter a valid phone number. Example: 123 456 7890";
                isValid = false;
            }
        } else if ( elementId === "email" ) {
            if ( !this.isValidEmailAddress(event.target.value) ) {
                errorText = "Please enter a valid email address";
                isValid = false;
            }
        }

        // update input field style and warning label
        document.getElementById(elementId + "Warning").innerHTML = errorText;
        if ( !isValid ) {
            document.getElementById(elementId).classList.add("invalid_input");
        } else {
            document.getElementById(elementId).classList.remove("invalid_input");
        }
    }

    //---------------------------------------------------------------------------------------------
    isValidName(name) {

        let isValid = false;
        if ( name.length >= 2 && name.length <= 25 ) {
            isValid = true;
        }
        return isValid;
    }

    //---------------------------------------------------------------------------------------------
    isValidNipNumber(npiNumber) {

        let isValid = false;
        let npiFormat = /^\d{10}$/;
        if ( npiNumber.match(npiFormat) ) {
            isValid = true;
        }
        return isValid;
    }

    //---------------------------------------------------------------------------------------------
    isValidStreetAddress(businessAddress) {

        let isValid = false;
        let addressFormat = /(\w+\s[A-z]+\.?\s?)+(?=(,\s([A-z]+\s?)+,\s[A-Z]{2}\s\d{5}))/g;
        if ( businessAddress.match(addressFormat) ) {
            isValid = true;
        }
        return isValid;
    }

    //---------------------------------------------------------------------------------------------
    isValidPhoneNumber(phoneNumber) {

        let isValid = false;
        let phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if ( phoneNumber.match(phoneFormat) ) {
            isValid = true;
        }
        return isValid;
    }

    //---------------------------------------------------------------------------------------------
    isValidEmailAddress(email) {

        let isValid = false;
        let emailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if ( email.match(emailFormat) ) {
            isValid = true;
        }
        return isValid;
    }

    //---------------------------------------------------------------------------------------------
    render(){

        return(
            <form onSubmit={this.handleSubmit}>
                <div className="form_body">
                    <div className="form_header">User Registration Form</div>

                    <hr></hr>

                    <label>* First Name: </label>
                    <input id="firstName" value={this.state.firstName} onChange={this.handleChange} type="text" placeholder="First Name" maxLength="25" required/>
                    <label id="firstNameWarning"></label>

                    <label>* Last Name: </label>
                    <input id="lastName" name="lastName" value={this.state.lastName} onChange = {this.handleChange} type="text" placeholder="Last Name" maxLength="25" required/>
                    <label id="lastNameWarning"></label>

                    <label>* NPI Number: </label>
                    <input id="npiNumber" value={this.state.npiNumber} onChange = {this.handleChange} type="number" placeholder="##########" required/>
                    <label id="npiNumberWarning"></label>

                    <label>* Business Address: </label>
                    <input id="businessAddress" value={this.state.businessAddress} onChange = {this.handleChange} type="text" placeholder="# Street, City, State Zip" required/>
                    <label id="businessAddressWarning"></label>

                    <label>* Telephone Number: </label>
                    <input id="phoneNumber" value={this.state.phoneNumber} onChange = {this.handleChange} type="tel" placeholder="### ### ####" required/>
                    <label id="phoneNumberWarning"></label>

                    <label>* Email: </label>
                    <input id="email" value={this.state.email} onChange = {this.handleChange} type="email" placeholder="Email Address" required/>
                    <label id="emailWarning"></label>

                    <button type="submit">Register</button>
                </div>
            </form>
        )

    }
}

//-------------------------------------------------------------------------------------------------
export default UserRegistrationForm;
