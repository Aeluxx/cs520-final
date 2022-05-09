import React from 'react';
import '@testing-library/jest-dom';
import Edit from '../components/Edit/Edit';
import ShallowRenderer from 'react-test-renderer/shallow';

let realUseContext;
let useContextMock;

beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
});

afterEach(() => {
    React.useContext = realUseContext;
});

it("Edit renders without error", () => {
    useContextMock.mockReturnValue("Test Value");
    const shallow = new ShallowRenderer();
    const edit = shallow.render(<Edit />);
});

it("Edit matches Snapshot", () => {
    useContextMock.mockReturnValue("Test Value");
    const shallow = new ShallowRenderer();
    const edit = shallow.render(<Edit />);
    const result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
});