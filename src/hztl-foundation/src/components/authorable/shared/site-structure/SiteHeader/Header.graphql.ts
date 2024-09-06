const HeaderQuery = `query($language: String!) {
  item(path: "{4502DACB-0F69-49EC-A840-0AF3C6BB9DE0}", language: $language) {
    id
    path
    ... on Header {
      logo {
        jsonValue
        alt
      }
      logoLink {
        jsonValue
      }
      searchPlaceholder {
        jsonValue
      }
      navigationList: field(name: "navigationList") {
        ...navigationList
      }
      country {
        targetItems {
          ... on Country {
            name
            flag {
              jsonValue
            }
            language: field(name: "language") {
              jsonValue
              ... on LookupField {
                targetItem {
                  name: field(name: "Iso") {
                    jsonValue
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

fragment navigationList on MultilistField {
  items: targetItems {
    id
    name
    ... on NavigationGroup {
      navigationTitle {
        jsonValue
      }
      navigationLink {
        jsonValue
      }
      megaMenuList: field(name: "megaMenuList") {
        ...megaMenuList
      }
    }
  }
}

fragment megaMenuList on MultilistField {
  items: targetItems {
    id
    name
    ... on MegaMenuGroup {
      megaMenuTitle {
        jsonValue
      }
      megaMenuLinks: field(name: "megaMenuLinks") {
        ... on MultilistField {
          items: targetItems {
            id
            name
            ... on GenericLink {
              link {
                jsonValue
              }
            }
          }
        }
      }
    }
  }
}
`;
export default HeaderQuery;
