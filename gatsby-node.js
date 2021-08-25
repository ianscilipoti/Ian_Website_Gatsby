const path = require('path')

// exports.onCreatePage = async ({ page, actions }) => {
//     if (page.path.match(/^\/projects/)) {
//       page.matchPath = '/projects/*';
  
//       actions.createPage(page);
//     }
// };

exports.onCreateNode = ({node, actions}) => {
  const { createNodeField} = actions

  

  if (node.internal.type === 'MarkdownRemark') {
    
    const slug = path.basename(node.fileAbsolutePath, '.md')
    const directory = path.dirname(node.fileAbsolutePath).split(path.sep).slice(-2)[0]
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
    createNodeField({
      node,
      name: 'directory',
      value: directory
    })
  }
}


exports.createPages = async ({graphql, actions}) =>
{
  const {createPage} = actions

  const projectTemplate = path.resolve ('./src/templates/content.js')
  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  res.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      component: projectTemplate,
      path: `/projects/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug
      }
    })
  })
}