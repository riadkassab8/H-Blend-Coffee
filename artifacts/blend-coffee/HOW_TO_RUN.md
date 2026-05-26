# 🚀 كيفية تشغيل مشروع AROMA Coffee

## المتطلبات الأساسية
- Node.js (v18 أو أحدث)
- pnpm (مدير الحزم)

---

## خطوات التشغيل

### 1️⃣ تثبيت المكتبات
من المجلد الرئيسي للمشروع:
```bash
pnpm install
```

### 2️⃣ تشغيل المشروع في وضع التطوير
```bash
pnpm --filter blend-coffee dev
```

أو من داخل مجلد `artifacts/blend-coffee`:
```bash
cd artifacts/blend-coffee
pnpm dev
```

### 3️⃣ فتح المتصفح
بعد تشغيل المشروع، افتح المتصفح على:
```
http://localhost:5173
```

---

## الأوامر المتاحة

### تشغيل وضع التطوير
```bash
pnpm --filter blend-coffee dev
```
- يشغل السيرفر على `http://localhost:5173`
- يدعم Hot Module Replacement (HMR)
- التغييرات تظهر مباشرة بدون إعادة تحميل

### بناء المشروع للإنتاج
```bash
pnpm --filter blend-coffee build
```
- ينشئ ملفات الإنتاج في مجلد `dist`
- يقوم بتحسين وضغط الملفات

### معاينة البناء
```bash
pnpm --filter blend-coffee serve
```
- يشغل سيرفر لمعاينة البناء النهائي
- يفتح على `http://localhost:4173`

### فحص الأخطاء البرمجية
```bash
pnpm --filter blend-coffee typecheck
```
- يفحص أخطاء TypeScript بدون بناء المشروع

---

## حل المشاكل الشائعة

### ❌ المشكلة: `EUNSUPPORTEDPROTOCOL`
**الحل:** استخدم `pnpm` بدلاً من `npm`:
```bash
pnpm install
```

### ❌ المشكلة: البورت 5173 مستخدم
**الحل:** أوقف العملية القديمة أو غير البورت في `vite.config.ts`

### ❌ المشكلة: الترجمة لا تعمل
**الحل:** تأكد من تغيير اللغة من الـ Navbar (زر EN/AR)

---

## هيكل المشروع

```
artifacts/blend-coffee/
├── src/
│   ├── components/      # المكونات القابلة لإعادة الاستخدام
│   │   └── layout/      # Navbar, Footer
│   ├── contexts/        # LanguageContext للترجمة
│   ├── data/           # بيانات المنتجات والمدونة
│   ├── pages/          # صفحات التطبيق
│   └── lib/            # وظائف مساعدة
├── public/             # ملفات ثابتة
└── #md/               # ملفات التوثيق
```

---

## الميزات المتاحة

✅ **نظام ترجمة كامل** (EN/AR)
- جميع الصفحات مترجمة 100%
- دعم RTL للعربية
- حفظ اللغة في localStorage

✅ **الصفحات المتاحة**
- `/` - الصفحة الرئيسية
- `/menu` - قائمة المنتجات (30 منتج)
- `/about` - من نحن
- `/blog` - المدونة (6 مقالات)
- `/contact` - تواصل معنا
- `/reservations` - الحجوزات
- `/faq` - الأسئلة الشائعة
- `/cart` - سلة التسوق

✅ **التصميم**
- Dark/Light Mode
- Responsive Design
- Smooth Animations (Framer Motion)
- Modern UI (Tailwind CSS)

---

## ملاحظات مهمة

1. **اللغة الافتراضية:** الإنجليزية
2. **تغيير اللغة:** من زر EN/AR في الـ Navbar
3. **الصور:** تستخدم Unsplash للمدونة
4. **الألوان:** 
   - Primary: Brown/Coffee tones
   - Accent: Warm orange
   - Social Media: ألوان رسمية (Instagram gradient, Facebook blue)

---

## الدعم الفني

إذا واجهت أي مشكلة:
1. تأكد من تثبيت `pnpm` بشكل صحيح
2. احذف `node_modules` وأعد التثبيت
3. تأكد من أن البورت 5173 غير مستخدم
4. راجع ملفات التوثيق في مجلد `#md`

---

## 🎉 استمتع بالمشروع!

المشروع جاهز للاستخدام والتطوير. جميع الصفحات مترجمة وجاهزة للعرض.
