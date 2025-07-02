export const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-gradient-to-br from-accent to-secondary opacity-30 rounded-full blur-md" />
      <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] bg-gradient-to-bl from-accent to-secondary opacity-30 rounded-full blur-md" />
      <div className="absolute top-[10%] right-[10%] w-[350px] h-[350px] bg-gradient-to-bl from-primary to-accent opacity-30 rounded-full blur-md" />
      <div className="absolute bottom-[-10%] left-[0%] w-[400px] h-[400px] bg-gradient-to-tr from-primary to-accent opacity-30 rounded-full blur-md" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-primary to-secondary opacity-20 rounded-full blur-md" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-gradient-to-tl from-secondary to-primary opacity-20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};
