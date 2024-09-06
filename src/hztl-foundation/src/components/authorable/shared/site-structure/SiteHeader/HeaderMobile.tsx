// Global
import { useEffect, useRef, useState } from 'react';
import { tv } from 'tailwind-variants';

// Types
import { HeaderPropsComponent, MegaMenuCategoryInterface, NavigationItem } from './headerInterface';

// Lib
import useOutsideClick from 'src/hooks/useClickOutside';

// Local
import { Logo } from './HeaderDesktop';
import { SvgIcon } from 'helpers/SvgIconWrapper';
import PreviewSearchBasicWidget from 'src/widgets/SearchPreview';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import CountrySelector from 'helpers/Forms/CountrySelector';

/*
 * Tailwind Variants
 */

const tailwindVariants = tv({
  slots: {
    base: [
      'shadow-md',
      'before:fixed',
      'before:left-[0]',
      'before:top-[0]',
      'before:z-[9]',
      'before:h-full',
      'before:w-full',
      'before:bg-black/[0.5]',
      'before:backdrop-blur-sm',
    ],
    wrapper: ['fixed', 'top-0', 'w-full', 'bg-inherit', 'z-50', 'bg-white'],
    divider: ['h-xs', 'w-full', 'bg-grayscale-w-600'],
    headerSection: ['flex', 'justify-between', 'p-s'],
    hamburgerWrapper: ['flex', 'items-center'],
    languageWrapper: ['absolute', 'bg-white', 'w-full', 'border-b', 'border-black'],
    languageSelection: ['p-spacing-spacing-4', 'bg-grayscale-w-200', 'rounded my-1'],
    searchWrapper: ['p-xxs', 'bg-white', 'search-wrapper'],
    menuItems: ['flex', 'flex-col', 'gap-spacing-spacing-4', 'm-0', 'p-spacing-spacing-4'],
    menuNavItem: ['relative', 'group', 'list-none', 'm-0'],
    linkWrapper: [
      'text-black',
      'text-s',
      'gap-xxs',
      '!place-items-center',
      'font-semibold',
      'px-spacing-spacing-4',
    ],
    dropDownButton: [
      'w-full',
      'text-black',
      'text-s',
      'gap-xxs',
      '!place-items-center',
      'font-semibold',
      'cursor-pointer',
      'flex',
      'items-start',
      'justify-between',
      'px-spacing-spacing-4',
    ],
    dropDownMenuWrapper: ['bg-grayscale-w-200', 'my-spacing-spacing-4'],
    dropDownMenuGroup: ['px-spacing-spacing-4', 'pt-spacing-spacing-4'],
    dropDownItemName: ['font-bold', 'text-lg'],
    dropDownItem: ['py-spacing-spacing-4'],
    hamburgerBase: ['flex', 'w-full', 'h-full', 'justify-center', 'gap-4', 'items-center'],
    hamburgerItem: [
      'toggle-menu',
      'relative',
      'mt-0',
      'flex',
      'w-s',
      'items-center',
      'justify-center',
    ],
  },
});

const HeaderMobile = (props: HeaderPropsComponent) => {
  const { HeaderData, selectedCountry, setSelectedCountry } = props;
  const { item } = HeaderData;
  const [dropdownOpen, setDropdownOpen] = useState<null | number>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const isDropdownOpen = dropdownOpen !== null || showSearch || openMenu;
  const headerRef = useRef<HTMLDivElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = () => {
    handleDropdownToggle(null);
    setShowSearch(false);
    setOpenMenu(false);
  };
  useOutsideClick(headerRef, isDropdownOpen, handleClickOutside);
  const handleDropdownToggle = (index: number | null) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };
  const toggleHamburger = () => {
    setShowSearch(false);
    setOpenMenu(!openMenu);
  };

  const toggleSearch = () => {
    setOpenMenu(!openMenu);
    setShowSearch(true);
  };

  useEffect(() => {
    const currentHeaderRef = headerRef.current;
    const currentMenuContainerRef = menuContainerRef.current;

    const updateMenuHeight = () => {
      if (currentHeaderRef && currentMenuContainerRef) {
        const totalMenuHeight =
          currentHeaderRef.offsetHeight + currentMenuContainerRef.offsetHeight;
        setMenuHeight(totalMenuHeight);

        if (totalMenuHeight > window.innerHeight) {
          currentHeaderRef.style.height = '100%';
          currentHeaderRef.style.overflow = 'auto';
        } else {
          currentHeaderRef.style.height = 'initial';
          currentHeaderRef.style.overflow = 'initial';
        }
      }
    };

    const handleResize = () => {
      updateMenuHeight();
    };

    if (isDropdownOpen) {
      document.body.style.overflow = 'hidden';
      updateMenuHeight();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.body.style.overflow = 'initial';
      if (currentHeaderRef) {
        currentHeaderRef.style.height = 'initial';
      }
    };
  }, [openMenu, menuHeight, dropdownOpen]);

  const {
    base,
    wrapper,
    divider,
    headerSection,
    hamburgerWrapper,
    languageWrapper,
    languageSelection,
    searchWrapper,
    menuItems,
  } = tailwindVariants();

  /*
   * Rendering
   */

  if (!item) {
    return <></>;
  }
  const { logo, logoLink, navigationList } = item;
  return (
    <>
      {openMenu && isDropdownOpen && <div className={base()}></div>}
      <div className={`${wrapper()} ${!openMenu ? 'border-b border-black' : ''}`} ref={headerRef}>
        <div className={divider()}></div>
        <div className={headerSection()}>
          <Logo logo={logo.jsonValue} logoLink={logoLink.jsonValue} />
          <div className={hamburgerWrapper()}>
            <Hamburger
              toggleHamburger={toggleHamburger}
              toggleSearch={toggleSearch}
              openMenu={openMenu}
            />
          </div>
        </div>

        {openMenu && (
          <div className={languageWrapper()} ref={menuContainerRef}>
            {!showSearch && (
              <div className={languageSelection()}>
                <CountrySelector
                  countryData={item?.country?.targetItems}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                />
              </div>
            )}

            {showSearch ? (
              <div className={searchWrapper()}>
                <PreviewSearchBasicWidget rfkId={'rfkid_101'} defaultItemsPerPage={5} />
              </div>
            ) : (
              <ul className={menuItems()} role="presentation">
                {navigationList.items &&
                  navigationList.items.map((item, index) => (
                    <NavItem
                      key={index}
                      index={index}
                      {...item}
                      onClick={() => handleDropdownToggle(index)}
                      dropdownOpen={dropdownOpen}
                    />
                  ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default HeaderMobile;

interface NavItemInterface extends NavigationItem {
  onClick: () => void;
  dropdownOpen: number | null;
  index: number;
}
const NavItem = (props: NavItemInterface) => {
  const isList = props.megaMenuList.items.length > 0;
  const rotationClass = isList && props.index === props.dropdownOpen ? '-rotate-0' : 'rotate-180';

  const { menuNavItem, linkWrapper, dropDownButton } = tailwindVariants();

  return (
    <li className={menuNavItem()} role="presentation">
      {!isList ? (
        <LinkWrapper
          role="menuitem"
          aria-haspopup="false"
          field={props.navigationLink.jsonValue}
          className={linkWrapper()}
        >
          <PlainTextWrapper field={props.navigationTitle.jsonValue} />
        </LinkWrapper>
      ) : (
        <button
          role="menuitem"
          aria-haspopup="true"
          onClick={props.onClick}
          className={dropDownButton()}
        >
          <span>{props.name}</span>
          <span className="flex">
            <SvgIcon
              viewBox="0 0 16 9"
              className={`trasition ${rotationClass} duration-200 stroke-black !w-xs h-auto`}
              icon="chevron-up"
              size="xs"
              fill="none"
            />
          </span>
        </button>
      )}
      {props.megaMenuList.items.length > 0 && props.dropdownOpen === props.index && (
        <DropdownMenu categories={props.megaMenuList.items} />
      )}
    </li>
  );
};

export const DropdownMenu = ({ categories }: { categories: MegaMenuCategoryInterface[] }) => {
  const { dropDownMenuWrapper, dropDownMenuGroup, dropDownItemName, dropDownItem } =
    tailwindVariants();

  return (
    <div className={dropDownMenuWrapper()}>
      {categories.map((category, index) => (
        <div
          className={dropDownMenuGroup()}
          key={index}
          role="group"
          aria-labelledby={`secondary-menu-${index + 1}`}
        >
          <h2 className={dropDownItemName()} id={`secondary-menu-${index + 1}`}>
            {category.name}
          </h2>
          <ul>
            {category.megaMenuLinks.items.map((item, i) => (
              <li className={dropDownItem()} key={i} role="presentation">
                <LinkWrapper field={item.link.jsonValue} role="menuitem"></LinkWrapper>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const Hamburger = ({
  toggleHamburger,
  toggleSearch,
  openMenu,
}: {
  toggleHamburger: () => void;
  toggleSearch: () => void;
  openMenu: boolean;
}) => {
  const { hamburgerBase, hamburgerItem } = tailwindVariants();
  return (
    <ul className={hamburgerBase()}>
      <li className={hamburgerItem()}>
        <button
          className="hamburger-button items-center align-middle absolute right-0 z-[2] block h-m w-[17px] cursor-pointer"
          aria-label="Toogle Search"
          aria-expanded={openMenu}
          onClick={() => toggleSearch()}
        >
          {/* Todo: Use the SVGIcon helper component */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </li>
      <li className="toggle-menu relative mb-2 flex w-s items-center justify-center">
        <button
          className="hamburger-button absolute right-2 z-[2] block h-m w-[17px] cursor-pointer"
          aria-label="Toggle Menu"
          aria-expanded={openMenu}
          onClick={() => toggleHamburger()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.80005 7.99999C4.80005 7.11634 5.51639 6.39999 6.40005 6.39999H25.6C26.4837 6.39999 27.2001 7.11634 27.2001 7.99999C27.2001 8.88365 26.4837 9.59999 25.6 9.59999H6.40005C5.51639 9.59999 4.80005 8.88365 4.80005 7.99999Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.80005 16C4.80005 15.1163 5.51639 14.4 6.40005 14.4H25.6C26.4837 14.4 27.2001 15.1163 27.2001 16C27.2001 16.8836 26.4837 17.6 25.6 17.6H6.40005C5.51639 17.6 4.80005 16.8836 4.80005 16Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.80005 24C4.80005 23.1163 5.51639 22.4 6.40005 22.4H25.6C26.4837 22.4 27.2001 23.1163 27.2001 24C27.2001 24.8836 26.4837 25.6 25.6 25.6H6.40005C5.51639 25.6 4.80005 24.8836 4.80005 24Z"
              fill="black"
            />
          </svg>
        </button>
      </li>
    </ul>
  );
};
