const FooterQuery = `query ($language: String!) {
  item(path: "{AA125786-A73C-4808-9735-FE389747B563}" language: $language) {
    id
    path
    ... on Footer {
      footerLogo {
        jsonValue
        alt
      }
      footerColumns:field(name  : "footerColumns") {
      ...footerColumns
      }
    }
  }
}


fragment footerColumns on MultilistField {
  items: targetItems {
   id
   name
     ... on FooterColumn {
      columnLinks:field(name  : "columnLinks") {
      ...columnLinks
    }
  }
}
}
  
fragment columnLinks on MultilistField {
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
`;
export default FooterQuery;
