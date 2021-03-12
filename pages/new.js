import Meta from "../components/Meta";
import PostEditor from "../components/PostEditor";

function NewPost() {
    return (
        <>
            <Meta title="New post - Blogg" />
            <PostEditor />
        </>
    );
}

export default NewPost;