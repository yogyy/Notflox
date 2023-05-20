import styles from '@/styles/Loader.module.css';

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center pt-10 scale-50 md:scale-75 animate-pulse">
      <div className={styles.loadingcoy}></div>
    </div>
  );
};

export default Loading;
