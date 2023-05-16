import styles from '@/styles/Loader.module.css';

const Loading = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center pt-10 scale-50 md:scale-75 bgpattern">
      <div className={styles.loadingcoy}></div>
    </div>
  );
};

export default Loading;
