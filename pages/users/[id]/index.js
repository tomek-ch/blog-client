import Meta from '../../../components/Meta';
// import style from '../../../styles/Post.module.css';

function Post({ user, error }) {

    if (error) return (
        <div>
            <Meta title={error} />
            {error}
        </div>
    );

    return (
        <div>
            <Meta title={`${user.firstName} - Blogg`} />
            <h1>{user.firstName}</h1>

        </div>
    );
}

export async function getServerSideProps({ params: { id } }) {
    try {
        const res = await fetch(`http://localhost:5000/users/${id}`);
        const data = await res.json();

        if (res.status === 200) return { props: { user: data } };
        else return { props: { error: data[0] } };

    } catch (error) {
        return { props: { error: 'Failed to connect to the server' } };
    }
}

export default Post;