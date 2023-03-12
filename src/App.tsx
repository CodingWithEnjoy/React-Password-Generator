import { useState } from "react";
import copy from "copy-to-clipboard";
import ReactTooltip from "react-tooltip";

import Footer from "./components/Footer";
import PasswordStrengthMeter from "./components/PasswordStrengthMeter";

export default function App() {
  const [passLength, setPassLength] = useState<number | string>(18);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbol, setIncludeSymbol] = useState(true);

  // Jalankan fungsi generatePassword() hanya sekali
  const [password, setPassword] = useState(() => generatePassword());
  const [showAlert, setShowAlert] = useState(false);
  const [alertTimeout, setAlertTimeout] = useState<number>();

  function generatePassword(
    characterAmount = passLength,
    includeUpper = includeUppercase,
    includeNumbers = includeNumber,
    includeSymbols = includeSymbol
  ) {
    const UPPERCASE_CHAR = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWERCASE_CHAR = "abcdefghijklmnopqrstuvwxyz";
    const NUMBER_CHAR = "1234567890";
    const SYMBOL_CHAR = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

    let combinedCharacters = LOWERCASE_CHAR;

    if (includeUpper) combinedCharacters += UPPERCASE_CHAR;
    if (includeNumbers) combinedCharacters += NUMBER_CHAR;
    if (includeSymbols) combinedCharacters += SYMBOL_CHAR;

    let password = "";
    for (let i = 0; i < characterAmount; i++) {
      password += combinedCharacters.charAt(
        Math.floor(Math.random() * combinedCharacters.length)
      );
    }

    return password;
  }

  function handleCopy(password: string) {
    copy(password);
    setShowAlert(true);

    // Bersihkan semua timeout sebelum memulai timeout yang baru
    clearTimeout(alertTimeout);
    setAlertTimeout(window.setTimeout(() => setShowAlert(false), 2500));
  }

  return (
    <div className="container relative my-5 px-3 dark:selection:bg-slate-100 dark:selection:text-slate-800 sm:px-0">
      {/* Alert */}
      <div
        className="absolute -top-14 flex h-10 w-60 items-center justify-center rounded-lg bg-green-100 text-green-700 shadow-md transition-opacity duration-150 dark:bg-green-200"
        style={{ opacity: showAlert ? 1 : 0 }}
      >
        Berhasil menyalin password!
      </div>

      <div className="mb-8 max-w-md rounded-lg bg-white py-10 px-5 text-center shadow-lg transition-all dark:bg-slate-800 sm:px-10">
        <label htmlFor="password">
          <h1 className="mb-5 text-2xl font-bold text-slate-700 transition-all dark:text-white sm:text-3xl">
            Password Generator
          </h1>
        </label>

        <div className="mb-5 flex h-10 items-center transition-all sm:h-14">
          <input
            type="text"
            value={password}
            className="h-full w-full rounded-l-lg border p-3 dark:border-slate-900 dark:bg-slate-900 dark:text-slate-100"
            id="password"
            disabled
          />
          <button
            className="group flex h-full items-center rounded-r-lg bg-slate-200 dark:bg-slate-900 "
            onClick={() => handleCopy(password)}
            data-tip="Salin"
            aria-label="Salin"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="text-slate-700 transition-all group-hover:scale-105 group-active:scale-95 dark:text-slate-300"
            >
              <path d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zM3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
            </svg>
          </button>
          <ReactTooltip place="right" effect="solid" className="select-none " />
        </div>

        <PasswordStrengthMeter password={password} />

        <div className="grid grid-cols-2 gap-2 dark:text-slate-100">
          <label
            htmlFor="password-length"
            className="text-left text-lg font-semibold"
          >
            Password Lenght
          </label>
          <div className="flex items-center justify-start">
            <input
              type="range"
              id="password-length"
              className="mr-2 h-2 w-4/6 appearance-none rounded bg-slate-200 dark:bg-slate-900"
              min={1}
              max={50}
              value={passLength}
              onChange={(event) => setPassLength(parseInt(event.target.value))}
            />
            <input
              type="number"
              min={1}
              max={50}
              value={passLength}
              onChange={(event) =>
                setPassLength(
                  event.target.value === "" ? "" : parseInt(event.target.value)
                )
              }
              className="w-2/6 rounded border dark:border-slate-900 dark:bg-slate-900"
              aria-labelledby="password-length"
            />
          </div>

          <label
            htmlFor="include-uppercase"
            className="text-left text-lg font-semibold"
          >
            Uppercase
          </label>
          <div className="flex justify-start">
            <input
              type="checkbox"
              id="include-uppercase"
              className="h-5 w-5"
              defaultChecked={includeUppercase}
              onChange={() =>
                setIncludeUppercase(
                  (prevIncludeUppercase) => !prevIncludeUppercase
                )
              }
            />
          </div>

          <label
            htmlFor="include-number"
            className="text-left text-lg font-semibold"
          >
            Number
          </label>
          <div className="flex justify-start">
            <input
              type="checkbox"
              id="include-number"
              className="h-5 w-5"
              defaultChecked={includeNumber}
              onChange={() =>
                setIncludeNumber((prevIncludeNumber) => !prevIncludeNumber)
              }
            />
          </div>

          <label
            htmlFor="include-symbol"
            className="text-left text-lg font-semibold"
          >
            Symbol
          </label>
          <div className="flex justify-start">
            <input
              type="checkbox"
              id="include-symbol"
              className="h-5 w-5"
              defaultChecked={includeSymbol}
              onChange={() =>
                setIncludeSymbol((prevIncludeSymbol) => !prevIncludeSymbol)
              }
            />
          </div>
        </div>
        <button
          className="mt-3 w-full rounded bg-gradient-to-r from-emerald-400 to-teal-500 p-3 font-bold text-slate-100 shadow transition-all hover:scale-105 active:scale-100 dark:bg-slate-900 dark:text-slate-100 dark:shadow-none"
          onClick={() =>
            setPassword(
              generatePassword(
                passLength,
                includeUppercase,
                includeNumber,
                includeSymbol
              )
            )
          }
        >
          Submit
        </button>
      </div>
      <Footer />
    </div>
  );
}
