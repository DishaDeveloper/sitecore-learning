import { ComponentProps } from 'lib/component-props';
import { withPagesStyleChangeWatcher } from './withPagesStyleChangeWatcher';
import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * Component wrapper HOC with all the standard functionality we expect for most components
 * @param Component The component itself
 * @returns The wrapped component with added functionality
 */
export function withStandardComponentWrapper<P extends ComponentProps>(
  Component: React.ComponentType<P>,
  hasDataSource = true
) {
  const WithDataSourceComponent = hasDataSource ? withDatasourceCheck()(Component) : Component;
  const WrappedComponent = withPagesStyleChangeWatcher(WithDataSourceComponent);

  return WrappedComponent;
}
