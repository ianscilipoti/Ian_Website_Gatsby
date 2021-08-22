exports.onCreatePage = async ({ page, actions }) => {
    if (page.path.match(/^\/projects/)) {
      page.matchPath = '/projects/*';
  
      actions.createPage(page);
    }
};