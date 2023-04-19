import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function CreateComment() {
    // const [userId, setUserId] = useState('');
    // const [firstName, setFirstName] = useState('');
    // const [profilePicUrl, setProfilePicUrl] = useState('');
    // const [postPicUrl, setPostPicUrl] = useState('');
    // const [isFileSelected, setIsFileSelected] = useState(false); // Set to false initially to keep track of whether or not a file has been uploaded

    // useEffect(() => {
    //     // Perform side 'effects' within a React component
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const decodedToken = jwtDecode(token); // Method from jwt-decode library that parses the payload and headers of the token to JSON
    //         const userId = decodedToken.userId;

    //         axios
    //             .get(`http://localhost:3001/api/comments/${userId}`, {
    //                 headers: { Authorization: `Bearer ${token}` },
    //             })
    //             .then((response) => {
    //                 if (response.data && response.data.firstName) {
    //                     // Check if firstName included in response
    //                     const firstName = response.data.firstName;
    //                     const profilePic = response.data.profilePic;
    //                     // Set extracted values
    //                     setUserId(userId);
    //                     setFirstName(firstName);
    //                     setProfilePicUrl(profilePic);
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     }
    // }, []);

    // const handleFileInputChange = (event) => {
    //     const file = event.target.files[0]; // Retrieves uploaded image file
    //     const reader = new FileReader();
    //     reader.onload = (event) => {
    //         setPostPicUrl(event.target.result); // Set the postPicUrl hook to the base64-encoded data URL of selected image file, re-renders
    //     };
    //     reader.readAsDataURL(file); // Reads file
    //     setIsFileSelected(true); // Resets isFileSelected hook so that the file preview is displayed
    // };

    // const handlePostSubmit = (event) => {
    //     event.preventDefault(); // Prevent default form refresh and submit

    //     const formData = new FormData(); // FormData object used to construct and
    //     formData.append('content', event.target.content.value); // Appends value of the 'form' (the post) with text input by user
    //     formData.append('userId', userId); // TODO: Appends value of the 'form' with userId (will need for name, profilePic later)

    //     // Check if image file exists before appending to form data
    //     if (isFileSelected) {
    //         // Use the isFileSelected state to check if an image file has been selected
    //         formData.append('image', event.target.image.files[0]); // Append the actual image file to the form data
    //     }

    //     axios
    //         .post(`http://localhost:3001/api/posts/users/${userId}`, formData, {
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 'Content-Type': 'multipart/form-data', // Inidicates the request contains files in payload
    //             },
    //         })
    //         .then((response) => {
    //             console.log('Post created successfully:');
    //             console.log(response.data);

    //             // Reset the form
    //             event.target.reset(); // Reset the post after submission
    //             window.location.reload(); // Refresh the page after submission
    //         })
    //         .catch((error) => {
    //             console.error('Failed to create post:', error);
    //         });
    // };

    return (
        <div className="wrapper">
            {/* <div className="create-comment">
                <section className="post__cont--comment-cont">
                    <img
                        className="post__cont--comment-cont-img"
                        src="/images/me.jpg"
                        alt="User profile picture"
                    />
                    <p className="post__cont--comment-cont-post">Congrats!</p>
                    <article className="post__cont--comment-cont-edit-cont">
                        <button className="post__cont--comment-cont-edit-cont--edit">
                            Edit
                        </button>
                        <button className="post__cont--comment-cont-edit-cont--delete">
                            Delete
                        </button>
                    </article>
                </section>
            </div> */}
        </div>
    );
}

export default CreateComment;
