import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = value => (value.trim() === '')
const isSixChars = value => (value.trim().length === 6)

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postal: true,
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const nameIsValid = !isEmpty(enteredName)
        const streetIsValid = !isEmpty(enteredStreet)
        const postalIsValid = isSixChars(enteredPostal)
        const cityIsValid = !isEmpty(enteredCity)

        setFormInputsValidity({
            name: nameIsValid,
            street: streetIsValid,
            postal: postalIsValid,
            city: cityIsValid
        })

        const formIsValid =
            enteredName &&
            enteredCity &&
            enteredPostal &&
            enteredStreet

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postal: enteredPostal
        })
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameInputRef} type='text' id='name' />
                {!formInputsValidity.name && <p>Enter a Valid Name</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input ref={streetInputRef} type='text' id='street' />
                {!formInputsValidity.street && <p>Enter a Valid Street</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalInputRef} type='text' id='postal' />
                {!formInputsValidity.postal && <p>Enter a Valid Postal Code</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input ref={cityInputRef} type='text' id='city' />
                {!formInputsValidity.city && <p>Enter a Valid City</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;