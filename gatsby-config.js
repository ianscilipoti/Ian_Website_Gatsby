/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }

    },
    `gatsby-plugin-image`,
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
            }
          }
        ]
      }
    },
  ],
  siteMetadata: {
    pageGroups: [
      "/projects"
    ],
    pageVoronoiData: [
      {
        url: "/",
        x:15, 
        y:40,
        // color: "#2c4d8f",
        color: "#ccdebd",
        selectedHighlightMovementOverride:90
      }, 
      {
        url: "/contact",
        x:80,
        y:55,
        color: "#24736b",
        selectedHighlightMovementOverride:70
      }, 
      {
        url: "/projects",
        x:40, 
        y:-5,
        color: "#c5e1e8",
        selectedHighlightMovementOverride:120,
        createPolygon: false, 
      },
      // {
      //   identifier: "bg1", 
      //   x:100, 
      //   y:70,
      //   color: "#1a3824",
      // },
      // {
      //   identifier: "bg2", 
      //   x:120, 
      //   y:30,
      //   color: "#21254a",
      // },
      // {
      //   identifier: "bg3", 
      //   x:5, 
      //   y:35,
      //   color: "#252652",
      // }
    ]
  }
}
