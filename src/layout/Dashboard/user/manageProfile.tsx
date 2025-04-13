import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

type ManageProfileProps = {
  userId: string;
};

const ManageProfile = ({ userId }: ManageProfileProps) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profilePic: '',
  });

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        const user = res.data.data;
        setUserData({
          name: user.name || '',
          email: user.email || '',
          profilePic: user.profilePic || '',
        });
      } catch (error) {
        toast.error('Failed to load user data');
      } finally {
        setInitialLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`/api/users/${userId}`, userData);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="text-center py-10">
        <p className="text-lg font-medium text-gray-600">Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-2xl p-6 mt-10">
      <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
          <input
            type="text"
            name="profilePic"
            value={userData.profilePic}
            onChange={handleChange}
            className="w-full mt-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {userData.profilePic && (
          <img
            src={userData.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto mt-4"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default ManageProfile;
