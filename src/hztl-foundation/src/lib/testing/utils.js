// Global
import { ComponentPropsContext, SitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';
import { render, fireEvent, waitFor } from '@testing-library/react';

// Lib
import createComponentFactory from './mock-placeholder';

jest.mock('next/router', () => require('next-router-mock'));
jest.spyOn(global.Date, 'now').mockImplementation(() => new Date(epochMs).valueOf());

export const renderComponent = (
  Component,
  {
    componentProps = {},
    staticProps = {},
    componentFactory = createComponentFactory(),
    sitecoreContext = {
      route: {
        name: 'Foo',
        placeholders: {},
      },
    },
  }
) =>
  render(
    <ComponentPropsContext value={staticProps}>
      <FastSitecoreContext componentFactory={componentFactory} context={sitecoreContext}>
        <Component {...componentProps} />
      </FastSitecoreContext>
    </ComponentPropsContext>
  );

export const snapshot = (Component, mockData) => {
  const component = renderComponent(Component, mockData);
  expect(component.container.firstChild).toMatchSnapshot();
  return component;
};

export const hasDataComponent = (component, name) => {
  const nodes = component.baseElement.querySelectorAll(`[data-component="${name}"]`);
  expect(nodes.length).toBe(1);
};

export const testFieldError = async (Component, mockData, { label, value, error }) => {
  const component = renderComponent(Component, mockData);
  const field = component.getByLabelText(label);
  fireEvent.change(field, { target: { value } });
  field.blur();
  await waitFor(() => {
    const err = component.queryByText(error);
    return expect(err).not.toBe(null);
  });
};
