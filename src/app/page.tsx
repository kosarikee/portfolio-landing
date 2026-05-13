"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import { submitContactForm, submitReview } from "./actions";
import {
  Camera, Wifi, Monitor, Bot, Package, MessageCircle, Eye, Star,
  ChevronDown, CheckCircle2, ShieldCheck, HeartHandshake,
  Sparkles, Send,
} from "lucide-react";

const EMAIL = process.env.NEXT_PUBLIC_EMAIL || "m3nt0s1k@gmail.com";
const GITHUB_USERNAME = "ekosarik";

const NAV_ITEMS = [
  { href: "#about", label: "Обо мне" },
  { href: "#services", label: "Услуги" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
] as const;

const services = [
  {
    icon: Camera,
    title: "Видеонаблюдение и безопасность",
    pain: "Вы будете знать, что происходит у дома, даже в командировке. Всё видно на телефоне — кто пришёл, кто уехал, что происходит во дворе.",
    detail: "Камера видит в темноте, присылает уведомление, если кто-то подошёл к калитке. Запись ведётся круглосуточно — можно пересмотреть любой момент.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi и домашние сети",
    pain: "Интернет будет стабильно ловить в каждой комнате, даже в дальней спальне и беседке. Приезжаю с прибором и проверяю сигнал лично.",
    detail: "Никаких обрывов при видеозвонках. Фильмы загружаются мгновенно. Можно одновременно работать, смотреть кино и играть — всё летает.",
  },
  {
    icon: Monitor,
    title: "Сборка и апгрейд ПК",
    pain: "Компьютер будет работать тихо, а провода — не торчать по всему столу. Собираю аккуратно и красиво, как для себя.",
    detail: "Соберу под ваши задачи: поиграть с друзьями, работать с графикой, смотреть кино на домашнем сервере. Установлю всё нужное — включили и пользуетесь.",
  },
  {
    icon: Bot,
    title: "Умный дом и Telegram-боты",
    pain: "Ничего лишнего: автоматизирую только то, что реально пригодится. Свет, климат, розетки, полив цветов — всё в одном приложении на телефоне.",
    detail: "Можно одной кнопкой выключить весь дом перед выходом или включить подогрев пола к вашему приезду. Управляете домом из любой точки мира.",
  },
] as const;

const trustPoints = [
  {
    icon: Package,
    title: "Всё под ключ",
    text: "Сам закуплю качественное оборудование без вашей головной боли. Приеду на своей машине с полным набором профессиональных инструментов. Сделаю всё за один день — без перекуров и обещаний «доделать завтра».",
  },
  {
    icon: HeartHandshake,
    title: "Поддержка после сдачи",
    text: "Я не пропадаю после оплаты. Остаюсь на связи в Telegram — если что-то пошло не так, помогу по видеозвонку или приеду лично. Мне важно, чтобы вы остались довольны и советовали друзьям.",
  },
  {
    icon: ShieldCheck,
    title: "Прозрачность",
    text: "Перед началом работ согласовываю смету — никаких сюрпризов. Показываю каждый шаг, объясняю что и зачем делаю. Оплата только когда вы проверили и всё работает.",
  },
] as const;

const projects = [
  {
    title: "Полная автоматизация дома: свет, климат и безопасность",
    desc: "Настроил систему управления для частного дома 180 м²: свет включается по датчику движения, климат поддерживает комфортную температуру, шторы сами закрываются на ночь. Датчики следят за протечками воды и дымом. Всё управляется с телефона — хоть из командировки.",
    tags: ["Telegram Bot", "Умный дом", "Датчики", "Автоматизация"],
  },
  {
    title: "Видеонаблюдение и бесшовный интернет на участке 25 соток",
    desc: "Установил 8 камер по периметру участка — видны ворота, парковка, задний двор и сад. Камеры видят в темноте, присылают уведомления при движении. Организовал интернет так, что сигнал ловит везде — и в доме, и в беседке, и у бассейна.",
    tags: ["Камеры", "Видеонаблюдение", "Wi-Fi весь участок", "Telegram"],
  },
] as const;

/* ─── НАВИГАЦИЯ ─── */

function NavBar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-white/80 backdrop-blur-md" role="navigation" aria-label="Главное меню">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <a href="#hero" className="text-lg font-bold text-foreground shrink-0" aria-label="На главную">
          <span className="gradient-text">Эрик</span>
        </a>
        <ul className="flex items-center gap-4 sm:gap-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="text-sm font-medium text-muted transition-colors duration-200 hover:text-accent">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ─── ГЕРОЙ ─── */

function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600/5 via-stone-50 to-amber-500/5" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 pb-20 pt-10 sm:pt-16">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-light px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-medium text-accent-hover">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            Частный мастер, которому доверяют дом
          </span>
          <h1 className="mt-6 sm:mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
            Привет, я <span className="gradient-text">Эрик</span>
          </h1>
          <p className="mt-4 max-w-xl text-base sm:text-lg md:text-xl leading-relaxed text-muted">
            Помогаю с техникой в доме. Видеонаблюдение, быстрый интернет, сборка
            компьютеров, умный дом. Работаю аккуратно, без пыли и висящих проводов.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contacts"
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-accent px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/25 active:scale-[0.97] min-h-[52px]"
            >
              Обсудить проект
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-card-bg px-6 sm:px-8 py-4 text-base sm:text-lg font-medium text-muted transition-all duration-300 hover:border-accent/30 hover:text-accent min-h-[52px]"
            >
              Обо мне
            </a>
          </div>
          <div className="mt-8 sm:mt-12 flex flex-wrap gap-x-6 gap-y-3">
            <span className="flex items-center gap-2 text-sm text-muted">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              Выезд по Москве и МО
            </span>
            <span className="flex items-center gap-2 text-sm text-muted">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              Гарантия на работы
            </span>
            <span className="flex items-center gap-2 text-sm text-muted">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              Поддержка 24/7
            </span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex animate-bounce flex-col items-center gap-1">
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-muted-lighter">Листайте</span>
          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-muted-lighter" />
        </div>
      </div>
    </section>
  );
}

/* ─── ОБО МНЕ ─── */

function AboutSection() {
  const [profileError, setProfileError] = useState(false);

  return (
    <section id="about" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-12 text-center">
          <span className="section-badge mb-4 sm:mb-5">
            <Eye className="h-3.5 w-3.5" />
            Обо мне
          </span>
        </div>
        <div className="mx-auto max-w-4xl flex flex-col sm:grid sm:grid-cols-5 gap-8 sm:gap-14 items-center">
          <div className="sm:col-span-2 w-full max-w-[240px] sm:max-w-none">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-accent/10">
              {profileError ? (
                <img
                  src="/images/avatar.svg"
                  alt="Эрик — частный мастер по электронике и связи"
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src="/images/profile.jpg"
                  alt="Эрик — частный мастер по электронике и связи"
                  onError={() => setProfileError(true)}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          </div>
          <div className="sm:col-span-3 text-center sm:text-left">
            <h2 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Меня зовут Эрик
            </h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-muted">
              <p>
                Я не безликая компания, а частный мастер. Лично отвечаю за каждую
                установленную камеру и настроенный роутер. Ко мне приходят по
                рекомендациям — потому что я делаю работу аккуратно, без пыли и
                висящих проводов.
              </p>
              <p>
                За моими плечами уже больше 10 лет опыта. Начинал с настройки
                серверов, дорос до автоматизации целых домов. Но главное — я умею
                объяснять сложные вещи простым языком. Без заумных терминов.
              </p>
              <p>
                Я не просто подключаю технику — я делаю так, чтобы вам было удобно.
                Показываю, как всем пользоваться, оставляю инструкцию и всегда на
                связи. Можете проверить по отзывам ниже.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ПОЧЕМУ ДОВЕРЯЮТ ─── */

function TrustSection() {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-12 text-center">
          <span className="section-badge mb-4 sm:mb-5">
            <Sparkles className="h-3.5 w-3.5" />
            Почему доверяют
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Я дорожу своей <span className="gradient-text">репутацией</span>
          </h2>
        </div>
        <div className="mx-auto max-w-4xl space-y-4 sm:space-y-5">
          {trustPoints.map((p) => (
            <div key={p.title} className="card flex flex-col sm:flex-row gap-4 sm:gap-5 p-5 sm:p-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
                <p.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-1.5 text-base sm:text-lg font-semibold text-foreground">{p.title}</h3>
                <p className="text-sm sm:text-base leading-relaxed text-muted">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── УСЛУГИ ─── */

function ServicesSection() {
  return (
    <section id="services" className="bg-surface/50 px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 text-center">
          <span className="section-badge mb-4 sm:mb-5">
            <Wifi className="h-3.5 w-3.5" />
            Мои услуги
          </span>
          <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Чем я могу <span className="gradient-text">вам помочь</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-muted">
            Помогаю с электроникой в доме. Работаю чисто, аккуратно и быстро.
          </p>
        </div>
        <div className="grid gap-5 sm:gap-8 sm:grid-cols-2">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.title} className="card flex flex-col p-6 sm:p-8">
                <div className="mb-4 sm:mb-5 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-accent-light text-accent">
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h3 className="mb-1 text-lg sm:text-xl font-semibold text-foreground">{s.title}</h3>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base font-medium leading-relaxed text-accent-hover">
                  {s.pain}
                </p>
                <p className="flex-1 text-sm sm:text-base leading-relaxed text-muted">{s.detail}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── ПРОЕКТЫ ─── */

function ProjectsSection() {
  return (
    <section id="projects" className="px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 text-center">
          <span className="section-badge mb-4 sm:mb-5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Последние проекты
          </span>
          <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Примеры <span className="gradient-text">моих работ</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-muted">
            Реальные задачи, которые я решал. Каждый проект — чей-то дом, ставший удобнее.
          </p>
        </div>
        <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
          {projects.map((p) => (
            <article key={p.title} className="card p-6 sm:p-8 md:p-10">
              <h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-foreground">{p.title}</h3>
              <p className="mb-5 sm:mb-6 text-sm sm:text-base leading-relaxed text-muted">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-lg bg-accent-light px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-accent-hover">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ФОРМА ОТПРАВКИ ОТЗЫВА ─── */

function ReviewForm({ onClose }: { onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(submitReview, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  if (state?.success) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-emerald-50 p-8 sm:p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <h3 className="mb-2 text-lg sm:text-xl font-bold text-emerald-900">
          Спасибо за ваш отзыв!
        </h3>
        <p className="mb-5 text-sm sm:text-base leading-relaxed text-emerald-700">
          Он появится на сайте после проверки.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-white px-5 py-2.5 text-sm font-medium text-emerald-700 transition-all duration-200 hover:bg-emerald-100 active:scale-95 min-h-[44px]"
        >
          Закрыть
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="mx-auto max-w-lg"
      noValidate
    >
      {state?.error && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>{state.error}</span>
        </div>
      )}

      <div className="space-y-4 sm:space-y-5">
        <div>
          <label htmlFor="reviewName" className="mb-1.5 block text-sm font-medium text-foreground">
            Ваше имя
          </label>
          <input
            id="reviewName"
            name="reviewName"
            type="text"
            required
            placeholder="Как вас зовут?"
            className="block w-full rounded-xl border border-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder:text-muted-lighter transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 min-h-[44px]"
          />
        </div>

        <div>
          <label htmlFor="reviewText" className="mb-1.5 block text-sm font-medium text-foreground">
            Текст отзыва
          </label>
          <textarea
            id="reviewText"
            name="reviewText"
            required
            rows={4}
            placeholder="Расскажите, как прошла работа. Понравилось ли вам? Что сделали?"
            className="block w-full resize-y rounded-xl border border-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder:text-muted-lighter transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div>
          <label htmlFor="reviewPhoto" className="mb-1.5 block text-sm font-medium text-foreground">
            Прикрепить фото результата <span className="text-muted-lighter font-normal">(по желанию)</span>
          </label>
          <div className="relative">
            <input
              id="reviewPhoto"
              name="reviewPhoto"
              type="file"
              accept="image/*"
              className="block w-full rounded-xl border border-border bg-card-bg px-4 py-3 text-sm text-foreground file:mr-3 file:rounded-lg file:border-0 file:bg-accent-light file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-accent-hover hover:file:bg-accent-light/80 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 min-h-[44px] cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex flex-1 items-center justify-center gap-2.5 rounded-xl bg-accent px-6 py-4 text-base font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/25 active:scale-[0.97] disabled:cursor-wait disabled:opacity-70 min-h-[52px]"
          >
            {isPending ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Отправка...
              </>
            ) : (
              "Отправить отзыв"
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-card-bg px-6 py-4 text-base font-medium text-muted transition-all duration-300 hover:border-accent/30 hover:text-accent min-h-[52px]"
          >
            Отмена
          </button>
        </div>
      </div>
    </form>
  );
}

/* ─── ОТЗЫВЫ ─── */

function ReviewsSection() {
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <section id="reviews" className="bg-surface/50 px-4 sm:px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 text-center">
          <span className="section-badge mb-4 sm:mb-5">
            <Star className="h-3.5 w-3.5" />
            Отзывы
          </span>
          <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Что говорят <span className="gradient-text">клиенты</span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg text-muted">
            Ваши отзывы помогут другим сделать выбор.
          </p>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-card-bg px-6 sm:px-8 py-3.5 text-sm sm:text-base font-medium text-muted transition-all duration-300 hover:border-accent/30 hover:text-accent active:scale-[0.97] min-h-[48px]"
          >
            {showReviewForm ? "Скрыть форму" : "Оставить отзыв о моей работе"}
          </button>
        </div>

        {showReviewForm && (
          <div className="mt-8 sm:mt-10 border-t border-border pt-8 sm:pt-10">
            <h3 className="mb-6 sm:mb-8 text-center text-xl sm:text-2xl font-bold text-foreground">
              Напишите пару слов о моей работе
            </h3>
            <ReviewForm onClose={() => setShowReviewForm(false)} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── ФОРМА ОБРАТНОЙ СВЯЗИ ─── */

function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state]);

  if (state?.success) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-emerald-200 bg-emerald-50 p-8 sm:p-10 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </div>
        <h3 className="mb-2 text-lg sm:text-xl font-bold text-emerald-900">
          Заявка успешно отправлена!
        </h3>
        <p className="mb-5 text-sm sm:text-base leading-relaxed text-emerald-700">
          Я свяжусь с вами в ближайшее время. Обычно отвечаю в течение часа.
        </p>
        <button
          type="button"
          onClick={() => {
            const form = document.getElementById("contact-form-root");
            if (form) (form as HTMLFormElement).reset();
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-300 bg-white px-5 py-2.5 text-sm font-medium text-emerald-700 transition-all duration-200 hover:bg-emerald-100 active:scale-95 min-h-[44px]"
        >
          Отправить ещё заявку
        </button>
      </div>
    );
  }

  return (
    <form
      id="contact-form-root"
      ref={formRef}
      action={formAction}
      className="mx-auto max-w-lg"
      noValidate
    >
      {state?.error && (
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          <svg className="mt-0.5 h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          <span>{state.error}</span>
        </div>
      )}

      <div className="space-y-4 sm:space-y-5">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Ваше имя
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Как к вам обращаться?"
            className="block w-full rounded-xl border border-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder:text-muted-lighter transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 min-h-[44px]"
          />
        </div>

        <div>
          <label htmlFor="contact" className="mb-1.5 block text-sm font-medium text-foreground">
            Телефон или мессенджер
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            required
            placeholder="+7 999 123-45-67 или @username"
            className="block w-full rounded-xl border border-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder:text-muted-lighter transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 min-h-[44px]"
          />
        </div>

        <div>
          <label htmlFor="address" className="mb-1.5 block text-sm font-medium text-foreground">
            Приблизительный адрес <span className="text-muted-lighter font-normal">(необязательно)</span>
          </label>
          <input
            id="address"
            name="address"
            type="text"
            placeholder="Например: Химки или Новорижское шоссе"
            className="block w-full rounded-xl border border-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder:text-muted-lighter transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 min-h-[44px]"
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-foreground">
            Кратко опишите задачу
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            placeholder="Например: нужно настроить 3 камеры и подключить Wi-Fi во всём доме"
            className="block w-full resize-y rounded-xl border border-border bg-card-bg px-4 py-3 text-sm text-foreground placeholder:text-muted-lighter transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-accent px-6 py-4 text-base font-semibold text-white shadow-lg shadow-accent/20 transition-all duration-300 hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/25 active:scale-[0.97] disabled:cursor-wait disabled:opacity-70 min-h-[52px]"
        >
          {isPending ? (
            <>
              <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Отправка...
            </>
          ) : (
            <>
              Отправить заявку
              <Send className="h-4 w-4 shrink-0" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/* ─── КОНТАКТЫ + ФУТЕР ─── */

function ContactsSection() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacts" className="border-t border-border px-4 sm:px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 sm:mb-16 text-center">
          <span className="section-badge mb-4 sm:mb-5">
            <MessageCircle className="h-3.5 w-3.5" />
            Контакты
          </span>
          <h2 className="mb-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            Давайте <span className="gradient-text">обсудим</span> ваш проект
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm sm:text-base md:text-lg text-muted">
            Оставьте заявку — я отвечу в течение часа в рабочее время.
            Выезжаю по Москве и Московской области.
          </p>
        </div>

        <div className="mb-12 sm:mb-16">
          <ContactForm />
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-border pt-6 sm:flex-row sm:gap-8 sm:pt-8">
          <p className="text-xs sm:text-sm text-muted-lighter text-center sm:text-left">
            &copy; {year} Эрик. Частный мастер по электронике и связи.
          </p>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-lighter transition-colors duration-200 hover:border-accent hover:text-accent"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="flex h-10 items-center gap-2 rounded-lg border border-border px-3 sm:px-4 text-xs sm:text-sm font-medium text-muted-lighter transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <span className="hidden sm:inline">{EMAIL}</span>
              <span className="sm:hidden">Почта</span>
            </a>
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Эрик — IT-мастер",
            "description": "Частный мастер по видеонаблюдению, Wi-Fi, сборке ПК и умному дому. Выезд по Москве и МО.",
            "url": "",
            "telephone": "",
            "areaServed": ["Москва", "Московская область"],
            "priceRange": "Договорная",
            "image": "",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Москва"
            },
            "sameAs": [
              `https://github.com/${GITHUB_USERNAME}`
            ]
          }),
        }}
      />
    </footer>
  );
}

/* ─── PAGE ROOT ─── */

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <TrustSection />
        <ServicesSection />
        <ProjectsSection />
        <ReviewsSection />
      </main>
      <ContactsSection />
    </>
  );
}
