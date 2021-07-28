import React from 'react';
import renderer from 'react-test-renderer';
 
import UploadUser from './uploadUser';
 
describe('Sales Report Upload', () => {
  test('snapshot renders', () => {
    const component = renderer.create(<UploadUser />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});