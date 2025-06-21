import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="flex gap-4 p-4 bg-gray-100 shadow">
      <Link to="/">Home</Link>
      {isLoggedIn ? (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/matches">Matches</Link>
          <Link to="/profile/1">Profile</Link>
          <button onClick={onLogout} className="ml-auto text-red-500">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

function Home() {
  return <div className="p-4 text-center"><h1 className="text-2xl">Welcome to VivahConnect 💍</h1></div>;
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://vivahconnect-backend-2.onrender.com/api/auth/login', {
        email,
        password,
      });
      alert('Login successful!');
      onLogin();
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="block my-2 border p-2" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="block my-2 border p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">Login</button>
      </form>
    </div>
  );
}

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://vivahconnect-backend-2.onrender.com/api/auth/register', {
        name,
        email,
        password,
      });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="block my-2 border p-2" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="block my-2 border p-2" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="block my-2 border p-2" />
        <button type="submit" className="bg-green-600 text-white px-4 py-1 rounded">Register</button>
      </form>
    </div>
  );
}

function Dashboard() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios.get('https://vivahconnect-backend-2.onrender.com/api/profiles')
      .then(res => setProfiles(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleInterest = async (id) => {
    try {
      await axios.post('https://vivahconnect-backend-2.onrender.com/api/interests/send', {
        fromUserId: 1,
        toUserId: id,
      });
      alert('Interest sent!');
    } catch (err) {
      alert('Failed to send interest');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Dashboard</h2>
      {profiles.map(profile => (
        <div key={profile._id} className="border p-2 my-2 rounded shadow">
          <p><strong>{profile.name}</strong> — Age: {profile.age}</p>
          {profile.photo && <img src={profile.photo} alt="Profile" className="w-24 h-24 object-cover mt-2" />}
          <button onClick={() => handleInterest(profile._id)} className="mt-2 bg-purple-500 text-white px-3 py-1 rounded">Send Interest</button>
        </div>
      ))}
    </div>
  );
}

function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    axios.get('https://vivahconnect-backend-2.onrender.com/api/interests')
      .then(res => setMatches(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Your Matches</h2>
      {matches.map((match, i) => (
        <div key={i} className="my-2 border p-2 rounded shadow">
          <p>Match ID: {match.toUserId}</p>
          {match.photo && <img src={match.photo} alt="Match" className="w-16 h-16 object-cover mt-1" />}
        </div>
      ))}
    </div>
  );
}

function Profile() {
  const [bio, setBio] = useState('');
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if (photo) formData.append('photo', photo);
    try {
      await axios.post('https://vivahconnect-backend-2.onrender.com/api/profiles/update', formData);
      alert('Profile updated');
      setPreview(URL.createObjectURL(photo));
    } catch (err) {
      alert('Update failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Your Bio" className="block w-full my-2 border p-2" />
        <input type="file" onChange={(e) => setPhoto(e.target.files[0])} className="block my-2" />
        <button type="submit" className="bg-blue-700 text-white px-4 py-1 rounded">Save</button>
      </form>
      {preview && <img src={preview} alt="Preview" className="mt-4 w-32 h-32 object-cover" />}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/matches" element={<Matches />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
