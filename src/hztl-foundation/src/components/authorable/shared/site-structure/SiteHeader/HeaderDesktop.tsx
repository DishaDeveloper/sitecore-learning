// Global
import { ImageField, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { tv } from 'tailwind-variants';

// Lib
import useOutsideClick from 'src/hooks/useClickOutside';
import useIsEditing from 'lib/hooks/use-is-editing';

// Local
import { HeaderPropsComponent, MegaMenuCategoryInterface, NavigationItem } from './headerInterface';
import CountrySelector from 'helpers/Forms/CountrySelector';
import PreviewSearchListComponent from 'src/widgets/SearchPreview';
import { SvgIcon } from 'helpers/SvgIconWrapper';
import ImageWrapper from 'helpers/SitecoreWrappers/ImageWrapper/ImageWrapper';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';

/*
 * Tailwind Variants
 */

const tailwindVariants = tv({
  slots: {
    overlay: [
      'shadow-md',
      'before:fixed',
      'before:left-0',
      'before:top-0',
      'before:z-[9]',
      'before:h-full',
      'before:w-full',
      'before:bg-black/50',
      'before:backdrop-blur-sm',
    ],
    base: ['top-0', 'w-full', 'bg-white', 'z-50', 'font-avenir', '!md:text-cyan-700'],
    wrapper: ['border-color-grayscale-base-black'],
    divider: ['h-3', 'opacity-100', 'bg-color-grayscale-warm-600'],
    inner: ['flex', 'justify-center', 'p-spacing-spacing-4'],
    container: ['w-full', 'max-w-screen-xl'],
    menuWrapper: ['flex', 'justify-between'],
    menuItems: [
      'flex',
      'items-center',
      'lg:gap-spacing-spacing-4',
      'px-spacing-spacing-3',
      'lg:px-10',
    ],
    languageWrapper: ['flex', 'justify-end', 'items-center'],
    searchBox: ['w-[25%]', 'float-right', 'px-xs', 'bg-white', 'py-xs', 'shadow-md'],
    buttonItemSublink: ['flex', 'items-center', 'gap-2'],
    dropDownMenuWrapper: [
      'absolute',
      'transition-all',
      'duration-200',
      'left-0',
      'w-full',
      'z-[9]',
      'overflow-hidden',
    ],
    dropDownMenuInner: ['bg-grayscale-w-200', 'mt-6'],
    dropDownMenuSection: [
      'flex',
      'items-center',
      'justify-between',
      'max-w-screen-xl',
      'xl:mx-auto',
      'py-10',
      'px-20',
    ],
    dropDownMenuContent: ['w-full', 'my-xxs'],
    dropDownMenuGrid: ['gap-y-0', 'gap-xl', 'md:grid-cols-12', 'grid'],
    dropDownMenuCol: ['text-start', 'col-span-4', 'py-xxxs', 'xl:col-span-3'],
    dropDownMenuColHeading: ['font-bold', 'text-lg', 'mb-xxs'],
    dropDownMenuColItems: ['flex flex-col', 'gap-2', 'list-none'],
    dropDownMenuColItemsLink: ['font-notoSans', 'text-grayscale-w-600', 'hover:underline'],
  },
});

const HeaderDesktop = (props: HeaderPropsComponent) => {
  const { HeaderData, selectedCountry, setSelectedCountry } = props;
  const { item } = HeaderData;
  const [dropdownOpen, setDropdownOpen] = useState<null | number>(null);
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const isDropdownOpen = dropdownOpen !== null || showSearch;
  const handleClickOutside = () => {
    handleDropdownToggle(null);
    setShowSearch(false);
  };
  useOutsideClick(headerRef, isDropdownOpen, handleClickOutside);
  const handleDropdownToggle = (index: number | null) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setDropdownOpen(null);
      setShowSearch(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const isEditing = useIsEditing();

  const {
    overlay,
    base,
    wrapper,
    divider,
    inner,
    container,
    menuWrapper,
    menuItems,
    languageWrapper,
    searchBox,
  } = tailwindVariants();

  const { logo, logoLink, navigationList } = item;

  /*
   * Rendering
   */

  if (!item) {
    return <></>;
  }

  return (
    <>
      {isDropdownOpen && <div className={overlay()}></div>}
      <div className={`${!isEditing ? 'fixed' : 'relative'} ${base()}`} ref={headerRef}>
        <div className={`${wrapper()} ${isDropdownOpen ? 'border-b-2' : 'border-b'}`}>
          <hr className={divider()}></hr>
          <div className={inner()}>
            <div className={container()}>
              <div className={menuWrapper()}>
                <div className="flex">
                  <Logo logo={logo.jsonValue} logoLink={logoLink.jsonValue} />
                  <ul className={menuItems()} role="presentation">
                    {navigationList?.items?.map((item, index) => (
                      <NavItem
                        key={index}
                        index={index}
                        {...item}
                        open={() => {
                          handleDropdownToggle(index);
                          setShowSearch(false);
                        }}
                        router={router.asPath}
                        dropdownOpen={dropdownOpen}
                        isScrolled={isScrolled}
                      />
                    ))}
                  </ul>
                </div>
                <div className={languageWrapper()}>
                  <div>
                    <CountrySelector
                      countryData={item?.country?.targetItems}
                      selectedCountry={selectedCountry}
                      setSelectedCountry={setSelectedCountry}
                    />
                  </div>
                  <div className="flex">
                    <PreviewSearchListComponent rfkId={'rfkid_101'} defaultItemsPerPage={5} />
                    {/* <button
                    className={`flex flex-row hover:bg-grayscale-w-200 p-s rounded-full cursor-pointer ${
                      showSearch && 'bg-grayscale-w-200'
                    }`}
                    onClick={() => {
                      handleDropdownToggle(null);
                      setShowSearch(!showSearch);
                    }}
                  >
                    {/* temporary disabling these for version 2 enhancement */}
                    {/* <SvgIcon icon="outline-search" size="xs" /> */}
                    {/* </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showSearch && <div className={searchBox()}></div>}
      </div>
    </>
  );
};
export default HeaderDesktop;

export const Logo = ({ logo, logoLink }: { logo: ImageField; logoLink: LinkField }) => (
  <div className="flex items-center">
    <LinkWrapper field={logoLink?.value}>
      <ImageWrapper field={logo} />
    </LinkWrapper>
  </div>
);
interface NavItemInterface extends NavigationItem {
  open: () => void;
  dropdownOpen: number | null;
  index: number;
  isScrolled: boolean;
  router: string;
}
const NavItem = (props: NavItemInterface) => {
  const [isActive, setIsActive] = useState(false);
  const isList = props?.megaMenuList.items.length > 0;
  const navigationLinks = props?.navigationLink?.jsonValue?.value?.href;
  useEffect(() => {
    if (isList) {
      const hrefValues = props.megaMenuList.items
        .flatMap((category) => category.megaMenuLinks.items)
        .map((linkItem) => linkItem.link.jsonValue.value.href)
        .filter((href) => href);
      setIsActive(hrefValues.includes(props.router));
    } else {
      const _isActive = props.router === navigationLinks;
      setIsActive(_isActive);
    }
  }, [navigationLinks, props.router]);
  const rotationClass = isList && props.index === props.dropdownOpen ? 'rotate-0' : 'rotate-180';
  const strokeClass = isActive ? 'stroke-white' : 'stroke-black';

  const { buttonItemSublink } = tailwindVariants();

  return (
    <li>
      {!isList ? (
        <LinkWrapper
          role="menuitem"
          aria-haspopup="false"
          field={props?.navigationLink.jsonValue}
          className="text-sub-heading font-semibold text-color-grayscale-base-black py-1 px-2 hover:no-underline hover:text-color-grayscale-base-black header-link header-link-black"
          ctaVariant="link"
        >
          <PlainTextWrapper field={props?.navigationTitle.jsonValue} />
        </LinkWrapper>
      ) : (
        <button
          onClick={() => isList && props.open()}
          className="text-sub-heading font-semibold text-color-grayscale-base-black py-1 px-2 header-link header-link-black"
          role="menuitem"
          aria-haspopup="true"
        >
          <span className={buttonItemSublink()}>
            <PlainTextWrapper field={props.navigationTitle.jsonValue} />
            <SvgIcon
              viewBox="0 0 16 9"
              className={`trasition duration-200 ${rotationClass} ${strokeClass} !w-xs h-auto`}
              icon="chevron-up"
              size="xs"
              fill="none"
            />
          </span>
        </button>
      )}

      {isList && props.index === props.dropdownOpen && (
        <DropdownMenu categories={props.megaMenuList.items} isScrolled={props.isScrolled} />
      )}
    </li>
  );
};

const DropdownMenu = ({
  categories,
}: {
  categories: MegaMenuCategoryInterface[];
  isScrolled: boolean;
}) => {
  const {
    dropDownMenuWrapper,
    dropDownMenuInner,
    dropDownMenuSection,
    dropDownMenuContent,
    dropDownMenuGrid,
    dropDownMenuCol,
    dropDownMenuColHeading,
    dropDownMenuColItems,
    dropDownMenuColItemsLink,
  } = tailwindVariants();
  return (
    <div className={dropDownMenuWrapper()}>
      <div className={dropDownMenuInner()}>
        <div className={dropDownMenuSection()}>
          <div className={dropDownMenuContent()}>
            <div className={dropDownMenuGrid()}>
              {categories.map((category, index) => (
                <div
                  className={dropDownMenuCol()}
                  key={index}
                  role="group"
                  aria-labelledby={`secondary-menu-${index + 1}`}
                >
                  <h2 className={dropDownMenuColHeading()} id={`secondary-menu-${index + 1}`}>
                    {category.name}
                  </h2>
                  <ul className={dropDownMenuColItems()}>
                    {category.megaMenuLinks.items.map((item, i) => (
                      <li key={i} role="presentation">
                        <LinkWrapper
                          role="menuitem"
                          field={item.link.jsonValue}
                          className={dropDownMenuColItemsLink()}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
