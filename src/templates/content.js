import React from 'react'
import PageLayout from '../components/pageLayout'
import { graphql, Link } from 'gatsby'
import {basicLink} from '../common/common.module.scss'
import PageBackground from '../components/pageBackground'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


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
    return <PageLayout parentPage="projects" scrollEvent={scrollEvent} pageName={markdownRemark.frontmatter.title} url={`/${markdownRemark.fields.directory}/${markdownRemark.fields.slug}`} voronoiClipData={props.voronoiClipData} contentWidth={950}>
        <PageBackground imgSrc={markdownRemark.frontmatter.backgroundImg.childImageSharp.fixed.src} offset={-scrollPos/6} blur opacity={0.3}/>
        <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
        <hr/>
        Return to <Link className = {basicLink} to={`/${markdownRemark.fields.directory}`}>{markdownRemark.fields.directory}</Link>
        <br/>
        <br/>
        <br/>
    </PageLayout>
    // return <div></div>
}



export default ContentPage