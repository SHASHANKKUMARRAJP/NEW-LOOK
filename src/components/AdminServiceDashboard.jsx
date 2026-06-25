import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Upload, Trash2, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { defaultServiceCategories } from './Services';

const CLOUDINARY_CLOUD_NAME = 'dtcpixf4a';
const CLOUDINARY_UPLOAD_PRESET = 'my_video_preset'; 

export default function AdminServiceDashboard({ servicesData, onLockPortal }) {
  const [categoryId, setCategoryId] = useState('hair');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [duration, setDuration] = useState('');
  const [provider, setProvider] = useState('');
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

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      if (isFirebaseConnected && itemId) {
        try {
          const docRef = doc(db, 'services', itemId);
          await deleteDoc(docRef);
        } catch (error) {
          console.error("Firebase Deletion Error:", error);
          alert("Error deleting service from database: " + error.message);
        }
      } else {
        alert("Please connect Firebase to permanently delete items.");
      }
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !price.trim() || !file) { 
      alert("Please enter at least Name, Price, and upload an Image"); 
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
          categoryId,
          name,
          price,
          desc,
          duration,
          provider,
          image: mediaUrl,
          createdAt: new Date().toISOString()
        };
        await addDoc(collection(db, 'services'), docData);
        
        // Reset form & show success
        setName('');
        setPrice('');
        setDesc('');
        setDuration('');
        setProvider('');
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
      } catch (error) {
        console.error("Firebase upload error:", error);
        alert("Failed to add service. Check console for error logs.");
      } finally {
        setIsUploading(false);
      }
    } else {
       alert("Please connect Firebase to permanently add items.");
    }
  };

  const handleRestoreDefaults = async () => {
    if (!isFirebaseConnected) {
      alert("Please connect Firebase to restore defaults permanently.");
      return;
    }
    if (!window.confirm("Restore ALL default services across all categories?")) return;
    
    setIsUploading(true);
    try {
      for (const category of defaultServiceCategories) {
        for (const service of category.services) {
          await addDoc(collection(db, 'services'), {
            ...service,
            categoryId: category.id,
            createdAt: new Date().toISOString()
          });
        }
      }
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Firebase restore error:", error);
      alert("Failed to restore templates.");
    } finally {
      setIsUploading(false);
    }
  };

  // Flatten the services to show a total count in the right sidebar
  let allServicesCount = 0;
  servicesData.forEach(cat => { allServicesCount += cat.services.length; });

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
            <p className="font-cyber text-[9px] text-neonOrange tracking-[0.2em] uppercase mt-0.5">Services Menu Editor</p>
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
        <div className="lg:col-span-8 p-8 border-r border-white/10 overflow-y-auto max-h-[700px] custom-scrollbar">
          
          <div className="mb-6">
            <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Service Category</label>
            <select 
              value={categoryId} 
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-neonOrange/50 focus:outline-none transition-colors appearance-none"
            >
              {defaultServiceCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Service Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Royal Keratin Therapy"
                className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-neonOrange/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Price</label>
              <input 
                type="text" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g., $350"
                className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-neonOrange/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Duration</label>
              <input 
                type="text" 
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 90 MNS"
                className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-neonOrange/50 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Provider Name</label>
              <input 
                type="text" 
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                placeholder="e.g., Nusrat Jahan"
                className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-neonOrange/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Description</label>
            <textarea 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Premium smoothing treatment..."
              className="w-full bg-[#080808] border border-white/10 rounded-xl px-5 py-4 text-white text-sm focus:border-neonOrange/50 focus:outline-none transition-colors h-24 resize-none"
            />
          </div>

          <div className="mb-8">
            <label className="block font-cyber text-[10px] text-neutral-500 uppercase tracking-widest mb-3">Service Image</label>
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
                  <p className="font-sans text-xs text-neutral-500">Supports JPG, PNG (Horizontal format recommended)</p>
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
                <span>Added Service!</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Add Service</span>
              </>
            )}
          </button>
        </div>

        {/* Right Sidebar List Area (4 cols) */}
        <div className="lg:col-span-4 bg-[#050505] flex flex-col h-full max-h-[700px]">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h4 className="font-cyber font-bold text-[10px] text-white uppercase tracking-widest">
              Current Menu ({allServicesCount})
            </h4>
            <button 
              onClick={handleRestoreDefaults}
              disabled={isUploading}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-[9px] font-cyber text-neutral-400 hover:text-white uppercase tracking-widest transition-colors"
            >
              Restore Templates
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {allServicesCount === 0 ? (
              <p className="text-neutral-600 font-sans text-xs text-center py-10">No services added.</p>
            ) : (
              servicesData.map((category) => (
                <div key={category.id}>
                   <h5 className="font-cyber text-[9px] text-[#D4AF37] uppercase tracking-widest mb-3">{category.name}</h5>
                   <AnimatePresence>
                    {category.services.map((service, index) => (
                      <motion.div 
                        key={service.id || index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-4 bg-[#080808] border border-white/5 rounded-xl p-3 mb-3 hover:border-white/20 transition-colors group"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 rounded-lg bg-black shrink-0 overflow-hidden relative border border-white/10">
                          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${service.image || ''}')` }} />
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h5 className="font-cyber font-bold text-[10px] text-white uppercase tracking-wider truncate mb-1">
                            {service.name}
                          </h5>
                          <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-sans text-neutral-400 truncate">{service.price}</span>
                          </div>
                        </div>

                        {/* Delete Action */}
                        <button 
                          onClick={() => handleDelete(service.id)}
                          className="w-8 h-8 rounded-full border border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors shrink-0 opacity-50 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
