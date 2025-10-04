
import { useEffect, useState } from "react"
import { postData, updateData } from "../api/PostApi"

export const Form = ({ data, setData ,updateDataApi,setUpdateDataApi}) => {
    const [addData, setAddData] = useState({
        title: "",
        body: ""
    })
    let isEmpty = Object.keys(updateDataApi).length === 0
    useEffect(()=>{
        updateDataApi&&setAddData({
            title:updateDataApi.title || "",
            body:updateDataApi.body || ""
        })
    },[updateDataApi])

    const updatePostData=async()=>{
        const res= await updateData(updateDataApi.id,addData)
        console.log(res)
        setData((prev)=>{
            return prev.map((curElem)=>{
                return curElem.id === res.data.id ? res.data : curElem
            })
        })
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const action=e.nativeEvent.submitter.value;
        if(action==="Add"){
            postData()
        }else if(action==="Edit"){
            updatePostData()
        }
        try {
            const res = await postData(addData)
            console.log(res)
            setData((prev) => [...data,res.data])
        } catch (error) {
            console.log(error)
        }
        setAddData({
            title:"",
            body:""
        })


    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddData((prev) => {
            return { ...prev, [name]: value }
        })
    }
    return (
<form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    id="title"
                    name="title"
                    placeholder="Add Title"
                    value={addData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
            </div>
            <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                    Body
                </label>
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Add Post"
                    id="body"
                    name="body"
                    value={addData.body}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
            </div>
            <button 
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm hover:shadow-md"
                value={isEmpty ? "Add": "Edit"}
            >
                {isEmpty ? "Add " : "Edit"}
            </button>
        </form>
    )
}