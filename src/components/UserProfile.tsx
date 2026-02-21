import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MapPin, Edit2, Save, Phone, Mail, Home, Clock, Package, ShoppingCart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserProfile() {
    const { user, profile, updateProfile } = useAuth();
    const { items: cartItems } = useCart();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [orderCount, setOrderCount] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        shipping_address: {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        }
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                phone: profile.phone || '',
                shipping_address: {
                    street: profile.shipping_address?.street || '',
                    city: profile.shipping_address?.city || '',
                    state: profile.shipping_address?.state || '',
                    zip: profile.shipping_address?.zip || '',
                    country: profile.shipping_address?.country || ''
                }
            });
        }
    }, [profile]);

    useEffect(() => {
        const fetchOrderCount = async () => {
            if (user) {
                try {
                    const q = query(collection(db, 'orders'), where('user_id', '==', user.uid));
                    const snapshot = await getCountFromServer(q);
                    setOrderCount(snapshot.data().count);
                } catch (error) {
                    console.error("Error fetching order count:", error);
                    setOrderCount(0);
                }
            }
        };
        fetchOrderCount();
    }, [user]);

    const handleSave = async () => {
        setIsSaving(true);
        const { error } = await updateProfile({
            name: formData.name,
            phone: formData.phone,
            shipping_address: formData.shipping_address
        });

        setIsSaving(false);
        if (!error) {
            setIsEditing(false);
        } else {
            alert('Failed to update profile: ' + error.message);
        }
    };

    if (!user || !profile) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-primary transition-colors duration-500">
                <div className="animate-pulse text-gray-500 dark:text-accent/60 tracking-[0.2em] uppercase text-xs font-bold">
                    Identifying User...
                </div>
            </div>
        );
    }

    const inputClasses = "w-full bg-transparent border-b-2 border-gray-200 dark:border-accent/20 pb-2 text-primary dark:text-white font-bold focus:outline-none focus:border-primary dark:focus:border-accent transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-600";

    return (
        <section className="min-h-screen bg-gray-50 dark:bg-primary pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 font-sans">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6"
                >
                    <div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-primary dark:text-white leading-[0.85] mb-4">
                            Profile
                        </h1>
                        <p className="text-gray-500 dark:text-accent/60 tracking-[0.2em] font-bold uppercase text-xs">
                            Account Overview & Logistics
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            if (isEditing) handleSave();
                            else setIsEditing(true);
                        }}
                        disabled={isSaving}
                        className={`group relative flex items-center justify-center space-x-3 px-8 py-4 rounded-none font-bold uppercase tracking-[0.2em] transition-all duration-300 text-xs overflow-hidden ${isEditing
                            ? 'bg-primary dark:bg-accent text-white dark:text-primary hover:bg-gray-900 dark:hover:bg-white'
                            : 'bg-white dark:bg-primary-light text-primary dark:text-white border border-gray-200 dark:border-accent/20 hover:border-primary dark:hover:border-accent'
                            }`}
                    >
                        {isSaving ? (
                            <span className="animate-pulse">Updating...</span>
                        ) : isEditing ? (
                            <>
                                <Save className="w-4 h-4" />
                                <span>Save Changes</span>
                            </>
                        ) : (
                            <>
                                <Edit2 className="w-4 h-4" />
                                <span>Edit Profile</span>
                            </>
                        )}
                        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                    {isEditing && (
    return (
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <h1 className="text-4xl font-black uppercase tracking-tighter text-primary dark:text-white mb-8">
                            My Profile
                        </h1>

                        <div className="max-w-3xl mx-auto">
                            {/* Sidebar / Info Card */}
                            <div className="space-y-6">
                                <div className="bg-white dark:bg-[#1A1A1A] rounded-lg shadow-md p-6 relative">
                                    {/* Edit Toggle */}
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            // Revert to initial profile data
                                            setFormData({
                                                name: profile.name || '',
                                                phone: profile.phone || '',
                                                shipping_address: {
                                                    street: profile.shipping_address?.street || '',
                                                    city: profile.shipping_address?.city || '',
                                                    state: profile.shipping_address?.state || '',
                                                    zip: profile.shipping_address?.zip || '',
                                                    country: profile.shipping_address?.country || ''
                                                }
                                            });
                                        }}
                                        className="bg-transparent text-gray-500 dark:text-accent/60 hover:text-red-500 font-bold uppercase tracking-[0.2em] text-[10px] transition-colors"
                                        className={`absolute top-4 right-4 p-2 rounded-full transition-smooth
                                ${isEditing
                                                ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                                : 'bg-gray-100 dark:bg-[#121212] text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#282828]'}`}
                                        title={isEditing ? "Save Changes" : "Edit Profile"}
                                    >
                                        Cancel
                                    </button>
                    )}
                                </motion.div>

                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                                    {/* ID Card Column */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className="lg:col-span-5 h-full"
                                    >
                                        <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-accent/10 p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group h-full flex flex-col">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 dark:bg-accent/5 rounded-bl-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-110 pointer-events-none" />

                                            <div className="relative z-10 flex flex-col items-center mb-8">
                                                <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-primary-light border-4 border-white dark:border-[#0a0a0a] shadow-xl flex items-center justify-center text-5xl font-black text-gray-300 dark:text-accent/20 uppercase mb-6">
                                                    {profile.name ? profile.name.charAt(0) : '—'}
                                                </div>

                                                <div className="flex items-center space-x-4 mb-6 pt-4">
                                                    <div className="w-16 h-16 bg-primary dark:bg-white rounded-full flex items-center justify-center text-white dark:text-[#363636] text-2xl font-bold">
                                                        {profile.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1">
                                                        {isEditing ? (
                                                            <input
                                                                type="text"
                                                                value={formData.name}
                                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                                placeholder="Full Name"
                                                                className={`${inputClasses} text-center text-2xl mb-2`}
                                                            />
                                                        ) : (
                                                            <h2 className="text-2xl font-black uppercase tracking-tight text-primary dark:text-white mb-2 text-center break-words w-full">
                                                                {profile.name || 'Unknown'}
                                                            </h2>
                                                        )}

                                                        <div className="flex items-center justify-center text-gray-500 dark:text-accent/60 text-sm font-medium pt-2 w-full break-all">
                                                            <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                                                            <span className="">{user.email}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex-grow flex flex-col justify-center py-8 w-full">
                                                        <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-accent/50 mb-6 border-b border-gray-100 dark:border-accent/10 pb-2">
                                                            Account Metrics
                                                        </h4>

                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between text-sm">
                                                                <div className="flex items-center text-gray-500 dark:text-accent/60">
                                                                    <Package className="w-4 h-4 mr-3" />
                                                                    <span>Total Orders</span>
                                                                </div>
                                                                <span className="font-bold text-primary dark:text-white">
                                                                    {orderCount === null ? (
                                                                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                                                                    ) : (
                                                                        orderCount
                                                                    )}
                                                                </span>
                                                            </div>

                                                            <div className="flex items-center justify-between text-sm">
                                                                <div className="flex items-center text-gray-500 dark:text-accent/60">
                                                                    <Clock className="w-4 h-4 mr-3" />
                                                                    <span>Member Since</span>
                                                                </div>
                                                                <span className="font-bold text-primary dark:text-white">{new Date(user.metadata?.creationTime || Date.now()).getFullYear()}</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="pt-6 border-t border-gray-100 dark:border-accent/10 mt-auto">
                                                        <p className="text-[10px] tracking-[0.2em] font-bold text-gray-400 dark:text-accent/40 uppercase mb-4">
                                                            Verification Status
                                                        </p>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-white">Active Clearance</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Details Column */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                className="lg:col-span-7 space-y-8 h-full flex flex-col"
                                            >
                                                {/* Contact Info */}
                                                <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-accent/10 p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
                                                    <div className="flex items-center mb-8 pb-4 border-b border-gray-100 dark:border-accent/10">
                                                        <Phone className="w-5 h-5 text-gray-400 dark:text-accent/50 mr-4" />
                                                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary dark:text-white">
                                                            Communications
                                                        </h3>
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div>
                                                            <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-accent/50 mb-2">
                                                                Primary Comms Line
                                                            </label>
                                                            {isEditing ? (
                                                                <input
                                                                    type="tel"
                                                                    value={formData.phone}
                                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                                    placeholder="+1 (555) 000-0000"
                                                                    className={inputClasses}
                                                                />
                                                            ) : (
                                                                <p className="text-lg font-medium text-primary dark:text-gray-300">
                                                                    {profile.phone || 'Not Provided'}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Logistics */}
                                                <div className="bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-accent/10 p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative">
                                                    {isEditing && (
                                                        <button
                                                            onClick={() => {
                                                                setFormData(prev => ({ ...prev, shipping_address: { street: '', city: '', state: '', zip: '', country: '' } }));
                                                            }}
                                                            className="absolute top-8 right-8 text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-red-500 transition-colors"
                                                        >
                                                            Clear Form
                                                        </button>
                                                    )}

                                                    <div className="flex items-center mb-8 pb-4 border-b border-gray-100 dark:border-accent/10 pr-16 md:pr-0">
                                                        <MapPin className="w-5 h-5 text-gray-400 dark:text-accent/50 mr-4 flex-shrink-0" />
                                                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-primary dark:text-white truncate">
                                                            Logistics Routing
                                                        </h3>
                                                    </div>

                                                    {isEditing ? (
                                                        <div className="space-y-8">
                                                            <div>
                                                                <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-accent/50 mb-2">
                                                                    Street Address
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    value={formData.shipping_address.street}
                                                                    onChange={(e) => setFormData({
                                                                        ...formData,
                                                                        shipping_address: { ...formData.shipping_address, street: e.target.value }
                                                                    })}
                                                                    placeholder="123 Sector Ave"
                                                                    className={inputClasses}
                                                                />
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                <div>
                                                                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-accent/50 mb-2">
                                                                        City
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={formData.shipping_address.city}
                                                                        onChange={(e) => setFormData({
                                                                            ...formData,
                                                                            shipping_address: { ...formData.shipping_address, city: e.target.value }
                                                                        })}
                                                                        placeholder="Metropolis"
                                                                        className={inputClasses}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-accent/50 mb-2">
                                                                        State/Province
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={formData.shipping_address.state}
                                                                        onChange={(e) => setFormData({
                                                                            ...formData,
                                                                            shipping_address: { ...formData.shipping_address, state: e.target.value }
                                                                        })}
                                                                        placeholder="NY"
                                                                        className={inputClasses}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-accent/50 mb-2">
                                                                        Postal Code
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={formData.shipping_address.zip}
                                                                        onChange={(e) => setFormData({
                                                                            ...formData,
                                                                            shipping_address: { ...formData.shipping_address, zip: e.target.value }
                                                                        })}
                                                                        placeholder="10001"
                                                                        className={inputClasses}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-accent/50 mb-2">
                                                                        Country
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={formData.shipping_address.country}
                                                                        onChange={(e) => setFormData({
                                                                            ...formData,
                                                                            shipping_address: { ...formData.shipping_address, country: e.target.value }
                                                                        })}
                                                                        placeholder="United States"
                                                                        className={inputClasses}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="space-y-6">
                                                            {profile.shipping_address?.street ? (
                                                                <>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                        <div>
                                                                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-accent/50 mb-1">Street</p>
                                                                            <p className="text-lg font-medium text-primary dark:text-gray-300 break-words">{profile.shipping_address.street}</p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-accent/50 mb-1">City / Region</p>
                                                                            <p className="text-lg font-medium text-primary dark:text-gray-300 break-words">
                                                                                {profile.shipping_address.city}{profile.shipping_address.state ? `, ${profile.shipping_address.state}` : ''}
                                                                            </p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-accent/50 mb-1">Postal Code</p>
                                                                            <p className="text-lg font-medium text-primary dark:text-gray-300">{profile.shipping_address.zip || '—'}</p>
                                                                        </div>
                                                                        <div>
                                                                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 dark:text-accent/50 mb-1">Country</p>
                                                                            <p className="text-lg font-medium text-primary dark:text-gray-300">{profile.shipping_address.country || '—'}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <div className="py-8 md:py-12 text-center bg-gray-50 dark:bg-primary-light/50 border border-dashed border-gray-200 dark:border-accent/20 rounded-lg transition-colors">
                                                                    <Home className="w-8 h-8 text-gray-300 dark:text-accent/20 mx-auto mb-3" />
                                                                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-accent/60">No Logistics Data Found</p>
                                                                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 px-4 max-w-sm mx-auto leading-relaxed">Enter edit mode to set your secure routing information.</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </div>
                                </div>
                            </section>
                            );
}

