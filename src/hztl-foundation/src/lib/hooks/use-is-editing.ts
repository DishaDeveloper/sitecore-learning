import { useSitecoreContext } from '@sitecore-jss/sitecore-jss-nextjs';

const useIsEditing = () => {
  const context = useSitecoreContext();

  return context?.sitecoreContext?.pageEditing ?? false;
};

export default useIsEditing;
