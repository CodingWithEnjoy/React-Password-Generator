const zxcvbn = require("zxcvbn");

interface Props {
  password: string;
}

export default function PasswordStrengthMeter({ password }: Props) {
  const getPasswordScore = (password: string) => {
    if (password.length >= 12) {
      return 4;
    }
    const checkPassword = zxcvbn(password);
    return checkPassword.score;
  };

  const score = getPasswordScore(password);

  const passwordProps = () => {
    switch (score) {
      case 0:
        return {
          color: ["#94a3b8", "#64748b"],
          label: "Too Weak",
        };
      case 1:
        return {
          color: ["#f87171", "#dc2626"],
          label: "Weak",
        };
      case 2:
        return {
          color: ["#facc15", "#f59e0b"],
          label: "Great",
        };
      case 3:
        return {
          color: ["#a3e635", "#10b981"],
          label: "Good",
        };
      case 4:
        return {
          color: ["#10b981", "#059669"],
          label: "Strong",
        };
      default: {
        return {
          color: ["#e2e8f0", "#e2e8f0"],
          label: "Too Weak",
        };
      }
    }
  };

  return (
    <div className="mb-8 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-900">
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${(score * 100) / 4}%`,
          background: `linear-gradient(to right, ${passwordProps().color[0]}, ${
            passwordProps().color[1]
          })`,
        }}
      ></div>
      <p
        className="text-right text-sm"
        style={{ color: passwordProps().color[1] }}
      >
        {passwordProps().label}
      </p>
    </div>
  );
}
