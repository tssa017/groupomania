import '../../index.scss';
import { useState } from 'react';

// Function formats CreatePost component in JSX
function CreatePost() {
    return (
        <div className="wrapper">
            <div className="create-post">
                <article className="create-post__cont">
                    <form>
                        {/* <img
                            src="#"
                            className="create-post__cont--img"
                            alt="User profile"
                        /> */}
                        <textarea
                            type="text"
                            name="content"
                            id="content"
                            className="create-post__cont--post"
                            placeholder="What's happening, User?"
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
