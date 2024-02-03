interface PageInterface {
  selfPageName?: number;
  page?: number;
}

/**
 * set the active page in props
 */
const activePage = (props: PageInterface) =>
  getPage(props) === props.selfPageName;

/**
 * returns page number based on props
 */
const getPage = (props: PageInterface) => props.page;

export { activePage, getPage };
