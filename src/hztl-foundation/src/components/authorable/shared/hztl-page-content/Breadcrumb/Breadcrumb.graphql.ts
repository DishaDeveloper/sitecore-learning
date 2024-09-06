const BreadcrumbQuery = `query($itemID: String!, $language: String!){
    currentPage: item(path: $itemID, language: $language) {
      ...breadcrumbInfo
      disabledLinkNames: field(name: "navigationFilter") {
        ...NavLinks
      }
      ancestors(hasLayout: true) {
        ...breadcrumbInfo
        disabledLinkNames: field(name: "navigationFilter") {
          ...NavLinks
        }
      }
    }
  }
  
  fragment NavLinks on MultilistField {
    names: targetItems {
      field(name: "key") {
        disabled: jsonValue
      }
    }
  }
  fragment breadcrumbInfo on Item {
    Title: field(name: "Title") {
      jsonValue
    }
    pageUrl: url {
      link: path
    }
  }`;

export default BreadcrumbQuery;
