import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleCreatePost = (e) => {
    e.preventDefault();

    if (!userName.trim() || !title.trim() || !content.trim()) {
      setPopupMessage("Please fill in all required fields.");
      setShowPopup(true);
      return;
    }

    const newPost = {
      id: Date.now(),
      userName: userName,
      title: title,
      content: content,
      image: image,
    };

    const existingPosts =
      JSON.parse(localStorage.getItem("posts")) || [];

    localStorage.setItem(
      "posts",
      JSON.stringify([...existingPosts, newPost])
    );

    setPopupMessage("Post created successfully!");
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/posts");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Create Post
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6">

          <form onSubmit={handleCreatePost}>

            {/* User Name */}
            <div className="mb-5">
              <label className="block font-medium mb-2">
                User Name
              </label>

              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter user's name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            {/* Title */}
            <div className="mb-5">
              <label className="block font-medium mb-2">
                Post Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            {/* Content */}
            <div className="mb-5">
              <label className="block font-medium mb-2">
                Post Content
              </label>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post..."
                rows="6"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            {/* Image */}
           {/* Post Image */}
<div className="mb-6">
  <label className="block font-medium mb-2">
    Post Image
  </label>

  {/* Hidden file input */}
  <input
    id="post-image"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setImage(reader.result);
        };

        reader.readAsDataURL(file);
      }
    }}
  />

  {/* Add Photos & Files Button */}
  <label
    htmlFor="post-image"
    className="inline-flex items-center gap-2 cursor-pointer border border-gray-300 rounded-lg px-4 py-3 bg-white hover:bg-gray-50 transition"
  >
    <span className="text-xl">📎</span>

    <span className="text-gray-700 font-medium">
      Add photos & files
    </span>
  </label>

  {/* Image Preview */}
  {image && (
    <div className="mt-4">
      <img
        src={image}
        alt="Preview"
        className="w-40 h-40 object-cover rounded-lg border"
      />
    </div>
  )}
</div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Create Post
            </button>

          </form>
        </div>
      </div>

      {/* POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Blur background */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

          {/* Popup */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-96 text-center">

            <div className="text-4xl mb-4">
              ✓
            </div>

            <h2 className="text-xl font-bold mb-2">
              Success
            </h2>

            <p className="text-gray-600 mb-6">
              {popupMessage}
            </p>

            <button
              onClick={closePopup}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              OK
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default CreatePost;