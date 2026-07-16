type ToggleProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  hint: string;
};

const Toggle: React.FC<ToggleProps> = ({ id, checked, onChange, label, hint }) => {
  return (
    <div className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="min-w-0 text-start">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        <p className="mt-0.5 text-xs text-muted">{hint}</p>
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-primary" : "bg-border",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-[inset-inline-start]",
            checked ? "inset-s-6" : "inset-s-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
};

export default Toggle;
