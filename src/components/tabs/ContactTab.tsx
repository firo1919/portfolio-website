"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { Map as LeafletMap } from "leaflet";
import { Mail, Phone, Send, Paperclip, QrCode, X } from "lucide-react";
import { toast } from "sonner";
import TurnstileWidget from "@/components/TurnstileWidget";

export default function ContactTab() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "", // Optional phone field
        message: "",
        hp_field: "", // Honeypot trap field
    });
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [turnstileToken, setTurnstileToken] = useState("");
    const [showQrModal, setShowQrModal] = useState(false);

    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<LeafletMap | null>(null);

    const handleTurnstileVerify = useCallback((token: string) => {
        setTurnstileToken(token);
    }, []);

    // vCard definition
    const vcardString = `BEGIN:VCARD
VERSION:3.0
N:Roba;Firomsa;Assefa;;
FN:Firomsa Assefa Roba
ORG:Software Engineer
TEL;TYPE=CELL:+251943102554
EMAIL;TYPE=PREF,INTERNET:firomsassf@gmail.com
URL:https://www.linkedin.com/in/firomsa-assefa/
END:VCARD`;

    const downloadVcard = () => {
        try {
            const blob = new Blob([vcardString], {
                type: "text/vcard;charset=utf-8;",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Firomsa_Assefa_Roba.vcf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success("Contact file (.vcf) downloaded successfully!");
        } catch (err) {
            console.error("Vcard download failed:", err);
            toast.error("Failed to download contact file.");
        }
    };

    // Dynamic Leaflet Loading and Setup
    useEffect(() => {
        let active = true;

        // Load Leaflet assets dynamically to avoid SSR issues
        const setupMap = async () => {
            // 1. Add CSS stylesheet
            if (!document.getElementById("leaflet-css")) {
                const link = document.createElement("link");
                link.id = "leaflet-css";
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                document.head.appendChild(link);
            }

            // 2. Import Leaflet library
            const L = (await import("leaflet")).default;

            if (!active || !mapContainerRef.current) return;

            // Clean up previous map if exists
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
            }

            // Bishoftu coordinates
            const bishoftuCoords: [number, number] = [8.7522, 38.9785];

            // Initialize map
            const map = L.map(mapContainerRef.current, {
                zoomControl: false,
                attributionControl: false,
            }).setView(bishoftuCoords, 12);

            mapInstanceRef.current = map;

            // Use voyager themed colored map tiles
            L.tileLayer(
                "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
                {
                    maxZoom: 19,
                },
            ).addTo(map);

            // Add a custom marker with custom glow
            const customIcon = L.divIcon({
                className: "relative w-6 h-6",
                html: `
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-mint-primary border-2 border-white shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse"></div>
        `,
            });

            L.marker(bishoftuCoords, { icon: customIcon })
                .addTo(map)
                .bindPopup("Firomsa's Location: Bishoftu, Ethiopia")
                .openPopup();
        };

        setupMap().catch((err) =>
            console.error("Error initializing Leaflet Map:", err),
        );

        return () => {
            active = false;
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            // Size limit: 1MB
            if (selectedFile.size > 1024 * 1024) {
                toast.error("File size must be under 1MB.");
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        if (!turnstileToken) {
            toast.error(
                "Please complete the CAPTCHA verification before sending.",
            );
            return;
        }

        setIsSubmitting(true);

        let filePayload = undefined;
        if (file) {
            const getBase64 = (f: File): Promise<string> => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(f);
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = (error) => reject(error);
                });
            };

            try {
                const base64Data = await getBase64(file);
                const base64Content = base64Data.split(",")[1];
                filePayload = {
                    name: file.name,
                    type: file.type,
                    content: base64Content,
                };
            } catch (err) {
                console.error("File processing failed:", err);
                toast.error("Failed to process attachment. Please try again.");
                setIsSubmitting(false);
                return;
            }
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    hp_field: formData.hp_field,
                    token: turnstileToken,
                    file: filePayload,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Something went wrong.");
            }

            toast.success(
                "Message sent successfully! Thank you for connecting.",
            );
            // Reset form
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: "",
                hp_field: "",
            });
            setFile(null);
            setTurnstileToken("");
        } catch (err: any) {
            console.error("Submission failed:", err);
            toast.error(
                err.message ||
                    "An unexpected error occurred. Please try again.",
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const turnstileSiteKey = process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY;

    return (
        <div
            id="contact-panel"
            role="tabpanel"
            className="flex flex-col gap-8 animate-fadeIn"
        >
            {/* Title */}
            <section className="flex flex-col gap-4">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-heading text-text-heading relative inline-block">
                    Let&apos;s Connect
                    <span className="absolute bottom-[-6px] left-0 w-16 h-1 rounded bg-gradient-to-r from-mint-primary to-mint-secondary shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                </h1>
            </section>

            {/* Map Section */}
            <div
                ref={mapContainerRef}
                className="w-full h-64 rounded-xl overflow-hidden border border-mint-primary/10 relative z-0 bg-bg-base"
                style={{ minHeight: "260px" }}
            />

            {/* Contact Details & QR Code */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-bg-base/20 border border-mint-primary/5 hover:border-mint-primary/20 transition-all duration-300 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-mint-primary/10 flex items-center justify-center text-mint-light">
                        <Phone size={18} />
                    </div>
                    <div>
                        <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                            Mobile
                        </div>
                        <div className="text-sm font-bold text-text-heading tracking-wide">
                            +251 943102554
                        </div>
                    </div>
                </div>

                <div className="p-4 rounded-xl bg-bg-base/20 border border-mint-primary/5 hover:border-mint-primary/20 transition-all duration-300 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-mint-primary/10 flex items-center justify-center text-mint-light">
                        <Mail size={18} />
                    </div>
                    <div>
                        <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                            Email
                        </div>
                        <div className="text-sm font-bold text-text-heading truncate max-w-37.5">
                            firomsassf@gmail.com
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => setShowQrModal(true)}
                    className="p-4 rounded-xl bg-bg-base/20 border border-mint-primary/5 hover:border-mint-primary/20 transition-all duration-300 flex items-center gap-4 justify-between cursor-pointer group/qr"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-mint-primary/10 flex items-center justify-center text-mint-light">
                            <QrCode size={18} />
                        </div>
                        <div>
                            <div className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">
                                Contact QR
                            </div>
                            <div className="text-xs font-semibold text-text-body group-hover/qr:text-mint-light transition-colors">
                                Scan to save
                            </div>
                        </div>
                    </div>
                    <div className="w-10 h-10 border border-mint-primary/20 rounded bg-white flex items-center justify-center p-0.5 shadow-md group-hover/qr:border-mint-primary/50 transition-all overflow-hidden relative">
                        <Image
                            src="/assets/contact-qr.png"
                            alt="Contact QR Preview"
                            fill
                            sizes="40px"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <section className="flex flex-col gap-4">
                <h2 className="text-lg md:text-xl font-bold font-heading text-text-heading">
                    Contact Form
                </h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 p-6 rounded-xl bg-bg-base/20 border border-mint-primary/5"
                >
                    {/* Honeypot field (hidden from screen reader and users) */}
                    <input
                        type="text"
                        name="hp_field"
                        id="hp_field"
                        value={formData.hp_field}
                        onChange={handleInputChange}
                        tabIndex={-1}
                        autoComplete="off"
                        className="sr-only"
                        aria-hidden="true"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="name"
                                className="text-xs font-semibold text-text-muted"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Your name"
                                className="px-4 py-3 rounded-lg bg-bg-input border border-mint-primary/10 text-text-heading text-sm focus:border-mint-primary/40 focus:outline-none focus:ring-1 focus:ring-mint-primary/20 transition-all"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="email"
                                className="text-xs font-semibold text-text-muted"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="your.email@example.com"
                                className="px-4 py-3 rounded-lg bg-bg-input border border-mint-primary/10 text-text-heading text-sm focus:border-mint-primary/40 focus:outline-none focus:ring-1 focus:ring-mint-primary/20 transition-all"
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="phone"
                                className="text-xs font-semibold text-text-muted"
                            >
                                Phone Number (Optional)
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="+251 900 000 000"
                                className="px-4 py-3 rounded-lg bg-bg-input border border-mint-primary/10 text-text-heading text-sm focus:border-mint-primary/40 focus:outline-none focus:ring-1 focus:ring-mint-primary/20 transition-all"
                            />
                        </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="message"
                            className="text-xs font-semibold text-text-muted"
                        >
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            required
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="What would you like to build?"
                            className="px-4 py-3 rounded-lg bg-bg-input border border-mint-primary/10 text-text-heading text-sm focus:border-mint-primary/40 focus:outline-none focus:ring-1 focus:ring-mint-primary/20 transition-all resize-none"
                        />
                    </div>

                    {/* Attach PDF (Optional) */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-mint-primary/20 hover:border-mint-primary/50 text-text-muted hover:text-mint-light text-xs font-semibold cursor-pointer transition-all duration-300">
                            <Paperclip size={14} />
                            <span>
                                {file ? file.name : "Attach PDF (Optional)"}
                            </span>
                            <input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                        <span className="text-[10px] text-text-muted font-medium">
                            Only PDF files up to 1 MB
                        </span>
                    </div>

                    {/* Cloudflare Turnstile Integration */}
                    {turnstileSiteKey && (
                        <div className="flex justify-start my-1 flex-col">
                            <span className="text-xs font-semibold text-text-muted mb-1">
                                Human Verification
                            </span>
                            <TurnstileWidget
                                siteKey={turnstileSiteKey}
                                onVerify={handleTurnstileVerify}
                            />
                        </div>
                    )}

                    {/* Submit Message */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-gradient-to-r from-mint-primary to-mint-secondary text-bg-base font-bold text-sm tracking-wide hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all duration-300 mt-2 shadow-[0_0_15px_rgba(16,185,129,0.1)] w-full sm:w-fit sm:self-end"
                    >
                        {isSubmitting ? (
                            <span className="w-5 h-5 border-2 border-bg-base border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <Send size={15} />
                                <span>Send Message</span>
                            </>
                        )}
                    </button>
                </form>
            </section>

            {/* QR Modal */}
            {showQrModal && (
                <div
                    onClick={() => setShowQrModal(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-sm bg-glass border-glass rounded-2xl p-6 shadow-2xl relative flex flex-col items-center gap-5 text-center"
                    >
                        <button
                            onClick={() => setShowQrModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-bg-base/40 border border-mint-primary/10 flex items-center justify-center text-text-muted hover:text-mint-light transition-all cursor-pointer"
                        >
                            <X size={16} />
                        </button>

                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-lg font-bold text-text-heading font-heading">
                                Save Contact Card
                            </h3>
                            <p className="text-xs text-text-muted">
                                Scan the QR code with your phone camera to
                                instantly save my contact details.
                            </p>
                        </div>

                        <div className="w-48 h-48 border-2 border-mint-primary/20 rounded-xl bg-white flex items-center justify-center p-3 shadow-lg relative group/qrmodal">
                            <Image
                                src="/assets/contact-qr.png"
                                alt="Firomsa Assefa Roba Contact QR"
                                width={192}
                                height={192}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 border border-mint-primary/40 rounded-xl pointer-events-none group-hover/qrmodal:scale-105 transition-transform duration-300" />
                        </div>

                        <div className="flex flex-col gap-2 w-full mt-2">
                            <div className="text-[10px] text-text-muted font-medium uppercase tracking-wider">
                                Alternative
                            </div>
                            <button
                                onClick={downloadVcard}
                                className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-mint-primary to-mint-secondary text-bg-base font-bold text-xs tracking-wide hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-md"
                            >
                                Download Contact File (.vcf)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
