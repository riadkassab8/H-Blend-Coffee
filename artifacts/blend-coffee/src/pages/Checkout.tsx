import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, CreditCard, Smartphone, Wallet, Lock, Shield, Clock, Phone, QrCode, Copy, CheckCircle2, AlertCircle, ShoppingBag, Upload, X, Image as ImageIcon, MessageCircle, Sparkles, PartyPopper, Send, ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";

type PaymentMethod = "instapay" | "vodafone-cash" | "cash";

export default function Checkout() {
  const { items, clearCart } = useCart();
  const { t, language } = useLanguage();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [paymentStep, setPaymentStep] = useState<"select" | "processing" | "success">("select");
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    instapayNumber: "",
    vodafoneNumber: "",
  });
  const [copied, setCopied] = useState(false);
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    address?: string;
    city?: string;
    receipt?: string;
  }>({});
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [orderData, setOrderData] = useState<{
    products: typeof cartProducts;
    subtotal: number;
    delivery: number;
    total: number;
  } | null>(null);

  // Validation functions
  const validateName = (name: string): boolean => {
    const nameRegex = /^[\u0600-\u06FFa-zA-Z\s]{3,50}$/;
    return nameRegex.test(name);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(01[0-2|5][0-9]{8})$/;
    return phoneRegex.test(phone);
  };

  const validateAddress = (address: string): boolean => {
    return address.length >= 10 && address.length <= 200;
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.name || !validateName(formData.name)) {
      newErrors.name = t("checkout.error.name");
    }

    if (!formData.phone || !validatePhone(formData.phone)) {
      newErrors.phone = t("checkout.error.phone");
    }

    if (!formData.address || !validateAddress(formData.address)) {
      newErrors.address = t("checkout.error.address");
    }

    if (!formData.city) {
      newErrors.city = t("checkout.error.city");
    }

    if ((selectedPayment === "instapay" || selectedPayment === "vodafone-cash") && !receiptImage) {
      newErrors.receipt = t("checkout.error.receipt");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const cartProducts = items.map((item) => {
    const product = products.find((p) => p.id === item.productId)!;
    const roastLabel = item.roast ? t(`menu.roast.${item.roast.toLowerCase()}.label`) : null;
    return {
      ...product,
      displayName: language === "ar" ? product.nameAr : product.name,
      quantity: item.quantity,
      roast: item.roast,
      roastLabel,
      cartKey: `${item.productId}-${item.roast ?? "none"}`,
    };
  });

  const subtotal = cartProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = subtotal > 200 ? 0 : 30;
  const total = subtotal + delivery;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveReceipt = () => {
    setReceiptImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePayment = () => {
    if (!validateForm()) {
      return;
    }

    setPaymentStep("processing");
    // Generate sequential order number
    const lastOrderNumber = parseInt(localStorage.getItem("lastOrderNumber") || "0");
    const newOrderNumber = lastOrderNumber + 1;
    localStorage.setItem("lastOrderNumber", newOrderNumber.toString());
    setOrderNumber(`#${newOrderNumber.toString().padStart(3, "0")}`);

    // Save order data before clearing cart
    setOrderData({
      products: cartProducts,
      subtotal,
      delivery,
      total,
    });

    setTimeout(() => {
      setPaymentStep("success");
      clearCart();

      // Show toast notification
      toast({
        title: t("checkout.thankYou"),
        description: t("checkout.thankYouDesc"),
        duration: 5000,
      });
    }, 3000);
  };

  const generateWhatsAppMessage = (): string => {
    const products = orderData?.products || cartProducts;
    const itemsList = products
      .map((item) => {
        const roast = "roastLabel" in item && item.roastLabel ? ` (${item.roastLabel})` : "";
        return `• ${item.displayName}${roast} x${item.quantity} - ${item.price * item.quantity} ${t("common.egp")}`;
      })
      .join("\n");

    const currentSubtotal = orderData?.subtotal ?? subtotal;
    const currentDelivery = orderData?.delivery ?? delivery;
    const currentTotal = orderData?.total ?? total;

    const message = language === "ar"
      ? `🎉 *طلب جديد*\n\n` +
        `📋 *رقم الطلب:* ${orderNumber}\n` +
        `👤 *الاسم:* ${formData.name}\n` +
        `📱 *الهاتف:* ${formData.phone}\n` +
        `📍 *العنوان:* ${formData.address}, ${formData.city}\n` +
        `💳 *طريقة الدفع:* ${selectedPayment === "instapay" ? "InstaPay" : selectedPayment === "vodafone-cash" ? "Vodafone Cash" : "الدفع عند الاستلام"}\n\n` +
        `📦 *المنتجات:*\n${itemsList}\n\n` +
        `💰 *المجموع الفرعي:* ${currentSubtotal} ${t("common.egp")}\n` +
        `🚚 *التوصيل:* ${currentDelivery === 0 ? "مجاني" : currentDelivery + " " + t("common.egp")}\n` +
        `✅ *الإجمالي:* ${currentTotal} ${t("common.egp")}`
      : `🎉 *New Order*\n\n` +
        `📋 *Order Number:* ${orderNumber}\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📱 *Phone:* ${formData.phone}\n` +
        `📍 *Address:* ${formData.address}, ${formData.city}\n` +
        `💳 *Payment Method:* ${selectedPayment === "instapay" ? "InstaPay" : selectedPayment === "vodafone-cash" ? "Vodafone Cash" : "Cash on Delivery"}\n\n` +
        `📦 *Items:*\n${itemsList}\n\n` +
        `💰 *Subtotal:* ${currentSubtotal} ${t("common.egp")}\n` +
        `🚚 *Delivery:* ${currentDelivery === 0 ? "Free" : currentDelivery + " " + t("common.egp")}\n` +
        `✅ *Total:* ${currentTotal} ${t("common.egp")}`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "201098277229"; // Replace with actual WhatsApp number
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  if (paymentStep === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto">
            {/* Simple Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Check size={32} className="text-accent" />
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
                تم الطلب بنجاح
              </h1>
              <p className="text-muted-foreground text-lg mb-4">
                شكراً لطلبك، سنتواصل معك قريباً لتأكيد التوصيل
              </p>
              <div className="bg-muted/50 border border-border rounded-xl p-4 inline-block">
                <p className="text-sm text-foreground font-medium">
                  {t("checkout.orderNumberLabel")} <span className="font-mono text-accent">{orderNumber}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleWhatsAppOrder}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all"
              >
                <MessageCircle size={18} />
                {t("checkout.trackOrder")}
              </button>
              <Link href="/menu">
                <a className="flex items-center justify-center gap-2 px-8 py-3 bg-muted text-muted-foreground font-semibold rounded-full hover:bg-muted/80 transition-all">
                  {t("checkout.backToMenu")}
                </a>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={32} className="text-muted-foreground" />
            </div>
            <h1 className="font-serif text-4xl font-bold text-foreground mb-4">{t("checkout.empty")}</h1>
            <Link href="/menu">
              <a className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all">
                {t("cart.browseMenu")} <ArrowRight size={16} />
              </a>
            </Link>
          </motion.div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24 px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">{t("checkout.title")}</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-8">
            {t("checkout.subtitle")}
          </h1>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    currentStep === step
                      ? "bg-accent text-accent-foreground"
                      : currentStep > step
                      ? "bg-accent/20 text-accent"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step ? <Check size={18} /> : step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 transition-all ${
                      currentStep > step ? "bg-accent" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-16 mt-3">
            <span className={`text-xs font-medium ${currentStep === 1 ? "text-accent" : "text-muted-foreground"}`}>
              {t("checkout.step.delivery")}
            </span>
            <span className={`text-xs font-medium ${currentStep === 2 ? "text-accent" : "text-muted-foreground"}`}>
              {t("checkout.step.payment")}
            </span>
            <span className={`text-xs font-medium ${currentStep === 3 ? "text-accent" : "text-muted-foreground"}`}>
              {t("checkout.step.confirm")}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form - Steps */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Delivery Information */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Delivery Information */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6"
                  >
                    <h2 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <Smartphone size={20} className="text-accent" />
                      {t("checkout.deliveryInfo")}
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">{t("checkout.fullName")}</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({ ...errors, name: undefined });
                          }}
                          className={`w-full px-4 py-3 bg-background border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 transition-all ${
                            errors.name ? "border-red-500 focus:ring-red-500/40" : "border-border focus:ring-accent/40"
                          }`}
                          placeholder={t("checkout.fullNamePlaceholder")}
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-1 flex items-center gap-1"
                          >
                            <AlertCircle size={12} />
                            {errors.name}
                          </motion.p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">{t("checkout.phone")}</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => {
                            setFormData({ ...formData, phone: e.target.value });
                            if (errors.phone) setErrors({ ...errors, phone: undefined });
                          }}
                          className={`w-full px-4 py-3 bg-background border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 transition-all ${
                            errors.phone ? "border-red-500 focus:ring-red-500/40" : "border-border focus:ring-accent/40"
                          }`}
                          placeholder={t("checkout.phonePlaceholder")}
                        />
                        {errors.phone && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-1 flex items-center gap-1"
                          >
                            <AlertCircle size={12} />
                            {errors.phone}
                          </motion.p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">{t("checkout.address")}</label>
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => {
                            setFormData({ ...formData, address: e.target.value });
                            if (errors.address) setErrors({ ...errors, address: undefined });
                          }}
                          className={`w-full px-4 py-3 bg-background border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 transition-all ${
                            errors.address ? "border-red-500 focus:ring-red-500/40" : "border-border focus:ring-accent/40"
                          }`}
                          placeholder={t("checkout.addressPlaceholder")}
                        />
                        {errors.address && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-1 flex items-center gap-1"
                          >
                            <AlertCircle size={12} />
                            {errors.address}
                          </motion.p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">{t("checkout.city")}</label>
                        <select
                          value={formData.city}
                          onChange={(e) => {
                            setFormData({ ...formData, city: e.target.value });
                            if (errors.city) setErrors({ ...errors, city: undefined });
                          }}
                          className={`w-full px-4 py-3 bg-background border rounded-xl text-foreground focus:outline-none focus:ring-2 transition-all ${
                            errors.city ? "border-red-500 focus:ring-red-500/40" : "border-border focus:ring-accent/40"
                          }`}
                        >
                          <option value="">{t("checkout.selectCity")}</option>
                          <option value="cairo">{t("checkout.cairo")}</option>
                          <option value="giza">{t("checkout.giza")}</option>
                          <option value="alexandria">{t("checkout.alexandria")}</option>
                        </select>
                        {errors.city && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-1 flex items-center gap-1"
                          >
                            <AlertCircle size={12} />
                            {errors.city}
                          </motion.p>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        if (validateName(formData.name) && validatePhone(formData.phone) && validateAddress(formData.address) && formData.city) {
                          setCurrentStep(2);
                        } else {
                          validateForm();
                        }
                      }}
                      className="flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all"
                    >
                      {t("common.next")} <ArrowRight size={16} className="icon-rtl" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Payment Methods */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6"
                  >
                    <h2 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <CreditCard size={20} className="text-accent" />
                      {t("checkout.paymentMethod")}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {/* InstaPay */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPayment("instapay")}
                        className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer bg-card ${
                          selectedPayment === "instapay"
                            ? "border-amber-500"
                            : "border-border hover:border-amber-500/50"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted">
                            <QrCode size={24} className="text-foreground" />
                          </div>
                          <div className="text-center">
                            <h3 className="font-bold text-foreground">InstaPay</h3>
                            <p className="text-xs text-muted-foreground">{t("checkout.instapayDesc")}</p>
                          </div>
                        </div>
                        {selectedPayment === "instapay" && (
                          <div className="absolute top-3 right-3">
                            <Check size={20} className="text-amber-500" />
                          </div>
                        )}
                      </motion.button>

                      {/* Vodafone Cash */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPayment("vodafone-cash")}
                        className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer bg-card ${
                          selectedPayment === "vodafone-cash"
                            ? "border-amber-500"
                            : "border-border hover:border-amber-500/50"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted">
                            <Smartphone size={24} className="text-foreground" />
                          </div>
                          <div className="text-center">
                            <h3 className="font-bold text-foreground">Vodafone Cash</h3>
                            <p className="text-xs text-muted-foreground">{t("checkout.vodafoneDesc")}</p>
                          </div>
                        </div>
                        {selectedPayment === "vodafone-cash" && (
                          <div className="absolute top-3 right-3">
                            <Check size={20} className="text-amber-500" />
                          </div>
                        )}
                      </motion.button>

                      {/* Cash on Delivery */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedPayment("cash")}
                        className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer bg-card ${
                          selectedPayment === "cash"
                            ? "border-amber-500"
                            : "border-border hover:border-amber-500/50"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-muted">
                            <Wallet size={24} className="text-foreground" />
                          </div>
                          <div className="text-center">
                            <h3 className="font-bold text-foreground">{t("checkout.cashOnDelivery")}</h3>
                            <p className="text-xs text-muted-foreground">{t("checkout.cashDesc")}</p>
                          </div>
                        </div>
                        {selectedPayment === "cash" && (
                          <div className="absolute top-3 right-3">
                            <Check size={20} className="text-amber-500" />
                          </div>
                        )}
                      </motion.button>
                    </div>

                    {/* Payment Details */}
                    <AnimatePresence>
                      {selectedPayment === "instapay" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-card border border-border rounded-2xl p-6"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                              <QrCode size={28} className="text-foreground" />
                            </div>
                            <div>
                              <h3 className="font-bold text-xl mb-1 text-foreground">InstaPay</h3>
                              <p className="text-sm text-muted-foreground">{t("checkout.instapayInstructions")}</p>
                            </div>
                          </div>

                          <div className="bg-muted/50 rounded-xl p-4 mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">{t("checkout.merchantNumber")}</p>
                                <p className="font-mono text-xl font-bold text-foreground">01098277229</p>
                              </div>
                              <button
                                onClick={() => handleCopy("01098277229")}
                                className="p-3 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors cursor-pointer"
                              >
                                {copied ? <Check size={20} className="text-accent" /> : <Copy size={20} className="text-accent" />}
                              </button>
                            </div>
                            <div className="border-t border-border pt-3">
                              <p className="text-xs text-muted-foreground mb-2">{t("checkout.amountToPay")}</p>
                              <p className="font-mono text-2xl font-bold text-foreground">{total.toFixed(0)} {t("common.egp")}</p>
                            </div>
                          </div>

                          <div className="bg-muted/50 rounded-xl p-4 mb-4">
                            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                              <li>{t("checkout.instapay.step1")}</li>
                              <li>{t("checkout.instapay.step2")}</li>
                              <li>{t("checkout.instapay.step3")}</li>
                              <li>{t("checkout.instapay.step4")}</li>
                            </ol>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock size={14} />
                            {t("checkout.paymentTime")}
                          </div>
                        </motion.div>
                      )}

                      {selectedPayment === "vodafone-cash" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-card border border-border rounded-2xl p-6"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                              <Smartphone size={28} className="text-foreground" />
                            </div>
                            <div>
                              <h3 className="font-bold text-xl mb-1 text-foreground">Vodafone Cash</h3>
                              <p className="text-sm text-muted-foreground">{t("checkout.vodafoneInstructions")}</p>
                            </div>
                          </div>

                          <div className="bg-muted/50 rounded-xl p-4 mb-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="text-xs text-muted-foreground mb-1">{t("checkout.vodafoneNumber")}</p>
                                <p className="font-mono text-xl font-bold text-foreground">01012345678</p>
                              </div>
                              <button
                                onClick={() => handleCopy("01012345678")}
                                className="p-3 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors cursor-pointer"
                              >
                                {copied ? <Check size={20} className="text-accent" /> : <Copy size={20} className="text-accent" />}
                              </button>
                            </div>
                            <div className="border-t border-border pt-3">
                              <p className="text-xs text-muted-foreground mb-2">{t("checkout.amountToPay")}</p>
                              <p className="font-mono text-2xl font-bold text-foreground">{total.toFixed(0)} {t("common.egp")}</p>
                            </div>
                          </div>

                          <div className="bg-muted/50 rounded-xl p-4 mb-4">
                            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                              <li>{t("checkout.vodafone.step1")}</li>
                              <li>{t("checkout.vodafone.step2")}</li>
                              <li>{t("checkout.vodafone.step3")}</li>
                              <li>{t("checkout.vodafone.step4")}</li>
                            </ol>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock size={14} />
                            {t("checkout.paymentTime")}
                          </div>
                        </motion.div>
                      )}

                      {selectedPayment === "cash" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-card border border-border rounded-xl p-6"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center shrink-0">
                              <Wallet size={24} className="text-foreground" />
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground mb-2">{t("checkout.cashInstructions")}</h3>
                              <p className="text-sm text-muted-foreground">{t("checkout.cashSteps")}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="flex items-center gap-2 px-8 py-3 bg-muted text-muted-foreground font-semibold rounded-full hover:bg-muted/80 transition-all"
                    >
                      <ChevronLeft size={16} />
                      {t("common.previous")}
                    </button>
                    <button
                      onClick={() => selectedPayment && setCurrentStep(3)}
                      disabled={!selectedPayment}
                      className="flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t("common.next")} <ArrowRight size={16} className="icon-rtl" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Order Summary & Confirm */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Order Summary */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-2xl p-6"
                  >
                    <h2 className="font-serif text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                      <CreditCard size={20} className="text-accent" />
                      {t("cart.orderSummary")}
                    </h2>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                        <span className="text-foreground font-medium">{subtotal} {t("common.egp")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t("cart.delivery")}</span>
                        <span className="text-foreground font-medium">{delivery === 0 ? t("cart.free") : `${delivery} ${t("common.egp")}`}</span>
                      </div>
                    </div>

                    <div className="border-t border-border pt-4 mb-6">
                      <div className="flex justify-between">
                        <span className="font-semibold text-foreground">{t("cart.total")}</span>
                        <span className="font-bold text-2xl text-foreground">{total.toFixed(0)} {t("common.egp")}</span>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="border-t border-border pt-4 mb-6">
                      <h3 className="font-semibold text-foreground mb-3">{t("checkout.orderItems")}</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {cartProducts.map((item) => (
                          <div key={item.cartKey} className="flex justify-between text-sm gap-3">
                            <span className="text-muted-foreground">
                              {item.displayName}
                              {item.roastLabel && <span className="text-accent"> · {item.roastLabel}</span>}
                              {" "}x{item.quantity}
                            </span>
                            <span className="text-foreground shrink-0">{item.price * item.quantity} {t("common.egp")}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Receipt Upload Section */}
                    {(selectedPayment === "instapay" || selectedPayment === "vodafone-cash") && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-2xl p-6"
                      >
                        <h2 className="font-serif text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                          <Upload size={20} className="text-accent" />
                          {t("checkout.uploadReceipt")}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">{t("checkout.uploadReceiptDesc")}</p>

                        {!receiptImage ? (
                          <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                              errors.receipt ? "border-red-500 bg-red-500/5 hover:bg-red-500/10" : "border-border hover:border-accent/50 hover:bg-accent/5"
                            }`}
                          >
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                              <ImageIcon size={32} className="text-muted-foreground" />
                            </div>
                            <p className="font-medium text-foreground mb-2">{t("checkout.clickToUpload")}</p>
                            <p className="text-sm text-muted-foreground">{t("checkout.supportedFormats")}</p>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="relative rounded-xl overflow-hidden border border-border">
                              <img
                                src={receiptImage}
                                alt="Receipt"
                                className="w-full h-auto max-h-64 object-contain bg-background"
                              />
                              <button
                                onClick={handleRemoveReceipt}
                                className="absolute top-2 right-2 p-2 bg-red-500/90 hover:bg-red-500 rounded-full text-white transition-colors cursor-pointer"
                              >
                                <X size={16} />
                              </button>
                            </div>
                            <p className="text-sm text-green-600 mt-2 flex items-center gap-2">
                              <CheckCircle2 size={14} />
                              {t("checkout.receiptUploaded")}
                            </p>
                          </div>
                        )}
                        {errors.receipt && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-xs mt-2 flex items-center gap-1"
                          >
                            <AlertCircle size={12} />
                            {errors.receipt}
                          </motion.p>
                        )}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-2 px-8 py-3 bg-muted text-muted-foreground font-semibold rounded-full hover:bg-muted/80 transition-all"
                    >
                      <ChevronLeft size={16} />
                      {t("common.previous")}
                    </button>
                    <button
                      onClick={handlePayment}
                      disabled={!selectedPayment}
                      className="flex items-center gap-2 px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {paymentStep === "processing" ? (
                        <>
                          <div className="w-5 h-5 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                          {t("checkout.processing")}
                        </>
                      ) : (
                        <>
                          {t("checkout.placeOrder")} <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar (Always Visible) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6 h-fit sticky top-24"
          >
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">{t("cart.orderSummary")}</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                <span className="text-foreground font-medium">{subtotal} {t("common.egp")}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("cart.delivery")}</span>
                <span className="text-foreground font-medium">{delivery === 0 ? t("cart.free") : `${delivery} ${t("common.egp")}`}</span>
              </div>
            </div>

            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">{t("cart.total")}</span>
                <span className="font-bold text-2xl text-foreground">{total.toFixed(0)} {t("common.egp")}</span>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="border-t border-border pt-4 mb-6">
              <h3 className="font-semibold text-foreground mb-3">{t("checkout.orderItems")}</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {cartProducts.map((item) => (
                  <div key={item.cartKey} className="flex justify-between text-sm gap-3">
                    <span className="text-muted-foreground">
                      {item.displayName}
                      {item.roastLabel && <span className="text-accent"> · {item.roastLabel}</span>}
                      {" "}x{item.quantity}
                    </span>
                    <span className="text-foreground shrink-0">{item.price * item.quantity} {t("common.egp")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Badge */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Lock size={16} className="text-accent" />
                {t("checkout.securePayment")}
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-accent" />
                {t("checkout.dataProtection")}
              </div>
            </div>

            <Link href="/cart">
              <a className="block text-center text-sm text-muted-foreground hover:text-accent transition-colors mt-4">
                {t("checkout.backToCart")}
              </a>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
