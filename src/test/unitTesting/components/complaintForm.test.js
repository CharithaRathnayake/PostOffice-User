import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import NormalPost from '../../../../components/RecepForms/normalPost';
import { Provider } from "react-redux";
import {createStore} from 'redux';
import combinedReducers from "../../../../rootReducer";
import user from '@testing-library/user-event';

Enzyme.configure({adapter: new EnzymeAdapter()});

describe('Normal post', () => {
  const postOffice=[{ 
    0:{code:'1001',city:'Matara',location:{_lat: 6.033431623468471,
      _long: 80.21766589099556}},
    1:{code:'1002',city:'Colombo',location:{_lat: 6.033431623468471,
        _long: 80.21766589099556}}
  }];
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    const store=createStore(combinedReducers)
    //console.log("p",postOffice)
    render(<Provider store={store}><NormalPost onSubmit={onSubmit}postOffice={postOffice}/></Provider>);
  });
  it('onSubmit is called when all fields pass validation', async () => {
    user.type(getRecipientName(), 'Bruno');
    user.type(getRecipientAddressNo(), '34/10');
    user.type(getRecipientStreet1(), 'Parakrama');
    user.type(getRecipientStreet2(), 'Welegoda Center');
    user.type(getRecipientCity(), 'Colombo');
    user.type(getCost(), '10');
    selectAcceptedPostOffice('Matara');
    selectDestinationPostOffice('Colombo');

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        recipientName: 'Bruno',
        recipientAddressNo: '34/10',
        recipientStreet1: 'Parakrama',
        recipientStreet2: 'Welegoda Center',
        recipientCity: 'Colombo',
        cost: 10,
        acceptedPostOffice:[{code:'1001',city:'Matara',location:{_lat: 6.033431623468471,
          _long: 80.21766589099556}}],
        destinationPostOffice:'1002'
      });
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  })
  
});
function getRecipientName() {
  return screen.getByPlaceholderText("Recipient's Name", { recipientName: /recipientName/i });
}
function getRecipientAddressNo() {
  return screen.getByPlaceholderText("Recipient's Address No", { recipientAddressNo: /recipientAddressNo/i });
}
function getRecipientStreet1() {
  return screen.getByPlaceholderText("Recipient's Street 1", { recipientStreet1: /recipientStreet1/i });
}
function getRecipientStreet2() {
  return screen.getByPlaceholderText("Recipient's Street 2", { recipientStreet2: /recipientStreet2/i });
}
function getRecipientCity() {
  return screen.getByPlaceholderText("Recipient's City", { recipientCity: /recipientCity/i });
}
function getCost() {
  return screen.getByPlaceholderText("Cost", { cost: /cost/i });
}
function getAcceptedPostOffice() {
  return screen.getByPlaceholderText('Accepted PostOffice', { acceptedPostoffice: /acceptedPostOffice/i });
}
function getDestinationPostOffice() {
  return screen.getByPlaceholderText('Destination PostOffice', { destinationPostoffice: /destinationPostOffice/i });
}
function selectAcceptedPostOffice(acceptedPostOffice) {
  const dropdown = getAcceptedPostOffice();
  user.selectOptions(
    dropdown,
    within(dropdown).getByLabelText('acceptedCity', { acceptedPostOffice:acceptedPostOffice })
  );
}
function selectDestinationPostOffice(destinationPostOffice) {
  const dropdown = getDestinationPostOffice();
  user.selectOptions(
    dropdown,
    within(dropdown).getByLableText('destinationCity', { destinationPostOffice:destinationPostOffice })
  );
}
function clickSubmitButton() {
  user.click(screen.getByRole('button', { name: /Submit/i }));
}