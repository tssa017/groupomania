import '../../index.scss';
import { useState } from 'react';

// Function formats Publication component in JSX
function Publication() {
    return (
        <div className="wrapper">
            <div className="publication">
                <article className="publication__cont">
                    <section className="publication__cont--status">
                        <p className="publication__cont--status-txt">
                            I'm pleased to announce that I have started the Web
                            Developer path with OpenClassrooms!
                            <img
                                className="publication__cont--status-txt-img"
                                src="/images/other_chagall.jpeg"
                                alt="Image included in post"
                            />
                        </p>
                    </section>
                    <section className="publication__cont--reactions">
                        <div className="publication__cont--reactions-likes">
                            Likes
                        </div>
                        <div className="publication__cont--reactions-comments">
                            Comments
                        </div>
                        <i className="publication__cont--reactions-like fa-solid fa-heart"></i>
                    </section>
                    <section className="publication__cont--comment-cont">
                        <img
                            className="publication__cont--comment-cont-img"
                            src="/images/me.jpg"
                            alt="Image included in post"
                        />
                        <p className="publication__cont--comment-cont-post">
                            Congrats!
                        </p>
                    </section>
                </article>
            </div>
        </div>
    );
}

export default Publication;
