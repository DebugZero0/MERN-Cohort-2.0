import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const Feed = () => {
    const [post, setpost] = useState([
        {
            _id: "",
            image: "",
            caption: ""
        }
    ]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState('');
    const [editingCaption, setEditingCaption] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [editError, setEditError] = useState('');
    useEffect(() => {
        axios.get('https://image-adder-6q24.onrender.com/posts').then((response) => {
            console.log(response.data);
            setpost(response.data.posts);
        }).catch((error) => {
            console.error("There was an error fetching the posts!", error);
        });
    }, []);

    const deletePost = (id) => {
        axios.delete(`https://image-adder-6q24.onrender.com/posts/${id}`)
            .then(response => {
                console.log('Post deleted:', response.data);
                setpost(prevPosts => prevPosts.filter(post => post._id !== id));
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    }

    const openEditModal = (id, caption) => {
        setEditingId(id);
        setEditingCaption(caption || '');
        setEditError('');
        setIsEditing(true);
    };

    const closeEditModal = () => {
        if (isSaving) return;
        setIsEditing(false);
        setEditingId('');
        setEditingCaption('');
        setEditError('');
    };

    const updateCaption = async (event) => {
        event.preventDefault();
        const trimmedCaption = editingCaption.trim();
        if (!trimmedCaption) {
            setEditError('Caption is required.');
            return;
        }

        setIsSaving(true);
        setEditError('');

        try {
            const response = await axios.patch(`https://image-adder-6q24.onrender.com/posts/${editingId}`, {
                caption: trimmedCaption,
            });
            setpost(prevPosts => prevPosts.map(item => item._id === editingId ? response.data.post : item));
            closeEditModal();
        } catch (error) {
            console.error('Error updating post:', error);
            setEditError('Error updating post. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };
    

    return (
        <div>
            <section className='flex flex-col items-center gap-8 h-screen bg-gray-800 overflow-y-auto p-8'>
                {
                    post.length > 0 ? post.map((item) => (
                        <div key={item._id} className='flex flex-col justify-center items-center gap-4 bg-gray-700 p-4 rounded-md w-full max-w-sm shrink-0'>
                            <img className='w-full h-110 object-cover rounded-md' src={item.image} alt="Post" />
                            <div className='flex justify-between items-center w-full'>
                                <p className='text-amber-50 text-xl'>{item.caption}</p>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => openEditModal(item._id, item.caption)}>
                                        <i className="ri-pencil-fill text-white cursor-pointer"></i>
                                    </button>
                                    <button onClick={() => deletePost(item._id)}><i className="ri-delete-bin-line text-white cursor-pointer"></i></button>
                                </div>
                            </div>
                        </div>
                    )) : <p className='text-amber-50 text-xl'>No posts available</p>
                }
            </section>

            {isEditing && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'>
                    <div className='w-full max-w-md rounded-2xl bg-gray-900 border border-gray-700 shadow-xl p-6'>
                        <div className='flex items-center justify-between mb-4'>
                            <h2 className='text-2xl text-amber-50'>Update Caption</h2>
                            <button onClick={closeEditModal} className='text-gray-300 hover:text-white'>
                                <i className='ri-close-line text-2xl'></i>
                            </button>
                        </div>
                        <form onSubmit={updateCaption} className='flex flex-col gap-4'>
                            <label className='flex flex-col gap-2'>
                                <span className='text-sm text-gray-300'>Caption</span>
                                <input
                                    className='bg-gray-800 text-amber-50 border border-gray-600 rounded-lg px-3 py-2
                                    outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                    transition-all duration-200'
                                    type='text'
                                    name='caption'
                                    placeholder='Enter new caption'
                                    value={editingCaption}
                                    onChange={(event) => setEditingCaption(event.target.value)}
                                    required
                                />
                            </label>
                            {editError && (
                                <p className='text-red-400 text-sm'>{editError}</p>
                            )}
                            <div className='flex justify-end gap-3'>
                                <button
                                    type='button'
                                    onClick={closeEditModal}
                                    className='px-4 py-2 rounded-lg border border-gray-600 text-gray-200 hover:bg-gray-800'
                                    disabled={isSaving}
                                >
                                    Cancel
                                </button>
                                <button
                                    type='submit'
                                    className='px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70'
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Updating...' : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Feed
