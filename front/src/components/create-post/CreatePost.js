import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function CreatePost() {
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.sub;

            axios
                .get('http://localhost:3001/api/:id', {
                    // TODO: Fix this URL
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    // Assuming the response.data is an array of user objects
                    // and you want to retrieve the first user's firstName
                    if (response.data && response.data.length > 0) {
                        const firstName = response.data[0].firstName;
                        setFirstName(firstName);
                        console.log(response.data);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    return (
        <div className="wrapper">
            <div className="create-post">
                <article className="create-post__cont">
                    <form>
                        <textarea
                            type="text"
                            name="content"
                            id="content"
                            className="create-post__cont--post"
                            placeholder={`What's happening, ${firstName}?`}
                            maxLength={500}
                        ></textarea>
                        <div className="create-post__cont--post-error"></div>
                        <section className="create-post__cont--btns">
                            <label htmlFor="image">
                                <input
                                    type="file"
                                    id="image-input"
                                    name="image"
                                    accept="image/*"
                                />
                            </label>
                            <input
                                type="submit"
                                className="create-post__cont--btns-postBtn"
                                id="button"
                                value="POST"
                            />
                        </section>
                    </form>
                </article>
            </div>
        </div>
    );
}

export default CreatePost;
