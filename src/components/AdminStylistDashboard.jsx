import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Upload, Trash2, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';

const CLOUDINARY_CLOUD_NAME = 'dtcpixf4a';
const CLOUDINARY_UPLOAD_PRESET = 'my_video_preset'; 

export default function AdminStylistDashboard({ stylists, setStylists, onLockPortal }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('');
  const [bio, setBio] = useState('');
  const [instagram, setInstagram] = useState('');
  const [file, setFile] = useState(null);
  
  const fileInputRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const isFirebaseConnected = db && db.app && db.app.options && db.app.options.apiKey && db.app.options.apiKey !== 'YOUR_API_KEY';

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this stylist?")) {
      const itemToDelete = stylists[index];

      if (isFirebaseConnected && itemToDelete.id) {
        try {
          const docRef = doc(db, 'stylists', itemToDelete.id);
          await deleteDoc(docRef);
        } catch (error) {
          console.error("Firebase Deletion Error:", error);
          alert("Error deleting stylist from database: " + error.message);
        }
      } else {
        const newStylists = [...stylists];
        newStylists.splice(index, 1);
        setStylists(newStylists);
      }
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !role.trim() || !file) { 
      alert("Please enter at least Name, Role, and upload an Image"); 
      return; 
    }
    
    if (isFirebaseConnected) {
      setIsUploading(true);
      try {
        let mediaUrl = '';

        // Upload directly to Cloudinary
        const formData = new FormData();
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        formData.append('file', file);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Cloudinary Error:", errorData);
          alert(`Cloudinary Upload Failed: ${errorData.error?.message || 'Unknown error'}`);
          setIsUploading(false);
          return;
        }

        const data = await response.json();
        mediaUrl = data.secure_url;
        
        // Add metadata document to Firestore
        const docData = {
          name,
          role,
          experience,
          bio,
          instagram,
          image: mediaUrl,
          createdAt: new Date().toISOString()
        };
        await addDoc(collection(db, 'stylists'), docData);
        
        // Reset form & show success
        setName('');
        setRole('');
        setExperience('');
        setBio('');
        setInstagram('');
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } catch (error) {
        console.error("Firebase upload error:", error);
        alert("Failed to add stylist. Check console for error logs.");
      } finally {
        setIsUploading(false);
      }
    } else {
      // Local Sandbox Fallback
      const reader = new FileReader();
      reader.onloadend = () => {
        const newStylists = [...stylists];
        newStylists.unshift({
          name,
          role,
          experience,
          bio,
          instagram,
          image: reader.result
        });
        setStylists(newStylists);
        
        // Reset
        setName('');
        setRole('');
        setExperience('');
        setBio('');
        setInstagram('');
        setFile(null);
        if(fileInputRef.current) fileInputRef.current.value = '';
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-16 bg-[#030303] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.05)]">
      
      {/* Header */}
      <div className="bg-[#050505] border-b border-white/10 px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-neonOrange/30 bg-neonOrange/5 flex items-center justify-center">
            <Lock className="w-5 h-5 text-neonOrange" />
          </div>
          <div>
            <h3 className="font-cyber font-bold tracking-widest text-white text-sm uppercase">Admin Portal Unlocked</h3>
            <p className="font-cyber text-[9px] text-neonOrange tracking-[0.2em] uppercase mt-0.5">Stylists Editor Mode</p>
          </div>
        </div>
        
        <button 
          onClick={onLockPortal}
          className="flex items-center gap-2 px-5 py-2.5 bg-black border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-colors rounded-lg font-cyber text-[10px] uppercase tracking-widest"
        >
          <Lock className="w-3.5 h-3.5" />
          Lock Portal
        </button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* Left Form Area (8 cols) */}
        <div className="lg:col-span-8 p-8 border-r border-white/10 overflow-y-auto max-h-[600px] custom-scrollbar">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Samantha Hayes"
                className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-neonOrange/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Role / Title</label>
              <input 
                type="text" 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g., Master Hair Couturier"
                className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-neonOrange/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Experience</label>
              <input 
                type="text" 
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g., 12 Years Experience"
                className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-neonOrange/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Instagram Handle</label>
              <input 
                type="text" 
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="e.g., @samantha_couture"
                className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-neonOrange/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Biography</label>
            <textarea 
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Specializes in precision French cuts..."
              className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-neonOrange/50 focus:outline-none transition-colors h-24 resize-none"
            />
          </div>

          <div className="mb-8">
            <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Stylist Photo</label>
            <div className="w-full bg-[#080808] border border-dashed border-white/20 rounded-xl px-5 py-6 text-center hover:border-neonOrange/50 transition-colors relative">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Upload className="w-6 h-6 text-neutral-500 mx-auto mb-3" />
              {file ? (
                <p className="font-sans text-sm text-neonOrange">{file.name}</p>
              ) : (
                <>
                  <p className="font-sans text-sm text-white mb-1">Click or drag photo to upload</p>
                  <p className="font-sans text-xs text-neutral-500">Supports JPG, PNG (Vertical format recommended)</p>
                </>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isUploading}
            className={`w-full sm:w-auto px-10 py-4 bg-neonOrange text-black font-cyber font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3 ${
              isUploading ? 'opacity-50 cursor-not-allowed scale-95' : 'hover:scale-[1.02]'
            }`}
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Uploading...</span>
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Added Stylist!</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Add Stylist</span>
              </>
            )}
          </button>
        </div>

        {/* Right Sidebar List Area (4 cols) */}
        <div className="lg:col-span-4 bg-[#050505] flex flex-col h-full max-h-[600px]">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h4 className="font-cyber font-bold text-[10px] text-white uppercase tracking-widest">
              Current Stylists ({stylists.length})
            </h4>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {stylists.length === 0 ? (
              <p className="text-neutral-600 font-sans text-xs text-center py-10">No stylists added.</p>
            ) : (
              <AnimatePresence>
                {stylists.map((stylist, index) => (
                  <motion.div 
                    key={stylist.id || index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-4 bg-[#080808] border border-white/5 rounded-xl p-3 hover:border-white/20 transition-colors group"
                  >
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-lg bg-black shrink-0 overflow-hidden relative border border-white/10">
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${stylist.image || ''}')` }} />
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h5 className="font-cyber font-bold text-[10px] text-white uppercase tracking-wider truncate mb-1">
                        {stylist.name}
                      </h5>
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-sans text-neutral-400 truncate">{stylist.role}</span>
                        <span className="text-[8px] font-cyber uppercase tracking-wider text-neonOrange">
                          {stylist.experience}
                        </span>
                      </div>
                    </div>

                    {/* Delete Action */}
                    <button 
                      onClick={() => handleDelete(index)}
                      className="w-8 h-8 rounded-full border border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors shrink-0 opacity-50 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
