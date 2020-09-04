import React from 'react';
import ReactDOM from 'react-dom';
import { screen, fireEvent, act } from '@testing-library/react';
import ContactForm from './ContactForm';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

test('ContactForm adds new contacts to the list', () => {
    act(() => {
        ReactDOM.render(<ContactForm />, container);
    });

    const firstNameInput = screen.getByTestId(/firstName/i);
    const lastNameInput = screen.getByTestId(/lastName/i);
    const emailInput = screen.getByTestId(/email/i);
    const messageInput = screen.getByTestId(/message/i);

    act(() => {
    fireEvent.change(firstNameInput, { target: { value: 'Chris' } });
    fireEvent.change(lastNameInput, { target: { value: 'Corbin' } });
    fireEvent.change(emailInput, { target: { value: 'corbin-christopher@lambndastudents.com' } });
    fireEvent.change(messageInput, { target: { value: 'I may like this better than Cypress!?' } });
    });

    const submitButton = screen.getByTestId(/submit/i);

    act(() => {
    fireEvent.click(submitButton);
    });

    expect(firstNameInput).toHaveValue('Chris');
    expect(lastNameInput).toHaveValue('Corbin');
    expect(emailInput).toHaveValue('corbin-christopher@lambndastudents.com');
    expect(messageInput).toHaveValue('I may like this better than Cypress!?');
    });