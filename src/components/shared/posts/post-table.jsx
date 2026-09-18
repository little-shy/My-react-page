import { useNavigate } from "react-router-dom";

function PostTable({ posts, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="px-6 py-4 text-left">Image</th>
            <th className="px-6 py-4 text-left">User</th>
            <th className="px-6 py-4 text-left">Title</th>
            <th className="px-6 py-4 text-left">Content</th>
            <th className="px-6 py-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>

          {posts.map((post) => (

            <tr
              key={post.id}
              className="border-b hover:bg-gray-50"
            >

              {/* Image */}
              <td className="px-6 py-4">

                {post.image ? (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

              </td>

              {/* User */}
              <td className="px-6 py-4 font-medium">
                {post.userName}
              </td>

              {/* Title */}
              <td className="px-6 py-4 font-semibold">
                {post.title}
              </td>

              {/* Content */}
              <td className="px-6 py-4 max-w-xs">
                {post.content}
              </td>

              {/* Actions */}
              <td className="px-6 py-4">

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      navigate(`/edit-post/${post.id}`)
                    }
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(post.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default PostTable;