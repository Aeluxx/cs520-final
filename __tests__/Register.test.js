import React from 'react';
import '@testing-library/jest-dom';
import Register from '../components/Register/Register';
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

it("Register renders without error", () => {
    useContextMock.mockReturnValue("Test Value");
    const shallow = new ShallowRenderer();
    const register = shallow.render(<Register />);
});

it("Register matches Snapshot", () => {
    useContextMock.mockReturnValue("Test Value");
    const shallow = new ShallowRenderer();
    const register = shallow.render(<Register />);
    const result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
});