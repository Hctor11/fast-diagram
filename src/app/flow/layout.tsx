import styles from "./flow.module.css";
export default function FlowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={styles.flow}>{children}</div>;
}
