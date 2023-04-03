import '../../index.scss';
import { useState } from 'react';

// Function formats Post component in JSX
function Post() {
    return (
        <div className="wrapper">
            <div className="post">
                <article className="post__cont">
                    <section className="post__cont--status">
                        <p className="post__cont--status-txt">
                            {/* I'm pleased to announce that I have started the Web
                            Developer path with OpenClassrooms! */}
                            <img
                            // className="post__cont--status-txt-img"
                            // src="/images/other_chagall.jpeg"
                            // alt="Image included in post"
                            />
                        </p>
                    </section>
                    <section className="post__cont--reactions">
                        <div className="post__cont--reactions-likes">
                            {/* XX Likes */}
                        </div>
                        <div className="post__cont--reactions-comments">
                            {/* XX Comments */}
                        </div>
                        <i className="post__cont--reactions-like fa-solid fa-heart"></i>
                    </section>
                    <section className="post__cont--comment-cont">
                        <img
                        // className="post__cont--comment-cont-img"
                        // src="/images/me.jpg"
                        // alt="Image included in post"
                        />
                        <p className="post__cont--comment-cont-post">
                            {/* Congrats! */}
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}

export default Post;
