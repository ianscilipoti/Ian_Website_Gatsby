import React from 'react'
import PageLayout from '../components/pageLayout'
import { graphql, Link } from 'gatsby'
import {basicLink} from '../styles/common.module.scss'

export const query = graphql`
    query($slug: String!) {
        markdownRemark(fields: {slug: { eq: $slug}}) {
            frontmatter {
                title
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
    return <PageLayout pageName={markdownRemark.frontmatter.title} pageIdentifier={`/${markdownRemark.fields.directory}/${markdownRemark.fields.slug}`} voronoiClipData={props.voronoiClipData} contentWidth={950}>
        <div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div>
        <hr/>
        Return to <Link className = {basicLink} to={`/${markdownRemark.fields.directory}`}>{markdownRemark.fields.directory}</Link>
    </PageLayout>
    // return <div></div>
}



export default ContentPage