import React from 'react';
import '@testing-library/jest-dom';
import ConfirmDialog from '../components/ConfirmDialog/ConfirmDialog';
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

it("ConfirmDialog renders without error", () => {
    useContextMock.mockReturnValue("Test Value");
    const shallow = new ShallowRenderer();
    const confirmDialog = shallow.render(<ConfirmDialog />);
});

it("ConfirmDialog matches Snapshot", () => {
    useContextMock.mockReturnValue("Test Value");
    const shallow = new ShallowRenderer();
    const confirmDialog = shallow.render(<ConfirmDialog />);
    const result = shallow.getRenderOutput();
    expect(result).toMatchSnapshot();
});