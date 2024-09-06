import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

/**
 * "Normal" mode means we are not in "edit" or "preview" mode.
 * @returns Whether we are rendering in "normal" mode.
 */
const useIsNormalMode = (): boolean => {
  const context = useSitecoreContext();
  // This should only happen when we're running outside of Sitecore, e.g. Storybook and unit tests.
  if (!context?.sitecoreContext?.pageState) {
    return true;
  }
  return context?.sitecoreContext.pageState === 'normal';
};

export default useIsNormalMode;
