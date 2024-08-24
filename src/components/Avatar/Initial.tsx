const AvatarInitial = ({ name, avatarColor }: { name: string, avatarColor: string }) => {
  // Function to extract initials from the user's name
  const getInitials = (name: string) => {
    const nameArray = name.trim().split(' ');
    if (nameArray.length === 1) {
      return nameArray[0].charAt(0).toUpperCase();
    } else {
      return (
        nameArray[0].charAt(0).toUpperCase() +
        nameArray[nameArray.length - 1].charAt(0).toUpperCase()
      );
    }
  };


  const initials = getInitials(name);

  return (
    <div
      className={`flex items-center justify-center w-14 border-2 border-color-brands h-14 rounded-full text-white text-2xl font-bold`}
      style={{ backgroundColor: avatarColor }}
    >
      {initials}
    </div>
  );
};

export default AvatarInitial;
