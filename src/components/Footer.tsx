import DarkModeToggler from "./DarkModeToggler";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between">
      <DarkModeToggler />
      <div className="text-slate-700 dark:text-slate-400">
        Made With <span className="text-red-600">&#10084;</span> by{" "}
        <a
          href="https://github.com/CodingWithEnjoy/"
          target="_blank"
          rel="noreferrer"
          className="font-bold"
        >
          Coding With Enjoy
        </a>
      </div>
    </footer>
  );
}
