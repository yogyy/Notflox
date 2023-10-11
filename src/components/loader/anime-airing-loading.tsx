const AnimeAiringLoading = () => {
  return (
    <div className="relative grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 mb-14">
      {[...Array(12)].map((_, index) => (
        <div
          key={index}
          className="relative w-full h-auto rounded aspect-poster bg-zinc-800 animate-pulse"
        />
      ))}
    </div>
  );
};

export default AnimeAiringLoading;
