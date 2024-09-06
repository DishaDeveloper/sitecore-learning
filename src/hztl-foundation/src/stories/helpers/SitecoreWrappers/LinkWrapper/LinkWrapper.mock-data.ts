const defaultData = {
  className: '',
  editable: false,
  field: {
    value: {
      href: 'https://www.example.com',
      linktype: undefined,
      target: '_self',
      text: 'Link with screen reader text that opens in the current tab',
      title: undefined,
    },
  },
  srOnlyText: 'Only screen readers can access this text',
  suppressNewTabIcon: true,
};

export const emailLink = {
  ...defaultData,
  field: {
    value: {
      href: 'mailto:example@example.com',
      text: 'example@example.com',
    },
  },
  suppressNewTabIcon: true,
};

export const externalLink = {
  ...defaultData,
  field: {
    value: {
      ...defaultData.field.value,
      linktype: 'external',
      target: '_blank',
      text: 'Link with screen reader text that opens in a new tab',
    },
  },
  suppressNewTabIcon: false,
};

export const linkWithChildren = {
  ...defaultData,
  children: 'Image',
  showLinkTextWithChildrenPresent: false,
};

export const noContent = {
  field: {
    value: {},
  },
  suppressLinkText: false,
};

export default defaultData;
