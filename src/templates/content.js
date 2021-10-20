import React from 'react'
import PageLayout from '../components/pageLayout'
import { graphql, Link } from 'gatsby'
import {basicLink} from '../common/common.module.scss'
import PageBackground from '../components/pageBackground'


export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: {slug: { eq: $slug}}) {
            frontmatter {
                title
                backgroundImg {
                    childImageSharp {
                        fixed(width: 1000, quality: 90) {
                            src
                        }
                        gatsbyImageData
                    }
                    relativePath
                }
            }
            fields {
                slug
                directory
            }
            html
        }
    }`



const ContentPage = (props) => {
    const [scrollPos, setScrollPos] = React.useState(0);
    const scrollEvent = (e) => {
        // console.log('Current scroll position:', e.target.scrollTop);
        setScrollPos(e.target.scrollTop);
    }
    const markdownRemark = props.data.markdownRemark;
    return <PageLayout parentPage="projects" scrollEvent={scrollEvent} pageName={markdownRemark.frontmatter.title} url={`/${markdownRemark.fields.directory}/${markdownRemark.fields.slug}`} voronoiClipData={props.voronoiClipData} contentWidth={1200}>
        <PageBackground imgSrc={markdownRemark.frontmatter.backgroundImg} offset={-scrollPos/6} blur opacity={0.2}/>
        <div style={{fontSize:"110%"}} dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
        <hr/>
        Return to <Link className = {basicLink} to={`/${markdownRemark.fields.directory}`}>{markdownRemark.fields.directory}</Link>
        <br/>
        <br/>
        <br/>
    </PageLayout>
    // return <div></div>
}



export default ContentPage