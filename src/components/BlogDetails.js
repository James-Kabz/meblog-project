
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import UseFetch from './UseFetch';
import axios from 'axios';

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blogs, error } = UseFetch(`http://localhost:4002/blogs/${id}`);
    const [newBody, setNewBody] = useState('');
    const history = useHistory();

    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:4002/blogs/${id}`)
            .then(res => {
                alert('Blog Deleted Successfully');
                history.push('/');
                setNewBody('')
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:4002/blogs/${id}`, { body: newBody })
            .then(res => {
                alert('Blog Body Updated Successfully');
                history.push('/');
                setNewBody('');
            })
            .catch(err => {
                console.log(err);
            });
    };

    if (error) return <div>{error}</div>;
    return (
        <div className="details">
            {blogs && (
                <article>
                    <h3>{blogs.title}</h3>
                    <p>Done by: {blogs.author}</p>
                    <div>{blogs.body}</div>
                    <form onSubmit={handleUpdate}>
                        <textarea
                            value={newBody}
                            onChange={(e) => setNewBody(e.target.value)}
                            placeholder="Enter new body content..."
                        ></textarea>
                        <button type="submit"><i class="fa fa-edit" aria-hidden="true"></i></button>
                    </form>
                    <button onClick={handleDelete} variant="danger" className="mt-3" type="submit">
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </button>
                </article>
            )}
        </div>
    );
};

export default BlogDetails;
