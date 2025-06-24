import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { addBlogApi, getBlogsApi } from "../../services/allApi";

function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [token, setToken] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [details, setDetails] = useState({
    title: "",
    image: "",
    content: "",
  });

  //   read more
  const [selectedBlog, setSelectedBlog] = useState({});
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [StatusBlog, setStatusBlog] = useState({});

  //   add blog
  const handleSubmit = async () => {
    const { title, image, content } = details;
    if (!title || !image || !content) {
      alert("please fill all field");
    } else {
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      const result = await addBlogApi(details, reqHeader);
      //console.log(result);
      if (result.status === 200) {
        alert("Blog added successfully");
        setDetails({ title: "", image: "", content: "" }); // clear form
        setShowModal(false);
        setStatusBlog(result.data)
      } else {
        alert("Failed to add blog. Please try again.");
      }
    }
  };

  //   get blog
  const getBlogs = async () => {
    const result = await getBlogsApi();
    //console.log(result);

    if (result.status === 200) {
      setBlogs(result.data);
    } else {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    getBlogs();
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setToken(token);
    }
  }, [StatusBlog]);

  const handleCancel = () => {
    setShowModal(false);
    setDetails({
      title: "",
      image: "",
      content: "",
    });
  };

  return (
    <>
      <Header />
      <div className=" mx-auto min-h-screen p-6 md:mt-18  bg-gray-200 ">
       {token && <div className="flex justify-end ">

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Write a Blog
          </button>
        </div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs?.length > 0 ? (
            blogs.map((b) => (
              <div className="rounded-xl shadow p-4">
                <img
                  src={b?.image}
                  alt="cover"
                  className="rounded-xl h-60 w-full object-cover"
                />
                <h3 className="text-xl font-semibold mt-2">{b.title}</h3>
                <span className="text-sm text-orange-600">by {b.author}</span>
                {/* <p className="text-gray-600 line-clamp-2">{b.}</p> */}
                <div className="flex justify-between flex-col  mt-2">
                  <p className="text-gray-600">{b.content.slice(0,90)}...</p>
                  <Link
                    className="text-blue-500 hover:underline text-end"
                    onClick={() => {
                      setSelectedBlog(b); // set current blog
                      setShowDetailModal(true); // show modal
                    }}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>no Blogs</p>
          )}
        </div>
      </div>

      {/* modal for add blog */}
      {showModal && (
        <div className="fixed inset-0 bg-[#fefe0d2a] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">🖊️ Write a New Blog</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={details.title}
                onChange={(e) =>
                  setDetails({ ...details, title: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={details.image}
                onChange={(e) =>
                  setDetails({ ...details, image: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <textarea
                rows="6"
                placeholder="Content"
                value={details.content}
                onChange={(e) =>
                  setDetails({ ...details, content: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* modal for readmore */}
      {showDetailModal && selectedBlog && (
  <div className="fixed inset-0 bg-[#c8d4e3de] bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
      <h2 className="text-3xl font-bold mb-2">{selectedBlog.title}</h2>
      <p className="text-sm text-orange-600 mb-4">by {selectedBlog.author}</p>
      <img
        src={selectedBlog.image}
        alt="blog"
        className="w-full rounded-lg object-cover h-64 mb-4"
      />
      <p className="text-gray-800 leading-relaxed whitespace-pre-line">
        {selectedBlog.content}
      </p>
      <div className="text-right mt-6">
        <button
          onClick={() => setShowDetailModal(false)}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default BlogList;
