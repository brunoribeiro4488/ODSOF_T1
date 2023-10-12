
import React from 'react'
import moment from 'moment';
import { Link } from "react-router-dom";
import { Post } from '../../../../models/Post'
import "../styles/PostMeta.sass"

interface PostMetaProps extends Post {
  includeLink?: boolean;
  page?: string;
}

function todaysPosts(date: Date | String){
    if(date == undefined){
        return false;
    }
    let today  = new Date().toLocaleDateString("en-US");
    let data = new Date(date.toString()).toLocaleDateString("en-US");
    return today == data;
}

const PostMeta: React.FC<PostMetaProps> = (props) => (
    <div className={`post-row-content ${todaysPosts(props.createdAt) && props.page == "NEW" ? "red-background": ""}`}>
    {props.includeLink === false ? '' : <Link to={`/discuss/${props.slug}`} className="title">"{props.title}" {props.link ? <span className="link">[link]</span> : ''}</Link>}
    <div className="post-row-meta">
      {moment(props.createdAt).fromNow()} | {`by `} <Link to={`/member/${props.postAuthor}`}>{props.postAuthor}</Link> | {`${props.numComments} comments`}
    </div>
  </div>
)

export default PostMeta;