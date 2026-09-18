import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const posts =
    JSON.parse(localStorage.getItem("posts")) || [];

  const post = posts.find(
    (post) => post.id === Number(id)
  );

  const [userName, setUserName] = useState(
    post?.userName || ""
  );

  const [title, setTitle] = useState(
    post?.title || ""
  );

  const [content, setContent] = useState(
    post?.content || ""
  );

  const [image, setImage] = useState(
    post?.image || null
  );

  const [showPopup, setShowPopup] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedPosts = posts.map((item) =>
      item.id === Number(id)
        ? {
            ...item,
            userName,
            title,
            content,
            image,
          }
        : item
    );

    localStorage.setItem(
      "posts",
      JSON.stringify(updatedPosts)
    );

    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate("/posts");
  };

  if (!post) {
    return (
      <div className="p-8 text-gray-900">
        <h1 className="text-2xl font-bold">
          Post not found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Edit Post
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6">

          <form onSubmit={handleUpdate}>

            {/* User */}
            <div className="mb-5">
              <label className="block font-medium mb-2">
                User Name
              </label>

              <input
                type="text"
                value={userName}
                onChange={(e) =>
                  setUserName(e.target.value)
                }
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
                onChange={(e) =>
                  setTitle(e.target.value)
                }
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
                onChange={(e) =>
                  setContent(e.target.value)
                }
                rows="6"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            {/* Image */}
            <div className="mb-6">
              <label className="block font-medium mb-2">
                Post Image
              </label>

              <input
                type="file"
                accept="image/*"
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              {image && (
                <img
                  src={image}
                  alt="Post"
                  className="mt-4 w-40 h-40 object-cover rounded-lg"
                />
              )}
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>

          </form>
        </div>
      </div>

      {/* UPDATE POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-96 text-center">

            <div className="text-4xl mb-4">
              ✓
            </div>

            <h2 className="text-xl font-bold mb-2">
              Post Updated
            </h2>

            <p className="text-gray-600 mb-6">
              Your post has been updated successfully.
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

export default EditPost;