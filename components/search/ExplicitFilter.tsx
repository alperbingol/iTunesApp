'use client';

interface ExplicitFilterProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

export default function ExplicitFilter({ value, onChange }: ExplicitFilterProps) {
  return (
    <div className="flex items-center h-[42px] min-w-[140px]">
      <label className="flex items-center text-sm">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="mr-2"
        />
        Allow explicit
      </label>
    </div>
  );
}