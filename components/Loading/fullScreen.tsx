const FSL = () => {
  const colors = ['bg-brand-red', 'bg-brand-green', 'bg-brand-blue', 'bg-brand-yellow'];
  const defaultStyle = 'p-2  w-4 h-4 rounded-full animate-bounce';
  return (
    <div>
      <div className="bg-white flex space-x-2 rounded-full justify-center items-center">
        {colors.map((color: string, i: number) => (
          <div key={color} style={{ animationDelay: `0.${i + 1}s` }} className={`${color} ${defaultStyle}`} />
        ))}
      </div>
      <div className="bg-brand-green w-full h-11 mt-1 rounded-bl-full rounded-br-full" />
    </div>
  );
};

export default FSL;
