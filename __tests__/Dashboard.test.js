import React from 'react';
import '@testing-library/jest-dom';
import Dashboard from '../components/Dashboard/Dashboard';
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

it("Dashboard renders without error", () => {
    useContextMock.mockReturnValue("Test Value");
    const shallow = new ShallowRenderer();
    const dashboard = shallow.render(<Dashboard />);
});

it("Dashboard matches Snapshot", () => {
    useContextMock.mockReturnValue("Test Value");
    const shallow = new ShallowRenderer();
    const dashboard = shallow.render(<Dashboard />);
    const result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
});