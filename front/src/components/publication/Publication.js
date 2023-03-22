import '../../index.scss';
import { useState } from 'react';

function Publication() {
    return (
        <div className="publication">
            <article className="publication__cont">
                <section className="publication__cont--status">
                    <p className="publication__cont--status-txt">
                        I'm pleased to announce that I have started the Web
                        Developer path with OpenClassrooms!
                        <img
                            className="publication__cont--status-txt-img"
                            src="#"
                            alt="Post image"
                        />
                    </p>
                </section>
                <section className="publication__cont--reactions">
                    <div className="publication__cont--reactions-likes"></div>
                    <div className="publication__cont--reactions-comments"></div>
                    <i className="fa-solid fa-heart"></i>
                </section>
                <section className="publication__cont--comment-cont">
                    <p className="publication__cont--comment"></p>
                </section>
            </article>
        </div>
    );
}

export default Publication;
