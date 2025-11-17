import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      className={styles.input}
      placeholder="Search notes"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
