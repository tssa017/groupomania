import '../../index.scss';
import { useState } from 'react';

function Status() {
    return (
        <div className="status">
            <article className="status__cont">
                <form>
                    <img
                        src="/images/malina.jpeg"
                        className="status__cont--img"
                        alt="User profile"
                    />
                    <textarea
                        type="text"
                        name="content"
                        id="content"
                        className="status__cont--post"
                        placeholder="What's happening, User?"
                        maxLength={500}
                    ></textarea>
                    <div className="status__cont--post-error"></div>
                    <section className="status__cont--btns">
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
                            className="status__cont--btns-postBtn"
                            id="button"
                            value="POST"
                        />
                    </section>
                </form>
            </article>
        </div>
    );
}

export default Status;
