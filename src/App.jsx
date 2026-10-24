import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    interests: [],
    city: "",
    note: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    setSuccess(false);
  };

  const handleInterest = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({
        ...form,
        interests: [...form.interests, value],
      });
    } else {
      setForm({
        ...form,
        interests: form.interests.filter((item) => item !== value),
      });
    }

    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Ad daxil edin";
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Düzgün email daxil edin";
    }

    if (form.password.length < 6) {
      newErrors.password = "Şifrə ən azı 6 simvol olmalıdır";
    }

    if (!form.gender) {
      newErrors.gender = "Cins seçin";
    }

    if (form.interests.length === 0) {
      newErrors.interests = "Ən azı bir seçim edin";
    }

    if (!form.city) {
      newErrors.city = "Şəhər seçin";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      console.log("Form məlumatları:", form);
    } else {
      setSuccess(false);
    }
  };

  const inputStyle =
    "w-full rounded-xl border  px-4 py-3 text-sm outline-none ";

  const errorStyle = "mt-2 text-sm font-medium text-red-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-6 rounded-3xl border border-white bg-white p-6 shadow-2xl shadow-violet-400"
    >
      <h1 className="text-3xl font-bold tracking-tight text-slate-800">
        Qeydiyyat Formu
      </h1>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Ad
        </label>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className={inputStyle}
          placeholder="Adınızı daxil edin"
        />

        {errors.name && <p className={errorStyle}>{errors.name}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className={inputStyle}
          placeholder="example@gmail.com"
        />

        {errors.email && <p className={errorStyle}>{errors.email}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Şifrə
        </label>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className={inputStyle}
          placeholder="Ən azı 6 simvol"
        />

        {errors.password && <p className={errorStyle}>{errors.password}</p>}
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-slate-700">Cins</p>

        <div className="flex gap-4">
          <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 transition hover:border-violet-300 hover:bg-violet-50">
            <input
              type="radio"
              name="gender"
              value="Kişi"
              checked={form.gender === "Kişi"}
              onChange={handleChange}
              className="h-4 w-4 accent-violet-600"
            />
            Kişi
          </label>

          <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 ">
            <input
              type="radio"
              name="gender"
              value="Qadın"
              checked={form.gender === "Qadın"}
              onChange={handleChange}
              className="h-4 w-4 accent-violet-600"
            />
            Qadın
          </label>
        </div>

        {errors.gender && <p className={errorStyle}>{errors.gender}</p>}
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-slate-700">
          Maraq dairələri
        </p>

        <div className="grid grid-cols-1 gap-3 ">
          {["Musiqi", "Kitab", "İdman"].map((interest) => (
            <label
              key={interest}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700"
            >
              <input
                type="checkbox"
                value={interest}
                checked={form.interests.includes(interest)}
                onChange={handleInterest}
                className="h-4 w-4 accent-violet-600"
              />

              {interest}
            </label>
          ))}
        </div>

        {errors.interests && <p className={errorStyle}>{errors.interests}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Şəhər
        </label>

        <select
          name="city"
          value={form.city}
          onChange={handleChange}
          className={inputStyle}
        >
          <option value="">Şəhər seçin</option>
          <option value="Bakı">Bakı</option>
          <option value="Gəncə">Gəncə</option>
          <option value="Agdere">Agdere</option>
          <option value="Agdam">Agdam</option>
        </select>

        {errors.city && <p className={errorStyle}>{errors.city}</p>}
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Qeyd
        </label>

        <textarea
          name="note"
          value={form.note}
          onChange={handleChange}
          className={`${inputStyle} resize-y`}
          placeholder="Əlavə qeydiniz..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-violet-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl"
      >
        Qeydiyyatdan keç
      </button>

      {success && (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-700">
          Form uğurla göndərildi!
        </p>
      )}
    </form>
  );
}

export default App;
