"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Eye, EyeOff, LogIn, Shield, UserPlus } from "lucide-react";
import { Button, Field, Input, Select, Tabs } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/toast";
import { useWarung } from "@/lib/warung-store";

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useWarung();
  const { push } = useToast();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Standard login fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Registration fields
  const [regName, setRegName] = useState("");
  const [regStoreName, setRegStoreName] = useState("");
  const [regBusinessType, setRegBusinessType] = useState<"WARMINDO" | "MADURA" | "BAKERY" | "OTHER">("WARMINDO");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regWhatsapp, setRegWhatsapp] = useState("");
  const [regPin, setRegPin] = useState("1234");
  const [regError, setRegError] = useState("");

  const handleStandardLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setLoginError("Surel dan kata sandi wajib diisi.");
      return;
    }
    setLoginError("");
    setBusy(true);

    const result = await login(cleanEmail, password);
    setBusy(false);

    if (!result.success) {
      setLoginError(result.message || "Gagal masuk. Periksa surel dan kata sandi.");
      return;
    }

    push(`Selamat datang, ${result.data?.store.name ?? "warung"}.`);
    const isAdmin = (result.data?.tenants && result.data.tenants.length > 0) || cleanEmail.includes("admin");
    router.push(isAdmin ? "/admin" : "/app/pos");
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!regName.trim() || !regStoreName.trim() || !regEmail.trim() || !regPassword) {
      setRegError("Semua field bertanda bintang (*) wajib diisi.");
      return;
    }
    if (regPassword.length < 6) {
      setRegError("Kata sandi minimal 6 karakter.");
      return;
    }
    if (regPin && !/^[0-9]{4}$/.test(regPin)) {
      setRegError("PIN harus berupa 4 angka numerik.");
      return;
    }

    setRegError("");
    setBusy(true);

    const result = await register({
      name: regName.trim(),
      storeName: regStoreName.trim(),
      businessType: regBusinessType,
      email: regEmail.trim(),
      password: regPassword,
      whatsapp: regWhatsapp.trim() || undefined,
      pin: regPin || "1234",
    });
    setBusy(false);

    if (!result.success) {
      setRegError(result.message || "Gagal mendaftarkan warung. Coba gunakan surel lain.");
      return;
    }

    push(`Warung ${result.data?.store.name ?? ""} berhasil didaftarkan!`);
    router.push("/app/pos");
  };

  return (
    <main className="grid min-h-dvh bg-paper lg:grid-cols-[minmax(0,1.15fr)_minmax(420px,.85fr)]">
      <a
        href="#form-auth"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-sheet focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-primary shadow-lg"
      >
        Lewati ke formulir masuk
      </a>

      {/* Brand Hero Left Surface */}
      <section className="login-hero-surface relative hidden min-h-dvh flex-col justify-between overflow-hidden p-12 text-white lg:flex xl:p-16">
        <div className="relative z-10 flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-white/15 text-sm font-extrabold backdrop-blur-xs">
            RL
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold tracking-tight">ResepLaba</span>
            <span className="rounded-full bg-emerald-500/25 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-200">
              Edisi Warung UMKM
            </span>
          </div>
        </div>

        <div className="relative z-10 max-w-xl pb-8">
          <h1 className="text-4xl font-extrabold leading-[1.12] tracking-[-.04em] xl:text-5xl">
            Stok terjaga.
            <br />
            Laba lebih pasti.
          </h1>
          <p className="mt-5 text-base leading-7 text-white/85">
            Aplikasi kasir pintar dan pembukuan praktis untuk warung makan, warkop, dan toko kelontong. Cegah rugi karena barang kedaluwarsa dan amankan keuntungan setiap hari.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                <CheckCircle2 size={16} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Kasir Cepat & Hitung Laba Otomatis</p>
                <p className="text-xs leading-5 text-white/70">Keuntungan per porsi langsung tercatat tanpa perlu kalkulator manual.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                <CheckCircle2 size={16} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Pencegahan Barang Basi (FEFO)</p>
                <p className="text-xs leading-5 text-white/70">Sistem otomatis merekomendasikan stok kulakan terlama agar terjual duluan.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
                <CheckCircle2 size={16} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Mode Kasir & Mode Juragan</p>
                <p className="text-xs leading-5 text-white/70">Penjaga hanya bisa transaksi, laporan laba dan modal aman terkunci PIN 4 digit.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-xs text-white/70">
          <span>Garda Tech National Innovation Competition (GTNIC) 2026</span>
          <span>Web Development</span>
        </div>

        <div className="absolute -right-24 top-1/4 size-96 rounded-full border border-white/10" />
        <div className="absolute -right-10 top-[30%] size-64 rounded-full border border-white/10" />
      </section>

      {/* Interactive Form Right Surface */}
      <section
        id="form-auth"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-lg flex-col justify-center px-5 py-8 sm:px-8 lg:px-10"
      >
        {/* Mobile Header */}
        <div className="mb-6 flex items-center gap-3 lg:hidden">
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-extrabold text-white">
            RL
          </span>
          <div>
            <span className="text-base font-extrabold">ResepLaba</span>
            <span className="ml-2 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">
              Warung UMKM
            </span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mb-6">
          <Tabs
            label="Navigasi Autentikasi"
            value={activeTab}
            onChange={(tab) => {
              setActiveTab(tab as "login" | "register");
              setLoginError("");
              setRegError("");
            }}
            items={[
              { id: "login", label: "Masuk Akun" },
              { id: "register", label: "Buat Warung Baru" },
            ]}
          />
        </div>

        {activeTab === "login" ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Masuk ke Akun Warung</h2>
              <p className="mt-1.5 text-sm leading-6 text-ink-soft">
                Masukkan surel dan kata sandi toko Anda untuk mulai jualan dan melihat stok.
              </p>
            </div>

            {/* Standard Credential Login Form */}
            <div className="rounded-2xl border border-line bg-sheet p-6 shadow-xs sm:p-7">
              {loginError && (
                <div role="alert" className="mb-4 rounded-xl border border-critical-border bg-critical-soft p-3 text-xs font-semibold text-critical">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleStandardLogin} className="space-y-4">
                <Field label="Surel (Email)" htmlFor="login-email">
                  <Input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="contoh: warung@resep.laba"
                    autoComplete="username"
                    required
                  />
                </Field>

                <Field label="Kata Sandi" htmlFor="login-password">
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Masukkan kata sandi"
                      autoComplete="current-password"
                      required
                      className="pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-ink-soft transition hover:bg-paper hover:text-ink"
                      aria-label={showPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                    >
                      {showPassword ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
                    </button>
                  </div>
                </Field>

                <Button type="submit" block loading={busy} icon={<LogIn size={18} />} className="min-h-12 text-base font-bold shadow-md">
                  Masuk ke akun
                </Button>
              </form>

              <div className="mt-5 border-t border-line pt-4 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("register");
                    setLoginError("");
                  }}
                  className="text-xs font-semibold text-primary transition hover:underline"
                >
                  Belum punya akun? <b className="font-bold underline">Daftar warung baru di sini</b>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-ink-soft">
              <Shield size={14} className="shrink-0 text-primary" aria-hidden />
              <span>Sistem kasir aman & data tersimpan di server</span>
            </div>
          </div>
        ) : (
          /* Full Registration Flow */
          <div className="rounded-2xl border border-line bg-sheet p-6 shadow-xs sm:p-7">
            <div className="mb-6">
              <span className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UserPlus size={20} aria-hidden />
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight">Daftarkan Warung Baru</h2>
              <p className="mt-1 text-xs leading-5 text-ink-soft">
                Buat akun juragan dan konfigurasi awal warung untuk perlindungan margin otomatis.
              </p>
            </div>

            {regError && (
              <div role="alert" className="mb-4 rounded-xl border border-critical-border bg-critical-soft p-3 text-xs font-semibold text-critical">
                {regError}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-4">
              <Field label="Nama Pemilik / Juragan *" htmlFor="register-name">
                <Input
                  id="register-name"
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Contoh: Pak Bambang"
                  required
                />
              </Field>

              <Field label="Nama Warung / Usaha *" htmlFor="register-store-name">
                <Input
                  id="register-store-name"
                  type="text"
                  value={regStoreName}
                  onChange={(e) => setRegStoreName(e.target.value)}
                  placeholder="Contoh: Warung Madura Berkah 2"
                  required
                />
              </Field>

              <Field label="Kategori Usaha *" htmlFor="register-business-type">
                <Select
                  id="register-business-type"
                  value={regBusinessType}
                  onChange={(e) => setRegBusinessType(e.target.value as "WARMINDO" | "MADURA" | "BAKERY" | "OTHER")}
                >
                  <option value="WARMINDO">Warmindo / Usaha Masakan (Racikan Menu)</option>
                  <option value="MADURA">Warung Madura / Kelontong (Eceran & FEFO)</option>
                  <option value="BAKERY">Toko Roti / Bakery (BoM Bahan Baku)</option>
                  <option value="OTHER">Lainnya (Warkop / UMKM Umum)</option>
                </Select>
              </Field>

              <Field label="Surel (Email) *" htmlFor="register-email">
                <Input
                  id="register-email"
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="juragan@warung.id"
                  autoComplete="username"
                  required
                />
              </Field>

              <Field label="Kata Sandi (Minimal 6 Karakter) *" htmlFor="register-password">
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showRegPassword ? "text" : "password"}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    minLength={6}
                    required
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-ink-soft transition hover:bg-paper hover:text-ink"
                    aria-label={showRegPassword ? "Sembunyikan kata sandi" : "Lihat kata sandi"}
                  >
                    {showRegPassword ? <EyeOff size={18} aria-hidden /> : <Eye size={18} aria-hidden />}
                  </button>
                </div>
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="WhatsApp (Opsional)" htmlFor="register-whatsapp" hint="Untuk notifikasi pesanan stok">
                  <Input
                    id="register-whatsapp"
                    type="tel"
                    value={regWhatsapp}
                    onChange={(e) => setRegWhatsapp(e.target.value)}
                    placeholder="08123456789"
                  />
                </Field>

                <Field label="PIN Juragan (4 Digit)" htmlFor="register-pin" hint="Default: 1234">
                  <Input
                    id="register-pin"
                    type="password"
                    maxLength={4}
                    value={regPin}
                    onChange={(e) => setRegPin(e.target.value)}
                    placeholder="1234"
                  />
                </Field>
              </div>

              <div className="pt-2">
                <Button type="submit" block loading={busy} icon={<UserPlus size={18} />}>
                  Daftarkan warung sekarang
                </Button>
              </div>
            </form>

            <div className="mt-5 border-t border-line pt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setRegError("");
                }}
                className="text-xs font-semibold text-primary transition hover:underline"
              >
                Sudah punya akun? <b className="font-bold underline">Masuk dengan surel di sini</b>
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center gap-4 text-xs text-ink-soft">
          <span>Inovasi GTNIC 2026</span>
          <span>•</span>
          <span>Platform UMKM</span>
          <span>•</span>
          <span>Versi 1.0</span>
        </div>
      </section>
    </main>
  );
}
