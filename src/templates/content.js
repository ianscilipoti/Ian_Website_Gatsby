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
                previewImg {
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
    const markdownRemark = props.data.markdownRemark;
    return <PageLayout pageName={markdownRemark.frontmatter.title} url={`/${markdownRemark.fields.directory}/${markdownRemark.fields.slug}`} voronoiClipData={props.voronoiClipData} contentWidth={950}>
        <PageBackground previewImg={markdownRemark.frontmatter.previewImg} />
        <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
        <hr/>
        Return to <Link className = {basicLink} to={`/${markdownRemark.fields.directory}`}>{markdownRemark.fields.directory}</Link>
    </PageLayout>
    // return <div></div>
}



export default ContentPage