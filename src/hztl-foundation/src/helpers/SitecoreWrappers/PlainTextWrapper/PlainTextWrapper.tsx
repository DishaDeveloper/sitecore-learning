// Global
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { TextProps } from '@sitecore-jss/sitecore-jss-react/types/components/Text';
import React from 'react';

//Local
import useIsEditing from 'lib/hooks/use-is-editing';

const PlainTextWrapper = ({ field, editable = true, ...props }: TextProps): JSX.Element => {
  const isEditing = useIsEditing();

  const hasValue = !!field?.value;

  // We should only render if it has a value, or if we are editing
  const shouldRender = hasValue || (isEditing && editable);

  if (!shouldRender) return <></>;

  return (
    <Text
      {...props}
      data-component="helpers/fieldwrappers/plaintextwrapper"
      editable={editable}
      field={field}
    />
  );
};

export default PlainTextWrapper;
