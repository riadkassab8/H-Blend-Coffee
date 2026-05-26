# دليل نظام الترجمة - AROMA Coffee

## نظرة عامة

تم تطبيق نظام ترجمة ثنائي اللغة (إنجليزي/عربي) في الموقع باستخدام React Context API.

## كيفية الاستخدام

### 1. استيراد hook الترجمة

```tsx
import { useLanguage } from "@/contexts/LanguageContext";

function MyComponent() {
  const { t, language, toggleLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t("home.hero.title")}</h1>
      <button onClick={toggleLanguage}>
        {language === "en" ? "العربية" : "English"}
      </button>
    </div>
  );
}
```

### 2. مفاتيح الترجمة المتاحة

#### الصفحة الرئيسية (Home)
- `home.subtitle` - "Cairo's Specialty Coffee"
- `home.hero.title` - "Where Every Cup Tells a Story."
- `home.hero.description` - وصف البطل
- `home.hero.exploreMenu` - "Explore Menu"
- `home.hero.ourStory` - "Our Story"
- `home.featured.*` - قسم المنتجات المميزة
- `home.bestsellers.*` - قسم الأكثر مبيعاً
- `home.newsletter.*` - قسم النشرة الإخبارية

#### القائمة (Menu)
- `menu.label` - "Our Menu"
- `menu.title` - "Every cup, considered."
- `menu.all` - "All"
- `menu.addToCart` - "Add"
- `menu.quickView` - "Quick View"

#### الفئات (Categories)
- `category.beans` - "Coffee Beans"
- `category.ground` - "Ground Coffee"
- `category.capsules` - "Coffee Capsules"
- `category.equipment` - "Equipment"
- `category.drinks` - "Drinks"
- `category.accessories` - "Accessories"

#### سلة التسوق (Cart)
- `cart.title` - "Your Cart"
- `cart.empty` - "Your cart is empty"
- `cart.items` - "items in your cart"
- `cart.subtotal` - "Subtotal"
- `cart.delivery` - "Delivery"
- `cart.total` - "Total"
- `cart.checkout` - "Proceed to Checkout"

#### شريط التنقل (Navbar)
- `nav.menu` - "Menu"
- `nav.about` - "About"
- `nav.reservations` - "Reservations"
- `nav.blog` - "Blog"
- `nav.contact` - "Contact"
- `nav.orderNow` - "Order Now"

#### التذييل (Footer)
- `footer.tagline` - شعار الموقع
- `footer.navigate` - "Navigate"
- `footer.branches` - "Our Branches"
- `footer.contact` - "Get in Touch"

#### عام (Common)
- `common.egp` - "EGP"
- `common.loading` - "Loading..."

### 3. إضافة ترجمات جديدة

لإضافة ترجمات جديدة، قم بتحرير ملف `src/contexts/LanguageContext.tsx`:

```tsx
const translations = {
  en: {
    // أضف المفتاح الجديد هنا
    "mypage.title": "My Page Title",
  },
  ar: {
    // أضف الترجمة العربية
    "mypage.title": "عنوان صفحتي",
  },
};
```

### 4. دعم RTL للعربية

يتم تطبيق RTL تلقائياً عند تبديل اللغة إلى العربية:

```tsx
useEffect(() => {
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  
  if (language === "ar") {
    document.documentElement.classList.add("font-arabic");
  } else {
    document.documentElement.classList.remove("font-arabic");
  }
}, [language]);
```

### 5. الخطوط العربية

تم استخدام خط **Tajawal** للنصوص العربية، وهو متوفر في `index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap');

.font-arabic {
  --app-font-sans: 'Tajawal', 'Inter', sans-serif;
}
```

## الصفحات المترجمة

✅ **مكتملة:**
- Home (الصفحة الرئيسية)
- Menu (القائمة)
- Cart (سلة التسوق)
- Navbar (شريط التنقل)
- Footer (التذييل)

🔄 **قيد التطوير:**
- About (من نحن)
- Reservations (الحجوزات)
- Contact (اتصل بنا)
- Blog (المدونة)
- FAQ (الأسئلة الشائعة)

## ملاحظات مهمة

1. **التخزين المحلي**: يتم حفظ اللغة المختارة في `localStorage` تحت مفتاح `aroma-language`
2. **الافتراضي**: اللغة الافتراضية هي الإنجليزية
3. **التبديل**: يمكن التبديل بين اللغات من أي صفحة باستخدام زر اللغة في Navbar
4. **الأداء**: الترجمات محملة في الذاكرة ولا تحتاج إلى طلبات شبكة

## أمثلة عملية

### مثال 1: ترجمة عنوان صفحة

```tsx
function PageTitle() {
  const { t } = useLanguage();
  
  return (
    <h1 className="font-serif text-4xl">
      {t("menu.title")}
    </h1>
  );
}
```

### مثال 2: ترجمة مع متغيرات

```tsx
function CartSummary({ total }: { total: number }) {
  const { t } = useLanguage();
  
  return (
    <p>
      {t("cart.total")}: {total} {t("common.egp")}
    </p>
  );
}
```

### مثال 3: ترجمة شرطية

```tsx
function ItemCount({ count }: { count: number }) {
  const { t } = useLanguage();
  
  return (
    <span>
      {count} {count === 1 ? t("cart.item") : t("cart.items")}
    </span>
  );
}
```

## الدعم الفني

إذا واجهت أي مشاكل في الترجمة:
1. تأكد من استيراد `useLanguage` بشكل صحيح
2. تحقق من وجود المفتاح في ملف `LanguageContext.tsx`
3. تأكد من أن المكون داخل `<LanguageProvider>`
