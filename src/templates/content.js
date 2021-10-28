import React from 'react'
import PageLayout from '../components/pageLayout'
import { graphql, Link } from 'gatsby'
import {basicLink} from '../common/common.module.scss'
import PageBackground from '../components/pageBackground'
import ClipToCell from '../components/clipToCell'



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
    React.useEffect(() => {
        function handleScroll() {
          setScrollPos(document.body.scrollTop || document.documentElement.scrollTop);
        }
        window.addEventListener('scroll', handleScroll)

        return _ => {
            window.removeEventListener('scroll', handleScroll)
        }
    })
    const markdownRemark = props.data.markdownRemark;
    return <React.Fragment>
        <ClipToCell cell={props.voronoiClipData.find(cell => cell.site.url === `/${markdownRemark.fields.directory}/${markdownRemark.fields.slug}`)}>
            <PageBackground imgSrc={markdownRemark.frontmatter.backgroundImg} offset={-scrollPos/6} blur={5} opacity={0.2}/>
        </ClipToCell>

        <PageLayout parentPage="projects" pageName={markdownRemark.frontmatter.title} >
            <div style={{fontSize:"110%"}} dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
            <hr/>
            Return to <Link className = {basicLink} to={`/${markdownRemark.fields.directory}`}>{markdownRemark.fields.directory}</Link>
            <br/>
            <br/>
            <br/>
        </PageLayout>
    </React.Fragment>
}



export default ContentPage