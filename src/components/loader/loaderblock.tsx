import styles from '@/styles/Loader.module.css';

export default function LoaderBlock() {
  return (
    <div className="flex items-center justify-center w-screen h-screen pt-10 scale-50 md:scale-75 bgpattern">
      <div className={styles.loadingcoy}></div>
    </div>
  );
}
