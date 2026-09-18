import { useState } from "react";
import { Link } from "react-router-dom";
import PostTable from "../components/shared/posts/post-table";

function Posts() {
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    const updatedPosts = posts.filter(
      (post) => post.id !== deleteId
    );

    setPosts(updatedPosts);

    localStorage.setItem(
      "posts",
      JSON.stringify(updatedPosts)
    );

    setShowDeletePopup(false);
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Posts
          </h1>

          <p className="text-gray-600 mt-2">
            Manage all posts.
          </p>
        </div>

        <Link
          to="/create-post"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          Create Post
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow-md p-6">

        {posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">
              No posts yet.
            </p>

            <Link
              to="/create-post"
              className="text-blue-600 hover:underline"
            >
              Create your first post
            </Link>
          </div>
        ) : (
          <PostTable
            posts={posts}
            onDelete={handleDeleteClick}
          />
        )}

      </div>

      {/* DELETE POPUP */}
      {showDeletePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* Blur */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/30"></div>

          {/* Popup */}
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-96 text-center">

            <div className="text-4xl mb-4">
              ⚠️
            </div>

            <h2 className="text-xl font-bold mb-2">
              Delete Post?
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post?
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Posts;