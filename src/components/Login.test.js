import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { within } from '@testing-library/dom'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from './Login';

const mockStore = configureStore([thunk]);

describe('Login', () => {
    let store, component;

    beforeEach(() => {
        store = mockStore({
            users: {
                sarahedo: {
                    id: 'sarahedo',
                    name: 'Sarah Edo',
                },
                tylermcginnis: {
                    id: 'tylermcginnis',
                    name: 'Tyler McGinnis',
                },
                mtsamis: {
                    id: 'mtsamis',
                    name: 'Mike Tsamis',
                },
                zoshikanlu: {
                    id: 'zoshikanlu',
                    name: 'Zenobia Oshikanlu',
                },
            },
        });
    });

    it('will match snapshot', () => {
        component = render(
            <Provider store = {store}>
                <Login />
            </Provider>
        );

        expect(component).toMatchSnapshot();
    });

    it('should select a user from the dropdown', () => {
        const { getByTestId } = render(
            <Provider store = {store}>
                <Login />
            </Provider>
        )

        component = getByTestId('Test Component');
        const dropdownOptions = within(component).getAllByRole('option');
        const option = dropdownOptions[1];
        
        fireEvent.click(option);
        expect(option.getAttribute('aria-selected')).toBe('true');
      });
})