import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import "../App.css";
import { Form } from "./Form";

export const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi,setUpdateDataApi]=useState({})
  const getPostData = async () => {
    const res = await getPost();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
        const newUpdatedPosts = data.filter((curPost) => {
          return curPost.id !== id;
        });
        setData(newUpdatedPosts);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = (curElem) => setUpdateDataApi(curElem);

  return (
    <>
<section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-8">

        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </section>
      <section className="max-w-4xl mx-auto p-6">
        <ol className="space-y-4">
          {data.map((curElem) => {
            const { id, body, title } = curElem;
            return (
              <li key={id} className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  Title: {title}
                </p>
                <p className="text-gray-600 mb-4">
                  Body: {body}
                </p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleUpdatePost(curElem)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    </>
  );
};
