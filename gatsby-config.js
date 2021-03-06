/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-react-helmet`,
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
              maxWidth: 800,
              linkImagesToOriginal: false,
              // showCaptions: true,
              // markdownCaptions: true,
              wrapperStyle: 'margin-top:20px; margin-bottom:20px;'
              
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
        y:80,
        // color: "#2c4d8f",
        color: "#738070",
        selectedHighlightMovementOverride:115
      }, 
      {
        url: "/contact",
        x:80,
        y:95,
        color: "#24736b",
        selectedHighlightMovementOverride:85,
        createPolygon: true
      }, 
      {
        url: "/demoreel",
        x:20,
        y:50,
        //color: "#ad6a4b",
        color: "#2b1c14",
        selectedHighlightMovementOverride:85,
        createPolygon: true
      },
      {
        url: "/404",
        x:50,
        y:150,
        color: "#9c231a",
        selectedHighlightMovementOverride:150,
        createPolygon: true
      }, 
      {
        url: "-bg1", 
        x:76, 
        y:98,
        color: "#646e46",
      },
      {
        url: "-bg2", 
        x:90, 
        y:94,
        color: "#5e6e46",
      },
      {
        url: "-bg3", 
        x:0, 
        y:80,
        color: "#3f613c",
      },
    ]
  }
}
