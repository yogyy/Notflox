import styles from '@/styles/LoaderBlock.module.css';

export default function LoaderBlock() {
  return (
    <div className="h-screen w-screen flex justify-center items-center pt-10 scale-50 md:scale-75 lg:scale-90 xl:scale-100">
      <div className={styles.loader}>
        <div className={styles.loadersquare}></div>
        <div className={styles.loadersquare}></div>
        <div className={styles.loadersquare}></div>
        <div className={styles.loadersquare}></div>
        <div className={styles.loadersquare}></div>
        <div className={styles.loadersquare}></div>
      </div>
    </div>
  );
}
