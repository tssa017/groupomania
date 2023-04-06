import '../../index.scss';
import { useState } from 'react';

function Post() {
    return (
        <div className="wrapper">
            <div className="post">
                <article className="post__cont">
                    <section className="post__cont--status">
                        {/* TODO: Paragraph must be required */}
                        {/* <p className="post__cont--status-txt">
                            I'm pleased to announce that I have started the Web
                            Developer path with OpenClassrooms!
                            <img
                                className="post__cont--status-txt-img"
                                src="/images/other_chagall.jpeg"
                                alt="Image included in post"
                            />
                        </p> */}
                        <article className="post__cont--status-edit-cont">
                            <button className="post__cont--status-edit-cont--edit">
                                Edit
                            </button>
                            <button className="post__cont--status-edit-cont--delete">
                                Delete
                            </button>
                        </article>
                    </section>
                    <section className="post__cont--reactions">
                        {/* <div className="post__cont--reactions--likes">
                            101 likes
                        </div>
                        <div className="post__cont--reactions--comments">
                            1 Comment
                        </div> */}
                        <i className="post__cont--reactions--like fa-solid fa-heart"></i>
                    </section>
                    <section className="post__cont--comment-cont">
                        {/* <img
                            className="post__cont--comment-cont-img"
                            src="/images/me.jpg"
                            alt="User profile picture"
                        />
                        <p className="post__cont--comment-cont-post">
                            Congrats!
                        </p> */}
                        <article className="post__cont--comment-cont-edit-cont">
                            <button className="post__cont--comment-cont-edit-cont--edit">
                                Edit
                            </button>
                            <button className="post__cont--comment-cont-edit-cont--delete">
                                Delete
                            </button>
                        </article>
                    </section>
                </article>
            </div>
        </div>
    );
}

export default Post;
